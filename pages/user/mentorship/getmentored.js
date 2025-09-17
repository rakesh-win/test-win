import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from "@/components/Common/PageBanner";
import Router from "next/router";
                                 
const Getmentored = () => {
  const [mentorprofile, setMentorprofile] = React.useState([]);
                                                                             
  useEffect(() => {
    getmentors();
  }, []);
             
            
  const getmentors = async (ctx) => {
    var u = localStorage.getItem("userid");
    var response = axios
      .get(`https://winupskill.in/api/api/mentorapplications?status=approved`)
      .then((resultu) => {
        console.log("resultu", resultu);
        setMentorprofile(resultu.data.data);
      });
  };
                                  
                                                    
  function applyformentorship(mentrid) {
    console.log("applyformentorship", mentrid);
    localStorage.setItem("mentorid", mentrid);
    Router.push("/user/mentorship/mentorprofile");
  }

  return (
    <>
      <React.Fragment>
        {/* <Navbar /> */}
        <PageBanner
          pageTitle={`View Mentors`}
          homePageUrl="/"
          homePageText="Home"
          activePageText="View Mentors"
        />
        <div style={{ minHeight: "400px" }}>
          <div

style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: "25px",
              marginLeft: "210px",
            }}
            className="mentorcontainer"
          >
            {mentorprofile.length > 0 ? (
              mentorprofile.map((mtr, index) => (
                <div
                  key={mtr.id}
                  style={{
                    width: "calc(25% - 10px)",
                    marginBottom: "20px",
                  }}
                  className="mentorprofile"
                >
                  <img
                    src={mtr.image}
                    alt="Mentor Profile"
                    style={{ width: "100%", height: "250px" }}
                  />
                  <div
                    style={{ marginTop: "0px" }}
                    className="profiletextcontainer"
                  >
                    <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      {mtr.name}
                    </p>
                    <p style={{ marginBottom: "5px" }}>
                      Experience: 
                    </p>
                    <p style={{ marginBottom: "5px" }}>
                      Mentors On:{" "}
                      {mtr.expertise
                        .split(",")
                        .map((item) => (
                          <span
                            key={item.trim()}
                            style={{ display: "block" }}
                            dangerouslySetInnerHTML={{__html:item.trim()}}
                          >
                            {/* - {item.trim()} */}
                          </span>
                        ))}
                    </p>
                    <button
                      className="default-btn"
                      onClick={() => applyformentorship(mtr.id)}
                      style={{
                        fontSize: "13px",
                        position: "relative",
                        left: "10px",
                      }}
                    >
                      View Mentor Profile
                    </button>
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

export default Getmentored;
