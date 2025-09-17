import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from '@/components/Common/PageBanner';
import styles from "./forumm.module.css";
import { parseCookies } from "nookies";



const Forum = () => {
  const router = useRouter();
  const { id } = router.query;
     

  const [ data, setData] = useState([]);
  const [ data1, setData1] = useState([]);
  const [ answer, setAnswer] = useState("");
  const [ qtext, setQtext] = useState("");
  const [ questionid, setQuestionid] = useState();
  const [ currentPage, setCurrentPage] = useState(1);
  const [answeredbyuid, setAnsweredbyuid] = useState(null);
  const [disp,setDisp]=useState([])
            
  useEffect(() => {
    const cookies = parseCookies();
    const answeredbyuid = cookies.name;
    
    setAnsweredbyuid(answeredbyuid)
     console.log(answeredbyuid)
  }, [id]);                           
                                                                     
  useEffect(() => {
      axios.get(`https://winupskill.in/api/api/forumqs?id=${id}`).then((f) => {
      setData(f.data.data);
      setQtext(f.data.data[0].question);
      
    });
  }, []);
        
                       
  useEffect(() => {
      axios.get("https://winupskill.in/api/api/forumans")
      .then((e) => {
      setData1(e.data.data);
      setDisp(e.data.data)
      
    });
  }, []);
                                          
  const answersToShow = data1.filter((e) => e.questionid === parseInt(id));
  const numPages = Math.ceil(answersToShow.length / 10);
                                              
  const currentAnswers = answersToShow.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const renderAnswers = currentAnswers.map((e,index) => {

    return (

      
                
      <div key={e.id} className={styles.answercontainer}>
        <div className={styles.questionContainertopdate}>
             {e.created_at}
             <div className={styles.questionContainertopqno}>
               #{index+2}
              </div>
        </div>
       

        <div className={styles.questionContainerrow}>
                <div className={styles.questionContainerleft}>
                <p>{e.answeredbyuid}</p>

                </div>

                <div className={styles.questionContainerright}>
                  <div className={styles.question}>
                  <h1>Re: {qtext}</h1>
                  <p>{e.answer}</p>
                  </div>
                </div>
        </div>
     
    </div>
    
    );
  });

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cookies = parseCookies(); 
    if (cookies.token) {
      const payload = { questionid: id, answer: answer ,answeredbyuid: answeredbyuid};
      axios.post("https://winupskill.in/api/api/forumans", payload, {
        headers: { Authorization: `Bearer ${cookies.token}` }, 
      }).then(() => {
        console.log("done");
        window.location.reload(true);
      });

    } else {
      alert("Please log in to post an answer.");
    }
  };
             
    const renderPageNumbers = [];
    for (let i = 1; i <= numPages; i++) {
    renderPageNumbers.push(
    <button key={i} id={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? styles.active : null}>{i}</button>
    );
  }
    
  return (
  <React.Fragment>
            <PageBanner 
                homePageUrl="/user/forum" 
                homePageText="Forum" 
                activePageText="Topic"
            />  
      <div className={styles.spacertop}>
      </div>
    <section className="container">
      <div className={styles.questionContainer} style={{padding:"0px"}}>

       
        {data.map((x) => {
          return (
                    
            <div key={x.idd} className={styles.mainbox}>
             <div className={styles.questionContainertopdate}>
             {x.created_at}
             <div className={styles.questionContainertopqno}>
               #1
              </div>
             </div>
              
                    
              <div className={styles.questionContainerrow}>
                <div className={styles.questionContainerleft}>
                <p>{x.askedbyuid}</p>

                </div>

                <div className={styles.questionContainerright}>
                  <div className={styles.question}>
                  <h1>{x.question}</h1>
                  <p>{x.description}</p>
                  </div>
                </div>
              </div>

             
              <div className={styles.answerContainer}>
               <span className={styles.answerss}><p>{renderAnswers}</p></span><p></p>
              </div>


              <div className={styles.inputBox}>
                <input type="text" onChange={handleChange} placeholder="Enter your reply / comment here"></input>
                <button onClick={handleSubmit} className={styles.submitButton}>Post</button>
              </div>     
            </div>
          );
        })}
      </div>
      {numPages > 1 && (
        <div className={styles.paginationContainer}><span>{renderPageNumbers}</span></div>
      )}
      <div className={styles.spacer}>
      </div>
    </section>
    </React.Fragment>
  );
};

 

export default Forum;
