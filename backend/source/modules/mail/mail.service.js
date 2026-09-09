// ======================================================
// File: src/modules/mail/mail.service.js
// ======================================================

import resend from "../../config/resend.js";
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
    const { data, error } = await resend.emails.send({
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_FROM}>`,
      to: [email],
      subject,

      html: otpTemplate({
        name,
        otp,
        purpose,
      }),
    });

    if (error) {
      console.error("[Resend] Email Error:", error);

      throw new Error(error.message);
    }

    console.log("[Resend] OTP email sent:", data?.id);

    return true;
  } catch (error) {
    console.error("[Mail Service] Failed to send OTP:", error);

    throw new ApiError(
      500,
      "Failed to send verification email."
    );
  }
};