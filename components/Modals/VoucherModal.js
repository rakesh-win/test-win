import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { countryCodes } from '@/utils/countrycode'

function VoucherModal ({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)

  // Country code state
  const [countryCode, setCountryCode] = useState('+91')
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find(c => c.code === '+91')
  )

  // Get userid from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      const storedId = localStorage.getItem('userid')
      setUserId(storedId)
    }
  }, [isOpen])

  if (!isOpen) return null

  // Handle input change for country code
  const handleCountryInputChange = e => {
    const storedCountry = localStorage.getItem('country')
    let defaultPrefix = '+'

    if (storedCountry === 'India') {
      defaultPrefix = '+91'
    }

    let value = e.target.value

    // Add defaultPrefix if user didn't type '+'
    if (!value.startsWith('+')) {
      value = defaultPrefix + value.replace(/^\+/, '')
    }

    setCountryCode(value)

    const match = countryCodes.find(c => c.code === value)
    if (match) setSelectedCountry(match)
  }

  // Handle dropdown change
  const handleCountrySelectChange = e => {
    const code = e.target.value
    setCountryCode(code)
    const match = countryCodes.find(c => c.code === code)
    setSelectedCountry(match)
  }

  const handleSubmit = async () => {
    if (!name) return alert("Please enter your friend's/colleague's name")
    if (!email.includes('@')) return alert('Please enter a valid email')
    if (!phone || phone.length < 5)
      return alert("Please enter a valid friend's/colleague's phone number")
    if (!userId) return alert('User ID not found. Please login again.')

    setLoading(true)
    try {
      const res = await axios.post('https://winupskill.in/api/api/vouchers', {
        userid: userId || localStorage.getItem('tmpemail'),
        freind_name: name,
        freind_email: email,
        freind_phone: countryCode + phone,
        course
      })

      if (res.status === 200 || res.status === 201) {
        setSubmitted(true)
        setName('')
        setEmail('')
        setPhone('')
        setCourse('')
      } else {
        alert('Error submitting referral.')
      }
    } catch (error) {
      console.error(error.response?.data || error)
      alert(
        error.response?.data?.message ||
          'Error submitting referral. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReferAnother = () => setSubmitted(false)

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }

  const modalStyle = {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    width: '420px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    position: 'relative'
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px'
  }

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '12px'
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        {!submitted ? (
          <>
            <input
              type='text'
              placeholder="Friend's/Colleague's Name (Mandatory)"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
            />
            <input
              type='email'
              placeholder="Friend's/Colleague's Email (Mandatory)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />

            {/* Country selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
              <select
                value={selectedCountry?.code}
                onChange={handleCountrySelectChange}
                style={{ ...inputStyle, flex: 1 }}
                position='down'
              >
                {countryCodes.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>

              <input
                type='text'
                value={countryCode}
                onChange={handleCountryInputChange}
                placeholder='Enter country code'
                style={{ ...inputStyle, flex: 0.5 }}
              />
            </div>

            <input
              type='tel'
              placeholder="Friend's/Colleague's Phone (Mandatory)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={inputStyle}
            />
            <input
              type='text'
              placeholder='Course interested in (Optional)'
              value={course}
              onChange={e => setCourse(e.target.value)}
              style={inputStyle}
            />
            <button
              className='default-btn-cart'
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </>
        ) : (
          <>
            <p>
              Thank you for your referral. You will receive your Amazon voucher
              once your friend or colleague purchases a course from us.
            </p>
            <button style={buttonStyle} onClick={handleReferAnother}>
              Refer Another Friend
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default VoucherModal
