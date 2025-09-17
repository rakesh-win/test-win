import React, { useState, Component } from 'react'
import Link from 'next/link'
import TawkTo from 'tawkto-react'
import EmailIcon from '@mui/icons-material/Email'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import CallIcon from '@mui/icons-material/Call'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { parseCookies, destroyCookie } from 'nookies'
import OptinMonsterScript from '../../utils/OptinMonsterScript'
import UtmSourceCookie from '../../utils/UtmSourceCookie'
import { useRouter } from 'next/router'
import CoookieConsents from 'react-cookie-consent'

const Footer = () => {
  const router = useRouter() // Call useRouter() here first
  const { pathname } = router

  // Disable component for a specific path
  // if (pathname === '/specific-path') {
  //   return null;  // Or return a loading state or placeholder if you prefer
  // }
  const currentYear = new Date().getFullYear()

  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = React.useState()
  const [hidealllinks, setHidealllinks] = useState(false)

  const isViewCoursePage = router.pathname === '/calculator/isocalculator'
  // Conditionally render the navbar component
  if (isViewCoursePage) return null

  React.useEffect(() => {
    setToken(localStorage.getItem('token'))
    checknavlinks()
  }, [])

  function toggleMenu () {
    setIsOpen(!isOpen)
  }

  // function handletawkClick () {
  //   console.log('called handletawkClick')
  //   if (typeof Tawk_API !== 'undefined') {
  //     Tawk_API.toggle()
  //   }
  // }

  const checknavlinks = async () => {
    if (typeof window !== 'undefined') {
      // const pathname = window.location.pathname //returns the current url minus the domain name
      if (
        pathname.startsWith('/pages/external/') ||
        pathname.startsWith('/training')
      ) {
        setHidealllinks(true)
      }
    }
  }

  if (typeof window !== 'undefined') {
    var tawk = new TawkTo('6411aa7c4247f20fefe606f8', '1grig3tvr')
  } else {
    console.log('no window')
  }

  return (
    <footer
      className='footer-area'
      style={{ display: hidealllinks ? 'none' : '' }}
    >
      <OptinMonsterScript />
      <UtmSourceCookie />

      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-4 col-sm-6'>
            <div className='single-footer-widget'>
              <h3>About Us</h3>

              <p>
                win upskill is a premium Training & Assessment service provider
                with presence in Bengaluru (India), Kolkata (India), London (UK)
                & Dubai (UAE).
              </p>

              <ul className='social-link'>
                <li>
                  <a
                    href='https://www.linkedin.com/company/consultants-factory/'
                    className='d-block'
                    target='_blank'
                  >
                    <i className='bx bxl-linkedin'></i>
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.facebook.com/consultansfactory/'
                    className='d-block'
                    target='_blank'
                  >
                    <i className='bx bxl-facebook'></i>
                  </a>
                </li>

                <li>
                  <a
                    href='https://www.instagram.com/consultantsfactory'
                    className='d-block'
                    target='_blank'
                  >
                    <i className='bx bxl-instagram'></i>
                  </a>
                </li>
                <li>
                  <a
                    href='https://twitter.com/consultfactory'
                    className='d-block'
                    target='_blank'
                  >
                    <i className='bx bxl-twitter'></i>
                  </a>
                </li>
                <li style={{ position: 'absolute' }}>
                  <a
                    href='https://play.google.com/store/apps/details?id=com.win.winupskill'
                    className='d-block'
                    target='_blank'
                  >
                    <svg
                      className='svg-element'
                      xmlns='http://www.w3.org/2000/svg'
                      width='1em'
                      height='1em'
                      viewBox='0 0 24 24'
                    >
                      <path
                        d='M12.954 11.616l2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016l8.34 8.341zm3.461 3.462l3.074-1.729c.6-.336.929-.812.929-1.34c0-.527-.329-1.004-.928-1.34l-2.783-1.563l-3.133 3.132l2.841 2.84zM4.1 4.002c-.064.197-.1.417-.1.658v14.705c0 .381.084.709.236.97l8.097-8.098L4.1 4.002zm8.854 8.855L4.902 20.91c.154.059.32.09.495.09c.312 0 .637-.092.968-.276l9.255-5.197l-2.666-2.67z'
                        fill='currentColor'
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='col-lg-4 col-md-4 col-sm-6'>
            <div className='single-footer-widget'>
              <h3>Address</h3>
              <ul className='footer-contact-info'>
                <li>
                  <i className='bx bx-map'></i>
                  2nd Floor, PVR Towers, BDA Layout BTM 4th Stage, Bengaluru,
                  Karnataka 560076, India
                </li>
                <li>
                  <i className='bx bx-phone-call'></i>
                  <a href='tel:+919606237593'>+91 96062 37593</a>
                </li>
                <li>
                  <i className='bx bx-envelope'></i>
                  <a href='mailto:info@winupskill.com'>info@winupskill.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className='col-lg-4 col-md-4 col-sm-6'>
            <div className='single-footer-widget pl-5'>
              <h3>Explore</h3>
              <ul className='footer-links-list'>
                <li>
                  <Link href='/'>
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href='/about'>
                    <a>About</a>
                  </Link>
                </li>
                <li>
                  <Link href='/contact'>
                    <a>Contact</a>
                  </Link>
                </li>

                <li>
                  <Link href='/webinar'>
                    <a>Webinar</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='footer-bottom-area'>
          <div className='row align-items-center'>
            <div className='col-lg-6 col-md-6'>
              <p>
                <i className='bx bx-copyright'></i>Copyright © {currentYear}{' '}
                <span style={{ color: '#D0140F' }}>win</span>
              </p>
            </div>

            <div className='col-lg-6 col-md-6'>
              <ul>
                <li>
                  <Link href='/privacy-policy'>
                    <a>Privacy Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href='/terms-of-service'>
                    <a>Terms & Conditions</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='lines'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>

      <div
        className='floating-button-menu'
        id='floating-button'
        style={{
          display: token ? 'block' : 'none'
        }}
      >
        <button className='main-floating-button' onClick={toggleMenu}>
          <SupportAgentIcon />
        </button>
        <div className={isOpen ? 'menu2 open' : 'menu2'}>
          <button className='sub-button'>
            <CallIcon />
            <div className='sub-text'>Call us at: +91 8123194115</div>
          </button>
          <button className='sub-button'>
            <EmailIcon />
            <div className='sub-text'>Mail us at: info@winupskill.com</div>
          </button>
          <button className='sub-button'>
            <WhatsAppIcon />
            <div className='sub-text'>Whatsapp us at: +91 8123194115</div>
          </button>
          {/* <button className="sub-button"><ChatBubbleOutlineIcon onClick={handletawkClick} /></button> */}
        </div>
      </div>
      <CoookieConsents>
        This website uses cookies to enhance the user experience.
      </CoookieConsents>
    </footer>
  )
}

export default Footer
