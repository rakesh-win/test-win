import React from 'react';
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Features from '../components/Common/Features';
import AboutUsContentThree from '../components/About/AboutUsContentThree';
import CoursesAreaStyleTwo from '../components/Common/CoursesAreaStyleTwo';
import FunFactsTwo from '../components/Common/FunFactsTwo';
import PremiumAccessTwo from '../components/Common/PremiumAccessTwo';
// import Footer from '../components/_App/Footer';

const About3 = () => {
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="About Us" 
            />  
            


             <div className="features-area ptbpage">
                <div className="container">
                    <div className="section-title" style={{"max-width": "1200px"}}>
                        <span className="sub-title">About Us</span>
                        <h2 style={{"max-width": "1200px"}}>win - an upskilling company</h2>
                       
                    </div>
                </div>
            </div>

               
            


            <p style={{"padding":"0px 50px 50px 50px"}}>
                win upskill is a team of highly experienced IT management consultants & trainers. It consists of experts with Big4 background (e.g., KPMG, E&Y, PwC, Deloitte). Our trainers are accredited on the topics they train on, and are highly respected in the industry. CF works extensively with strategic partners & clients across Europe & Middle Eastern countries.
            </p>

            <p style={{"padding":"0px 50px 50px 50px", "margin-top":"-50px"}}>
               We engage with your IT Organization right at the inception of a transformation project, during the planning / current & future state study stage. As a result, you get the benefit of bringing global expertise in creating better synergy between your business objectives and the transformation journey, resulting into more successful initiatives.
            </p>

            <p style={{"padding":"0px 50px 50px 50px", "margin-top":"-50px"}}>
              We specialize in assisting you with globally acclaimed IT governance & management related frameworks & standards (e.g., COBIT, ITIL®, ISO 20000, ISO 27001, Six Sigma, Lean etc). We also provide further assistance throughout the entire transformation journey, right through model based design & documentation of the future state, implementation of it and realization of benefits.
            </p>

            <p style={{"padding":"0px 50px 50px 50px", "margin-top":"-50px"}}>
                Most noteworthy in our consulting approach is the high focus on Organizational change management, which is a pretty rare area of attention by most of our competitors. We believe that an improvement initiative is only as successful as the success it brings to the people being impacted by it, and hence we manage all our engagements in a scientifically designed Organizational change management approach that is homegrown. 
            </p>

             <p style={{"padding":"0px 50px 50px 50px", "margin-top":"-50px"}}>
               Our clientele includes Enterprise IT groups of IT giants, financial institutions, Oil & Gas companies and Telecom companies. We contribute to the enterprise IT organizations by ensuring that they have access to Management Consulting & training Services of the highest quality.
             </p>
             <p style={{marginBottom:"50px"}}></p>
        </React.Fragment>
    )
}

export default About3;