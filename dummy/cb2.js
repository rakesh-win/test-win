import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from 'js-cookie'; 
import Alert from 'react-popup-alert';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Paymentloading from "../_App/PaymentLoading";


const CheckoutBtn2 = ({ total,user, price, cartItems,coupon ,disc }) => {
    // console.log("price",price,'\n','disc',disc,'\n','coupon',coupon);
    // console.log('total',total)
    const router = useRouter();
    
    const [showButton, setShowButton] = useState(false);
    const [headertext, setHeadertext] = useState(0);
    const [btntext, setBtntext] = useState(0);
    const [loading, setLoading] = useState(false);
    var flag;
    const [alert, setAlert] = useState({
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



	// useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         if (price === 0) {
    //             console.log('useefect')
    //             validateusage();
	// 		}
	// 	}, 1000);
	   
	// 	return () => {
	// 		clearTimeout(timeout);
	// 	};
	// }, []);
   

	function generateRandomString(length) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < length; i++) {
		  result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	  }
	


    const initialOptions = {
		// "client-id": "AaLOLIjqhYgVilNkU-XREXYt4yO3qgF66TWc5OKclwTEpWDgHyutJJ3qWx9nrLuGcPsd00BTdZWBbylL",    // rakesh
        "client-id": "AT6CyAfT4dfDYk0-NCloQkmOqAvZuyQNxgqQBvKY-cXnoD6nZw4_zvQ6VnR35GEx1r57e-aQjdNTYPba", 
        currency: "USD",
        intent: "capture"
    };


    const proceed = () =>{
		setHeadertext("Payments"),
        setBtntext("Continue"),
		onShowAlert("alert", "Please select your payment method and proceed with the payment");
        try {
            if(user.name){
                if(user.email){
                    if(user.mobile){

                            validateusage()
                            setShowButton(true)
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

	const proceed2 = async () =>{
		setHeadertext("Payments"),
		setBtntext("Close"),
		onShowAlert("alert", "Please don't cancel or refresh the page after submit ,it may take some time to enroll.");
        try {
            if(user.name){
                if(user.email){
                    if(user.mobile){
                        console.log('val2')
                        var formData = new FormData();
                                formData.append("email", user.email);
                                formData.append("mobile", user.mobile);
                                formData.append("coupon", coupon);
                                axios.post(`https://winupskill.in/api/api/checkcouponorder`, formData)
                                .then((e) => {
                                    console.log('22',e.data)
                                    if(e.data === 'matching'){
                                        if(coupon){
                                            setHeadertext("Error!"),
                                                    setBtntext("Close"),
                                                    onShowAlert("error","This coupon has already been used with this email / mobile"),
                                                    setLoading(false);
                                                    setTimeout(() => {
                                                    router.push('/cart')
                                                        
                                                    }, 4000);
                                                    }
                                                    else{
                                                        createorder();
                                                    }
                                    }
                                    else{
                                        console.log('createorder')
                                        createorder();
                                    }
                                })
                        
						
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
		console.log('valli')
        var formData = new FormData();
                formData.append("email", user.email);
                formData.append("mobile", user.mobile);
                formData.append("coupon", coupon);
                axios.post(`https://winupskill.in/api/api/checkcouponorder`, formData)
                .then((e) => {
                    console.log('22',e.data)
                    if(e.data === 'matching'){
                        if(coupon){
                            setHeadertext("Error!"),
                                    setBtntext("Close"),
                                    onShowAlert("error","This coupon has already been used with this email / mobile"),
                                    setLoading(false);
									setTimeout(() => {
									router.push('/cart')
										
									}, 4000);
                                    }
                                   
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
                formData.append("totalval",total );
                formData.append("totaldisc", disc);
                formData.append("gst", 'null');
                formData.append("totalpayable", price);
                formData.append("paymentmode", "Paypal");
                formData.append("userid",userid);
                formData.append('utm_source',cookie.get('utm_source'));
                formData.append('utm_source_current',cookie.get('utm_source_current'));
                
                axios.post(`https://winupskill.in/api/api/orders`, formData)
                 .then((e) => {
                //     history.push('/lesson/lesson_list')
                  if(e.status == 200 || e.status == 201)
                  {
                 flag = e.status;
                 if(e.data.data && e.data.data.id){  // rakesh : checks either data response is ok or nor
                    createorderitems(e.data.data.id);
                	 localStorage.setItem('ordi', e.data.data.id);
                     
                 }else{
                    setHeadertext("Error!"),
                    setBtntext("Close"),
                    onShowAlert("error","There was an error processing your order, please try again after some time")
                    setLoading(false);
                 }
            
                     if(price > 0){
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
    }


    const finalizecheckout = async (payid) => {
        var abc = generateRandomString(10);
        localStorage.setItem('tmppass', abc);
    
        var formData = new FormData();
        formData.append("paypalid", payid);
        formData.append("crstype", cartItems[0].type);
        formData.append("email", user.email);
        formData.append("orderid", localStorage.getItem('ordi'));
        formData.append("user_id", localStorage.getItem('userid'));
        formData.append("username", user.name);
        formData.append("usermobile", user.mobile);
        formData.append("tempuid", localStorage.getItem('tempuserid'));
        formData.append("temppass", localStorage.getItem('tmppass'));
    
        localStorage.setItem('tmpemail', user.email);
    
        setLoading(true); 
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/purchaseenroll`, formData);
            
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('ordstat', response.data);
                setHeadertext("Order Placed!");
                setBtntext("Continue");
                onShowAlert("success", "Payment was successful & your order is received");
                router.push("/order-received");
            }
        } catch (error) {
            console.error("Order placement failed", error);
            onShowAlert("error", "Something went wrong. Please try again.");
        } finally {
            setLoading(false); // 👉 Stop loading state no matter what
        }
    };
    


    const finalizecheckout2 = async (payid) => {
	
		var abc = generateRandomString(10);
		localStorage.setItem('tmppass', abc);


			var formData = new FormData();
				formData.append("paypalid", "zeropayment");
		        formData.append("crstype", cartItems[0].type);
		        formData.append("email", user.email);
		        formData.append("orderid", localStorage.getItem('ordi'));
		        formData.append("user_id", localStorage.getItem('userid'));
		        formData.append("username",user.name);
		        formData.append("usermobile",user.mobile);
		        formData.append("tempuid", localStorage.getItem('tempuserid'));
		        formData.append("temppass",localStorage.getItem('tmppass'));
				formData.append('user_id',localStorage.getItem('userid'))
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
                var tempuid = localStorage.getItem('tempuserid');
            }
                cartItems.forEach(carti => {
                var formData = new FormData();
                formData.append("course_id", carti.course_id);
                formData.append("item_name", carti.item_name);
                formData.append("type", carti.type);
                formData.append("item_qty", carti.item_qty);
                formData.append("price", total);
                formData.append("tempuserid", carti.tempuserid);
                formData.append("coupon", carti.coupon);
                formData.append("discountedprice", price);
                formData.append("orderid", ordid);
                formData.append("cartid", carti.id);
                if(localStorage.getItem('userid')){
                formData.append("user_id", localStorage.getItem('userid'));
                }
                axios.post(`https://winupskill.in/api/api/orderitems`, formData)
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
<div style={{display: price === 0? 'none' : 'block' }}>
          {!showButton && (
                <button className="default-btn" onClick={proceed}>Make Payment</button>
            )}
            
            {showButton && (
                <PayPalScriptProvider options={initialOptions}
                onError={(err) => console.error('PayPal error:', err)}

                >
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            createorder();
                            return actions.order.create({
                                purchase_units: [{ amount: { value:  price } }]
                            });
                        }}
                        onApprove={async (data, actions) => {
                            const details = await actions.order.capture();
                            console.log('data', data.orderID, '/n', 'details', details);
                            if (details.status === 'COMPLETED') {
                        finalizecheckout(data.orderID);
                            }
                        }}
                    />
                </PayPalScriptProvider>
            )}
          </div>
		  <div style={{display: price === 0? 'block' : 'none' }}>
			<button 
			onClick={proceed2}
			className="default-btn"> submit and enroll </button>
 </div>
</div>

                    
                
    );
}

export default CheckoutBtn2;

