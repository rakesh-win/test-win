// api/sendEnrollmentEmail.js

import { transporter, mailOptions } from '@/lib/emailSender';

export default async function handler(req, res) {
  console.log('Start of /api/sendEnrollmentEmail.js');
  if (req.method === 'POST') {
    const data = req.body;
    const { toEmail, eventName, eventStart, eventEnd, eventTime} = data;

    if (!toEmail || !eventName || !eventStart || !eventEnd || !eventTime) {
      return res
        .status(400)
        .json({ message: 'Bad Request - Some data is missing' });
    }

    // Dynamically update the 'to' field in mailOptions
    mailOptions.to = toEmail;

    try {

      

      await transporter.sendMail({
        ...mailOptions,
        subject: 'You have successfully enrolled to the workshop by win!',
        text: `Dear Participant,\n\nCongratulations! You have successfully enrolled in the upcoming workshop. \n\nHere are the details:  \n\nWorkshop name: ${eventName}  \n\nDate of workshop: ${eventStart} to ${eventEnd} \n\nTime of workshop: ${eventTime} \n\n\nIn case of any modifications requirement for this schedule, you are requested to inform our team at least 7 calendar days prior. Write at info@winupskill.com \n\nBest regards,\nTeam Win Upskill`,
        html: `
          <p>Dear Participant,</p>
          <p>Congratulations! You have successfully enrolled in the upcoming workshop.</p>
          <p>Here are the details:</p>
          <p>Workshop name: <strong>${eventName}</strong></p>
          <p>Date of workshop: <strong>${eventStart} to ${eventEnd}</strong></p>
          <p>Time of workshop: <strong>${eventTime}</strong></p>
          <p>In case of any modifications requirement for this schedule, you are requested to inform our team at least 7 calendar days prior. Write at info@winupskill.com</p>
          <p>Best regards,<br>Team Win Upskill</p>
        `,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending enrollment email:', error);
      return res.status(500).json({ message: 'Error sending enrollment email' });
    }
  }

  res.status(200).json({ message: 'Invalid method' });
}



