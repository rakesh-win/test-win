import React, { useState, useEffect } from "react";
import PageBanner from "../../components/SingleCourses/PageBanner";
import axios from "axios";
import { useRouter } from "next/router";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [img, setImg] = useState("");

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      getBlog(slug);
    }
  }, [slug]);

  const getBlog = async (slug) => {
    try {
      const response = await axios.get(`https://winupskill.in/api/api/blogs`);
      const matchingBlog = response.data.data.find((blog) => blog.url.includes(slug));

      if (matchingBlog) {
        setBlog(matchingBlog);
        setImg(matchingBlog.image);
      } else {
        // Handle the case when no matching blog is found
        console.error("Blog not found for the provided slug:", slug);
      }
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching data:", error);
    }
  };

  return (
    <React.Fragment>
      {blog && (
        <PageBanner
          homePageUrl="/"
          homePageText="Home"
          innerPageUrl="/blogs"
          innerPageText="Blogs"
          activePageText={blog.title}
        />
      )}

      <div className="blog-details-area">
        {blog ? (
          <div className="title-content">
            <h2 className="blog-title">{blog.title}</h2>
          </div>
        ) : (
          <div className="title-content">
            <h2>Loading...</h2>
          </div>
        )}

        {blog && (
          <div className="blog-content">
            <div>
              <p dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default BlogDetails;
