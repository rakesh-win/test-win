import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from '@/components/Common/PageBanner';
import Router from 'next/router';

import Alert from 'react-popup-alert';
import Preloader from '@/components/_App/Preloader';
import style from "../career-opportunities/job.module.css";

const WinJobApplication = () => {

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

    Router.push('/user/career-win-job')
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
    
  }, []);

  const getjobs = async ctx => {

    var response = axios.get(`https://winupskill.in/api/api/jobs`).then(
      resultu => {
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



  function applyforjobs(jobid, jobname) {
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

    console.log("formdata", formData2);

    axios
      .post("https://winupskill.in/api/api/jobapplications", formData2)
      
      .then((response2) => {
        console.log("API Response:", response2);
        console.log("Success2:", response2.data);
        console.log("formdata", formData2);
    

        setLoading(false);
        console.log("success3!!!!!!!");
      
        setHeadertext("Success!"),
          setBtntext("Close"),
          onShowAlert("success", "We have received your interest in this job and sent it for review. You will hear from us soon if your profile was shortlisted!")

       console.log("success4!!!!!!!!!");
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
          minHeight: "500px"
        }}>
          <div className="jobcontainer">

            <section className={style.mainform}>
              <h2>{jobname}</h2>
              <form onSubmit={applyforjobs}>
                <div>
                  <label htmlFor="location">Current Location<span style={{ color: "red", fontWeight: "normal" }}>*</span> :</label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="expertise">Experience (in years)<span style={{ color: "red", fontWeight: "normal" }}>*</span> :</label>
                  <input
                    type="text"
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="expertise">Highest Qualification<span style={{ color: "red", fontWeight: "normal" }}>*</span> :</label>
                  <input
                    type="text"
                    id="education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="motivation">Cover Letter (Optional) :</label>
                  <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}

                  ></textarea>
                </div>

                <div>
                  <label> Upload CV<span style={{ color: "red", fontWeight: "normal" }}>*</span> (upload upto 10mb of file size) :</label>
                  <input type="file" onChange={handleFileChange} accept=".pdf" required />
                </div>

                <div>
                  <label> Upload Any other Supporting File (For multiple files, please zip and upload upto 10mb of file size) :</label>
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

export default WinJobApplication;