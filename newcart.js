import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import PageBanner from "../components/Common/PageBanner";
import { calculateCartTotal } from "@/utils/calculateCartTotal";
import CartItems from "@/components/Cart/CartItems";
import CartItemsos from "@/components/Cart/CartItemsos";
import axios from 'axios';
import moment from 'moment';
import Router from 'next/router';

import Alert from 'react-popup-alert';

import Preloader from '../components/_App/Preloader';
import cookie from 'js-cookie'; 
import EmptyCart from "@/components/Cart/EmptyCart";
import { Button } from "reactstrap";

const Cart = ({ user }) => {
	const dispatch = useDispatch();
	const  [checks , setChecks] = useState(false)

	const [cartAmout, setCartAmaount] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [discountos, setDiscountos] = useState(0);
	const [country, setCountry] = useState('Loading');
	const [cartAmoutos, setCartAmaountos] = useState(0);
	var fetchid = 0;
	const [cartItems2, setcartItems2] = useState([0]);
	const [coupona, setCoupona] = useState(0);


    const [loading, setLoading] = React.useState(false);
 

	const [coupon, setCoupon] = React.useState({coupon: ''})

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



    const handleOnChange = (e) => {
        setCoupon(prevState => (e.target.value) )
    }


	useEffect(() => {
		getcartitems();
		setDiscount(localStorage.getItem('discount'));

	}, []);

	function numberWithCommas(x) {
		if(x){
			if(x %1){
				
				return Number(x).toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 });
			}
			else{
				return Number(x).toLocaleString();
			}
		  
		} 
		 
	}
 
	const handleRemove = async (cartId) => {

		try {
			setLoading(true);

			event.preventDefault();
			const url = `https://winupskill.in/api/api/cartitems/${cartId}`;
			await axios.delete(url)
			.then(response => {
				getcartitems();
				setLoading(false);

			})
	    	

	    } catch (error) { 
			console.log('There was an error!', error);
		
		}
		finally {
			//setLoading(false);
		}
   		
   		


	}; 



	const applycoupon = async () => {
		setLoading(true)
		const validateusage = async () => {
		  try {
			const formData = new FormData();
			formData.append("email", user.email);
			formData.append("mobile", user.mobile);
			formData.append("coupon", coupon);
	  
			const matchResponse = await axios.post(`${process.env.NEXT_PUBLIC_API}/checkcouponorder`, formData);
	  
			if (matchResponse.data === "matching") {
			  setHeadertext("Error!");
			  setBtntext("Close");
			  onShowAlert("error", "This coupon has already been used with this email or mobile.");
			  setLoading(false);
			  return;
			}
	  
			const url = `${process.env.NEXT_PUBLIC_API}/coupons?code=${coupon}`;
			const response = await axios.get(url);
			const couponData = response.data.data?.[0];
	  
			if (!couponData) {
			  setHeadertext("Error!");
			  setBtntext("Close");
			  onShowAlert("error", "Invalid coupon! Please check the coupon code entered.");
			  return;
			}
	  
			const findLVC = cartItems2.find(el => el.type === "LVC");
			const findSelfPaced = cartItems2.find(el => el.type === "Self-paced");
	  
			if (findLVC && findSelfPaced) {
			  setHeadertext("Error!");
			  setBtntext("Close");
			  onShowAlert("error", "You cannot have both LVC and Self-paced courses in the cart at the same time.");
			  return;
			}
	  
			const validType = cartItems2.find(el => el.type === couponData.usetype);
			if (!validType) {
			  setHeadertext("Error!");
			  setBtntext("Close");
			  onShowAlert("error", "Invalid coupon! Please check the coupon code.");
			  return;
			}
	  
			if (moment().isAfter(couponData.validtill)) {
			  setHeadertext("Error!");
			  setBtntext("Close");
			  onShowAlert("error", "Expired Coupon! Please try with a valid coupon.");
			  return;
			}
	  
			if (couponData.usageleft && cartItems2.length > couponData.usageleft) {
			  setHeadertext("Error!");
			  setBtntext("Close");
			  onShowAlert("error", `This coupon is valid only for ${couponData.usageleft} course(s)! Please remove some items from your cart or try a valid coupon.`);
			  return;
			}
	  
			if (couponData.usageleft <= 0) {
			  setHeadertext("Error!");
			  setBtntext("Close");
			  onShowAlert("error", "Expired Coupon (Already used)! Please try with a valid coupon.");
			  return;
			}
	  
			const isIndia = country === "India";
			const isGlobalDiscountValid = couponData.discountvalos != null;
	  
			const apply = (val, valOS, pct, id = 0) => {
			  applydiscountval(val, valOS, pct, coupon, id);
			};
	  
			const courseId = couponData.courseid || 0;
	  
			if (couponData.discountval > 0) {
			  if (!isIndia && !isGlobalDiscountValid) {
				setHeadertext("Error!");
				setBtntext("Close");
				onShowAlert("error", "This coupon is not valid for your location. Please contact us via chat for assistance!");
				return;
			  }
	  
			  apply(couponData.discountval, couponData.discountvalos, 0, courseId);
			} else {
			  if (!isIndia && !isGlobalDiscountValid) {
				setHeadertext("Error!");
				setBtntext("Close");
				onShowAlert("error", "This coupon is not valid for your location. Please contact us via chat for assistance!");
				return;
			  }
	  
			  apply(0, isIndia ? 0 : couponData.discountvalos, couponData.discountpct, courseId);
			}
	  
		  } catch (error) {
			console.error("Coupon validation failed:", error);
			setHeadertext("Error!");
			setBtntext("Close");
			onShowAlert("error", "Something went wrong while applying the coupon.");
		  } finally {
			setLoading(false);
		  }
		};
	  
		await validateusage();
		setLoading(false)
	  };
	  

		    /*setcartItems2(response.data.data);
		    const { cartTotal, stripeTotal, cartTotalos } = calculateCartTotal(response.data.data);
			setCartAmaount(cartTotal);
			setCartAmaountos(cartTotalos);
			*/
    
		async function applydiscountval (indiaoff,osoff,pctoff,coupon,subid) {
		    	console.log("241-osoff",osoff,coupon);
		    	var nosubflag = 0;
		    	var counter = 0;
		    	var discountedprice = 0;
		    	var tempdsc = 0;
		    	var discountedpriceos = 0;

		    	const validCourses = subid.split(",").map(Number);


		    
		    	cartItems2.forEach((el)=>{


		    		
		    		
				    if(subid == 0){
				    	counter = counter +1;
				    	if(indiaoff > 0){
				    		discountedprice = el.price - indiaoff;
				    	}
				    	else{
				    		discountedprice = el.price-((el.price*pctoff)/100);
				    	}
				    	cartitemedit(el.id,coupon,el.price,discountedprice);
				    	tempdsc = tempdsc + (el.price - discountedprice);

				    }
				    else{
				    	if(validCourses.includes(parseInt(el.course_id)))
				    	{
				    		counter = counter +1;
				    		if(indiaoff > 0){
				    		discountedprice = el.price - indiaoff;
					    	}
					    	else{
					    		discountedprice = el.price-((el.price*pctoff)/100);
					    	}

					    	if(osoff > 0)
					    	{
					    		console.log("282",osoff);
					    		discountedpriceos = el.priceos - osoff;
					    		console.log("284",el.priceos,osoff);
					    	}


					    	cartitemedit(el.id,coupon,el.price,discountedprice,discountedpriceos);
					    	tempdsc = tempdsc + (el.price - discountedprice);
				    	}
				    	else{
				    		cartitemedit(el.id,null,el.price,el.price);
				    	}
				    }
  
 
				})
				
				if (nosubflag == counter){
					setHeadertext("Error!"),
					setBtntext("Close"),
					onShowAlert("error","This coupon is not valid on the subjects in Cart, please get in touch with our team through Chat for further assistance!")
				}
				else{
					setHeadertext("Coupon Applied"),
		             setBtntext("Continue");
        			 onShowAlert("success","Coupon code applied! Cart values are updated.");

        			  setTimeout(() => {
					    setCoupona(coupon);
						getcartitems();
			        	setDiscount(tempdsc);
			        	localStorage.setItem('discount', tempdsc);

			    		 setDiscount(tempdsc);
			    		
					  }, 2000);

					
		    	 

				}
		}


	
		
  	  async function cartitemedit(cartid,coupon,price,discountedprice,discountedpriceos){
  	  	console.log("327",discountedpriceos);
  		axios.put(`https://winupskill.in/api/api/cartitems/${cartid}`, {
    		"coupon":coupon,
    		"discountedprice":discountedprice,
    		"discountedpriceos":discountedpriceos
    	})
        .then(response => {
        	getcartitems();
        	//getcartitems();

        });
   	  }



    
 



	const getcartitems = async () => {
		
			var tempuid = localStorage.getItem('tempuserid');
			const url = `https://winupskill.in/api/api/cartitems?tempuserid=${tempuid}`;
		    const response = await axios.get(url);
		    setcartItems2(response.data.data);
		    const { cartTotal, stripeTotal, discTotal, cartTotalos, discTotalos } = calculateCartTotal(response.data.data);
			setCartAmaount(cartTotal);
			setCartAmaountos(cartTotalos);
			setDiscount((cartTotal-discTotal));
			setDiscountos(cartTotalos-discTotalos);
			console.log("360",cartTotalos,discTotalos,cartTotalos);

			localStorage.setItem('discount', (cartTotal-discTotal));
			localStorage.setItem('discountos', (cartTotalos-discTotalos));
			var t = ((cartAmout-discount)*18/100);
		
		
		

	}


  
 

 

	var loc;

	setTimeout(() => {  
		var loc = localStorage.getItem('country');
	    setCountry(loc);
	}, 1000);


	const handleOptionChange = (e) => {
		setChecks(e.target.value === "with-points");
	  };
	  const [loyalPoints, setLoyalPoints] = useState('');

