import React from 'react';
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import EnquiryForm2 from '../components/Contact/EnquiryForm2';
// import Footer from '../components/_App/Footer';
import GoogleMap from '../components/Contact/GoogleMap';

const Enquiry2 = () => {
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle="CF Club Enquiry Form" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="CF Club Enquiry Form" 
            />  

            <div className="contact-area" style={{marginTop:"20px", marginBottom:"100px" }}>
                <div className="container">
                    <div className="row align-items-center">
                            <EnquiryForm2 />
                    </div>
                </div>
            </div>

           </React.Fragment>
    )
}

export default Enquiry2;