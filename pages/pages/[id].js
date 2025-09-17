import React, { useState, useEffect } from "react";
import Navbar from '../../components/_App/Navbar';
import PageBanner from '../../components/SingleCourses/PageBanner';
import Link from 'next/link';
import Footer from '../../components/_App/Footer';
import BlogSidebar from '../../components/Blog/BlogSidebar';
import CommentArea from '../../components/Blog/CommentForm';
import axios from 'axios';
import {useRouter} from "next/router";
import { useForm } from "react-hook-form";
import cookie from 'js-cookie';
import Alert from 'react-popup-alert';
import Preloader from '../../components/_App/Preloader'

const INITIAL_STATE = {
    name: "",
    email: "",
    mobile: ""
}; 



const Pages = () => { 

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

    const [allStatic, setallStatic] = React.useState([]);
    const [img, setImg] = React.useState('');

    const [contact, setContact] = useState(INITIAL_STATE);
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

    const onSubmit = async (e) => {
        setLoading(true);
        //e.preventDefault();

        try {
            const url = `https://winupskill.in/api/api/formitems`;
            const { name, email, mobile} = contact;

            const params = new URLSearchParams(window.location.search);
            const utm_source = cookie.get('utm_source');
            const utm_source_current = cookie.get('utm_source_current');
            const page = allStatic.title;
            const form = "static-bottom-form";
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
        setLoading(true);
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
                        const url = `https://winupskill.in/api/api/formitems`;
                        const { name, email, mobile, message, text } = contact;

                        const params = new URLSearchParams(window.location.search);
                        const utm_source = cookie.get('utm_source');
                        const utm_source_current = cookie.get('utm_source_current');
                        const page = allStatic.title;
                        const form = "static-bottom-form";
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
   
     useEffect(() => {
     getStatic();
     },[]);

     const router = useRouter();
     const {id} = router.query;
   

    const getStatic = async() => {
           const url = `https://winupskill.in/api/api/staticpages?id=${id}`
            var response = await axios.get(url).then(
             result => {
                console.log("staticdata",result.data.data[0]),
                setallStatic(result.data.data[0])
             })

    }  

    return (
        <React.Fragment>
            <PageBanner 
                homePageUrl="/" 
                homePageText="Home" 
                innerPageUrl="/pages"
                innerPageText="Pages"
                activePageText={allStatic.title}
            />  

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


                {allStatic.bannerimg  ? (
                    <div className="staticbannerimg"
                        style={{
                            backgroundImage: `url(${allStatic.bannerimg})`
                        }}
                    >
                        <div className="bannertextcontainer">
                            <div className="bannertextbig">
                                {allStatic.bannertext1}
                            </div>
                            
                            <div className="bannertextsml">
                               <span dangerouslySetInnerHTML={{__html: allStatic.bannertext2}} />
                            </div>
                        </div>
                        
                    </div> 
                    
                    ):(""
                 )}


 
 
            <div className="blog-details-area" style={{"filter": "none"}}>


                {((allStatic.top === "<p><br></p>") || (allStatic.top === null) || (allStatic.top === "<p>null</p>")) ? (
                
                ""

                ):( 
                <div className="statictop">
                <span dangerouslySetInnerHTML={{__html: allStatic.top}} />
                </div>
                )}

                

                <div className="container static30">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="blog-details-desc article-content">
                             

                                

                               

                                <div className="article-content">
                                 
                                </div>

                                   
 
                    
                            </div>
                        </div>

                        
                    </div>
                </div>

                <div className="rowcontainer colorimg" style={{"filter": "none"}}>
                        <div className="leftspace">
                            <p dangerouslySetInnerHTML={{__html: allStatic.left1}} />
                                 
                        </div>


                        <div className="rightform">
                        <div className="contact-form landingstatic">
                        

                        <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
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

                                <div className="col-lg-12 col-md-12">
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

                                <div className="col-lg-12 col-md-12">
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

                               

                                <div className="col-lg-12 col-sm-12">
                                    <button type="submit" className="default-btn">
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>



                </div>


                

                </div>
            </div>




            <div className="rowcontainer">
                        <div className="fullwidth manualheight">
                            <p dangerouslySetInnerHTML={{__html: allStatic.fullwidth1}} />
                                 
                        </div>

                        


            </div>


            <div className="rowcontainer">
                        <div className="leftspace2">
                            <p dangerouslySetInnerHTML={{__html: allStatic.left2}} />
                                 
                        </div>

                        <div className="rightspace2">
                            <p dangerouslySetInnerHTML={{__html: allStatic.right2}} />
                                 
                        </div>


            </div>


             {(allStatic.type == "2")  ? (
                
                <div className="singlelinecontainer onelineform">
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

                ):( ""
                )}
            

            <div className="rowcontainer">
                        <div className="fullwidth">
                            <p dangerouslySetInnerHTML={{__html: allStatic.fullwidth2}} />
                                 
                        </div>

                        


            </div>


             {((allStatic.bottom === "<p><br></p>") || (allStatic.bottom === null) || (allStatic.bottom === "<p>null</p>")) ? (
                
                ""

                ):( 
            <div className="staticbottom">
                    <p dangerouslySetInnerHTML={{__html: allStatic.bottom}} />
            </div>

            )}
       
         </React.Fragment>
    )
}




export default Pages;