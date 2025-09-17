import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { parseCookies } from 'nookies';

import Router from 'next/router'

import Alert from 'react-popup-alert';
import cookie from 'js-cookie';

import Preloader from '../../components/_App/Preloader'

import TagManager from 'react-gtm-module';

// Form initial state
const INITIAL_STATE = {
	name: "",
	email: "",
	mobile: "", 
	message: "", 
};   

const EnquiryForm = () => {
	const [contact, setContact] = useState(INITIAL_STATE);
	const { register, handleSubmit, errors } = useForm();
	const [courseId, setcourseID] = React.useState();
    const [courseName, setcourseName] = React.useState();
    const [page, setPage] = React.useState();

    const [loading, setLoading] = React.useState(false);

    const [headertext, setHeadertext] = useState(0);
	const [btntext, setBtntext] = useState(0);

	const [alert, setAlert] = React.useState({
	    type: 'error',
	    text: 'This is a alert message',
	    show: false
	  })

	  function onCloseAlert() {
	  	setAlert({
	      type: '',
	      text: '',
	      show: false 

	    })
	  }

	  function onShowAlert(type,text) {
	    setAlert({
	      type: type,
	      text: text,
	      show: true
	    })
	  }



	const handleChange = (e) => {
		const { name, value } = e.target;
		setContact((prevState) => ({ ...prevState, [name]: value }));
	};

	useEffect(() => {
     getDetails();
     },[]);


	const getDetails = async ctx => {
    const { enquirecourseId } = parseCookies(ctx);
    const { enquirecourseName } = parseCookies(ctx);
    setcourseID(enquirecourseId);
    setcourseName(enquirecourseName);
    setPage(enquirecourseName);

    }

	const onSubmit = async (e) => {
		// e.preventDefault();
		try {
			setLoading(true);

			const url = `https://winupskill.in/api/api/formitems`;
			const { name, email, mobile, message } = contact;

			const utm_source = cookie.get('utm_source');
			const utm_source_current = cookie.get('utm_source_current');
			const landingurl = cookie.get('landingurl');
			const payload = { name, email, mobile, message, page, utm_source, utm_source_current,landingurl};
			const response = await axios.post(url, payload);
			
			const gtmdata = {

				"gtm.element": name,
			        "Form Element": name,
			        "name":name,
			        "utm_source":utm_source, 
			        "utm_source_current":utm_source_current,
			        "Original Landing Page URL": landingurl

 
 
			}

			const tagManagerArgs = {
			    gtmId: 'GTM-K9NXHCN',
			    events: {
			        sendUserInfo: gtmdata,
			        name: name,
			        utm_source:utm_source, 
			        utm_source_current:utm_source_current
			    }
			}

			cookie.set('formname', name);
			cookie.set('landingurl', landingurl);
			cookie.set('utm_source', utm_source);
			cookie.set('utm_source_current', utm_source_current);

    

			 
			TagManager.initialize(tagManagerArgs)

			// console.log(url);

			setContact(INITIAL_STATE);
		//	sendwhatsapp(payload);
			Router.push('/thankyou');
			

			setHeadertext("Success!"),
		   	setBtntext("Close"),
		    onShowAlert("success","We have received your details, will be in touch shortly. Meanwhile you can take a look at our available courses!")

			
			//Router.push('/courses');
			
		} catch (error) { 
			console.log(error);
		
		}
		finally {
			setLoading(false);
		}
	};

	// function sendwhatsapp(whatsappdata){

	// 	const whtspdata = {
	// 	    "countryCode": "+91",
	// 	    "phoneNumber": "9972250596",
	// 	    "callbackData": "test-message",
	// 	    "type": "Template",
	// 	    "template": {
	// 	        "name": "ilmilconnect",
	// 	        "languageCode": "en",
	// 	        "bodyValues": [
	// 	            whatsappdata.name,
	// 	            whatsappdata.email,
	// 	            whatsappdata.mobile,
	// 	            whatsappdata.message,
	// 	            whatsappdata.page
	// 	        ]
	// 	    }
	// 	}

	//   console.log("in whatsapp",whtspdata); 

	
	//   const url2 = `https://api.interakt.ai/v1/public/message/`;
	//    const token = "X3lHZlE3UXFJRlV0alRCWTh2VXZhYmNFSXVzeDdSY1RHNUlqZUlwUWxFczo=";
	//    const payload2 = {
 //        headers: {
 //        	'Authorization': `Basic ${token}`,
 //        	'Content-Type': 'application/json'

 //        }
      
 //        }

 //        try {
 //        	console.log("url2",url2)
 //        	console.log("payload2",payload2.headers)
	//   		axios.post(url2, payload2, {
	//   			body: whtspdata
	//   		}).then((res)=>{

	//   			console.log("response-whatsapp",res);
	//   		})
	// 	  //	console.log("response-whatsapp",responsewtp);
			
	// 		} catch (error) { 
	// 		console.log(error);
		
	// 	}


 
	// }



	// const sendwhatsapp(whatsappdata){
	// 	console.log("whatsappdata");
		//		const url = `https://api.interakt.ai/v1/public/message/`;


	// }


	
	return (
		<div className="contact-form">
			<h2>Thank you for your interest in {courseName}. <br/>Please leave your details for a callback.</h2>

				<div>
			   
			      <Alert
			        header={headertext}
			        btnText={btntext}
			        text={alert.text}
			        type={alert.type}
			        show={alert.show}
			        onClosePress={onCloseAlert}
			        pressCloseOnOutsideClick={true}
			        showBorderBottom={true}
			        alertStyles={{}}
			        headerStyles={{}}
			        textStyles={{}}
			        buttonStyles={{}}
			      />

			      
			    </div>

			    {loading && <Preloader />}

			<form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-lg-6 col-md-6">
						<div className="form-group">
							<input
								type="text"
								name="name"
								placeholder="Your Name"
								value={contact.name}
								onChange={handleChange}
								ref={register({ required: true })}
							/>
							<div
								className="invalid-feedback"
								style={{ display: "block" }}
							>
								{errors.name && "Name is required."}
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-md-6">
						<div className="form-group">
							<input
								type="text"
								name="email"
								placeholder="Your email address"
								value={contact.email}
								onChange={handleChange}
								ref={register({
									required: true,
									pattern: /^\S+@\S+$/i,
								})}
							/>
							<div
								className="invalid-feedback"
								style={{ display: "block" }}
							>
								{errors.email && "Email is required."}
							</div>
						</div>
					</div>

					<div className="col-lg-12 col-md-6">
						<div className="form-group">
							<input
								type="text"
								name="mobile"
								placeholder="Your phone number"
								value={contact.mobile}
								onChange={handleChange}
								ref={register({ required: true })}
							/>
							<div
								className="invalid-feedback"
								style={{ display: "block" }}
							>
								{errors.mobile && "Mobile Number is required."}
							</div>
						</div>
					</div>

					 

					<div className="col-lg-12 col-md-12">
						<div className="form-group">
							<textarea
								name="message"
								cols="30"
								rows="5"
								placeholder="Write your message..."
								value={contact.message}
								onChange={handleChange}
								ref={register({ required: true })}
							/>
							<div
								className="invalid-feedback"
								style={{ display: "block" }}
							>
								{errors.message && "Message body is required."}
							</div>
						</div>
					</div>

					<div className="col-lg-12 col-sm-12">
						<button type="submit" className="default-btn2">
							Send Message
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EnquiryForm;
