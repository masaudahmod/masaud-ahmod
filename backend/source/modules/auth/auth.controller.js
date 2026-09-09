import * as AuthService from "./auth.service.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import sendResponse from "../../utils/sendResponse.js";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  clearAccessTokenCookieOptions,
  clearRefreshTokenCookieOptions,
  trustedDeviceCookieOptions,
  clearTrustedDeviceCookieOptions,
} from "../../utils/cookieOptions.js";

const sendTokens = (res, result, message) => {
  res.cookie("accessToken", result.accessToken, accessTokenCookieOptions);
  res.cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);
  if (result.trustedDeviceToken) res.cookie("trustedDevice", result.trustedDeviceToken, trustedDeviceCookieOptions);
  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message,
    data: { user: result.user },
  });
};

export const register = asyncHandler(async (req, res) =>
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Registration successful. Please verify your email.",
    data: await AuthService.register(req.body),
  }),
);
export const verifyEmail = asyncHandler(async (req, res) =>
  sendResponse(res, {
    success: true,
    message: "Email verified successfully.",
    data: await AuthService.verifyEmail(req.body),
  }),
);
export const resendOtp = asyncHandler(async (req, res) =>
  sendResponse(res, {
    success: true,
    message: "OTP sent successfully.",
    data: await AuthService.resendOtp(req.body),
  }),
);
export const login = asyncHandler(async (req, res) => {
  const result = await AuthService.login({ ...req.body, ipAddress: req.ip, userAgent: req.get("user-agent"), trustedDeviceToken: req.cookies.trustedDevice });
  return sendTokens(res, result, "Login successful.");
});
export const verifyLogin = asyncHandler(async (req, res) =>
  sendTokens(res, await AuthService.verifyLogin({ ...req.body, ipAddress: req.ip, userAgent: req.get("user-agent") }), "Login verified successfully."),
);
export const refreshToken = asyncHandler(async (req, res) =>
  sendTokens(
    res,
    await AuthService.refreshToken(req.cookies.refreshToken),
    "Session refreshed successfully.",
  ),
);
export const logout = asyncHandler(async (req, res) => {
  await AuthService.logout(req.cookies.refreshToken);
  res
    .clearCookie("accessToken", clearAccessTokenCookieOptions)
    .clearCookie("refreshToken", clearRefreshTokenCookieOptions);
  return sendResponse(res, { success: true, message: "Logout successful." });
});
export const logoutAll = asyncHandler(async (req, res) => {
  await AuthService.logoutAll(req.user.id);
  res
    .clearCookie("accessToken", clearAccessTokenCookieOptions)
    .clearCookie("refreshToken", clearRefreshTokenCookieOptions)
    .clearCookie("trustedDevice", clearTrustedDeviceCookieOptions);
  return sendResponse(res, {
    success: true,
    message: "Logged out from all devices.",
  });
});
export const me = asyncHandler(async (req, res) =>
  sendResponse(res, {
    success: true,
    message: "User fetched successfully.",
    data: await AuthService.me(req.user.id),
  }),
);
