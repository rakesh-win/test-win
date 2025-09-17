import React, { useState, useEffect, useRef } from 'react'
// import Navbar from '../components/_App/Navbar';
import dynamic from 'next/dynamic'

import { parseCookies } from 'nookies'
import axios from 'axios'
import PageBanner from '@/components/Common/PageBanner'
import Link from 'next/link'
import baseUrl from '@/utils/baseUrl'
import cookie from 'js-cookie'
// import Footer from '../components/_App/Footer';
import Progress_sml from '@/components/Common/Progress_sml'
import InfoIcon from '@mui/icons-material/Info'

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import EditProfile from './edit-profile'
import EditPassword from './edit-password'
import Updatecv from './updatecv'

import Zero from './forum'
import Router from 'next/router'

import Alert from 'react-popup-alert'
import Preloader from '@/components/_App/Preloader'
import Tooltip from '@mui/material/Tooltip'
import EventCalendar from 'pages/calendar'
import { useRouter } from 'next/router'
const Enrolled = dynamic(() => import('@/components/My-Profiles/Enrolled'), {
  ssr: false // optional: disable server-side rendering
})
import Completed from '@/components/My-Profiles/Completed'
import MyCertificates from '@/components/My-Profiles/MyCertificates'
import YouMayAlso from '@/components/My-Profiles/YouMayAlso'
const LoyalityPoints = dynamic(
  () => import('@/components/My-Profiles/LoyalityPoints'),
  {
    ssr: false // optional: disable server-side rendering
  }
)

const FreeVoucher = dynamic(
  () => import('@/components/My-Profiles/FreeVoucher'),
  {
    ssr: false // optional: disable server-side rendering
  }
)

