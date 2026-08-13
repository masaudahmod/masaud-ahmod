// ======================================================
// File: src/modules/mail/mail.service.js
// ======================================================

import transporter from "../../config/nodemailer.js";

import ApiError from "../../errors/apiError.js";

import { otpTemplate } from "./mail.template.js";

/**
 * ======================================================
 * Send OTP Email
 * ======================================================
 */

export const sendOTP = async ({
  email,
  name,
  otp,
  subject = "Verify Your Email",
  purpose = "email",
}) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject,

      html: otpTemplate({
        name,
        otp,
        purpose,
      }),
    });

    return true;
  } catch (error) {
    console.error(error);

    throw new ApiError(
      500,
      "Failed to send verification email."
    );
  }
};
