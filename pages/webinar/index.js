import React, { useState, useEffect } from "react";
import Navbar from "../../components/_App/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Webinar = () => {
  const router = useRouter();
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const url = "https://winupskill.in/api/api/webinar";
    try {
      const response = await axios.get(url);
      setAllBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
          {allBlogs.length ? (
            allBlogs.map((webinar) => (
              <div
                className="col-lg-4 col-md-6"
                key={webinar.id}
                style={{ cursor: "pointer " }}
              >
                <a href={webinar.url} target="_blank">
                  <div className="single-blog-post-box">
                    <div className="post-image">
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
                      {/* </Link> */}
                    </div>

                    <div className="post-contents">
                      <a className="category">{webinar.category}</a>
                      <h6>{webinar.title}</h6>
                    </div>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Webinar;
