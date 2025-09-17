import Link from 'next/link'
import React from 'react'

function Completed({enrolledCourses, }) {
  return (
    <>
    {
      <div className="profile-tab-container row">
        {enrolledCourses.length > 0 ? enrolledCourses.map(enrolledCourse => (
          <div className="col-lg-2 col-md-3" key={enrolledCourse.id} style={{ display: (enrolledCourse.complstatus === "yes") ? 'block' : 'none', "marginRight": "30px" }}>
            <Link href="/my-courses/view/[id]" as={`/my-courses/view/${enrolledCourse.id}`}>
              <div className="single-courses-box">
                <div className="courses-image">
                  <Link href="/my-courses/view/[id]" as={`/my-courses/view/${enrolledCourse.id}`}>
                    <a className="d-block image">
                      <img src={enrolledCourse.image} alt={enrolledCourse.name} />
                    </a>
                  </Link>


                </div>

                <div className="courses-content profiletable" style={{
                  "marginTop": "10px",
                  "padding": "10px",
                  "height": "100px"
                }}
                >
                  <h3>
                    <Link href="/my-courses/view/[id]" as={`/my-courses/view/${enrolledCourse.id}`}>
                      <a style={{ "fontSize": "14px" }}>{enrolledCourse.name}</a>
                    </Link>
                  </h3>




                </div>


              </div>
            </Link>
          </div>
        )) : (
          <div className="col-lg-12">
            <h4 className="empty-content">No Completed Courses</h4>
          </div>


        )}
      </div>
    }
  </>
  )
}

export default Completed