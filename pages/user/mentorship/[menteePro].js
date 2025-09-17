import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PageBanner from "@/components/Common/PageBanner";
import axios from "axios";
                 
const MenteePro = () => {
                             
  const router = useRouter();
  const { menteePro } = router.query;
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    yearsOfWorkExperience: "",
    currentRole: "",
    currentOrganization: "",
    mentorshipReasons: "",
  });
  const [fltmen,setFltmen]=useState([])
  const [mentee,setMentee] = useState([])
                     
  useEffect(() => {
    axios
      .get(`https://winupskill.in/api/api/menteeapplications?_=${Date.now()}`)
      .then((response) => {
        const filteredMentee = response.data.filter(item => item.userid == parseInt(menteePro));
        console.log("Mentee API Response:", response.data);
        setMentee(response.data);
        setFltmen(filteredMentee)

        console.log(fltmen.status)   // filterd user ( with the userid)//

      })
            
      .catch((error) => {
        console.error("Error fetching mentee data:", error);

      });
  }, []);
          
  const handleAccept = () => {
    console.log("menteePro:", menteePro);
    console.log(mentee);
  
    const matchedMentee = mentee.find((menteeItem) => menteeItem.userid == parseInt(menteePro));
  
    if (!matchedMentee) {
      console.error("No matching mentee found.");
      return;
    }
                               
    console.log("Matched Mentee Properties:", matchedMentee);
                              
    const updatedMentee = {
      ...matchedMentee,
      status: "accepted",
    };
     console.log(matchedMentee)
    axios
      .put(`https://winupskill.in/api/api/menteeapplications/${matchedMentee.id}`, updatedMentee)
      .then((response) => {
        console.log("done", response)
        setMentee((prevMentees) =>
          prevMentees.map((menteeItem) =>
            menteeItem.userid == matchedMentee.userid ? updatedMentee : menteeItem
          )
        );
        
      })
      .catch((error) => {
        console.error("Error updating mentee status:", error);
      });
  };



              
  const handleReject = () => {
    console.log("menteePro:", menteePro);
    console.log(mentee);
  
    const matchedMentee = mentee.find((menteeItem) => menteeItem.userid == parseInt(menteePro));
  
    if (!matchedMentee) {
      console.error("No matching mentee found.");
      return;
    }
                               
    console.log("Matched Mentee Properties:", matchedMentee);
                              
    const updatedMentee = {
      ...matchedMentee,
      status: "rejected",
    };
     console.log(matchedMentee)
    axios
      .put(`https://winupskill.in/api/api/menteeapplications/${matchedMentee.id}`, updatedMentee)
      .then((response) => {
        console.log("done", response)
        setMentee((prevMentees) =>
          prevMentees.map((menteeItem) =>
            menteeItem.userid == matchedMentee.userid ? updatedMentee : menteeItem
          )
        );
        
      })
      .catch((error) => {
        console.error("Error updating mentee status:", error);
      });
       
  };      
                              

  useEffect(() => {
    if (menteePro) {
      axios
        .get(`https://winupskill.in/api/api/getprofile`)
        .then((response) => {
          const allprofile = response.data.data;       
          const matchedProfile = allprofile.find((profile) => {
            return profile.id == menteePro;           
          });                          
                                               
          if (matchedProfile) {       
            setData(matchedProfile);
            
          } else {
            setData(null); // If no matching profile is found, set data to null or handle it accordingly.
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [menteePro]);

  return (
    <>                      
      <PageBanner
        pageTitle={`Mentee Profile for ID: ${menteePro}`}
        homePageUrl="/"
        homePageText="Home"
        activePageText="Mentee Profile"
      />                          
      <div style={{ minHeight: "500px" }}>
        <div              
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "20px",
            maxHeight: "400px",            
          }}                  
          className="mentorcontainer"
        >
          {data.name ? (
            <div className="mentorprofile2"style={{ marginBottom: "30px" }}>                
              <div className="mentorprofileleft">
                <img src={data.image} alt={data.name} style={{ height:"200px", maxWidth: "180px" }}/>
              </div>
              <div className="profiletextcontainer" style={{ marginTop: "0px", marginLeft: "140px" }}
              >    
                <span
                  style={{ fontWeight: "bold", fontSize: "22px",marginBottom: "25px",  display: "block",}}
                >             
                  {data.name}   
                </span>
                <div style={{ marginBottom: "25px" }}>
                  <b>Email:</b> {data.email}
                </div>
                <div style={{ marginBottom: "25px" }}>
                  <b>Mobile Number:</b> {data.mobile}
                </div>
                <div style={{ marginBottom: "25px" }}>
                  <b>Years of Work Experience:</b> {data.yearsOfWorkExperience}
                </div>                                 
                <div style={{ marginBottom: "25px" }}>
                  <b>Current Role:</b> {data.currentRole}
                </div>                        
                <div style={{ marginBottom: "25px" }}>
                  <b>Current Organisation:</b> {data.currentOrganization}
                </div>              
                                    
                <div style={{ marginBottom: "25px" }}>
                  <b>Why do candidate need a mentor ?</b>
                </div>
                <p>{data.mentorshipReasons}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>     
        <div style={{ display: "flex", justifyContent: "center",  marginRight: "200px",position: "relative", bottom: "15px"}}>
        {fltmen && fltmen.length > 0 && fltmen[0].status === "accepted" ? (
          <p style={{ fontSize: "26px", color: "black", fontWeight: "bold", position:"relative", bottom:"27px" , left:"50px"}}>Status: Accepted</p>
        ) : (
          <>
            {fltmen && fltmen.length > 0 && fltmen[0].status === "rejected" ? (
              <p style={{ fontSize: "26px", color: "black", fontWeight: "bold", position:"relative", bottom:"27px" , left:"50px"}}>Status: Rejected</p>
            ) : (
              <>
                {fltmen && fltmen.length > 0 && fltmen[0].status === "created" && (
                  <button
                    style={{
                      padding: "12px 16px 10px",
                      backgroundColor: "#DC3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginRight: "35px",
                    }}
                    onClick={handleAccept}
                  >
                    Accept
                  </button>
                )}

                {fltmen && fltmen.length > 0 && fltmen[0].status !== "accepted" && (
                  <button
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#DC3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "35px",
                    }}      
                    onClick={handleReject}
                  >
                    Reject
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      </div>
    </>
  );
};

export default MenteePro;