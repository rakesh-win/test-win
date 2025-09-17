import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
 
const BlogSidebar = () => {
    const [allBlogs, setallBlogs] = React.useState([]);
    const [allcats, setAllcats] = React.useState([]);
   
     useEffect(() => {
     getBlogs();
     },[]);
   

    const getBlogs = async() => {
           const url = `https://winupskill.in/api/api/blogs`
            var response = await axios.get(url).then(
             result => {
                console.log("res",result.data.data);
                setallBlogs(result.data.data)

                const categories = {};
                (result.data.data).forEach(blog => {
                  if (categories[blog.category]) {
                    categories[blog.category]++;
                  } else {
                    categories[blog.category] = 1;
                  }
                });

                setAllcats(categories);

                console.log("categories",categories);

             })



    } 

    return (
        <div className="widget-area">
            
            <div className="widget widget_categories">
                <h3 className="widget-title">Categories</h3>
              
                <ul>

                    {Object.keys(allcats).map(category => (
                      <li key={category}>
                            {category} ({allcats[category]})
                      </li>
                 )) }
                </ul>



            </div>

            
        </div>
    )
}

export default BlogSidebar;