import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'rakesh@winupskill.com',
    pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: "rakesh@winupskill.com",
  to: "sbasu@consultantsfactory.com",
};

export { transporter, mailOptions };
