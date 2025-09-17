import React, { useCallback, useState } from 'react';
//import { Alert } from "reactstrap";
import Link from "next/link";
import axios from "axios";
import catchErrors from "../../utils/catchErrors";
import baseUrl from "../../utils/baseUrl";
import { handleLogin } from "../../utils/auth";
import LoadingSpinner from "@/utils/LoadingSpinner";
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import Alert from 'react-popup-alert';

//import './app.css'
//import { User } from './User' // component display user (see detail on /example directory)

import SocialButton from "./SocialButton";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";



 
const INITIAL_USER = {
	email: "",
	password: "",
};

const LoginForm = () => {
	const [user, setUser] = React.useState(INITIAL_USER);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

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
	  	console.log("onShowAlert-52",type);
	    setAlert({
	      type: type,
	      text: text,
	      show: true
	    })
	  }

	const handleSocialLogin = (user) => {
	  console.log("user",user.profile.email);
	  //handlesocialSubmit(user.profile.email);
	  fetchData(user.profile.email);
	};

	const handleSocialLoginFailure = (err) => {
	  console.error("err",err);
	  setHeadertext("Error!"),
	  setBtntext("Close"),
	  onShowAlert("error","Your login was not successful, please try again!")
	  //alert(err);
	};

	React.useEffect(() => {
		const isUser = Object.values(user).every((el) => Boolean(el));
		isUser ? setDisabled(false) : setDisabled(true);
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	};

	// const showToastMessage = () => {
	//     toast.success('Login was successful!', {

 //            position: toast.POSITION.BOTTOM_CENTER
 //        });
 //    }
 const [provider, setProvider] = useState('')
 const [profile, setProfile] = useState(null)

const fetchData = async (e) => {
	try {
			setLoading(true);
			const url = `https://winupskill.in/api/api/socialmail`;
			const payload = {"email":e};
			const response = await axios.post(url, payload);
			console.log("response-108",response);
			setTimeout(function() {
				handleLogin(response.data);
			}, 1000);
			
		} catch (error) {
			console.log("error",error);

			setHeadertext("Error!"),
		    setBtntext("Close"),
		    onShowAlert("error",`Your login was not successful, please try again! ${error.response.data.error}`)

		  


		//	setError(error.response.data.error);



			//catchErrors(error);
		} finally {
			//console.log("in finally");
			setLoading(false);
		}
}


  /*	function handlesocialSubmit = async (e) => {
  		console.log("e",e);
		e.preventDefault();
		try {
			setLoading(true);
			setError("");
			
			const url = `https://winupskill.in/api/api/socialmail`;
			//const url = `${baseUrl}/api/v1/auth/signin`;
			const payload = {"email":e};
			const response = await axios.post(url, payload);
			setTimeout(function() {
				handleLogin(response.data);
			}, 1000);
			
		} catch (error) {
			setError(error.response.data.error);

			//catchErrors(error);
		} finally {
			//console.log("in finally");
			setLoading(false);
		}
	};

	*/






   

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			setError("");
			
			const url = `https://winupskill.in/api/api/login`;
			//const url = `${baseUrl}/api/v1/auth/signin`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
			setTimeout(function() {
				handleLogin(response.data);
			}, 1000);
			  
		} catch (error) {
			setHeadertext("Error!"),
		    setBtntext("Close"),
		    onShowAlert("error",`${error.response.data.error}.! Try again with correct email id or password`)
		  


			} finally {
			//console.log("in finally");
			setLoading(false);
		}
	};
	return (

				


		<div className="login-form">
			<h2>Login</h2>

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

			

			
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Email</label>
					<input
						className="form-control"
						placeholder="Email"
						name="email"
						type="email"
						value={user.email}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Password</label>
					<input
						className="form-control"
						placeholder="Password"
						name="password"
						type="password"
						value={user.password}
						onChange={handleChange}
					/>
				</div>

				<div className="row align-items-center">
					<div className="col-lg-6 col-md-6 col-sm-6 remember-me-wrap">
						<p>
							<input type="checkbox" id="test2" />
							<label htmlFor="test2">Remember me</label>
						</p>
					</div>

					<div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap">
						<Link href="/reset-password">
							<a className="lost-your-password">
								Lost your password?
							</a>
						</Link>
					</div>
				</div>

				<button type="submit" disabled={disabled}>
					Log In
					{loading ? <LoadingSpinner /> : ""}
				</button>


			</form>

			 <div className="form-group2" style={{margin:'7px 0px 0px 0px'}}>

				    <SocialButton
			          provider='google'
			          appId='860806665116-3js46csj9ufq20m6qi3m879vjt6ueqjm.apps.googleusercontent.com'
			          onLoginSuccess={handleSocialLogin}
				      onLoginFailure={handleSocialLoginFailure}
			         
			        >
			          <GoogleLoginButton />
			        </SocialButton>
			        </div>


			<div className="form-group2">
			<SocialButton
				      provider="facebook"
				      appId="415481132997848"
				      onLoginSuccess={handleSocialLogin}
				      onLoginFailure={handleSocialLoginFailure}
				    >
				      <FacebookLoginButton />
				    </SocialButton>
				    </div>


				    


				  
				   
				
					

				




		</div>
	);
};

export default LoginForm;
