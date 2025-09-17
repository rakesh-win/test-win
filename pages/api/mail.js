// import { transporter, mailOptions } from "@/lib/nodemailer";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const data = req.body;
//     const {
//       employeeOption,
//       locationOption,
//       countryOption,
//       standardOption,
//       totalCost,
//       name,
//       email,
//       mobile,
      
//     } = data;

//     if (
//       !employeeOption ||
//       !locationOption ||
//       !countryOption ||
//       !standardOption ||
//       !totalCost
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Bad Request - Some data is missing" });
//     }

//     try {
//       await transporter.sendMail({
//         ...mailOptions,
//         subject: "iso calculator",
//         text: "this is the string",
//         html: `
//         <p>Name : ${name}</p>
//         <p>email : ${email}</p>
//         <p>phone : ${mobile}</p>
//         <p>  </p>
//         <p>No Employee Option : ${employeeOption}</p>
//           <p> No of Scope location : ${locationOption}</p>  
//            <p>Country Primary scope : ${countryOption}</p> 
//            <p>Choice of Standard : ${standardOption}</p> 
//            <p>Total Cost ${totalCost} ${
//           countryOption === "India" ||
//           countryOption === "Afghanistan" ||
//           countryOption === "Bangladesh" ||
//           countryOption === "Bhutan" ||
//           countryOption === "Maldives" ||
//           countryOption === "Nepal" ||
//           countryOption === "Pakistan" ||
//           countryOption === "Sri Lanka"
//             ? "INR"
//             : "USD"
//         }</p> `,
//       });

//       //       await transporter.sendMail({
//       //         ...mailOptions1,
//       //         subject: ` consultantsfactory's iso calculator`,
//       //         html: `
//       // <p> hello </p>

//       // `,
//       //       });

//       return res.status(200).json({ success: true });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       return res.status(500).json({ message: "Error sending email" });
//     }
//   }

//   res.status(200).json({ name: "John Doe" });
// }


// api/mail.js

import { transporter, mailOptions } from "@/lib/nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const {
      employeeOption,
      locationOption,
      countryOption,
      standardOption,
      totalCost,
      name,
      email,
      mobile,
    } = data;

    if (
      !employeeOption ||
      !locationOption ||
      !countryOption ||
      !standardOption ||
      !totalCost
    ) {
      return res
        .status(400)
        .json({ message: "Bad Request - Some data is missing" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: "iso calculator",
        text: "this is the string",
        html: `
          <p>Name : ${name}</p>
          <p>Email : ${email}</p>
          <p>Phone : ${mobile}</p>
          <p>  </p>
          <p>No Employee Option : ${employeeOption}</p>
          <p>No of Scope location : ${locationOption}</p>  
          <p>Country Primary scope : ${countryOption}</p> 
          <p>Choice of Standard : ${standardOption}</p> 
          <p>Total Cost ${totalCost} ${
          countryOption === "India" ||
          countryOption === "Afghanistan" ||
          countryOption === "Bangladesh" ||
          countryOption === "Bhutan" ||
          countryOption === "Maldives" ||
          countryOption === "Nepal" ||
          countryOption === "Pakistan" ||
          countryOption === "Sri Lanka"
            ? "INR"
            : "USD"
        }</p> `,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Error sending email" });
    }
  }

  res.status(200).json({ name: "John Doe" });
}