import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import PageBanner from '../../components/Common/PageBanner'
import { calculateCartTotal } from '@/utils/calculateCartTotal'
import CartItems from '@/components/Cart/CartItems'
import CartItemsos from '@/components/Cart/CartItemsos'
import axios from 'axios'
import moment from 'moment'
import Router from 'next/router'

import Alert from 'react-popup-alert'

import Preloader from '../../components/_App/Preloader'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

const ExtraCart = ({ user }) => {
  const router = useRouter()
  const [slugArray, setSlugArray] = useState(router.query.slug)
  // const slugArray = router.query.slug;

  // const setIuserid = router.pathname.startsWith(`/extracart/1/LVC/74000/37000`);

  useEffect(() => {
    setSlugArray(router.query.slug)
  }, [router])

  console.log('Slug from URL:', slugArray)
  console.log('slugArray 1', slugArray[0])
  const courseId = slugArray[0]
  const courseType = slugArray[1]
  const Price = slugArray[2]
  const Discount = slugArray[3]
  console.log(courseId)
  console.log(courseType)
  console.log(Price)
  console.log(Discount)

  const dispatch = useDispatch()
  const [cartAmout, setCartAmaount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountos, setDiscountos] = useState(0)
  const [country, setCountry] = useState('Loading')
  const [cartAmoutos, setCartAmaountos] = useState(0)
  var fetchid = 0
  const [cartItems2, setcartItems2] = useState([0])
  const [coupona, setCoupona] = useState(0)
  // const country = "china";

  const [loading, setLoading] = React.useState(false)

  const [coupon, setCoupon] = React.useState({ coupon: '' })

  const [headertext, setHeadertext] = useState(0)
  const [btntext, setBtntext] = useState(0)

  const [filteredCourse, setFilteredCourse] = useState(null)

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


  useEffect(() => {
    if (data.length > 0) {
      setcourseName(data[0].video_url);
      setcrumbName(data[0].name);
      setCourseaid(data[0].course_id);
      setVideoId(data[0].video_url);
      setPdfId(data[0].pdf_url);
      setsubjectId(data[0].id);
    }
  }, [data]);
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
  }, [router])

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

  // useEffect(() => {
  // 	// Fetch the courses from the API
  // 	axios.get('https://winupskill.in/api/api/courses')
  // 	  .then(response => {
  // 		const courses = response.data.data;
  // 		const filteredCourse = courses.find(course => course.id === parseInt(courseId));
  //         console.log("cid", filteredCourse);
  // 		if (filteredCourse) {
  // 		  console.log('Filtered Course:', filteredCourse);
  // 		  // Automatically add the course to the cart
  // 		  postCartapi(courseId, filteredCourse);
  // 		} else {
  // 		  console.log('Course not found for the given courseId.');
  // 		}
  // 	  })
  // 	  .catch(error => {
  // 		console.error('Error fetching courses:', error);
  // 	  });
  // }, [courseId, courseType, Price, Discount]);

  useEffect(() => {
    // Fetch the courses from the API
    if (courseId && courseType && Price && Discount) {
      axios
        .get(`https://winupskill.in/api/api/courses/${courseId}`)
        .then(response => {
          const filteredCourse = response.data.data
          console.log('Filtered Course:', filteredCourse)
          // Automatically add the course to the cart
          postCartapi(courseId, filteredCourse)
          setFilteredCourse(filteredCourse)
        })
        .catch(error => {
          console.error('Error fetching courses:', error)
        })
    }
    makeid()
  }, [courseId, courseType, Price, Discount])

  function makeid (length) {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
    ;``
  }

  useLayoutEffect(() => {
    postCartapi()
  }, [])

  const postCartapi = async (courseId, filteredCourse) => {
    var tempuid = localStorage.getItem('tempuserid')
    if (tempuid) {
    } else {
      var tempuids = makeid(12)
      localStorage.setItem('tempuserid', tempuids)
    }
    var uuid2 = localStorage.getItem('userid')

    const tempcartdata = new FormData()
    var tt = ':'
    const priceOsValue = (Price / 66.34).toFixed(2)
    const discountedpriceOsValue = Discount / 66.34
    tempcartdata.append('course_id', courseId)
    tempcartdata.append('item_name', `${courseType}${tt}${filteredCourse.name}`)
    tempcartdata.append('item_qty', '1')
    tempcartdata.append('price', Price)
    tempcartdata.append('priceos', priceOsValue)
    tempcartdata.append('tempuserid', tempuid)
    tempcartdata.append('image', filteredCourse.image)
    tempcartdata.append('type', courseType)
    tempcartdata.append('discountedprice', Discount)
    tempcartdata.append('discountedpriceos', discountedpriceOsValue)
    tempcartdata.append('utm_source', cookie.get('utm_source'))
    tempcartdata.append('utm_source_current', cookie.get('utm_source_current'))
    if (uuid2) {
      tempcartdata.append('user_id', uuid2)
    }

    try {
      const response = await axios.post(
        'https://winupskill.in/api/api/cartitems',
        tempcartdata
      )
      if (response.status === 200 || response.status === 201) {
        console.log('Course added to cart successfully.')
        getcartitems()
      }
    } catch (error) {
      console.error('Error adding course to cart:', error)
    }
  }

  const handleRemove = async cartId => {
    // // console.log(cartId);
    // dispatch({
    // 	type: "REMOVE_CART",
    // 	id: cartId,
    // });

    try {
      setLoading(true)

      event.preventDefault()
      const url = `https://winupskill.in/api/api/cartitems/${cartId}`
      await axios.delete(url).then(response => {
        getcartitems()
        setLoading(false)
      })
    } catch (error) {
      console.log('There was an error!', error)
    } finally {
      //setLoading(false);
    }
  }

  const applycoupon = async e => {
    event.preventDefault()
    const url = `https://winupskill.in/api/api/coupons?code=${coupon}`
    const response = await axios.get(url)
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
                      0,
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
    var nosubflag = 0
    var counter = 0
    var discountedprice = 0
    var tempdsc = 0

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
          cartitemedit(el.id, coupon, el.price, discountedprice)
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

  async function cartitemedit (cartid, coupon, price, discountedprice) {
    axios
      .put(`https://winupskill.in/api/api/cartitems/${cartid}`, {
        coupon: coupon,
        discountedprice: discountedprice
      })
      .then(response => {
        //getcartitems();
      })
  }

  const getcartitems = async () => {
    var tempuid = localStorage.getItem('tempuserid')
    const url = `https://winupskill.in/api/api/cartitems?tempuserid=${tempuid}`
    const response = await axios.get(url)
    setcartItems2(response.data.data)
    const { cartTotal, stripeTotal, discTotal, cartTotalos, discTotalos } =
      calculateCartTotal(response.data.data)
    setCartAmaount(cartTotal)
    setCartAmaountos(cartTotalos)
    setDiscount(cartTotal - discTotal)
    setDiscountos(cartTotalos - discTotalos)

    localStorage.setItem('discount', cartTotal - discTotal)
    localStorage.setItem('discountos', cartTotalos - discTotalos)
    var t = ((cartAmout - discount) * 18) / 100
  }

  var loc

  setTimeout(() => {
    var loc = localStorage.getItem('country')
    setCountry(loc)
  }, 1000)

  return (
    <>
      <PageBanner
        pageTitle='Cart'
        homePageUrl='/'
        homePageText='Home'
        activePageText='Additional Cart'
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

      <div
        className='cart-area ptbpage'
        style={{ display: country == 'India' ? 'flex' : 'none' }}
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
                  width: '500px'
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
                          ((cartAmout - discount) * 18) / 100 !== 0
                            ? 'flex'
                            : 'none'
                      }}
                    >
                      INR{' '}
                      {numberWithCommas(((cartAmout - discount) * 18) / 100)}
                    </span>
                  </li>

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
                      {numberWithCommas(
                        cartAmout -
                          discount -
                          (-(cartAmout - discount) * 18) / 100
                      )}
                    </span>
                  </li>
                </ul>

                <Link href='/checkout'>
                  <a className='default-btn' style={{ paddingLeft: '20px' }}>
                    Proceed to Checkout <span></span>
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

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
                    <span></span>
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

                  <ul>
                    <li>
                      Total <span>USD {cartAmoutos - discountos}</span>
                    </li>
                  </ul>

                  <Link href='/checkout'>
                    <a className='default-btn'>
                      Proceed to Checkout <span></span>
                    </a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExtraCart
