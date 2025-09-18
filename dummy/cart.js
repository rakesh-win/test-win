import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import PageBanner from '../components/Common/PageBanner'
import { calculateCartTotal } from '@/utils/calculateCartTotal'
import CartItems from '@/components/Cart/CartItems'
import CartItemsos from '@/components/Cart/CartItemsos'
import axios from 'axios'
import moment from 'moment'

import Alert from 'react-popup-alert'

import Preloader from '../components/_App/Preloader'
import cookie from 'js-cookie'
import EmptyCart from '@/components/Cart/EmptyCart'
import { useRouter } from 'next/router'

const Cart = ({ user }) => {
  const router = useRouter()

  const [cartAmout, setCartAmaount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountos, setDiscountos] = useState(0)
  const [country, setCountry] = useState('Loading')
  const [cartAmoutos, setCartAmaountos] = useState(0)
  var fetchid = 0
  const [cartItems2, setcartItems2] = useState([0])
  const [coupona, setCoupona] = useState(0)

  const [loading, setLoading] = React.useState(false)

  const [coupon, setCoupon] = React.useState({ coupon: '' })

  const [headertext, setHeadertext] = useState(0)
  const [btntext, setBtntext] = useState(0)

  const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })

  function onCloseAlert () {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  function onShowAlert (type, text) {
    setAlert({
      type: type,
      text: text,
      show: true
    })
  }

  const handleOnChange = e => {
    setCoupon(prevState => e.target.value)
  }

  useEffect(() => {
    getcartitems()
    setDiscount(localStorage.getItem('discount'))
  }, [])

  const [profilePoints, setProfilePoints] = useState([])

  useEffect(() => {
    const getpoints = async () => {
      const token =
        typeof window !== 'undefined' && localStorage.getItem('token')

      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/usrprofile`,
            {
              headers: {
                Authorization: 'Bearer ' + token
              }
            }
          )

          console.log(response.data[0].points)
          const points = response.data[0].points
          setProfilePoints(points)

          if (cartItems2.length >= 2 && points > 1) {
            setHeadertext('Loyalty Points Info')
            setBtntext('Close')
            onShowAlert(
              'success',
              `You can select to redeem up to 5,000 loyalty points per course.
				You currently have ${points} redeemable loyalty points available.
				Please select Payment Option 2 and use these points for this order.`
            )
          }

          // You can do something with `data` here (e.g. setState)
        } catch (error) {
          console.error(
            'Error fetching user profile:',
            error.response?.data || error.message
          )
        }
      }
    }

    getpoints()
  }, [])

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
  const handleRemove = (cartId) => {
    const url = `${process.env.NEXT_PUBLIC_API}/cartitems/${cartId}`;
    
    axios.delete(url)
      .then(response => {
        if (response?.status === 200 || response?.status === 204) {
          router.replace(router.asPath); // Refresh current page
        }
      })
      .catch(error => {
        console.error('Error removing item:', error);
      });
  };
  

  const applycoupon = async e => {
    e.preventDefault()
    const url = `${process.env.NEXT_PUBLIC_API}/coupons?code=${coupon}`
    const response = await axios.get(url)
    const findLVC = cartItems2.find(el => el.type === 'LVC')
    const findSelfPaced = cartItems2.find(el => el.type === 'Self-paced')

    if (findLVC && findSelfPaced) {
      // If both LVC and Self-paced courses are in the cart
      setHeadertext('Error!')
      setBtntext('Close')
      onShowAlert(
        'error',
        'You cannot have both LVC and Self-paced courses in the cart at the same time.'
      )
      return
    }
    const findTypes = cartItems2.find(
      el => el.type === response.data.data[0].usetype
    )
    console.log('findtype', findTypes)
    if (!findTypes) {
      setHeadertext('Error!'),
        setBtntext('Close'),
        onShowAlert('error', 'Invalid coupon! Please check the coupon code.')
      return
    }

    if (response.data.data.length == 0) {
      setHeadertext('Error!'),
        setBtntext('Close'),
        onShowAlert(
          'error',
          'Invalid coupon! Please check the coupon code entered.'
        )
    } else {
      if (moment().isAfter(response.data.data[0].validtill)) {
        setHeadertext('Error!'),
          setBtntext('Close'),
          onShowAlert(
            'error',
            'Expired Coupon! Please try with a valid coupon.'
          )
      } else {
        if (
          cartItems2.length > response.data.data[0].usageleft &&
          response.data.data[0].usageleft
        ) {
          setHeadertext('Error!'),
            setBtntext('Close'),
            onShowAlert(
              'error',
              `This coupon is valid only for ${response.data.data[0].usageleft} course! Please remove some items from your cart or try with a valid coupon.`
            )
        } else {
          if (response.data.data[0].usageleft > 0) {
            if (response.data.data[0].discountval > 0) {
              if (country !== 'India') {
                if (response.data.data[0].discountvalos) {
                  if (response.data.data[0].courseid == 0) {
                    applydiscountval(
                      response.data.data[0].discountval,
                      response.data.data[0].discountvalos,
                      0,
                      coupon,
                      0
                    )
                  } else {
                    applydiscountval(
                      response.data.data[0].discountval,
                      response.data.data[0].discountvalos,
                      0,
                      coupon,
                      response.data.data[0].courseid
                    )
                  }
                } else {
                  setHeadertext('Error!'),
                    setBtntext('Close'),
                    onShowAlert(
                      'error',
                      `This coupon is not valid for your location. Please contact us via chat for assistance!`
                    )
                }
              } else {
                if (response.data.data[0].courseid == 0) {
                  applydiscountval(
                    response.data.data[0].discountval,
                    response.data.data[0].discountvalos,
                    0,
                    coupon,
                    0
                  )
                } else {
                  applydiscountval(
                    response.data.data[0].discountval,
                    response.data.data[0].discountvalos,
                    0,
                    coupon,
                    response.data.data[0].courseid
                  )
                }
              }
            } else {
              if (country !== 'India') {
                if (response.data.data[0].discountvalos) {
                  if (response.data.data[0].courseid == 0) {
                    applydiscountval(
                      0,
                      0,
                      response.data.data[0].discountpct,
                      coupon,
                      0
                    )
                  } else {
                    applydiscountval(
                      0,
                      response.data.data[0].discountvalos,
                      response.data.data[0].discountpct,
                      coupon,
                      response.data.data[0].courseid
                    )
                  }
                } else {
                  setHeadertext('Error!'),
                    setBtntext('Close'),
                    onShowAlert(
                      'error',
                      `This coupon is not valid for your location. Please contact us via chat for assistance!`
                    )
                }
              } else {
                if (response.data.data[0].courseid == 0) {
                  applydiscountval(
                    0,
                    0,
                    response.data.data[0].discountpct,
                    coupon,
                    0
                  )
                } else {
                  applydiscountval(
                    0,
                    0,
                    response.data.data[0].discountpct,
                    coupon,
                    response.data.data[0].courseid
                  )
                }
              }
            }
          } else {
            setHeadertext('Error!'),
              setBtntext('Close'),
              onShowAlert(
                'Expired Coupon (Already used)! Please try with a valid coupon.'
              )
          }
        }
      }
    }
  }

  /*setcartItems2(response.data.data);
		    const { cartTotal, stripeTotal, cartTotalos } = calculateCartTotal(response.data.data);
			setCartAmaount(cartTotal);
			setCartAmaountos(cartTotalos);
			*/

  async function applydiscountval (indiaoff, osoff, pctoff, coupon, subid) {
    console.log('241-osoff', osoff, coupon)
    var nosubflag = 0
    var counter = 0
    var discountedprice = 0
    var tempdsc = 0
    var discountedpriceos = 0

    const validCourses = subid.split(',').map(Number)

    cartItems2.forEach(el => {
      if (subid == 0) {
        counter = counter + 1
        if (indiaoff > 0) {
          discountedprice = el.price - indiaoff
        } else {
          discountedprice = el.price - (el.price * pctoff) / 100
        }
        cartitemedit(el.id, coupon, el.price, discountedprice)
        tempdsc = tempdsc + (el.price - discountedprice)
      } else {
        if (validCourses.includes(parseInt(el.course_id))) {
          counter = counter + 1
          if (indiaoff > 0) {
            discountedprice = el.price - indiaoff
          } else {
            discountedprice = el.price - (el.price * pctoff) / 100
          }

          if (osoff > 0) {
            console.log('282', osoff)
            discountedpriceos = el.priceos - osoff
            console.log('284', el.priceos, osoff)
          }

          cartitemedit(
            el.id,
            coupon,
            el.price,
            discountedprice,
            discountedpriceos
          )
          tempdsc = tempdsc + (el.price - discountedprice)
        } else {
          cartitemedit(el.id, null, el.price, el.price)
        }
      }
    })

    if (nosubflag == counter) {
      setHeadertext('Error!'),
        setBtntext('Close'),
        onShowAlert(
          'error',
          'This coupon is not valid on the subjects in Cart, please get in touch with our team through Chat for further assistance!'
        )
    } else {
      setHeadertext('Coupon Applied'), setBtntext('Continue')
      onShowAlert('success', 'Coupon code applied! Cart values are updated.')

      setTimeout(() => {
        setCoupona(coupon)
        getcartitems()
        setDiscount(tempdsc)
        localStorage.setItem('discount', tempdsc)

        setDiscount(tempdsc)
      }, 2000)
    }
  }

  async function cartitemedit (
    cartid,
    coupon,
    price,
    discountedprice,
    discountedpriceos,
    lpoints
  ) {
    console.log('327', discountedpriceos)

    let points = 0

    // Apply loyalty points only if provided and greater than 0
    if (lpoints && lpoints > 0) {
      points = lpoints
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/cartitems/${cartid}`, {
        coupon: coupon,
        discountedprice: discountedprice,
        discountedpriceos: discountedpriceos,
        points
      })

      getcartitems() // Refresh cart items
    } catch (error) {
      console.error('Failed to update cart item:', error)
    }
  }

  const getcartitems = async () => {
    var tempuid = localStorage.getItem('tempuserid')
    const url = `${process.env.NEXT_PUBLIC_API}/cartitems?tempuserid=${tempuid}`
    const response = await axios.get(url)
    setcartItems2(response.data.data)
    const { cartTotal, stripeTotal, discTotal, cartTotalos, discTotalos } =
      calculateCartTotal(response.data.data)
    setCartAmaount(cartTotal)
    setCartAmaountos(cartTotalos)
    setDiscount(cartTotal - discTotal)
    setDiscountos(cartTotalos - discTotalos)
    console.log('360', cartTotalos, discTotalos, cartTotalos)

    localStorage.setItem('discount', cartTotal - discTotal)
    localStorage.setItem('discountos', cartTotalos - discTotalos)
    var t = ((cartAmout - discount) * 18) / 100
  }

  var loc

  setTimeout(() => {
    var loc = localStorage.getItem('country')
    setCountry(loc)
  }, 1000)

  // loyalty
  const [checks, setChecks] = useState(false)
  const [loyalPointsInput, setLoyalPointsInp] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('loyalPoints')
      return stored ? stored : '' // allow string to be controlled in input
    }
    return ''
  })

  const [loyalPointsInputos, setLoyalPointsInpos] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('loyalPoints')
      return stored ? stored : '' // allow string to be controlled in input
    }
    return ''
  })
  const [loyalErr, setLoyalErr] = useState(false)
  const [applyClicked, setApplyClicked] = useState(false)
  const [finalAmount, setFinalAmount] = useState(0)
  const [selectedCartId, setSelectedCartId] = useState(null)

  // handle radio change
  const handleOptionChange = e => {
    setChecks(e.target.value === 'with-points')
    if (e.target.value === 'without-points') {
      if (typeof window != 'undefined') {
        localStorage.removeItem('loyalPoints')
        localStorage.setItem('paynow', 'true')
      }
    }
    setLoyalErr(false)
  }

  const handleOptionChangeOs = e => {
    setChecks2(e.target.value === 'with-points')
    setLoyalErr(false)
    if (e.target.value === 'without-points') {
      if (typeof window != 'undefined') {
        localStorage.removeItem('loyalPointsos')
        localStorage.setItem('paynowos', 'true')
      }
    }
  }
  const baseAmount = cartAmout - discount // ₹40000 - ₹3000 = ₹37000
  const eligiblePoints = Math.min(Number(loyalPointsInput || 0), 5000) // ₹4800
  const afterPoints = baseAmount - eligiblePoints // ₹37000 - ₹4800 = ₹32200
  const gstAmount = Math.round(afterPoints * 0.18) // 18% of ₹32200 = ₹5796
  const finalPayable = afterPoints + gstAmount // ₹32200 + ₹5796 = ₹37996

  const cartLimit = cartItems2.length * 5000
  const finalLimit = Math.min(profilePoints, cartLimit)

  const onLoyalPoints = e => {
    const entered = Number(e.target.value)
    const cap = profilePoints <= 5000 ? profilePoints : 5000

    if (entered <= cap) {
      setLoyalPointsInp(e.target.value)
    } else {
      setLoyalPointsInp(cap.toString())
    }
  }

  const onLoyalPointsOs = e => {
    const entered = Number(e.target.value)
    const cap = profilePoints <= 5000 ? profilePoints : 5000

    if (entered <= cap) {
      setLoyalPointsInpos(e.target.value)
    } else {
      setLoyalPointsInpos(cap.toString())
    }
  }

  useEffect(() => {
    if (!checks) {
      if (typeof window != 'undefined') {
        localStorage.removeItem('loyalPoints')
        localStorage.removeItem('loyalPointsOs')
        setLoyalPointsInp('')
      }
    }
  }, [checks])

  const paynow = e => {
    e.preventDefault()
    localStorage.setItem('loyalPoints', loyalPointsInput)
    localStorage.setItem('paynow', 'true')

    router.push('/checkout')
  }

  const paynowos = e => {
    e.preventDefault()
    localStorage.setItem('loyalPointsos', loyalPointsInputos)
    router.push('/checkout')
  }

  const totalAfterDiscountos = cartAmoutos - discountos // 590
  const usableLoyaltyPointsos = Math.min(
    loyalPointsInputos,
    totalAfterDiscountos
  ) // 590

  console.log('User can use:', usableLoyaltyPointsos) // Output: 590
  const [checks2, setChecks2] = useState(false)

  return (
    <>
      <PageBanner
        pageTitle='Cart'
        homePageUrl='/'
        homePageText='Home'
        activePageText='Cart'
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
      <div style={{ display: !cartItems2.length > 0 ? 'flex' : 'none' }}>
        <EmptyCart />
      </div>
      {/* 132 */}
      <div
        className='cart-area ptbpage'
        style={{
          display: country == 'India' && cartItems2.length > 0 ? 'flex' : 'none'
        }}
      >
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

                <form className='coupon-box'>
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
                >
                  Apply Coupon
                  <span></span>
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

                <li>
                  Total <span>INR {numberWithCommas(cartAmout)}</span>
                </li>
                <li style={{ display: discount > 0 ? 'block' : 'none' }}>
                  - Discount: <span>INR {numberWithCommas(discount)}</span>
                </li>
                <li
                  style={{
                    display: cartAmout - discount > 0 ? 'block' : 'none'
                  }}
                >
                  Amount after Discount
                  <span>INR {numberWithCommas(cartAmout - discount)}</span>
                </li>

                <li
                  style={{
                    display: cartAmout - discount < 0 ? 'block' : 'none'
                  }}
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
                      INR {loyalPointsInput ? numberWithCommas(afterPoints) : 0}{' '}
                    </span>
                  </li>
                )}

                <li>
                  + GST
                  <span
                    style={{
                      display:
                        ((cartAmout - discount) * 18) / 100 == 0
                          ? 'flex'
                          : 'none'
                    }}
                  >
                    INR 0
                  </span>
                  <span
                    style={{
                      display:
                        !loyalPointsInput > 0 &&
                        ((cartAmout - discount) * 18) / 100 !== 0
                          ? 'flex'
                          : 'none'
                    }}
                  >
                    INR {numberWithCommas(((cartAmout - discount) * 18) / 100)}
                  </span>
                  <span
                    style={{
                      display:
                        loyalPointsInput > 0 &&
                        ((cartAmout -
                          discount -
                          Math.min(Number(loyalPointsInput), 5000)) *
                          18) /
                          100 !==
                          0
                          ? 'flex'
                          : 'none'
                    }}
                  >
                    INR{' '}
                    {numberWithCommas(
                      Math.round(
                        (cartAmout -
                          discount -
                          Math.min(Number(loyalPointsInput), 5000)) *
                          0.18
                      )
                    )}
                  </span>
                </li>

                {!checks ? (
                  <>
                    <li
                      style={{ display: discount > -0.0001 ? 'block' : 'none' }}
                    >
                      Final Amount Payable:
                      <span
                        style={{
                          display:
                            cartAmout -
                              discount -
                              (-(cartAmout - discount) * 18) / 100 ==
                            0
                              ? 'flex'
                              : 'none'
                        }}
                      >
                        INR 0
                      </span>
                      <span
                        style={{
                          display:
                            cartAmout -
                              discount -
                              (-(cartAmout - discount) * 18) / 100 !==
                            0
                              ? 'flex'
                              : 'none'
                        }}
                      >
                        INR{' '}
                        {loyalPointsInput
                          ? gstAmount
                          : numberWithCommas(
                              cartAmout -
                                discount -
                                (-(cartAmout - discount) * 18) / 100
                            )}
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      Final Payable After Using Points{' '}
                      <span>INR {numberWithCommas(finalPayable)}</span>
                    </li>
                  </>
                )}
                <ul>
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
                          <span>&nbsp;Payment Option 2</span>
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
                                        loyalPointsInput === 0
                                          ? ''
                                          : loyalPointsInput
                                      }
                                      onChange={onLoyalPoints}
                                      placeholder={`You have ${finalLimit} Loyalty Points`}
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
                                        display: finalLimit == 0 && 'none'
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
                                            display: finalLimit == 0 && 'none'
                                          }}
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
                                      >{`* You currently have 0 Loyalty Points.`}</span>
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
                {cartItems2.length >= 2 && (
                  <>
                    * A maximum of 5,000 Loyalty Points can be used per course.{' '}
                    <br />
                  </>
                )}
              </div>
            </div>
            *
          </form>
        </div>
      </div>
      {/* 231 */}
      <div style={{ display: country != 'Loading' ? 'block' : 'none' }}>
        <div
          className='cart-area ptbpage'
          style={{ display: country != 'India' ? 'flex' : 'none' }}
        >
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
                        <CartItemsos
                          key={cart.id}
                          {...cart}
                          onRemove={() => handleRemove(cart.id)}
                        />
                      ))
                    ) : (
                      <h3>Empty</h3>
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

                  <form className='coupon-box'>
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
                  >
                    Apply Coupon
                  </button>
                </div>

                <div
                  className='cart-totals'
                  style={{
                    float: 'right',
                    'margin-left': '50px',
                    width: '500px'
                  }}
                >
                  <h3>Cart Totals</h3>

                  {!checks2 && (
                    <ul>
                      <li>
                        Total <span>USD {cartAmoutos - discountos}</span>
                      </li>
                    </ul>
                  )}
                  {checks2 && (
                    <ul>
                      <li>
                        Total after using Loyalty Points
                        <span>
                          USD {cartAmoutos - discountos - loyalPointsInputos}
                        </span>
                      </li>
                    </ul>
                  )}

                  {/* <Link href="/checkout">
								<a className="default-btn">
									
									Proceed to Checkout <span></span>
								</a>
							</Link> */}

                  <ul>
                    <li>
                      <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 0
                          }}
                        >
                          <label>
                            <input
                              type='checkbox'
                              id='without-points'
                              name='purchase-option'
                              value='without-points'
                              checked={!checks2}
                              onChange={handleOptionChangeOs}
                            />
                            &nbsp;Payment Option 1
                          </label>
                          <div
                            style={{
                              maxHeight: !checks2 ? '200px' : '0px',
                              overflow: 'hidden',
                              transition: 'max-height 1s ease'
                            }}
                          >
                            {!checks2 && (
                              <Link href='/checkout'>
                                <center>
                                  <button
                                    onClick={() =>
                                      localStorage.removeItem('loyalPointsos')
                                    }
                                    className='default-btn'
                                  >
                                    Pay Now
                                  </button>
                                </center>
                              </Link>
                            )}
                          </div>
                        </div>
                        {/* Payment Option 2 */}
                        <div
                          style={{
                            display: profilePoints != 0 ? 'flex' : 'none'
                          }}
                        >
                          {!checks2 && (
                            <label htmlFor='with-points'>
                              <input
                                width={100}
                                type='checkbox'
                                id='with-points'
                                name='purchase-option'
                                value='with-points'
                                checked={checks2}
                                onChange={handleOptionChangeOs}
                              />
                              <span>&nbsp;Payment Option 2</span>
                            </label>
                          )}

                          <div
                            style={{
                              maxHeight: checks2 ? '400px' : '0px',
                              overflow: 'hidden',
                              transition: 'max-height 1s ease'
                            }}
                          >
                            <div style={{ display: 'flex' }}>
                              {profilePoints != 0 && checks2 && (
                                <>
                                  <form
                                    onSubmit={e => {
                                      e.preventDefault()
                                      // paynowos() will be triggered via the button click
                                    }}
                                    className='cou1-box1'
                                    style={{ marginBottom: 1 }}
                                  >
                                    <div
                                      style={{ display: 'flex', gap: '15px' }}
                                    >
                                      <input
                                        type='number'
                                        className=''
                                        value={
                                          loyalPointsInputos === 0
                                            ? ''
                                            : loyalPointsInputos
                                        }
                                        onChange={onLoyalPointsOs}
                                        placeholder={`You have ${finalLimit} Loyalty Points`}
                                        min='0'
                                        max={finalLimit}
                                        style={{
                                          marginLeft: 3,
                                          width: '280px',
                                          height: '48px',
                                          border: 'none',
                                          borderRadius: '5px',
                                          backgroundColor: '#f5f5f5',
                                          color: '#221638',
                                          fontSize: '16px',
                                          fontWeight: 400,
                                          transition: '0.5s'
                                        }}
                                      />

                                      <div>
                                        <button
                                          onClick={e => paynowos(e)}
                                          className='default-btn'
                                          type='submit'
                                        >
                                          Pay Now
                                        </button>
                                      </div>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
