import React from 'react'

function CartIndia({gstAmount,cartAmout,handleOptionChange,cartItems2,handleOnChange}) {
  return (
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
								onClick={() => applycoupon()} className="default-btn">
									Apply Coupon
									<span></span>
								</button>
						</div>
 

						<div className="cart-totals" style={{"float":"right", "margin-left":"50px", "width":"700px", height:500}}>
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
								{checks && (<li style={{display: ((cartAmout-discount) > 0)? 'block' : 'none'}}>
								Amount After Discount with Loyalty Points <span title="Info">INR {loyalPointsInput ? numberWithCommas(afterPoints) : 0} </span>
								</li>)}



								<li>
									+ GST 
									
									<span style={{display: (((cartAmout-discount)*18/100) == 0)? 'flex' : 'none'}}>INR 0</span>
							    	<span style={{display: (((cartAmout-discount)*18/100) !== 0)? 'flex' : 'none'}}>INR {numberWithCommas(((cartAmout-discount)*18/100))}</span>
							
								</li>

								

							{!checks ? <>
									<li style={{display: (discount > -0.0001)? 'block' : 'none'}}>
								Final Amount Payable: 
								<span style={{display: (((cartAmout-discount)-(-(cartAmout-discount)*18/100)) == 0)? 'flex' : 'none'}}>INR 0</span>
								<span style={{display: (((cartAmout-discount)-(-(cartAmout-discount)*18/100)) !== 0)? 'flex' : 'none'}}>INR {numberWithCommas((cartAmout-discount)-(-(cartAmout-discount)*18/100))}</span>
								</li></>:<>
									<li>
 							 Final Payable After Using Points <span>INR {numberWithCommas(finalPayable)}</span>
								 </li>
								</>
							}

							<li>
							<div style={{ fontSize: 18, fontWeight: "bold",   }}>
<div style={{display:"flex" ,justifyContent: "space-between",alignItems: "center", marginBottom:50}}>
	<label>
        <input
          type="checkbox"
          id="without-points"
          name="purchase-option"
          value="without-points"
          checked={!checks}
          onChange={handleOptionChange}
        />
        &nbsp;Payment Option 1
      </label>

      <div
        style={{
          maxHeight: !checks ? "200px" : "0px",
          overflow: "hidden",
          transition: "max-height 1s ease",
        }}
      >
        {!checks && (
          <Link href="/checkout">
            <center>
              <button className="default-btn">
                Pay Now <span></span>
              </button>
            </center>
          </Link>
        )}
      </div>
	</div>
      {/* Payment Option 2 */}
	  <div style={{display:"flex", }}>

	  <label htmlFor="with-points">
        <input
          type="checkbox"
          id="with-points"
          name="purchase-option"
          value="with-points"
          checked={checks}
          onChange={handleOptionChange}
		  />
	<span >
	&nbsp;Payment Option 2

	</span>
      </label>

      <div
        style={{
			maxHeight: checks ? "400px" : "0px",
			overflow: "hidden",
          transition: "max-height 1s ease",
        }}
		>
     
		 <div style={{display:"flex"}}>
			 
	{checks && (
  <>
    <form
      onSubmit={(e) => {
		  e.preventDefault();
		//   gstAmount,); // not needed if button uses applyLoyaltyPoints
		}}
		className="cou1-box1"
		style={{ marginBottom: 1 }}
		>
      <div style={{ display: "flex", gap: "15px" }}>
    
        <input
          type="number"
		className=""
		value={loyalPointsInput === 0 ? '' : loyalPointsInput}
		onChange={onLoyalPoints}
		  placeholder="You can claim upto 5,000 Loyalty points"
		  width={100}
          min="0"
          max="5000"
          style={{
			marginLeft: 3,
			width: "120px",
			height: "48px",
			border: "none",
			borderRadius: "5px",
			backgroundColor: "#f5f5f5",
			color: "#221638",
			fontSize: "16px",
			fontWeight: 400,
			transition: "0.5s",
			}}
			/>

        {/* 3. Pay Now button */}

{Number(loyalPointsInput) <= cartItems2.length * 5000 && (
  <div>
    <buttonx
      onClick={(e) => paynow(e)}
      className="default-btn"
	  type="submit"
    >
      Pay Now
    </buttonx>
  </div>
)}


      </div>
    </form>
  </>
)}

	   
  </div>
</div>

      </div>
    </div>
							</li>

</ul>

</div>
</div>


					</form>
				</div>  )
}

export default CartIndia