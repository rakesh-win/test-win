import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress
} from '@mui/material'

export default function LoyaltySection () {
  const [pointsLog, setPointsLog] = useState([])
  const [courses, setCourses] = useState([])
  const [orders, setOrders] = useState([])
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [point, setpoint] = useState(0)

  const numberWithCommas = x =>
    x === undefined || x === null ? '-' : Number(x).toLocaleString()

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const ct =
      typeof window !== 'undefined' ? localStorage.getItem('country') : null
    if (!token) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const userRes = await axios.get('https://winupskill.in/api/api/users', {
          headers: { Authorization: 'Bearer ' + token }
        })
        const points = await axios.get(
          'https://winupskill.in/api/api/usrprofile',
          {
            headers: { Authorization: 'Bearer ' + token }
          }
        )
        setpoint(points.data[0])
        const userData = userRes.data
        setUser(userData)
        const email = userData.email

        const pointsRes = await axios.get(
          `https://winupskill.in/api/api/pointslog?email=${email}`
        )
        setPointsLog(pointsRes.data.data || [])

        const coursesRes = await axios.get(
          'https://winupskill.in/api/api/courses'
        )
        setCourses(coursesRes.data.data || [])

        const ordersRes = await axios.get(
          `https://winupskill.in/api/api/orders?email=${email}`
        )
        setOrders(ordersRes.data.data || [])

        if (ordersRes.data.data.length > 0) setCountry(ct)
      } catch (err) {
        console.error('Error fetching loyalty data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)
    return (
      <center>
        <CircularProgress sx={{ color: 'red' }} />
      </center>
    )

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4,
        mt: 3
      }}
    >
      {/* FAQ Section */}
      <Card sx={{ borderRadius: 2, bgcolor: '#fafafa' }}>
        <CardContent sx={{ pt: 2, pb: 1, px: 3 }}>
          <Typography
            variant='h6'
            sx={{ textAlign: 'center', mt: 2 }}
            gutterBottom
          >
            Loyalty Points - FAQs
          </Typography>
          <ol style={{ paddingLeft: '20px', color: '#555', lineHeight: 1.6 }}>
            <li>
              How many loyalty points can I redeem per course? <br />
              <span style={{ fontSize: '14px', color: '#777' }}>
                You can redeem up to {country === 'India' ? '5,000' : '100'}{' '}
                loyalty points per course.
              </span>
            </li>
            <li>
              What is excluded from loyalty points redemption?
              <br />
              <span style={{ fontSize: '14px', color: '#777' }}>
                – Examination Fees <br /> – Applicable taxes (if any)
              </span>
            </li>
            <li>
              Can I combine loyalty points with coupon codes?
              <br />
              <span style={{ fontSize: '14px', color: '#777' }}>
                Yes. Discounts are applied first, Followed by loyalty points.
              </span>
            </li>
            <li>
              How many loyalty points will I earn when I purchase a course?
              <br />
              <span style={{ fontSize: '14px', color: '#777' }}>
                10% of the final amount paid in cash. Points are not earned on
                Exam Fees or Taxes.
              </span>
            </li>
            <li>
              Are Masterclass courses eligible for loyalty points?
              <br />
              <span style={{ fontSize: '14px', color: '#777' }}>
                No. Masterclass courses are excluded from the loyalty points
                program. You cannot earn or redeem points on them.
              </span>
            </li>
          </ol>
        </CardContent>
      </Card>

    {/* Points Log Section */}
      <Card sx={{ borderRadius: 2, bgcolor: '#fafafa' }}>
        <CardContent sx={{ pt: 3, pb: 0, px: 3 }}>
          <Typography variant='h6' sx={{ textAlign: 'center' }} gutterBottom>
            Loyalty Points Balance : {point.points || 0}
          </Typography>

          {pointsLog.length === 0 ? (
            <center>
              <Typography sx={{ fontSize: '14px', color: '#777' }}>
                No loyalty point records were found. Please select from our
                course categories to begin shopping
              </Typography>
            </center>
          ) : (
            <Box sx={{ maxHeight: 320, overflowY: 'auto' }}>
              <Box
                component='table'
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                  bgcolor: 'white'
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}
                    >
                      Course Name
                    </th>

                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}
                    >
                      Exam Fees Paid
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}
                    >
                      Taxes Paid
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}
                    >
                      Total Amount Paid
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}
                    >
                      Loyalty Points Utilized
                    </th>
                    <th
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        textAlign: 'center'
                      }}
                    >
                      Loyalty Points Credited
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pointsLog
                    .reduce((acc, log) => {
                      const existing = acc.find(
                        item => item.orderid === log.orderid
                      )
                      if (existing) existing.logs.push(log)
                      else acc.push({ orderid: log.orderid, logs: [log] })
                      return acc
                    }, [])
                    .map((group, idx) => {
                      const order =
                        orders.find(
                          o => Number(o.id) === Number(group.orderid)
                        ) || {}
                      const totalPointsUsed = order.pointsused || 0
                      const totalAmountPaid =
                        order.totalpayable - totalPointsUsed

                      return group.logs.map((log, logIdx) => {
                        const course =
                          courses.find(c => c.id === Number(log.course)) || {}
                        const examFee =
                          country === 'India'
                            ? course.INRexam || 0
                            : course.USDexam || 0

                        return (
                          <tr key={`${group.orderid}-${logIdx}`}>
                            <td
                              style={{
                                padding: '8px',
                                border: '1px solid #ddd',
                                textAlign: 'center'
                              }}
                            >
                              {course.name || '-'}
                            </td>

                            <td
                              style={{
                                padding: '8px',
                                border: '1px solid #ddd',
                                textAlign: 'center'
                              }}
                            >
                              {country === 'India' ? 'INR ' : 'USD '}
                              {numberWithCommas(examFee)}
                            </td>

                            {/* Show taxes only once per order */}
                            {logIdx === 0 && (
                              <td
                                rowSpan={group.logs.length}
                                style={{
                                  padding: '8px',
                                  border: '1px solid #ddd',
                                  textAlign: 'center'
                                }}
                              >
                                {country === 'India' ? 'INR ' : 'USD '}
                                {country === 'India'
                                  ? numberWithCommas(
                                      Math.floor(
                                        (order.totalpayable * 18) / 100
                                      )
                                    )
                                  : 0}
                              </td>
                            )}

                            {/* Totals – only once per order */}
                            {logIdx === 0 && (
                              <>
                                <td
                                  rowSpan={group.logs.length}
                                  style={{
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    textAlign: 'center'
                                  }}
                                >
                                  {country === 'India' ? 'INR ' : 'USD '}
                                  {numberWithCommas(totalAmountPaid)}
                                </td>
                                <td
                                  rowSpan={group.logs.length}
                                  style={{
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    textAlign: 'center'
                                  }}
                                >
                                  {numberWithCommas(totalPointsUsed)}
                                </td>
                                <td
                                  rowSpan={group.logs.length}
                                  style={{
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    textAlign: 'center'
                                  }}
                                >
                                  {numberWithCommas(
                                    group.logs.reduce(
                                      (sum, l) => Number(l.accupoints || 0),
                                      0
                                    )
                                  )}
                                </td>
                              </>
                            )}
                          </tr>
                        )
                      })
                    })}
                </tbody>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
