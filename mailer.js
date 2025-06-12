const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendSignupEmail = async (to, name) => {
  try {
    const data = await resend.emails.send({
      from: "Rightminds Academy <onboarding@resend.dev>", // ✅ Use this for testing
      to,
      subject: "🎉 Welcome to Rightminds Academy!",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);">
            <div style="background-color: #1f2937; padding: 24px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to Rightminds, ${name}!</h1>
            </div>
            <div style="padding: 24px;">
              <p style="font-size: 16px; color: #333;">We're thrilled to have you join our learning community! 🚀</p>
              <p style="font-size: 15px; color: #555;">
                At <strong>Rightminds Academy</strong>, you're not just here to learn — you're here to grow, connect, and lead.
                Dive into your dashboard to start learning and engaging with others.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://rightminds-academy-risy.vercel.app/" 
                   style="background-color: #2563eb; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
                  Go to Dashboard
                </a>
              </div>
              <p style="font-size: 14px; color: #666;">Need help? Just reply to this email — we're always here for you.</p>
            </div>
            <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #999;">
              &copy; ${new Date().getFullYear()} Rightminds Academy. All rights reserved.
            </div>
          </div>
        </div>
      `,
    });

    console.log("Email sent!", data);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

module.exports = sendSignupEmail;
