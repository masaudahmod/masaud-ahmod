// ======================================================
// File: src/config/nodemailer.js
// ======================================================

import nodemailer from "nodemailer";
import dns from "node:dns";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,             // Port 587 ছেড়ে 465 SSL ট্রাই করুন (Render-এ বেশি স্টেবল)
  secure: true,
  family: 4,             // force IPv4
  lookup: (hostname, options, callback) => {
    // শুধুমাত্র IPv4 A-Record খুঁজবে
    dns.resolve4(hostname, (err, addresses) => {
      if (err || !addresses.length) {
        return dns.lookup(hostname, options, callback);
      }
      callback(null, addresses[0], 4);
    });
  },
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
  connectionTimeout: 10000,
});

export default transporter;
