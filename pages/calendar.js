import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Alert from 'react-popup-alert';


import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';


const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const router = useRouter()
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredEventData, setFilteredEventData] = useState([]);
  const [headertext, setHeadertext] = useState('');
  const [btntext, setBtntext] = useState('OK');

  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [userID, setUserID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [crstype, setCrstype] =useState('')
  const[meet , setMeet] = useState('')


  const URL1 = 'https://winupskill.in/api/api/enrolled';
  const URL2 = 'https://winupskill.in/api/api/events';
  const URL3 = 'https://winupskill.in/api/api/enrollevents';
  const URL4 = 'https://winupskill.in/api/api/getprofile';

  useEffect(() => {
    // Fetch userID from localStorage
    const storedUserID = localStorage.getItem("userid");

    // Check if userID is available and update state
    if (storedUserID) {
      setUserID(storedUserID);
      console.log("userid:", userID);
    }
  }, [userID]);


useEffect(() => {
  const getData = async () => {
    try {
      if (userID) {
        // Fetch enrolled events
        const response1 = await fetch(URL1);
        const result1 = await response1.json();
        if (result1 && result1.data) {
          const data = result1.data;
          // Filter data based on user_id
          const userEnrollments = data.filter(item => item.user_id === userID);
          // console.log("Filtered Data:", userEnrollments);

          // Fetch CRS data (course type)
          const crsData = await axios.get(`https://winupskill.in/api/api/enrollcrstype?userid=${userID}`);
          const crsRes = crsData.data.data;
          setCrstype(crsRes); // Assuming crstype is in crsRes.crstype

          // Extract course_id from userEnrollments
          const courseIds = userEnrollments.map(item => item.course_id);
          // console.log("Course IDs:", courseIds);

          // Fetch event data from URL2
          const response2 = await fetch(URL2);
          const result2 = await response2.json();
          if (result2 && result2.data) {
            const eventData = result2.data;

            // Filter events by matching course IDs and crstype
            const filteredEventDatas = eventData.filter(item => {
              const normalizedCourseId = String(item.courseid).trim();
              
              // Check if the courseid exists in the enrolled courseIds
              const matchesCourseId = courseIds.some(id => String(id).trim() === normalizedCourseId);
            
              // Check if the crstype for the matched courseid is "LVC"
              const matchesCourseType = Array.isArray(crstype) && crstype.some(x => String(x.courseid).trim() === normalizedCourseId && x.crstype === "LVC");
            
              return matchesCourseId && matchesCourseType;
            });

            // Update event dates
            const updatedFilteredEvents = filteredEventDatas.map(event => ({
              ...event,
              eventend: moment(event.eventend).endOf('day').toDate(), // Ensure end date is inclusive
            }));

            // Set the filteredEventData state
            setFilteredEventData(updatedFilteredEvents);
            // console.log("Filtered Event Data from URL2:", updatedFilteredEvents);
          } else {
            console.error("Invalid data structure from URL2:", result2);
          }
        } else {
          console.error("Invalid data structure from URL1:", result1);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  getData(); // Call the function to fetch the data
}, [userID, crstype]); // The effect runs whenever userID or crstype changes


  // Inside the second useEffect hook that fetches data from URL4
  useEffect(() => {
    if (userID) {
      // Fetch data from URL4
      fetch(URL4)
        .then(response => response.json())
        .then(result => {
          // Check if the result has a 'data' property
          if (result && result.data) {
            const userData = result.data;

            // Find the user with the matching ID
            const matchingUser = userData.find(user => String(user.id) === String(userID));

            // Print the email if a matching user is found
            if (matchingUser) {
              const userEmail = matchingUser.email;
              const userName = matchingUser.name;

              console.log("User Email:", userEmail);
              console.log("User Name:", userName);


              // Set the userEmail state
              setUserEmail(userEmail);
              setUserName(userName);

            } else {
              console.error("User not found with ID:", userID);
            }
          } else {
            console.error("Invalid data structure from URL4:", result);
          }
        })
        .catch(error => console.error("Error fetching data from URL4:", error));
    }
  }, [userID]);





  const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })

  function onCloseAlert() {
    setAlert({
      type: '',
      text: '',
      show: false
    })

  }



  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const [load, setLoad] = useState(false);
  var meetUrls = selectedEvent && selectedEvent.meetUrl;
  const handleEnrollClick1 = (isHost) => {
    if (typeof window !== 'undefined') {
      // Constructing the URL with query parameters for name and edit flag
      const meetingUrlWithParams = `${meetUrls}?name=${encodeURIComponent(userName)}&edit='false'`;
  
      // Storing the constructed URL in localStorage
      localStorage.setItem('meetUrl', meetingUrlWithParams);
    }
    
    // Redirecting to the /training page
    router.push('/training');
  };


  const handleEnrollClick = () => {
    const enrolledEventTitle = selectedEvent ? selectedEvent.eventname : '';
    // var meetUrls = selectedEvent ? selectedEvent.meetUrl : "N/a"; // Get the meetUrl
    
    // Check if the current date is greater than or equal to the event start date
    const currentDate = new Date();
    const eventStartDate = new Date(selectedEvent.eventstart);
  
    // Start loading before any action
    setLoad(true);
  
    if (currentDate >= eventStartDate) {
      // Display an alert indicating that enrollment is closed  
      setHeadertext("Enrollment Closed");
      setAlert({
        type: 'info',
        text: `Enrollment for "${enrolledEventTitle}" is closed.`,
        show: true,
      });
  
      // Stop loading after the check is done
      setLoad(false);
    } else {
      // Continue with the enrollment process
  
      // Fetch enrolled events for the user from URL3
      axios.get(`${URL3}?userid=${userID}`)
        .then(response => {
          const enrolledEventsResult = response.data;
          
          // Log the result to the console for debugging
          console.log('Enrolled Events Result:', enrolledEventsResult);
  
          // Check if the selected event is already enrolled
          const isAlreadyEnrolled = enrolledEventsResult.data.some(
            enrolledEvent => (
              String(enrolledEvent.eventid) === String(selectedEvent.id) &&
              String(enrolledEvent.courseid) === String(selectedEvent.courseid)
            )
          );
  
          console.log("Selected Event:", selectedEvent);
          console.log("Already Enrolled:", isAlreadyEnrolled);
          
          if (isAlreadyEnrolled) {
            // Display a warning alert indicating that the user is already enrolled
            setHeadertext("Warning");
            setAlert({
              type: 'warning',
              text: `You are already enrolled in "${enrolledEventTitle}" event!`,
              show: true,
            });
  
            // Stop loading after checking enrollment status
            setLoad(false);
          } else {
            const requestBody = {
              "userid": userID,
              "eventid": selectedEvent.id,
              "courseid": selectedEvent.courseid,
              "eventDetails": {
                "meetUrl": meetUrls,  
                "eventName": enrolledEventTitle,
                "eventStart": selectedEvent.eventstart,
                "eventEnd": selectedEvent.eventend,
                "eventTime": selectedEvent.eventtime,
              },
            };
            
            console.log('Request Body:', requestBody); // Pretty print the request body
  
            // Post the enrollment request
            axios.post(URL3, requestBody, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(result => {
                // Handle the response from the API if needed
                console.log('Enrollment response:', result);
  
                // Display a success alert
                setHeadertext("Success");
                setAlert({
                  type: 'success',
                  text: `Successfully enrolled in "${enrolledEventTitle}" event!`,
                  show: true,
                });
  
                // Clear the selected event
                setSelectedEvent(null);   
  
                // Stop loading after successful enrollment
                setLoad(false);
              })
              .catch(error => {
                console.error('Error enrolling in the event:', error);
  
                // Stop loading on error
                setLoad(false);
  
                // Display an error alert
                setHeadertext("Error");
                setAlert({
                  type: 'error',
                  text: `Failed to enroll in "${enrolledEventTitle}" event. Please try again.`,
                  show: true,
                });
              });
          }
        })
        .catch(error => {
          // Stop loading after failing to fetch enrolled events
          setLoad(false);
  
          console.error('Error fetching enrolled events:', error);
        });
    }
  };
  

  const handleCancelClick = () => {
    setSelectedEvent(null);
  };

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button style={{ border: 'none', fontSize: '25px', fontWeight: 'bold', paddingBottom: '20px' }} type="button" onClick={goToBack}>
            {'<'}
          </button>
          <span className="rbc-toolbar-label">{toolbar.label}</span>
          <button style={{ border: 'none', fontSize: '25px', fontWeight: 'bold', paddingBottom: '20px' }} type="button" onClick={goToNext}>
            {'>'}
          </button>
        </span>
      </div>
    );
  };


  // Fetch enrolled events for the user from URL3
  useEffect(() => {
    if (userID) {
      fetch(`${URL3}?userid=${userID}`)
        .then((response) => response.json())
        .then((enrolledEventsResult) => {
          if (enrolledEventsResult && enrolledEventsResult.data) {
            setEnrolledEvents(enrolledEventsResult.data);
          } else {
            console.error("Invalid data structure from URL3:", enrolledEventsResult);
          }
        })
        .catch((error) => {
          console.error("Error fetching enrolled events:", error);
        });
    }
  }, [userID]);

  // Function to customize event styles based on conditions
  const eventPropGetter = (event) => {
    // Check if the event id is present in the enrolled events data
    const isEnrolled = enrolledEvents.some(
      (enrolledEvent) =>
        String(enrolledEvent.eventid) === String(event.id) &&
        String(enrolledEvent.userid) === String(userID)
    );

    // Check if the event id is present in the filtered events data
    const isEventAvailable = filteredEventData.some(
      (eventData) => String(eventData.id) === String(event.id)
    );

    // Set the background color based on conditions
    const backgroundColor = isEnrolled
      ? 'green' // Change to the desired color for enrolled events
      : isEventAvailable
        ? 'blue' // Default color for events
        : 'gray'; // Change to the desired color for other events

    return {
      style: {
        backgroundColor,
      },
    };
  };



  return (
    <React.Fragment>

      <Alert
        header={headertext}
        btnText={btntext}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
      {/* <h1>Event Calendar</h1> */}
      <div className="calendar-container">

        <BigCalendar
        popup={true}
          localizer={localizer}
          events={filteredEventData}
          startAccessor="eventstart"
          endAccessor="eventend"
          titleAccessor="eventname"
          style={{ height: 550, width: 1200 }}
          views={['month']}
          defaultView="month"
          components={{
            toolbar: CustomToolbar,
          }}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventPropGetter}
          className='rbc-calendar'
        />

        {selectedEvent && (
          <div className="custom-popup">
            <div className="popup-content">
              <h3>{  selectedEvent.eventname}</h3>
              <p>{`Start Date: ${moment(selectedEvent.eventstart).format("DD-MM-YYYY")}`}</p> 

              <p>{`End Date: ${moment(selectedEvent.eventend).format("DD-MM-YYYY")}`}</p>
              <p>{`Event Time: ${selectedEvent.eventtime}`}</p> 

              {selectedEvent.description != null && selectedEvent.description !== "<p>null</p>" && (
                <p>
                  <h6>Description :-</h6>
                  <p dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />

                </p>
              )}
                  {load && <CircularProgress color='success' />}<br/>
              <button className="default-btn calendar-btn" style={{ marginBottom: "5px" }} disabled={load} onClick={handleEnrollClick1}>Join</button>

              {/* <button className="default-btn calendar-btn" style={{ marginBottom: "5px" }} disabled={load} onClick={handleEnrollClick}>Enrol</button> */}
              <button className="default-btn" style={{ marginBottom: "5px" }} onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default EventCalendar;
