import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  console.log("API HIT:", req.method);

  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const { name, email, message } = await req.json();
    console.log("Received Data:", name, email, message);

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // ✅ Nodemailer Config
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email Options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
    //   text: `Sender: ${name} \nEmail: ${email} \nMessage: ${message}`,
      html: `
      <table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border-collapse: collapse; border: 1px solid #ddd;">
    <tr>
        <td style="background: #007BFF; color: white; text-align: center; padding: 15px; font-size: 20px; font-weight: bold;">
            📩 New Contact Message
        </td>
    </tr>
    <tr>
        <td style="padding: 20px;">
            <p style="font-size: 18px; color: #333; margin-bottom: 10px;">Hello Admin,</p>
            <p style="font-size: 16px; color: #555;">
                You have received a new message from your website's contact form.
            </p>
        </td>
    </tr>
    <tr>
        <td style="padding: 20px; background: #f9f9f9;">
            <p style="font-size: 16px; color: #333;"><strong>👤 Name:</strong> ${name}</p>
            <p style="font-size: 16px; color: #333;"><strong>📧 Email:</strong> ${email}</p>
            <p style="font-size: 16px; color: #333;"><strong>📝 Message:</strong></p>
            <p style="font-size: 16px; color: #555; padding: 10px; background: #fff; border-left: 4px solid #007BFF;">
                ${message}
            </p>
        </td>
    </tr>
    <tr>
        <td style="background: #007BFF; color: white; text-align: center; padding: 10px; font-size: 14px;">
            &copy; 2025 Your Website. All Rights Reserved. ${new Date().getFullYear()}
        </td>
    </tr>
</table>

      `,
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}