const handleLoyalChange = (e) => {
	const value = parseInt(e.target.value, 10);
  
	if (!isNaN(value)) {
	  if (value >= 5000) {
		setLoyalPoints(5000);
	  } else {
		setLoyalPoints(value);
	  }
	} else {
	  setLoyalPoints('');
	}
  };

  const gst = (cartAmout - discount) * 0.18;
const finalAmount = cartAmout - discount + gst;
const pointsDiscount = checks ? Math.min(loyalPoints, 5000) : 0;
const payableAfterPoints = finalAmount - pointsDiscount;
  
	
	return (
		<>
			<PageBanner
				pageTitle="Cart"
				homePageUrl="/"
				homePageText="Home"
				activePageText="Cart"
			/>

				<div>

				{loading && <Preloader />}
			   
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
				<div style={{display: !cartItems2.length > 0 ? "flex": "none"}}>
			<EmptyCart />
			</div>

			<div className="cart-area ptbpage" style={{display: (country == 'India') && cartItems2.length > 0 ? 'flex' : 'none'}}>
				<div className="container">
					<form>
						<div className="cart-table table-responsive" >
							<table className="table table-bordered">
								<thead>
									<tr>
										<th scope="col">Product</th>
										<th scope="col">Name</th>
										<th scope="col">Price</th>
										<th scope="col">Discount</th>
										<th className="hideonmob" scope="col">Discounted Price</th>
										<th className="hideonweb" scope="col">Disc Price</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
 
								<tbody>
									{cartItems2.length > 0 ? (
										cartItems2.map((cart) => (
											<CartItems
												key={cart.id}
												{...cart}
												onRemove={() =>
													handleRemove(cart.id)
												}
											/>
										))
									) : (
										<h3>Empty Cart</h3>
									)}
								</tbody>
							</table>
						</div>
						<div style={{"display":"inline-block"}}>

						<div className="cart-totals" style={{"float":"left", "width":"400px"}}>
							<h3>Apply Discount Coupon:</h3>

							<form className="coupon-box" >
					            <input 
					                type="text" 
					                className="input-coupon" 
					                placeholder="Enter your coupon code"
					                name='coupon'
					                onChange={handleOnChange}
					            />
					            

					            
					        </form>
					        <button style={{margin:'10px 0px 0px 0px', paddingLeft: '20px'}}
								onClick={() => applycoupon()} type="button" className="default-btn">
									Apply Coupon
								</button>
						</div>
 

						<div className="cart-totals" style={{"float":"right", "margin-left":"50px", "width":"500px"}}>
							<h3>Cart Totals</h3>

							<ul>
								<li>
									Total <span>INR {numberWithCommas(cartAmout)}</span>
								</li>
								<li style={{display: (discount > 0)? 'block' : 'none'}}>
								- Discount: <span>INR {numberWithCommas(discount)}</span>
								</li>
								<li style={{display: ((cartAmout-discount) > 0)? 'block' : 'none'}}>
									Amount after Discount<span>INR {numberWithCommas(cartAmout-discount)}</span>
								</li>

								<li style={{display: ((cartAmout-discount) < 0)? 'block' : 'none'}}>
									Amount after Discount<span>INR 0</span>
								</li>

								<li>
									+ GST 
									
									<span style={{display: (((cartAmout-discount)*18/100) == 0)? 'flex' : 'none'}}>INR 0</span>
							    	<span style={{display: (((cartAmout-discount)*18/100) !== 0)? 'flex' : 'none'}}>INR {numberWithCommas(((cartAmout-discount)*18/100))}</span>
							
								</li>
								

								
								<li style={{display: (discount > -0.0001)? 'block' : 'none'}}>
								Final Amount Payable: 
								<span style={{display: (((cartAmout-discount)-(-(cartAmout-discount)*18/100)) == 0)? 'flex' : 'none'}}>INR 0</span>
							
							
								<span style={{display: (((cartAmout-discount)-(-(cartAmout-discount)*18/100)) !== 0)? 'flex' : 'none'}}>INR {numberWithCommas((cartAmout-discount)-(-(cartAmout-discount)*18/100))}</span>
							
								</li>
								
								<li>
  Final Payable After Points <span>INR {numberWithCommas(payableAfterPoints)}</span>
</li>

							
							</ul>  
<p>
							<input
          type="radio"
          name="purchase-option"
          value="without-points"
          checked={!check}
          onChange={handleOptionChange}
        />
        <span>Purchase Without Points</span> &nbsp;&nbsp;&nbsp;

        <input
          type="radio"
          name="purchase-option"
          value="with-points"
          checked={check}
          onChange={handleOptionChange}
        />
        <span>Purchase With Loyality Points</span> &nbsp;&nbsp;&nbsp;
      </p>
	  {checks ? (
  <>
<form onSubmit={e => e.preventDefault()} className="cou1-box1" style={{ marginBottom: 1 }}>
    <input
      className="input-coupon2"
      placeholder="Avail up to 5000 coins"
      value={loyalPoints}
      onChange={handleLoyalChange}
	  style={{
		width: '50%',
		marginLeft: '70px',
		height: '48px',
		border: 'none',
		borderRadius: '5px',
		backgroundColor: '#f5f5f5',
		color: '#221638',
		fontSize: '16px',
		fontWeight: 400,
		paddingLeft: '15px',
		transition: '0.5s',
		marginBottom:'10px'
	  }}
    />
    <button className="default-btn" type="submit">
      Apply
    </button>
    <br />
  </form>
  </>
) : ""}


      <Link href="/checkout">
      <center>  <a className="default-btn" style={{ paddingLeft: '20px' }}>
          Proceed to Checkout {check ? 'With Loyality Points' : ""} <span></span>
        </a></center>
      </Link>
						</div>
						</div>


					</form>
				</div>
			</div>

			<div style={{display: (country != 'Loading')? 'block' : 'none'}}>
			<div className="cart-area ptbpage" style={{display: (country != 'India')? 'flex' : 'none'}}>
				
				<div className="container">
					<form>
						<div className="cart-table table-responsive" >
							<table className="table table-bordered">
								<thead>
									<tr>
										<th scope="col">Product</th>
										<th scope="col">Name</th>
										<th scope="col">Price</th>
										<th scope="col">Discount</th>
										<th className="hideonmob" scope="col">Discounted Price</th>
										<th className="hideonweb" scope="col">Disc Price</th>
										
										<th scope="col">Action</th>
									</tr>
								</thead>

								<tbody>
									{cartItems2.length > 0 ? (
										cartItems2.map((cart) => (
											<CartItemsos
												key={cart.id}
												{...cart}
												onRemove={() =>
													handleRemove(cart.id)
												}
											/>
										))
									) : (
										<h3>Empty</h3>
									)}
								</tbody>
							</table>
						</div>

						<div style={{"display":"inline-block"}}>

						<div className="cart-totals" style={{"float":"left", "width":"400px"}}>
							<h3>Apply Discount Coupon:</h3>

							<form className="coupon-box" >
					            <input 
					                type="text" 
					                className="input-coupon" 
					                placeholder="Enter your coupon code"
					                name='coupon'
					                onChange={handleOnChange}
					            />
					            

					            
					        </form>
					        <button style={{margin:'10px 0px 0px 0px', paddingLeft: '20px'}}
								onClick={() => applycoupon()} className="default-btn">
									Apply Coupon
								</button>
						</div>
 

						<div className="cart-totals" style={{"float":"right", "margin-left":"50px", "width":"500px"}}>
							<h3>Cart Totals</h3>

							<ul> 
								<li>
									Total <span>USD {cartAmoutos - discountos}</span>
								</li>
								
							</ul>

							<Link href="/checkout">
								<a className="default-btn">
									Proceed to Checkout 
								</a>
							</Link>
						</div>
						</div>


						
					</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Cart;
