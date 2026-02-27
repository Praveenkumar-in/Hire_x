


const nodemailer = require("nodemailer");

// DEBUG ENV VARIABLES
console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
console.log("📧 EMAIL_PASS exists:", process.env.EMAIL_PASS ? "YES" : "NO");

// CREATE TRANSPORTER
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// VERIFY CONNECTION (VERY IMPORTANT FOR RENDER)
transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

const sendEmail = async ({ to, subject, html }) => {
  try {

    console.log("📨 Sending email...");
    console.log("➡️ To:", to);
    console.log("➡️ Subject:", subject);

    const info = await transporter.sendMail({
      from: `"HireX" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
    });

    console.log("✅ Email sent successfully!");
    console.log("📨 Message ID:", info.messageId);

  } catch (error) {
    console.error("❌ Email send failed:");
    console.error(error);
  }
};

module.exports = sendEmail;