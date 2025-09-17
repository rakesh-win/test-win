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
import Preloader from '../../components/_App/Preloader';
import TagManager from 'react-gtm-module';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { styled } from '@mui/material/styles';

import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';



	import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
	import MuiAccordion from '@mui/material/Accordion';
	import MuiAccordionSummary from '@mui/material/AccordionSummary';
	import MuiAccordionDetails from '@mui/material/AccordionDetails';
	import Typography from '@mui/material/Typography';

	const Accordion = styled((props) => (
	  <MuiAccordion disableGutters elevation={0} square {...props} />
	))(({ theme }) => ({
	  border: `1px solid ${theme.palette.divider}`,
	  '&:not(:last-child)': {
	    borderBottom: 0,
	  },
	  '&:before': {
	    display: 'none',
	  },
	}));

	const AccordionSummary = styled((props) => (
	  <MuiAccordionSummary
	    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
	    {...props}
	  />
	))(({ theme }) => ({
	  backgroundColor:
	    theme.palette.mode === 'dark'
	      ? 'rgba(255, 255, 255, .05)'
	      : 'rgba(0, 0, 0, .03)',
	  flexDirection: 'row-reverse',
	  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
	    transform: 'rotate(90deg)',
	  },
	  '& .MuiAccordionSummary-content': {
	    marginLeft: theme.spacing(1),
	  },
	}));

	const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	  padding: theme.spacing(2),
	  borderTop: '1px solid rgba(0, 0, 0, .125)',
	}));





