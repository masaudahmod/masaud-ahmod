import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "../../lib/prisma.js";
import ApiError from "../../errors/apiError.js";
import hashPassword from "../../utils/hashPassword.js";
import comparePassword from "../../utils/comparePassword.js";
import * as MailService from "../mail/mail.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";

const OTP_EXPIRES_IN = 10 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const TRUSTED_DEVICE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const userSelect = {
  id: true, username: true, email: true, emailVerified: true, status: true,
  role: { select: { name: true } },
};

const requireFields = (payload, fields) => {
  for (const field of fields) {
    if (!payload?.[field] || !String(payload[field]).trim()) {
      throw new ApiError(400, `${field} is required.`);
    }
  }
};
const userDto = (user) => ({
  id: user.id, username: user.username, email: user.email, role: user.role?.name ?? null,
});
const createOtp = async (user, purpose, tx = prisma) => {
  const otp = String(crypto.randomInt(100000, 1000000));
  await tx.otpVerification.deleteMany({
    where: { email: user.email, purpose, verifiedAt: null },
  });
  await tx.otpVerification.create({
    data: {
      userId: user.id, email: user.email, codeHash: await bcrypt.hash(otp, 10),
      purpose, expiresAt: new Date(Date.now() + OTP_EXPIRES_IN),
    },
  });
  return otp;
};

export const register = async (payload) => {
  requireFields(payload, ["username", "email", "password"]);
  const username = payload.username.trim();
  const email = payload.email.trim().toLowerCase();
  if (payload.password.length < 8) throw new ApiError(400, "Password must be at least 8 characters.");
  const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
  if (existing) throw new ApiError(409, existing.email === email ? "Email already exists." : "Username already exists.");
  const user = await prisma.user.create({
    data: { username, email, password: await hashPassword(payload.password) },
    select: userSelect,
  });
  const otp = await createOtp(user, "EMAIL_VERIFICATION");
  await MailService.sendOTP({ email, name: username, otp, purpose: "email" });
  return { user: userDto(user), verificationRequired: true };
};

export const verifyEmail = async (payload) => {
  requireFields(payload, ["email", "otp"]);
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email }, select: userSelect });
  if (!user) throw new ApiError(404, "User not found.");
  if (user.emailVerified) throw new ApiError(400, "Email already verified.");
  const record = await prisma.otpVerification.findFirst({
    where: { email, purpose: "EMAIL_VERIFICATION", verifiedAt: null }, orderBy: { createdAt: "desc" },
  });
  if (!record || record.expiresAt < new Date()) throw new ApiError(400, "OTP has expired or is invalid.");
  if (!(await bcrypt.compare(String(payload.otp).trim(), record.codeHash))) throw new ApiError(400, "Invalid OTP.");
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { emailVerified: true } }),
    prisma.otpVerification.update({ where: { id: record.id }, data: { verifiedAt: new Date() } }),
  ]);
  return { verified: true };
};

export const resendOtp = async (payload) => {
  requireFields(payload, ["email"]);
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email }, select: userSelect });
  if (!user) throw new ApiError(404, "User not found.");
  if (user.emailVerified) throw new ApiError(400, "Your email is already verified.");
  const otp = await createOtp(user, "EMAIL_VERIFICATION");
  await MailService.sendOTP({ email, name: user.username, otp, purpose: "email" });
  return { email, verificationRequired: true };
};

const issueTokens = async (user, ipAddress, userAgent) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE);
  await prisma.$transaction([
    prisma.refreshToken.create({ data: { userId: user.id, token: refreshToken, expiresAt } }),
    prisma.session.create({ data: { userId: user.id, token: refreshToken, expiresAt, ipAddress, userAgent } }),
    prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } }),
  ]);
  return { accessToken, refreshToken, user: userDto(user) };
};

const validateLoginUser = async (payload) => {
  requireFields(payload, ["login", "password"]);
  const login = payload.login.trim().toLowerCase();
  const user = await prisma.user.findFirst({ where: { OR: [{ email: login }, { username: login }] }, select: { ...userSelect, password: true } });
  if (!user || !(await comparePassword(payload.password, user.password))) throw new ApiError(401, "Invalid email/username or password.");
  if (!user.emailVerified) throw new ApiError(403, "Please verify your email first.");
  if (user.status !== "ACTIVE") throw new ApiError(403, "Your account is not active.");
  return user;
};

const hashDeviceToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const findTrustedDevice = async (userId, token, userAgent) => {
  if (!token) return false;
  const device = await prisma.trustedDevice.findFirst({ where: { userId, tokenHash: hashDeviceToken(token), expiresAt: { gt: new Date() } } });
  if (!device || device.userAgent !== userAgent) return false;
  await prisma.trustedDevice.update({ where: { id: device.id }, data: { lastUsedAt: new Date() } });
  return true;
};

const createTrustedDevice = async (user, userAgent, ipAddress) => {
  const token = crypto.randomBytes(48).toString("hex");
  await prisma.trustedDevice.create({ data: { userId: user.id, tokenHash: hashDeviceToken(token), userAgent, ipAddress, expiresAt: new Date(Date.now() + TRUSTED_DEVICE_MAX_AGE) } });
  return token;
};

export const login = async (payload) => {
  const user = await validateLoginUser(payload);
  if (await findTrustedDevice(user.id, payload.trustedDeviceToken, payload.userAgent)) {
    return issueTokens(user, payload.ipAddress, payload.userAgent);
  }
  const otp = await createOtp(user, "LOGIN");
  await MailService.sendOTP({ email: user.email, name: user.username, otp, subject: "Your login verification code", purpose: "login" });
  return { verificationRequired: true, email: user.email };
};

export const verifyLogin = async (payload) => {
  requireFields(payload, ["email", "otp"]);
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email }, select: userSelect });
  if (!user || !user.emailVerified || user.status !== "ACTIVE") throw new ApiError(401, "Your login session is no longer valid.");
  const record = await prisma.otpVerification.findFirst({ where: { userId: user.id, email, purpose: "LOGIN", verifiedAt: null }, orderBy: { createdAt: "desc" } });
  if (!record || record.expiresAt < new Date()) throw new ApiError(400, "OTP has expired or is invalid.");
  if (!(await bcrypt.compare(String(payload.otp).trim(), record.codeHash))) throw new ApiError(400, "Invalid OTP.");
  await prisma.otpVerification.update({ where: { id: record.id }, data: { verifiedAt: new Date() } });
  const tokens = await issueTokens(user, payload.ipAddress, payload.userAgent);
  if (payload.trustDevice) tokens.trustedDeviceToken = await createTrustedDevice(user, payload.userAgent, payload.ipAddress);
  return tokens;
};

export const refreshToken = async (token) => {
  if (!token) throw new ApiError(401, "Refresh token is required.");
  let decoded;
  try { decoded = verifyRefreshToken(token); } catch { throw new ApiError(401, "Invalid refresh token."); }
  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored || stored.revoked || stored.expiresAt < new Date()) throw new ApiError(401, "Refresh token has expired.");
  const user = await prisma.user.findUnique({ where: { id: decoded.id }, select: userSelect });
  if (!user || !user.emailVerified || user.status !== "ACTIVE") throw new ApiError(401, "Your session is no longer valid.");
  await prisma.$transaction([
    prisma.refreshToken.update({ where: { token }, data: { revoked: true } }),
    prisma.session.deleteMany({ where: { token } }),
  ]);
  return issueTokens(user);
};

export const logout = async (token) => {
  if (token) await prisma.$transaction([
    prisma.refreshToken.updateMany({ where: { token, revoked: false }, data: { revoked: true } }),
    prisma.session.deleteMany({ where: { token } }),
  ]);
  return { logout: true };
};

export const logoutAll = async (userId) => {
  await prisma.$transaction([
    prisma.refreshToken.updateMany({ where: { userId, revoked: false }, data: { revoked: true } }),
    prisma.session.deleteMany({ where: { userId } }),
    prisma.trustedDevice.deleteMany({ where: { userId } }),
  ]);
  return { logout: true };
};

export const me = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: userSelect });
  if (!user) throw new ApiError(404, "User not found.");
  return userDto(user);
};
