import React from 'react';
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import ContactForm from '../components/Contact/ContactForm';
// import Footer from '../components/_App/Footer';
import GoogleMap from '../components/Contact/GoogleMap';

const Contact = () => {
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Contact" 
            />  

            <div className="contact-area ptb-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="contact-info">
                                <span className="sub-title">Contact Details</span>
                                <h2>Get in Touch</h2>
                               
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <i className='bx bx-map'></i>
                                        </div>
                                        <h3>Bengaluru</h3>
                                        <p>Regd. Office: PVR Towers, 2nd Floor, BDA Layout, BTM 4th Stage, Bengaluru, Karnataka 560076</p>
                                        <p>+91 96062 37593</p>
                                        <p>info@winupskill.com</p>
                                    </li>

                                    <li>
                                        <div className="icon">
                                            <i className='bx bx-map'></i>
                                        </div>
                                        <h3>London</h3>
                                        <p>160 Kemp House, City Road, London EC1V 2NX</p>
                                        <p>+44 20 8133 0838</p>
                                        <p>info@winupskill.com</p>
                                    </li>

                                    <li>
                                        <div className="icon">
                                            <i className='bx bx-map'></i>
                                        </div>
                                        <h3>Kolkata</h3>
                                        <p>EN37, Raj Premiere Building, 3rd Floor, Sector V, Salt Lake, Kolkata, West Bengal 700091</p>
                                        <p>+91 96062 37593</p>
                                        <p>info@winupskill.com</p>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </React.Fragment>
    )
}

export default Contact;