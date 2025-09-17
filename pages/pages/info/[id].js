import React, { useState, useEffect } from "react";
import PageBanner from "@/components/SingleCourses/PageBanner";
import CoursesDetailsSidebar from "@/components/SingleCourses/CoursesDetailsSidebar";
import YouMightLikeTheCourses from "@/components/Courses/YouMightLikeTheCourses";
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from "react-tabs";
resetIdCounter();
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import CoursesCurriculum from "@/components/Courses/CoursesCurriculum";
import {useRouter} from "next/router";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Partner from '@/components/Common/Partner';
import cookie from 'js-cookie';
import { parseCookies } from 'nookies';
import { useSelector, useDispatch } from "react-redux";
import Router from 'next/router';
import Alert from 'react-popup-alert';
import Preloader from '@/components/_App/Preloader';
import TagManager from 'react-gtm-module';
import { useRef } from 'react';
import { useForm } from "react-hook-form";

const INITIAL_STATE = {
    name: "",
    email: "",
    mobile: ""
}; 
 
const Details = ({ course, user }) => {
	
	const [oneCourse, setoneCourse] = React.useState([]);
    const [subjects, setSubjects] = React.useState([]);
    const [childsubjects, setchildSubjects] = React.useState([]);
    const [allcourses, setAllcourses] = React.useState([]);
    const [allenroll, setAllenroll] = React.useState([]);
    const [flaga, setFlaga] = useState(0);
    const [crsprice, setCrsprice] = React.useState([]);
	const [contact, setContact] = useState(INITIAL_STATE);
    
	const [title, setTitle] = useState("win | win upskilling universe");
	const targetDivRef = useRef(null);

	const [bgcolor, setBgcolor] = React.useState('');
	

	const [display, setDisplay] = useState(false);
	const [alreadyBuy, setAlreadyBuy] = useState(false);	
	const [country, setCountry] = useState(0);
	const [loading, setLoading] = React.useState(false);
	const [isquiz, setIsquiz] = React.useState(false);
	const dispatch = useDispatch();

	const [token, setToken] = React.useState();

	const { register, handleSubmit, errors } = useForm();


	const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });
    
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prevState) => ({ ...prevState, [name]: value }));
        
    };
	
	
	const cartItems = useSelector((state) => state.cart.cartItems);

	  useEffect(() => {
	    document.title = title;
	  }, [title]);

	
    const router = useRouter();
    const {id} = router.query;

	 useEffect(() => {
     getCourses();
     getSubjects();
     getChildcourses();
     getallCourses();
     checkpurchase();
     getpricesforthis();
     },[id]);


 //     useEffect(() => {
	// 	checkpurchase();
	// }, []);

	useEffect(() => {
		setDisplay(true);
		setToken(localStorage.getItem("token"));
		//checkpurchase();

	}, []);

  

 
    const getCourses = async() => {
    	   const url = `https://winupskill.in/api/api/courses/${id}`
            var response = await axios.get(url).then(
             result => {
                setoneCourse(result.data.data),
                setTitle(result.data.data.name),
                setIsquiz(result.data.data.type),
                setBgcolor(result.data.data.previewurl)

 

             })
    }

    const getallCourses = async() => {
    	   const url = `https://winupskill.in/api/api/courses`
            var response = await axios.get(url).then(
             result0 => {
                setAllcourses(result0.data.data)
             })
    }

    const getSubjects = async() => {
    	   const url = `https://winupskill.in/api/api/subjects?course_id=${id}`
            var response = await axios.get(url).then(
             result => {
                setSubjects(result.data.data)
             })
    }

    const getChildcourses = async() => {
    	   const url = `https://winupskill.in/api/api/childcourses?parentcid=${id}`
            var response = await axios.get(url).then(
             result2 => {
                setchildSubjects(result2.data.data)
             })
    }

    const getpricesforthis = async() => {
    	   const url = `https://winupskill.in/api/api/courseprices?courseid=${id}`
            var response = await axios.get(url).then(
             result4 => {
                setCrsprice(result4.data.data[0])
             })
    }



    const checkpurchase = async () => {
    	setFlaga(0);
		var uuid = localStorage.getItem('userid');
		const url = `https://winupskill.in/api/api/enrolled?user_id=${uuid}&&course_id=${id}`;
		    const response = await axios.get(url);
		    setAllenroll(response.data.data);
		    
		    (response.data.data).forEach(el => {
		    	if((parseInt(el.course_id) == id)&&(el.user_id == uuid)){
		    		setFlaga(1);
		    			localStorage.setItem('flag',"1");
		    	} 	
		    	else{
		    	}
		    })
	}

	function numberWithCommas(x) {
		if(x){
		  return Number(x).toLocaleString();
		  
		}
		
	}

	const handlerefButtonClick = () => {
		console.log("clicked handlerefButtonClick",targetDivRef.current);
	    if (targetDivRef.current) {
	    	console.log("in if 173");
	      targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
	    }
 	};


 	const onSubmit = async (e) => {
        setLoading(true);
        //e.preventDefault();

        try {
            const url = `https://winupskill.in/api/api/formitems`;
            const { name, email, mobile} = contact;

            const params = new URLSearchParams(window.location.search);
            const utm_source = cookie.get('utm_source');
            const utm_source_current = cookie.get('utm_source_current');
            const page = oneCourse.titlename;
            const form = "pages-info-inline-right";
                        if(!utm_source){
                            utm_source = "na";
                        }
                        if(!utm_source_current){
                            utm_source_current = "na";
                        }

        
            const message = "NA";

            const payload = { name, email, mobile, message, page, form, utm_source, utm_source_current};
            await axios.post(url, payload);
            setLoading(false);
            setHeadertext("Success!"),
            setBtntext("Close"),
            onShowAlert("success","We have received your details, will be in touch shortly.")






            setContact(INITIAL_STATE);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }; 


	const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    };

	 const handleSubmit2 = (e) => {
            e.preventDefault();

            // Validation
            let errors = {};
            if (!formData.name) {
              errors.name = 'Name is required';
            }
            if (!formData.email) {
              errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
              errors.email = 'Invalid email format';
            }
            if (!formData.phoneNumber) {
              errors.phoneNumber = 'Phone number is required';
            }

            if (Object.keys(errors).length > 0) {
              setFormErrors(errors);
            } else {
              // Submit form data
                    try {
                    	setLoading(true);
        
                        const url = `https://winupskill.in/api/api/formitems`;
                        const { name, email, mobile, message, text } = contact;

                        const params = new URLSearchParams(window.location.search);
                        const utm_source = cookie.get('utm_source');
                        const utm_source_current = cookie.get('utm_source_current');
                        const page = oneCourse.titlename;
                        const form = "Info-page-form";
                        if(!utm_source){
                            utm_source = "na";
                        }
                        if(!utm_source_current){
                            utm_source_current = "na";
                        }

                     
 

                        const payload = { 
                                "name":formData.name, 
                                "email":formData.email,
                                "mobile":formData.phoneNumber, 
                                "message":"NA", 
                                page, 
                                form, 
                                utm_source, 
                                utm_source_current
                            };
                        axios.post(url, payload);
                        setLoading(false);
                        setHeadertext("Success!"),
                        setBtntext("Close"),
                        onShowAlert("success","We have received your details, will be in touch shortly.")

                        setFormErrors({
                            name: '',
                            email: '',
                            phoneNumber: ''
                          });
                          setFormData({
                            name: '',
                            email: '',
                            phoneNumber: ''
                          });
                    } catch (error) {
                        setLoading(false);
                        console.log(error);
                    }
              
            }
    };



	const postquery = async(name2,mail2,mob2,courseId, name, ctype) => { 
    	try {
			setLoading(true);
			const url = `https://winupskill.in/api/api/formitems`;
			const payload = { "name":name2, "email":mail2, "mobile":mob2, "page":name, "form":"Needinfo","message":"Logged-in user"};
			const response = await axios.post(url, payload);
			const params = new URLSearchParams(window.location.search);
			const utm_source = cookie.get('utm_source');
			const utm_source_current = cookie.get('utm_source_current');
			const page = name;
			const form = ctype;

			
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

	const addToCart = (courseId, name, image, price, priceos, duration, mode ) => {

		let courseObj = {};
		var tt = ": ";
		courseObj["id"] = courseId;
		courseObj["name"] = `${mode}${tt}${name}`;
		courseObj["image"] = image;
		courseObj["price"] = price;
		courseObj["priceos"] = priceos;
		courseObj["duration"] = duration;
		courseObj["quantity"] = 1;
		dispatch({
			type: "ADD_TO_CART",
			data: courseObj,
		});
		var tmpnm = `${mode}${tt}${name}`;
		postCartapi(courseId, tmpnm, image, price, priceos, duration, mode);
		
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
	    setAlert({
	      type: type,
	      text: text,
	      show: true
	    })
	  }


	
                      




	

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



	const [enrolled, setEnrolled] = React.useState(0);
	const [isOpen, setIsOpen] = React.useState(true);
	const openModal = () => {
		setIsOpen(!isOpen);
	};

	
 
	const checkBoughtAlready = () => {
		return (
			enroled_courses.filter(function (val) {
				return val.courseId === id;
			}).length > 0
		);
	};

	const sendtoEnquiry = async (courseId, name, ctype) => {


		const params = new URLSearchParams(window.location.search);
			const utm_source = cookie.get('utm_source');
			const utm_source_current = cookie.get('utm_source_current');
			

		const tagManagerArgs = {
			    gtmId: 'GTM-K9NXHCN',
			    events: {
			        "utm_source":utm_source, 
			        "utm_source_current":utm_source_current,
			        "gtm.element": name,
			        "Form Element": name,
			        "Page URL": params,
			        "courseId": courseId,
			        "name": name,
			        "ctype": ctype


			    }
			}
			 
			TagManager.initialize(tagManagerArgs)



		var uuid3 = localStorage.getItem('userid');
		if(uuid3){
			 const userdetails = getUser(courseId, name, ctype);
			
		}
		else{
			cookie.set('enquirecourseId', courseId);
			cookie.set('enquirecourseName', name);
			Router.push('/enquiry');
		}
	}
 
	const getUser = async(courseId, name, ctype) => { 
		const payload = {
        	headers: {Authorization: 'Bearer '+token}
    	}
		   const url = `https://winupskill.in/api/api/users`;
           if(token){
            var response = await axios.get(url, payload).then(
             result => {
             	postquery(result.data.name,result.data.email,result.data.mobile,courseId, name, ctype)
               
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


	const postCartapi = async (courseId, name, image, price, priceos, duration, type) => {
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
        tempcartdata.append('priceos', priceos);
        tempcartdata.append('tempuserid', tempuid);
        tempcartdata.append('image', image);
        tempcartdata.append('type', type);



        tempcartdata.append('utm_source',cookie.get('utm_source'));
		tempcartdata.append('utm_source_current',cookie.get('utm_source_current'));
			

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

    console.log("bgcolor",bgcolor)
 
	return (

		

		<React.Fragment>

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

			      {loading && <Preloader />}


				<div data-elementor-type="wp-page" data-elementor-id="12694" className="elementor elementor-12694">
									<section className="elementor-section elementor-top-section elementor-element elementor-element-362f6efe elementor-section-height-min-height elementor-section-boxed elementor-section-height-default elementor-section-items-middle" data-id="362f6efe" data-element_type="section">
										<div className="elementor-background-overlay"></div>
											<div className="elementor-container elementor-column-gap-default">
												<div className="elementor-row">
												<div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-44a2d15b" data-id="44a2d15b" data-element_type="column" style={{width:"75% !important"}}>
												<div className="elementor-column-wrap elementor-element-populated" style={{margin:"25px 0 0 0"}}>
												<div className="elementor-widget-wrap">
												<div className="elementor-element elementor-element-66bcef01 elementor-widget elementor-widget-heading" data-id="66bcef01" data-element_type="widget" data-widget_type="heading.default">
													<div className="elementor-widget-container">
												<h3 style={{fontSize:"25px"}} className="elementor-heading-title elementor-size-default">{oneCourse.titlecat}</h3>
												</div>
												</div>
												<div className="elementor-element elementor-element-74992cde elementor-widget elementor-widget-heading" data-id="74992cde" data-element_type="widget" data-widget_type="heading.default">
													<div className="elementor-widget-container">
														<h1 className="elementor-heading-title elementor-size-default">{oneCourse.titlename}</h1>
														</div>
														</div>
														<div className="elementor-element elementor-element-7a67de99 elementor-widget elementor-widget-text-editor" data-id="7a67de99" data-element_type="widget" data-widget_type="text-editor.default">
															<div className="elementor-widget-container">
																<div className="elementor-text-editor elementor-clearfix">
																<p dangerouslySetInnerHTML={{__html: oneCourse.titledesc}} />
																</div>
															</div>
																</div>
															</div></div></div>


															<div style={{margin: "75px 0 0 0"}} className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-2af7f22a" style={{width:"25% !important"}} data-id="2af7f22a" data-element_type="column"><div className="elementor-column-wrap elementor-element-populated"><div className="elementor-widget-wrap"><div className="elementor-element elementor-element-dabebae elementor-widget elementor-widget-image elementor-motion-effects-parent" data-id="dabebae" data-element_type="widget">


																<div className="elementor-motion-effects-element">
																	<div className="elementor-image"> 
																		
																					<div className="bannerformright2">
													                                     <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
													                                            <div className="row">
													                                                <div className="col-lg-12 col-md-12">
													                                                    <div className="form-group" style={{marginBottom: "30px"}}>
													                                                        <input
													                                                            type="text"
													                                                            name="name"
													                                                            placeholder="Your Name"
													                                                            className="infoformstyle"
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

													                                                <div className="col-lg-12 col-md-12">
													                                                    <div className="form-group" style={{marginBottom: "30px"}}>
													                                                        <input
													                                                            type="text"
													                                                            name="email"
													                                                            className="infoformstyle"
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

													                                                <div className="col-lg-12 col-md-12">
													                                                    <div className="form-group" style={{marginBottom: "30px"}}>
													                                                        <input
													                                                            type="text"
													                                                            name="mobile"
													                                                            className="infoformstyle"
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

													                                               

													                                                <div className="col-lg-12 col-sm-12">
													                                                    <button type="submit" className="default-btn3">
													                                                        Know More
													                                                    </button>
													                                                </div>
													                                            </div>
													                                        </form>

													                        </div>



																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</section>
				</div>




			<div className="courses-details-area">
				

				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-12">
							<div className="courses-details-desc">
								<Tabs>
									<TabList>
										<Tab>Overview</Tab>
										<Tab style={{display: subjects.length > 0 ? '': 'none'}}>Curriculum</Tab>
										<Tab>Target Audience</Tab>
										<Tab>Exam Details</Tab>

									</TabList>
  
									<TabPanel>
										<div className="courses-overview">
											<h3>Course Description</h3>
											<p dangerouslySetInnerHTML={{__html: oneCourse.description}} />

										</div>
									</TabPanel>
									
									<TabPanel>
										<CoursesCurriculum
											videos={subjects}
											flag = {flaga}
										/>
									</TabPanel> 
									<TabPanel>
										<p dangerouslySetInnerHTML={{__html: oneCourse.audience}} />
									</TabPanel>
									<TabPanel>
										<p dangerouslySetInnerHTML={{__html: oneCourse.examdetails}} />
									</TabPanel>
									
								</Tabs>
							</div>
						</div>

						<div className="col-lg-4 col-md-12">
							<CoursesDetailsSidebar
								{...oneCourse}
								loggedInUser={user}
								flag={flaga}
							/>
						</div>
					</div>
				</div>
			</div>


				<div className="container" style={{display: (childsubjects.length > 0)? 'block' : 'none'}}>
					<div className="row align-items-center" style={{paddingTop:"40px"}}>
					  <h3>Associated courses in this career path:</h3>

					  		

					  			{(childsubjects.length > 1)  && <p style={{fontWeight:'bold'}}>{childsubjects[0].descr}</p>}
					  
					</div>
 

				 

				<div style={{"marginBottom":"100px","marginTop": "30px"}}>
                   {childsubjects.map((chs, index) => (
                      <div className='allqss' key={index}>
                        
                                  {allcourses.filter(item => item.id == chs.childcid).map((crss, index2) => (
                                    <div className="careerpathcourses"
                                    key={index2}> 
                                    <div className="childcourseimg col-lg-2 col-sm-4">
                                    	<img src={crss.badgeimage} />
                                    </div>

                                    <div className="childdiv col-lg-10 col-sm-8"> 
	                                    <div className="childcourse">
		                                    <ul className="childcourseul">
		                                    <li className="boldtext">{crss.name}</li>
		                                    <li className="desctextpath" dangerouslySetInnerHTML={{__html: crss.titledesc}} />
		                                   	</ul>
	                                    </div>
	                                    <div className="childcoursebtn">
	                                   		<button 
	                                   			onClick={() => router.push(`/info/${crss.id}`)}
												className="default-btn"
												style={{"paddingLeft": "20px"}}
	                                   		>
												Know More
											</button>
										</div>
									</div>
                                   
                                    </div>
                                  ))}
                           
                                 
                      </div>
                    ))}
                </div>


				</div>

				<div className="container" style={{marginBottom:"20px", marginTop:"30px", paddingLeft: "40px"}}
				style={{display: (isquiz === 'crs')? 'block' : 'none'}}
				>

				 <h2>
                                Learning Options: 
                </h2>

                
  

                <div className="row">

                		<div className="innercol" style={{marginBottom:"30px"}}>

                            <div className="rowpricecol">
                                  <span className="pricelinebig">Self-Paced</span>
                                 	<span className="priceline">Special Discount Offers Available</span>
                                  	<span className="pricelinebig">Contact for Pricing</span>

                                    <span className="priceline seprt"></span>
                                    <span className="priceline">Lifetime access to eLearning content curated by industry experts</span>
                                    <span className="priceline">Test paper for self-evaluation</span>
                                    
                                    {(oneCourse.examvoucher === "included")  ? (
                                    <span className="priceline">Exam voucher included</span>
                                    ):("")}

                                    <div className="courses-details-info" style={{border:"none", marginTop:"0px", marginLeft:"0px"}}>
                                   	  <span className="emispan">* You can also pay via Flexible EMIs over 3 - 12 months.
										Select Card-EMI at Checkout.</span>
                                    
                                    </div>
                            </div> 

                             <div className="rowpricecol">
                                <span className="pricelinebig">Live Online Classroom</span>
                                <span className="priceline">Special Discount Offers Available</span>
                                <span className="pricelinebig">Contact for Pricing</span>
                                <span className="priceline seprt"></span> 
								<span className="priceline">All benefits of Self-Paced</span>
								<span className="priceline">+</span>
								<span className="priceline">Live virtual classroom training by highly experienced instructors and practitioners</span>



                                <div className="courses-details-info" style={{border:"none", marginTop:"0px", marginLeft:"0px"}}>
                                <span className="emispan">* You can also pay via Flexible EMIs over 3 - 12 months.
								Select Card-EMI at Checkout.</span>
								
                                    	
	                                   
                                </div>
                            </div>

                             <div className="rowpricecol">

                                <span className="pricelinebig">Corporate Batch</span>
                                <span className="priceline">Customized to your organization's requirements</span>
                                <span className="pricelinebig">Contact for Pricing</span>
                                <span style={{marginTop:"38px"}} className="priceline seprt"></span>
                                <span className="priceline">Tailored to your requirement. Do get in touch with us to share your requirement & schedule a call to discuss this.</span>

                                

                     
                                

                            </div>
                            </div>
                        </div>
                        </div>

<div className="container">
<h2>Conatct Now to avail great offers: </h2>
</div>

                        <div ref={targetDivRef} className="singlelinecontainer onelineform"
                        	style={{paddingTop: "0px"}}
                        >
			                 <form onSubmit={handleSubmit2} className="singlelineform">
			                  <div className="inputsinglediv">
			                    <input
			                      type="text"
			                      name="name"
			                      value={formData.name}
			                      onChange={handleChange2}
			                      placeholder="Your Name"
			                      className="inputsingle"
			                    />
			                    {formErrors.name && <span>{formErrors.name}</span>}
			                  </div>
			                  <div className="inputsinglediv">
			                    <input
			                      type="email"
			                      name="email"
			                      value={formData.email}
			                      onChange={handleChange2}
			                      placeholder="Your email address"
			                      className="inputsingle"
			                    />
			                    {formErrors.email && <span>{formErrors.email}</span>}
			                  </div>
			                  <div className="inputsinglediv">
			                    <input
			                      type="tel"
			                      name="phoneNumber"
			                      value={formData.phoneNumber}
			                      onChange={handleChange2}
			                      placeholder="Your phone number"
			                      className="inputsingle"
			                    />
			                    {formErrors.phoneNumber && <span>{formErrors.phoneNumber}</span>}
			                  </div>
			                  <div className="inputsingledivbtn">
			                    <button type="submit" className="default-btn btnsingle">
			                      Submit
			                    </button>
			                  </div>
			                </form>
			            </div>
			
			<Partner />


 
			<div className="about-area-two pb-100" style={{"backgroundColor":"#fff"}}>
				<div className="container">
					<div className="row align-items-center">

						<div className="col-lg-5 col-md-12">
							<div className="about-video-box2">
								<div className="image">
									<img
										src="/images/cf-about-Pic.png"
										alt="image"
										style={{"width": "70%"}}
									/>
								</div>

								
						
 
								
							</div>
						</div>


						<div className="col-lg-7 col-md-12">
							<div className="about-content-box">
								<span className="sub-title" style={{"color":"#000"}}>
									Who are we?
								</span>
								<h2 style={{"color":"#D0140F"}}>
									WE ARE WIN UPSKILL
								</h2>
								<p>
									We offer IT management training & consulting services. We are a startup of 7 years, founded by a team of experts with an average of 18 years of expertise.
								</p>
								<p>
								We have helped over 15K IT professionals to shape up their career through our certification courses.
								</p>
								<p>
								We specialize in IT Service Management, IT Governance, Cyber Security, Data Privacy, Project Management, Quality Management & Emerging Technology related trainings. We help you achieve certifications like ITIL, ISO 27001 Lead Auditor, ISO 27701 Auditor, COBIT Assessor & Practitioner, SIAM Professional, Artificial Intelligence, Blockchain, Cloud Computing etc.
								</p>
								<p>
								Our trainings are accredited by Global leaders like Axelos, Peoplecert, EXIN, PECB, Exemplar Global etc
								</p>
								<p>
								<strong>Our Goal is to provide you with the skills & certifications</strong> to master the critical tactics and strategies that will drive your career growth.
								</p>
							
								
							</div>
						</div>

						
					</div>
				</div>

				
			</div>





	



			




			




		</React.Fragment>
	);
};



export default Details;
