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


const SingleQuiz = () => {
const [userid, setUserid] = React.useState()
const router = useRouter();
const {id} = router.query;
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
  const [loading2, setLoading2] = useState(true);


  const [crstype, setCrstype]= useState([])


  const [alert, setAlert] = React.useState({
      type: 'error',
      text: 'This is a alert message',
      show: false
    })

    function onCloseAlert() {

      if(alert.type === 'success'){
        console.log("pressed close")
      }

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
    useEffect(() => {
      getCrsTypeName()
        getOptions();
        passingmarks();
        setQuizid(id);
        localStorage.setItem('flagmatch', 0);
        setcourseName(localStorage.getItem('crsname'));
        axios.get('https://winupskill.in/api/api/questions')
            .then(QQ=> {
                 // Filter the questions where quiz_id contains the id from useParams
            const filteredQuestions = QQ.data.data.filter(question => {
              const quizIds = question.quiz_id.split(',').map(ids => ids.trim()); // Split and trim quiz_ids
              return quizIds.includes(id); // Match dynamically with 'id' from useParams
          });
          console.log(filteredQuestions); // Check filtered results
          setQuestions(filteredQuestions);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [id]);

    // useEffect(() => {
    //   getCrsTypeName()
    //     getOptions();
    //     passingmarks();
    //     setQuizid(id);
    //     localStorage.setItem('flagmatch', 0);
    //     setcourseName(localStorage.getItem('crsname'));
    //     axios.get('https://winupskill.in/api/api/questions?quiz_id='+id)
    //         .then(QQ=> {
    //             setQuestions(QQ.data.data)
           
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }, []);

    const [filteredQuestions, setFilteredQuestions] = useState([]);

      useEffect(() => {
        const filtered = questions.filter(question =>
          ansgiven.some(item => item.qid == question.id)
        );
        setFilteredQuestions(filtered);
      }, [questions, ansgiven]);

      

  
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
          if(parseInt(el.qid) == parseInt(sub.question_id)){
            localStorage.setItem('flagmatch', 1);
           }
          });

           const tmpflag = localStorage.getItem('flagmatch');
         
        
          if(tmpflag == 1){
              const updansgiven = ansgiven.map(ansss => {
                  if (parseInt(ansss.qid) == sub.question_id) {
                      return { ...ansss, opnid: sub.id, correct: sub.correct };
                    }
                    return ansss;
                  });

              setAnsgiven(updansgiven);
              setQlen(prevCount => prevCount + 1);

            //this.setState({ count: this.state.count + 1 });
            localStorage.setItem('flagmatch', 0);
          }
          else{
              const newItems = [...ansgiven, newObject]; // creating new array with modified value
              setAnsgiven(newItems); // setting state with new array
              setQlen(prevCount => prevCount + 1);
              //ansgiven.push(newObject);
            }
        
      
     setbgColor("#D0140F");

      const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          
          setCurrentQuestion(0);
          //setShowScore(true);
        }

        setbgColor("aliceblue");
    
  }

  const pushtoarray = async() => {
    
  }
   
  const handleAnswerOptionClick = async (correct) => {
    completedQuiz.push(currentQuestion);
      
      if (correct === "Y") {
          setScore(score + 1);
      }

     
    };

   const submitallans = async () => {
    const i = 0;
    ansgiven.forEach(el => {
      if(el.correct === "Y")
      {
        i = i+1;
      }
    });
    //handlequizComplete(i);
    setScore(i);
    setShowScore(true);

    // if(qlen < questions.length){
    
    //     setHeadertext("Submit Quiz!"),
    //     setBtntext("Submit & View Score"),
    //     onShowAlert("success",`You have only answered ${qlen} out of ${questions.length} questions. Do you still want to submit the quiz? \n \n Please press Submit & View Score to confirm and see your scores. Click anywhere outside this box to close this message and continue with your quiz.`)
   
    // }
   }

   const getCrsTypeName = async () => {
    try {
        // Fetch quiz data
        const quizResponse = await axios.get(`https://winupskill.in/api/api/quiz?id=${id}`);
        const quizData = quizResponse.data.data[0];

        // Fetch course data
        const courseResponse = await axios.get('https://winupskill.in/api/api/courses');
        const courseData = courseResponse.data.data;

        // Use find instead of filter, assuming there's only one match
        const crsdata = courseData.find(crs => crs.id.toString() === quizData.course_id);

        if (crsdata) {
            setCrstype(crsdata.type);
        } else {
            console.warn('Course data not found for the quiz.');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



  

 
function handlequizComplete() {
    const ctx = 0;
    const { id } = parseCookies(ctx);
    const qscoredata = new FormData();
    qscoredata.append('action', 'coursecomplete');
    qscoredata.append('csrid', crsid);
    qscoredata.append('quizid', quizid);
    qscoredata.append('user_id', id);
    qscoredata.append('score', score);

    axios.post('https://winupskill.in/api/api/scores', qscoredata)
        .then(result => {
            if (result.status === 200 || result.status === 201) {
                if (crstype === 'crs-micro') {
                    return axios.post('https://winupskill.in/api/api/issuecerts', {
                        "userid": id,
                        "courseid": crsid
                    });
                }
            }
        })
        .then(certResult => {
          if (crstype === 'crs-micro' && (certResult.status === 200 || certResult.status === 201)) {
              setHeadertext("Congratulations!");
              setBtntext("Continue");
              onShowAlert("success", "You have successfully completed this course. The certificate is generated and available in your profile now.");
          }
      })
        .then(() => {
            Router.push('/user/my-profile');
        })
        .catch(error => {
            console.error('Error handling quiz completion:', error);
            // Handle errors here
        });
}



  function handleClick() {
    setShowDiv(!showDiv);
  }

function handleRetake () {
 window.location.reload();
}

  

  return ( 
    <React.Fragment>
    

      <PageBanner 
                homePageUrl="/user/my-profile" 
                homePageText="My Courses" 
                activePageText={`${courseName} / Quiz`} 
            />  



            <div>
            
            <Alert
              header={headertext}
              btnText={btntext}
              text={alert.text}
              type={alert.type}
              show={alert.show}
              onClosePress={onCloseAlert}
              pressCloseOnOutsideClick={true}
              showBorderBottom={true}
              alertStyles={{}}
              headerStyles={{}}
              textStyles={{}}
              buttonStyles={{}}


            />

            
          </div>




        <div className='quizmain'>
			{showScore ? (

        <div>
				<div className='score-section'>
					<h3>You scored {score} out of {questions.length}</h3>

				</div>		
				

				<div style={{display: (score >= passingmark)? 'block' : 'none'}}>
					<h3>Congratulations! You have passed and successfully completed this course</h3>
          <button className='default-btn'
          onClick={() => handlequizComplete ()}
          >Mark Complete</button>
				</div>

     


        <div style={{display: (score < passingmark)? 'block' : 'none'}}>
          <h3>Unfortunately You did not obtain the passing marks!</h3>
          <button className='default-btn'
          onClick={() => handleRetake ()}>Retake</button>

        </div>

        <div className="reviewansdiv">
              <button className='default-btn' onClick={handleClick}>Review Answers</button>
              {showDiv && (
                <div>
                  {filteredQuestions.map((qss, index) => (
                      <div className='allqss' key={index}>
                        <span className='allqssline'>Question: {index+1}</span>
                        
                        <span className='allqsslinebold'>{qss.question}</span>
                            
                                <ul>
                                  {options.filter(item => item.question_id == qss.id).map((opss, index2) => (
                                    <li style={{display: (opss.question_id == qss.id)? 'list-item' : 'none'}}
                                    key={index2}>{opss.option}

                                      <span style={{display: (opss.correct === "Y")? 'inline-flex' : 'none', "marginLeft": "10px", "fontWeight":"bold", color: "green"}}>
                                        - Correct Option 
                                      </span>

                                      <span style={{display: (opss.correct === "N")? 'inline-flex' : 'none', "marginLeft": "10px", "fontWeight":"bold", color: "red"}}>
                                        - Incorrect Option
                                      </span>

                                      <span style={{display: ((opss.question_id == qss.id) && ((ansgiven.find(ansgiven => ansgiven.opnid === opss.id))))? 'inline-flex' : 'none', "marginLeft": "10px", "fontWeight":"bold"}}>
                                        - You answered this
                                      </span>

                                    </li>
                                  ))}
                                </ul>

                                
                                 <span className='allqssline'><span style={{display: qss.justification === null || '' ? 'none' : '' , "fontWeignt":"bold"}}>Answer rationale:</span> {qss.justification}</span>
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

		                          <button 
		                          style={{

                                // display: (ansgiven.find(ansg => ansg.opnid == opns.id))? 'block' : 'none', 

                             display: (questions[currentQuestion].id == opns.question_id)? 'block' : 'none', 
                              background: (ansgiven.find(ansg => ansg.opnid == opns.id))? '#f0ebf7': '#fff',

                              }}
                              
		                          key={opns.id} className='option-block'
		                          onClick={() => handleAnswerOptionClicksub(opns)}
                             
		                          >{opns.option}</button>
		                    
		                    )) : (
                        <div>

                          {loading2 ? (
                              // Show a loading spinner or custom message while values are loading
                              <div style={{margin:"100px 100px 300px 100px"}}>Loading question options...</div>
                              ) : ( 

                                <h3>No Options</h3>

                                )}

                        </div>



                        )
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
                                          setCurrentQuestion(index);
                                          
                                          }}
                                        >
                  <span className='answerno-btn' key={questions2.id} 
                  style={{backgroundColor: (questions2.id == questions[currentQuestion].id)? '#84c5fe' : '#ffffff'}}
                   style={{background: completedQuiz.includes(index)? '#D0140F': '#fff',
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
              <button className='default-btn'
                    onClick={() => submitallans()}
                    >Submit & View Score 
              </button>
            </div>
          </div>
          </div>

			   </>
			)}


		</div>

 
    
      

    </React.Fragment>
  );
};


export default SingleQuiz