import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from '@/components/Common/PageBanner';
import Router from 'next/router';

import Alert from 'react-popup-alert';
import Preloader from '@/components/_App/Preloader';

const Winjobdetails = () => {

    const [careerops, setCareerops] = React.useState([]);

    const [loading, setLoading] = React.useState(false);

    const [headertext, setHeadertext] = useState(0);
    const [btntext, setBtntext] = useState(0);

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


    useEffect(() => {
        getjobs();
    }, []);

    const getjobs = async ctx => {
        var jid = localStorage.getItem("jobid");
        var response = axios.get(`https://winupskill.in/api/api/jobs?id=${jid}`).then(
            resultu => {
                console.log("resultu", resultu, jid);
                setCareerops(resultu.data.data);

            })
    }



    function applyforjobs(jobid, jobname) {

        localStorage.setItem("jobid", jobid);
        localStorage.setItem("jobname", jobname);

        Router.push("/user/career-win-job/jobapply");

    }

    return (
        <>
            <React.Fragment>
                {/* <Navbar /> */}
                <PageBanner
                    pageTitle={`Opportunity Detail`}
                    homePageUrl="/"
                    homePageText="Home"
                    activePageText="Opportunity Detail"
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


                {loading && <Preloader />}


                <div style={{
                    minHeight: "500px"
                }}>
                    <div className="jobcontainerbig">

                        {careerops.length > 0 ? careerops.map((mtr, index) => (
                            <div className="jobdetails">

                                <div className="profiletextcontainer">
                                    <p style={{ fontWeight: "bold", fontSize: "40px" }}>{mtr.title}</p>
                                    
                                    <p><b>Location:</b> {mtr.location}</p>
                                    <p><b>Type:</b> {mtr.type}</p>
                                    <p><b>Experience Level:</b> {mtr.experience}</p>
                                    <p><b>Job description:</b> </p>
                                    <p dangerouslySetInnerHTML={{ __html: mtr.description }} />
                                    {/* <p><b>Posted On:</b> {new Date(mtr.created_at).toDateString()}</p> */}

                                    <button className="default-btn mt-10" style={{fontWeight:"500"}}
                                        onClick={() =>
                                            applyforjobs(
                                                mtr.id,
                                                mtr.title
                                            )}
                                    >Apply for this Job</button>
                                </div>

                            </div>
                        )) : ("Loading...")}
                    </div>

                </div>

            </React.Fragment>
        </>
    );
};

export default Winjobdetails;