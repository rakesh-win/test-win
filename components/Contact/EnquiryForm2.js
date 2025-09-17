import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { parseCookies } from 'nookies';

import Router from 'next/router'
import cookie from 'js-cookie';
import Alert from 'react-popup-alert';


import Preloader from '../../components/_App/Preloader'

import TagManager from 'react-gtm-module';

// Form initial state
const INITIAL_STATE = {
	name: "",
	email: "",
	mobile: "", 
	message: "NA",
};  

const EnquiryForm2 = () => {
	const [contact, setContact] = useState(INITIAL_STATE);
	const { register, handleSubmit, errors } = useForm();
	const [courseId, setcourseID] = React.useState();
    const [courseName, setcourseName] = React.useState();
    const [page, setPage] = React.useState();
    const [form, setForm] = React.useState();



    const [message, setMessage] = React.useState();

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
    setMessage(enquirecourseId);
    const { enquirecourseName } = parseCookies(ctx);
    setcourseID(enquirecourseId);
    setForm(enquirecourseId);
    setcourseName(enquirecourseName);
    setPage(enquirecourseName);

    }

	const onSubmit = async (e) => {
		// e.preventDefault();
		try {
			setLoading(true);
			console.log("courseId",courseId);

			const url = `https://winupskill.in/api/api/formitems`;
			const { name, email, mobile, message } = contact;

			const utm_source = cookie.get('utm_source');
			const utm_source_current = cookie.get('utm_source_current');
			
			const landingurl = cookie.get('landingurl');
			
			const payload = { name, email, mobile, message, page, form, utm_source, utm_source_current,landingurl};
			const response = await axios.post(url, payload);

			// console.log(url);

			const tagManagerArgs = {
			    gtmId: 'GTM-K9NXHCN',
			    events: {
			        "sendUserInfo": payload,
			        "name": name,
			        "utm_source":utm_source, 
			        "utm_source_current":utm_source_current,
			        "gtm.element": name,
			        "Form Element": name,
			        "Original Landing Page URL": landingurl

			    }
			}
			 
			TagManager.initialize(tagManagerArgs)

			setContact(INITIAL_STATE);
		//	sendwhatsapp(payload);

			setHeadertext("Success!"),
		   	setBtntext("Close"),
		    onShowAlert("success","We have received your details, will be in touch shortly to provide details of CF Club Membership")

			
			//Router.push('/courses');
			
		} catch (error) { 
			console.log(error);
		
		}
		finally {
			setLoading(false);
		}
	};

	

	
	return (
		<div className="contact-form2">
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
 
					 

					

					<div className="col-lg-12 col-sm-12">
						<button type="submit" className="default-btn2">
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EnquiryForm2;
