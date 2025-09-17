import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
const CoursesArea = () => {

     const [allCourses, setallCourses] = React.useState([]);
     const [allCoursesurl, setallCoursesurl] = React.useState([]);
     const [filt, setFilt] = React.useState([]);
    
     useEffect(() => {
     getCourses();
     },[]); 
     

    const getCourses = async() => {
           const url = `https://winupskill.in/api/api/courses?homepage=y`
            var response = await axios.get(url).then(
             result => {
                setallCourses(result.data.data)
             })


    } 

    return (
        <div className="courses-area ptb-100 bg-f5f7fa">
            <div className="container">
                <div className="section-title" style={{"max-width": "1000px"}}>
                    <span style={{"color":"#000"}} className="sub-title">Winning is all about preparation</span>
                    <h2 style={{"color":"#D0140F", "max-width": "1000px"}}>One upskilling platform. Hundred career benefits!</h2>
                     
                </div>
                <div className="row courses-desktop">
                    {allCourses.length ? allCourses.map((course,index) => (
                        
                    <Link key={index} href={course.previewurl}>
                    <div className="col-lg-6 col-md-12">
                        <div className="single-courses-item">
                            <div className="row align-items-center">
                                <div className="col-lg-4 col-md-4">
                                    <div className="courses-image">
                                        <Image
                                          src={course.image}
                                          alt="course-name"
                                          width={400}
                                          height={391}
                                        />
                                        <Link href={course.previewurl}>
                                            <a className="link-btn"></a>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-lg-8 col-md-8">
                                    <div className="courses-content">
                                        <h3>
                                            <Link href={course.previewurl}>
                                                <a className="price">{course.name}</a>
                                            </Link>
                                        </h3>
                                        <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                                            <li>
                                                <i className='flaticon-agenda'></i> {course.duration}
                                            </li>
                                         
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                    
                        )) : (
                            <h1>Loading...</h1>
                        )}
                </div>



                <div className="row courses-mobile">
                    {allCourses.slice(0,6).length ? allCourses.slice(0,6).map((course,index) => (
                    <div className="col-6" key={index}>
                        <div className="single-courses-item" style={{"height": "240px"}}>
                            <div className="row align-items-center">
                                <div className="row-mob-img"> 
                                    <div className="courses-image" style={{"height": "120px"}}>
                                        <Image
                                          src={course.image}
                                          alt="course-name"
                                          width={200}
                                          height={120}
                                        />
                                         <Link href={course.previewurl}>
                                            <a className="link-btn"></a>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-lg-8 col-md-8 col-sm-2">
                                    <div className="courses-content">
                                        <h3>
                                            <Link href={course.previewurl}>   
                                              <a className="price">{course.name}</a>
                                            </Link>
                                        </h3>
                                        <ul className="courses-content-footer d-flex justify-content-between align-items-center">
                                            <li>
                                                <i className='flaticon-agenda'></i> {course.duration}
                                            </li>
                                         
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        )) : (
                            <h1>Loading...</h1>
                        )}
                </div>

                
            </div>

            <div className="shape16">
          
                <Image
                                           src="/images/shape15.png"
                                          alt="course-texture"
                                          width={1000}
                                          height={800}
                                        />
            </div>
        </div>

    )
}

export default CoursesArea;