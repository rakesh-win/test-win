import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import catchErrors from "@/utils/catchErrors";
import { useRouter } from "next/router";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import cookie from 'js-cookie'; 
import { parseCookies } from 'nookies'

import { useCallback } from "react";
import useRazorpay from "react-razorpay";

import toast, { Toaster } from 'react-hot-toast';

import LoadingSpinner from "@/utils/LoadingSpinner";
import Alert from 'react-popup-alert';
import Paymentloading from "../_App/PaymentLoading";




const CheckoutBtn = ({ user, cartItems, total, disc, gst, payable, coupon }) => {
	const [orderid, setOrderid] = useState(0);
	const [headertext, setHeadertext] = useState(0);
	const [btntext, setBtntext] = useState(0);
	const [loading, setLoading] = React.useState(false);
	const [examprice, setExamprice] = useState(0)

	var flag;


	
 
	// const notify = () => toast('Here is your toast.', {
	//   style: {
	//     border: '1px solid black',
	//     top: '200',
 //    left: '20',
 //    bottom: 20,
 //    right: '200',
	//   },
	// });
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


//	localStorage.setItem('pbl', payable);
	
	//localStorage.setItem('price', price);

	 
	//const stripeTotal = Number((price * 100).toFixed(2));
	// console.log(stripeTotal)
	const router = useRouter();
	   	 const priceround = Number(((payable.toFixed(2)) * 100).toFixed(2));
	function generateRandomString(length) {
	  let result = '';
	  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	  for (let i = 0; i < length; i++) {
	    result += characters.charAt(Math.floor(Math.random() * characters.length));
	  }

	  return result;
	}
	const handleCheckout = async () => {
		setHeadertext("Payments"),
		setBtntext("Close"),
		onShowAlert("alert", "Please don't cancel or refresh the page; your payment may take a little longer");
		setLoading(true);
		try {
			if(user.name){
				if(user.email){
					if(user.mobile){
						if(user.state){
							validateusage()
								
						}
						else{
							setHeadertext("Error!"),
							setBtntext("Close"),
							onShowAlert("error","Enter your State")
									
						}
					}
					else{
						setHeadertext("Error!"),
						setBtntext("Close"),
						onShowAlert("error","Enter your Mobile No")
							
					}
				}
				else{
					setHeadertext("Error!"),
					setBtntext("Close"),
					onShowAlert("error","Enter your Email address")
					
				}
			}
			else{
				setHeadertext("Error!"),
				setBtntext("Close"),
				onShowAlert("error","Enter your name")
			
				
			}

		} catch (error) {
			//catchErrors(error, window.alert);
			console.log(error.message);
		}


	}; 

	const validateusage = async () => {
		
		
	
		var formData = new FormData();
				formData.append("email", user.email);
		        formData.append("mobile", user.mobile);
		        formData.append("coupon", coupon);
		        
		        axios.post(`${process.env.NEXT_PUBLIC_API}/checkcouponorder`, formData)
		        .then((e) => {
		        	if(e.data === 'matching'){
		        		if(coupon){
					        setHeadertext("Error!"),
									setBtntext("Close"),
									onShowAlert("error","This coupon has already been used with this email / mobile"),
									setLoading(false);
									}
									else{
										createorder();
									}
		        	}
		        	else{
		        		createorder();
		        	}
		        })

	}

	const createorder = async () => {

const userid =  localStorage.getItem('userid');


		var formData = new FormData();
				formData.append("name", user.name);
		        formData.append("email", user.email);
		        formData.append("mobile", user.mobile);
		        formData.append("country", user.country2);
		        formData.append("state", user.state);
		        formData.append("address", user.address);
		        formData.append("source", "NA");
		        formData.append("totalval", total);
		        formData.append("totaldisc", disc);
		        formData.append("gst", gst);
		        formData.append("totalpayable", payable);
		        formData.append("paymentmode", "razorpay");
		        formData.append("userid",userid);
		        formData.append('utm_source',cookie.get('utm_source'));
				formData.append('utm_source_current',cookie.get('utm_source_current'));
		
		       
		        
		        axios.post(`${process.env.NEXT_PUBLIC_API}/orders`, formData)
		         .then((e) => {
		        //     history.push('/lesson/lesson_list')
		          if(e.status == 200 || e.status == 201)
		          {
		         flag = e.status;
				 if(e.data.data && e.data.data.id){  // rakesh : checks either data response is ok or nor
					createorderitems(e.data.data.id);
					setOrderid(e.data.data.id);
				 localStorage.setItem('ordi', e.data.data.id);

				 }else{
					setHeadertext("Error!"),
					setBtntext("Close"),
					onShowAlert("error","There was an error processing your order, please try again after some time")
		            setLoading(false);
				 }
			

		            
		             if(payable > 0){
		             	handlePayment(e.data.data.id);
		             }
		             else{
		             	finalizecheckout2("zeropayment");
		             }
		             setLoading(false);
		           }
		          else{
		          	setHeadertext("Error!"),
					setBtntext("Close"),
					onShowAlert("error","There was an error processing your order, please try again after some time")
		            setLoading(false);
		          }
		        })

	//createorderitems();

	}

	const finalizecheckout = async (payid) => {
		try {
		  const abc = generateRandomString(10);
		  localStorage.setItem('tmppass', abc);
	  
		  const formData = new FormData();
		  formData.append("rzppayide", payid);
		  formData.append("crstype", cartItems[0].type);
		  formData.append("email", user.email);
		  formData.append("orderid", localStorage.getItem('ordi'));
		  formData.append("username", user.name);
		  formData.append("usermobile", user.mobile);
		  formData.append("tempuid", localStorage.getItem('tempuserid'));
		  formData.append("temppass", localStorage.getItem('tmppass'));
		  formData.append("user_id", localStorage.getItem('userid'));
		  formData.append('examprice',  Number(examprice))
	  
		  localStorage.setItem('tmpemail', user.email);
		  setLoading(true);
	  
		  const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/purchaseenroll`, formData);
	  
		  if (response.status === 200 || response.status === 201) {
			localStorage.setItem('ordstat', response.data);
			
			setHeadertext("Order Placed!");
			setBtntext("Continue");
			onShowAlert("success", "Payment was successful & your order is received");
			router.push("/order-received");
		  }
		} catch (error) {
		  console.error("Error during finalizecheckout:", error);
		  onShowAlert("error", "Something went wrong during the checkout process. Please contact support.");
		} finally {
		  setLoading(false);
		}
	  };
	  

	const finalizecheckout2 = async (payid) => {
	
		var abc = generateRandomString(10);
		localStorage.setItem('tmppass', abc);


			var formData = new FormData();
				formData.append("rzppayide", "zeropayment");
		        formData.append("crstype", cartItems[0].type);
		        formData.append("email", user.email);
		        formData.append("orderid", localStorage.getItem('ordi'));
		        formData.append("user_id", localStorage.getItem('userid'));
		        formData.append("username",user.name);
		        formData.append("usermobile",user.mobile);
		        formData.append("tempuid", localStorage.getItem('tempuserid'));
		        formData.append("temppass",localStorage.getItem('tmppass'));
		        localStorage.setItem('tmpemail', user.email);

		        axios.post(`${process.env.NEXT_PUBLIC_API}/purchaseenroll`, formData)
		         .then((e) => {
		          if(e.status == 200 || e.status == 201)
		          {
					
		             localStorage.setItem('ordstat', e.data);
		             setHeadertext("Order Placed!"),
		             setBtntext("Continue");
        			 onShowAlert("success","Your order is received");
		             router.push("/order-received"); 
		          }
		          else{
		            
		          }


		        })





	}



	const createorderitems = async (ordid) => {


		
        if(localStorage.getItem('userid')){}
        	else{
        		var tempuid = localStorage.getItem('userid');
        	}
       
		cartItems.forEach(carti => {
		        var formData = new FormData();
		        formData.append("course_id", carti.course_id);
		        formData.append("item_name", carti.item_name);
		        formData.append("type", carti.type);
		        formData.append("item_qty", carti.item_qty);
		        formData.append("price", carti.price);
		        formData.append("tempuserid", carti.tempuserid);
		        formData.append("coupon", carti.coupon);
		        formData.append("discountedprice", carti.discountedprice);
		        formData.append("orderid", ordid);
		        formData.append("cartid", carti.id);



		        if(localStorage.getItem('userid')){
		        formData.append("user_id", localStorage.getItem('userid'));
		        }
		        
		       
		        axios.post(`${process.env.NEXT_PUBLIC_API}/orderitems`, formData)
		         .then((e) => {
		        //     history.push('/lesson/lesson_list')
		          if(e.status == 200 || e.status == 201)
		          {
				console.log('orderitems response',e.status);
		          }
		          else{
		          	setHeadertext("Error!"),
					setBtntext("Close"),
					onShowAlert("error","There was an error while processing your added product items, please try again in some time")
		     
		            
		          }
		        })


		});

		

	}
  

 
	// const handlePayment = useCallback(() => {
	// //	const price2 = payable2;
		
	// //create order in order table
 //      	 const priceround = Number((payable * 100).toFixed(2));
	// 	console.log("priceround-226",priceround);

    


	// console.log("options-229",options.amount);
     
 //     if(options.amount !==0){
 //     	const rzpay = new Razorpay(options);
 //  		rzpay.open();

 //     }
 //     else{
 //     	handlePayment();
 //     }
  	

 //    //var options; 
    

    
 //    }, [Razorpay]);

	
 

const Razorpay = useRazorpay();

const handlePayment = async (orid) => {

 // const order = await createOrder(params); //  Create order on your backend

 var options = {
//    key: "rzp_test_7FXz72DZ19vR28",
     key: "rzp_live_ZJNdwUd4aWYWAL",
   amount: priceround,
   currency: "INR",
   name: "win upskill",
   description: "win-Order",
   image: "/images/whitelogo.png",

   handler: (res) => {
     if (res.error_code == null) {
       finalizecheckout(res.razorpay_payment_id);
     } else {
       onShowAlert(
         "error",
         "Error in payment! Please contact our team with a screenshot of this page if any amount is debited from your payment mode!"
       );
     }
   },
   prefill: {
     name: user.name,
     email: user.email,
     contact: user.mobile,
   },
   notes: {
     address: user.address,
     order_id: orid,
   },

   theme: {
     color: "#3399cc",
   },
 };



 
//   const rzp1 = new Razorpay(options);

//   rzp1.on("payment.failed", function (response) {
//     console.log("resp-error-code",response.error.code);
//   });

//   rzp1.open();


if (flag === 200 || flag === 201) {  // rakesh : add flag if response is ok or created call razorpay
	console.log('working',flag);
	
    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log("resp-error-code", response.error.code);

    })
	
    rzp1.open();
  } else {
    setHeadertext("Error!");
    setBtntext("Close");
    onShowAlert("error", "Please try again ");
  }

setLoading(false)


};




 

	return (
	
	
					 <div>

					 	{loading ? <Paymentloading /> : ""}
			   
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
			     <button
 		 style={{
    margin: '10px 0px 0px 0px',
    paddingLeft: '20px',
    display: payable > 0 ? 'flex' : 'none',
  }}
  onClick={() => handleCheckout()}
  className="default-btn"
>	
  Make Payment
</button>


					<button style={{margin:'10px 0px 0px 0px', paddingLeft: '20px',
			      	display: (payable == 0)? 'flex' : 'none'
			  		}}
					onClick={() => handleCheckout()} className="default-btn">
						Submit and Enroll
					</button>
			    </div>

		

					
				
	);
};

export default CheckoutBtn;




///test keys:

//
//rzp_test_7FXz72DZ19vR28


