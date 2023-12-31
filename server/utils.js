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
      // host: 'smtp.gmail.com',
      // port: 465,
      // secure: true, // use SSL
      // service: "gmail",
      host: "oscar-admin.orionmmtecheng.com",
      port: 465,
      secure: true,
      auth: {
        user: "support@oscar-admin.orionmmtecheng.com",
        pass: "he&#5nvAtZ%J"
      },
    });

    await transporter.sendMail({
      from: "support@oscar-admin.orionmmtecheng.com",
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