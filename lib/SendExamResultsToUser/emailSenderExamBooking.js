import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'training@winupskill.com',
    pass: 'ejpk upfm ngak imjg',
  },
});

const mailOptions = {
  from: 'training@winupskill.com',
  to:""
};

export { transporter, mailOptions };
