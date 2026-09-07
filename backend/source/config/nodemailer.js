// ======================================================
// File: src/config/nodemailer.js
// Description: Nodemailer Configuration with IPv4 lookup
// ======================================================

import nodemailer from "nodemailer";
import dns from "node:dns";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Port 587 এর জন্য false
  // IPv6 এড্রেস স্কিপ করে কেবল IPv4 এড্রেস ব্যবহার করতে বলা হচ্ছে
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
  },
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
  connectionTimeout: 10000,
});

export default transporter;
