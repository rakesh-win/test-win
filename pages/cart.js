import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import PageBanner from '../components/Common/PageBanner'
import { calculateCartTotal } from '@/utils/calculateCartTotal'
import CartItems from '@/components/Cart/CartItems'
import CartItemsos from '@/components/Cart/CartItemsos'
import axios from 'axios'
import moment from 'moment'
import Router from 'next/router'

import Alert from 'react-popup-alert'

import Preloader from '../components/_App/Preloader'
import cookie from 'js-cookie'
import EmptyCart from '@/components/Cart/EmptyCart'
import dynamic from 'next/dynamic'
const INRcart = dynamic(() => import('@/components/Cart/INRcart'))
import USDcart from '@/components/Cart/USDcart'

const Cart = ({ user }) => {
  const dispatch = useDispatch()
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

  const handleRemove = async cartId => {
    // // console.log(cartId);
    // dispatch({
    // 	type: "REMOVE_CART",
    // 	id: cartId,
    // });

    try {
      setLoading(true)
      event.preventDefault()
      const url = `${process.env.NEXT_PUBLIC_API}/cartitems/${cartId}`
      await axios.delete(url).then(response => {
        getcartitems()
        Router.replace(Router.asPath)
        setLoading(false)
      })
    } catch (error) {
      console.log('There was an error!', error)
    } finally {
      //setLoading(false);
    }
  }

  const applycoupon = async e => {
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
            // console.log('282', osoff)
            discountedpriceos = el.priceos - osoff
            // console.log('284', el.priceos, osoff)
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
    // console.log('327', discountedpriceos)

    // let points = 0

    // // Apply loyalty points only if provided and greater than 0
    // if (lpoints && lpoints > 0) {
    //   points = lpoints
    // }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/cartitems/${cartid}`, {
        coupon: coupon,
        discountedprice: discountedprice,
        discountedpriceos: discountedpriceos
        // points
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
    // console.log('360', cartTotalos, discTotalos, cartTotalos)
    console.log('tempUser', response.data.data)
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
  const [loyalPointsInput, setLoyalPointsInp] = useState('')
  const [loyalPointsInputos, setLoyalPointsInpos] = useState('')

  const getStoredValue = key => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || ''
    }
    return ''
  }

  useEffect(() => {
    setLoyalPointsInp(getStoredValue('loyalPoints'))
    setLoyalPointsInpos(getStoredValue('loyalPointsos'))
  }, [])
  useEffect(() => {
    if (!checks) {
      if (typeof window != 'undefined') {
        localStorage.removeItem('loyalPoints')
        localStorage.removeItem('loyalPointsOs')
        setLoyalPointsInp('')
      }
    }
  }, [checks])

  const [loyalErr, setLoyalErr] = useState(false)
  const [applyClicked, setApplyClicked] = useState(false)
  const [finalAmount, setFinalAmount] = useState(0)
  const [selectedCartId, setSelectedCartId] = useState(null)

  // handle radio change

  const baseAmount = cartAmout - discount // ₹40000 - ₹3000 = ₹37000
  const eligiblePoints = Math.min(Number(loyalPointsInput || 0), 5000) // ₹4800
  const afterPoints = Number(baseAmount) - Number(eligiblePoints) // ₹37000 - ₹4800 = ₹32200

  const gstAmount = Math.round(afterPoints * 0.18) // 18% of ₹32200 = ₹5796
  const finalPayable = afterPoints + gstAmount // ₹32200 + ₹5796 = ₹37996
  const cartLimit = cartItems2.length * 5000
  const finalLimit = Math.min(profilePoints, cartLimit)

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
          display:
            country == 'India' && cartItems2.length > 0 ? 'block' : 'none'
        }}
      >
        <INRcart
          cartItems2={cartItems2}
          cartAmout={cartAmout}
          discount={discount}
          checks={checks}
          loyalPointsInput={loyalPointsInput}
          country={country}
          profilePoints={profilePoints}
          setChecks={setChecks}
          setLoyalErr={setLoyalErr}
          finalPayable={finalPayable}
          finalLimit={finalLimit}
          setLoyalPointsInp={setLoyalPointsInp}
          handleRemove={handleRemove}
          afterPoints={afterPoints}
          gstAmount={gstAmount}
          setCoupon={setCoupon}
          applycoupon={applycoupon}
          coupon={coupon}
        />
      </div>
      {/* 231 */}
      <div
        style={{
          display:
            country !== 'Loading' && cartItems2.length > 0 ? 'block' : 'none'
        }}
      >
        <USDcart
          applycoupon={applycoupon}
          handleRemove={handleRemove}
          cartItems2={cartItems2}
          cartAmoutos={cartAmoutos}
          country={country}
          CartItemsos={CartItemsos}
          checks2={checks2}
          discountos={discountos}
          profilePoints={profilePoints}
          setChecks2={setChecks2}
          loyalPointsInputos={loyalPointsInputos}
          setLoyalPointsInpos={setLoyalPointsInpos}
          finalLimit={finalLimit}
          setLoyalErr={setLoyalErr}
          cartAmout={cartAmout}
          discount={discount}
          finalPayable={finalPayable}
          loyalPointsInput={loyalPointsInput}
          setCoupon={setCoupon}
          coupon={coupon}
        />
      </div>
    </>
  )
}

export default Cart
