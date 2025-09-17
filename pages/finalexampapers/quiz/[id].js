import React, { useCallback, useEffect, useState } from 'react';
import PageBanner from '@/components/Common/PageBanner';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button } from 'reactstrap';
import LoadingSpinner from '@/utils/LoadingSpinner';
import ExamTimer from '@/components/Quiz/ExamTimer';
import Link from 'next/link';

import { sendResults } from '@/lib/SendExamResultsToUser/sendResults'

const INITIAL_STATE = {
  name: "",
  email: "",
  number: "",
  linkedinurl: ""
};



const FinalExamPapers = () => {
  const router = useRouter();
  const URL3 = `${process.env.NEXT_PUBLIC_API}/getprofile`;
  const URL4 = `${process.env.NEXT_PUBLIC_API}/finalExamPaperData`;
  const URL5 = `${process.env.NEXT_PUBLIC_API}/finalExamPaperDataUpdate`;

  const [uid , setuid] = useState(null)
  const [userData, setUserData] = useState([]);
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
  const [headertext, setHeadertext] = useState(0);
	const [btntext, setBtntext] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [ userBool , setUserBool ] = useState({disablee:''})
  const [check ,setCheck] = useState(false)
  const [certiName ,setCertiName] = useState('')
  const [users, setUsers] = useState([])



  useEffect(() => {
    const token = localStorage.getItem('token')
    
    const fetchData = async () => {
      const res = await fetch('https://winupskill.in/api/api/users', {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      if (res.ok) {
        const data = await res.json() // Convert response to JSON
        console.log('avc',data)
        setuid(data.id)
        setUsers(data) // Update the state with fetched data
      } else {
        console.error('Error fetching data')
      }
    }
    
    fetchData()
  }, [])
 

    useEffect(() => { 

        const disableeFn = async () => {
        try {
          
          // setuid(storeid);
        
          const url = `${process.env.NEXT_PUBLIC_API}/finalExamPaperData?userid=${uid}&crsid=${crsid}`;
         
            const res = await axios.get(url)
            const finalExamBool = res.data.data.find(x => parseInt(x.userid) === parseInt(uid));
    
            if (finalExamBool) {
              setUserBool({ disablee: finalExamBool.disablee });
            }
      
        
        } catch (error) {
          console.log('Error fetching final exam paper data:', error);
        }
      };
        disableeFn()
    }, [uid]); 

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

  const [attemptRecorded, setAttemptRecorded] = useState(false);

  useEffect(() => {
    if (uid && quizid && crsid && !attemptRecorded) {
      examPaperFlag(quizid);
      setAttemptRecorded(true);
    }
  }, [uid, quizid, crsid])

  const examPaperFlag = async (quizid) => {
   const form = {
    'quizid':quizid,
    'userid':uid,
    'crsid':crsid,
    'disablee':'true',  
    'attempts':'true'

   }

    try {
      await axios.post(URL4,form).then(res=> 
        console.log(res.data)
      )
      console.log('Quiz flagging successful');
    } catch (error) {
      console.error('Error toggling quiz disable status:', error);
    }
  };



  const trackAnswer = (sub) => {
    const trackObj = {
      userid: parseInt(uid),
      courseid: parseInt(crsid),
      answer_given: String(sub.id),
      is_correct: sub.correct,
      question_id: parseInt(sub.question_id),
      questNo:currentQuestion+1
    };
  
    axios.post(`${process.env.NEXT_PUBLIC_API}/trackans`, trackObj)
      .then(res => {
        console.log("Answer tracked:", res.data);
      })
      .catch(err => {
        console.error("Error tracking answer:", err);
      });
  };
  
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/questions?quiz_id=${id}`);
      setQuestions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/qsoptions`);
      setOptions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPassingMarks = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/quiz?id=${id}`);
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
    const uname = localStorage.getItem('certiName');

    if (uname) {
      setCertiName(uname);
      try {
        const response = await axios.get(URL3);
        const userDatas = response.data.data.find(user => parseInt(user.id)=== parseInt(uid));
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/enrollstats`, {
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

;

    setScore(finalScore);

    sendEmail(finalScore)
    
    const form = {
      'quizid':quizid,
      'userid':uid,
      'crsid':crsid,
      'timetaken':timeLeft
     }
     const pass = {
      'quizid':quizid,
      'userid':uid,
      'crsid':crsid,
      'outcome':`pass ${finalScore}/${passingmark}`,
      'passingdate': (new Date()).toLocaleDateString('en-GB')
     }
     
     const fail = {
      'quizid':quizid,
      'userid':uid,
      'crsid':crsid,
      'outcome':`fail ${finalScore}/${passingmark}`
     }
  
    axios.put(URL5,form).then(res=>{
      return console.log(res)
    }
      )

   if(score<passingmark){
     setShowScore(true);
    axios.put(URL5,fail)
    // .then(res=>console.log(res))
   
  }
  if(score >= passingmark){
    setShowScore(true)
    axios.put(URL5,pass)
    // .then(res=>console.log(res))

   }

   setTimeLeft(false)
  
  if(  finalScore >=passingmark  ) {
    getCertificate()
  }
};


const getCertificate = async () => {
  setLoading(true);
  try {
    // it will Ensure `uid` and `crsid` are set correctly before making the request added
    if (uid && crsid) {
      const form = new FormData();
      form.append('userid', uid);
      form.append('uname',localStorage.getItem('certiName'))
      form.append('courseid', crsid);
      
      // Make the request to generate the certificate
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/finalExamPaperCerts`,
        form
      );
      console.log(response.data);
    } else {
      console.error('Missing userid or courseid');
    }
  } catch (error) {
    console.error('Error requesting certificate:', error);
  }
  setLoading(false);
};


const handleTimerUpdate = async(timeLeft) => {
  setTimeLeft(timeLeft);
if(timeLeft === '00:00:00'){
  setCheck(true)
  setTimeout(() => {
    // setShowScore(true)
    submitAllAnswers()

  }, 5000);
}
};


const sendEmail = async (finalScore) => {


  try {
    const fail = {
      toEmail:userData.email ,
      userName: userData.name,
      examName: courseName,
      passingmark:passingmark,
      score:finalScore,
      outcome:'fail',
      msg:`
      We regret to inform you that you have not achieved the passing score for your ${courseName} examination. We encourage you to review the course material and consider retaking the examination.
      <br/>
      <br/>
      To check your eligibility for and to schedule a retake, please write to us at exams@winupskill.com.
      `,
      msg1:`</br>`
    
    };
    const pass = {
      toEmail:userData.email ,
      userName: userData.name,
      examName: courseName,
      passingmark:passingmark,
      score:finalScore,
      outcome:'pass',
      msg :`
      Congratulations! You have successfully passed the ${courseName} examination. Your course completion certificate is now available in your win learning profile under the "My Certificates" tab. (Click on https://www.winupskill.com/user/my-profile?tab=3). 
      
      `,
      msg1:'For any further clarifications, write back to us at exams@winupskill.com.'

    };

  if(userData.name && userData.email && courseName && passingmark && score ){

  //   if (score < passingmark) {
  //     sendResults(fail);
  //  }
      if (finalScore >= passingmark) {
        sendResults(pass);
      }else{
        sendResults(fail);
      }
  } 
  } catch (error) {
    console.error('Error sending booking email:', error);
  }
};
  return (
    <React.Fragment>
      <PageBanner
        homePageUrl="/"
        homePageText="Final Exam papers"
        activePageText={`${courseName} - Exam Paper`}
      />
      <div></div>

      <div className="quizmain">
        {showScore ? (
          <div className="scorecard-wrapper">
            {score < passingmark && (
              <div className="scorecard">
                <h3>Scorecard</h3>
                <p>
                  <b>Candidate Name</b> {certiName}
                </p>
                <p>
                  <b>Examination:</b> {courseName}
                </p>
                <p>
                  <b>Total Score:</b> 40
                </p>
                <p>
                  <b>Passing Score:</b> {passingmark}
                </p>
                <p>
                  <b>Achieved Score:</b> {score}
                </p>
                <p>
                  <b>Result:</b> Fail
                </p>
                <p style={{ fontSize: 15 }}>
                  We regret to inform you that you have not achieved the passing
                  score for this examination. We encourage you to review the
                  course material and further consider retaking the exam.
                  <br />
                  To schedule a retake, please reach out to us at
                  exams@winupskill.com. We are here to support you in your
                  continued learning and success.
                </p>
                <center>
                  <a href="/user/my-profile?tab=1">
                    <button className="default-btn">My Profile</button>
                  </a>
                </center>
              </div>
            )}

            {score >= passingmark && (
              <div className="scorecard">
                <h3>Scorecard</h3>
                <p>
                  <b>Candidate Name</b> {certiName}
                </p>
                <p>
                  <b>Examination:</b> {courseName}
                </p>
                <p>
                  <b>Total Score:</b> 40
                </p>
                <p>
                  <b>Passing Score:</b> {passingmark}
                </p>
                <p>
                  <b>Achieved Score:</b> {score}
                </p>
                <p>
                  <b>Result: </b> Pass
                </p>
                <p>
                  Congratulations! You have successfully passed this
                  examination.
                  <br />
                  Your course completion certificate is now available in your
                  profile under "My Certificates" page.
                </p>
                <center>
                  <Link href="/user/my-profile?tab=3">
                    <button className="default-btn">My Certificate</button>
                  </Link>
                </center>
              </div>
            )}
          </div>
        ) : (
          <div>
            {userBool.disablee === "true" ? (
              <>
                <h3>
                  Oops! You do not have access to this examination.<br></br>
                  Kindly reach out to exams@winupskill.com to retake it.{" "}
                </h3>
                <Link href="/user/my-profile?tab=1">
                  <button className="default-btn">Enrolled Page</button>
                </Link>
              </>
            ) : (
              <div
                className="quiz-container"
                style={{ display: resflag ? "block" : "none" }}
              >
                <div className="question-section">
                  <div className=".page-title-content">
                    <span>Question {currentQuestion + 1}</span>/
                    {questions.length}
                    <span style={{ float: "right" }}>
                      {timeLeft && (
                        <ExamTimer
                          onTimerUpdate={handleTimerUpdate}
                          showScore={setShowScore}
                        />
                      )}
                    </span>
                  </div>
                  <div className="question-text" style={{ userSelect: "none" }}>
                    <h5>{questions[currentQuestion].question}</h5>
                  </div>
                </div>
                <div className="answer-section">
                  {options.length ? (
                    options.map((opns) => (
                      <button
                        key={opns.id}
                        className="option-block"
                        style={{
                          display:
                            questions[currentQuestion].id == opns.question_id
                              ? "block"
                              : "none",
                          background: ansgiven.find(
                            (ansg) => ansg.opnid == opns.id
                          )
                            ? "#f0ebf7"
                            : "#fff",
                        }}
                        onClick={() => {
                          handleAnswerOptionClick(opns);
                          trackAnswer(opns);
                        }}
                      >
                        {opns.option}
                      </button>
                    ))
                  ) : (
                    <h3>Loading..</h3>
                  )}
                </div>
                <div className=".page-title-content">
                  <span style={{ display: "block", marginTop: "30px" }}>
                    All Questions
                  </span>
                  {questions.length ? (
                    questions.map((questions2, index) => (
                      <a
                        key={questions2.id}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        <span
                          className="answerno-btn"
                          style={{
                            background: completedQuiz.includes(index)
                              ? "#D0140F"
                              : "#fff",
                            color: completedQuiz.includes(index)
                              ? "#fff"
                              : "#000",
                          }}
                        >
                          {index + 1}
                        </span>
                      </a>
                    ))
                  ) : (
                    <h3>No Questions</h3>
                  )}
                </div>
                {/* <button className='default-btn' style={{ margin: "25px 0px 0px 0px" }}  onClick={submitAllAnswers}>Submit
              {loading ? <LoadingSpinner /> : ""}
              </button> */}

                <button
                  disable={check}
                  className={`default-btn ${check ? "disabled-class-btn" : ""}`}
                  style={{ margin: "25px 0px 0px 0px" }}
                  onClick={submitAllAnswers}
                >
                  Submit {loading && <LoadingSpinner />}
                </button>
              </div>
            )}
            <div className="quiz-container">
              {loading ? (
                ""
              ) : (
                <div style={{ display: !resflag ? "block" : "none" }}>
                  "You currently do not have access to this. Please connect with
                  our support team."
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default FinalExamPapers;