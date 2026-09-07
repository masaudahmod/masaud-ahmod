// ======================================================
// File: src/config/nodemailer.js
// Description: Nodemailer Configuration
// ======================================================

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Port 587 এর জন্য false (STARTTLS ব্যবহার করবে)
  family: 4,     // Render-এর IPv6 সমস্যা সমাধানের জন্যIPv4 ফোর্স করা হচ্ছে
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
  // টাইম-আউট প্রতিরোধ করার জন্য কিছু অতিরিক্ত সেটিংস
  connectionTimeout: 10000, // ১০ সেকেন্ডের মধ্যে কানেক্ট না হলে ফেল করবে
  greetingTimeout: 5000,
  socketTimeout: 10000,
});

export default transporter;
