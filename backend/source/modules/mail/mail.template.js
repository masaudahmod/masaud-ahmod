// ======================================================
// File: src/modules/mail/mail.template.js
// ======================================================

export const otpTemplate = ({ name, otp, purpose = "email" }) => {
  const isLogin = purpose === "login";
  return `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>${isLogin ? "Login verification" : "Email verification"}</title>
    </head>

    <body
        style="
            margin:0;
            padding:40px;
            background:#f5f7fb;
            font-family:Arial,sans-serif;
        "
    >

        <div
            style="
                max-width:600px;
                margin:auto;
                background:#ffffff;
                border-radius:10px;
                overflow:hidden;
                border:1px solid #e5e7eb;
            "
        >

            <div
                style="
                    background:#111827;
                    color:#ffffff;
                    padding:25px;
                    text-align:center;
                    font-size:24px;
                    font-weight:bold;
                "
            >
                ${process.env.APP_NAME}
            </div>

            <div style="padding:40px;">

                <h2>Hello ${name},</h2>

                <p>
                    ${isLogin ? "We received a sign-in request for your account." : "Thank you for registering."}
                </p>

                <p>
                    ${isLogin ? "Use the OTP below to complete your sign-in." : "Use the OTP below to verify your email."}
                </p>

                <div
                    style="
                        margin:35px 0;
                        text-align:center;
                    "
                >

                    <span
                        style="
                            display:inline-block;
                            font-size:36px;
                            font-weight:bold;
                            letter-spacing:8px;
                            padding:20px 40px;
                            background:#111827;
                            color:white;
                            border-radius:8px;
                        "
                    >
                        ${otp}
                    </span>

                </div>

                <p>
                    This OTP will expire in
                    <strong>10 minutes.</strong>
                </p>

                <p>
                    If you didn't request this,
                    please ignore this email.
                </p>

            </div>

        </div>

    </body>

    </html>
  `;
};
