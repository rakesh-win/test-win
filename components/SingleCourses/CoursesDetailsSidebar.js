import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const ModalVideo = dynamic(import('react-modal-video'))
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import { useRouter } from 'next/router'

import cookie from 'js-cookie'
import Alert from 'react-popup-alert'
import { useSelector, useDispatch } from 'react-redux'

import Preloader from '../../components/_App/Preloader'

const CoursesDetailsSidebar = ({
  id,
  name,
  image,
  badgeimage,
  description,
  price,
  overseasprice,
  displayprice,
  displayoverseasprice,
  duration,
  previewurl,
  flag,
  type
}) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [country, setCountry] = useState('Loading')
  const [token, setToken] = useState()
  const [headertext, setHeadertext] = useState(0)
  const [btntext, setBtntext] = useState(0)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })

  useEffect(() => {
    const loc = localStorage.getItem('country')
    setCountry(loc || 'India')
  }, [])

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  function numberWithCommas (x) {
    if (x) return Number(x).toLocaleString()
  }

  function onCloseAlert () {
    setAlert({ type: '', text: '', show: false })
  }

  function onShowAlert (type, text) {
    setAlert({ type, text, show: true })
  }

  function makeid (length) {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const sendtoEnquiry = (courseId, name) => {
    cookie.set('enquirecourseId', courseId)
    cookie.set('enquirecourseName', name)
    router.push('/enquiry')
  }

  const getUser = async () => {
    const payload = {
      headers: { Authorization: 'Bearer ' + token }
    }
    const url = `https://winupskill.in/api/api/users`
    if (token) {
      try {
        const result = await axios.get(url, payload)
        postquery(result.data.name, result.data.email, result.data.mobile)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
  }

  const postquery = async (name2, mail2, mob2) => {
    try {
      setLoading(true)
      const url = `https://winupskill.in/api/api/formitems`
      const payload = {
        name: name2,
        email: mail2,
        mobile: mob2,
        page: name,
        form: 'Needinfo',
        message: 'Logged-in user'
      }
      await axios.post(url, payload)
      setHeadertext('Thank You!')
      setBtntext('Close')
      onShowAlert(
        'success',
        'We have received your call back request. Our team will get in touch with you based on the contact information available in your profile.'
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const sendtocoursepage = () => {
    router.push(`/my-courses/view/${id}`)
  }

  const postCartapi = async (
    courseId,
    name,
    image,
    price,
    priceos,
    duration
  ) => {
    let tempuid = localStorage.getItem('tempuserid')
    if (!tempuid) {
      tempuid = makeid(12)
      localStorage.setItem('tempuserid', tempuid)
    }

    const uuid2 = localStorage.getItem('userid')
    const tempcartdata = new FormData()
    tempcartdata.append('course_id', courseId)
    tempcartdata.append('item_name', name)
    tempcartdata.append('item_qty', '1')
    tempcartdata.append('price', price)
    tempcartdata.append('tempuserid', tempuid)
    tempcartdata.append('image', image)
    tempcartdata.append('priceos', priceos)
    tempcartdata.append('duration', duration)

    if (uuid2) {
      tempcartdata.append('user_id', uuid2)
    }

    try {
      const result = await axios.post(
        'https://winupskill.in/api/api/cartitems',
        tempcartdata
      )
      if (result.status === 200 || result.status === 201) {
        router.push('/cart')
      }
    } catch (error) {
      console.error('Cart API Error:', error)
    }
  }

  const addToCart = (courseId, name, image, price, priceos, duration, mode) => {
    let courseObj = {
      id: courseId,
      name: `${mode}: ${name}`,
      image,
      price,
      priceos,
      duration,
      quantity: 1
    }
    dispatch({ type: 'ADD_TO_CART', data: courseObj })
    postCartapi(courseId, `${mode}: ${name}`, image, price, priceos, duration)
  }

  return (
    <>
      <div className='courses-details-info'>
        <div className='image'>
          <img src={badgeimage} alt={name} />
        </div>

        <ul className='info'>
          <li>
            <div className='d-flex justify-content-between align-items-center'>
              <span>Duration</span>
              {duration}
            </div>
          </li>
          <li>
            <div className='d-flex justify-content-between align-items-center'>
              <span>Access</span>
              Lifetime
            </div>
          </li>

          {(type === 'quiz' || type === 'crs-free') && (
            <li className='price'>
              <div className='d-flex justify-content-between align-items-center'>
                <span>Price</span>
                {country !== 'India' ? (
                  <span style={{ display: 'flex' }}>
                    USD{' '}
                    <span className='strikeprice'>{displayoverseasprice}</span>
                    {numberWithCommas(overseasprice)}
                  </span>
                ) : (
                  <span style={{ display: 'flex' }}>
                    INR <span className='strikeprice'>{displayprice}</span>
                    {numberWithCommas(price)}
                  </span>
                )}
              </div>
            </li>
          )}
        </ul>

        {(type === 'quiz' || type === 'crs-free') && (
          <div className='btn-box'>
            <center>
              <button
                className='default-btn'
                onClick={() =>
                  addToCart(
                    id,
                    name,
                    image,
                    price,
                    overseasprice,
                    duration,
                    'Self-paced'
                  )
                }
              >
                Add to cart
              </button>
            </center>
          </div>
        )}

        {type === 'quiz' && (
          <div className='courses-share'>
            <button
              className='showbtnastext'
              onClick={() => sendtoEnquiry(id, name)}
            >
              Need more Info <span></span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CoursesDetailsSidebar
