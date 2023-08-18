const path = require("path");
const fs = require("fs");
const nodemailer = require('nodemailer');
const rootDir = path.join(__dirname, "..");

const deleteFile = (fileName) => {
  fs.unlink(path.join(rootDir, fileName), (err) => {
    if (err) console.log(err);
  });
};

const sendEmail = async (email, subject, text) => {
  try {
    console.log(process.env.USER, process.env.PASS);
    const transporter = nodemailer.createTransport({
      // host: process.env.HOST,
      // service: process.env.SERVICE,
      // port: 587,
      // secure: true,

      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "winlhanphyo2@gmail.com",
        pass: "hzankrhkuwdupeao",
      },
    });

    await transporter.sendMail({
      from: "winlhanphyo2@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { rootDir, deleteFile, sendEmail };