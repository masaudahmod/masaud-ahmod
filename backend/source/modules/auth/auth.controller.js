// ======================================================
// File: src/modules/auth/auth.controller.js
// ======================================================

import * as AuthService from "./auth.service.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import sendResponse from "../../utils/sendResponse.js";
/**
 * ======================================================
 * Register User
 * POST /api/v1/auth/register
 * Public
 * ======================================================
 */
export const register = asyncHandler(async (req, res) => {
    const result = await AuthService.register(req.body);

    return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Registration successful. Please verify your email.",
        data: result,
    });
});

/**
 * ======================================================
 * Verify Email OTP
 * POST /api/v1/auth/verify-email
 * Public
 * ======================================================
 */
export const verifyEmail = asyncHandler(async (req, res) => {
    const result = await AuthService.verifyEmail(req.body);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Email verified successfully.",
        data: result,
    });
});

/**
 * ======================================================
 * Resend Verification OTP
 * POST /api/v1/auth/resend-otp
 * Public
 * ======================================================
 */
export const resendOtp = asyncHandler(async (req, res) => {
    const result = await AuthService.resendOtp(req.body);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP sent successfully.",
        data: result,
    });
});

/**
 * ======================================================
 * Login
 * POST /api/v1/auth/login
 * Public
 * ======================================================
 */
export const login = asyncHandler(async (req, res) => {
    const result = await AuthService.login(req.body);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Login successful.",
        data: result,
    });
});

/**
 * ======================================================
 * Refresh Access Token
 * POST /api/v1/auth/refresh-token
 * Public
 * ======================================================
 */
export const refreshToken = asyncHandler(async (req, res) => {
    const result = await AuthService.refreshToken(req.body);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Access token refreshed successfully.",
        data: result,
    });
});

/**
 * ======================================================
 * Logout Current Device
 * POST /api/v1/auth/logout
 * Private
 * ======================================================
 */
export const logout = asyncHandler(async (req, res) => {
    const result = await AuthService.logout(req.user, req.body);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Logout successful.",
        data: result,
    });
});

/**
 * ======================================================
 * Logout All Devices
 * POST /api/v1/auth/logout-all
 * Private
 * ======================================================
 */
export const logoutAll = asyncHandler(async (req, res) => {
    const result = await AuthService.logoutAll(req.user);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Logged out from all devices.",
        data: result,
    });
});

/**
 * ======================================================
 * Forgot Password
 * POST /api/v1/auth/forgot-password
 * Public
 * ======================================================
 */
export const forgotPassword = asyncHandler(async (req, res) => {
    const result = await AuthService.forgotPassword(req.body);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password reset OTP sent successfully.",
        data: result,
    });
});

/**
 * ======================================================
 * Verify Password Reset OTP
 * POST /api/v1/auth/verify-reset-otp
 * Public
 * ======================================================
 */
export const verifyResetOtp = asyncHandler(async (req, res) => {
    const result = await AuthService.verifyResetOtp(req.body);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP verified successfully.",
        data: result,
    });
});

/**
 * ======================================================
 * Reset Password
 * POST /api/v1/auth/reset-password
 * Public
 * ======================================================
 */
export const resetPassword = asyncHandler(async (req, res) => {
    const result = await AuthService.resetPassword(req.body);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password reset successfully.",
        data: result,
    });
});

/**
 * ======================================================
 * Current Logged In User
 * GET /api/v1/auth/me
 * Private
 * ======================================================
 */
export const me = asyncHandler(async (req, res) => {
    const result = await AuthService.me(req.user.id);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User fetched successfully.",
        data: result,
    });
});

/**
 * ======================================================
 * Change Password
 * PATCH /api/v1/auth/change-password
 * Private
 * ======================================================
 */
export const changePassword = asyncHandler(async (req, res) => {
    const result = await AuthService.changePassword(req.user.id, req.body);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password changed successfully.",
        data: result,
    });
});