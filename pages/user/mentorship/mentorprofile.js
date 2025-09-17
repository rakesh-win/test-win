import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from "@/components/Common/PageBanner";
import Router from "next/router";
                      
const Mentorprofile = () => {
  const [mentorprofile, setMentorprofile] = useState([]);
  const [isCurrentUserMentor, setIsCurrentUserMentor] = useState(false);
                       
  useEffect(() => {
    getMentors();
  }, []);
                           
  const getMentors = async () => {
    const mentorId = localStorage.getItem("mentorid");
    const response = await axios.get(
      `https://winupskill.in/api/api/mentorapplications?id=${mentorId}`
    );                       
    const filteredData = response.data.data;
    setMentorprofile(filteredData);
    checkCurrentUserMentor(filteredData, mentorId);
  };
                           
  const checkCurrentUserMentor = (data, mentorId) => {
    const userId = localStorage.getItem("userid");
                          
    if (userId && mentorId && userId === mentorId) {
      setIsCurrentUserMentor(true);
    }
  };
                          
  const handleEditProfile = () => {
    Router.push("/user/edit-profile");
  };
                          
  const handleApplyForMentorship = (mentrid) => {
    Router.push("/user/mentorship/menteeapplication");
  };
                           
  const extractCurrentRole = (experience) => {
    const regex = /currentrole:\s*(.*?)\s+expdetails:\s*(.*)/i;
    const match = regex.exec(experience);
    return match ? match[1] : "";
  };
                                                                                                                                                                                             
  const extractCurrentOrganisation = (experience) => {
    const regex = /currentorganisation:\s*(.*?)\s+currentrole:/i;
    const match = regex.exec(experience);
    return match ? match[1] : "";
  };

  const extractExperienceDetails = (experience) => {
    const regex = /currentrole:\s*(.*?)\s+expdetails:\s*(.*)/i;
    const match = regex.exec(experience);
    return match ? match[2] : "";
  };

  const extractSummaryOfExperience = (experience) => {
    const regex = /(\d+-\d+)/;
    const match = regex.exec(experience);
    return match ? match[1] : "";
  };

  return (
    <>
      <React.Fragment>
        <PageBanner
          pageTitle="Mentor Profile"
          homePageUrl="/"
          homePageText="Home"
          activePageText="Mentor Profile"
        />
        <div style={{ minHeight: "500px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start",gap: "20px", maxHeight: "400px", }} className="mentorcontainer" >
            {mentorprofile.length > 0 ? (
              mentorprofile.map((mtr, index) => (
                <div className="mentorprofile2" key={index} style={{ marginBottom: "30px" }} >
                  <div className="mentorprofileleft">
                    <img src={mtr.image} alt={mtr.name} style={{ height: "200px", maxWidth: "180px" }} />
                    {isCurrentUserMentor && (
                      <button className="default-btn mt-10" onClick={handleEditProfile} style={{ fontSize: "13px" }}> Edit Mentor Profile</button>
                    )}
                    <button className="default-btn mt-10" onClick={() => handleApplyForMentorship(mtr.mid)} style={{ fontSize: "13px" }} >Apply for Mentorship </button>
                  </div>
                  <div className="profiletextcontainer"style={{ marginTop: "0px" }}>
                    <span style={{fontWeight: "bold",fontSize: "22px",marginBottom: "10px",display: "block",}}>
                     Mr.  {mtr.name}
                    </span>
                    <b>Mentors On:</b>
                    <p style={{ marginBottom: "5px" }}>{mtr.expertise}</p>

                    <b>Current Role:</b>
                    <p style={{ marginBottom: "5px" }}>
                      {extractCurrentRole(mtr.experience)}
                    </p>

                    <b>Current Organisation:</b>
                    <p style={{ marginBottom: "5px" }}>
                      {extractCurrentOrganisation(mtr.experience)}
                    </p>
                    

                    <b>Experience:</b>
                    <p style={{ marginBottom: "5px" }}>{extractSummaryOfExperience(mtr.experience)}</p>

                    <b>Experience Details:</b>
                    <p style={{ marginBottom: "5px" }}>{extractExperienceDetails(mtr.experience)}</p>

                    <b>Achievements / Notable Accomplishments:</b>
                    <p style={{ marginBottom: "5px" }}>{mtr.achievements}</p>

                    
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default Mentorprofile;
