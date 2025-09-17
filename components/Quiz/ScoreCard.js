import Link from 'next/link'
import React from 'react'

function ScoreCard({score, userData,courseName, passingmark}) {
  return (
    <div className="scorecard-wrapper">
    {score < passingmark &&
       <div className="scorecard">
         <h3>Scorecard</h3>
         <p><b>Candidate Name</b> {userData.name}</p>
         <p><b>Examination:</b> {courseName}</p>
         <p><b>Total Score:</b> 40</p>
         <p><b>Passing Score:</b> {passingmark}</p>
         <p><b>Achieved Score:</b> {score}</p>
         <p><b>Result:</b> Fail</p>
       <p style={{fontSize:15}}>We regret to inform you that you have not achieved the passing score for this examination. We encourage you to review the course material and further consider retaking the exam.<br/>
To schedule a retake, please reach out to us at exams@winupskill.com. We are here to support you in your continued learning and success.</p>
           <center>  
           <a href='/user/my-profile?tab=1'>
             <button className='default-btn'>My Profile</button>
           </a>
           </center>
       </div>
     }

     {
     score>=passingmark && (
       <div className="scorecard" >
       <h3>Scorecard</h3>
       <p><b>Candidate Name</b> {userData.name}</p>
       <p><b>Examination:</b> {courseName}</p>
       <p><b>Total Score:</b> 40</p>
       <p><b>Passing Score:</b> {passingmark}</p>
       <p><b>Achieved Score:</b> {score}</p>
       <p><b>Result: </b> Pass</p>
       <p>
       Congratulations! You have successfully passed this examination.<br/>
       Your course completion certificate is now available in your profile under "My Certificates" page.</p>
       <center>
         <Link href='/user/my-profile?tab=3'>
           <button className='default-btn'>My Certificate</button>
         </Link>
         </center>

     </div>
       )
     }
   </div>
  )
}

export default ScoreCard