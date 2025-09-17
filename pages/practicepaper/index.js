import React, { useState, useEffect } from "react";
import PageBanner from "@/components/Common/PageBanner";
import Link from "next/link";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";

const Practicetests = () => {
  const [enrolledCourses, setenrolledCourses] = React.useState([]);
  const loadfunc = undefined;

  const enrolledCourse2 = [];

  useEffect(() => {
    getenrolledCourses();
  }, [loadfunc, enrolledCourse2.length]);

  const getenrolledCourses = async (ctx) => {
    loadfunc = 1;
    console.log("ingetalcr", loadfunc);
    const token = localStorage.getItem("token");
    if (!token) {
      return { enrolled: [] };
    }

    const payload = {
      headers: { Authorization: "Bearer " + token },
    };

    const url = `https://winupskill.in/api/api/enrollstats`;
    var response = await axios.get(url, payload).then((result) => {
      console.log("response", result);
      setenrolledCourses(result.data), (enrolledCourse2 = result.data);
      console.log("nile", enrolledCourse2.length);
    });
  };

  return (
    <React.Fragment>
      <PageBanner
        pageTitle="My Courses"
        homePageUrl="/"
        homePageText="Home"
        activePageText="My Courses"
      />

      <div className="pt-100 pb-70">
        <div className="container">
          <div className="row">
            <h3>Enrolled Courses</h3>

            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((enrolledCourse) => (
                <div
                  className="col-lg-4 col-md-6"
                  key={enrolledCourse.id}
                  style={{
                    display:
                      enrolledCourse.complstatus === "yes" ? "none" : "block",
                  }}
                >
                  <Link
                    href="/my-courses/view/[id]"
                    as={`/my-courses/view/${enrolledCourse.id}`}
                  >
                    <div className="single-courses-box">
                      <div className="courses-image">
                        <Link
                          href="/my-courses/view/[id]"
                          as={`/my-courses/view/${enrolledCourse.id}`}
                        >
                          <a className="d-block image">
                            <img
                              src={enrolledCourse.image}
                              alt={enrolledCourse.name}
                            />
                          </a>
                        </Link>

                        <Link href="#">
                          <a className="fav">
                            <i className="flaticon-heart"></i>
                          </a>
                        </Link>
                      </div>

                      <div className="courses-content">
                        <h3>
                          <Link
                            href="/my-courses/view/[id]"
                            as={`/my-courses/view/${enrolledCourse.id}`}
                          >
                            <a>{enrolledCourse.name}</a>
                          </Link>
                        </h3>

                        <p>{enrolledCourse.description.slice(0, 100)}</p>

                        <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                          <li>
                            <i className="flaticon-people"></i>{" "}
                            {enrolledCourse.duration}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-lg-12">
                <h2 className="empty-content">No Enrolled Courses</h2>
              </div>
            )}

            <h3>Completed Courses</h3>

            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((enrolledCourse) => (
                <div
                  className="col-lg-4 col-md-6"
                  key={enrolledCourse.id}
                  style={{
                    display:
                      enrolledCourse.complstatus === "yes" ? "block" : "none",
                  }}
                >
                  <Link
                    href="/my-courses/view/[id]"
                    as={`/my-courses/view/${enrolledCourse.id}`}
                  >
                    <div className="single-courses-box">
                      <div className="courses-image">
                        <Link
                          href="/my-courses/view/[id]"
                          as={`/my-courses/view/${enrolledCourse.id}`}
                        >
                          <a className="d-block image">
                            <img
                              src={enrolledCourse.image}
                              alt={enrolledCourse.name}
                            />
                          </a>
                        </Link>

                        <Link href="#">
                          <a className="fav">
                            <i className="flaticon-heart"></i>
                          </a>
                        </Link>
                      </div>

                      <div className="courses-content">
                        <h3>
                          <Link
                            href="/my-courses/view/[id]"
                            as={`/my-courses/view/${enrolledCourse.id}`}
                          >
                            <a>{enrolledCourse.name}</a>
                          </Link>
                        </h3>

                        <p>{enrolledCourse.description.slice(0, 100)}</p>

                        <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                          <li>
                            <i className="flaticon-people"></i>{" "}
                            {enrolledCourse.duration}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-lg-12">
                <h2 className="empty-content">No Completed Courses</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Practicetests;
