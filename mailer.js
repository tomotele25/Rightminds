const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendSignupEmail = async (to, subject) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    // Plain text fallback
    text: "Welcome to Learnova!",
    // HTML version of the email
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
        <h2 style="text-align: center; color: #4f46e5;">Welcome to <span style="color: #10b981;">Learnova</span> 🎓</h2>
        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
          Hello there,
          <br/><br/>
          We're thrilled to have you as part of the Learnova community! 🚀
          Whether you're here to level up your skills or explore something new, you're in the right place.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://learnova.com" style="background-color: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Start Learning
          </a>
        </div>
        <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
          If you have any questions, feel free to reply to this email. We're always here to help.
          <br/><br/>
          Cheers, <br/>
          The Learnova Team
        </p>
      </div>
      <p style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px;">
        &copy; ${new Date().getFullYear()} Learnova. All rights reserved.
      </p>
    </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

const sendForgotPasswordEmail = async (to, token) => {
  const FRONTEND_URL = process.env.FRONTEND_URL;
  const resetLink = `${FRONTEND_URL}/reset/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Reset your Learnova password",
    text: "Click the link to reset your password",
    html: `
      <div style="font-family:sans-serif;background:#f9fafb;padding:30px;">
        <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:8px;">
          <h2 style="color:#4f46e5;">Reset Your Password</h2>
          <p>Click the button below to reset your password:</p>
          <div style="margin:20px 0;">
            <a href="${resetLink}" style="background:#10b981;color:#fff;padding:12px 20px;text-decoration:none;border-radius:5px;">Reset Password</a>
          </div>
          <p>This link expires in 15 minutes. If you didn’t request a reset, ignore this email.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Reset email sent:", info.response);
    return { success: true };
  } catch (error) {
    console.error("Reset email error:", error);
    return { success: false, error };
  }
};

module.exports = {
  sendSignupEmail,
  sendForgotPasswordEmail,
};
