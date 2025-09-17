export const sendForm = async (data) => {
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
  console.log("nodemailer: Retry");
      }else{
  console.log("nodemailer: SentMail Successfully");
  
      } 
  
      return await response.json();
    } catch (error) {
      console.error("Error sending form:", error);
      throw error;
    }
  };
  