import Link from 'next/link';
import React from 'react';

function EmptyCart() {
  return (
    <div className="empty-cart">
      <div className="empty-cart-content">
        <img src="/images/empty-cart.jpg" className="empty-cart-img" alt="Empty Cart" />
        <div className="empty-cart-text">
          <h2 style={{fontFamily:"sans-serif"}}>Your cart is empty</h2>
          <span style={{color:'#666666',fontFamily:"sans-serif", fontSize:18}}>You have no items in your shopping cart</span>
          {/* <span style={{color:'#666666',fontFamily:"sans-serif"}}>Let's go buy something</span> */}
          <br/>
          <Link href='/'>
          <button className="default-btn" style={{padding:'10px',margin:'10px'} } >Shop now </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
