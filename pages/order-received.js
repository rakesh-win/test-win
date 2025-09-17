import React, { useState, useEffect } from 'react'
import PageBanner from '../components/Common/PageBanner'
import FreeVoucher from '@/components/My-Profiles/FreeVoucher'
import { makeid } from '@/utils/makeid'
import ThankYouCard from './thankyou'

const OrderReceived = () => {
  const [msg, setMsg] = useState(0)
  const [pass, setPass] = useState(0)
  const [mail, setMail] = useState(0)
  const [free, setFree] = useState(0)
  const [vcode, setCode] = useState('')

  useEffect(() => {
    setMsg(localStorage.getItem('ordstat'))
    setPass(localStorage.getItem('tmppass'))
    setMail(localStorage.getItem('tmpemail'))
    setFree(localStorage.getItem('free-voucher'))
  }, [])

  useEffect(() => {
    if (free === '1' && mail) {
      const firstThree = mail.slice(0, 3).toUpperCase()
      const today = new Date()
      const ddmm = `${String(today.getDate()).padStart(2, '0')}${String(
        today.getMonth() + 1
      ).padStart(2, '0')}`
      const texts = makeid(9).toUpperCase()
      const voucher = `${firstThree}-${ddmm}-${texts}`
      setCode(voucher)
      console.log('vcode', voucher)
    }

    return () => {
      setCode('')
      localStorage.removeItem('free-voucher')
    }
  }, [free, mail])

  return (
    <React.Fragment>
      <PageBanner
        homePageUrl='/'
        homePageText='Home'
        activePageText='Order Received'
      />

      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'stretch'
          }}
        >
          {/* Left column - ThankYou component */}
          <ThankYouCard msg={msg} mail={mail} pass={pass} />

          {/* Right column - voucher card */}
          <div style={{ width: '100%', height: '100%' }}>
            <FreeVoucher free={free} voucherCode={vcode} />
          </div>
        </div>
      </div>

      {/* Inline responsive fix */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </React.Fragment>
  )
}

export default OrderReceived
