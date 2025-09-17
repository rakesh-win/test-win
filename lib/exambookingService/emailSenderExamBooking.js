import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'rakesh@winupskill.com',
    pass: 'jqyx gdxm rqyl nckb',
  },
});

const mailOptions = {
  from: 'rakesh@winupskill.com',
  to:""
};

export { transporter, mailOptions };
