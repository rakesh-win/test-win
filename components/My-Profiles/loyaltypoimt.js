import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { makeid } from '@/utils/makeid'
import LoyalFaq from '../Loyaltypoints/LoyaltyFaq'
import Loyalsidebardlayout from '../Loyaltypoints/Loyalsidebardlayout'

const Alert = dynamic(() => import('react-popup-alert'), { ssr: false })

function LoyalityPoints () {
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedMode, setSelectedMode] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [country, setCountry] = useState('')
  const [userId, setUserId] = useState(null)
  const [showOkButton, setShowOkButton] = useState(false)

  const [alert, setAlert] = useState({
    type: '',
    text: '',
    show: false
  })

  const router = useRouter()

  const showAlert = (text, type = 'success') => {
    setAlert({
      type,
      text,
      show: true
    })
  }

  const hideAlert = () => {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  useEffect(() => {
    const localUserId =
      typeof window !== 'undefined'
        ? Number(localStorage.getItem('userid'))
        : null
    setUserId(localUserId)

    if (typeof window !== 'undefined') {
      const ctry = localStorage.getItem('country')
      setCountry(ctry)
    }

    const fetchData = async () => {
      try {
        const [coursesRes, enrolledRes] = await Promise.all([
          axios.get('https://winupskill.in/api/api/courses'),
          axios.get('https://winupskill.in/api/api/enrolled')
        ])

        const allCourses = coursesRes.data?.data || []
        const enrolled = enrolledRes.data?.data || []

        const userEnrolledCourseIds = enrolled
          .filter(e => Number(e.user_id) === Number(userId))
          .map(e => Number(e.course_id))

        const loyaltyCourses = allCourses.filter(course => {
          const courseId = Number(course.id)
          const isLoyal = Number(course.loyalpoint) === 1
          const isNotEnrolled = !userEnrolledCourseIds.includes(
            parseInt(courseId)
          )
          return isLoyal && isNotEnrolled
        })

        setFilteredCourses(loyaltyCourses)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (localUserId) {
      fetchData()
    }
  }, [])

  const handleSelect = (course, actionType) => {
    setSelectedCourse({ course, actionType })
    setShowModal(true)
    setSelectedMode('')
    setShowOkButton(false)
  }

const getpricesforthis = async id => {
    try {
      const url = `https://winupskill.in/api/api/courseprices?courseid=${id}`
      const response = await axios.get(url)
      const data = response?.data?.data?.[0]

      if (!data) return {}
      return {
        lvcindiadiscprice: data.lvcindiadiscprice,
        lvcosdiscprice: data.lvcosdiscprice,
        elearningindiadiscprice: data.elearningindiadiscprice,
        elearningosdiscprice: data.elearningosdiscprice
      }
    } catch (error) {
      console.error('Error fetching prices:', error)
      return {}
    }
  }
const handleFinalOk = async () => {
    setShowOkButton(true)
    if (!selectedCourse || !selectedMode) return

    const oneCourse = selectedCourse.course
    const action = selectedCourse.actionType

    // ✅ Fetch prices
    const {
      lvcindiadiscprice,
      lvcosdiscprice,
      elearningindiadiscprice,
      elearningosdiscprice
    } = await getpricesforthis(oneCourse.id)

    // ✅ Determine prices based on selected mode
    const price =
      selectedMode === 'LVC' ? lvcindiadiscprice : elearningindiadiscprice
    const priceos =
      selectedMode === 'LVC' ? lvcosdiscprice : elearningosdiscprice

    const courseData = {
      courseId: oneCourse.id,
      name: `${oneCourse.name}`,
      image: oneCourse.image,
      price,
      priceos,
      duration: oneCourse.duration,
      mode: selectedMode,
      loyalty: oneCourse.loyalpoint,
      inrprice: oneCourse.INRexam,
      usdpirce: oneCourse.USDexam
    }

    const shouldNavigate = action === 'buy'

    postCartapi({ ...courseData, navigate: shouldNavigate })

    setShowModal(false)
    setSelectedCourse(null)
    setSelectedMode('')
    setShowOkButton(false)
    if (action === 'cart') {
      router.push('/user/my-profile?tab=redeem_loyalty_points')
    }
  }
const postCartapi = async ({
    courseId,
    name,
    image,
    price,
    priceos,
    duration,
    mode,
    loyalty,
    inrprice,
    usdpirce,
    navigate = false
  }) => {
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
    tempcartdata.append('priceos', priceos)
    tempcartdata.append('tempuserid', tempuid)
    tempcartdata.append('image', image)
    tempcartdata.append('item_name', `${mode}: ${name}`)
    tempcartdata.append('crs_loyalty', loyalty)
    tempcartdata.append(
      'examprice',
      country == 'India' ? inrprice ?? 0 : usdpirce ?? 0
    )
    tempcartdata.append('utm_source', 'profile_page')
    tempcartdata.append('utm_source_current', 'loyalty page')
    if (uuid2) {
      tempcartdata.append('user_id', uuid2)
    }
    for (let [key, value] of tempcartdata.entries()) {
      console.log(key, value)
    }

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/cartitems`,
        tempcartdata
      )

      if (result.status === 200 || result.status === 201) {
        if (navigate) {
          router.push('/cart')
        } else {
          showAlert('Item has been added to cart')
        }
      }
    } catch (err) {
      console.error('Error adding to cart:', err)
    }
  }


  function onCloseAlert () {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  return (
    <>
      <Alert
        header={'Cart Info'}
        type={alert.type}
        text={alert.text}
        show={alert.show}
        onClose={hideAlert}
        onClosePress={onCloseAlert}
        btnText='Continue'
      />
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white',
              padding: '24px 32px',
              borderRadius: 12,
              width: '90%',
              maxWidth: 400,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              fontFamily: 'sans-serif',
              textAlign: 'left'
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 20 }}>
              Select Course Type
            </h2>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8 }}>
                <input
                  type='radio'
                  name='courseType'
                  value='LVC'
                  checked={selectedMode === 'LVC'}
                  onChange={e => setSelectedMode(e.target.value)}
                  style={{ marginRight: 8 }}
                />
                Live Virtual Classroom (LVC)
              </label>

              <label style={{ display: 'block' }}>
                <input
                  type='radio'
                  name='courseType'
                  value='Self-paced'
                  checked={selectedMode === 'Self-paced'}
                  onChange={e => setSelectedMode(e.target.value)}
                  style={{ marginRight: 8 }}
                />
                Self-paced Learning
              </label>
            </div>

            {!showOkButton && (
              <div style={{ textAlign: 'center' }}>
                <button onClick={handleFinalOk} className='default-btn'>
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <LoyalFaq loading={loading} country={country} />

      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading...</div>
      ) : filteredCourses.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
            padding: '20px'
          }}
        >
          <Loyalsidebardlayout />
          {filteredCourses.map((oneCourse, index) => (
            <div key={index}>
              <a style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  className='single-courses-box'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    minHeight: '280px'
                  }}
                >
                  <div className='courses-image'>
                    <img
                      src={oneCourse.image}
                      alt={oneCourse.name}
                      style={{
                        width: '100%',
                        height: '160px',
                        objectFit: 'fill'
                      }}
                    />
                  </div>
                  <div
                    className='courses-content profiletable'
                    style={{
                      padding: '10px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#D0140F',
                        marginBottom: '8px'
                      }}
                    >
                      {oneCourse.name}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        marginTop: 40
                      }}
                    >
                      <button
                        className='default-btn-green'
                        onClick={() => handleSelect(oneCourse, 'buy')}
                      >
                        Buy Now
                      </button>
                      <button
                        className='default-btn'
                        onClick={() => handleSelect(oneCourse, 'cart')}
                      >
                        Add to Cart
                      </button>
                      <Link href={oneCourse.previewurl || '#'} passHref>
                        <button
                          className='default-btn'
                          style={{ backgroundColor: 'green', color: '#fff' }}
                        >
                          Know More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 10px' }}>
          No loyalty point courses available.
        </div>
      )}
    </>
  )
}

export default LoyalityPoints