const tabNames = [
  'Manage Profile',
  'Free Voucher',
  'Loyalty Points',
  'Enrolled',
  'Completed',
  'My Certificates',
  'Training Calendar',
  'You may also like'
]

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ width: '100%' }}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps (index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

const MyProfile = ({ data }) => {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)

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

  const [user, setUser] = React.useState({})
  const [userprofile, setUserprofile] = React.useState({})
  const [token, setToken] = React.useState()
  const [badges, setBadges] = React.useState([])
  const [certs, setCerts] = React.useState([])
  const [progs, setProgs] = React.useState()
  const [country, setCountry] = React.useState('')

  useEffect(() => {
    const getCountry = () => {
      if (typeof window != 'undefined') {
        const ctry = localStorage.getItem('country')
        setCountry(ctry)
      }
    }

    getCountry()
  }, [country])

  const [cmpl, setCmpl] = React.useState([])
  const [allsubs, setAllsubs] = React.useState([])

  const [enrolledCourses, setenrolledCourses] = React.useState([])

  const [selectedFile, setSelectedFile] = useState(null)
  const [loading2, setLoading2] = useState(false)

  const [mentorprofile, setMentorprofile] = React.useState([])

  const [pbrandingp, setPbrandingp] = React.useState([])

  const [relatedc, setRelatedc] = React.useState([])

  function handleFileInputChange (event) {
    setSelectedFile(event.target.files[0])
  }

  const [value, setValue] = React.useState(0)
  const tabsRef = useRef(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)

    // Update router query to reflect the tab name, not an index
    router.push(
      {
        pathname: router.pathname,
        query: { tab: tabNames[newValue].toLowerCase().replace(/\s+/g, '_') } // Map index to tab name
      },
      undefined,
      { shallow: true }
    )
  }

  const scrollLeft = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -150, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 150, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const { tab } = router.query

    if (tab) {
      const tabIndex = tabNames.findIndex(
        name => name.toLowerCase().replace(/\s+/g, '_') === tab
      )
      if (tabIndex >= 0) {
        setValue(tabIndex) // Set the value to the index of the tab name
      }
    }
  }, [router.query])

  const [value2, setValue2] = React.useState(0)

  const handleChange2 = (event, newValue2) => {
    setValue2(newValue2)
  }

  const loadfunc = undefined

  const enrolledCourse2 = []

  useEffect(() => {
    getenrolledCourses()
  }, [loadfunc, enrolledCourse2.length])

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    getpbranding()
  }, [])

  useEffect(() => {
    setLoading(true)
    setToken(localStorage.getItem('token'))
    getUser()
    getBadges()
    getCerts()
    progressbar()
    getenrolledCourses()
    getrelatedcourses()
    setLoading(false)
  }, [token])

  useEffect(() => {
    progressbar()
  }, [cmpl.length])

  function getpbranding () {
    var upid = localStorage.getItem('userid')

    const url = `https://winupskill.in/api/api/clubservices?service=personalbranding&&userid=${upid}`

    var response = axios.get(url).then(result => {
      setPbrandingp(result.data.data)
    })
  }

  function handleUploadButtonClick () {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const payload = {
        headers: { Authorization: 'Bearer ' + token }
      }

      axios
        .post(
          'https://winupskill.in/api/api/userimageupdate',
          formData,
          payload
        )
        .then(response => {
          setUser(response.data[0])
        })
        .catch(error => {
          // Do something with the error, such as displaying an error message or updating the UI
        })
    }
  }

  const getBadges = async () => {
    const url = `https://winupskill.in/api/api/badges`

    if (token) {
      const payload = {
        headers: { Authorization: 'Bearer ' + token }
      }
      var response = await axios.get(url, payload).then(result => {
        setBadges(result.data)
      })
    }
  }

  const getCerts = async () => {
    const url = `https://winupskill.in/api/api/usercerts`

    if (token) {
      const payload = {
        headers: { Authorization: 'Bearer ' + token }
      }
      var response = await axios.get(url, payload).then(result => {
        setCerts(result.data.data)
      })
    }
  }

  const getUser = async () => {
    const url = `https://winupskill.in/api/api/users`
    if (token) {
      const payload = {
        headers: { Authorization: 'Bearer ' + token }
      }
      var response = await axios.get(url, payload).then(result => {
        cookie.set('id', result.data.id)

        var response = axios
          .get(`https://winupskill.in/api/api/signedusers`, payload)
          .then(result2 => {
            setUser(result2.data[0])
          })

        var re = axios
          .get(`https://winupskill.in/api/api/usrprofile`, payload)
          .then(result3 => {
            if (result3.data.length) {
              setUserprofile(result3.data[0])
            } else {
              var tempobj = {
                country: 'Not Updated',
                state: 'Not Updated',
                address: 'Not Updated',
                experience: 'Not Updated',
                currentrole: 'Not Updated',
                linkedinurl: 'Not Updated',
                cvurl: 'Not Updated'
              }
              setUserprofile(tempobj)
            }
          })

        var u = localStorage.getItem('userid')
        var response = axios
          .get(
            `https://winupskill.in/api/api/mentorapplications?userid=${u}`,
            payload
          )
          .then(resultu => {
            setMentorprofile(resultu.data.data)
          })
      })
    }
  }

  const getenrolledCourses = async ctx => {
    loadfunc = 1
    if (!token) {
      return { enrolled: [] }
    }

    const payload = {
      headers: { Authorization: 'Bearer ' + token }
    }

    const url = `https://winupskill.in/api/api/enrollstats`
    var response = await axios.get(url, payload).then(result => {
      setenrolledCourses(result.data),
        (enrolledCourse2 = result.data),
        progressbar()
    })
  }
  const getrelatedcourses = async ctx => {
    if (token) {
      const payload = {
        headers: { Authorization: 'Bearer ' + token }
      }
      const url = `https://winupskill.in/api/api/relatedcourses`
      var response = await axios.get(url, payload).then(result => {
        setRelatedc(result.data)
      })
    }
  }

  const progressbar = async () => {
    if (token) {
      const payload = {
        headers: { Authorization: 'Bearer ' + token }
      }
      const url = `https://winupskill.in/api/api/completedsubjects2`
      var response = axios.get(url, payload).then(result => {
        setCmpl(result.data)
      })
    }
  }

  function handleEditupdate (newValue) {
    getUser()
  }

  function gotocareercounselling () {
    Router.push('/user/counselling')
  }

  function gotocareeropportunities () {
    Router.push('/user/career-opportunities')
  }

  function gotopersonalpranding () {
    setLoading(true)

    const formData2 = new FormData()
    formData2.append('userid', localStorage.getItem('userid'))
    formData2.append('service', 'personalbranding')
    axios
      .post('https://winupskill.in/api/api/clubservices', formData2)
      .then(response2 => {
        console.log('Success2:', response2.data)

        setLoading(false)

        setHeadertext('Success!'),
          setBtntext('Close'),
          onShowAlert(
            'success',
            'We have received your request and will be in touch soon to discuss how we can help in your personal branding!'
          )
      })
      .catch(error => {
        setLoading(false)
        console.log('Error:', error)
      })
  }

  function gotogetmentored () {
    Router.push('/user/mentorship/getmentored')
  }

  function gotomentorapplication () {
    Router.push('/user/mentorship/mentorapplication')
  }

  function gotoupdatementorprofile () {
    Router.push('/user/mentorship/mentorprofile')
  }

  function gotoviewmenteeapplications () {
    Router.push('/user/mentorship/view-mentee-applications')
  }

  useEffect(() => {
    const fetchSignedUser = async () => {
      const checkpoint = localStorage.getItem('checkpoints')

      if (checkpoint === '1') {
        console.log('Checkpoint is 1 — skipping API call.')
        return
      }
      try {
        const payload = {
          headers: { Authorization: 'Bearer ' + token }
        }
        const signedRes = await axios.get(
          `https://winupskill.in/api/api/signedusers`,
          payload
        )
        console.log('')
        if (signedRes && signedRes.data[0] && signedRes.data[0].email) {
          let values = 'India'
          let url = ''

          if (typeof window !== 'undefined') {
            if (localStorage.getItem('country') === values) {
              url = 'assignpoints'
            } else {
              url = 'assignpointsos'
            }
          }
          axios
            .post(`${process.env.NEXT_PUBLIC_API}/${url}`, {
              email: signedRes.data[0].email,
              userid:
                typeof window !== 'undefined' && localStorage.getItem('userid')
            })
            .then(res => {
              if (res.status === 200 || res.status === 201) {
                localStorage.setItem('checkpoints', '1')
                window.location.href = '/user/my-profile'
              }
            })
            .catch(err => {
              console.error('Error assigning points:', err)
            })
        }
      } catch (error) {
        console.error('Error fetching signed user:', error)
      }
    }

    if (token) {
      fetchSignedUser()
    }
  }, [token])

  const toSentenceCase = str => {
    if (!str) return 'Not updated'
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <PageBanner
        pageTitle={`Hi ${user.name}, Welcome to your Profile!`}
        homePageUrl='/'
        homePageText='Home'
        activePageText='My Profile'
      />

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

      <div className='ptbpage'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <Box sx={{ width: '100%' }} ref={tabsRef}>
                <Tabs
                  ScrollButtonComponent={props => {
                    // props includes: direction, onClick, disabled
                    const { direction, ...other } = props
                    return direction === 'left' ? (
                      <ArrowBackIos {...other} style={{ cursor: 'pointer' }} />
                    ) : (
                      <ArrowForwardIos
                        {...other}
                        style={{ cursor: 'pointer' }}
                      />
                    )
                  }}
                  value={value}
                  onChange={handleChange}
                  variant='scrollable'
                  scrollButtons='auto'
                  allowScrollButtonsMobile
                  TabIndicatorProps={{
                    style: {
                      height: '12px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.2)', // light box
                      bottom: 0,
                      zIndex: -1 // behind the tab
                    }
                  }}
                  sx={{
                    position: 'relative',
                    '.MuiTabs-indicator': {
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  {tabNames.map((tabName, index) => (
                    <Tab
                      key={index}
                      label={tabName}
                      sx={{
                        zIndex: 1,
                        color: 'black',
                        fontWeight: 500,
                        borderRadius: '12px',
                        px: 3,
                        py: 1.5,
                        position: 'relative',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.3s ease',
                        '&.Mui-selected': {
                          color: 'red', // ✅ fixed
                          background: 'pink'
                        },
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    />
                  ))}
                </Tabs>
                <TabPanel value={value} index={0}>
                  <>
                    {
                      <div className='profile-tab-container'>
                        <div className='profileborder'>
                          <div className='usrleft'>
                            <div className='containerimgg'>
                              <div className='userProfile'>
                                <div className='userImageContainer'>
                                  <img src={user.image} className='userImage' />
                                  <img
                                    style={{
                                      display:
                                        user.usertype === 'free' ? '' : 'none'
                                    }}
                                    src='/images/freeuser.png'
                                    className='userBadge freeUser'
                                  />
                                  <img
                                    style={{
                                      display:
                                        user.usertype === 'premium'
                                          ? ''
                                          : 'none'
                                    }}
                                    src='/images/premiumuser.png'
                                    className='userBadge freeUser'
                                  />
                                </div>
                              </div>
                            </div>

                            <input
                              className='imgupl'
                              type='file'
                              onChange={handleFileInputChange}
                            />
                            <button
                              className='default-btn mt-10'
                              onClick={handleUploadButtonClick}
                            >
                              Upload
                            </button>
                          </div>

                          <div className='usrright'>
                            <div className='usrrighttbl1'>
                              <div className='user-profile-table'>
                                <div className='table-responsive'>
                                  <table className='table table-bordered vertical-align-top'>
                                    <tbody>
                                      <tr>
                                        <td>Name</td>
                                        <td>{user.name}</td>
                                      </tr>
                                      <tr>
                                        <td>Email</td>
                                        <td>{user.email}</td>
                                      </tr>

                                      <tr>
                                        <td>Mobile</td>
                                        <td>{user.mobile}</td>
                                      </tr>
                                      <tr>
                                        <td>Country</td>
                                        <td>
                                          <td>
                                            {toSentenceCase(
                                              userprofile.country
                                            )}
                                          </td>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>State</td>
                                        <td
                                          style={{
                                            textTransform: 'capitalize'
                                          }}
                                        >
                                          {userprofile.state !== null
                                            ? userprofile.state
                                            : 'not updated'}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className='usrrighttbl2'>
                              <div className='user-profile-table'>
                                <div className='table-responsive'>
                                  <table className='table table-bordered vertical-align-top'>
                                    <tbody>
                                      <tr>
                                        <td>Address</td>
                                        <td>
                                          {userprofile.address !== null
                                            ? userprofile.address
                                            : 'not updated'}
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>Your Experience (No of Years)</td>
                                        <td>
                                          {userprofile.experience !== null
                                            ? userprofile.experience
                                            : 'not updated'}
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>Your Current Role</td>
                                        <td>
                                          {userprofile.currentrole !== null
                                            ? userprofile.currentrole
                                            : 'd'}
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>Linkedin URL</td>
                                        <td>
                                          {userprofile.linkedinurl !== null
                                            ? userprofile.linkedinurl
                                            : 'not updated'}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Redeemable Loyalty Points Balance{' '}
                                          <Tooltip
                                            title={`1 Loyalty Point =  ${
                                              country === 'India'
                                                ? 'INR 1'
                                                : 'USD 1'
                                            }`}
                                            placement='top'
                                          >
                                            <span
                                              style={{
                                                cursor: 'pointer',
                                                fontSize: 20,
                                                color: 'red'
                                              }}
                                            >
                                              <InfoIcon color='' />
                                            </span>
                                          </Tooltip>
                                        </td>

                                        <td
                                          style={{ backgroundColor: '#90EE90' }}
                                        >
                                          <span
                                            style={{
                                              color: 'black',
                                              textAlign: 'center'
                                            }}
                                          >
                                            {userprofile.points
                                              ? userprofile.points
                                              : '0'}
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='profileborder2'>
                          <div className='clubservices'>win Club Services</div>
                          <div className='clubservicesbtn'>
                            <Tooltip
                              title='Counselling Service to provide guidance in course selection'
                              placement='top-start'
                            >
                              <button
                                className='default-btn mt-10'
                                onClick={gotocareercounselling}
                              >
                                Get Career Counselling
                              </button>
                            </Tooltip>
                            <button
                              className='default-btn mt-10'
                              onClick={gotocareeropportunities}
                            >
                              View Career Opportunities
                            </button>

                            <span
                              style={{
                                display:
                                  user.usertype === 'premium' ? '' : 'none'
                              }}
                            >
                              {pbrandingp.length ? (
                                <span className='textbelowbtn'>
                                  <button
                                    className='default-btn mt-10'
                                    style={{ backgroundColor: '#bebebe' }}
                                    disabled='true'
                                  >
                                    Get help with Personal Branding
                                  </button>
                                  * Request Received
                                </span>
                              ) : (
                                <button
                                  className='default-btn mt-10'
                                  onClick={gotopersonalpranding}
                                >
                                  Get help with Personal Branding
                                </button>
                              )}
                              <Tooltip
                                title='Guidance by Industry Experts to help you achieve your career goal'
                                placement='top-start'
                              >
                                <button
                                  className='default-btn mt-10'
                                  onClick={gotogetmentored}
                                >
                                  Get Mentored
                                </button>
                              </Tooltip>
                              {mentorprofile.length ? (
                                <span className='textbelowbtn'>
                                  <button
                                    className='default-btn mt-10'
                                    style={{ backgroundColor: '#bebebe' }}
                                    disabled='true'
                                  >
                                    Become a Mentor
                                  </button>
                                  * Request Received
                                </span>
                              ) : (
                                <button
                                  className='default-btn mt-10'
                                  onClick={gotomentorapplication}
                                >
                                  Become a Mentor
                                </button>
                              )}
                            </span>

                            <span
                              style={{
                                display: user.usertype === 'free' ? '' : 'none'
                              }}
                            >
                              {pbrandingp.length ? (
                                ''
                              ) : (
                                <span className='textbelowbtn'>
                                  <button
                                    className='default-btn mt-10'
                                    style={{ backgroundColor: '#bebebe' }}
                                    disabled='true'
                                  >
                                    Get help with Personal Branding
                                  </button>
                                  * For Premium Users
                                </span>
                              )}

                              <span className='textbelowbtn'>
                                <Tooltip
                                  title='Guidance by Industry Experts to help you achieve your career goal'
                                  placement='top-start'
                                >
                                  <button
                                    className='default-btn mt-10'
                                    style={{ backgroundColor: '#bebebe' }}
                                    disabled='true'
                                  >
                                    Get Mentored
                                  </button>
                                </Tooltip>
                                * For Premium Users
                              </span>

                              {mentorprofile.length ? (
                                ''
                              ) : (
                                <span className='textbelowbtn'>
                                  <button
                                    className='default-btn mt-10'
                                    style={{ backgroundColor: '#bebebe' }}
                                    disabled='true'
                                  >
                                    Become a Mentor
                                  </button>
                                  * For Premium Users
                                </span>
                              )}
                            </span>
                          </div>
                        </div>

                        <div
                          className='profileborder3'
                          style={{
                            display:
                              mentorprofile && mentorprofile.length > 0
                                ? 'block'
                                : 'none'
                          }}
                        >
                          <div className='clubservices'>
                            Welcome to our mentor section:
                          </div>

                          <div className='clubservicesbtn'>
                            <button
                              className='default-btn mt-10'
                              onClick={gotoupdatementorprofile}
                            >
                              View / Update Mentor Profile
                            </button>
                            <button
                              className='default-btn mt-10'
                              onClick={gotoviewmenteeapplications}
                            >
                              View Mentee Applications
                            </button>
                          </div>
                        </div>

                        <div className='editbox'>
                          <Box
                            sx={{
                              'min-height': '200px',
                              borderColor: 'divider'
                            }}
                          >
                            <Tabs
                              allowScrollButtonsMobile
                              variant='scrollable'
                              scrollButtons='auto'
                              value={value2}
                              onChange={handleChange2}
                              aria-label='basic tabs example'
                            >
                              <Tab
                                className='profiletablabel'
                                label='Edit Profile'
                                {...a11yProps(5)}
                              />
                              <Tab
                                className='profiletablabel'
                                label='Change Password'
                                {...a11yProps(6)}
                              />
                              <Tab
                                className='profiletablabel'
                                label='Update CV'
                                {...a11yProps(7)}
                              />
                            </Tabs>

                            <TabPanel value={value2} index={0}>
                              <EditProfile
                                user={user}
                                userprofile={userprofile}
                                token={token}
                                onObjectChange={handleEditupdate}
                              />
                            </TabPanel>
                            <TabPanel value={value2} index={1}>
                              <EditPassword
                                user={user}
                                userprofile={userprofile}
                                token={token}
                              />
                            </TabPanel>
                            <TabPanel value={value2} index={2}>
                              <Updatecv
                                user={user}
                                userprofile={userprofile}
                                token={token}
                              />
                            </TabPanel>
                          </Box>
                        </div>
                      </div>
                    }
                  </>
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <div>
                    <br />
                    <FreeVoucher />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <LoyalityPoints
                    enrolledCourses={enrolledCourses}
                    loading2={loading2}
                  />
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <Enrolled
                    enrolledCourses={enrolledCourses}
                    loading2={loading2}
                    cmpl={cmpl}
                  />
                </TabPanel>

                <TabPanel value={value} index={4}>
                  <Completed
                    enrolledCourses={enrolledCourses}
                    loading2={loading2}
                    cmpl={cmpl}
                  />
                </TabPanel>

                <TabPanel value={value} index={5}>
                  <MyCertificates certs={certs} />
                </TabPanel>

                <TabPanel value={value} index={6}>
                  <div className='profile-tab-container'>
                    <h4>Training Calendar</h4>
                    <EventCalendar />
                  </div>
                </TabPanel>

                <TabPanel value={value} index={7}>
                  <YouMayAlso
                    relatedc={relatedc}
                    loading2={loading2}
                    cmpl={cmpl}
                  />
                </TabPanel>
              </Box>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='container'>
        <div className='row'></div>
      </div> */}
    </React.Fragment>
  )
}

export default MyProfile

/*

326
 // <Tab className="profiletablabel" label="Forum" {...a11yProps(8)} />

 
595
 //  <TabPanel value={value} index={4}>
                                      //  <div className="profile-tab-container">
                                      //   <Zero />
                                            

                                           
                                      //  </div>
                                      // </TabPanel>


*/
