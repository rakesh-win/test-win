import React from 'react'

function MyCertificates({certs}) {
  return (
    <div className="profile-tab-container">
    <h4>Obtained Certificates</h4>

    {certs.length ? certs.map(usercerts => (
      <div className="badgecontainer" key={usercerts.id}>

        <a href={usercerts.certurl} target="_blank"> <img className="certicon" src="/images/certimg.png" />

          - {usercerts.coursename}
        </a>
      </div>

    )) : (
      <h1>No certificates found!</h1>
    )}


  </div>
  )
}

export default MyCertificates