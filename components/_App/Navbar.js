import React, { useState, useEffect } from "react";
import Link from "@/utils/ActiveLink";
import { useSelector } from "react-redux";
import { handleLogout } from "@/utils/auth";
import SearchForm from "./SearchForm";
import axios from "axios";
import Mainmenu from "./Mainmenu";
import Mobmenu from "./Mobmenu";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import TagManager from "react-gtm-module";
import Router from "next/router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Navbar = ({ user }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [menu, setMenu] = useState(true);
  const [allCourses, setallCourses] = React.useState([]);
  const [zipCode, setZipCode] = useState("");
  const [hidenavlinks, setHidenavlinks] = useState("");
  const [hidealllinks, setHidealllinks] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const router = useRouter();
  const isViewCoursePage = router.pathname === "/calculator/isocalculator";
  // Conditionally render the navbar component
  if (isViewCoursePage) return null;

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    getCourses();
    setCountry();
    checknavlinks();
  }, []);

  if (user) {
    cookie.set("name", user.name);
  }

  const tagManagerArgs = {
    gtmId: "GTM-K9NXHCN",
  };
  if (typeof window === "undefined") {
  } else {
    TagManager.initialize(tagManagerArgs);
  }

  const checknavlinks = async () => {
    if (typeof window !== "undefined") {
      //   nile
      const pathname = window.location.pathname; //returns the current url minus the domain name
      if (
        pathname.startsWith("/info") ||
        pathname.startsWith("/pages/offer/")
      ) {
        setHidenavlinks("true");
      }
      if (pathname.startsWith("/pages/pg/")) {
        setHidealllinks("true");
      }
    }
  };

  useEffect(() => {
    const logUserActivities = (pageAction = "page_load") => {
      const url = `https://winupskill.in/api/api/useractivities`;
      const locuid = localStorage.getItem("userid");
  
      if (locuid) {
        const tempuid = localStorage.getItem("tempuserid");
        const windowLoc = window.location.href;
  
        const formData = new FormData();
        formData.append("userid", locuid);
        formData.append("tempuserid", tempuid || "");
        formData.append("currentpage", windowLoc);
        formData.append("device", "webapp");
        formData.append("pageAction", pageAction);
  
        try {
          navigator.sendBeacon(url, formData); // Reliable for unload events
          console.log(`${pageAction} logged successfully`);
        } catch (error) {
          console.error("Error logging user activity:", error);
        }
      }
    };
  
    // Set the reload flag for page refresh detection
    sessionStorage.setItem("is_reloading", "true");
  
    const handlePageHide = (event) => {
      if (event.persisted) {
        // Skip if the page is being saved in the back/forward cache
        console.log("Page persisted in cache, not logging unload activity.");
        return;
      }
  
      const isReloading = sessionStorage.getItem("is_reloading") === "true";
      if (isReloading) {
        logUserActivities("page_refresh"); // Log refresh event
        sessionStorage.removeItem("is_reloading"); // Clear the flag
      }
    };
  
    // Handle route changes (to detect navigation vs. reload)
    const handleRouteChange = () => {
      sessionStorage.setItem("is_reloading", "true");
    };
  
    // Attach event listeners
    window.addEventListener("pagehide", handlePageHide);
    router.events.on("routeChangeStart", handleRouteChange);
  
    // Log initial page load activity
    logUserActivities();
  
    // Cleanup on component unmount
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);
  


  const setCountry = async () => {
    const url = `https://api.ipstack.com/check?access_key=ef544b38b730e49ba1a027060159d10d`;
    var loc = localStorage.getItem("country");

    if (!loc) {
      var response = axios.get(url).then((result) => {
        localStorage.setItem("country", result.data.country_name);
        localStorage.setItem("state", result.data.region_name);
      });
    }
  };

  const getCourses = async () => {
    const url = `https://winupskill.in/api/api/courses`;
    var response = await axios.get(url).then((result) => {
      setallCourses(result.data.data);
    });
  };

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  const isAdmin = user && user.role === "admin";
  const isTeacher = user && user.role === "teacher";

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <>
      <div
        id="navbar"
        className="navbar-area"
        style={{ display: hidealllinks === "true" ? "none" : "" }}
      >
        <div
          className="edemy-nav"
          style={{ display: hidenavlinks === "true" ? "" : "none" }}
        >
          <a className="navbar-brand">
            <img
              width="300"
              className="hideonmob"
              src="/images/whitelogo.png"
              alt="logo"
            />
            <img className="hideonweb" src="/images/whitelogo.png" alt="logo" />
          </a>
        </div>

        <div
          className="edemy-nav"
          style={{ display: hidenavlinks === "true" ? "none" : "" }}
        >
          <div className="container-fluid">
            <div className="navbar navbar-expand-lg navbar-light">
              <Link href="/">
                <a onClick={toggleNavbar} className="navbar-brand">
                  <img
                    width="300"
                    className="hideonmob"
                    src="/images/whitelogo.png"
                    alt="logo"
                  />
                  <img
                    className="hideonweb"
                    src="/images/whitelogo.png"
                    alt="logo"
                  />
                </a>
              </Link>

              <div className="option-item classTwo hideonweb">
                <div className="cart-btn">
                  <Link href="/cart">
                    <a>
                      <i className="flaticon-shopping-cart"></i>{" "}
                    </a>
                  </Link>
                </div>
              </div>

              {/* <div className="option-item classTwo hideonweb">
                <div className="cart-btn">
                  <Link href="/user/my-profile">
                    <a>
                      <i className="flaticon-user"></i>
                    </a>
                  </Link>
                </div>
              </div> */}

              <div className="option-item classTwo hideonweb">
								<div className="cart-btn">
									{user ? (
										// If user is authenticated
										<Link href="/user/my-profile">
											<a>
												<i className="flaticon-user"></i>{" "}
											</a>
										</Link>
									) : (
										// If user is not authenticated
										<Link href="/authentication">
											<a>
												<i className="flaticon-user"></i>{" "}
											</a>
										</Link>
									)}
								</div>
							</div>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <SearchForm />
                  </li>

                  <li className="nav-item">
                    <Link href="/">
                      <a className="nav-link">Home</a>
                    </Link>
                  </li>

                  <li className="nav-item megamenu hideonmob">
                    <Link href="/">
                      <a
                        style={{ height: "100px" }}
                        onClick={(e) => e.preventDefault()}
                        className="nav-link"
                      >
                        Courses <i className="bx bx-chevron-down"></i>
                      </a>
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <div className="container">
                          <div className="row">
                            <Mainmenu />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                {/* <li className="nav-item hideonmob">
                    <Link href="/pages/pg/microlearn-series ">
                      <a className="nav-link">Micro Courses</a>
                    </Link>
                  </li> */}
                  <li className="nav-item hideonmob">
                    <Link href="">
                      <a className="nav-link">Resource</a>
                    </Link>
                    <ul
                      className="dropdown-menu"
                      style={{
                        position: "absolute",
                        left: "-25px",
                        width: "10px",
                      }}
                    >
                      <li>
                        <Link href="/blogs">
                          <a>Blogs</a>
                        </Link>
                        <Link href="/webinar">
                          <a>Webinar</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item megamenu hideonweb menumobnew">
                    Courses <i className="bx bx-chevron-down"></i>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <div className="container">
                          <div className="row">
                            <Mobmenu />
                          </div>
                          Others
                          <Accordion
                            className="mobmenuitemtop"
                            expanded={expanded === "panel1"}
                            onChange={handleChange("panel1")}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                              className="mobmenuitem"
                            >
                              <Typography>Resource</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Link href={`/webinar`} activeClassName="active">
                                <a>Webinar</a>
                              </Link>
                              <Link href={`/blogs`} activeClassName="active">
                                <a>Blogs</a>
                              </Link>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </li>
                    </ul>
                  </li>

                  <div className="option-item hideonmob">
                    <div className="cart-btn">
                      <Link href="/cart">
                        <a>
                          <i className="flaticon-shopping-cart"></i>
                        </a>
                      </Link>
                    </div>
                  </div>

                  {((user && isTeacher) || (user && isAdmin)) && (
                    <li className="nav-item">
                      <Link href="/teacher/dashboard">
                        <a className="nav-link">Teacher Dashboard</a>
                      </Link>
                    </li>
                  )}
                  {user && isAdmin && (
                    <li className="nav-item">
                      <Link href="/admin/dashboard">
                        <a className="nav-link">Dashboard</a>
                      </Link>
                    </li>
                  )}
                </ul>

                <div className="others-option d-flex align-items-center">
                  <div className="option-item">
                    {user ? (
                      <div className="user-dropdown">
                        <Link href="/user/my-profile">
                          <a className="default-btn-profile">
                            {user.name} <span></span>
                          </a>
                        </Link>

                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link
                              href="/user/my-profile"
                              activeClassName="active"
                            >
                              <a onClick={toggleNavbar} className="nav-link">
                                My Profile
                              </a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link href="/">
                              <a
                                className="nav-link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLogout();
                                }}
                              >
                                Logout
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link href="/authentication">
                        <a className="default-btn-profile">
                          Login/Register <span></span>
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

/* line 219

                                                    
                                                    <div className="row m-0 mobile-none">
                                                        <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                                                            <div className="single-category-widget">
                                                                <div className="icon">
                                                                    <i className="bx bx-layer"></i>
                                                                </div>
                                                                <h3>
                                                                    IT Service Management
                                                                </h3>
                                                                <span className="sub-title">
                                                                    5 Courses
                                                                </span>

                                                                <Link href="/courses-1">
                                                                    <a className="link-btn"></a>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                                                            <div className="single-category-widget">
                                                                <div className="icon">
                                                                    <i className="bx bx-lock-alt"></i>
                                                                </div>
                                                                <h3>
                                                                Security & Privacy Management
                                                                </h3>
                                                                <span className="sub-title">
                                                                    8 Courses
                                                                </span>

                                                                <Link href="/courses-2">
                                                                    <a className="link-btn"></a>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                                                            <div className="single-category-widget">
                                                                <div className="icon">
                                                                    <i className="bx bx-health"></i>
                                                                </div>
                                                                <h3>IT Governance & Resilience</h3>
                                                                <span className="sub-title">
                                                                    3 Courses
                                                                </span>

                                                                <Link href="/courses-3">
                                                                    <a className="link-btn"></a>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                                                            <div className="single-category-widget">
                                                                <div className="icon">
                                                                    <i className="bx bxs-flag-checkered"></i>
                                                                </div>
                                                                <h3>
                                                                    ISO Lead Auditor
                                                                </h3>
                                                                <span className="sub-title">
                                                                    4 Courses
                                                                </span>

                                                                <Link href="/courses-4">
                                                                    <a className="link-btn"></a>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                                                            <div className="single-category-widget">
                                                                <div className="icon">
                                                                    <i className="bx bx-code-alt"></i>
                                                                </div>
                                                                <h3>Emerging Technologies</h3>
                                                                <span className="sub-title">
                                                                    21 Courses
                                                                </span>

                                                                <Link href="/courses-5">
                                                                    <a className="link-btn"></a>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                                                            <div className="single-category-widget">
                                                                <div className="icon">
                                                                    <i className="bx bx-line-chart"></i>
                                                                </div>
                                                                <h3>
                                                                    Project, Program & Quality Management
                                                                </h3>
                                                                <span className="sub-title">
                                                                    3 Courses
                                                                </span>

                                                                <Link href="/courses-6">
                                                                    <a className="link-btn"></a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    */