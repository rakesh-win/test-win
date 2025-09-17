import React from 'react';
import Link from 'next/link';

const Features = () => {
    return (
        <div className="features-area pt-100 pb-70">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">Career Growth for You</span>
                    <h2 style={{"color":"#D0140F"}}>Online Live Courses and Complete Career Guidance</h2>
                    <p style={{"text-align":"center"}}>A 360 degrees holistic career service that includes Upskilling + Certifications + Counselling + Networking + Career opportunities</p>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-sm-6 col-md-6" style={{paddingRight: "30px"}}>
                        <div className="single-features-box without-padding">
                            <div className="icon">
                                <i className="flaticon-brain-process"></i>
                            </div>
                            <h3>Learn the Latest Skills</h3>
                            <p style={{"max-width": "100%"}}>Get trained & certified on career-empowering topics like Information Security, Data Privacy, IT Service Management, Emerging Tech & more.</p>
 
                           
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-md-6" style={{paddingRight: "30px"}}>
                        <div className="single-features-box without-padding">
                            <div className="icon">
                                <i className="flaticon-computer"></i>
                            </div>
                            <h3>Be a member of win Career Club</h3>
                            <p style={{"max-width": "100%"}}>Hypergrow through our career counselling & networking services. Get exciting career opportunities.</p>
                            
                            
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-0 offset-md-3 offset-sm-3" style={{paddingRight: "30px"}}>
                        <div className="single-features-box without-padding">
                            <div className="icon">
                                <i className="flaticon-shield-1"></i>
                            </div>
                            <h3>Learn from Industry Experts</h3>
                            <p style={{"max-width": "100%"}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;