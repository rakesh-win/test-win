import axios from "axios";
import React, { useEffect, useState } from 'react';

const Result = () => {
  const [final, setFinal] = useState([]);

  useEffect(() => {
    axios.get("https://winupskill.in/api/api/scores")
      .then((response) => {
        setFinal(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const latestScore = final.length > 0 ? final[final.length - 1]?.score : null;

  let resultMessage = "";
  if (latestScore !== null) {
    resultMessage = latestScore < 20 ? "Unfortunately, you failed the exam." : "Congratulations, you passed the exam!";
  }

  return (
    <>
      {latestScore && (
        <h3>
          Your score is {latestScore}<br />
          {resultMessage}
        </h3>
        
      )}
    </>
  );
};

export default Result;
