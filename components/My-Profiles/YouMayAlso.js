import React from 'react'
import Progress_sml from '../Common/Progress_sml'
import Link from 'next/link'

function YouMayAlso({relatedc,cmpl,loading2}) {
  return (
    <div className="profile-tab-container">
                    <h4>Related Courses</h4>
                    <div className="profile-tab-container row">
                      {relatedc.length > 0 ? relatedc.map((ec, index) => (
                        <div className="col-lg-2 col-md-3" key={index} style={{ display: (ec.complstatus === "yes") ? 'none' : 'block', "marginRight": "30px" }}>
                          <Link href="/my-courses/view/[id]" as={`/my-courses/view/${ec.id}`}>
                            <div className="single-courses-box">
                              <div className="courses-image">
                                <Link href="/my-courses/view/[id]" as={`/my-courses/view/${ec.id}`}>
                                  <a className="d-block image">
                                    <img src={ec.image} alt={ec.name} />
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
                                  <Link href="/my-courses/view/[id]" as={`/my-courses/view/${ec.id}`}>
                                    <a style={{ "fontSize": "14px" }}>{ec.name}</a>
                                  </Link>
                                </h3>

                                {cmpl.map((cmp, index2) => (

                                  <div className="" key={index2} style={{ display: (ec.id == cmp.crsid) ? 'block' : 'none' }}>
                                    <Progress_sml style={{ margin: '0px' }} bgcolor="#f7dada" progress={cmp.pct} height={25} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Link>
                        </div>
                      )) : (
                        <div className="col-lg-12">

                          {loading2 ? (
                            // Show a loading spinner or custom message while values are loading
                            <div style={{ margin: "100px 100px 300px 100px" }}>Loading...</div>
                          ) : (
                            <h4 className="empty-content">Get in touch with us for details.</h4>
                          )}



                        </div>
                      )}
                    </div>

                  </div>
  )
}

export default YouMayAlso