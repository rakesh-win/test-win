import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from '@/components/Common/PageBanner';
import Router from 'next/router';

import Alert from 'react-popup-alert';
import Preloader from '@/components/_App/Preloader';
import style from "./job.module.css";

const Jobapplication = () => {
 
  const [careerops, setCareerops] = React.useState([]);

    const [loading, setLoading] = React.useState(false);

    const [headertext, setHeadertext] = useState(0);
  const [btntext, setBtntext] = useState(0);
  const [jobid, setJobid] = useState(0);
  const [jobname, setJobname] = useState(0);

  const [alert, setAlert] = React.useState({
      type: 'error',
      text: 'This is a alert message',
      show: false
    })
  
    function onCloseAlert() {
      setAlert({
        type: '',
        text: '',
        show: false,
        
      })

     Router.push('/user/my-profile')
    } 

    function onShowAlert(type,text) {
      setAlert({
        type: type,
        text: text,
        show: true
      })
    }

  useEffect(() => {
     getjobs();
     setJobid(localStorage.getItem("jobid"));
     setJobname(localStorage.getItem("jobname"));
  },[]);

  const getjobs = async ctx => {

                var response = axios.get(`https://winupskill.in/api/api/jobs`).then(
                     resultu=> {
                        setCareerops(resultu.data.data);
                       
                    })
  }

       
         
 

  const [userID, setUserID] = useState();
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [note, setNote] = useState("");

  
  
  const [cvurl, setCvurl] = useState(null);
  const [cvfile, setCvfile] = useState(null);
 

  useEffect(() => {
    setUserID(localStorage.getItem("userid"));
  }, []);


  const handleFileChange = (event) => {
   const file = event.target.files[0];
   setCvurl(file);
  };

  const handleFileChange2 = (event) => {
   const file = event.target.files[0];
   setCvfile(file);
  };


  // const handleSubmit = (event) => {
  //  event.preventDefault();
  //  setLoading(true);
  //  const formData = new FormData();
  //  formData.append("userid", userID);
  //  formData.append("location", location);
  //  formData.append("expertise", expertise);
  //  formData.append("motivation", motivation);
  //  formData.append("availablehours", availableHours);
  //  formData.append("status", status);
 
  //  axios
  //    .post("https://winupskill.in/api/api/mentorapplications", formData)
  //    .then((response) => {
  //      console.log("Success:", response.data);
  //       setLoading(false);

  //           setHeadertext("Success!"),
  //           setBtntext("Close"),
  //           onShowAlert("success","We have received your request. We will get in touch soon!")
  //    })
  //    .catch((error) => {
  //      setLoading(false);
  //      console.log("Error:", error);
  //    });
  // };


   function applyforjobs(jobid,jobname) { 
    event.preventDefault();
      setLoading(true);


        const formData2 = new FormData();
        formData2.append("jobid", localStorage.getItem("jobid"));
        formData2.append("userid", localStorage.getItem("userid"));
        formData2.append("location", location);
        formData2.append("experience", experience);
        formData2.append("education", education);
        formData2.append("note", note);
        formData2.append("cvurl", cvurl);
        formData2.append("fileurl", cvfile);

        console.log("formdata",formData2);

          axios
          .post("https://winupskill.in/api/api/jobapplications", formData2)
          .then((response2) => {

            console.log("Success2:", response2.data);


            setLoading(false);

            setHeadertext("Success!"),
            setBtntext("Close"),
            onShowAlert("success","We have received your interest in this job and sent it for review. You will hear from us soon if your profile was shortlisted!")


            })
          .catch((error) => {
            setLoading(false);
            console.log("Error:", error);
          });


  }

  return (
    <>
    <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle={`Job Application`}
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Job Application" 
            />  

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

            
   

          {loading && <Preloader />}


      <div style={{
        minHeight:"500px"
      }}>
             <div className="jobcontainer"> 

                <section className={style.mainform}>
                <h2>Application Form: {jobname}</h2>
                <form onSubmit={applyforjobs}>
                  <div>
                    <label htmlFor="location">Location:</label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="expertise">Experience:</label>
                    <input
                      type="text"
                      id="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="expertise">Education:</label>
                    <input
                      type="text"
                      id="education"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      required
                    />
                  </div>
                 
                  <div>
                    <label htmlFor="motivation">Note:</label>
                    <textarea
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div>
                  Upload CV: (upload upto 10mb of file size)
                    <input type="file" onChange={handleFileChange} accept=".pdf" />
                  </div>

                  <div>
                  Upload Any other Supporting File: (For multiple files, please zip and upload upto 10mb of file size)
                    <input type="file" onChange={handleFileChange2} />
                  </div>
                  
                  <button type="submit" className="default-btn mt-10">Submit</button>
                </form>
              </section>
              </div>
 


      </div>


    </React.Fragment> 
    </>
  );
};

export default Jobapplication;