import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from '@/components/Common/PageBanner';
import Router from 'next/router';

import Alert from 'react-popup-alert';
import Preloader from '@/components/_App/Preloader';

const Careeropportunities = () => {
 
  const [careerops, setCareerops] = React.useState([]);

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
  },[]);

  const getjobs = async ctx => {

                var response = axios.get(`https://winupskill.in/api/api/jobs?status=created`).then(
                     resultu=> {
                        setCareerops(resultu.data.data);
                       
                    })
  }




       
         
  function applyforjobs(jobid,jobname) { 

    localStorage.setItem("jobid", jobid);
    localStorage.setItem("jobname", jobname);

    Router.push("/user/career-opportunities/jobdetails");
      // setLoading(true);
 

      //   const formData2 = new FormData();
      //   formData2.append("userid", localStorage.getItem("userid"));
      //   formData2.append("service", "jobapplication");
      //   formData2.append("serviceid", jobid);
      //   formData2.append("mentor", jobname);
      //     axios
      //     .post("https://winupskill.in/api/api/clubservices", formData2)
      //     .then((response2) => {

      //       console.log("Success2:", response2.data);


      //       setLoading(false);

      //       setHeadertext("Success!"),
      //       setBtntext("Close"),
      //       onShowAlert("success","We have received your interest in this job and sent it for review. You will hear from us soon if your profile was shortlisted!")


      //       })
      //     .catch((error) => {
      //       setLoading(false);
      //       console.log("Error:", error);
      //     });


  }

  return (
    <>
    <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle={`Career Opportunities`}
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Career Opportunities" 
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

              {careerops.length > 0 ? careerops.map((mtr,index) => (
                <div className="joblist">
                  
                  <div className="profiletextcontainer">
                    <p style={{fontWeight:"bold"}}>{mtr.title}</p>
                    <p>Posted On: {new Date(mtr.created_at).toDateString()}</p>
                    <p>Company: {mtr.company}</p>
                    <p>Experience Level: {mtr.experience}</p>
                                

                    <button className="default-btn mt-10" 
                    onClick={() => 
                            applyforjobs(
                              mtr.id,
                              mtr.title
                              
                            )}


                    >Job Details</button>
                  </div>



                </div>
                )):("Loading...")}
              </div>
 


      </div>


    </React.Fragment> 
    </>
  );
};

export default Careeropportunities;
