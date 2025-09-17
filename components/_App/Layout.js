import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { ToastProvider } from 'react-toast-notifications'
import { Toaster } from 'react-hot-toast'
import Router from 'next/router'
const GoTop = dynamic(() => import('./GoTop'))
const Navbar = dynamic(() => import('./Navbar'))
const Footer = dynamic(() => import('./Footer'))
const Preloader = dynamic(() => import('./Preloader'))
import axios from 'axios'
import { useRouter } from 'next/router'
import { DefaultSeo, NextSeo } from 'next-seo'
import StudentNavbar from './StudentNavbar'
import AdminNavbar from './AdminNavbar'
// import CoookieConsents from "react-cookie-consent";

const Layout = ({ children, user }) => {
  const isStudent = user && user.role === 'student'
  const isAdmin = user && user.role === 'admin'
  const isTeacher = user && user.role === 'teacher'
  const isNormal = user && user.role === 'normal'

  const [loader, setLoader] = React.useState(true)
  const [user2, setUser2] = React.useState()
  const [token, setToken] = React.useState()

  const [seodata, setSeodata] = useState([])
  const [matchedUrls, setMatchedUrls] = useState({})

  const [canonicalUrl, setCanonicalUrl] = useState('https://winupskill.com')

  const router = useRouter()

  React.useEffect(() => {
    fetchSeoData()
    setToken(localStorage.getItem('token'))
    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }, [])

  useEffect(() => {
    fetchSeoData()
  }, [router])

  const fetchSeoData = async () => {
    try {
      const response = await axios.get('https://winupskill.in/api/api/seodata')
      const data = response.data.data
      setSeodata(data)

      const pathname = window.location.pathname
      const matched = data.find(
        obj => obj.url === 'https://www.winupskill.com' + pathname
      )

      if (matched) {
        setMatchedUrls(matched)
        const tmppath = 'https://www.winupskill.com' + pathname
        setCanonicalUrl(tmppath)
      } else {
        setCanonicalUrl('')
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error)
    }
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'))

      // Check if running on the client-side

      if (!user2) {
        if (localStorage.getItem('token')) {
          const payload = { headers: { Authorization: 'Bearer ' + token } }
          const url = `https://winupskill.in/api/api/users`
          const responseuser = axios
            .get(url, payload)
            .then(user2 => {
              setUser2(user2.data)
            })
            .catch(error => {
              // Handle the error
              console.error('Error fetching user:', error)
            })
        }
      }

      if (!localStorage.getItem('token')) {
        const pathname = window.location.pathname //returns the current url minus the domain name

        // if a user not logged in then user can't access those pages
        const isProtectedRoute =
          pathname === '/become-a-teacher' ||
          pathname === '/my-courses' ||
          pathname === '/teacher/courses' ||
          pathname.startsWith('/my-courses') ||
          pathname.startsWith('/user')
        //||
        //ctx.pathname === "/checkout";

        if (isProtectedRoute) {
          Router.push('/authentication')
        }
      } else {
        const pathname = window.location.pathname //returns the current url minus the domain name

        // if a user logged in then user can't access those pages
        const ifLoggedIn =
          pathname === '/authentication' || pathname === '/reset-password'
        if (ifLoggedIn) {
          Router.push('/')
        }
      }
    }
  }, [token])

  Router.events.on('routeChangeStart', () => {
    setLoader(true)
  })
  Router.events.on('routeChangeComplete', () => {
    setLoader(false)
  })
  Router.events.on('routeChangeError', () => {
    setLoader(false)
  })

  if (!user) {
    if (!user2) {
      if (typeof window !== 'undefined') {
        // Check if running on the client-side

        if (token) {
          const payload = { headers: { Authorization: 'Bearer ' + token } }
          const url = `https://winupskill.in/api/api/users`
          const responseuser = axios
            .get(url, payload)
            .then(user2 => {
              setUser2(user2.data)
            })
            .catch(error => {
              // Handle the error
              console.error('Error fetching user:', error)
            })
        }
      }
    }
  } else {
    if (!user2) {
      setUser2(user)
    }
  }

  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = async () => {
      try {
        const tempuid = localStorage.getItem('tempuserid')
        const url = `${process.env.NEXT_PUBLIC_API}/cartitems?tempuserid=${tempuid}`
        const response = await axios.get(url)
        setCartCount(response.data.data.length)
      } catch (error) {
        console.error('Error reading cart items:', error)
        setCartCount(0)
      }
    }

    // Call on first mount
    updateCartCount()

    // Update on every route change complete
    const handleRouteChange = () => {
      updateCartCount()
    }

    Router.events.on('routeChangeComplete', handleRouteChange)

    // Cleanup
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <React.Fragment>
      {matchedUrls ? (
        <Head>
          <title>{matchedUrls.pagetitle}</title>
          <meta name='description' content={matchedUrls.metadesc} />

          <meta name='keywords' content={matchedUrls.metakeywords} />

          <meta itemprop='name' content={matchedUrls.pagetitle} />
          <meta itemprop='description' content={matchedUrls.metadesc} />

          {matchedUrls ? (
            <link rel='canonical' href={canonicalUrl} />
          ) : (
            <link rel='canonical' href='https://www.winupskill.com' />
          )}

          <meta name='robots' content='index, follow' />

          <meta
            name='msvalidate.01'
            content='B5019C1715117F4F5E9CD779F6B98CDA'
          />
          <meta name='geo.region' content='IN-KA' />
          <meta
            name='geo.placename'
            content='Kanakapura, Bangalore, Karnataka, India'
          />
          <meta name='geo.position' content='12.8856494; 77.6123153' />
        </Head>
      ) : (
        <Head>
          <title>win upskilling universe</title>
          <meta name='description' content='win upskill page description' />

          <meta name='keywords' content='win upskill page keywords' />

          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <meta name='twitter:card' content='win upskilling'></meta>

          <meta name='robots' content='index, follow' />
          <meta
            name='msvalidate.01'
            content='B5019C1715117F4F5E9CD779F6B98CDA'
          />
          <meta name='geo.region' content='IN-KA' />
          <meta
            name='geo.placename'
            content='Kanakapura, Bangalore, Karnataka, India'
          />
          <meta name='geo.position' content='12.8856494; 77.6123153' />
        </Head>
      )}

      {loader && <Preloader />}

      <Toaster position='top-left' reverseOrder={false} />

      <ToastProvider
        placement='bottom-left'
        autoDismissTimeout={10000}
        autoDismiss
      >
        {/* {isNormal && (
                    
                    <Navbar user={user2} />
                )}
                    
{isStudent && (
                    
                    <AdminNavbar user={user2} />
                )} */}
        {isStudent ? (
          ''
        ) : isAdmin || isTeacher ? (
          ''
        ) : (
          <Navbar user={user2} cartCount={cartCount} />
        )}

        {children}

        <Footer />
      </ToastProvider>

      {/* <CoookieConsents></CoookieConsents> */}
    </React.Fragment>
  )
}

export default Layout
