import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from 'js-cookie';

// Form initial state
const INITIAL_STATE = {
	name: "",
	email: "",
	mobile: "",
	subject: "",
	message: "",
}; 

const ContactForm = () => {
	const [contact, setContact] = useState(INITIAL_STATE);
	const { register, handleSubmit, errors } = useForm();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setContact((prevState) => ({ ...prevState, [name]: value }));
		
	};

	const onSubmit = async (e) => {
		// e.preventDefault();




			



		try {
			const url = `https://winupskill.in/api/api/formitems`;
			const { name, email, mobile, message, text } = contact;

			const params = new URLSearchParams(window.location.search);
			const utm_source = cookie.get('utm_source');
			const utm_source_current = cookie.get('utm_source_current');
			const page = "contact-page";
			const form = "main-contact-form";

		


			const payload = { name, email, mobile, message, page, form, utm_source, utm_source_current};
			console.log("payload",payload,contact);
			await axios.post(url, payload);
			console.log(url);
			setContact(INITIAL_STATE);
		} catch (error) {
			console.log(error);
		}
	}; 

	return (
		<div className="contact-form">
			<h2>Send us a message</h2>
			<p>
				Your email address will not be published. Required fields are
				marked *
			</p>

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
								{errors.mobile && "Mobile is required."}
							</div>
						</div>
					</div>

					<div className="col-lg-12 col-md-12">
						<div className="form-group">
							<input
								type="text"
								name="subject"
								placeholder="Location"
								value={contact.subject}
								onChange={handleChange}
								ref={register({ required: true })}
							/>
							<div
								className="invalid-feedback"
								style={{ display: "block" }}
							>
								{errors.subject && "Subject is required."}
							</div>
						</div>
					</div>

					<div className="col-lg-12 col-md-12">
						<div className="form-group">
							<textarea
								name="message"
								cols="30"
								rows="5"
								placeholder="I'm interested to know more about..."
								value={contact.message}
								onChange={handleChange}
								ref={register({ required: true })}
							/>
							<div
								className="invalid-feedback"
								style={{ display: "block" }}
							>
								{errors.message && "Message is required."}
							</div>
						</div>
					</div>

					<div className="col-lg-12 col-sm-12">
						<button type="submit" className="default-btn">
							Send Message
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
