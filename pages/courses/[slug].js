import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const CoursesDetailsSidebar = dynamic(() =>
  import('@/components/SingleCourses/CoursesDetailsSidebar')
)
const YouMightLikeTheCourses = dynamic(() =>
  import('@/components/Courses/YouMightLikeTheCourses')
)
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from 'react-tabs'
resetIdCounter()
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
const CoursesCurriculum = dynamic(() =>
  import('@/components/Courses/CoursesCurriculum')
)
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
const Partner = dynamic(() => import('@/components/Common/Partner'))
import cookie from 'js-cookie'
import { parseCookies } from 'nookies'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
const Alert = dynamic(() => import('react-popup-alert'))
const Preloader = dynamic(() => import('../../components/_App/Preloader'))
// const TagManager = dynamic(() => import('react-gtm-module'));
import TagManager from 'react-gtm-module'

// import { styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import Link from 'next/link'
import Image from 'next/image'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RelatedCourse from '@/components/Courses/RelatedCourse'

// const Accordion = styled((props) => (
//     <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//     border: `1px solid ${theme.palette.divider}`,
//     '&:not(:last-child)': {
//         borderBottom: 0,
//     },
//     '&:before': {
//         display: 'none',
//     },
// }));

// const AccordionSummary = styled((props) => (
//     <MuiAccordionSummary
//         expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
//         {...props}
//     />
// ))(({ theme }) => ({
//     backgroundColor:
//         theme.palette.mode === 'dark'
//             ? 'rgba(255, 255, 255, .05)'
//             : 'rgba(0, 0, 0, .03)',
//     flexDirection: 'row-reverse',
//     '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//         transform: 'rotate(90deg)',
//     },
//     '& .MuiAccordionSummary-content': {
//         marginLeft: theme.spacing(1),
//     },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderTop: '1px solid rgba(0, 0, 0, .125)',
// }));

