// api/sendExamResultEmail.js

import { transporter, mailOptions } from '@/lib/SendExamResultsToUser/emailSenderExamBooking';

export default async function handler(req, res) {
  console.log(req.body)
  if (req.method === 'POST') {
    const data = req.body;
    const {toEmail ,userName , examName , passingmark , score , outcome , msg,msg1} = data;

    if (!toEmail || !userName  || !examName || !passingmark || !score ||!outcome ||  !msg || !msg1 ) {
      return res
        .status(400)
        .json({ message: 'Bad Request - Some data is missing' });
    }

    // Dynamically update the 'to' field in mailOptions
    mailOptions.to = toEmail;

    try {

      await transporter.sendMail({
        ...mailOptions,
        subject: `Your ${examName} Examination Result`,
        html: `
       <p> Hi ${userName},</p>
        <br/>
        ${msg}
        <br/>
        <br/>
        <p>Scorecard <br/>
         <b>Participant Name:</b> ${userName}<br/>
         <b>Examination:</b> ${examName}<br/>
         <b>Total Score:</b> 40<br/>
         <b>Passing Score:</b> ${passingmark}<br/>
         <b>Achieved Score:</b> ${score}<br/>
         <b>Result:</b> ${outcome} <br/>
         </p>
        <br/>

       ${msg1}
        
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


