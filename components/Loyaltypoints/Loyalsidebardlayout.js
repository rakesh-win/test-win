// Loyalsidebardlayout.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Loyalsidebardlayout () {
  const router = useRouter()

  // Data state
  const [menuitems, setMenuitems] = useState([])
  const [loyaltyCourses, setLoyaltyCourses] = useState([])
  const [coursesByCategory, setCoursesByCategory] = useState({})

  // User / env state
  const [userId, setUserId] = useState('')
  const [country, setCountry] = useState('India')

  // Modal + cart flow state
  const [showModal, setShowModal] = useState(false)
  const [selectedMode, setSelectedMode] = useState('') // 'LVC' | 'Self-paced'
  const [selectedCourse, setSelectedCourse] = useState(null) // { course, actionType }
  const [showOkButton, setShowOkButton] = useState(false)

  // ---------- Helpers / APIs ----------

  // Prices API
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

  // Simple cart persister (localStorage). Replace with your real API if needed.
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
    navigate
  }) => {
    try {
      // If you have a server API, replace this block with axios.post(...)
      // Example:
      // await axios.post('/api/cart', { userId, courseId, ... })

      const existing =
        (typeof window !== 'undefined' &&
          JSON.parse(localStorage.getItem('cart') || '[]')) ||
        []

      const newItem = {
        userId,
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
        addedAt: new Date().toISOString()
      }

      const nextCart = [
        ...existing.filter(
          i =>
            !(i.userId === userId && i.courseId === courseId && i.mode === mode)
        ),
        newItem
      ]
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(nextCart))
      }

      // If BUY → go to checkout
      if (navigate) {
        router.push(`/checkout/${courseId}?mode=${encodeURIComponent(mode)}`)
      }
    } catch (e) {
      console.error('Error saving to cart:', e)
    }
  }

  // ---------- Effects: read localStorage then load data ----------

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCountry = localStorage.getItem('country')
      const id = localStorage.getItem('userid')

      if (savedCountry) setCountry(savedCountry)
      if (id) setUserId(id)
    }
  }, [])

  useEffect(() => {
    if (userId) {
      getAllData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  // Load courses, enrolled, menus; filter loyalty not-enrolled; match via previewurl==mlink; group by mcategory
  const getAllData = async () => {
    try {
      const [coursesRes, enrolledRes, menuRes] = await Promise.all([
        axios.get('https://winupskill.in/api/api/courses'),
        axios.get('https://winupskill.in/api/api/enrolled'),
        axios.get('https://winupskill.in/api/api/menus?type=Mobile')
      ])

      const allCourses = coursesRes?.data?.data || []
      const enrolled = enrolledRes?.data?.data || []
      const menuData = menuRes?.data?.data || []

      const userEnrolledCourseIds = enrolled
        .filter(e => Number(e.user_id) === Number(userId))
        .map(e => Number(e.course_id))

      // Loyalty + not enrolled + must match a menu via previewurl === mlink
      const loyaltyList = []
      for (const course of allCourses) {
        const isLoyal = Number(course.loyalpoint) === 1
        const isNotEnrolled = !userEnrolledCourseIds.includes(Number(course.id))
        if (!isLoyal || !isNotEnrolled) continue

        const matchedMenu = menuData.find(m => m?.mlink === course?.previewurl)
        if (!matchedMenu) continue

        loyaltyList.push({
          ...course,
          category: Number(matchedMenu.mcategory) // the category id from menus API
        })
      }

      // Optionally fetch prices for each course (kept, as you requested no logic skipped)
      const withPrices = await Promise.all(
        loyaltyList.map(async c => {
          const prices = await getpricesforthis(c.id)
          return { ...c, prices }
        })
      )

      setLoyaltyCourses(withPrices)

      // Group by category (mcategory)
      const grouped = {}
      for (const c of withPrices) {
        if (!grouped[c.category]) grouped[c.category] = []
        grouped[c.category].push(c)
      }
      setCoursesByCategory(grouped)

      setMenuitems(menuData)
    } catch (err) {
      console.error('Error loading data:', err)
    }
  }

  // ---------- Actions ----------

  // Open modal with selected course + actionType ('buy' | 'cart')
  const handleSelect = (course, actionType) => {
    setSelectedCourse({ course, actionType })
    setSelectedMode('')
    setShowOkButton(false)
    setShowModal(true)
  }

  // ✅ Final cart/checkout logic you provided (wired fully)
  const handleFinalOk = async () => {
    setShowOkButton(true)
    if (!selectedCourse || !selectedMode) {
      setShowOkButton(false)
      alert('Please select a course type.')
      return
    }

    const oneCourse = selectedCourse.course
    const action = selectedCourse.actionType

    const {
      lvcindiadiscprice,
      lvcosdiscprice,
      elearningindiadiscprice,
      elearningosdiscprice
    } = await getpricesforthis(oneCourse.id)

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

    await postCartapi({ ...courseData, navigate: shouldNavigate })

    // Close modal + reset
    setShowModal(false)
    setSelectedCourse(null)
    setSelectedMode('')
    setShowOkButton(false)

    // If "Add to Cart" → go to loyalty redeem tab
    if (action === 'cart') {
      router.push('/user/my-profile?tab=redeem_loyalty_points')
    }
  }

  // ---------- UI meta ----------

  const categoryTitles = {
    2: 'Security & Privacy Management Courses',
    3: 'IT Governance & Resilience Courses',
    4: 'Project, Program & Quality Management Courses',
    5: 'Career-Path Based Courses',
    6: 'Lead Auditor / Implementer Courses',
    1: 'IT Service Management Courses'
  }
  // ---------- Render ----------

  return (
    <>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}
      >
        {/* Sidebar */}
        <div
          style={{
            flex: '0 0 280px',
            minWidth: 250,
            padding: 10,
            border: '1px solid #D0140F',
            borderRadius: 10,
            height: 'fit-content',
            position: 'sticky',
            top: 10,
            backgroundColor: 'white'
          }}
        >
          <h5 style={{ marginBottom: '12px' }}>
            <u>Course Categories</u>
          </h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {Object.entries(categoryTitles).map(([catId, title]) =>
              (coursesByCategory[catId] || []).length > 0 ? (
                <li key={catId} style={{ marginBottom: '12px' }}>
                  <a
                    href={`#cat-${catId}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {title}
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </div>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          {Object.entries(categoryTitles).map(([catId, title]) =>
            (coursesByCategory[catId] || []).length > 0 ? (
              <div key={catId} id={`cat-${catId}`} style={{ marginBottom: 40 }}>
                <h2 style={{ marginBottom: 20, color: '#D0140F' }}>{title}</h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: 20
                  }}
                >
                  {coursesByCategory[catId].map((oneCourse, index) => (
                    <div key={index}>
                      {console.log(categoryTitles)}
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
                                objectFit: 'cover'
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
                                marginTop: 20
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
                                  style={{
                                    backgroundColor: 'green',
                                    color: '#fff'
                                  }}
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
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Modal */}
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

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleFinalOk}
                className='default-btn'
                disabled={showOkButton}
              >
                {showOkButton ? 'Please wait...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
