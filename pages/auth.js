import LoginForm from '@/components/Authentication/LoginForm'
import RegisterForm from '@/components/Authentication/RegisterForm'
import React, { useState } from 'react'

function Auth () {
  const [swtch, setSwtch] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // so button goes below form
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6'
      }}
    >
      <div
        style={{
          borderRadius: '8px',
          backgroundColor: '#fff',
          minWidth: '320px'
        }}
      >
        {!swtch ? (
          <LoginForm />
        ) : (
          <div
            style={{
              padding: 10,
              minWidth: '320px',

              minHeight: '100vh'
            }}
          >
            {' '}
            <RegisterForm />
          </div>
        )}
      </div>

      <span
        onClick={() => setSwtch(!swtch)}
        style={{
          marginTop: '16px',
          color: '#2563eb',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        {!swtch
          ? 'Didn’t sign up? Sign up'
          : 'Already have an account? Sign in'}
      </span>
    </div>
  )
}

export default Auth
