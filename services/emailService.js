// const nodemailer = require("nodemailer");

// const sendWelcomeEmail = async (user) => {
//   try {
//     console.log("📧 Email being sent to:", user.email);

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // use true for port 465
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: {
//         name: "DevChris",
//         adress: process.env.EMAIL_USER,
//       },
//       to: user.email,
//       subject: "🎉 Welcome to Learnova!",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2 style="color: #4A90E2;">Welcome to Learnova, ${user.username}!</h2>
//           <p>We're excited to have you on board. 🎓</p>
//           <p>You now have access to a community of learners, top-tier resources, and exciting opportunities for growth.</p>
//           <hr />
//           <p>If you have any questions, feel free to reply to this email.</p>
//           <p style="color: #888;">– The Learnova Team</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("✅ Welcome email sent to:", user.email);
//   } catch (err) {
//     console.error("❌ Failed to send welcome email:", err);
//   }
// };

// module.exports = sendWelcomeEmail;
