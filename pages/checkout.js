import React, { useState, useEffect } from 'react'
import CheckoutBtn from '@/components/CheckoutButton/CheckoutBtn'
import CheckoutBtn2 from '@/components/CheckoutButton/CheckoutBtn2'
import { useSelector, useDispatch } from 'react-redux'
import PageBanner from '../components/Common/PageBanner'
import { calculateCartTotal } from '@/utils/calculateCartTotal'
import LoadingSpinner from '@/utils/LoadingSpinner'
import axios from 'axios'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

const INITIAL_USER2 = {
  name: '',
  email: '',
  mobile: '',
  address: '',
  country2: '',
  state: ''
}

const Checkout = ({ user }) => {
  const router = useRouter()

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const token = localStorage.getItem('token')
  //     if (!token) {
  //       router.push('/authentication')
  //       localStorage.setItem('wlp','yes')
  //     }
  //   }
  // }, [router])
  const cartItems = useSelector(state => state.cart.cartItems)
  const [cartAmout, setCartAmaount] = useState(0)
  const dispatch = useDispatch()
  const [country, setCountry] = useState('Loading')
  const [cartAmoutos, setCartAmaountos] = useState(0)
  const [loading, setLoading] = React.useState(false)
  const [user2, setUser2] = React.useState(INITIAL_USER2)
  const [cartItems2, setcartItems2] = useState([0])
  const [discount, setDiscount] = useState(0)
  const [uuid, setUuid] = useState(0)
  const [pbl, setPbl] = useState(0)
  const [usedcoupon, setUsedcoupon] = useState('')
  const [discountos, setDiscountos] = useState(0)
  const [error, setError] = useState(false)
  const [loyalPointsInput, setLoyalPoints] = useState(
    typeof window != 'undefined' && localStorage.getItem('loyalPoints')
  )
  const [loyalPointsInputos] = useState(
    typeof window != 'undefined' && localStorage.getItem('loyalPointsos')
  )

  const loyaltyGst =
    ((cartAmout - discount - Math.min(Number(loyalPointsInput) || 0, 5000)) *
      18) /
    100

  useEffect(() => {
    getcartitems()

    //		const { cartTotal, stripeTotal, cartTotalos } = calculateCartTotal(cartItems);
    //	setCartAmaount(cartTotal);
    //	localStorage.setItem('cartTotal', (cartTotal-(-cartTotal*18/100)));
    //	setCartAmaountos(cartTotalos);
    //	localStorage.setItem('cartAmoutos', cartAmoutos);

    setTimeout(() => {
      setLoading(true)
      var loc = localStorage.getItem('country')
      setCountry(loc)
      INITIAL_USER2.country2 = loc
      INITIAL_USER2.state = localStorage.getItem('state')
      setDiscount(localStorage.getItem('discount'))
      setUuid(localStorage.getItem('userid'))

      setLoading(false)
    }, 1000)
  }, [cartItems])

  const onClearCart = () => {
    dispatch({
      type: 'RESET_CART'
    })
  }

  function numberWithCommas (x) {
    if (x == null || isNaN(x)) return '0'
    return Number(x).toLocaleString('en-IN', {
      maximumFractionDigits: 0
    })
  }

  const handleChange = e => {
    const { name, value } = e.target

    // Check if the value contains an @ symbol
    if (name === 'email' && value.includes('@')) {
      setError(false) // Clear the error if @ is present
    } else if (name === 'email') {
      setError(true) // Show error if @ is missing
    }

    setUser2(prevState => ({ ...prevState, [name]: value }))
  }

  var loc

  const getcartitems = async () => {
    var tempuid = localStorage.getItem('tempuserid')
    const url = `https://winupskill.in/api/api/cartitems?tempuserid=${tempuid}`
    const response = await axios.get(url)
    // console.log('96', response.data.data)
    setcartItems2(response.data.data)
    setUsedcoupon(response.data.data[0].coupon)
    const { cartTotal, stripeTotal, discTotal, cartTotalos, discTotalos } =
      calculateCartTotal(response.data.data)
    setCartAmaount(cartTotal)
    setCartAmaountos(cartTotalos)
    setDiscount(cartTotal - discTotal)
    setDiscountos(cartTotalos - discTotalos)
    localStorage.setItem('discount', cartTotal - discTotal)
    localStorage.setItem('cartTotal', cartTotal - (-cartTotal * 18) / 100)
    localStorage.setItem('cartAmoutos', cartAmoutos)
    setPbl(
      Number(
        (
          cartTotal -
          (cartTotal - discTotal) -
          (-(cartTotal - (cartTotal - discTotal)) * 18) / 100
        ).toFixed(0)
      )
    )

    //setPbl(((cartTotal - (cartTotal-discTotal))-(-(cartTotal - (cartTotal-discTotal))*18/100)));
  }

  if (uuid == undefined) {
  } else {
    INITIAL_USER2.name = user2.name
    INITIAL_USER2.email = user2.email
    INITIAL_USER2.mobile = user2.mobile
  }

  const baseAmount = cartAmout - discount // ₹40000 - ₹3000 = ₹37000
  const eligiblePoints = Math.min(Number(loyalPointsInput || 0), 5000) // ₹4800
  const afterPoints = baseAmount - eligiblePoints // ₹37000 - ₹4800 = ₹32200
  const gstAmount = Math.round(afterPoints * 0.18) // 18% of ₹32200 = ₹5796
  const finalPayable = afterPoints + gstAmount // ₹32200 + ₹5796 = ₹37996
  const totalDiscount = cartAmout - afterPoints

  const baseAmountos = cartAmoutos - discountos
  const eligiblePointsOS = Math.min(Number(loyalPointsInputos || 0), 5000)
  const afterPointsos = baseAmountos - eligiblePointsOS

  console.log('eligiblePointsOSs', afterPointsos)
  return (
    <React.Fragment>
      <PageBanner
        pageTitle='Checkout'
        homePageUrl='/'
        homePageText='Home'
        activePageText='Checkout'
      />

      <div
        className='checkout-area ptbpage'
        style={{ display: country == 'India' ? 'flex' : 'none' }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 col-md-12'>
              <div className='order-details'>
                <h3 className='title'>Your Order</h3>

                <div className='order-table table-responsive'>
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th scope='col'>Product Name</th>
                        <th scope='col'>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems2.map(cart => (
                        <tr key={cart.id}>
                          <td className='product-name'>{cart.item_name}</td>

                          <td className='product-total'>
                            <span className='subtotal-amount'>
                              INR {numberWithCommas(cart.price)}
                            </span>
                          </td>
                        </tr>
                      ))}

                      <tr
                        style={{ display: discount > 0 ? 'contents' : 'none' }}
                      >
                        <td className='product-name'>
                          <span>- Discount</span>
                        </td>

                        <td className='product-total'>
                          <span
                            className='subtotal-amount'
                            style={{ display: discount == 0 ? 'flex' : 'none' }}
                          >
                            INR 0
                          </span>
                          <span
                            className='subtotal-amount'
                            style={{
                              display: discount !== 0 ? 'flex' : 'none'
                            }}
                          >
                            INR {numberWithCommas(discount)}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className='total-price'>
                          <span>Courses Total</span>
                        </td>

                        <td className='product-total'>
                          <span
                            className='subtotal-amount'
                            style={{
                              display:
                                cartAmout - discount == 0 ? 'flex' : 'none'
                            }}
                          >
                            INR 0
                          </span>
                          <span
                            className='subtotal-amount'
                            style={{
                              display:
                                cartAmout - discount !== 0 ? 'flex' : 'none'
                            }}
                          >
                            INR {numberWithCommas(cartAmout - discount)}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td
                          className='total-price'
                          style={{ display: loyalPointsInput ? '' : 'none' }}
                        >
                          <span>Amount After Discount with Loyalty Points</span>
                        </td>

                        <td
                          className='product-total'
                          style={{ display: loyalPointsInput ? '' : 'none' }}
                        >
                          <span className='subtotal-amount'>
                            INR{' '}
                            {loyalPointsInput
                              ? numberWithCommas(afterPoints)
                              : 0}{' '}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className='product-name'>
                          <span>+ GST</span>
                        </td>

                        <td className='subtotal-amount'>
                          <span
                            className='subtotal-amount'
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
                            className='subtotal-amount'
                            style={{
                              display:
                                ((cartAmout - discount) * 18) / 100 !== 0
                                  ? 'flex'
                                  : 'none'
                            }}
                          >
                            INR{' '}
                            {numberWithCommas(
                              loyaltyGst || ((cartAmout - discount) * 18) / 100
                            )}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className='total-price'>
                          <span>Total Payable</span>
                        </td>

                        <td className='product-subtotal'>
                          <span
                            className='subtotal-amount'
                            style={{ display: pbl == 0 ? 'flex' : 'none' }}
                          >
                            INR 0
                          </span>
                          <span
                            className='subtotal-amount'
                            style={{ display: pbl !== 0 ? 'flex' : 'none' }}
                          >
                            INR{' '}
                            {loyalPointsInput
                              ? numberWithCommas(finalPayable)
                              : numberWithCommas(pbl)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div
                    className='checkut-form-group'
                    style={{ marginTop: '30px' }}
                  >
                    <h4>
                      Please fill your details to continue with the checkout:
                    </h4>

                    <p
                      style={{
                        display:
                          uuid == undefined || typeof uuid === 'undefined'
                            ? 'contents'
                            : 'none'
                      }}
                    >
                      <label style={{ margin: 5 }} htmlFor='test2'>
                        These details will be used to create your account in our
                        LMS and course access will be assigned to the provided
                        email id.
                      </label>
                    </p>

                    <form style={{}}>
                      <div style={{ display: 'inline-flex' }}>
                        <div className='form-group'>
                          <input
                            className='form-control-checkout'
                            placeholder='Name'
                            name='name'
                            type='name'
                            value={user2.name}
                            onChange={handleChange}
                            style={{}}
                          />
                        </div>

                        <div className='form-group'>
                          <input
                            className='form-control-checkout'
                            placeholder='Email'
                            name='email'
                            type='email'
                            required
                            value={user2.email}
                            onChange={handleChange}
                          />
                        </div>

                        <div
                          className='form-group'
                          style={{
                            margin: '0px !important'
                          }}
                        >
                          <input
                            className='form-control-checkout'
                            placeholder='Mobile'
                            name='mobile'
                            type='mobile'
                            value={user2.mobile}
                            onChange={handleChange}
                            style={{}}
                            // onInput={(e) => {
                            //   // Allows only digits (0-9) and plus sign (+)
                            //   e.target.value = e.target.value.replace(
                            //     /[^0-9+]/g,
                            //     ""
                            //   );
                            // }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'inline-flex' }}>
                        <div
                          className='form-group'
                          style={{
                            margin: '0px !important',
                            position: 'relative'
                          }}
                        >
                          <label
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '10px',
                              transform: 'translateY(-50%)',
                              fontSize: '14px',
                              color: '#555'
                            }}
                          >
                            Your Country:
                          </label>

                          <input
                            className='form-control-checkout3'
                            placeholder='Country'
                            name='country2'
                            type='country'
                            value={user2.country2}
                            onChange={handleChange}
                            style={{
                              paddingLeft: '100px'
                            }}
                            disabled={true}
                          />
                        </div>

                        <div
                          className='form-group'
                          style={{
                            margin: '0px !important',
                            position: 'relative'
                          }}
                        >
                          <label
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '10px',
                              transform: 'translateY(-50%)',
                              fontSize: '14px',
                              color: '#555'
                            }}
                          >
                            Your State:
                          </label>

                          <input
                            className='form-control-checkout3'
                            placeholder='Your State'
                            name='state'
                            type='state'
                            value={user2.state}
                            onChange={handleChange}
                            style={{
                              paddingLeft: '100px'
                            }}
                          />
                        </div>

                        <div
                          className='form-group hideonmob'
                          style={{
                            margin: '0px !important'
                          }}
                        >
                          <input
                            className='form-control-checkout2'
                            placeholder='Complete Address'
                            name='address'
                            type='address'
                            value={user2.address}
                            onChange={handleChange}
                            style={{}}
                          />
                        </div>
                      </div>

                      <div
                        className='form-group hideonweb'
                        style={{
                          margin: '0px !important'
                        }}
                      >
                        <input
                          className='form-control-checkout4'
                          placeholder='Complete Address'
                          name='address'
                          type='address'
                          value={user2.address}
                          onChange={handleChange}
                          style={{}}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                {error ? (
                  'Please enter the details correctly'
                ) : (
                  <CheckoutBtn
                    loyaltyGst={loyaltyGst}
                    addpoint={cartAmout - discount}
                    afterPoints={afterPoints}
                    loyalpointswithPrice={finalPayable ? finalPayable : pbl}
                    user={user2}
                    total={cartAmout}
                    cartItems={cartItems2}
                    disc={discount}
                    gst={((cartAmout - discount) * 18) / 100}
                    payable={pbl}
                    coupon={usedcoupon}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className='checkout-area ptbpage'
        style={{ display: country != 'Loading' ? 'block' : 'none' }}
      >
        <div
          className='checkout-area ptbpage'
          style={{ display: country != 'India' ? 'flex' : 'none' }}
        >
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 col-md-12'>
                <div className='order-details'>
                  <h3 className='title'>Your Order</h3>

                  <div className='order-table table-responsive'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th scope='col'>Product Name</th>
                          <th scope='col'>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cartItems2.map(cart2 => (
                          <tr key={cart2.id}>
                            <td className='product-name'>
                              <a href='#'>{cart2.item_name}</a>
                            </td>

                            <td className='product-total'>
                              <span className='subtotal-amount'>
                                {cart2.discountedpriceos > 0 ? (
                                  <span>USD {cart2.discountedpriceos}</span>
                                ) : (
                                  <span>USD {cart2.priceos}</span>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td className='total-price'>
                            <span>
                              {loyalPointsInputos
                                ? 'Order Total After Discount with Loyalty Points'
                                : 'Order Total'}
                            </span>
                          </td>

                          <td className='product-subtotal'>
                            <span className='subtotal-amount'>
                              USD{' '}
                              {afterPointsos
                                ? afterPointsos
                                : cartAmoutos - discountos}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className='checkut-form-group'>
                      <form style={{}}>
                        <div className='form-group'>
                          <input
                            className='form-control'
                            placeholder='Name'
                            name='name'
                            type='name'
                            value={user2.name}
                            onChange={handleChange}
                            style={{}}
                          />
                        </div>

                        <div className='form-group'>
                          <input
                            className='form-control'
                            placeholder='Email'
                            name='email'
                            type='email'
                            value={user2.email}
                            onChange={handleChange}
                            style={{}}
                          />
                        </div>

                        <div
                          className='form-group'
                          style={{
                            margin: '0px !important'
                          }}
                        >
                          <input
                            className='form-control'
                            placeholder='Mobile'
                            name='mobile'
                            type='mobile'
                            value={user2.mobile}
                            onChange={handleChange}
                            style={{}}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  {error ? (
                    'Please enter the details correctly'
                  ) : (
                    <CheckoutBtn2
                      afterPointsos={afterPointsos}
                      price={cartAmoutos - discountos}
                      cartItems={cartItems2}
                      disc={discountos}
                      user={user2}
                      coupon={usedcoupon}
                      total={cartAmoutos}
                      loyalPointsInputos={loyalPointsInputos}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Checkout
