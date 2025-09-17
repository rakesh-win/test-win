import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import CartItemsos from './CartItemsos'
import { Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

function USDcart ({
  country,
  finalLimit,
  setLoyalPointsInpos,
  loyalPointsInputos,
  cartItems2 = [],
  checks2,
  cartAmoutos,
  discountos,
  profilePoints,
  setChecks2,
  setLoyalErr,
  setCoupon,
  applycoupon,
  handleRemove,
  coupon
}) {
  const handleOnChange = e => {
    setCoupon(e.target.value)
  }

  useEffect(() => {
    if (typeof window != 'undefined') {
      localStorage.removeItem('loyalPoints')
      localStorage.removeItem('loyalPointsos')
      setLoyalPointsInpos('')
    }
  }, [])
  const Router = useRouter()

  const paynowos = e => {
    e.preventDefault()
    localStorage.setItem('loyalPointsos', loyalPointsInputos)
    Router.push('/checkout')
  }

  const onLoyalPointsOs = e => {
    const entered = Number(e.target.value)
    const cap = Math.min(profilePoints, (cartItems2?.length || 0) * 100)

    if (entered <= cap) {
      setLoyalPointsInpos(e.target.value)
    } else {
      setLoyalPointsInpos(cap.toString())
    }
  }

  return (
    <div
      className='cart-area ptbpage'
      style={{ display: country !== 'India' ? 'flex' : 'none' }}
    >
      <div className='container'>
        <form>
          {/* CART ITEMS */}
          <div className='cart-table table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th className='hideonmob'>Discounted Price</th>
                  <th className='hideonweb'>Disc Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems2?.length > 0 ? (
                  cartItems2.map(cart => (
                    <CartItemsos
                      key={cart.id}
                      {...cart}
                      onRemove={() => handleRemove(cart.id)}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan='7'>
                      <h3>Empty</h3>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'inline-block' }}>
            {/* Coupon Section */}
            <div
              className='cart-totals'
              style={{ float: 'left', width: '400px' }}
            >
              <h3>Apply Discount Coupon:</h3>
              <div className='coupon-box'>
                <input
                  type='text'
                  className='input-coupon'
                  placeholder='Enter your coupon code'
                  name='coupon'
                  onChange={handleOnChange}
                />
              </div>
              <button
                type='button'
                style={{ cursor: 'not-allowed', marginTop: '10px' }}
                disabled={!coupon}
                className={coupon ? 'default-btn' : 'default-btn-grey'}
                onClick={() => applycoupon()}
              >
                Apply Coupon
              </button>
            </div>

            {/* Cart Totals */}
            <div
              className='cart-totals'
              style={{
                float: 'right',
                marginLeft: '50px',
                width: '500px',
                height: 469
              }}
            >
              <h3>Cart Totals</h3>

              {/* Cart Box 1: Cash Only */}
              <div
                className='cart-boxes'
                style={{
                  padding: 15,
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 20
                }}
              >
                <div>
                  <h6>Pay with Cash</h6>
                  <h6
                    style={{
                      margin: '0 0 10px 0',
                      fontWeight: 'normal',
                      display: cartItems2[0]?.examprice > 1 ? '' : 'none'
                    }}
                  >
                    - Exam Fee Included
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
                      arrow
                      placement='top'
                      title={
                        <div>
                          <div>Course Price: USD {cartAmoutos}</div>
                          <div>Coupon Discount: USD {discountos}</div>
                          <div>Total: USD {cartAmoutos - discountos}</div>
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
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>
                    USD {Number(cartAmoutos || 0) - Number(discountos || 0)}
                  </div>
                  <div style={{ fontSize: 11, marginBottom: 5 }}>
                    Cash Only {discountos ? '+ Discount' : ''}{' '}
                  </div>
                  <Link href='/checkout'>
                    <button className='default-btn'>Pay Now</button>
                  </Link>
                </div>
              </div>

              {/* Cart Box 2: Cash + Loyalty Points */}
              <div
                className='cart-boxes'
                style={{
                  padding: 15,
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  marginBottom: 20
                }}
              >
                {/* Top Row: Heading + Price */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}
                >
                  <h6>Cash & Loyalty Points Redemption</h6>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>
                      USD{' '}
                      {Number(cartAmoutos || 0) -
                        Number(discountos || 0) -
                        Number(loyalPointsInputos || 0)}
                    </div>
                    <div style={{ fontSize: 11, marginBottom: 5 }}>
                      Cash + Loyalty Points {discountos ? '+ Discount' : ''}{' '}
                    </div>
                  </div>
                </div>

                {/* Loyalty Input + Pay Now */}
                {finalLimit === 0 && (
                  <span style={{ color: 'red', fontWeight: 100 }}>
                    {typeof window !== 'undefined' &&
                    localStorage.getItem('token')
                      ? `You currently have 0 Loyalty Points.`
                      : `Login to Claim Loyalty Points`}
                  </span>
                )}

                {profilePoints > 0 && (
                  <form
                    // onSubmit={e => paynowos(e)}
                    style={{
                      marginTop: 10,
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 10
                    }}
                  >
                    <input
                      type='number'
                      value={loyalPointsInputos || ''}
                      onChange={onLoyalPointsOs}
                      placeholder={`Enter Here to Claim Loyalty Points`}
                      min='0'
                      max={finalLimit}
                      style={{
                        flex: 1,
                        height: '42px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: '#f5f5f5',
                        color: '#221638',
                        fontSize: '16px',
                        fontWeight: 400,
                        paddingLeft: 10
                      }}
                    />
                    <button
                      type='button'
                      className={
                        loyalPointsInputos && loyalPointsInputos !== '0'
                          ? 'default-btn'
                          : 'default-btn-grey'
                      }
                      onClick={e => paynowos(e)}
                      disabled={!loyalPointsInputos}
                    >
                      Pay Now
                    </button>
                  </form>
                )}

                {/* Rate Details Below Input */}
                {typeof window != 'undefined' && localStorage.getItem('token') && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      marginTop: 10
                    }}
                  >
                    <Tooltip
                      enterTouchDelay={0}
                      arrow
                      placement='top'
                      title={
                        <div>
                          <div>You have {finalLimit} Loyalty Points</div>
                          <div>Course Price: USD {cartAmoutos}</div>
                          <div>Discount: USD {discountos}</div>
                          <div>Loyalty Points: {loyalPointsInputos || 0}</div>
                          <div>
                            Total: USD{' '}
                            {Number(cartAmoutos || 0) -
                              Number(discountos || 0) -
                              Number(loyalPointsInputos || 0)}
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
              {typeof window != 'undefined' && localStorage.getItem('token') && (
                <div className='loyalty-container'>
                  <div className='loyalty-message'>
                    You have {finalLimit} Loyalty Points
                  </div>
                  <div className='loyalty-message'>
                    * A maximum of 100 Loyalty points can be redeemed to
                    purchase a single course
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default USDcart
