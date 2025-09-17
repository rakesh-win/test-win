import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'training@winupskill.com',
    pass: 'uwtv zvpb lqob bujz',
  },
});


const mailOptions = {
  from: 'training@winupskill.com',
  to: 'uwtv zvpb lqob bujz'
};

export { transporter, mailOptions };
