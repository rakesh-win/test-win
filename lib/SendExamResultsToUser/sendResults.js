
export const sendResults = async (data) => {
  console.log('data',data)
  try {
    const response = await fetch("/api/examsendresults/sendExamResultEmail", {
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
    return await response.json({success:" mail sent :)"});

  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
};
