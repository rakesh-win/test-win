// api/sendManagerEmail.js


import { transporter, mailOptions } from '@/lib/emailManagerSender';

export default async function handler(req, res) {
  console.log('Start of /api/sendManagerEmail.js');
  if (req.method === 'POST') {
    const data = req.body;
    const { regiUserId, regiUserName,  regiUserEmail, eventName, eventStart, eventEnd, eventTime } = data;    

    if (!regiUserId || !regiUserName || !regiUserEmail || !eventName || !eventStart|| !eventEnd|| !eventTime) {
      return res
        .status(400)
        .json({ message: 'Bad Request - Some data is missing' });
    }

    // Dynamically update the 'to' field in mailOptions
    // mailOptions.to = toEmail;

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: 'Win LMS: Workshop session opted by a student',
        text: `Dear win Team,,\n\nWorkshop delivery schedule chosen by a candidate.\n\nName: ${regiUserName} \n\nEmail ID: ${ regiUserEmail} \n\nCandidate ID: ${regiUserId} \n\nWorkshop name: ${eventName} \n\nDate of workshop: ${eventStart} to ${eventEnd} \n\nTime of workshop: ${eventTime}  \n\nPlease take a moment to review the details and make necessary arrangements to welcome the new participant. \n\nRegards,\nwin LMS`,
        html: `
          <p>Dear win Team,</p>
          <p>Workshop delivery schedule chosen by a candidate.</p>
          <p>Name: <strong>${regiUserName}</strong></p>
          <p>Email ID: <strong>${regiUserEmail}</strong></p>
          <p>Candidate ID: <strong>${regiUserId}</strong></p>
          <p>Workshop name: <strong>${eventName}</strong></p>
          <p>Date of workshop: <strong>${eventStart} to ${eventEnd}</strong></p>
          <p>Time of workshop: <strong>${eventTime}</strong></p>
          <p>Please take a moment to review the details and make necessary arrangements to welcome the new participant.</p>
          <p>Regards,<br>win LMS</p>
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






