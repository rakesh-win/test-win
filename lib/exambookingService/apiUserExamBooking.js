export const sendEmailUserExam = async (data) => {
    try {
      const response = await fetch("/api/exambookservice/sendUserExamBookingEmail", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        console.log("nodemailer: Retry");
        const errorData = await response.text();
        console.error("Error response:", errorData);
      } else {
        console.log("nodemailer: SentMail Successfully");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error sending mail:", error);
      throw error;
    }
  };
  