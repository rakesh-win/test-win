import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";
import PageBanner from '../components/Common/PageBanner';
import Link from 'next/link';
import Partner2 from '../components/Common/Partner2';


const Consulting = () => {
	return (
		<React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Consulting Services" 
            />  

		<>


		<div className="features-area ptbpage">
            <div className="container">
                <div className="section-title" style={{"maxWidth": "1200px"}}>
                    <span className="sub-title">Process Transformation &amp; Maintenance Solutions</span>
                    <h2>IT Management Consulting Services</h2>
                    <p style={{"maxWidth": "1200px"}}>We&nbsp;offer IT management consulting services. Our services are high quality, high maturity and very affordable. Our team&nbsp;boasts of experts with consulting experience ranging from two (02) to eighteen (18) years.&nbsp;</p>
                	<p style={{"maxWidth": "1200px"}}>Furthermore, our&nbsp;management consultancy practice is led by ex-Big 4 consulting leaders.</p>
                </div>

                <div className="row">
                    <div className="col-lg-8 col-sm-6 col-md-6">
                        <div>
                            <h3>5 Reasons to choose us</h3>

                            <ul>
								<li>We understand the Business context of your project</li>
								<li>We are organisational change management experts</li>
								<li>We are subject matter experts in Governance &amp; management of IT</li>
								<li>We provide Consultants, and not only Subject Matter Experts</li>
								<li>Our consultants are well groomed, and best-of-breed</li>
							</ul>

						    <h3>5 Reasons to choose us</h3>

						    <ul>
								<li>Ex-Big4 consultants</li>
								<li>Global&nbsp;management consulting practice leaders</li>
								<li>Ex-CTO, CIO’s</li><li>Lead Auditors &amp; Implementers</li>
								<li>Subject Experts &amp; Practitioners</li>
							</ul>


                          </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-md-6">
                        <div>
                            <h3>Consulting Service Offerings</h3>




                            <div className="consulting-services-title">
                            <span>IT Governance Consulting</span>
                            	<div className="consulting-services-inner">
                            	Among the few providers who have delivered IT Governance&nbsp;consultancy services based on COBIT &amp; ISO 38500
                            	</div>
                            </div>

                            <div className="consulting-services-title">
                            <span>IT Service Management Consulting</span>
                            	<div className="consulting-services-inner">
                            	Service Management System (SMS) / ITSM process consultancy service based on ITIL, ISO 20000 &amp; CMMI for Services (SVC)
                            	</div>
                            </div>

                            <div className="consulting-services-title">
                             <span>Information Security Consulting</span>
                            	<div className="consulting-services-inner">
                            	Premium Information Security Management System (ISMS) / ISMS process consultancy service based on&nbsp;ISO 27000
                            	</div>
                            </div>

                            <div className="consulting-services-title">
                            	<span>Management System Setup &amp; ISO Certification</span>
                            	<div className="consulting-services-inner">
                            	We help businesses build management systems. We offer ISO Certifications in ISO 9001 / ISO 20000 / ISO 27001, ISO 22301 &amp; ISO 27701
                            	</div>
                            </div>

                            
                            
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>

         <div className="section-title" style={{"maxWidth": "1200px"}}>
                    <h2 style={{"maxWidth": "1200px","marginTop":"50px"}}>CF Eight Phased IT Management Consulting approach</h2>
         </div>


        
         <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px", "padding": "20px 50px"}}>
                    <h3 className="ql-align-center">1 of 8. Planning &amp; Context Setting</h3>
	                    <ul>
							<li>Project planning of the engagement in terms of effort, roles, governance etc</li>
							<li>Setting the context of the engagement as well as the targeted system / processes</li>
						</ul>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px"}}>
                    
                    </div>
        </div>

        <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px"}}>
                    
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px", "padding": "20px 50px"}}>
                    	<h3 className="ql-align-center">2 of 8. Risk Assessment / Gap Analysis / as-is &amp; to-be study</h3>
							<ul>
								<li>Assessment of the environmental risks on the achievement of the targeted system / process objective</li>
								<li>Gap analysis / as-is &amp; to-be study activities to identify the current state and the gap from the target performance state</li>
							</ul>
                    </div>
        </div>

        <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px", "padding": "20px 50px"}}>
                    	<h3 className="ql-align-center">3 of 8. Risk Treatment Planning &amp; Controls Applicability Finalisation</h3>
							<ul>
								<li>Identification of the applicable controls &amp; Creation of treatment plan</li>
							</ul>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px"}}>
                    
                    </div>
        </div>

        <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px"}}>
                    
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px", "padding": "20px 50px"}}>
                    	<h3 className="ql-align-center">4 of 8. Design &amp; Documentation</h3>
							<ul>
								<li>Creation of system / process design</li>
								<li>Documentation of the system / process</li>
							</ul>
                    </div>
        </div>

        <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px", "padding": "20px 50px"}}>
                    	<h3 className="ql-align-center">5 of 8. Implementation Assistance</h3>
							<ul>
								<li>System / Process roles distribution</li>
								<li>Role based training</li>
								<li>New / modified system / process&nbsp;go-live coordination</li>
								<li>Proactive &amp; Reactive maintenance of the system / standard</li>
							</ul>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px"}}>
                    </div>
        </div>

        <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px"}}>
                    
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px", "padding": "20px 50px"}}>
                    	<h3 className="ql-align-center">6 of 8. Internal Audit / Assessment &amp; further improvement</h3>
							<ul>
								<li>Internal audit training</li>
								<li>Internal audit activities coordination</li>
								<li>Identification of non-conformances / gaps</li>
								<li>Management review coordination</li>
								<li>Gaps closure assistance</li>
							</ul>
                    </div>
        </div>

        <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px", "padding": "20px 50px"}}>
                    	<h3 className="ql-align-center">7 of 8. Closure</h3>
							<ul>
								<li>External management system audit assistance / Internal benchmark mapping</li>
								<li>Final knowledge transfer to the Client team</li>
							</ul>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px"}}>
                    
                    </div>
        </div>

        <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px"}}>
                    
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6" style={{"height":"150px", "padding": "20px 50px"}}>
          	          <h3 className="ql-align-center">8 of 8. Ongoing&nbsp;management of the established system / process</h3>
							<ul>
								<li>Maintenance of the Plan-Do-Check-Act cycle of activities</li>
							</ul>
                    </div>
        </div>

        
         
        <Partner2 />
        



	
 
	

	

	

	</>






</React.Fragment>

	)
}

export default Consulting;
