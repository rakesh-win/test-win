import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from "@/components/Common/PageBanner";

const Viewmenteeapplications = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState([]);
  
  useEffect(() => {            
    const storedUserId = localStorage.getItem("userid");
    setUserId(storedUserId); 
   
    console.log("dscs",userId)                
      
    axios.get("https://winupskill.in/api/api/clubservices").then((response) => {
      setData(response.data.data);
    });
                        
    axios.get("https://winupskill.in/api/api/getprofile").then((e) => {
      setProfile(e.data.data);
    });
  }, [userId]);
  if (userId === null) {
    // Wait until userId is set
    return <p>Loading...</p>;
  }
  const filteredServices = data.filter((item) => item.mentor == userId);
  
  return (
    <React.Fragment>
      <PageBanner
        pageTitle={`View Mentee Applications`}
        homePageUrl="/"
        homePageText="Home"
        activePageText="View Mentee Applications"
      />
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            backgroundColor: "black",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginRight: "10px",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            position: "relative",
            top: "10px"
          }}
        >
          Applications
        </h1>
        <div style={{ borderBottom: "1px solid #ccc", flex: 1, position: "relative", top: "10px" }}></div>
      </div>
      <div style={{ height: "auto", padding: "20px" }}>
        {filteredServices.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          >
            <div>
              {index + 1}. {"  "} {" "}{" "}
              {profile.find((p) => p.id == item.id)?.name || "Name not found"} {" "}
            
            </div>
            <Link href={`/user/mentorship/[menteePro]`} as={`/user/mentorship/${item.id}`}>
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
                }}
              >
                View
              </button>
            </Link>
          </div>
        ))}
        
      </div>
      
   
    </React.Fragment>
  );
};

export default Viewmenteeapplications;
