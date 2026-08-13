// ======================================================
// cookieOptions.js
// Description: Cookie Configuration
// ======================================================

/**
 * Refresh Token Cookie Options
 */
const isProduction = process.env.NODE_ENV === "production";
const sharedCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
};

export const accessTokenCookieOptions = {
    ...sharedCookieOptions,
    maxAge: 15 * 60 * 1000,
};

export const refreshTokenCookieOptions = {
    ...sharedCookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const loginChallengeCookieOptions = {
    ...sharedCookieOptions,
    maxAge: 10 * 60 * 1000,
};

export const trustedDeviceCookieOptions = {
    ...sharedCookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
};

/**
 * Clear Refresh Token Cookie
 */
export const clearRefreshTokenCookieOptions = {
    ...sharedCookieOptions,
};

export const clearAccessTokenCookieOptions = { ...sharedCookieOptions };
export const clearLoginChallengeCookieOptions = { ...sharedCookieOptions };
export const clearTrustedDeviceCookieOptions = { ...sharedCookieOptions };
