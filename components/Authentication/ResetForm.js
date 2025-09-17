import React, { useCallback, useState } from 'react';
//import { Alert } from "reactstrap";
import Link from "next/link";
import axios from "axios";
import catchErrors from "../../utils/catchErrors";
import baseUrl from "../../utils/baseUrl";
import { handleLogin } from "../../utils/auth";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { useRouter } from "next/router";
import Router from 'next/router'
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';


//import './app.css'
//import { User } from './User' // component display user (see detail on /example directory)

import SocialButton from "./SocialButton";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

import Alert from 'react-popup-alert';


 
const INITIAL_USER = {
	email: "",
	password: "",
};

const ResetForm = () => {
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
	  	console.log("at close alert", alert.type);
	  	if(alert.type === 'success'){
	  		Router.push('/authentication');
	  	}
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

	const handleSocialLogin = (user) => {
	  console.log("user",user.profile.email);
	  //handlesocialSubmit(user.profile.email);
	  fetchData(user.profile.email);
	};

	const handleSocialLoginFailure = (err) => {
	  console.error("err",err);
	  alert(err);
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

  const onLoginStart = useCallback(() => {
    alert('login start')
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    alert('logout success') 
  }, [])



const forgotpwd = async (e) => {
	e.preventDefault();
	console.log("e",user.email);
	try {
			setLoading(true);
			setError("");
			
			const url = `https://winupskill.in/api/api/forgotpwd`;
			//const url = `${baseUrl}/api/v1/auth/signin`;
			const payload = {"email":user.email};
			const response = await axios.post(url, payload);
				console.log("response",response.data.data);


				setHeadertext("Success!"),
		   		setBtntext("Close"),
		        onShowAlert("success",response.data.data)



				//Router.push('/authentication');
			
		} catch (error) {
			console.log("error-131",error),
			setHeadertext("Error!"),
		    setBtntext("Close"),
		    onShowAlert("error",error.response.data.error)

			


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





	return (

				


		<div className="login-form">
			<h3>Enter your registered email id and submit to reset your password!</h3>

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

			

			<form onSubmit={forgotpwd}>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="Email"
						name="email"
						type="email"
						value={user.email}
						onChange={handleChange}
					/>
				</div>

				
				

				<button type="submit">
					Submit
					{loading ? <LoadingSpinner /> : ""}
				</button>


			</form>

		

				    


				  
				   
				
					

				




		</div>
	);
};

export default ResetForm;
