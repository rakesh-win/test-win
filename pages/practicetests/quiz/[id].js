import React, { useEffect, useState, useCallback, Component } from "react";
import PageBanner from "@/components/Common/PageBanner";
import Link from "next/link";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useRouter } from "next/router";
import ReactDOM from "react-dom";
import Router from "next/router";
import Alert from "react-popup-alert";

const INITIAL_STATE = {
  name: "",
  email: "",
  number: "",
  linkedinurl: "",
};

const SingleQuiz = () => {
  const [userid, setUserid] = React.useState();
  const router = useRouter();
  var abc = router.query.id;
  const { id } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizid, setQuizid] = useState(0);
  const [crsid, setCrsid] = useState(0);
  const [passingmark, setPassingmark] = useState(0);
  const [qs, setQs] = React.useState([]);
  const [questions, setQuestions] = React.useState([
    { id: "0", question: "loading" },
  ]);
  const [options, setOptions] = React.useState([]);
  const [courseName, setcourseName] = React.useState(0);
  const [bgColor, setbgColor] = React.useState("aliceblue");
  const [completedQuiz, setCompletedQuiz] = React.useState([]);
  const [selectedans, setSelectedans] = React.useState([]);
  const [ansgiven, setAnsgiven] = React.useState([]);
  const [obj, setObj] = React.useState([]);
  const [flag, setFlag] = useState(0);
  const [qlen, setQlen] = useState(0);
  const [passm, setPassm] = useState(0);
  const [free, setFree] = useState(0);
  const [scoreflag, setScoreflag] = useState(0);
  const [resflag, setResflag] = React.useState(0);

  const [headertext, setHeadertext] = useState(0);
  const [btntext, setBtntext] = useState(0);

  const [showDiv, setShowDiv] = useState(false);

  const [alert, setAlert] = React.useState({
    type: "error",
    text: "This is a alert message",
    show: false,
  });

  function onCloseAlert() {
    if (alert.type === "success") {
      console.log("pressed close");
    }

    setAlert({
      type: "",
      text: "",
      show: false,
    });
  }

  function onShowAlert(type, text) {
    console.log("onShowAlert-52", type);
    setAlert({
      type: type,
      text: text,
      show: true,
    });
  }

  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const filtered = questions.filter((question) =>
      ansgiven.some((item) => item.qid == question.id)
    );
    setFilteredQuestions(filtered);
  }, [questions, ansgiven]);

  useEffect(() => {
    getOptions();
    passingmarks();
    setQuizid(id);
    localStorage.setItem("flagmatch", 0);

    axios
      .get("https://winupskill.in/api/api/questions?quiz_id=" + id)
      .then((QQ) => {
        setQuestions(QQ.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getOptions = async () => {
    const url = `https://winupskill.in/api/api/qsoptions`;
    var response = await axios.get(url).then((options) => {
      setOptions(options.data.data);
    });
  };

  const passingmarks = async () => {
    const url = `https://winupskill.in/api/api/quiz?id=${id}`;
    var responsep = await axios.get(url).then((quizs) => {
      console.log("quizs", quizs);
      setcourseName(quizs.data.data[0].name),
        setPassingmark(
          quizs.data.data[0].passingmarks,
          setCrsid(quizs.data.data[0].course_id),
          setFree(quizs.data.data[0].course_id),
          getcompletionStatus(quizs.data.data[0].course_id)
        );
    });
  };

  const getcompletionStatus = async (ccid) => {
    console.log("ccid", ccid);
    const ctx = 0;
    const token = localStorage.getItem("token");
    const payload = {
      headers: { Authorization: "Bearer " + token },
    };

    const resenroll = await axios.get(
      "https://winupskill.in/api/api/enrollstats",
      payload
    );
    console.log("resenroll", resenroll);

    var result = 0;
    if (resenroll.data.length) {
      result = resenroll.data.find((item) => item.id == ccid);
    }

    console.log("result", result);

    setResflag(result);
  };

  const [contact, setContact] = useState(INITIAL_STATE);
  // const { register, handleSubmit, errors } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  function onSubmitqform() {
    // e.preventDefault();
    try {
      // const url = `${baseUrl}/api/contact`;
      const { name, email, number, linkedinurl } = contact;
      const payload = { name, email, number, linkedinurl };

      // await axios.post(url, payload);
      //console.log(url);
      //setContact(INITIAL_STATE);

      const qtempscoredata = new FormData();
      qtempscoredata.append("quizid", quizid);
      qtempscoredata.append("totalmarks", questions.length);
      qtempscoredata.append("score", score);
      qtempscoredata.append("name", name);
      qtempscoredata.append("email", email);
      qtempscoredata.append("phone", number);
      qtempscoredata.append("linkedinurl", linkedinurl);

      setScoreflag(1);

      const response = axios
        .post(
          "https://winupskill.in/api/api/practicequizscores",
          qtempscoredata
        )
        .then((result) => {
          if (result.status == 200 || result.status == 201) {
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleAnswerOptionClicksub = async (sub) => {
    const newObject = {
      qid: sub.question_id,
      opnid: sub.id,
      correct: sub.correct,
    };

    setObj(newObject);

    handleAnswerOptionClick(sub.correct);
    const result = ansgiven.find((obj) => obj.qid == parseInt(sub.question_id));
    ansgiven.forEach((el) => {
      if (parseInt(el.qid) == parseInt(sub.question_id)) {
        localStorage.setItem("flagmatch", 1);
      }
    });

    const tmpflag = localStorage.getItem("flagmatch");

    if (tmpflag == 1) {
      const updansgiven = ansgiven.map((ansss) => {
        if (parseInt(ansss.qid) == sub.question_id) {
          return { ...ansss, opnid: sub.id, correct: sub.correct };
        }
        return ansss;
      });

      setAnsgiven(updansgiven);
      setQlen((prevCount) => prevCount + 1);

      //this.setState({ count: this.state.count + 1 });
      localStorage.setItem("flagmatch", 0);
    } else {
      const newItems = [...ansgiven, newObject]; // creating new array with modified value
      setAnsgiven(newItems); // setting state with new array
      setQlen((prevCount) => prevCount + 1);
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
  };

  const pushtoarray = async () => {};

  const handleAnswerOptionClick = async (correct) => {
    completedQuiz.push(currentQuestion);

    if (correct === "Y") {
      setScore(score + 1);
    }
  };

  const submitallans = async () => {
    const i = 0;
    ansgiven.forEach((el) => {
      if (el.correct === "Y") {
        i = i + 1;
      }
    });
    //handlequizComplete(i);
    setScore(i);
    setShowScore(true);
    setScoreflag(1);

    // if(qlen < questions.length){

    //     setHeadertext("Submit Quiz!"),
    //     setBtntext("Submit & View Score"),
    //     onShowAlert("success",`You have only answered ${qlen} out of ${questions.length} questions. Do you still want to submit the quiz? \n \n Please press Submit & View Score to confirm and see your scores. Click anywhere outside this box to close this message and continue with your quiz.`)

    // }
  };

  // function handlequizComplete () {
  //       const ctx=0;
  //       const { id } = parseCookies(ctx)
  //       const qscoredata = new FormData()
  //       qscoredata.append('action',"coursecomplete")
  //       qscoredata.append('csrid', crsid)
  //       qscoredata.append('quizid', quizid)
  //       qscoredata.append('user_id', id)
  //       qscoredata.append('score', score)

  //       const response = axios.post('https://winupskill.in/api/api/scores', qscoredata).then(
  //           result => {
  //               if (result.status == 200 || result.status == 201){
  //                   Router.push('/user/my-profile');
  //               }
  //           })
  // }

  function handleClick() {
    setShowDiv(!showDiv);
  }

  // function handleRetake () {
  //  window.location.reload();
  // }

  const handleGoBack = () => {
    router.back();
  };
  return (
    <React.Fragment>
      <PageBanner
        homePageUrl={handleGoBack} // Call the function on click
        homePageText="Practice Tests"
        activePageText={`${courseName}`}
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

      <div className="quizmain">
        {showScore ? (
          <>
            {/* <div className='contact-form' style={{display: (scoreflag == 0)? 'block' : 'none'}}>

          Thank you for taking up this quiz. To view your score, please submit the details below:

                <form id="contactForm" onSubmit={handleSubmit(onSubmitqform)}>
                  <div className="row">
                    <div className="col-lg-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={contact.name}
                          onChange={handleChange}
                          ref={register({ required: true })}
                        />
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.name && "Name is required."}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="email"
                          placeholder="Your email address"
                          value={contact.email}
                          onChange={handleChange}
                          ref={register({
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                        />
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.email && "Email is required."}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="number"
                          placeholder="Your phone number"
                          value={contact.number}
                          onChange={handleChange}
                          ref={register({ required: true })}
                        />
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.number && "Number is required."}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="linkedinurl"
                          placeholder="Your Linkedin URL"
                          value={contact.linkedinurl}
                          onChange={handleChange}
                          ref={register({ required: true })}
                        />
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.subject && "Subject is required."}
                        </div>
                      </div>
                    </div>

                    

                    <div className="col-lg-12 col-sm-12">
                      <button type="submit" className="default-btn">
                        View Score
                      </button>
                    </div>
                  </div>
                </form>

          </div>
           */}

            <div style={{ display: scoreflag > 0 ? "block" : "none" }}>
              <div className="score-section">
                <h3>
                  You scored {score} out of {questions.length}
                </h3>
              </div>

              <div style={{ display: score >= passingmark ? "block" : "none" }}>
                <h3>
                  Congratulations! You have successfully completed this quiz.
                  Click on review to view the answers
                </h3>
              </div>

              <div className="reviewansdiv">
                <button className="default-btn" onClick={handleClick}>
                  Review Answers
                </button>
                {showDiv && (
                  <div>
                    {filteredQuestions.map((qss, index) => (
                      <div className="allqss" key={index}>
                        <span className="allqssline">
                          Question: {index + 1}
                        </span>
                        <span className="allqsslinebold">{qss.question}</span>

                        <ul>
                          {options
                            .filter((item) => item.question_id == qss.id)
                            .map((opss, index2) => (
                              <li
                                style={{
                                  display:
                                    opss.question_id == qss.id
                                      ? "list-item"
                                      : "none",
                                }}
                                key={index2}
                              >
                                {opss.option}

                                <span
                                  style={{
                                    display:
                                      opss.correct === "Y"
                                        ? "inline-flex"
                                        : "none",
                                    marginLeft: "10px",
                                    "font-weight": "bold",
                                  }}
                                >
                                  - Correct Option
                                </span>

                                <span
                                  style={{
                                    display:
                                      opss.correct === "N"
                                        ? "inline-flex"
                                        : "none",
                                    marginLeft: "10px",
                                    "font-weight": "bold",
                                  }}
                                >
                                  - Incorrect Option
                                </span>

                                <span
                                  style={{
                                    display:
                                      opss.question_id == qss.id &&
                                      ansgiven.find(
                                        (ansgiven) => ansgiven.opnid === opss.id
                                      )
                                        ? "inline-flex"
                                        : "none",
                                    marginLeft: "10px",
                                    "font-weight": "bold",
                                  }}
                                >
                                  - You answered this
                                </span>
                              </li>
                            ))}
                        </ul>
                        {qss.justification && (
                          <span className="allqssline">
                            <span style={{ fontWeignt: "bold" }}>
                              Answer rationale:
                            </span>{" "}
                            {qss.justification}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="quiz-container"
              style={{
                display: free === "freecourse" || resflag ? "block" : "none",
              }}
            >
              <div className="question-section">
                <div className=".page-title-content">
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  <h5>{questions[currentQuestion].question}</h5>
                </div>
              </div>

              <div className="answer-section">
                {options.length ? (
                  options.map((opns) => (
                    <button
                      style={{
                        // display: (ansgiven.find(ansg => ansg.opnid == opns.id))? 'block' : 'none',

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
                      key={opns.id}
                      className="option-block"
                      onClick={() => handleAnswerOptionClicksub(opns)}
                    >
                      {opns.option}
                    </button>
                  ))
                ) : (
                  <h3>No Options</h3>
                )}
              </div>

              <div className=".page-title-content">
                <span
                  style={{
                    display: "block",
                    marginTop: "30px",
                  }}
                >
                  All Questions
                </span>

                {questions.length ? (
                  questions.map((questions2, index) => (
                    <a
                      onClick={async (e) => {
                        e.preventDefault();
                        setCurrentQuestion(index);
                      }}
                    >
                      <span
                        className="answerno-btn"
                        key={questions2.id}
                        style={{
                          backgroundColor:
                            questions2.id == questions[currentQuestion].id
                              ? "#84c5fe"
                              : "#ffffff",
                        }}
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

              <button
                className="default-btn"
                style={{ margin: "25px 0px 0px 0px" }}
                onClick={() => submitallans()}
              >
                Submit
              </button>
            </div>
          </>
        )}

        <div
          className="quiz-container"
          style={{ display: free > 0 && !resflag ? "block" : "none" }}
        >
          You currently do not have access to this. Please connect with our
          support team.
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleQuiz;
