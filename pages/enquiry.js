import React from 'react';
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import EnquiryForm from '../components/Contact/EnquiryForm';
// import Footer from '../components/_App/Footer';
import GoogleMap from '../components/Contact/GoogleMap';

const Enquiry = () => {
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle="Enquiry Form" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Enquiry Form" 
            />  

            <div className="contact-area ptb-100">
                <div className="container">
                    <div className="row align-items-center">
                            <EnquiryForm />
                    </div>
                </div>
            </div>

           </React.Fragment>
    )
}

export default Enquiry;