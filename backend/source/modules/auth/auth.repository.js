// ======================================================
// auth.repository.js
// Description: Authentication Repository
// Responsibility:
//   - Only database operations.
//   - No business logic.
// ======================================================

import { prisma } from "../../lib/prisma.js";

/**
 * ======================================================
 * User
 * ======================================================
 */

/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
      profile: true,
    },
  });
};

/**
 * Find user by username
 */
export const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

/** find by email or username */
export const findUserByEmailOrUsername = async (login) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: login }, { username: login }],
    },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
      profile: true,
    },
  });
};

/**
 * Find user by id
 */
export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
      profile: true,
    },
  });
};

/**
 * Create User
 */
export const createUser = async (tx, payload) => {
  return await tx.user.create({
    data: payload,
  });
};

/**
 * Update User
 */
export const updateUser = async (id, payload) => {
  return await prisma.user.update({
    where: { id },
    data: payload,
  });
};

/**
 * ======================================================
 * OTP
 * ======================================================
 */

/**
 * Create OTP
 */
export const createOTP = async (tx, payload) => {
  return await tx.otpVerification.create({
    data: payload,
  });
};

/**
 * Find Latest OTP
 */
export const findLatestOTP = async (email, purpose) => {
  return await prisma.otpVerification.findFirst({
    where: {
      email,
      purpose,
      verifiedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Verify OTP
 */
export const verifyOTP = async (id) => {
  return await prisma.otpVerification.update({
    where: { id },
    data: {
      verifiedAt: new Date(),
    },
  });
};

/**
 * Delete OTP
 */
export const deleteOTP = async (id) => {
  return await prisma.otpVerification.delete({
    where: { id },
  });
};

/**
 * Delete Previous OTPs
 */
export const deletePreviousOTPs = async (email, purpose) => {
  return await prisma.otpVerification.deleteMany({
    where: {
      email,
      purpose,
      verifiedAt: null,
    },
  });
};

/**
 * ======================================================
 * Session
 * ======================================================
 */

/**
 * Create Session
 */
export const createSession = async (payload) => {
  return await prisma.session.create({
    data: payload,
  });
};

/**
 * Delete Session
 */
export const deleteSession = async (token) => {
  return await prisma.session.deleteMany({
    where: {
      token,
    },
  });
};

/**
 * Delete All Sessions
 */
export const deleteAllSessions = async (userId) => {
  return await prisma.session.deleteMany({
    where: {
      userId,
    },
  });
};

/**
 * ======================================================
 * Refresh Token
 * ======================================================
 */

/**
 * Save Refresh Token
 */
export const createRefreshToken = async (payload) => {
  return await prisma.refreshToken.create({
    data: payload,
  });
};

/**
 * Find Refresh Token
 */
export const findRefreshToken = async (token) => {
  return await prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

/**
 * Revoke Refresh Token
 */
export const revokeRefreshToken = async (token) => {
  return await prisma.refreshToken.update({
    where: {
      token,
    },
    data: {
      revoked: true,
    },
  });
};

/**
 * Revoke All Refresh Tokens
 */
export const revokeAllRefreshTokens = async (userId) => {
  return await prisma.refreshToken.updateMany({
    where: {
      userId,
      revoked: false,
    },
    data: {
      revoked: true,
    },
  });
};
