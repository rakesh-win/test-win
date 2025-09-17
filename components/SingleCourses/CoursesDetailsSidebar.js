import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ModalVideo = dynamic(import("react-modal-video"));
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useRouter } from "next/router";

import cookie from 'js-cookie';
import Router from 'next/router';

import Alert from 'react-popup-alert';
import { useSelector, useDispatch } from "react-redux";

import Preloader from '../../components/_App/Preloader';

const CoursesDetailsSidebar = ({
	id,
	name,
	image,  
	badgeimage,
	description,
	price,
	overseasprice,
	displayprice,
	displayoverseasprice,
	duration,
	previewurl, 
	flag,
	type 
 
	
}) => {

	const dispatch = useDispatch();
	const [country, setCountry] = useState('Loading');

	var loc;

	setTimeout(() => {  
		var loc = localStorage.getItem('country');
	    setCountry(loc);
	}, 1000);

	function numberWithCommas(x) {
		if(x){
		  return Number(x).toLocaleString();
		  
		}
		
	}

	const sendtoEnquiry = async (courseId, name) => {
		var uuid3 = localStorage.getItem('userid');
		// if(uuid3){
		// 	 const userdetails = getUser();
			
		// }
		// else{
		// 	cookie.set('enquirecourseId', courseId);
		// 	cookie.set('enquirecourseName', name);
		// 	Router.push('/enquiry');
		// }
		cookie.set('enquirecourseId', courseId);
			cookie.set('enquirecourseName', name);
			Router.push('/enquiry');
	}

	const getUser = async() => { 
		const payload = {
        	headers: {Authorization: 'Bearer '+token}
    	}
		   const url = `https://winupskill.in/api/api/users`
           if(token){
            var response = await axios.get(url, payload).then(
             result => {
             	postquery(result.data.name,result.data.email,result.data.mobile)
              
             })
            }
    } 

    


 
	function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
	}


	
	const addToCart = (courseId, name, image, price, priceos, duration ) => {
		let courseObj = {};
		courseObj["id"] = courseId;
		courseObj["name"] = name;
		courseObj["image"] = image;
		courseObj["price"] = price;
		courseObj["priceos"] = overseasprice;
		courseObj["duration"] = duration;
		courseObj["quantity"] = 1;
		dispatch({
			type: "ADD_TO_CART",
			data: courseObj,
		});
		postCartapi(courseId, name, image, price, priceos, duration);
		
	};



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



	const [token, setToken] = React.useState();

    useEffect(() => {
     setToken(localStorage.getItem("token"));
    },[]);

const postquery = async(name2,mail2,mob2) => { 
    	try {
			setLoading(true);
			const url = `https://winupskill.in/api/api/formitems`;
			const payload = { "name":name2, "email":mail2, "mobile":mob2, "page":name, "form":"Needinfo","message":"Logged-in user"};
			const response = await axios.post(url, payload);

			
			setHeadertext("Thank You!"),
		   	setBtntext("Close"),
		    onShowAlert("success","We have received your call back request. Our team will get in touch with you based on the contact information available in your profile.")

			
			//Router.push('/courses');
			
		} catch (error) { 
			console.log(error);
		
		}
		finally {
			setLoading(false);
		}

    }

	const sendtocoursepage = async () =>{

		Router.push(`/my-courses/view/${id}`);
	}


	const postCartapi = async (courseId, name, image, price, priceos, duration) => {
		var tempuid = localStorage.getItem('tempuserid');
		if(tempuid){
			
		}
		else{
			
			tempuid = (makeid(12));
			localStorage.setItem('tempuserid',tempuid);
		}

		var uuid2 = localStorage.getItem('userid');
		const tempcartdata = new FormData();
		tempcartdata.append('course_id', courseId);
        tempcartdata.append('item_name', name);
        tempcartdata.append('item_qty', "1");
        tempcartdata.append('price', price);
        tempcartdata.append('tempuserid', tempuid);
        tempcartdata.append('image', image);
        tempcartdata.append('priceos', priceos);
        if(uuid2){
		tempcartdata.append('user_id', uuid2);	
		}

   
		const response = axios.post('https://winupskill.in/api/api/cartitems', tempcartdata).then(
            result => {
            	if (result.status == 200 || result.status == 201){
                  //  Router.push('/user/my-profile');
                  Router.push('/cart');
                }
        })

	}


	
	

	return (
		<>

			
			

			<div className="courses-details-info">
				<div className="image">
					<img src={badgeimage} alt={name} />

					
				</div>

				<ul className="info">
					
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								Duration
							</span>
							{duration}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								Access
							</span>
							Lifetime
						</div>
					</li>

					<li className="price" style={{display: (type === 'quiz' || type === 'crs-free')? 'block' : 'none'}}>
						<div className="d-flex justify-content-between align-items-center">
							<span>Price</span>
							<span style={{display: (country == 'India')? 'flex' : 'none'}}>INR <span className="strikeprice">{displayprice}</span>{numberWithCommas(price)}</span>
							<span style={{display: (country !== 'India')? 'flex' : 'none'}}>USD <span className="strikeprice">{displayoverseasprice}</span>{numberWithCommas(overseasprice)}</span>
						</div>
					</li>
					
				</ul>

				<div className="btn-box"  style={{display: (type === 'quiz' || type === 'crs-free')? 'block' : 'none'}}>
					
						<>
							<center>
								<button
								    
									className="default-btn"
									onClick={() => 
										addToCart(
											id,
											name,
											image,
											price,
											overseasprice,
											duration
											
										)
									}
								>
									 Add to cart
							
								</button>
							</center>
						</>
					
				</div>

				<div className="courses-share"  style={{display: (type === 'quiz')? 'block' : 'none'}}>

				<button
									className="showbtnastext"
									onClick={() => 
										sendtoEnquiry(
											id,
											name
											
										)
									}
								>
									 Need more Info{" "}
									<span></span>
								</button>
					
				</div>
				

				
			</div>

			

					







				



		</>
	);
};

export default CoursesDetailsSidebar;

/*









					<span className="emispan">* You can also pay via Flexible EMIs over 3 - 12 months.</span>
					<br />
					<span className="emispan2">Select Card-EMI at Checkout.</span>












If you want to change the video need to update videoID 
			{display ? (
				<ModalVideo
					channel="youtube"
					isOpen={!isOpen}
					videoId={previewurl}
					onClose={() => setIsOpen(!isOpen)}
				/>
			) : (
				""
			)} 

*/
		
		/// <div
					// 	onClick={(e) => {
					// 		e.preventDefault();
					// 		openModal();
					// 	}}
					// 	className="link-btn popup-youtube"
					// ></div>

					// <div className="content">
					// 	<i className="flaticon-play"></i>
					// 	<span>Course Preview</span>
					// </div>	
