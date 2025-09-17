import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Survey() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://winupskill.in/api/api/surveyqs');
        setQuestions(response.data.data);
      } catch (error) {
        console.error('Error fetching survey questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    const currentQuestionId = questions[currentIndex]?.id;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionId]: value,
    }));
  };

  const handleNext = async () => {
    const currentQuestionId = questions[currentIndex]?.id;
    const userId = parseInt(localStorage.getItem('userid'));
    const answer = answers[currentQuestionId];

    if (!answer || answer.trim() === '') {
      alert('Please enter an answer before continuing.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('https://winupskill.in/api/api/survey', {
        question_id: currentQuestionId,
        user_id: userId,
        feedback_text: answer,
      });

      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Error submitting answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getInputType = (type) => {
    switch (type) {
      case "1":
      case 1:
        return "text";
      case "2":
      case 2:
        return "ratings";
      case "3":
      case 3:
        return "msq";
      case "4":
      case 4:
      default:
        return "msq";
    }
  };

  if (!questions.length) return <p>Loading questions...</p>;
  if (submitted) return <h3>Thanks for submitting the survey!</h3>;

  const currentQuestion = questions[currentIndex];
  const inputType = getInputType(currentQuestion.type);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <center><h2>Survey</h2></center>

      <div style={{ padding: 20, border: '1px solid #ccc', borderRadius: 8, marginBottom: 10 }}>
        <p><strong>Question {currentIndex + 1}:</strong> {currentQuestion.question}</p>

        {/* Render different inputs based on type */}
        {inputType === 'boolean' ? (
          <select
            value={answers[currentQuestion.id] || ''}
            onChange={handleInputChange}
            disabled={loading}
            style={{ width: '100%', padding: 8, marginBottom: 12 }}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        ) : inputType === 'ratings' ? (
          <select
            value={answers[currentQuestion.id] || ''}
            onChange={handleInputChange}
            disabled={loading}
            style={{ width: '100%', padding: 8, marginBottom: 12 }}
          >
            <option value="">Rate</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        ) : (
          <input
            type={inputType}
            placeholder="Your answer"
            value={answers[currentQuestion.id] || ''}
            onChange={handleInputChange}
            disabled={loading}
            style={{ width: '100%', padding: 8, marginBottom: 12 }}
          />
        )}

        <div>
          {currentIndex > 0 && (
            <button className="default-btn" onClick={handleBack} disabled={loading} style={{ marginRight: 8 }}>
              Back
            </button>
          )}
          <button className="default-btn" onClick={handleNext} disabled={loading}>
            {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Survey;
