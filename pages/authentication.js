import React, { useEffect } from 'react'
import PageBanner from '../components/Common/PageBanner'
import LoginForm from '../components/Authentication/LoginForm'
import RegisterForm from '../components/Authentication/RegisterForm'
import { useRouter } from 'next/router'

const Authentication = () => {
  const router = useRouter()
  //   useEffect(() => {
  //     if (typeof window !== 'undefined') {
  //       const wlp = localStorage.getItem('wlp')
  //       if (wlp === 'yes') {
  //         if (confirm('Login/Register to claim Loyalty Points')) {
  //           localStorage.setItem('wlp', 'no')
//   router.push('/checkout')
  //         }
  //       }
  //     }
  //   }, [])

  return (
    <React.Fragment>
      <PageBanner
        pageTitle='Login or Register to Continue your Learning Journey!'
        homePageUrl='/'
        homePageText='Home'
        activePageText='Login or Register'
      />
      <div className='profile-authentication-area ptb-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 col-md-12'>
              <LoginForm />
            </div>

            <div className='col-lg-6 col-md-12'>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Authentication