const Details = ({ course, user }) => {
	
	const [oneCourse, setoneCourse] = React.useState([]);
    const [subjects, setSubjects] = React.useState([]);
    const [childsubjects, setchildSubjects] = React.useState([]);
    const [allcourses, setAllcourses] = React.useState([]);
    const [allenroll, setAllenroll] = React.useState([]);
    const [flaga, setFlaga] = useState(0);
    const [crsprice, setCrsprice] = React.useState([]);
    const [configurables, setConfigurables] = React.useState([]);

	
	const [title, setTitle] = useState("win | win upskilling universe");


	const [display, setDisplay] = useState(false);
	const [alreadyBuy, setAlreadyBuy] = useState(false);	
	const [country, setCountry] = useState(0);
	const [loading, setLoading] = React.useState(false);
	const [isquiz, setIsquiz] = React.useState(false);
	const dispatch = useDispatch();

	const [token, setToken] = React.useState();
	
	
	const cartItems = useSelector((state) => state.cart.cartItems);

	  useEffect(() => {
	    document.title = title;
	  }, [title]);

	
    const router = useRouter();
    const {id} = router.query;

	 useEffect(() => {
     getCourses();
     getallCourses();
     },[id]);


     const [selectedcourse, setSelectedcourse] = React.useState('');

	  const handleChange22 = (event) => {
	    setSelectedcourse(event.target.value);
	  };	


 //     useEffect(() => {
	// 	checkpurchase();
	// }, []);

	useEffect(() => {
		setDisplay(true);
		setToken(localStorage.getItem("token"));
		//checkpurchase();
	}, []);


	const [expanded, setExpanded] = React.useState('panel1');

	  const handleChange = (panel) => (event, newExpanded) => {
	    setExpanded(newExpanded ? panel : false);
	  };

 

 
    const getCourses = async() => {
    	   const url = `https://winupskill.in/api/api/courses/${id}`
            var response = await axios.get(url).then(
             result => {
                setoneCourse(result.data.data),
                setTitle(result.data.data.name),
                setIsquiz(result.data.data.type)
 

             })


      const conf = await axios.get(`https://winupskill.in/api/api/configurables?type=Course%20Content&typeid=${id}`);
      setConfigurables(conf.data.data);


    }

    const getallCourses = async() => {
    	   const url = `https://winupskill.in/api/api/courses?type=crs`
            var response = await axios.get(url).then(
             result0 => {
                setAllcourses(result0.data.data);
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

	const addToCart = (courseId, name, price, priceos, selected ) => {
		const selectedname = findNameById(selected);
		if(selected){
			console.log("252",courseId, name, price, priceos, selected, selectedname);
			let courseObj = {};
			var tt = ": ";
			courseObj["id"] = courseId;
			courseObj["name"] = `Registration${tt}${selectedname}`;
			courseObj["image"] = "NA";
			courseObj["price"] = price;
			courseObj["priceos"] = priceos;
			courseObj["duration"] = "NA";
			courseObj["quantity"] = 1;
			dispatch({
				type: "ADD_TO_CART",
				data: courseObj,
			});
			var tmpnm = `Registration${tt}${selectedname}`;
			postCartapi(courseId, tmpnm, price, priceos);
		
		}
		else{
			setHeadertext("Course not selected"),
		   	setBtntext("Close"),
		    onShowAlert("error","Please select a course from dropdown to continue.")
 
		}
		
	};

	function findNameById(iid) {
	  const foundItem = allcourses.find(item => item.id == iid);
	  return foundItem ? foundItem.name : '';

	}



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


	const postCartapi = async (courseId, name, price, priceos) => {
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
        tempcartdata.append('price', price/1.18);
        tempcartdata.append('priceos', priceos);
        tempcartdata.append('tempuserid', tempuid);
        tempcartdata.append('image', "NA");
        tempcartdata.append('type', "registration");
        tempcartdata.append('utm_source',cookie.get('utm_source'));
		tempcartdata.append('utm_source_current',cookie.get('utm_source_current'));
			
		console.log("440",courseId,name,price,tempuid);
        if(uuid2){
		tempcartdata.append('user_id', uuid2);	
		}
   
		const response = axios.post('https://winupskill.in/api/api/cartitems', tempcartdata)
            .then(result => {
            	if (result.status == 200 || result.status == 201){
            		
                  //  Router.push('/user/my-profile');
                Router.push('/checkout');
                }

        })
         .catch(error => {
  			  console.error("An error occurred:", error);
  			  // Handle the error here
 		 });


	}
 

	 const [activeTab, setActiveTab] = useState(0);


useEffect(() => {
	 setActiveTab(0);
 	}, [router]); 
    


 
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
												<div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-44a2d15b" data-id="44a2d15b" data-element_type="column">
												<div className="elementor-column-wrap elementor-element-populated">
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
															</div></div></div><div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-2af7f22a" data-id="2af7f22a" data-element_type="column"><div className="elementor-column-wrap elementor-element-populated"><div className="elementor-widget-wrap"><div className="elementor-element elementor-element-dabebae elementor-widget elementor-widget-image elementor-motion-effects-parent" data-id="dabebae" data-element_type="widget">


																<div className="elementor-widget-container elementor-motion-effects-element">
																	<div className="elementor-image"> 
																		<img className="attachment-full size-full wp-image-12933" src={oneCourse.image}/>
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




			<div className="courses-details-area" style={{paddingBottom:"100px"}}>
				

				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-12">
							<div className="courses-details-desc">
								<p dangerouslySetInnerHTML={{__html: oneCourse.description}} />
							</div>
						</div>

						<div className="col-lg-4 col-md-12">
							

								<div className="courses-details-info">
									<div className="image">
										<img src={oneCourse.badgeimage} alt={oneCourse.name} />

										
									</div>

									<ul className="info">
										
										<li>
											<div className="d-flex justify-content-between align-items-center">
												<span>
													Registration Payment for:

													  
												</span>
												
											</div>
										</li>
										<li>
											<div className="d-flex justify-content-between align-items-center">
												<span>
													 

													    <Box sx={{ minWidth: 120 }}>
													      <FormControl fullWidth>
													       
													        <NativeSelect
													           value={selectedcourse}
       														   onChange={handleChange22}
													        >
													        	<option value="0">--Select a Course--</option>
													        	 {allcourses.length ? allcourses.map((item,index) => (
													        	 <option key={index} style={{fontSize:"10px"}} value={item.id}>{item.name}</option>
												       		  	 )):("")}
													        </NativeSelect>
													      </FormControl>
													    </Box>



												</span>
												
											</div>
										</li>

										<li className="price" style={{display: (oneCourse.type === 'registration')? 'block' : 'none'}}>
											<div className="d-flex justify-content-between align-items-center">
												<span>Registration Amount</span>
												<span style={{display: (country == 'India')? 'flex' : 'none'}}>INR {numberWithCommas(oneCourse.price)}</span>
												<span style={{display: (country !== 'India')? 'flex' : 'none'}}>USD {numberWithCommas(oneCourse.overseasprice)}</span>
											</div>
										</li>
										
									</ul> 

									<div className="btn-box"  style={{display: (oneCourse.type === 'registration')? 'block' : 'none'}}>
										
											<>
												
													<button
													    
														className="default-btn"
														onClick={() => 
															addToCart(
																oneCourse.id,
																oneCourse.name,
																oneCourse.price,
																oneCourse.overseasprice,
																selectedcourse
															
																
															)
														}
													>
														 Proceed to Payment{" "}
														<span></span>
													</button>
												
											</>
										
									</div>

									

									
								</div>
						</div>
					</div> 
				</div>
			</div>


			

				
			

 
			

				
		




	



			




			




		</React.Fragment>
	);
};



export default Details;
