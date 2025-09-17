import React, { useEffect, useState } from 'react'
import CartItems from './CartItems'
import Link from 'next/link'
import Router from 'next/router'

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
  afterPoints, // ✅ Add this
  gstAmount,
  applycoupon,
  handleRemove
}) {
  const [finalPayableAmount, setFinalPayableAmount] = useState('0')
  const [gstDisplayAmount, setGstDisplayAmount] = useState('')

  useEffect(() => {
    if (checks) {
      const discountAmount = Number(discount?.amount || 0)
      const cartTotal = Number(cartAmout || 0)
      const afterDiscount = cartTotal - discountAmount

      const loyaltyUsed = Math.min(parseInt(loyalPointsInput || 0, 10), 5000)
      const afterLoyalty = afterDiscount - loyaltyUsed

      const calculatedGST = Math.max(afterLoyalty * 0.18, 0)
      const final = afterLoyalty + calculatedGST

      setFinalPayableAmount(final)
      setGstDisplayAmount(calculatedGST) // ✅ New state for clean rendering
    }
  }, [checks, loyalPointsInput, cartAmout, discount])

  useEffect(() => {
    if (!checks) {
      if (typeof window != 'undefined') {
        localStorage.removeItem('loyalPoints')
        localStorage.removeItem('loyalPointsOs')
        setLoyalPointsInp('')
      }
    }
  }, [checks])

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
              className='default-btn'
              type='button'
            >
              Apply Coupon
            </button>
          </div>

          <div
            className='cart-totals'
            style={{
              float: 'right',
              'margin-left': '50px',
              width: '700px',
              height: 500
            }}
          >
            <h3>Cart Totals</h3>

            <ul>
              <li>
                Total <span>INR {numberWithCommas(cartAmout)}</span>
              </li>
              <li style={{ display: discount > 0 ? 'block' : 'none' }}>
                - Discount: <span>INR {numberWithCommas(discount)}</span>
              </li>
              <li
                style={{ display: cartAmout - discount > 0 ? 'block' : 'none' }}
              >
                Amount after Discount
                <span>INR {numberWithCommas(cartAmout - discount)}</span>
              </li>

              <li
                style={{ display: cartAmout - discount < 0 ? 'block' : 'none' }}
              >
                Amount after Discount<span>INR 0</span>
              </li>
              {checks && (
                <li
                  style={{
                    display: cartAmout - discount > 0 ? 'block' : 'none'
                  }}
                >
                  Amount After Discount with Loyalty Points{' '}
                  <span title='Info'>
                    INR {loyalPointsInput ? numberWithCommas(afterPoints) : '0'}
                  </span>
                </li>
              )}

              <li>
                + GST
                <span>
                  INR{' '}
                  {numberWithCommas(
                    gstDisplayAmount || (cartAmout - discount) * 0.18
                  )}
                </span>
              </li>

              {!checks && (
                <li style={{ display: discount > -0.0001 ? 'block' : 'none' }}>
                  Final Amount Payable:
                  {cartAmout -
                    discount -
                    (-(cartAmout - discount) * 18) / 100 ===
                  0 ? (
                    <span style={{ display: 'flex' }}>INR 0</span>
                  ) : (
                    <span style={{ display: 'flex' }}>
                      INR{' '}
                      {loyalPointsInput
                        ? gstAmount
                        : numberWithCommas(
                            cartAmout -
                              discount -
                              (-(cartAmout - discount) * 18) / 100
                          )}
                    </span>
                  )}
                </li>
              )}

              <>
                {checks && (
                  <li>
                    Final Payable After Using Points{' '}
                    <span>INR {numberWithCommas(finalPayableAmount)}</span>
                  </li>
                )}
              </>

              <li>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 30
                    }}
                  >
                    <label>
                      <input
                        type='checkbox'
                        id='without-points'
                        name='purchase-option'
                        value='without-points'
                        checked={!checks}
                        onChange={handleOptionChange}
                      />
                      &nbsp;Payment Option 1
                    </label>

                    <div
                      style={{
                        maxHeight: !checks ? '200px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height 1s ease'
                      }}
                    >
                      {!checks && (
                        <Link href='/checkout'>
                          <center>
                            <button
                              onClick={() =>
                                localStorage.removeItem('loyalPoints')
                              }
                              className='default-btn'
                            >
                              Pay Now <span></span>
                            </button>
                          </center>
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* Payment Option 2 */}

                  <div>
                    <label htmlFor='with-points'>
                      <input
                        type='checkbox'
                        id='with-points'
                        name='purchase-option'
                        value='with-points'
                        checked={checks}
                        onChange={handleOptionChange}
                      />
                      <span>
                        &nbsp;Payment Option 2
                        <span style={{ color: 'red' }}>
                          &nbsp; &#40; with Loyalty Points &#41;
                        </span>
                      </span>
                    </label>

                    <div
                      style={{
                        maxHeight: checks ? '200px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height 1s ease'
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        {checks && (
                          <>
                            <form
                              onSubmit={e => {
                                e.preventDefault()
                                //   handleApply(); // not needed if button uses applyLoyaltyPoints
                              }}
                              className='cou1-box1'
                              style={{ marginBottom: 1 }}
                            >
                              <div style={{ display: 'flex', gap: '15px' }}>
                                <input
                                  type='number'
                                  className=''
                                  value={
                                    !loyalPointsInput ||
                                    loyalPointsInput === '0'
                                      ? ''
                                      : loyalPointsInput
                                  }
                                  onChange={onLoyalPoints}
                                  placeholder={`You have ${profilePoints} Loyalty Points`}
                                  min='0'
                                  max='5000'
                                  style={{
                                    marginLeft: 3,
                                    width: '270px',
                                    height: '48px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    backgroundColor: '#f5f5f5',
                                    color: '#221638',
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    transition: '0.5s',
                                    display:
                                      finalLimit === 0 ||
                                      !cartItems2.every(
                                        item => item.crs_loyalty === '1'
                                      )
                                        ? 'none'
                                        : 'inline-block'
                                  }}
                                />

                                {/* 3. Pay Now button */}
                                {Number(loyalPointsInput) <=
                                  cartItems2.length * 5000 && (
                                  <div>
                                    <button
                                      onClick={e => paynow(e)}
                                      className='default-btn'
                                      type='submit'
                                      style={{
                                    
                                    >
                                      Pay Now
                                    </button>
                                  </div>
                                )}
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

                                {!cartItems2.every(
                                  item => item.crs_loyalty === '1'
                                ) && (
                                  <span
                                    style={{
                                      color: 'red',
                                      padding: 10
                                    }}
                                  >
                                    Loyalty Points can be used only when all
                                    cart items are eligible and you have at
                                    least 2 items.
                                  </span>
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
            <div>
              <span style={{ color: 'red', textAlign: 'center' }}>
                * A maximum of 5,000 Loyalty points can be redeemed to purchase
                a single course
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default INRcart
