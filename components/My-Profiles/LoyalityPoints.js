// Loyalsidebardlayout.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import InfoIcon from '@mui/icons-material/Info'
import { Button } from 'reactstrap'
import LoyalFaq from '../Loyaltypoints/LoyaltyFaq'
import { makeid } from '@/utils/makeid'

export default function Loyalsidebardlayout () {
  const router = useRouter()

  // Data state
  const [menuitems, setMenuitems] = useState([])
  const [loyaltyCourses, setLoyaltyCourses] = useState([])
  const [coursesByCategory, setCoursesByCategory] = useState({})
  const [courses, setCourses] = useState([])

  // User / env state
  const [userId, setUserId] = useState('')
  const [country, setCountry] = useState('India')

  // Modal + cart flow state
  const [showModal, setShowModal] = useState(false)
  const [selectedMode, setSelectedMode] = useState('') // 'LVC' | 'Self-paced'
  const [selectedCourse, setSelectedCourse] = useState(null) // { course, actionType }
  const [showOkButton, setShowOkButton] = useState(false)
  const [loading, setLoading] = useState(false)

  // Category selection state
  const [selectedCategory, setSelectedCategory] = useState(null)

  // ---------- Helpers / APIs ----------
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

  // ---------- Effects ----------
  useEffect(() => {
    fetchCartItems()

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
  }, [userId])

  // ---------- Data loading ----------
  const getAllData = async () => {
    setLoading(true)
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

      const loyaltyList = []
      for (const course of allCourses) {
        const isLoyal = Number(course.loyalpoint) === 1
        const isNotEnrolled = !userEnrolledCourseIds.includes(Number(course.id))
        if (!isLoyal || !isNotEnrolled) continue

        const matchedMenu = menuData.find(m => m?.mlink === course?.previewurl)
        if (!matchedMenu) continue

        loyaltyList.push({
          ...course,
          category: Number(matchedMenu.mcategory)
        })
      }

      const withPrices = await Promise.all(
        loyaltyList.map(async c => {
          const prices = await getpricesforthis(c.id)
          return { ...c, prices }
        })
      )

      setLoyaltyCourses(withPrices)

      const grouped = {}
      for (const c of withPrices) {
        if (!grouped[c.category]) grouped[c.category] = []
        grouped[c.category].push(c)
      }
      setCoursesByCategory(grouped)
      setMenuitems(menuData)
      setCourses(allCourses)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error('Error loading data:', err)
    }
  }

  // ---------- Actions ----------
  const handleSelect = (course, actionType) => {
    setSelectedCourse({ course, actionType })
    setSelectedMode('')
    setShowOkButton(false)
    setShowModal(true)
  }

  // ---------- UI meta ----------
  const categoryTitles = {
    2: 'Security & Privacy Management Courses',
    6: 'Lead Auditor / Implementer Courses',
    3: 'IT Governance & Resilience Courses',
    1: 'IT Service Management Courses',
    4: 'Project, Program & Quality Management Courses',
    5: 'Career-Path Based Courses'
  }

  const [carti, setCartI] = useState([])

  const fetchCartItems = async () => {
    try {
      if (typeof window !== 'undefined') {
        const tempuid = localStorage.getItem('tempuserid')
        if (!tempuid) return
        const url = `${process.env.NEXT_PUBLIC_API}/cartitems?tempuserid=${tempuid}`
        const res = await axios.get(url)
        setCartI(res.data.data || []) // store array safely
      }
    } catch (err) {
      console.error('Error fetching cart items:', err)
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
  return (
    <>
      {/* Sidebar */}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <LoyalFaq loading={loading} country={country} />
          <div className='loyalty-category__container'>
            <div className='loyalty-category hideonmob'>
              <nav style={{ paddingTop: 5, paddingBottom: 5, marginRight: 30 }}>
                <ul>
                  {Object.entries(categoryTitles).map(([catId, title]) =>
                    (coursesByCategory[catId] || []).length > 0 ? (
                      <li
                        key={catId}
                        style={{
                          fontWeight:
                            selectedCategory === Number(catId)
                              ? 'bold'
                              : 'normal'
                        }}
                        onMouseOver={() => setSelectedCategory(Number(catId))}
                      >
                        {title}
                      </li>
                    ) : null
                  )}
                </ul>
              </nav>
            </div>
            <div>
              <div className='hideonweb' style={{ width: '260px', margin: 10 }}>
                <FormControl fullWidth>
                  <InputLabel fullWidth>Categories</InputLabel>
                  <Select
                    value={selectedCategory || ''}
                    onChange={e => setSelectedCategory(Number(e.target.value))}
                  >
                    {Object.entries(categoryTitles).map(([catId, title]) =>
                      (coursesByCategory[catId] || []).length > 0 ? (
                        <MenuItem fullWidth key={catId} value={catId}>
                          {title}
                        </MenuItem>
                      ) : null
                    )}
                  </Select>
                </FormControl>
              </div>

              {/* Main content */}
              <Card
                sx={{
                  p: 2, // padding inside the box
                  bgcolor: '#fafafa',
                  borderRadius: 2, // rounded corners
                  mt: 4
                }}
              >
                {/* Grid of cards */}
                <CardContent
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: '1fr 1fr',
                      md: 'repeat(3, 1fr)'
                    },
                    gap: 4
                  }}
                >
                  {selectedCategory ? (
                    coursesByCategory[selectedCategory]?.length > 0 ? (
                      coursesByCategory[selectedCategory].map(
                        (oneCourse, index) => (
                          <Box
                            key={index}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              bgcolor: '#fff',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              transition:
                                'transform 0.2s ease, box-shadow 0.2s ease',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                              }
                            }}
                          >
                            {/* Course Link + Image */}
                            <Link href={oneCourse.previewurl || '#'} passHref>
                              <a
                                style={{
                                  textDecoration: 'none',
                                  display: 'block',
                                  marginBottom: '12px',
                                  fontWeight: 600
                                }}
                              >
                                {oneCourse.image && (
                                  <img
                                    src={oneCourse.image}
                                    alt={oneCourse.name}
                                    style={{
                                      width: '100%',
                                      height: '180px',
                                      objectFit: 'cover',
                                      borderRadius: '8px',
                                      marginBottom: '8px'
                                    }}
                                  />
                                )}
                                <center>{oneCourse.name}</center>
                              </a>
                            </Link>

                            {/* Buttons */}
                            {carti.some(
                              item =>
                                Number(item.course_id) === Number(oneCourse.id)
                            ) ? (
                              <Button
                                style={{
                                  cursor: 'not-allowed',
                                  textAlign: 'center'
                                }}
                              >
                                Added to Cart
                              </Button>
                            ) : (
                              <div className='loyalty__btn-group'>
                                <Button
                                  className='loyalty__btn loyalty__buy'
                                  onClick={() => handleSelect(oneCourse, 'buy')}
                                >
                                  <CreditCardIcon
                                    fontSize='small'
                                    className='icon'
                                  />
                                  <span className='text'>Buy Now</span>
                                </Button>
                                <Button
                                  className='loyalty__btn loyalty__cart'
                                  onClick={() =>
                                    handleSelect(oneCourse, 'cart')
                                  }
                                >
                                  <ShoppingCartIcon
                                    fontSize='small'
                                    className='icon'
                                  />
                                  <span className='text'>Add to Cart</span>
                                </Button>
                              </div>
                            )}
                          </Box>
                        )
                      )
                    ) : (
                      <Box textAlign='center' width='100%'>
                        No courses available in this category.
                      </Box>
                    )
                  ) : (
                    <Box sx={{}}>
                      <Typography
                        variant='body2'
                        sx={{
                          textAlign: 'center',
                          padding: 2,
                          color: 'text.secondary',
                          maxWidth: '100%', // 👈 limit but allow natural line
                          margin: '0 auto',
                          wordBreak: 'keep-all', // prevent breaking every word
                          whiteSpace: 'normal'
                        }}
                      >
                        Please choose a course in this category to claim loyalty
                        points.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
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
