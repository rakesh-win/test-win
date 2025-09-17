import ExamFB from '@/components/Feedbacks/ExamFB'
import Paymentloading from '@/components/_App/PaymentLoading'
import Preloader from '@/components/_App/Preloader'
import React, { useState } from 'react'

function test() {
const [loading, setloading] = useState(false )
  return (
    <div>
 <button  onClick={()=>setloading(true)}>click</button>
        <ExamFB/>
    </div>
  )
}

export default test