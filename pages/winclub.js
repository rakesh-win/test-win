import React, { useRef } from 'react';
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
// import Footer from '../components/_App/Footer';
import cookie from 'js-cookie'
import Router from 'next/router'

const CFclub = () => {
    const sendtoEnquiry = async (courseId, name) => {
    cookie.set('enquirecourseId', "winClub-Standard");
    cookie.set('enquirecourseName', "winClub Membership");
    Router.push('/enquiry2');
    }

    const sendtoEnquiry2 = async (courseId, name) => {
    cookie.set('enquirecourseId', "CFClub-Early Bird Offer");
    cookie.set('enquirecourseName', "CF Club Membership");
    Router.push('/enquiry2');
    }

    const sendtoEnquiry3 = async (courseId, name) => {
    cookie.set('enquirecourseId', "CFClub-Existing Customer");
    cookie.set('enquirecourseName', "Standard: CF Club Membership");
    Router.push('/enquiry2');
    }
 
    const refToElement = useRef(null);
    

    const refsArray = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
    ];

    const scrollToRef = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
    };

 
    const handleButtonClick = () => {
        refToElement.current.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <React.Fragment>
            {/* <Navbar /> */}
            
                <div className="introtitle">
                    <p>welcome to our</p>

                    <span style={{"width":"800px"}} className="subtitle">Career <p></p>Club</span>

                    <p className="introaddl">
                        win career club is an exclusive membership service that gives you access to a 360 degrees career growth solution for IT professionals. Your membership to this club gives you the opportunity to benefit from our bouquet of six high-powered benefits.
                    </p>

                </div>

                

                <div className="containerclub">
                

                    <div className="clubboxcontainer hideonmob">
                        <div style={{"border-radius": "20px 0px 0px 20px"}} className="col-lg-2 rowinneritem" onClick={handleButtonClick}>
                            <span className="roundnos2"><span className="roundnos3">1</span></span>  
                            Career Opportunities
                        </div> 

                        <div className="col-lg-2 rowinneritem" onClick={() => scrollToRef(refsArray[0])}>
                            <span className="roundnos2"><span className="roundnos3">2</span></span>  
                            Career Counselling
                        </div>

                        <div className="col-lg-2 rowinneritem" onClick={() => scrollToRef(refsArray[1])}>
                            <span className="roundnos2"><span className="roundnos3">3</span></span>  
                            Personal Branding
                        </div>

                        <div className="col-lg-2 rowinneritem" onClick={() => scrollToRef(refsArray[2])}>
                            <span className="roundnos2"><span className="roundnos3">4</span></span>  
                            Professional Networking
                        </div>

                        <div className="col-lg-2 rowinneritem" onClick={() => scrollToRef(refsArray[3])}>
                            <span className="roundnos2"><span className="roundnos3">5</span></span>  
                            Exclusive Workshops
                        </div>

                        <div style={{"border-radius": "0px 20px 20px 0px"}} className="col-lg-2 rowinneritemb" onClick={() => scrollToRef(refsArray[4])}>
                            <span className="roundnos2"><span className="roundnos3">6</span> </span> 
                            Deep Discounted Certifications
                        </div>


                    </div>


                     <div className="clubboxcontainer hideonweb">
                        <div className="row">
                        <div className="rowinneritemmob" onClick={handleButtonClick}>
                           <span className="roundnos4">1</span>Career Opportunities
                        </div>

                        <div className="rowinneritemmob" onClick={() => scrollToRef(refsArray[0])}>
                            <span className="roundnos4">2</span>Career Counselling
                        </div>

                        <div className="rowinneritemmob" onClick={() => scrollToRef(refsArray[1])}>
                            <span className="roundnos4">3</span>Personal Branding
                        </div>
                        <div className="rowinneritemmob" onClick={() => scrollToRef(refsArray[2])}>
                           <span className="roundnos4">4</span> Professional Networking
                        </div>

                        <div className="rowinneritemmob" onClick={() => scrollToRef(refsArray[3])}>
                           <span className="roundnos4">5</span>Exclusive Workshops
                        </div>

                        <div className="rowinneritemmob" onClick={() => scrollToRef(refsArray[4])}>
                            <span className="roundnos4">6</span>Deep Discounted Certifications
                        </div>
                         </div>


                    </div>

                    <div ref={refToElement} className="section-title" style={{"max-width": "1000px","paddingBottom":"50px","marginBottom":"0px"}}>
                        <h2 className="clubtitlebigtext" style={{"max-width": "1000px"}}>Join win Career Club!</h2>
                        <span className="sub-title font30">6 Benefits. One Membership</span>
                         
                    </div>

                </div>

               

                <div className="container" style={{"max-width":"100%","padding": "0px"}}>
                    <div className="row" ref={refsArray[0]}>
                            <div className="col-lg-1 rowinneritem7 hideonmob">
                               <span className="roundnos">1</span> 
                            </div>
                            <div className="col-lg-3 rowinneritem5">
                               Career Opportunities
                            </div>
                            <div className="col-lg-8 rowinneritem6">
                               Explore a range of full-time and freelance projects to take your career to new heights.
                            </div>
                        </div>

                        <div className="row" ref={refsArray[1]}>
                            <div className="col-lg-1 rowinneritem7 hideonmob">
                               <span className="roundnos">2</span> 
                            </div>
                            <div className="col-lg-3 rowinneritem5">
                                Career Counselling
                            </div>
                            <div className="col-lg-8 rowinneritem6">
                               Get expert advice and guidance to help you reach your career aspirations.
                            </div>
                        </div>

                        <div className="row" ref={refsArray[2]}>
                            <div className="col-lg-1 rowinneritem7 hideonmob">
                               <span className="roundnos">3</span> 
                            </div>
                            <div className="col-lg-3 rowinneritem5">
                                Personal Branding
                            </div>
                            <div className="col-lg-8 rowinneritem6">
                               Showcase your skills and abilities to the world through events and activities organized by the win Career Club.
                            </div>
                        </div>

                        <div className="row" ref={refsArray[3]}>
                            <div className="col-lg-1 rowinneritem7 hideonmob">
                               <span className="roundnos">4</span> 
                            </div>
                            <div className="col-lg-3 rowinneritem5">
                                Professional Networking
                            </div>
                            <div className="col-lg-8 rowinneritem6">
                               Build valuable connections and make lasting relationships with industry experts in your field. 
                            </div>
                        </div>

                        <div className="row" ref={refsArray[4]}>
                            <div className="col-lg-1 rowinneritem7 hideonmob">
                               <span className="roundnos hideonmob">5</span> 
                            </div>
                            <div className="col-lg-3 rowinneritem5">
                                Exclusive Workshops
                            </div>
                            <div className="col-lg-8 rowinneritem6">
                               Stay ahead of the curve and learn from experts in your field through webinars and virtual events.
                            </div>
                        </div>

                        <div className="row" ref={refsArray[5]}>
                            <div className="col-lg-1 rowinneritem7 hideonmob">
                               <span className="roundnos">6</span> 
                            </div>
                            <div className="col-lg-3 rowinneritem5">
                               Deep Discounted Certifications
                            </div>
                            <div className="col-lg-8 rowinneritem6">
                               Get access to our courses that you need to achieve your career goals at an exclusive members-only deep-discounted price, throughout the year.
                            </div>
                        </div>
                </div>




                <div className="tit2">
                                 Membership Fee Details
                </div>
 

                <div className="row" style={{"margin":"10px 0px"}}>

                            <div className="col-lg-4 rowpricecol" >
                                  <span className="pricelinebig">Standard</span>
                                    <span className="priceline"> Be a member and grow without boundaries</span>
                                    <span className="pricelinebig">₹15,000</span>
                                    <span className="priceline"> Yearly</span>
                                    <p style={{paddingTop:"35px"}}></p>
                                    <span className="priceline">  Ideal for IT professionals looking for career growth. Beneficial for entry level as well as senior professionals alike. This price is applicable from 1st March 2023.</span>
                                    <span className="priceline seprt"></span>
                                    <span className="priceline"> Access to all 6 services</span>
<p></p>
<p></p>
<center>

                                <button  className="default-btn" onClick={() => sendtoEnquiry()}>Count me in</button>
</center>                            </div>

                             <div className="col-lg-4 rowpricecol">
                                <span className="pricelinebig">Early Bird Offer</span>
                                <span className="priceline">All benefits of a standard membership at an effectively zero price.</span>
                                <span className="pricelinebig2">₹15,000</span>
                                <span className="pricelinebig">₹10,000</span>
                                <span className="priceline">Yearly (Zero effective price)</span>
                                <span className="priceline">Learning coupon worth Rs. 10,000 that can be redeemed against our entire course catalog, making your effective membership fee zero. (conditions apply)</span>
                                <span className="priceline seprt"></span>
                                <span className="priceline">Standard membership +</span>
<br/>
<center>

                                <button  className="default-btn" onClick={() => sendtoEnquiry2()}>Count me in</button>
</center>
                            </div>

                             <div className="col-lg-4 rowpricecol" >

                                <span className="pricelinebig">Existing Customer</span>
                                <span className="priceline">A no-cost-involved offer, only for our existing customers</span>
                                <span className="pricelinebig2">₹15,000</span>
                                <span className="pricelinebig">₹0</span>
                                <span className="priceline">Yearly</span>
                                <span className="priceline"> This zero cost membership is open to our entire customer base. If you have availed any course from us in the past, you are eligible for this offer.</span>
                                <span className="priceline seprt"></span>
                                <span className="priceline">Standard membership +</span>
                                <br/>
<center>
                                <button  className="default-btn" onClick={() => sendtoEnquiry3()}>Count me in</button>
</center>
                            </div>
                        </div>
                
        </React.Fragment>
    )
}

export default CFclub;

/*

 <div className="container cont">
                      
                        <div className="row">
                            <div className="col-lg-8 rowinneritem2">

                            JOIN NOW!
                            <p>SUPERCHARGE YOUR CAREER.</p>
                            <p>GROW LIKE NEVER BEFORE.</p>
                  

                            </div>
                            <div className="col-lg-4 rowinneritem3">
                                <img
                                        src="/images/join.png"
                                        alt="image"
                                       
                                   />

                            </div>
                        </div>
                </div>

                */ 