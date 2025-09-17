import React, { useState, useEffect } from "react";
import Navbar from "../../components/_App/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Link from "next/link";
import Footer from "../../components/_App/Footer";
import axios from "axios";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Blog2 = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [catMenu, setCatMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown open/close
  const [values, setValue] = useState();
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleClose(); // Close the dropdown after selection
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    window.scrollTo({
      top: 0,
      behavior: "smooth", //   Optionally, add smooth scrolling behavior
    });
  };

  useEffect(() => {
    getBlogs();
    getCatMenu();
  }, []);

  const handleAllCategoriesClick = () => {
    setSelectedCategory(null);
  };

  const getBlogs = async () => {
    const url = "https://winupskill.in/api/api/blogs";
    try {
      const response = await axios.get(url);
      setAllBlogs(response.data.data.sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const getCatMenu = async () => {
    const url = "https://winupskill.in/api/api/blogs";
    try {
      const response = await axios.get(url);
      const blogs = response.data.data;
      const uniqueCategoriesSet = new Set(blogs.map((blog) => blog.category));
      const uniqueCategories = Array.from(uniqueCategoriesSet);

      const uniqueCatMenu = uniqueCategories.map((category, index) => ({
        id: index,
        category,
      }));

      setCatMenu(uniqueCatMenu);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredBlogs = selectedCategory
    ? allBlogs.filter((blog) => blog.category === selectedCategory)
    : allBlogs;

  return (
    <React.Fragment>
      <PageBanner
        pageTitle="Blogs"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blogs"
      />

      <div className=" blog-category__container">
        <div className="blog-category hideonmob">
          <nav style={{ margin: "10px" }}>
            <ul>
              <li
                key="all-categories"
                onClick={() => handleAllCategoriesClick()} // Add a new function to handle "All Categories" click
                style={{
                  fontWeight: selectedCategory === null ? "bold" : "normal", // Update style based on selected category
                }}
              >
                All Categories
              </li>
              {catMenu.map((cats) => (
                <li
                  key={cats.id}
                  onClick={() => handleCategoryClick(cats.category)}
                  style={{
                    fontWeight:
                      selectedCategory === cats.category ? "bold" : "normal",
                  }}
                >
                  {cats.category}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <div>
            <br />
          </div>
          <div className="row">
            <div className="hideonweb container" style={{ padding: 5 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Categories"
                  onChange={handleChange}
                  open={isOpen} // Control dropdown open state
                  onClose={handleClose} // Handle close event
                  onOpen={handleOpen} // Handle open event
                >
                  <MenuItem
                    onClick={handleAllCategoriesClick}
                    value={"All Categories"}
                  >
                    All Categories
                  </MenuItem>
                  {catMenu.map((cats) => (
                    <MenuItem
                      key={cats.id}
                      onClick={() => handleCategoryClick(cats.category)}
                      label={cats.category}
                      id={cats.category}
                      value={cats.category}
                    >
                      {cats.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {filteredBlogs.length ? (
              filteredBlogs.map((blogs) => (
                <div className="col-lg-4 col-md-6" key={blogs.id}>
                  <div className="single-blog-post-box">
                    <div className="post-image">
                      <Link href={blogs.url}>
                        <a className="d-block">
                          <img
                            style={{
                              "max-height": "100%",
                              "object-fit": "cover",
                              width: "100%",
                            }}
                            src={blogs.image}
                            alt="image"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="post-content">
                      <a className="category">{blogs.category}</a>
                      <h5>
                        <Link href={blogs.url}>{blogs.title}</Link>
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
      </div>
    </React.Fragment>
  );
};

export default Blog2;