import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const LatestNewsTwo = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const response = await axios.get("https://winupskill.in/api/api/blogs");
      const shuffledBlogs = response.data.data
        .sort(() => Math.random() - 0.5)
        .slice(0, 3); // Display 3 random blogs
      setAllBlogs(shuffledBlogs);   
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="blog-area ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Articles</span>
          <h2 style={{ color: "#D0140F" }}>Check Out Our Latest Blogs</h2>
          <p style={{ textAlign: "center" }}>Knowledge Articles!.</p>
        </div>

        <div className="blog-list">
          <div className="row">
            {allBlogs.length ? (
              allBlogs.map((blogs) => (
                <div className="col-lg-4 col-md-6" key={blogs.title}>
                  <div className="single-blog-post-box">
                    <div className="post-image">
                      {blogs.url && (
                        <Link href={blogs.url}>
                          <a className="d-block">
                            <img
                              style={{
                                maxHeight: "100%",
                                objectFit: "cover",
                                width: "100%",
                              }}
                              src={blogs.image}
                              alt="image"
                            />
                          </a>
                        </Link>
                      )}
                    </div>
                    <div className="post-content">
                      {blogs.url && (
                        <Link href={`${blogs.id}`}>
                          <a className="category">{blogs.category}</a>
                        </Link>
                      )}
                      <h5>
                        {blogs.url ? (
                          <Link href={`${blogs.url}`}>
                            <a>{blogs.title}</a>
                          </Link>
                        ) : (
                          <span>{blogs.title}</span>
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>

        <div className="col-lg-12 col-md-12">
          <div className="blog-post-info">
            <Link href="/blogs">
              <button className="default-btn">
                <a style={{ color: "white" }}>View all posts</a>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNewsTwo;