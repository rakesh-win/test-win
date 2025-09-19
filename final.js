import React, { useEffect, useState } from 'react';
import PageBanner from '@/components/Common/PageBanner';
import { useRouter } from 'next/router';
import axios from 'axios';
import Alert from 'react-popup-alert';
import { Button } from 'reactstrap';
import LoadingSpinner from '@/utils/LoadingSpinner';
import ExamTimer from '@/components/Quiz/ExamTimer';

const INITIAL_STATE = {
  name: "",
  email: "",
  number: "",
  linkedinurl: ""
};

const FinalExamPapers = () => {
  const URL3 = 'https://winupskill.in/api/api/getprofile';
  const URL2 = 'http://127.0.0.1:8000/api/finalExamPaperBooleanUpdate';

  
  const [userid, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  
  const router = useRouter();
  const { id } = router.query;
  const [ loading ,setLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizid, setQuizid] = useState(0);
  const [crsid, setCrsid] = useState([]);
  const [passingmark, setPassingmark] = useState(0);
  const [questions, setQuestions] = useState([{"id":"0","question":"loading"}]);
  const [options, setOptions] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [bgColor, setBgColor] = useState('aliceblue');
  const [completedQuiz, setCompletedQuiz] = useState([]);
  const [ansgiven, setAnsgiven] = useState([]);
  const [resflag, setResflag] = useState(0);
  const [showDiv, setShowDiv] = useState(false);
  const [headertext, setHeadertext] = useState(0);
	const [btntext, setBtntext] = useState(0);
  console.log('res',resflag)
  
	const [alert, setAlert] = React.useState({
	    type: 'error',
	    text: 'This is a alert message',
	    show: false
	  })

	  function onCloseAlert() {
	    setAlert({
	      type: '',
	      text: '',
	      show: false 
	    })
	  }
 
	  function onShowAlert(type,text) {
	  	console.log("onShowAlert-52",type);
	    setAlert({
	      type: type,
	      text: text,
	      show: true
	    })
	  }
  console.log('first',crsid)

  useEffect(() => {
    setQuizid(id);
    localStorage.setItem('flagmatch', 0);

    const fetchData = async () => {
      await fetchPassingMarks();
      await fetchUserProfile();
      await fetchQuestions();
      await fetchOptions();
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (userid && quizid && crsid) {
      // examPaperFlag(quizid);
    }
  }, [userid, quizid]);

  const examPaperFlag = async (quizid) => {
   const form = {
    'quizid':quizid,
    'userid':userid,
    'crsid':crsid,
    'disablee':'true'
   }
   
    console.log('form',form)
    try {
      await axios.put(URL2, form);
      console.log('Quiz flagging successful');
    } catch (error) {
      console.error('Error toggling quiz disable status:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`https://winupskill.in/api/api/questions?quiz_id=${id}`);
      setQuestions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get('https://winupskill.in/api/api/qsoptions');
      setOptions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPassingMarks = async () => {
    try {
      const response = await axios.get(`https://winupskill.in/api/api/quiz?id=${id}`);
      const quizData = response.data.data[0];
      fetchCompletionStatus(quizData.course_id);
      setCourseName(quizData.name);
      setPassingmark(quizData.passingmarks);
      setCrsid(quizData.course_id);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserProfile = async () => {
    const storedUserID = localStorage.getItem('userid');
    if (storedUserID) {
      setUserID(storedUserID);
      try {
        const response = await axios.get(URL3);
        const userDatas = response.data.data.find(user => user.id === parseInt(storedUserID));
        
        if (userDatas) {
          setUserData(userDatas);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchCompletionStatus = async (ccid) => {
    setLoading(true)
    try {

      const token = localStorage.getItem("token");
      const response = await axios.get('https://winupskill.in/api/api/enrollstats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = response.data.find(item => item.id == ccid);
      setResflag(result);
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  };

  const handleAnswerOptionClick = (sub) => {
    const newObject = {
      qid: sub.question_id,
      opnid: sub.id,
      correct: sub.correct
    };
    setBgColor("#D0140F");
    handleAnswer(sub.correct);
    const existingAnswer = ansgiven.find(obj => obj.qid == parseInt(sub.question_id));

    if (existingAnswer) {
      const updatedAnswers = ansgiven.map(ans => {
        if (parseInt(ans.qid) == sub.question_id) {
          return { ...ans, opnid: sub.id, correct: sub.correct };
        }
        return ans;
      });
      setAnsgiven(updatedAnswers);
    } else {
      setAnsgiven([...ansgiven, newObject]);
    }
    setCompletedQuiz([...completedQuiz, currentQuestion]);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
    // else {
    //   setCurrentQuestion(0);
    // } 
    setBgColor("aliceblue");
  };

  const handleAnswer = (correct) => {
    if (correct === "Y") {
      setScore(score + 1);
    }
  };

  const submitAllAnswers = () => {
    let finalScore = 0;
    ansgiven.forEach(el => {
      if (el.correct === "Y") {
        finalScore += 1;
      }
    });
    // setScore(finalScore);
   if(score<passingmark){
     setShowScore(true);
   }else{
    setShowScore(false)
   }

   if(score>=passingmark){
    window.alert('Congrats, You have successfully passed the exam')
  }
  if(score>=passingmark) {
    getCertificate()
  }

};

  const handleRetake = () => {
  };

const getCertificate = async () => {
  setLoading(true)
  try {
  window.alert('hi')
    // const form = new FormData();
    // form.append('userid', userid);
    // form.append('courseid', crsid);
    // await axios.post('https://winupskill.in/api/api/finalExamPaperCerts', form).then(res=>{
    //   if(res.status===200){
    //     console.log('certificate successfully')
    //     setHeadertext("Certificate Received successfully");
    //     setBtntext("Continue");
    //     onShowAlert("success", "You will be taken to your profile page now!");
    //   }else{
    //   router.push('/');

    //   }
    // });
    // router.push('/user/my-profile');
    // console.log('Certificate request successful');

   
  } catch (error) {
    console.error('Error requesting certificate:', error);
  }
}
  
  return (
    <React.Fragment>
      <PageBanner 
        homePageUrl="/" 
        homePageText="Final Exam papers" 
        activePageText={courseName} 
      />
      <div>
        <Alert
          header={headertext}
          btnText={btntext}
          text={alert.text}
          type={alert.type}
          show={alert.show}
          onClosePress={() => setAlert({ type: '', text: '', show: false })}
          pressCloseOnOutsideClick={true}
          showBorderBottom={true}
        />
      </div>
      <div className='quizmain'>
        {showScore ? (
          <div className="scorecard-wrapper">
            {score < passingmark &&
              <div className="scorecard fail">
                <h3>Scorecard</h3>
                <p><b>Customer Name:</b> {userData.name}</p>
                <p><b>Name of the Course:</b> {courseName}</p>
                <p><b>Passing Mark:</b> {passingmark}</p>
                <p><b>Scored Mark:</b> {score}</p>
                <p><b>Pass/Fail:</b> Fail</p>
                <p>Note: Please review the course and reach out to info@winupskill.com to retake the exam.</p>

                <center>
                  <a href='/user/my-profile'>
                    <button className='default-btn'>Submit</button>
                  </a>
                </center>
              </div>
            }
          </div>
        ) : (
          <>
            <div className='quiz-container' style={{ display: resflag ? 'block' : 'none' }}>
              <div className='question-section'>
                <div className='.page-title-content'>
                  <span>Question {currentQuestion + 1}</span>/{questions.length} <span style={{float:'right'}}><p>Time taken </p> <p><ExamTimer/></p> </span>
                </div>
                <div className='question-text'>
                  <h5>{questions[currentQuestion].question}</h5>
                </div>
              </div>
              <div className='answer-section'>
                {options.length ? options.map(opns => (
                  <button
                    key={opns.id}
                    className='option-block'
                    style={{
                      display: (questions[currentQuestion].id == opns.question_id) ? 'block' : 'none',
                      background: ansgiven.find(ansg => ansg.opnid == opns.id) ? '#f0ebf7' : '#fff'
                    }}
                    onClick={() => handleAnswerOptionClick(opns)}
                  > {opns.option}
                  </button>
                )) : (<h3>Loading..</h3>)}
              </div>
              <div className='.page-title-content'>
                <span style={{ display: 'block', marginTop: "30px" }}>All Questions</span>
                {questions.length ? questions.map((questions2, index) => (
                  <a key={questions2.id} onClick={() => setCurrentQuestion(index)}>
                    <span className='answerno-btn' style={{
                      background: completedQuiz.includes(index) ? '#D0140F' : '#fff',
                      color: completedQuiz.includes(index) ? '#fff' : '#000'
                    }}>
                      {index + 1}
                    </span>
                  </a>
                )) : (<h3>No Questions</h3>)}
              </div>
              {/* <button className='default-btn' style={{ margin: "25px 0px 0px 0px" }}  onClick={submitAllAnswers}>Submit
              {loading ? <LoadingSpinner /> : ""}
              </button> */}
     
                <button className='default-btn' style={{ margin: "25px 0px 0px 0px" }} onClick={submitAllAnswers}>
                  Submit {loading && <LoadingSpinner />}
                </button>
            </div>
            <div className='quiz-container'>
  {loading ? (
""
  ) : (
    <div 
    style={{ display: (!resflag) ? 'block' : 'none' }}
    >
    "You currently do not have access to this. Please connect with our support team."
 </div> )}
</div>

          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default FinalExamPapers;
// timer