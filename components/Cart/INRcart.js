import React, { useEffect, useRef, useState } from 'react'
import CartItems from './CartItems'
import Link from 'next/link'
import Router from 'next/router'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Tooltip } from '@mui/material'

function INRcart ({
  cartItems2,
  cartAmout,
  setChecks,
  setLoyalErr,
  discount,
  checks,
  loyalPointsInput,
  setCoupon,
  setLoyalPointsInp,
  finalPayable,
  finalLimit,
  profilePoints, // ✅ Add this
  gstAmount,
  applycoupon,
  handleRemove,
  afterPoints
}) {
  const [finalPayableAmount, setFinalPayableAmount] = useState('0')
  const [gstDisplayAmount, setGstDisplayAmount] = useState('')
  const inputRef = useRef(null)

  // Automatically focus the input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  useEffect(() => {
    if (cartAmout) {
      const discountAmount = Number(discount?.amount || 0)
      const cartTotal = Number(cartAmout || 0)
      const afterDiscount = Math.max(cartTotal - discountAmount, 0)

      // Loyalty points usage (always applied if user enters input)
      const loyaltyUsed = Math.min(
        Number(loyalPointsInput || 0),
        5000,
        profilePoints
      )

      const afterLoyalty = Math.max(afterDiscount - loyaltyUsed, 0)

      // GST calculation
      const calculatedGST = afterLoyalty * 0.18
      const final = afterLoyalty + calculatedGST

      setFinalPayableAmount(final)
      setGstDisplayAmount(calculatedGST)
    }
  }, [loyalPointsInput, cartAmout, discount, profilePoints])

  useEffect(() => {
    if (typeof window != 'undefined') {
      localStorage.removeItem('loyalPoints')
      localStorage.removeItem('loyalPointsOs')
      setLoyalPointsInp('')
    }
  }, [])

  const onLoyalPoints = e => {
    const entered = Number(e.target.value)

    // Cap is min(profilePoints, cartItems2.length * 100)
    const cap = Math.min(profilePoints, cartItems2.length * 5000)

    if (entered <= cap) {
      setLoyalPointsInp(e.target.value)
    } else {
      setLoyalPointsInp(cap.toString())
    }
  }

  const handleOnChange = e => {
    setCoupon(prevState => e.target.value)
  }
  const handleOptionChange = e => {
    const isUsingPoints = e.target.value === 'with-points'
    setChecks(isUsingPoints)
    if (!isUsingPoints) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('loyalPoints')
        localStorage.setItem('paynow', 'true')
      }
      setLoyalPointsInp('') // clear input
    } else {
      setLoyalPointsInp('0')
    }

    setLoyalErr(false)
  }

  const paynow = e => {
    e.preventDefault()
    localStorage.setItem('loyalPoints', loyalPointsInput)
    localStorage.setItem('paynow', 'true')
    Router.push('/checkout')
  }

  function numberWithCommas (x) {
    if (x) {
      if (x % 1) {
        return Number(x).toLocaleString('en-US', {
          style: 'decimal',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      } else {
        return Number(x).toLocaleString()
      }
    }
  }

  const [open, setOpen] = useState(false)

  const handleToggle = e => {
    e.stopPropagation() // prevent click from bubbling
    setOpen(prev => !prev)
  }

  const handleClose = () => setOpen(false)

  return (
    <div className='container'>
      <form>
        <div className='cart-table table-responsive'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th scope='col'>Product</th>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th scope='col'>Discount</th>
                <th className='hideonmob' scope='col'>
                  Discounted Price
                </th>
                <th className='hideonweb' scope='col'>
                  Disc Price
                </th>
                <th scope='col'>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems2.length > 0 ? (
                cartItems2.map(cart => (
                  <CartItems
                    key={cart.id}
                    {...cart}
                    onRemove={() => handleRemove(cart.id)}
                  />
                ))
              ) : (
                <h3>Empty Cart</h3>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'inline-block' }}>
          <div
            className='cart-totals'
            style={{ float: 'left', width: '400px' }}
          >
            <h3>Apply Discount Coupon:</h3>

            <form className='coupon-box' onSubmit={e => e.preventDefault()}>
              <input
                type='text'
                className='input-coupon'
                placeholder='Enter your coupon code'
                name='coupon'
                onChange={handleOnChange}
              />
            </form>

            <button
              style={{ margin: '10px 0px 0px 0px', paddingLeft: '20px' }}
              onClick={() => applycoupon()}
              className='default-btn-cart'
              type='button'
            >
              Apply Coupon
            </button>
          </div>
          <div
            className='cart-totals'
            style={{
              float: 'right',
              marginLeft: '50px',
              height: 450
            }}
          >
            <h3>Cart Totals</h3>

            <div
              className='cart-boxes'
              style={{
                padding: 15,
                border: '1px solid #ccc',
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              {/* Left side: description */}
              <div className='cart-description'>
                <h6 style={{ margin: '0 0 10px 0' }}>Pay with Cash</h6>

                <h6
                  style={{
                    margin: '0 0 10px 0',
                    fontWeight: 'normal',
                    display: cartItems2[0]?.examprice > 1 ? '' : 'none'
                  }}
                >
                  - Exam Fee Included
                </h6>
                <h6 style={{ margin: '0 0 5px 0', fontWeight: 'normal' }}>
                  - Applicable taxes, If any
                </h6>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    marginTop: 5
                  }}
                >
                  <Tooltip
                    enterTouchDelay={0}
                    sx={{
                      '& .MuiTooltip-tooltip': {
                        fontSize: '200px', // much bigger text
                        padding: '16px 24px', // more padding
                        maxWidth: 400, // make tooltip box wider
                        lineHeight: 1.6 // better spacing
                      },
                      '& .MuiTooltip-arrow': {
                        fontSize: '24px' // make arrow bigger (if arrow enabled)
                      }
                    }}
                    arrow
                    placement='top'
                    title={
                      <div>
                        <div>
                          Course Price: INR{' '}
                          {numberWithCommas(cartAmout - discount)}
                        </div>
                        <div style={{ display: discount ? 'block' : 'none' }}>
                          Discount : INR {numberWithCommas(discount)}
                        </div>
                        <div>
                          GST : INR{' '}
                          {numberWithCommas(
                            ((cartAmout - discount) * 18) / 100
                          )}
                        </div>
                        <div>
                          Total: INR{' '}
                          {numberWithCommas(
                            cartAmout -
                              discount -
                              (-(cartAmout - discount) * 18) / 100
                          )}
                        </div>
                      </div>
                    }
                  >
                    <InfoOutlinedIcon style={{ fontSize: 15, color: 'grey' }} />
                    <span
                      onClick={handleToggle}
                      style={{ marginLeft: 4, fontSize: 13, color: 'grey' }}
                    >
                      Rate Details
                    </span>
                  </Tooltip>
                </div>
              </div>

              {/* Right side: price and button */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>
                  INR{' '}
                  {numberWithCommas(
                    cartAmout - discount - (-(cartAmout - discount) * 18) / 100
                  )}
                </div>
                <div style={{ fontSize: 11, marginBottom: 5 }}>
                  Cash + GST {discount && '+ Discount'}
                </div>
                <Link href='/checkout'>
                  <button
                    onClick={() => localStorage.removeItem('loyalPoints')}
                   
                    className={
                      'default-btn-cart'
                    }
                  >
                    Pay Now
                  </button>
                </Link>
              </div>
            </div>
            {/* cash with loyalty */}

            <div
              className='cart-boxes'
              style={{
                padding: 15,
                border: '1px solid #ccc',
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <div>
                <h6 style={{ margin: '0 0 10px 0' }}>
                  Cash & Loyalty Points Redeemption
                </h6>
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    //   handleApply(); // not needed if button uses applyLoyaltyPoints
                  }}
                  className='cou1-box1'
                  style={{ maorginBottom: 1 }}
                >
                  <div
                    style={{
                      display: finalLimit != 0 ? 'flex' : 'none',
                      gap: '15px'
                    }}
                  >
                    <input
                      disabled={
                        !cartItems2.every(item => item.crs_loyalty === '1')
                      }
                      type='number'
                      value={
                        !loyalPointsInput || loyalPointsInput === '0'
                          ? ''
                          : loyalPointsInput
                      }
                      onChange={onLoyalPoints}
                      placeholder={`Enter Here to Claim Loyalty Points`}
                      min='0'
                      max='5000'
                      className='loyal-input'
                    />
                  </div>
                  {finalLimit == 0 && (
                    <span
                      style={{
                        fontWeight: 'normal',
                        color: 'red',
                        textAlign: 'center',
                        marginLeft: 40,
                        padding: 10
                      }}
                    >
                      {typeof window !== 'undefined' &&
                      localStorage.getItem('token')
                        ? 'You currently have 0 Loyalty Points.'
                        : 'Login to Claim Loyalty Points'}
                    </span>
                  )}
                </form>
                {typeof window != 'undefined' && localStorage.getItem('token') && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      marginTop: 5
                    }}
                  >
                    <Tooltip
                      enterTouchDelay={0}
                      arrow
                      placement='top'
                      title={
                        <div>
                          <div>
                            You have{' '}
                            {numberWithCommas(finalLimit)
                              ? numberWithCommas(finalLimit)
                              : 0}{' '}
                            Loyalty Points
                          </div>
                          <div>
                            Course Price: INR{' '}
                            {loyalPointsInput
                              ? numberWithCommas(afterPoints)
                              : '0'}
                          </div>

                          <div>
                            Disount: INR{' '}
                            {loyalPointsInput
                              ? numberWithCommas(discount)
                              : '0'}
                          </div>
                          <div>
                            GST : INR{' '}
                            {loyalPointsInput
                              ? numberWithCommas(gstAmount || 0)
                              : 0}
                          </div>
                          <div>
                            Loyalty Points : INR{' '}
                            {numberWithCommas(loyalPointsInput) || '0'}
                          </div>
                          <div>
                            Total : INR{' '}
                            {loyalPointsInput
                              ? numberWithCommas(finalPayableAmount - discount)
                              : 0}
                          </div>
                        </div>
                      }
                    >
                      <InfoOutlinedIcon
                        style={{ fontSize: 15, color: 'grey' }}
                      />
                      <span
                        style={{ marginLeft: 4, fontSize: 13, color: 'grey' }}
                      >
                        Rate Details
                      </span>
                    </Tooltip>
                  </div>
                )}
              </div>

              {/* Right side: price and button */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>
                  INR{' '}
                  {loyalPointsInput
                    ? numberWithCommas(
                        finalPayableAmount - Number(discount || 0)
                      )
                    : '0'}
                </div>

                {console.log(discount)}
                <div style={{ fontSize: 11, marginBottom: 5 }}>
                  Cash + GST {discount && '+ Discount'} <br /> + Loyalty Points
                </div>
                <button
                  className={
                    loyalPointsInput && loyalPointsInput !== '0'
                      ? 'default-btn-cart'
                      : 'default-btn-grey'
                  }
                  disabled={!loyalPointsInput}
                  onClick={e => paynow(e)}
                  type='submit'
                  style={{
                    position: 'relative',
                    left: 10,
                    display: finalLimit === 0
                  }}
                >
                  Pay Now
                </button>
              </div>
            </div>

            {typeof window != 'undefined' &&
              localStorage.getItem('token') &&
              (!cartItems2.every(item => item.crs_loyalty === '1') ? (
                <div style={{ color: 'red', textAlign: 'center' }}>
                  Remove non-eligible items in cart.
                  <br /> Refer FAQ{' '}
                  <Link href='/user/my-profile?tab=loyalty_points' passHref>
                    <a className='faq-link'>Click here</a>
                  </Link>
                </div>
              ) : (
                <div className='loyalty-container'>
                  <div className='loyalty-message'>
                    You have {profilePoints || '0'} Loyalty Points
                  </div>
                  <div className='loyalty-message'>
                    * A maximum of 5,000 Loyalty points can be redeemed to
                    purchase a single course
                  </div>
                </div>
              ))}
          </div>
        </div>
      </form>
    </div>
  )
}

export default INRcart
