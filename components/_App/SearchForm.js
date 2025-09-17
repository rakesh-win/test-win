import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const [courseResults, setCourseResults] = useState([]);
  const [blogResults, setBlogResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false); // State to track whether to show results
  const searchRef = useRef(null); // Ref for the search box element

  const dataFetch = async (value) => {
    setLoading(true); // Start loading

    const courseUrl = `https://winupskill.in/api/api/courses`;
    const blogUrl = `https://winupskill.in/api/api/blogs`;

    try {
      const [courseResponse, blogResponse] = await Promise.all([
        axios.get(courseUrl),
        axios.get(blogUrl),
      ]);

      if (courseResponse.data.data) {
        const filteredCourseResults = courseResponse.data.data.filter(
          (course) => course.name.toLowerCase().includes(value.toLowerCase())
        );
        setCourseResults(filteredCourseResults);
      } else {
        console.error(
          "Course API response is not an array:",
          courseResponse.data.data
        );
        setCourseResults([]);
      }

      if (blogResponse.data.data) {
        const filteredBlogResults = blogResponse.data.data.filter((blog) =>
          blog.title.toLowerCase().includes(value.toLowerCase())
        );
        setBlogResults(filteredBlogResults);
      } else {
        console.error(
          "Blog API response is not an array:",
          blogResponse.data.data
        );
        setBlogResults([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleOnChange = (value) => {
    setSearch(value);
    setShowResults(true); // Show results when input changes
    dataFetch(value); // Start searching and loading
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // Add a click event listener to the document to handle clicks outside the search box
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false); // Click outside, so hide results
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ marginTop: "35px" }}>
      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          className="input-search"
          placeholder="Search for Courses or Blogs"
          value={search}
          onChange={(e) => handleOnChange(e.target.value)}
          ref={searchRef} // Assign the ref to the search box element
        />
      </form>
      {showResults && ( // Only render results when showResults is true
        <Show
          courseResults={courseResults}
          blogResults={blogResults}
          setSearch={setSearch}
          loading={loading} // Pass the loading state to Show component
        />
      )}
    </div>
  );
};

export default SearchForm;

// The rest of your code remains the same.

function Show({ courseResults, blogResults, setSearch, loading }) {
  const routeToCourse = (result) => {
    setSearch("");
  };

  return (
    <div
      className=" search-app__container"
      style={{ width: "400px", zIndex: 1000 }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          {courseResults.length === 0 && blogResults.length === 0 ? (
            <center>
              <p>data not found</p>
            </center>
          ) : (
            <>
              {courseResults.length > 0 && (
                <>
                  <div className="search-bar__headings">
                    <p>Courses</p>
                  </div>
                  {courseResults.map((result) => (
                    <div
                      key={result.id}
                      style={{
                        color: "black",
                      }}
                    >
                      <li
                        className="search-app__list"
                        onClick={() => routeToCourse(result)}
                      >
                        <Link
                          href={`${result.previewurl}`}
                          style={{ fontWeight: 100 }}
                        >
                          <p style={{ margin: "5px" }}>{result.name}</p>
                        </Link>
                      </li>
                    </div>
                  ))}
                </>
              )}
              {blogResults.length > 0 && (
                <>
                  <div className="search-bar__headings">
                    <p>Blogs</p>
                  </div>
                  {blogResults.map((result) => (
                    <div
                      key={result.id}
                      style={{
                        color: "black",
                      }}
                    >
                      <li
                        className="search-app__list"
                        onClick={() => routeToCourse(result)}
                      >
                        <Link href={result.url}>
                          <p>{result.title}</p>
                        </Link>
                      </li>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
