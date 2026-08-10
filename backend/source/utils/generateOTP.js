// ======================================================
// generateOTP.js
// Description: Generate Secure Numeric OTP
// ======================================================

import crypto from "crypto";

/**
 * Generate Secure Numeric OTP
 *
 * @param {number} length
 * @returns {string}
 */
const generateOTP = (length = 6) => {
  let otp = "";

  otp += crypto.randomInt(1, 10); // First digit (1-9)

  for (let i = 1; i < length; i++) {
    otp += crypto.randomInt(0, 10);
  }

  return otp;
};

export default generateOTP;
