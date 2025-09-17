import React, { useState, useEffect } from "react";
import Navbar from "../../components/_App/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Link from "next/link";
import axios from "axios";
import Alert from "react-popup-alert";
import { useRouter } from "next/router";
import { Modal, Box, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const upmc_webinar = () => {
  const router = useRouter();
  const [allWebinar, setWeb] = useState([]);
  const [open, setOpen] = useState(false);
  const [utm, setutm] = useState(null);
  const [selectedWebinar, setSelectedWebinar] = useState(null); // Added state to track the selected webinar
  const [formD, setFormD] = useState({
    name: "",
    mail: "",
    contact: "",
  });

 

  useEffect(() => {
    console.log("orgin", window.location.href);
    setutm(window.location.href);
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const url = "https://winupskill.in/api/api/upcm-webinar";
    try {
      const response = await axios.get(url);
      setWeb(response.data.data);
    } catch (error) {
      n;
      console.error("Error fetching blogs:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  };

  const handleOpen = (webinar) => {
    setOpen(true);
    setSelectedWebinar(webinar);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const locahost = "http://127.0.0.1:8000/api/upcm-webinar-user";
    const url = "https://winupskill.in/api/api/upcm-webinar-user";
    const form = new FormData();

    form.append("name", formD.name);
    form.append("mail", formD.mail);
    form.append("contact", formD.contact);
    form.append("topic", selectedWebinar?.topic);
    form.append("webinar_id", selectedWebinar?.id);
    form.append("utm_source", utm);

    try {
      await axios.post(url, form);
      alert(
        "Successfully registered for the webinar, Browse for other courses"
      );

      router.push("/pages/pg/microlearn-series");
    } catch (error) {
      alert("Failed to register. Please try again later");
    }
  };

  return (
    <React.Fragment>
      <PageBanner
        pageTitle="Webinars"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Webinars"
      />
      

      <div className="container">
        <div>
          <br />
        </div>
        <div className="row">
          {allWebinar.length ? (
            allWebinar.map((webinar) => (
              <div
                className="col-lg-4 col-md-6"
                key={webinar.id}
                style={{ cursor: "pointer " }}
                onClick={() => handleOpen(webinar)}

              >

                  <div className="single-blog-post-box">
                    <div className="post-image">
<Tooltip title={webinar.description} sx={{ zIndex: 1000 }}>
                      <a className="d-block">
                        <img
                          className="names"
                          style={{
                            filter: "initial",
                            maxHeight: "100%",
                            width: "100%",
                            transform: "none",
                          }}
                          src={webinar.image}
                          alt="image"
                        />
                      </a>
                    </Tooltip>
                    </div>

                    <div className="post-contents-webinar">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <b>{webinar.topic}</b>
                        <span style={{ fontSize: "13px" }}>
                          {formatDate(webinar.date)}
                        </span>
                      </div>




                      
                      {/* <center>
                        <button
                          onClick={() => handleOpen(webinar)}
                          className="default-btn-profile"
                        >
                          Book a slot
                        </button>
                      </center> */}
                      <br />
                      <br />
                    </div>

                  </div>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form onSubmit={handleRegister}>
            <center>
              <b>Register for {selectedWebinar?.topic}</b>
              <br />
              <br />
              {/* <label htmlFor="name">Name : </label> &nbsp;&nbsp;&nbsp; */}
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setFormD({ ...formD, name: e.target.value })}
                placeholder="Enter Your Name"
style={{width:"300px"}}
/>
              <br />
              <br />
              {/* <label htmlFor="phone">Phone : </label> &nbsp;&nbsp;&nbsp; */}
              <input
style={{width:"300px"}}
              
                type="tel"
                name="phone"
                id="phone"
                onChange={(e) =>
                  setFormD({ ...formD, contact: e.target.value })
                }
                placeholder="Enter Your Number"
              />
              <br />
              <br />
              {/* <label htmlFor="email">Email : </label> &nbsp;&nbsp;&nbsp; */}
              <input
style={{width:"300px"}}

                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                onChange={(e) => setFormD({ ...formD, mail: e.target.value })}
              />
              <br />
              <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="default-btn-profile" type="submit">
                Register
              </button>
            </center>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default upmc_webinar;
