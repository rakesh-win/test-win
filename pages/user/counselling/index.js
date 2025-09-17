import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from '@/components/Common/PageBanner';
import style from "./councelling.module.css";
import Alert from 'react-popup-alert';
import Router from 'next/router';
import Preloader from '@/components/_App/Preloader';


const Careercounselling = () => {

  const [loading, setLoading] = React.useState(false);

    const [headertext, setHeadertext] = useState(0);
  const [btntext, setBtntext] = useState(0);

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

      Router.push('/user/my-profile');
    }

    function onShowAlert(type,text) {
      setAlert({
        type: type,
        text: text,
        show: true
      })
    }
 

 const [id, setId] = useState("");
  
  const [location, setLocation] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [currenttitle, setCurrenttitle] = useState("");
  const [trainingAttended, setTrainingAttended] = useState("yes");
  const [trainingNames, setTrainingNames] = useState("");
  const [additionalTraining, setAdditionalTraining] = useState("yes");
  const [counselingExpectations, setCounselingExpectations] = useState("");
  const [cv, setCV] = useState(null);
  const [CVFile, setCVFile] = useState(null);

  const handleFileChange = (event) => {
   const file = event.target.files[0];
   setCVFile(file);
 };
 
 useEffect(() => {
   console.log("CVFile:", CVFile);
 }, [CVFile]);


 useEffect(() => {
 
   setId(localStorage.getItem("userid"));

 }, []);


 const handleSubmit = async (event) => {
   event.preventDefault();
   setLoading(true);
  
   console.log("CVFile:", CVFile);
 
   var formData = new FormData();
 
   formData.append("userid", id);
   formData.append("location", location);
   formData.append("currenttitle", currenttitle);
   formData.append("currentcompany", currentJob);
   formData.append("pasttraining", trainingAttended);
   formData.append("pasttraininglist", trainingNames);
   formData.append("addlcert", additionalTraining);
   formData.append("lookingfor", counselingExpectations);
   formData.append("cvurl", CVFile);
 
   axios.post("https://winupskill.in/api/api/counselling", formData)
     .then((response) => {
       console.log(response, "done");
            const formData2 = new FormData();
        formData2.append("userid", id);
        formData2.append("service", "counselling");
        formData2.append("serviceid", response.data.data.id);
          axios
          .post("https://winupskill.in/api/api/clubservices", formData2)
          .then((response2) => {

            console.log("Success2:", response2.data);


            setLoading(false);

            setHeadertext("Success!"),
            setBtntext("Close"),
            onShowAlert("success","We have received your request and will be in touch soon to schedule your counselling session!")


            })
          .catch((error2) => {
            setLoading(false);
            console.log("Error:", error2);
          });















     })
     .catch((error) => {
      setLoading(false);
       console.log("Error:", error);
     });
 };



  return (
    <>
    <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle={`Career Counselling`}
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Career Counselling" 
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
        minHeight:"500px",
        backgroundColor:"#f8f8f8",
        padding:"50px"
      }}>
          <form onSubmit={handleSubmit} className={style.mainform}>
  <div>
    <label htmlFor="location">Location:</label>
    <input
      type="text"
      id="location"
      name="location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      required
    />
  </div>

  <div>
    <label htmlFor="currentJob">Current Company:</label>
    <input
      type="text"
      id="currentJob"
      name="currentJob"
      value={currentJob}
      onChange={(e) => setCurrentJob(e.target.value)}
      required
    />
  </div>

  <div>
    <label htmlFor="currentJobTitle">Current Job Title:</label>
    <input
      type="text"
      id="currentJobTitle"
      name="currentJobTitle"
      onChange={(e) => setCurrenttitle(e.target.value)}
      required
    />
  </div>

  <div>
    <label htmlFor="trainingAttended">
      Have you in the past attended training related to IT
      management/governance/ISO, etc.?
    </label>
    <select
      id="trainingAttended"
      name="trainingAttended"
      value={trainingAttended}
      onChange={(e) => setTrainingAttended(e.target.value)}
      required
    >
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>

  <div>
    <label htmlFor="trainingNames">
      If yes, please name a few training that you have attended:
    </label>
    <textarea
      id="trainingNames"
      name="trainingNames"
      value={trainingNames}
      onChange={(e) => setTrainingNames(e.target.value)}
    ></textarea>
  </div>

  <div>
    <label htmlFor="additionalTraining">
      Are you considering any additional certifications or training program
      to enhance your skills?
    </label>
    <select
      id="additionalTraining"
      name="additionalTraining"
      value={additionalTraining}
      onChange={(e) => setAdditionalTraining(e.target.value)}
      required
    >
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>

  <div>
    <label htmlFor="counselingExpectations">
      Please state in a few words what you look forward to in the counseling
      session from our experts:
    </label>
    <textarea
      id="counselingExpectations"
      name="counselingExpectations"
      value={counselingExpectations}
      onChange={(e) => setCounselingExpectations(e.target.value)}
    ></textarea>
  </div>






  <div>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
    </div>
  <button type="submit" className="default-btn mt-10" onClick={ handleSubmit}>Submit</button>
</form>
      </div>


    </React.Fragment>
    </>
  );
};

export default Careercounselling;