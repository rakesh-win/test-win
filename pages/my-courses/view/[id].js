import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Component,
  useLayoutEffect,
} from "react";
import PageBanner from "@/components/Common/PageBanner";
import Link from "next/link";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useRouter } from "next/router";
import ReactDOM from "react-dom";
import Progressbar from "@/components/Common/Progress_bar";
import LoadingSpinner from "@/utils/LoadingSpinner";
import {
  Button,
  Viewer,
  Worker,
  SpecialZoomLevel,
} from "@react-pdf-viewer/core";
import {
  pageNavigationPlugin,
  RenderGoToPageProps,
} from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

import { ReactElement } from "react";
import { ToolbarProps } from "@react-pdf-viewer/default-layout";
import Alert from "react-popup-alert";
import { Document, Page, Toolbar } from "@react-pdf-viewer/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Import styles
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import { TextField, Tooltip } from "@mui/material";
import ExamModal from "@/components/Modals/ExamModal";
import { TrendingUpOutlined } from "@mui/icons-material";

const SingleCourses = ({ data }) => {
  const router = useRouter();
  var routerId = router.query.id;


  useEffect(() => {
    if (data.length > 0) {
      setcourseName(data[0].video_url)
      setcrumbName(data[0].name)
      setCourseaid(data[0].course_id)
      setVideoId(data[0].video_url)
      setPdfId(data[0].pdf_url)
      setsubjectId(data[0].id)
    }
  }, [routerId,data])
  

  useLayoutEffect(() => {
    const routernamepush = async () => {
      try {
        // Fetch the course data
        const response = await axios.get(`https://www.winupskill.in/api/api/courses?id=${routerId}`);
        const previewUrl = response.data.data[0]?.previewurl1; // Safely access previewurl1

        if (previewUrl) {
          // Update the URL without reloading the page
          window.history.replaceState(null, "", `${previewUrl}`);
        } else {
          console.error("previewurl1 is missing in the API response.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    routernamepush();

    // Optional cleanup: Remove router events if required
    return () => {
      router.events.off("hashChangeStart", routernamepush);
    };
  }, [routerId, router.events]);





  const [quizDisabled, setQuizDisabled] = useState(false); // State to manage quiz disable status
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { GoToFirstPage, GoToLastPage, GoToNextPage, GoToPreviousPage } =
    pageNavigationPluginInstance;
  const [loading, setLoading] = React.useState(false);
  const [crsID, setcrsID] = React.useState(0);

  const [userid, setUserID] = useState(null);
  const [userBool, setUserBool] = useState({ disablee: "" });
  const [courseName, setcourseName] = React.useState(
    data.length ? data[0].video_url : ""
  );
  const [crumbName, setcrumbName] = React.useState(
    data.length ? data[0].name : ""
  );
  const [courseaid, setCourseaid] = React.useState(
    data.length ? data[0].course_id : ""
  );
  const [progress, setProgress] = React.useState(0);
  const [activeCourseid, setactiveCourseid] = React.useState(0);
  const [videoId, setVideoId] = React.useState(
    data.length ? data[0].video_url : ""
  );
  const [pdfId, setPdfId] = React.useState(data.length ? data[0].pdf_url : "");
  const [subjectId, setsubjectId] = React.useState(
    data.length ? data[0].id : ""
  );
  const [completedLessons, setCompletedLessons] = React.useState([]);
  const [coursesubs, setCoursesubs] = React.useState([]);
  const [enroll, setEnroll] = React.useState([]);
  const [quizid, setQuizid] = React.useState();
  const [index, setIndex] = React.useState(0);
  const [resflag, setResflag] = React.useState(0);
  const [weeks, setWeeks] = React.useState(0);
  const [weeks2, setWeeks2] = React.useState("");
  const [weekcounts, setWeekcounts] = React.useState(0);
  const [subcombs, setSubcombs] = React.useState(0);
  const [crstype, setCrstype] = React.useState(0);
  const [quizzs, setQuizzs] = React.useState([]);
  const [loading2, setLoading2] = useState(true);
  const [cmplstatus, setCmplstatus] = React.useState(0);
  const [enrollid, setEnrollid] = React.useState(0);
  const [expanded, setExpanded] = React.useState();
  const [zip, setZip] = useState([]);
  const [quiznav, setQuiznav] = useState("");
  const [originalnav, setOriginalnav] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [examDet, setExamDet] = useState([]);
  const [check, setCheck] = useState(false);
  const [pracBtn , setPracBtn] = useState(false)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [headertext, setHeadertext] = useState(0);
  const [btntext, setBtntext] = useState("");
  const [meetUrl, setMeetUrl] = useState(''); 
  const [ startDate , SetStartDate] = useState('');
  const [ endDate , SetEndDate] = useState('');
  const [alert, setAlert] = React.useState({
    type: "error",
    text: "This is a alert message",
    show: false,
  });

  function onCloseAlert() {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  }

  function onShowAlert(type, text) {
    setAlert({
      type: type,
      text: text,
      show: true,
    });
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change the breakpoint to your desired value
    };

    // Initial check for screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    width: isMobile ? "100%" : 800,
    height: isMobile ? 250 : 450,
  };
  const ctx = 0;
  const { id } = parseCookies(ctx);
  const [shown, setShown] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [crsss, setCrsss] = useState("");
  const [defaultToolbarPluginInstance, setDefaultToolbarPluginInstance] =
    useState();

  const renderToolbar = (toolbarSlot) => (
    <Toolbar
      {...toolbarSlot}
      toolbarPluginInstance={defaultToolbarPluginInstance}
    />
  );

  const getMeetingUrl = async () => {
    const storeid = localStorage.getItem("userid");
    
    
    try {
      const URL3 = `https://www.winupskill.in/api/api/enrollevents?userid=${storeid}&courseid=${routerId}`;
      // Make the first API request
  
      // Make the second API request after the first one is complete
      const enrollEventsResponse = await axios.get(URL3);
      const enrollEventsData = enrollEventsResponse.data.data;
   
      //   );
      const findUsrEnrlData = enrollEventsData
  .slice() // To avoid mutating the original array
  .reverse() // Reverse the array to start from the last element
  .find((x) => parseInt(x.courseid) == parseInt(routerId));

    // console.log('findurk',findUsrEnrlData)




    await axios.get(`https://winupskill.in/api/api/enrollcrstype?userid=${storeid}&courseid=${routerId}`)
    .then(res => {
      const crstype = res.data.data[0].crstype 
      console.log('222',crstype)// Correctly extracting crstype from the response
      if (crstype === "LVC" && findUsrEnrlData && findUsrEnrlData.meetUrl) {
        return setMeetUrl(findUsrEnrlData.meetUrl);
      }
    })
      
    } catch (error) {
      console.error("Error fetching meeting URLs:", error);
    }
  };

  useEffect(() => {
    getMeetingUrl();
    getcoursename();
    matchwithzip();
  }, []);

  useEffect(() => {
    const disableeFn = async () => {
      const storeid = localStorage.getItem("userid");

      try {
        setUserID(storeid);

        const url = `https://winupskill.in/api/api/finalExamPaperData?userid=${userid}&crsid=${routerId}`;

        const res = await axios.get(url);
        const finalExamBool = res.data.data.find(
          (x) => parseInt(x.userid) === parseInt(userid)
        );

        // console.log("finalExamBool:", finalExamBool);
        if (finalExamBool) {
          setUserBool({ disablee: finalExamBool.disablee });
          console.log("UserBool xset:", finalExamBool.disablee); // Debugging log
        }
      } catch (error) {
        console.log("Error fetching final exam paper data:", error);
      }
    };
    disableeFn();
  }, [userid]);

  const matchwithzip = async () => {
    try {
      const response = await axios.get("https://winupskill.in/api/api/archive");
      const zipData = response.data;
      if (zipData && zipData.length > 0) {
        const matchingZip = zipData.find(
          (zip) => zip.course_id.toString() === routerId.toString()
        );
        if (matchingZip) {
          setZip(matchingZip.zip_url);
        } else {
          // console.log("No matching zip found for course ID:", routerId);
        }
      } else {
        console.log("No zip data available");
      }
    } catch (error) {
      console.error("Error while matching:", error);
    }
  };

  useEffect(() => {
    progressbarpercent();
    getcompletionStatus();
  }, [progress]);

  useEffect(() => {
    progressbarpercent();
  }, [completedLessons.length]);

  useEffect(() => {
    axios
      .get(`https://winupskill.in/api/api/courses?id=${routerId}`)
      .then((r) => {
        setCrsss(r.data.data[0].name);
        setExamDet(r.data.data[0].examdetails);
      }, []);
  });

  const getcoursename = async () => {
    const cours = await axios.get(
      `https://winupskill.in/api/api/courses?id=${routerId}`
    );
    if (cours.data.data.length) {
      setcourseName(cours.data.data[0].name);
      localStorage.setItem("crsname", cours.data.data[0].name);
      setCrstype(cours.data.data[0].type);
    }
    const csubs = await axios.get(
      `https://winupskill.in/api/api/coursesubs?courseid=${routerId}&sort_by=sortorder`
    );
    setCoursesubs(csubs.data.data);
    uniqueValues(csubs.data.data);
  };

  const uniqueValues = async (arr) => {
    const uniqueData = Object.values(
      arr.reduce((acc, obj) => {
        const key = obj.week + obj.module;
        if (!acc[key]) {
          acc[key] = obj;
        }
        return acc;
      }, {})
    );

    setSubcombs(uniqueData);
    var abcarr = Array.from(new Set(arr.map((item) => item.module)));
    setWeeks(abcarr);
    var abcarr2 = Array.from(new Set(arr.map((item) => item.week)));
    setWeeks2(abcarr2);
  };

  const getcompletionStatus = async () => {
    if (quizid == undefined) {
      getquiz();
    }
    const ctx = 0;
    const token = localStorage.getItem("token");
    const payload = {
      headers: { Authorization: "Bearer " + token },
    };

    const url = `https://winupskill.in/api/api/completedsubjects?course_id=${courseaid}`;
    var response = await axios.get(url, payload).then((result) => {
      setCompletedLessons(result.data);
      if (result.data.length == data.length || data.length == 0) {
        var subpending = data.length - result.data.length;
        if (subpending == 0 && data.length > 0) {
          if (crstype === "crs-free") {
            completefreecrs();
          }
        }
      } else {
        if (data[result.data.length]) {
          setVideoId(data[result.data.length].video_url),
            setPdfId(data[result.data.length].pdf_url),
            setactiveCourseid(data[result.data.length].id),
            setcrumbName(data[result.data.length].name),
            setIndex(
              data.findIndex((obj) => obj.id === data[result.data.length].id)
            );
        }
      }
    });
    const resenroll = await axios.get(
      "https://winupskill.in/api/api/enrollstats",
      payload
    );
    setEnroll(resenroll.data);
    var result = 0;
    if (resenroll.data.length) {
      result = resenroll.data.find((item) => item.id == courseaid);
    }
    setResflag(result);
  };

  const completefreecrs = async () => {
    var filteredData = enroll.filter((item) => item.id == courseaid);

    if (filteredData.length) {
      setCmplstatus(filteredData[0].complstatus);
      setEnrollid(filteredData[0].enrollid);
      if (filteredData[0].complstatus == "no" && filteredData[0].enrollid) {
        axios
          .put(
            `https://winupskill.in/api/api/enrollstats/${filteredData[0].enrollid}`,
            {
              completed: "yes",
            }
          )
          .then((response2) => {
            const delay = 2000; // Delay in milliseconds (2 seconds)
            const timer = setTimeout(() => {
              // Code to execute after the delay
              const response = axios
                .post("https://winupskill.in/api/api/issuecerts", {
                  userid: response2.data.data.user_id,
                  courseid: response2.data.data.course_id,
                })
                .then((result) => {
                  if (result.status == 200 || result.status == 201) {
                    setHeadertext("Congratulations!"), setBtntext("Continue");
                    onShowAlert(
                      "success",
                      "You have successfully completed this course. The certificate is generated and available in your profile now."
                    );
                  }
                });
            }, delay);
          });
      }
    }
  };

  function handleComplete(subjectid) {
    setLoading(true);
    const postdata = new FormData();
    postdata.append("action", "modcomplete");
    postdata.append("course_id", courseaid);
    postdata.append("subject_id", subjectid);
    postdata.append("user_id", id);
    postdata.append("completed", "yes");

    const response = axios
      .post("https://winupskill.in/api/api/coursesprogress", postdata)
      .then((result) => {
        if (result.status == 200 || result.status == 201) {
          getcompletionStatus();
          setLoading(false);
        }
      });
  }

  function handlePrevious(subjectid) {
    setLoading(true);
    var indx = data.findIndex((obj) => obj.id === subjectid);
    var tid = indx - 1;
    setVideoId(data[tid].video_url);
    setcrumbName(data[tid].name);
    setPdfId(data[tid].pdf_url);
    setsubjectId(data[tid].id);
    setactiveCourseid(data[tid].id);
    setIndex(tid);
    setLoading(false);
  }

  function handleNext(subjectid) {
    setLoading(true);
    var indx = data.findIndex((obj) => obj.id === subjectid);
    var tid = indx + 1;
    setVideoId(data[tid].video_url);
    setcrumbName(data[tid].name);
    setPdfId(data[tid].pdf_url);
    setsubjectId(data[tid].id);
    setactiveCourseid(data[tid].id);
    setIndex(tid);
    setLoading(false);
  }

  const handleVideoEnded = () => {
    handleComplete(activeCourseid);
  };

  const progressbarpercent = async () => {
    const calculateprogress = completedLessons.length / data.length;
    setProgress(Math.floor(calculateprogress * 100));
  };
  // console.log("progress", progress);
  const getquiz = async () => {
    if (courseaid === "") {
      setCourseaid(routerId);
    }
    const url = `https://winupskill.in/api/api/quiz?course_id=${courseaid}`;

    if (courseaid) {
      var response = await axios.get(url).then((q) => {
        if (q.data.data.length > 0) {
          setQuizid(q.data.data[0].id);
          setQuizzs(q.data.data);
          if (
            q.data.data[0].type == "graded" ||
            q.data.data[0].type == "GRADED"
          ) {
            setQuiznav("graded");
          }
          if (q.data.data[0].type == "mcq" || q.data.data[0].type == "MCQ") {
            
            setQuiznav("mcq");
          }
         
          q.data.data.forEach(item => {
            const type = item.type.toLowerCase(); 
            // Normalize the type to lowercase for easier comparison
            if (type.includes("practice")) {
              console.log('2223',type);
              setQuiznav("practice");
            }
          })          
        }
      });
    }
    //console.log("response",response)
  };

  const downloadBlob = (zipFile) => {
    const aTag = document.createElement("a");
    aTag.href = zipFile;
    aTag.setAttribute("download", "course_material.zip");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const handleDownload = () => {
    if (zip) {
      // Use the downloadBlob function to trigger the download
      downloadBlob(zip);
    } else {
      console.error("Zip file URL not found.");
    }
  };
  const [pracpaperData, setPracpaperData] = useState([]);

  useEffect(() => {
    // Fetch pracpaper data from API
    fetch("https://winupskill.in/api/api/pracpaper")
      .then((response) => response.json())
      .then((data) => setPracpaperData(data.data || []));
  }, []);
  
  var matchedData;

  const modalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign:"center",
    borderRadius: "8px",
    textAlign: "center",
  };
  
const [check1,setCheck1] = useState(false)
  const [certificateName, setCertificateName] = useState("");



    const [showModal, setShowModal] = useState(false);

    const handleCheck = () => {
      setShowModal(TrendingUpOutlined);
    };

const handleModalSubmit = (data) => {
  if (data.trim().length > 0) {
    localStorage.setItem('certiName', data);
    setAlert({
      header: 'Certificate Name Saved',
      text: `Your certificate name has been saved as "${data}".`,
      type: 'success',
      show: true,
    });
    setBtntext("Close")
    setHeadertext("Alert")
    setCheck1(true)
  } else {
    setAlert({
      header: 'Validation Error',
      text: 'Name is empty. Please enter a valid name.',
      type: 'error',
      show: true,
    });
    setBtntext("Close")
    setCheck1(false)
    setHeadertext("Alert")
  }
};

    
    


  return (
    <React.Fragment>
      <PageBanner
        homePageUrl="/user/my-profile"
        homePageText="My Courses"
        activePageText={data.length ? `${crsss}` : courseName}
      />

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
      {pracBtn ? (
        <div className="nosubjects">
          <h5>Practice Papers</h5>
          <br />
          {quizzs.length ? (
            quizzs
              .filter((x) => x.type == "Practice")
              .map((qz, index) => (
                <Link href={"/practicetests/quiz/" + qz.id}>
                  <div key={index} className="quizcontainerbtn">
                    {qz.name}
                  </div>
                </Link>
              ))
          ) : (
            <h3>No quizs</h3>
          )}

          <button
            style={{
              marginLeft: 3,
            }}
            className="default-btn  mt-10"
            onClick={() => setPracBtn(false)}
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          {" "}
          {data.length ? (
            <div>
              <div className="progressbarcontainer">
                <Progressbar
                  bgcolor="#f7dada"
                  progress={progress}
                  height={25}
                  ismobile={isMobile}
                />
              </div>
              <div style={{ display: resflag ? "block" : "none" }}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-3 hideonmob">
                      <div className="course-video-list">
                        {weeks2.length
                          ? weeks2.map((weeksitem2, index22) => {
                              var wk2 = weeksitem2;
                              return (
                                <div key={index22}>
                                  <div className="weekname">{weeksitem2}</div>

                                  {subcombs.length
                                    ? subcombs
                                        .filter(
                                          (item) => item.week === weeksitem2
                                        )
                                        .map((weeksitem, index) => (
                                          <Accordion>
                                            <AccordionSummary
                                              expandIcon={<ExpandMoreIcon />}
                                            >
                                              <Typography>
                                                {weeksitem.module}
                                              </Typography>
                                            </AccordionSummary>
                                            {coursesubs.length
                                              ? coursesubs
                                                  .filter(
                                                    (item) =>
                                                      item.module ===
                                                      weeksitem.module
                                                  )
                                                  .map((crsssubs, index2) => {
                                                    var matchedData = data.find(
                                                      (data2) =>
                                                        crsssubs.subjectid ===
                                                        data2.id
                                                    );

                                                    return (
                                                      <AccordionDetails>
                                                        {data.length ? (
                                                          data.map((data2) => (
                                                            <div
                                                              key={data2.id}
                                                              style={{
                                                                display:
                                                                  crsssubs.subjectid ==
                                                                  data2.id
                                                                    ? "block"
                                                                    : "none",
                                                              }}
                                                            >
                                                              <Link
                                                                href="/my-courses/[videos]/[id]"
                                                                as={`/my-courses/${data2.id}/${data2.id}`}
                                                              >
                                                                <a
                                                                  onClick={(
                                                                    e
                                                                  ) => {
                                                                    e.preventDefault();
                                                                    setVideoId(
                                                                      data2.video_url
                                                                    );
                                                                    setcrumbName(
                                                                      data2.name
                                                                    );
                                                                    setPdfId(
                                                                      data2.pdf_url
                                                                    );
                                                                    setsubjectId(
                                                                      data2.id
                                                                    );
                                                                    setactiveCourseid(
                                                                      data2.id
                                                                    );
                                                                    setIndex(
                                                                      data.findIndex(
                                                                        (obj) =>
                                                                          obj.id ===
                                                                          data2.id
                                                                      )
                                                                    );
                                                                  }}
                                                                >
                                                                  {data.length ==
                                                                  1 ? (
                                                                    <h4
                                                                      className="videoname"
                                                                      style={{
                                                                        background:
                                                                          completedLessons.includes(
                                                                            data2.id
                                                                          )
                                                                            ? "#f7dada"
                                                                            : "#fff",
                                                                      }}
                                                                    >
                                                                      <span className="navleft">
                                                                        {completedLessons ==
                                                                        data2.id ? (
                                                                          <img
                                                                            style={{
                                                                              marginRight:
                                                                                "10px",
                                                                              filter:
                                                                                "none",
                                                                            }}
                                                                            width="20"
                                                                            src="/images/completed4.png"
                                                                          />
                                                                        ) : (
                                                                          <img
                                                                            style={{
                                                                              marginRight:
                                                                                "10px",
                                                                            }}
                                                                            src="/images/start2.png"
                                                                            width="20"
                                                                          />
                                                                        )}{" "}
                                                                      </span>
                                                                      <span className="navright">
                                                                        {
                                                                          data2.name
                                                                        }
                                                                      </span>
                                                                    </h4>
                                                                  ) : (
                                                                    <h4
                                                                      style={{
                                                                        background:
                                                                          completedLessons.includes(
                                                                            data2.id
                                                                          )
                                                                            ? "#f7dada"
                                                                            : "#fff",
                                                                      }}
                                                                    >
                                                                      <span className="navleft">
                                                                        {completedLessons.includes(
                                                                          data2.id
                                                                        ) ? (
                                                                          <img
                                                                            style={{
                                                                              marginRight:
                                                                                "10px",
                                                                              filter:
                                                                                "none",
                                                                            }}
                                                                            width="20"
                                                                            src="/images/completed4.png"
                                                                          />
                                                                        ) : (
                                                                          <img
                                                                            style={{
                                                                              marginRight:
                                                                                "10px",
                                                                            }}
                                                                            src="/images/start2.png"
                                                                            width="20"
                                                                          />
                                                                        )}
                                                                      </span>

                                                                      <span className="navright">
                                                                        {" "}
                                                                        {
                                                                          data2.name
                                                                        }{" "}
                                                                      </span>
                                                                    </h4>
                                                                  )}

                                                                  <span
                                                                    className="focus-sidebar-trigger"
                                                                    style={{
                                                                      display:
                                                                        activeCourseid ==
                                                                        data2.id
                                                                          ? "block"
                                                                          : "none",
                                                                    }}
                                                                  ></span>
                                                                </a>
                                                              </Link>
                                                            </div>
                                                          ))
                                                        ) : (
                                                          <h3>No Videos</h3>
                                                        )}
                                                      </AccordionDetails>
                                                    );
                                                  })
                                              : "."}
                                          </Accordion>
                                        ))
                                    : "."}

                                  {/* Practice Papers Section Outside of AccordionDetails */}
                                  {pracpaperData.filter(
                                    (quiz) =>
                                      parseInt(quiz.courseid) ===
                                        parseInt(routerId) &&
                                      quiz.week === weeksitem2
                                  ).length > 0 && ( // Only render if practice papers exist
                                    <div className="quiz-section">
                                      <Accordion>
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                        >
                                          <Typography>
                                            Practice Papers
                                          </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          {pracpaperData
                                            .filter(
                                              (quiz) =>
                                                parseInt(quiz.courseid) ===
                                                  parseInt(routerId) &&
                                                quiz.week === weeksitem2
                                            )
                                            .map((quiz) => (
                                              <Link
                                                href={`/practicepaper/quiz/${quiz.quizid}`}
                                                key={quiz.id}
                                                target="_blank"
                                              >
                                                <a>
                                                  <h4
                                                    style={{
                                                      background:
                                                        completedLessons.includes(
                                                          matchedData
                                                            ? matchedData.id
                                                            : null
                                                        )
                                                          ? "#f7dada"
                                                          : "#fff",
                                                    }}
                                                  >
                                                    <span className="navright">
                                                      {quiz.name}
                                                    </span>
                                                  </h4>
                                                </a>
                                              </Link>
                                            ))}
                                        </AccordionDetails>
                                      </Accordion>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          : "."}
                      </div>

                      {quizid == null ? (
                        <span></span>
                      ) : (
                        <div>
                          {quiznav === "graded" ? (
                            <Link
                              href="/my-courses/gradedQuiz/[id]"
                              as={`/my-courses/gradedQuiz/${quizid}`}
                            >
                              <button
                                style={{
                                  marginTop: "12px",
                                  marginBottom: "100px",
                                }}
                                className="default-btn mt-10"
                              >
                                Take Graded Quiz
                              </button>
                            </Link>
                          ) : (
                            <Link
                              href="/my-courses/view/quiz/[id]"
                              as={`/my-courses/view/quiz/${quizid}`}
                            >
                              <button
                                style={{
                                  marginTop: "12px",
                                  marginBottom: "100px",
                                }}
                                className="default-btn mt-10"
                              >
                                Take Quiz
                              </button>
                            </Link>
                          )}
                          {quiznav === "practice" && (
                            <button
                              style={{
                                marginLeft: 3,
                              }}
                              className="default-btn  mt-10"
                              onClick={() => setPracBtn(true)}
                            >
                              Practice Papers
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="col-lg-9">
                      <span>You are viewing: {crumbName}</span>
                      <br />
                      <br />
                      <div className="course-video-iframe">
                        {videoId ? (
                          <video
                            // Disable right click
                            onContextMenu={(e) => e.preventDefault()}
                            key={videoId}
                            controls
                            controlsList="nodownload"
                            onEnded={handleVideoEnded}
                          >
                            <source src={videoId} type="video/mp4" />
                          </video>
                        ) : (
                          <Box>
                            {pdfId == null ? (
                              <span></span>
                            ) : (
                              <div className="pdf-viewer-container">
                                <div
                                  className="rpv-core__viewer"
                                  style={{
                                    border: "1px solid rgba(0, 0, 0, 0.3)",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                  }}
                                >
                                  <div
                                    style={{
                                      alignItems: "center",
                                      backgroundColor: "#eeeeee",
                                      borderBottom:
                                        "1px solid rgba(0, 0, 0, 0.1)",
                                      display: "flex",
                                      padding: "4px",
                                    }}
                                  >
                                    <Toolbar />
                                  </div>
                                  <div className="pdf-viewer-content">
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                                      <Viewer
                                        fileUrl={pdfId}
                                        plugins={[toolbarPluginInstance]}
                                        defaultScale={SpecialZoomLevel.PageFit}
                                        defaultZoom={1}
                                      />
                                    </Worker>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Box>
                        )}

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            {pdfId == null ? (
                              <span></span>
                            ) : (
                              <div
                                className="rpv-core__viewer"
                                style={{
                                  border: "1px solid rgba(0, 0, 0, 0.3)",
                                  display: "flex",
                                  flexDirection: "column",
                                  height: "100%",
                                }}
                              >
                                <div
                                  style={{
                                    alignItems: "center",
                                    backgroundColor: "#eeeeee",
                                    borderBottom:
                                      "1px solid rgba(0, 0, 0, 0.1)",
                                    display: "flex",
                                    padding: "4px",
                                  }}
                                >
                                  <Toolbar />
                                </div>
                                <div
                                  style={{
                                    flex: 1,
                                    overflow: "hidden",
                                  }}
                                >
                                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                                    <Viewer
                                      fileUrl={pdfId}
                                      plugins={[toolbarPluginInstance]}
                                    />
                                  </Worker>
                                </div>
                              </div>
                            )}
                          </Box>
                        </Modal>
                      </div>

                      <div className="samelinebtn">
                        <button
                          style={{
                            display: index == 0 ? "none" : "",
                          }}
                          type="submit"
                          id={subjectId}
                          onClick={() => handlePrevious(subjectId)}
                          className="default-btn mt-10 prevmodule hideonmob"
                        >
                          <i className="flaticon-left-chevron"></i>
                          Previous Module
                          {loading ? <LoadingSpinner /> : ""}
                        </button>

                        <button
                          style={{
                            display: index == data.length - 1 ? "none" : "",
                          }}
                          type="submit"
                          id={subjectId}
                          onClick={() => handleNext(subjectId)}
                          className="default-btn mt-10 nxtmodule hideonmob"
                        >
                          Next Module
                          <i
                            className="flaticon-right-chevron2"
                            style={{ left: 140 }}
                          ></i>
                          {loading ? <LoadingSpinner /> : ""}
                        </button>

                        <button
                          style={{
                            display: index == 0 ? "none" : "",
                          }}
                          type="submit"
                          id={subjectId}
                          onClick={() => handlePrevious(subjectId)}
                          className="default-btn mt-10 prevmodule hideonweb"
                        >
                          &lt;
                          {loading ? <LoadingSpinner /> : ""}
                        </button>

                        <button
                          style={{
                            display: index == data.length - 1 ? "none" : "",
                          }}
                          type="submit"
                          id={subjectId}
                          onClick={() => handleNext(subjectId)}
                          className="default-btn mt-10 nxtmodule hideonweb"
                        >
                          &gt;
                          {loading ? <LoadingSpinner /> : ""}
                        </button>

                        <Tooltip
                          title="This section contains downloadable zip files that contain course material."
                          placement="top"
                        >
                          {zip.length > 0 && (
                            <button
                              className="default-btn mt-10 mr-05"
                              onClick={handleDownload}
                            >
                              Download Course Material
                            </button>
                          )}
                        </Tooltip>

                        {/* {videoId && (
                      <button
                        className="default-btn mt-10 viewslides hideonmob"
                        onClick={handleOpen}
                      >
                        View Slides
                      </button>
                    )} */}

                        {meetUrl && (
                          <>
                            <button
                              className="default-btn mt-10 viewslides hideonmob"
                              onClick={() => window.open(meetUrl, "_blank")}
                            >
                              {console.log("973", meetUrl)}
                              Meeting URL
                            </button>
                            <button
                              className="default-btn mt-10 viewslides hideonweb"
                              onClick={() => window.open(meetUrl, "_blank")}
                            >
                              Meeting URL
                            </button>
                          </>
                        )}

                        {quizid == null ? (
                          <span></span>
                        ) : (
                          <Link
                            href="/my-courses/view/quiz/[id]"
                            as={`/my-courses/view/quiz/${quizid}`}
                          >
                            <button className="default-btn mt-10 hideonweb takequiz">
                              Take Quiz
                            </button>
                          </Link>
                        )}
                        {quiznav === "practice" && (
                          <button
                            style={{
                              marginLeft: 3,
                            }}
                            className="default-btn  hideonweb takequiz mt-10"
                            onClick={() => setPracBtn(true)}
                          >
                            Practice Papers
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: resflag ? "none" : "block" }}>
                {loading2 ? (
                  // Show a loading spinner or custom message while values are loading
                  <div style={{ margin: "100px 100px 300px 100px" }}>
                    Loading...
                  </div>
                ) : (
                  <div className="nosubjects">
                    You do not seem to have access to this course. Please get in
                    touch with our team for assistance.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div
                className="nosubjects"
                style={{ display: crstype === "crs" ? "block" : "none" }}
              >
                E-learning for this module is currently not available. Please
                get in touch with our team for assistance.
              </div>

              <div
                className="nosubjects"
                style={{ display: crstype === "quiz" ? "block" : "none" }}
              >
                Practice papers
                {quizzs.length ? (
                  quizzs.map((qz, index) => (
                    <Link href={"/practicetests/quiz/" + qz.id}>
                      <div key={index} className="quizcontainerbtn">
                        {qz.name}
                      </div>
                    </Link>
                  ))
                ) : (
                  <h3>No quizs</h3>
                )}
              </div>
              <div
                className="nosubjects"
                style={{ display: crstype === "final-exam" ? "block" : "none" }}
              >
                <div>
                  {
                    <div
                      style={{
                        display:
                          userBool.disablee === "true" ? "block" : "none",
                      }}
                    >
                      <h3>
                        Oops! You do not have access to this examination.
                        <br />
                        Kindly reach out to exams@winupskill.com to retake it.
                      </h3>
                      <Link href="/user/my-profile">
                        <button className="default-btn">my profile</button>
                      </Link>
                    </div>
                  }
                </div>
                {quizzs.length ? (
                  quizzs.map((qz, index) => (
                    <div
                      key={index}
                      style={{
                        display:
                          userBool.disablee === "true" ? "none" : "block",
                      }}
                    >
                      {/* {qz.name} <br/>
        <div dangerouslySetInnerHTML={{ __html: examDet }} />      
      <a href={'/finalexampapers/quiz/' + qz.id}   
      >
        <button className="default-btn">
        Start Exam
        </button>
      </a>
       */}

                      {/* <Modal open={open} onClose={() => setOpen(false)}>
                        <Box sx={modalBoxStyle}>
                          <Typography  gutterBottom>
                          Type your Full Name here (This will reflect in your certificate)                          
                          </Typography>
                          <TextField
                            fullWidth
                            label="Certificate Name"
                            variant="outlined"
                            value={certificateName}
                            onChange={handleChangeName}
                            sx={{ mb: 2 }}
                          />
                          <button
                            className="default-btn "
                            onClick={() => {
                              localStorage.setItem(
                                "certiName",
                                certificateName
                              );
                              setOpen(false);
                            }}
                          >
                            Save
                          </button>
                        </Box>
                      </Modal> */}

<ExamModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="Type your Full Name here (This will reflect in your certificate)"
        onSubmit={handleModalSubmit}
      />                      <div className="exam-instructions">
                        <h4>Examination Instructions:</h4>
                        <ul>
                          <li>
                            <strong>Number of Questions</strong>: The exam
                            consists of 40 multiple choice questions.
                          </li>
                          <li>
                            <strong>Answer Options</strong>: Each question has 4
                            possible answers; only one answer is correct.
                          </li>
                          <li>
                            <strong>Scoring</strong>:
                          </li>
                          <ul className="sub-list">
                            <li>Each correct answer is worth 1 score.</li>
                            <li>
                              Incorrect or non-answered questions are worth 0
                              score.
                            </li>
                          </ul>
                          <li>
                            <strong>Passing Criteria</strong>: The passing mark
                            is 65% (a score of 26).
                          </li>
                          <li>
                            <strong>Marking Scheme</strong>: There is no
                            negative marking.
                          </li>
                          <li>
                            <strong>Time Allocation</strong>: You have 60
                            minutes to complete the exam.
                          </li>
                          <li>
                            <strong>Exam Conditions</strong>:
                          </li>
                          <ul className="sub-list">
                            <li>
                              The exam is closed book, no reference materials
                              are allowed.
                            </li>
                            <li>
                              You must complete the exam in one sitting; pausing
                              the exam is not permitted.
                            </li>
                            <li>
                              You must adhere to honest conduct and refrain from
                              copying or using any undue resources.
                            </li>
                          </ul>
                          <li>
                            <strong>Results</strong>: The results will be
                            published immediately upon submission of your
                            completed answer paper.
                          </li>
                          <li>
                            <strong>Certification</strong>:
                          </li>
                          <ul className="sub-list">
                            <li>
                              If you achieve the passing score, the successful
                              course completion certificate will be immediately
                              issued by WIN. It is authorized by Exemplar
                              Global.
                            </li>
                            <li>
                              Your certificate will be issued on the name that
                              you have mentioned on your account on this website
                              (win learning portal).{" "}
                              <strong>
                                No changes can be made to the name on the
                                certificate after it is issued.
                              </strong>
                            </li>
                          </ul>
                          <label style={{ display: "flex", gap: 20 }}>
                            <input
                              type="checkbox"
                              checked={check1}
                              onChange={() => handleCheck()}
                            />
                         Please enter your name as you would like 
                         it to appear on your certificate before starting the exam
                          </label>
                          <li>
                            <strong>Retake Policy</strong>:
                          </li>
                          <ul className="sub-list">
                            <li>
                              In case you do not achieve the passing score, you
                              are welcome to retake the exam. Please send an
                              email to our provided email ID to arrange your
                              retake.
                            </li>
                          </ul>
                        </ul>
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={check}
                            onChange={() => setCheck(!check)}
                          />
                          I confirm that I have read and understood all the
                          instructions provided for this examination, and I
                          agree to comply with all the specified terms and
                          conditions.
                        </label>
                        <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link href={"/finalexampapers/quiz/" + qz.id}>
                          <button
                            className={`default-btn ${
                              !check || !check1 ? "disabled-class-btn" : ""
                            }`}
                            disabled={!check || !check1}
                          >
                            Start Exam
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <br />
                    <br />
                    <br />
                    Oops! You do not have access to this examination. Kindly
                    reach out to exams@winupskill.com to retake it.
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};

SingleCourses.getInitialProps = async (ctx) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (!token) {
      return { videos: [] };
    }
    const { userid } = parseCookies(ctx);

    const { id } = ctx.query;

    const payload = {
      headers: { Authorization: token },
      //  params: {courseId: id},
    };

    const url = `https://winupskill.in/api/api/subjects?course_id=${id}&sort_by=sortorder`;
    const response = await axios.get(url, payload);

    return response.data;
  } else {
    const { token } = parseCookies(ctx);

    if (!token) {
      return { videos: [] };
    }
    const { userid } = parseCookies(ctx);

    const { id } = ctx.query;

    const payload = {
      headers: { Authorization: token },
      //  params: {courseId: id},
    };

    const url = `https://winupskill.in/api/api/subjects?course_id=${id}&sort_by=sortorder`;
    const response = await axios.get(url, payload);

    return response.data;
  }
};

export default SingleCourses;