const Details = ({ course, user }) => {
  const navigate = ''
  const [oneCourse, setoneCourse] = React.useState([])
  const [subjects, setSubjects] = React.useState([])
  const [childsubjects, setchildSubjects] = React.useState([])
  const [allcourses, setAllcourses] = React.useState([])
  const [allenroll, setAllenroll] = React.useState([])
  const [flaga, setFlaga] = useState(0)
  const [crsprice, setCrsprice] = React.useState([])
  const [configurables, setConfigurables] = React.useState([])
  const [relatedCourse, setRelatedCourse] = React.useState([])

  const [title, setTitle] = useState('win | win upskilling universe')
  const [nav, setnav] = useState(false)
  const [nav1, setnav1] = useState(false)
  const [display, setDisplay] = useState(false)
  const [alreadyBuy, setAlreadyBuy] = useState(false)
  const [country, setCountry] = useState('')
  const [loading, setLoading] = React.useState(false)
  const [isquiz, setIsquiz] = React.useState(false)
  const dispatch = useDispatch()

  const [token, setToken] = React.useState()

  const cartItems = useSelector(state => state.cart.cartItems)

  const [slug, setSlug] = useState('') // State to store the slug value
  const [courseId, setCourseId] = useState('')
  const router = useRouter()
  // Manually setting id to 1
  const id = courseId
  const slugFromUrl = router.query.slug

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctry = localStorage.getItem('country')
      setCountry(ctry)
    }

    const slugFromUrl = router.query.slug
    // console.log('Slug from URL:', slugFromUrl)
    // console.log('All Courses:', allcourses)

    if (slugFromUrl) {
      setSlug(slugFromUrl)
    }

    // Check if allcourses is empty, and only fetch courses if it's empty
    if (allcourses.length === 0) {
      getallCourses()
    }

    // Check if the slug is present in the previewurl and log its id

    if (allcourses.length) {
      const filteredCourse = allcourses.find(
        course =>
          course.previewurl && course.previewurl.includes(`/${slugFromUrl}/`)
      )
      // console.log('Filtered Course :', filteredCourse)

      if (filteredCourse) {
        // console.log('Filtered Course ID:', filteredCourse.id)
        setCourseId(filteredCourse.id)
      }
    }
  }, [slugFromUrl, id, allcourses])

  useEffect(() => {
    setDisplay(true)
    setToken(localStorage.getItem('token'))
    //checkpurchase();
  }, [id])

  useEffect(() => {
    getCourses()
    getSubjects()
    getChildcourses()
    checkpurchase()
    getpricesforthis()
  }, [courseId])

  const [faqData, setFaqData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://winupskill.in/api/api/faq')
        const data = await response.json()
        setFaqData(data.data)
      } catch (error) {
        console.error('Error fetching FAQ data:', error)
      }
    }

    fetchData()
  }, [])

  // Filter FAQ items by courseId
  const filteredFaqData = faqData.filter(item => {
    const courseIds = item.courseid
      .split(',')
      .map(id => parseInt(id.trim(), 10))
    return courseIds.includes(courseId)
  })

  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  // const getCourses = async () => {
  //     try {

  //         // Fetch course data and set states
  //         const courseUrl = `https://winupskill.in/api/api/courses/${id}`;
  //         const courseResponse = await axios.get(courseUrl);
  //         const courseData = courseResponse.data.data;

  //         setoneCourse(courseData);
  //         setTitle(courseData.name);
  //         setIsquiz(courseData.type);

  //         // Fetch configurable data and set state
  //         const confResponse = await axios.get(`https://winupskill.in/api/api/configurables?type=Course%20Content`);
  //         const configurablesData = confResponse.data.data.filter(item => item.typeid.includes(id));
  //         setConfigurables(configurablesData);

  //         // Fetch related data based on courseid
  //         const relatedUrl = `https://winupskill.in/api/api/related?courseid=${id}`;
  //         const relatedResponse = await axios.get(relatedUrl);
  //         const relatedData = relatedResponse.data;

  //         console.log('Related Data:', relatedData);
  //         // Fetch and filter related courses
  //         const relatedIds = relatedData.data[0].relatedids.split(',');
  //         const coursesResponse = await axios.get('https://winupskill.in/api/api/courses');
  //         const coursesData = coursesResponse.data.data;
  //         const filteredCourses = coursesData.filter(course => relatedIds.includes(course.id.toString()));
  //         console.log('rr Filtered Courses:', filteredCourses);
  //         setRelatedCourse(filteredCourses);

  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // }

  const getCourses = async () => {
    try {
      // Fetch course data and set states
      const courseUrl = `https://winupskill.in/api/api/courses/${id}`
      const courseResponse = await axios.get(courseUrl)
      const courseData = courseResponse.data.data

      setoneCourse(courseData)
      setTitle(courseData.name)
      setIsquiz(courseData.type)

      // Fetch configurable data and set state
      const confResponse = await axios.get(
        `https://winupskill.in/api/api/configurables?type=Course%20Content`
      )
      const configurablesData = confResponse.data.data.filter(item =>
        item.typeid.includes(id)
      )
      setConfigurables(configurablesData)

      // Fetch related data based on courseid
      const relatedUrl = `https://winupskill.in/api/api/related?courseid=${id}`
      const relatedResponse = await axios.get(relatedUrl)
      const relatedData = relatedResponse.data

      if (relatedData && relatedData.data && relatedData.data.length > 0) {
        // Fetch and filter related courses
        const relatedIds = relatedData.data[0].relatedids.split(',')
        const coursesResponse = await axios.get(
          'https://winupskill.in/api/api/courses'
        )
        const coursesData = coursesResponse.data.data
        const filteredCourses = coursesData.filter(course =>
          relatedIds.includes(course.id.toString())
        )
        console.log('Filtered Courses:', filteredCourses)
        setRelatedCourse(filteredCourses)
      } else {
        // Set relatedCourse to an empty array when there's no data
        setRelatedCourse([])
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getallCourses = async () => {
    const url = `https://winupskill.in/api/api/courses`
    var response = await axios.get(url).then(result0 => {
      setAllcourses(result0.data.data)
    })
  }

  const getSubjects = async () => {
    const url = `https://winupskill.in/api/api/subjects?course_id=${id}`
    var response = await axios.get(url).then(result => {
      setSubjects(result.data.data)
    })
  }

  const getChildcourses = async () => {
    const url = `https://winupskill.in/api/api/childcourses?parentcid=${id}`
    var response = await axios.get(url).then(result2 => {
      setchildSubjects(result2.data.data)
    })
  }

  const getpricesforthis = async () => {
    const url = `https://winupskill.in/api/api/courseprices?courseid=${id}`
    var response = await axios.get(url).then(result4 => {
      setCrsprice(result4.data.data[0])
    })
  }

  const checkpurchase = async () => {
    setFlaga(0)
    var uuid = localStorage.getItem('userid')
    const url = `https://winupskill.in/api/api/enrolled?user_id=${uuid}&&course_id=${id}`
    const response = await axios.get(url)
    setAllenroll(response.data.data)

    response.data.data.forEach(el => {
      if (parseInt(el.course_id) == id && el.user_id == uuid) {
        setFlaga(1)
        localStorage.setItem('flag', '1')
      } else {
      }
    })
  }

  function numberWithCommas (x) {
    if (x) {
      return Number(x).toLocaleString()
    }
  }

  const postquery = async (name2, mail2, mob2, courseId, name, ctype) => {
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
      const response = await axios.post(url, payload)
      const params = new URLSearchParams(window.location.search)
      const utm_source = cookie.get('utm_source')
      const utm_source_current = cookie.get('utm_source_current')
      const page = name
      const form = ctype

      setHeadertext('Thank You!'),
        setBtntext('Close'),
        onShowAlert(
          'success',
          'We have received your call back request. Our team will get in touch with you based on the contact information available in your profile.'
        )
      //Router.push('/courses');
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const sendtocoursepage = async () => {
    Router.push(`/my-courses/view/${id}`)
  }
  const addToCart = (
    courseId,
    name,
    image,
    price,
    priceos,
    duration,
    mode,
    loyalty,
    inrprice,
    usdpirce
  ) => {
    let courseObj = []
    var tt = ': '
    courseObj['id'] = courseId
    courseObj['name'] = `${mode}${tt}${name}`
    courseObj['image'] = image
    courseObj['price'] = price
    courseObj['priceos'] = priceos
    courseObj['duration'] = duration
    courseObj['quantity'] = 1
    dispatch({
      type: 'ADD_TO_CART',
      data: courseObj
    })
    var tmpnm = `${mode}${tt}${name}`

    postCartapi(
      courseId,
      tmpnm,
      image,
      price,
      priceos,
      duration,
      mode,
      loyalty,
      inrprice,
      usdpirce
    )
  }

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
    if (type && text) {
      setTimeout(() => {
        setAlert({ type: null, text: '' }) // hide after 2s
      }, 3000)
    }
  }

  var loc
  setTimeout(() => {
    var loc = localStorage.getItem('country')
    setCountry(loc)
  }, 1000)

  function numberWithCommas (x) {
    if (x) {
      return Number(x).toLocaleString()
    }
  }

  const [enrolled, setEnrolled] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(true)
  const openModal = () => {
    setIsOpen(!isOpen)
  }

  const checkBoughtAlready = () => {
    return (
      enroled_courses.filter(function (val) {
        return val.courseId === id
      }).length > 0
    )
  }

  const sendtoEnquiry = async (courseId, name, ctype) => {
    const params = new URLSearchParams(window.location.search)
    const utm_source = cookie.get('utm_source')
    const utm_source_current = cookie.get('utm_source_current')
    const tagManagerArgs = {
      gtmId: 'GTM-K9NXHCN',
      events: {
        utm_source: utm_source,
        utm_source_current: utm_source_current,
        'gtm.element': name,
        'Form Element': name,
        'Page URL': params,
        courseId: courseId,
        name: name,
        ctype: ctype
      }
    }
    TagManager.initialize(tagManagerArgs)

    var uuid3 = localStorage.getItem('userid')
    if (uuid3) {
      const userdetails = getUser(courseId, name, ctype)
    } else {
      cookie.set('enquirecourseId', courseId)
      cookie.set('enquirecourseName', name)
      Router.push('/enquiry')
    }
  }

  const getUser = async (courseId, name, ctype) => {
    const payload = {
      headers: { Authorization: 'Bearer ' + token }
    }
    const url = `https://winupskill.in/api/api/users`
    if (token) {
      var response = await axios.get(url, payload).then(result => {
        postquery(
          result.data.name,
          result.data.email,
          result.data.mobile,
          courseId,
          name,
          ctype
        )
      })
    }
  }

  function removeCommas (value) {
    console.log('value', value)
    return value?.toString().replace(/,/g, '')
  }

  const postCartapi = async (
    courseId,
    name,
    image,
    price,
    priceos,
    duration,
    type,
    loyalpoint,
    inrprice,
    usdpirce
  ) => {
    var tempuid = localStorage.getItem('tempuserid')

    console.log(inrprice, usdpirce)

    var uuid2 = localStorage.getItem('userid')
    const tempcartdata = new FormData()
    tempcartdata.append('course_id', courseId)
    tempcartdata.append('item_name', name)
    tempcartdata.append('item_qty', '1')
    tempcartdata.append('price', price)
    tempcartdata.append('priceos', priceos)
    tempcartdata.append('tempuserid', tempuid)
    tempcartdata.append('image', image)
    tempcartdata.append('type', type)
    tempcartdata.append('crs_loyalty', removeCommas(loyalpoint))
    tempcartdata.append(
      'examprice',
      country === 'India' ? inrprice ?? 0 : usdpirce ?? 0
    )
    tempcartdata.append('utm_source', cookie.get('utm_source'))
    tempcartdata.append('utm_source_current', cookie.get('utm_source_current'))
    if (uuid2) {
      tempcartdata.append('user_id', uuid2)
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/cartitems`, tempcartdata)
      .then(result => {
        if (result.status == 200 || result.status == 201) {
          //  Router.push('/user/my-profile');
          // Router.push('/cart')
          setHeadertext('Cart'),
            setBtntext('Close'),
            onShowAlert('success', 'Items has been added to cart')
        }
      })
  }

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    setActiveTab(0)
    fetchCartItems()
  }, [router])

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


  const isInCart = carti.some(
    item => Number(item.course_id) === Number(oneCourse.id)
  )


  return (
    <React.Fragment>
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

      {loading && <Preloader />}
      <div
        data-elementor-type='wp-page'
        data-elementor-id='12694'
        className='elementor elementor-12694'
      >
        <section
          className='elementor-section elementor-top-section elementor-element elementor-element-362f6efe elementor-section-height-min-height elementor-section-boxed elementor-section-height-default elementor-section-items-middle'
          data-id='362f6efe'
          data-element_type='section'
        >
          <div className='elementor-background-overlay'></div>
          <div className='elementor-container elementor-column-gap-default'>
            <div className='elementor-row'>
              <div
                className='elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-44a2d15b'
                data-id='44a2d15b'
                data-element_type='column'
              >
                <div className='elementor-column-wrap elementor-element-populated'>
                  <div className='elementor-widget-wrap'>
                    <div
                      className='elementor-element elementor-element-66bcef01 elementor-widget elementor-widget-heading'
                      data-id='66bcef01'
                      data-element_type='widget'
                      data-widget_type='heading.default'
                    >
                      <div className='elementor-widget-container'>
                        <h3
                          style={{ fontSize: '25px' }}
                          className='elementor-heading-title elementor-size-default'
                        >
                          {oneCourse.titlecat}
                        </h3>
                      </div>
                    </div>
                    <div
                      className='elementor-element elementor-element-74992cde elementor-widget elementor-widget-heading'
                      data-id='74992cde'
                      data-element_type='widget'
                      data-widget_type='heading.default'
                    >
                      <div className='elementor-widget-container'>
                        <h1 className='elementor-heading-title elementor-size-default'>
                          {oneCourse.titlename}
                        </h1>
                      </div>
                    </div>
                    <div
                      className='elementor-element elementor-element-7a67de99 elementor-widget elementor-widget-text-editor'
                      data-id='7a67de99'
                      data-element_type='widget'
                      data-widget_type='text-editor.default'
                    >
                      <div className='elementor-widget-container'>
                        <div className='elementor-text-editor elementor-clearfix'>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: oneCourse.titledesc
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-2af7f22a'
                data-id='2af7f22a'
                data-element_type='column'
              >
                <div className='elementor-column-wrap elementor-element-populated'>
                  <div className='elementor-widget-wrap'>
                    <div
                      className='elementor-element elementor-element-dabebae elementor-widget elementor-widget-image elementor-motion-effects-parent'
                      data-id='dabebae'
                      data-element_type='widget'
                    >
                      <div className='elementor-widget-container elementor-motion-effects-element'>
                        <div className='elementor-image'>
                          <div className='attachment-full size-full wp-image-12933'>
                            <Image
                              src={oneCourse.image}
                              alt={oneCourse.name}
                              width={500}
                              height={500}
                              priority={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className='courses-details-area'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 col-md-12'>
              <div className='courses-details-desc'>
                <Tabs selectedIndex={activeTab} onSelect={setActiveTab}>
                  <TabList>
                    <Tab>Overview</Tab>
                    <Tab style={{ display: subjects.length > 0 ? '' : 'none' }}>
                      Curriculum
                    </Tab>
                    <Tab>Target Audience</Tab>
                    <Tab>Exam Details</Tab>
                  </TabList>
                  <TabPanel>
                    <div className='courses-overview'>
                      <h3>Course Description</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: oneCourse.description
                        }}
                      />
                    </div>
                  </TabPanel>

                  <TabPanel
                    style={{ display: subjects.length > 0 ? '' : 'none' }}
                  >
                    <CoursesCurriculum videos={subjects} flag={flaga} />
                  </TabPanel>
                  <TabPanel>
                    <p
                      dangerouslySetInnerHTML={{ __html: oneCourse.audience }}
                    />
                  </TabPanel>
                  <TabPanel>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: oneCourse.examdetails
                      }}
                    />
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            <div className='col-lg-4 col-md-12'>
              <CoursesDetailsSidebar
                {...oneCourse}
                loggedInUser={user}
                flag={flaga}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className='container'
        style={{ display: childsubjects.length > 0 ? 'block' : 'none' }}
      >
        <div className='row align-items-center'>
          <h3>Associated courses in this career path:</h3>
          {childsubjects.length > 1 && (
            <p style={{ fontWeight: 'bold' }}>{childsubjects[0].descr}</p>
          )}
        </div>

        <div style={{ marginBottom: '100px', marginTop: '30px' }}>
          {childsubjects.map((chs, index) => (
            <div className='allqss' key={index}>
              {allcourses
                .filter(item => item.id == chs.childcid)
                .map((crss, index2) => (
                  <div className='careerpathcourses' key={index2}>
                    <div className='childcourseimg col-lg-2 col-sm-4'>
                      <Image
                        src={crss.badgeimage}
                        alt='win-upskill-badge-image'
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className='childdiv col-lg-10 col-sm-8'>
                      <div className='childcourse'>
                        <ul className='childcourseul'>
                          <li className='boldtext'>{crss.name}</li>
                          <li
                            className='desctextpath'
                            dangerouslySetInnerHTML={{ __html: crss.titledesc }}
                          />
                        </ul>
                      </div>
                      <div className='childcoursebtn'>
                        <button
                          onClick={() => router.push(`/${crss.previewurl}`)}
                          className='default-btn'
                          style={{ paddingLeft: '20px' }}
                        >
                          Know More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className='container'
        style={{
          marginTop: '20px',
          marginBottom: '40px'
        }}
      >
        {configurables.length ? (
          <div className='configurables'>
            <h2>Frequently Asked Questions (FAQ)</h2>
          </div>
        ) : (
          ''
        )}
        {configurables.length
          ? configurables.map((item, index) => (
              <div className='configurables'>
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index + 1}`}
                  onChange={handleChange(`panel${index + 1}`)}
                >
                  <AccordionSummary
                    aria-controls={`panel${index + 1}d-content`}
                    id={`panel${index + 1}d-header`}
                  >
                    <Typography>{item.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <p dangerouslySetInnerHTML={{ __html: item.value }} />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))
          : ''}
      </div>
      <div
        className='container'
        style={{
          marginBottom: '20px',
          marginTop: '30px',
          paddingLeft: '40px',
          display: isquiz === 'crs' ? 'block' : 'none'
        }}
      >
        <h2>Learning Options:</h2>
        <div className='row'>
          <div className='innercol'>
            <div className='rowpricecol'>
              <span className='pricelinebig'>Self-Paced</span>
              <span
                style={{ display: country === 'India' ? 'block' : 'none' }}
                className='pricelinebig2'
              >
                INR {crsprice.elearningindiadisplayprice}
              </span>
              <span
                style={{ display: country === 'India' ? 'block' : 'none' }}
                className='pricelinebig'
              >
                INR {numberWithCommas(crsprice.elearningindiadiscprice)}
              </span>
              <span
                style={{ display: country !== 'India' ? 'block' : 'none' }}
                className='pricelinebig2'
              >
                USD {crsprice.elearningosdisplayprice}
              </span>
              <span
                style={{ display: country !== 'India' ? 'block' : 'none' }}
                className='pricelinebig'
              >
                USD {numberWithCommas(crsprice.elearningosdiscprice)}
              </span>

              <span className='priceline seprt'></span>
              <span className='priceline'>
                Lifetime access to eLearning content curated by industry experts
              </span>
          <span className='priceline'>Test paper for self-evaluation</span>

              {oneCourse.examvoucher === 'included' ? (
                <span className='priceline'>Exam voucher included</span>
              ) : (
                ''
              )}

              <div
                className='courses-details-info'
                style={{ border: 'none', marginTop: '0px', marginLeft: '0px' }}
              >
                <span className='emispan'>
                  * You can also pay via Flexible EMIs over 3 - 12 months.
                  Select Card-EMI at Checkout.
                </span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    marginTop: 40
                  }}
                >
                  {isInCart ? (
                    <button
                      className='default-btn-grey'
                      style={{ cursor: 'not-allowed' }}
                    >
                      Added to Cart
                    </button>
                  ) : (
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
                        onClick={() => {
                          addToCart(
                            oneCourse.id,
                            oneCourse.name,
                            oneCourse.image,
                            crsprice.elearningindiadiscprice,
                            crsprice.elearningosdiscprice,
                            oneCourse.duration,
                            'Self-paced',
                            oneCourse.loyalpoint,
                            oneCourse.INRexam,
                            oneCourse.USDexam,
                            'false'
                          ),
                            router.push('/cart')
                        }}
                      >
                        Buy Now
                      </button>
                      <button
                        className='default-btn'
                        onClick={() => {
                          addToCart(
                            oneCourse.id,
                            oneCourse.name,
                            oneCourse.image,
                            crsprice.elearningindiadiscprice,
                            crsprice.elearningosdiscprice,
                            oneCourse.duration,
                            'Self-paced',
                            oneCourse.loyalpoint,
                            oneCourse.INRexam,
                            oneCourse.USDexam,
                            'true'
                          )
                          fetchCartItems()
                          router.push(`/courses/${slugFromUrl}`)
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>

                <div className='courses-share'>
                  <button
                    className='showbtnastext'
                    onClick={() =>
                      sendtoEnquiry(oneCourse.id, oneCourse.name, 'Self-paced')
                    }
                  >
                    Need more Info
                  </button>
                </div>
              </div>
            </div>

            <div className='rowpricecol'>
              <span className='pricelinebig'>Live Online Classroom</span>
              <span
                style={{ display: country === 'India' ? 'block' : 'none' }}
                className='pricelinebig2'
              >
                INR {crsprice.lvcindiadisplayprice}
              </span>
              <span
                style={{ display: country === 'India' ? 'block' : 'none' }}
                className='pricelinebig'
              >
                INR {numberWithCommas(crsprice.lvcindiadiscprice)}
              </span>
              <span
                style={{ display: country !== 'India' ? 'block' : 'none' }}
                className='pricelinebig2'
              >
                USD {crsprice.lvcosdisplayprice}
              </span>
              <span
                style={{ display: country !== 'India' ? 'block' : 'none' }}
                className='pricelinebig'
              >
                USD {numberWithCommas(crsprice.lvcosdiscprice)}
              </span>
              <span className='priceline seprt'></span>
              <span className='priceline'>All benefits of Self-Paced</span>
              <span className='priceline'>+</span>
              <span className='priceline'>
                Live virtual classroom training by highly experienced
                instructors and practitioners
              </span>
              <div
                className='courses-details-info'
                style={{ border: 'none', marginTop: '0px', marginLeft: '0px' }}
              >
                <span className='emispan'>
                  * You can also pay via Flexible EMIs over 3 - 12 months.
                  Select Card-EMI at Checkout.
                </span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    marginTop: 40
                  }}
                >
                  {isInCart ? (
                    <button
                      className='default-btn-grey'
                      style={{ cursor: 'not-allowed' }}
                    >
                      Added to Cart
                    </button>
                  ) : (
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
                        onClick={() => {
                          addToCart(
                            oneCourse.id,
                            oneCourse.name,
                            oneCourse.image,
                            crsprice.lvcindiadiscprice,
                            crsprice.lvcosdiscprice,
                            oneCourse.duration,
                            'LVC',
                            oneCourse.loyalpoint,
                            oneCourse.INRexam,
                            oneCourse.USDexam,
                            'false'
                          )
                          router.push('/cart')
                        }}
                      >
                        Buy Now
                      </button>

                      <button
                        className='default-btn'
                        onClick={() => {
                          addToCart(
                            oneCourse.id,
                            oneCourse.name,
                            oneCourse.image,
                            crsprice.lvcindiadiscprice,
                            crsprice.lvcosdiscprice,
                            oneCourse.duration,
                            'LVC',
                            oneCourse.loyalpoint,
                            oneCourse.INRexam,
                            oneCourse.USDexam,
                            'true'
                          )
                          fetchCartItems()
                          router.push(`/courses/${slugFromUrl}`)
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>

                <div className='courses-share'>
                  <button
                    className='showbtnastext'
                    onClick={() =>
                      sendtoEnquiry(oneCourse.id, oneCourse.name, 'LVC')
                    }
                  >
                    Need more Info
                  </button>
                </div>
              </div>
            </div>

            <div className='rowpricecol'>
              <span className='pricelinebig'>Corporate Batch</span>
              <span className='priceline'>
                Customized to your organization's requirements
              </span>
              <span className='pricelinebig'>Contact for Pricing</span>
              <span
                style={{ marginTop: '38px' }}
                className='priceline seprt'
              ></span>
              <span className='priceline'>
                Tailored to your requirement. Do get in touch with us to share
                your requirement & schedule a call to discuss this.
              </span>
              <div
                className='courses-details-info'
                style={{
                  border: 'none',
                  marginTop: '100px',
                  marginLeft: '0px'
                }}
              >
                <div className='courses-share'>
                  <button
                    className='default-btn'
                    onClick={() => sendtoEnquiry(oneCourse.id, oneCourse.name)}
                  >
                    Need more Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className='container'
        style={{
          marginBottom: '20px',
          marginTop: '30px',
          paddingLeft: '40px',
          display: isquiz === 'crs' ? 'block' : 'none'
          // backgroundColor: "blueviolet"
        }}
      >
        {filteredFaqData.length ? (
          <div style={{ marginBottom: '50px' }}>
            <h2>Frequently Asked Questions (FAQ)</h2>
          </div>
        ) : (
          ''
        )}

        <div>
          {filteredFaqData.length
            ? filteredFaqData.map((faqItem, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'black' }} />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography>
                      <h4 style={{ fontSize: '19px', fontWeight: 'normal' }}>
                        {faqItem.question}
                      </h4>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <p dangerouslySetInnerHTML={{ __html: faqItem.answer }} />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            : ''}
        </div>
      </div>

      <Partner />

      <div
        className='about-area-two pb-100'
        style={{ backgroundColor: '#fff' }}
      >
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-5 col-md-12'>
              <div className='about-video-box2'>
                <div className='image'>
                  <Image
                    src='/images/cf-about-Pic.png'
                    alt='win-upskill-about-image'
                    width={350}
                    height={400}
                  />
                </div>
              </div>
            </div>

            <div className='col-lg-7 col-md-12'>
              <div className='about-content-box'>
                <span className='sub-title' style={{ color: '#000' }}>
                  Who are we?
                </span>
                <h2 style={{ color: '#D0140F' }}>WE ARE WIN UPSKILL</h2>
                <p>
                  We offer IT management training & consulting services. We are
                  a startup of 7 years, founded by a team of experts with an
                  average of 18 years of expertise.
                </p>
                <p>
                  We have helped over 15K IT professionals to shape up their
                  career through our certification courses.
                </p>
                <p>
                  We specialize in IT Service Management, IT Governance, Cyber
                  Security, Data Privacy, Project Management, Quality Management
                  & Emerging Technology related trainings. We help you achieve
                  certifications like ITIL, ISO 27001 Lead Auditor, ISO 27701
                  Auditor, COBIT Assessor & Practitioner, SIAM Professional,
                  Artificial Intelligence, Blockchain, Cloud Computing etc.
                </p>
                <p>
                  Our trainings are accredited by Global leaders like Axelos,
                  Peoplecert, EXIN, PECB, Exemplar Global etc
                </p>
                <p>
                  <strong>
                    Our Goal is to provide you with the skills & certifications
                  </strong>
                  to master the critical tactics and strategies that will drive
                  your career growth.
                </p>
              </div>
            </div>
            {relatedCourse.length > 0 && (
              <RelatedCourse relatedCourse={relatedCourse} />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Details
