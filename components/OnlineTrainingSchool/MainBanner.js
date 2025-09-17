import React, { useCallback, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const MainBanner = () => {

    const router = useRouter();

    const scrollToSection = () => {
        const section = document.getElementById('section-id'); // replace 'section-id' with the ID of the section you want to scroll to
        section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="banner-wrapper-area">
            <div className="container">
                                
 
 
                    

                <div className="row align-items-center mainbannerhg">
                    <div className="col-lg-5 col-md-12">
                        <div className="banner-wrapper-content">

                            <h1 className="mainbannerh1">it's time to 
                         
                            <div className="winimg">
                            <Image
                              src="/images/win.gif"
                              alt="win-upskill-how-we-help-learning"
                              width={500}
                              height={150}
                              style={{ filter: 'none' }}
                              priority={true}
                            />
                            </div>



                            </h1> 
                            
                            <p>Welcome to the win upskilling universe. We are your partner in the quest to gain new skills, and to win better in your career. With our carefully curated career-focused upskilling programs, you are certain to gain critical management, technology and behavioral skills.</p>

                            

                            
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-12">
                        
                        <div className="banner-wrapper-image hideonmob">
                            <Image
                              src="/images/about-img10.png"
                              alt="win-upskill-itil-iso27001-training"
                              width={500}
                              height={410}
                            />
                        </div>
                    </div>


                </div>

                <button className="getstarted" onClick={scrollToSection}>Get started</button>
                <button className="learnmore" onClick={() => router.push('/contact')}>Learn more</button>
                <div id="section-id"></div>
                <div className="banner-inner-area hideonmob">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-banner-box">
                                <h3>Career Upskilling Courses</h3>
                                <p style={{"minHeight": "52px"}}>Upgrade your IT management play</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-banner-box">
                                <h3>win Career Club</h3>
                                <p style={{"minHeight": "52px"}}>Career growth on steroids</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-0 offset-md-3 offset-sm-3">
                            <div className="single-banner-box">
                                <h3>Learn, Network, Win</h3>
                                <p style={{"minHeight": "52px"}}>Career-coach & network with the best in business</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="divider"></div>
             
    
        </div>
    )
}

export default MainBanner;