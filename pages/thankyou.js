import React from 'react'

const ThankYouCard = ({ msg, mail, pass }) => {
  return (
    <div
      style={{
        background: '#fff',
        padding: '35px 30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        width: '100%',
        height: '100%', // 👈 ensures equal height with sibling
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        lineHeight: '1.6'
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600' }}>
        Thank you for your order
      </h2>
      <p style={{ marginBottom: '20px', fontSize: '15px', color: '#333' }}>
        We have received your order successfully.
      </p>

      {msg ===
        'Existing email id found. Purchased courses are assigned to the same' && (
        <p style={{ marginBottom: '15px', fontSize: '15px', color: '#555' }}>
          We have found an existing email id: <strong>{mail}</strong>. Purchased
          course access has been assigned to this email id. Please login and
          continue your learning journey!
        </p>
      )}

      {msg === 'New user created & Course assigned' && (
        <>
          <p style={{ marginBottom: '15px', fontSize: '15px', color: '#555' }}>
            We have created a new account with your email id:{' '}
            <strong>{mail}</strong>. Purchased course access has been assigned
            to this email id.
          </p>
          <p style={{ marginBottom: '15px', fontSize: '15px', color: '#555' }}>
            Please use this email and password: <strong>{pass}</strong> to login
            and continue your learning journey!
          </p>
        </>
      )}

      {msg === 'enrollstats created for existing user' && (
        <p style={{ marginBottom: '15px', fontSize: '15px', color: '#555' }}>
          Purchased course access has been assigned. Please visit your Profile
          and continue your learning journey!
        </p>
      )}
    </div>
  )
}

export default ThankYouCard
