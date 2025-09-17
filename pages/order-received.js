import React, { useState, useEffect } from "react";
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
// import Footer from '../components/_App/Footer';
import Link from "@/utils/ActiveLink";

const OrderReceived = () => {

const [msg, setMsg] = useState(0);
const [pass, setPass] = useState(0);
const [mail, setMail] = useState(0);

 
    useEffect(() => {

       setMsg(localStorage.getItem('ordstat'));
       setPass(localStorage.getItem('tmppass'));
       setMail(localStorage.getItem('tmpemail'));
       

    }, []);


    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Order Received" 
            />  
            


             <div className="features-area ptbpage">
                <div className="container">
                    <div className="section-title" style={{"max-width": "1200px"}}>
                        <h2 style={{"max-width": "1200px"}}>Thank you for your order</h2>
                        <p style={{marginTop:'40px'}}>We have received your order successfully.</p>

                        <p style={{display: (msg === 'Existing email id found. Purchased courses are assigned to the same')? 'flex' : 'none'}}>
                            We have found an existing email id: {mail}. Purchased course access has been assigned to this email id. Please login and continue your learning journey!
                        </p>


                        <p style={{display: (msg === 'New user created & Course assigned')? 'flex' : 'none'}}>
                            We have created a new account with your email id: {mail}. Purchased course access has been assigned to this email id. 
                        </p>

                        <p style={{display: (msg === 'New user created & Course assigned')? 'flex' : 'none'}}>
                           Please use this email and password: {pass} to login and continue your learning journey!
                        </p>

                        <p style={{display: (msg === 'enrollstats created for existing user')? 'flex' : 'none'}}>
                           Purchased course access has been assigned. 
                           Please visit your Profile and continue your learning journey!
                         </p>

                         <p style={{display: (msg === 'enrollstats created for existing user')? 'flex' : 'none'}}><a href="/user/my-profile">Visit your Profile </a> </p>




                       

                    </div>

                </div>
            </div>

          
        </React.Fragment>
    )
}

export default OrderReceived;