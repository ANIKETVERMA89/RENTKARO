require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("Checking email credentials for:", process.env.EMAIL_USER);
console.log("Password length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ Connection Error:");
    console.log(error);
  } else {
    console.log("✅ Server is ready to take our messages");
  }
});
