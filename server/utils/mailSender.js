// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const mailSender = async (email, title, body) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",   // 🔥 FIXED
//       port: 587,                // 🔥 REQUIRED
//       secure: false,            // 🔥 REQUIRED for 587
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"StudyNotion" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("Email sent successfully:", info.response);
//     return info;
//   } catch (error) {
//     console.log("MAIL ERROR:", error.message);
//     throw error;
//   }
// };

// module.exports = mailSender;

require("dotenv").config();
const axios = require("axios");

const mailSender = async (email, title, body) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "StudyNotion",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email }],
        subject: title,
        htmlContent: body,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("MAIL ERROR:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = mailSender;
