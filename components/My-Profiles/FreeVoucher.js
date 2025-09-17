import { useRouter } from 'next/router'
import React, { useState } from 'react'
import VoucherModal from '../Modals/VoucherModal'

function FreeVoucher ({ free, voucherCode }) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const handleSubmitVoucher = value => {
    console.log('Voucher submitted:', value)
    handleCloseModal()
  }

  return (
    <div
      style={{
        background: '#fff',
        padding: '35px 30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        textAlign: 'center',
        lineHeight: '1.6',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
    >
      {/* Heading */}
      <h2
        style={{
          color: '#d35400',
          marginBottom: '15px',
          fontSize: '22px',
          fontWeight: '600'
        }}
      >
        🎁 Refer & Earn Amazon Gift Vouchers!
      </h2>

      {/* Intro Text */}
      <p style={{ marginBottom: '10px', fontSize: '15px', color: '#333' }}>
        Love learning with us? Spread the word!
      </p>
      <p style={{ marginBottom: '10px', fontSize: '15px', color: '#333' }}>
        Invite your friends and colleagues to join our training programs and for
        every successful referral you’ll receive an{' '}
        <strong>Amazon Gift Voucher</strong> as a token of appreciation.
      </p>
      <p style={{ marginBottom: '20px', fontSize: '15px', color: '#333' }}>
        👉 Start referring today and enjoy learning + rewards together!{' '}
      </p>

      {/* Show button only on /order-received page */}
      {/* {router.pathname === '/order-received' && free === '1' && ( */}
      <center>
        <button
          className='default-btn-cart'
          style={{
            marginTop: '10px',
            padding: '12px 28px',
            fontSize: '16px',
            fontWeight: '500',
            width: '30%'
          }}
          onClick={handleOpenModal}
        >
          Refer Now
        </button>
      </center>

      {/* Modal */}
      <VoucherModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitVoucher}
        voucherCode={voucherCode}
      />

      {/* FAQs (hidden on order-received) */}
      {router.pathname !== '/order-received' && (
        <div style={{ marginTop: '35px', textAlign: 'left' }}>
          <center>
            <h3
              style={{
                color: '#d35400',
                marginBottom: '15px',
                fontSize: '22px',
                fontWeight: '600'
              }}
            >
              Referral Gift Voucher FAQs
            </h3>
          </center>

          {[
            {
              q: ' How can I earn Amazon Gift Vouchers through referrals?',
              a: `You can earn vouchers by referring our training programs to your friends, colleagues, or professional network. Once your referral successfully enrolls, you will receive an Amazon Gift Voucher as a reward.`
            },
            {
              q: 'Who is eligible to participate in the referral program?',
              a: `All enrolled participants are eligible to join the referral program. If you are currently pursuing a course with us, you can begin referring immediately..`
            },
            {
              q: 'How will I receive my Amazon Gift Voucher',
              a: `Your voucher will be delivered via email within 3 business days after your referral completes the enrollment process.`
            },
            {
              q: 'Is there a limit to the number of referrals I can make?',
              a: `No, there is no limit. You will receive a voucher for each successful referral.`
            },
            {
              q: 'Do the vouchers have an expiry date?',
              a: `Yes. Each Amazon Gift Voucher carries a standard validity period determined by Amazon. Please ensure you redeem it before the expiry date.`
            }
          ].map((item, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <p style={{ display: 'block', marginBottom: '6px' }}>
                Q{idx + 1}: {item.q}
              </p>
              <p style={{ margin: 0, fontSize: '15px', color: '#555' }}>
                A: {item.a}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FreeVoucher
