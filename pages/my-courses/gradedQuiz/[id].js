import React, { useEffect, useState,useCallback, Component } from 'react'
import PageBanner from '@/components/Common/PageBanner'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import {useRouter} from "next/router"
import ReactDOM from "react-dom";
import Router from 'next/router'
 
import Alert from 'react-popup-alert';

const GradedQuiz = () => {
  const [userid, setUserid] = React.useState()
  const router = useRouter();
  
  const {id} = router.query;
  const [final1,setFinal1]=useState(0)
  const [final3,setFinal3]=useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizid, setQuizid] = useState(0);
  const [crsid, setCrsid] = useState(0);
  const [passingmark, setPassingmark] = useState(0);
  const [qs, setQs] = React.useState([]);
  const [questions, setQuestions] = React.useState([{"id":"0","question":"loading"}]);
  const [options, setOptions] = React.useState([]);
  const [courseName, setcourseName] = React.useState(0);
  const [bgColor, setbgColor] = React.useState('aliceblue');
  const [completedQuiz, setCompletedQuiz] = React.useState([]);
  const [selectedans, setSelectedans] = React.useState([]);
  const [ansgiven, setAnsgiven] = React.useState([]);
  const [obj, setObj] = React.useState([]);
  const [flag, setFlag] = useState(0);
  const [qlen, setQlen] = useState(0);
  const [passm, setPassm] = useState(0);

  const [headertext, setHeadertext] = useState(0);
  const [btntext, setBtntext] = useState(0);

  const [showDiv, setShowDiv] = useState(false);

  const [alert, setAlert] = React.useState({
      type: 'error',
      text: 'This is a alert message',
      show: false
    })

    function onCloseAlert() {

      if(alert.type === 'success'){
        
      }

      setAlert({
        type: '',
        text: '',
        show: false 
      })
    }
 
    function onShowAlert(type,text) {
      
      setAlert({
        type: type,
        text: text,
        show: true
      })
    }


    useEffect(() => {
        getOptions();
        passingmarks();
        setQuizid(id);
        localStorage.setItem('flagmatch', 0);
        setcourseName(localStorage.getItem('crsname'));
        axios.get('https://winupskill.in/api/api/questions?quiz_id='+id)
            .then(QQ=> {
                setQuestions(QQ.data.data)
           
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

  
    const getOptions = async() => {
           const url = `https://winupskill.in/api/api/qsoptions`
            var response = await axios.get(url).then(
             options => {
                setOptions(options.data.data)
             })
    }

    const passingmarks = async() => {
           const url = `https://winupskill.in/api/api/quiz?id=${id}`
            var responsep = await axios.get(url).then(
             quizs => {
                setPassingmark(quizs.data.data[0].passingmarks,
                setCrsid(quizs.data.data[0].course_id)

                  )
             })
    }

    
    

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    let final = 0;
    
    const handleAnswerOptionClicksub = async (sub) => {
      const newObject = { 
        qid: sub.question_id, 
        opnid: sub.id,
        correct: sub.correct
      };
    
      setObj(newObject);
      handleAnswerOptionClick(sub.correct);
    
      const result = ansgiven.find(obj => obj.qid == parseInt(sub.question_id));
      ansgiven.forEach(el => {
        if (parseInt(el.qid) == parseInt(sub.question_id)){
          localStorage.setItem('flagmatch', 1);
        }
      });
    
      const tmpflag = localStorage.getItem('flagmatch');
    
      if (tmpflag == 1){
        const updansgiven = ansgiven.map(ansss => {
          if (parseInt(ansss.qid) == sub.question_id) {
            return { ...ansss, opnid: sub.id, correct: sub.correct };
          }
          return ansss;
        });
    
        setAnsgiven(updansgiven);
        setQlen(prevCount => prevCount + 1);
        localStorage.setItem('flagmatch', 0);
      } else {
        const newItems = [...ansgiven, newObject];
        setAnsgiven(newItems);
        setQlen(prevCount => prevCount + 1);
      }
    
      // Accumulate the value of opns.current
      let totalcorrect = parseInt(sub.correct);
      setFinal1(prevFinal1 => totalcorrect + prevFinal1);
      
     const final2 = totalcorrect + final1
       
      setbgColor("#592a9c");
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setCurrentQuestion(0);
      }
    
      setbgColor("aliceblue");
  
    };
    
    
    const handleAnswerOptionClick = async (final2) => {
      completedQuiz.push(currentQuestion);
      const updatedScore = parseInt(score) + parseInt(final2);
      setScore(updatedScore);
    };
    
    
    
  function handlequizComplete () {

        const ctx=0;
        const { id } = parseCookies(ctx)
        const qscoredata = new FormData()
        qscoredata.append('action',"coursecomplete")
        qscoredata.append('csrid', crsid)
        qscoredata.append('quizid', quizid)
        qscoredata.append('user_id', id)
        qscoredata.append('score', score)
        

        
        const response = axios.post('https://winupskill.in/api/api/scores', qscoredata)
       .then((e)=>{
                // console.log("donew")  
       })
       .catch((b)=>{
              //  console.log("j", b)
       })
  }  

  function handleClick() {
    setShowDiv(!showDiv);
  }

function handleRetake () {
 window.location.reload();
}

  

  return ( 
    <React.Fragment>

        <div className='quizmain'>
			{showScore ? (

        <div>
				<div className='score-section'>
					<h3>You scored {score} out of {questions.length}</h3>

				</div>		
				

				<div style={{display: (score >= passingmark)? 'block' : 'none'}}>
					<h3>Congratulations! You have passed and successfully completed this course</h3>
          <button className='default-btn' onClick={() => handlequizComplete ()} >Mark Complete</button>
				</div>


        <div style={{display: (score < passingmark)? 'block' : 'none'}}>
          <h3>Unfortunately You did not obtain the passing marks!</h3>
          <button className='default-btn' onClick={() => handleRetake ()}>Retake</button>

        </div>

        <div className="reviewansdiv">
              <button className='default-btn' onClick={handleClick}>Review Answers</button>
              {showDiv && (
                <div>
                  {questions.map((qss, index) => (
                      <div className='allqss' key={index}>
                        <span className='allqssline'>Question: {index+1}</span>
                        <span className='allqsslinebold'>{qss.question}</span>
                       
                                <ul>
                                  {options.filter(item => item.question_id == qss.id).map((opss, index2) => (
                                    <li style={{display: (opss.question_id == qss.id)? 'list-item' : 'none'}}
                                    key={index2}>{opss.option}

                                      <span style={{display: (opss.correct === "Y")? 'inline-flex' : 'none', "marginLeft": "10px", "font-weight":"bold"}}>
                                        - Correct Option 
                                      </span>

                                      <span style={{display: (opss.correct === "N")? 'inline-flex' : 'none', "marginLeft": "10px", "font-weight":"bold"}}>
                                        - Incorrect Option
                                      </span>

                                      <span style={{display: ((opss.question_id == qss.id) && ((ansgiven.find(ansgiven => ansgiven.opnid === opss.id))))? 'inline-flex' : 'none', "marginLeft": "10px", "font-weight":"bold"}}>
                                        - You answered this
                                      </span>

                                    </li>
                                  ))}
                                </ul>
                                 <span className='allqssline'><span style={{"fontWeignt":"bold"}}>Answer rationale:</span> {qss.justification}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

        </div>
			) : (
				<>
          <div className='quiz-container'>

          <div className='question-section'>
						<div className='.page-title-content'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>
						 <h5>{questions[currentQuestion].question}</h5>
						</div>
					</div>
		<div className='answer-section'>
		                 {options.length ? options.map(opns => (

		                          <button style={{ display: (questions[currentQuestion].id == opns.question_id)? 'block' : 'none',  background: (ansgiven.find(ansg => ansg.opnid == opns.id))? '#f0ebf7': '#fff',}} key={opns.id} className='option-block' onClick={() => handleAnswerOptionClicksub(opns)} >{opns.option}</button>
		                    
		                    )) : (<h3>No Options</h3>)
		                  }
		             </div>


                  <div className='.page-title-content'>

                    <span style={{
                      display: 'block',
                      "marginTop":"30px"

                    }}>All Questions</span>

                  {questions.length ? questions.map((questions2, index) => (


                  <a onClick={async e => {
                                          e.preventDefault(); 
                                          setCurrentQuestion(index);}}>
                 <span className='answerno-btn' key={questions2.id} 
                  style={{backgroundColor: (questions2.id === questions[currentQuestion].id)? '#84c5fe' : '#ffffff',
                          backgroundColor: completedQuiz.includes(index)? '#592a9c': '#fff',
                          color: completedQuiz.includes(index)? '#fff': '#000'}}
                  >
                {index+1}
               </span>
                  </a>
                )) : (
                                    <h3>No Questions</h3>
                )}

                </div>

			    </div>

          <div className="quiz-container submitmsgquiz">
      
            <div className="row">
            <div className="col-lg-9">
              <p>You have currently answered {ansgiven.length} out of {questions.length} questions. The passing marks for this Quiz is: {passingmark}</p>
              <p>If you want to submit the quiz, please press Submit & View Score to continue.</p>
            </div>

            <div className="col-lg-3">
            <Link href="/my-courses/gradedQuiz/Result" ><button className='default-btn' onClick={() => handlequizComplete()}>Submit & View Score</button></Link>
            </div>
          </div>
          </div>

			   </>
			)}
		</div>
    </React.Fragment>
  );
};


export default GradedQuiz