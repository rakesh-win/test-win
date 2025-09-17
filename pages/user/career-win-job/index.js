import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import PageBanner from '@/components/Common/PageBanner';
import Alert from 'react-popup-alert';
import Preloader from '@/components/_App/Preloader';
import { useRouter } from 'next/router';

const Careerwinjob = () => {
  const [careerops, setCareerops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [headertext, setHeadertext] = useState(0);
  const [btntext, setBtntext] = useState(0);
  
  const [alert, setAlert] = useState({
    type: 'error',
    text: 'This is an alert message',
    show: false
  });

  const router = useRouter();

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://winupskill.in/api/api/jobs?status=win`);
      setCareerops(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyForJobs = (jobId, jobName) => {
    localStorage.setItem("jobid", jobId);
    localStorage.setItem("jobname", jobName);
    router.push("/user/career-win-job/winjobdetails");
  };

  return (
    <React.Fragment>
      <PageBanner 
          pageTitle={`Current Opportunities`}
          homePageUrl="/" 
          homePageText="Home" 
          activePageText="Current Opportunities" 
      />  
      <Alert
        header={headertext}
        btnText={btntext}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={() => setAlert({ ...alert, show: false })}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />

      {loading && <Preloader />}

      <div>
        <table className="Table">
          <thead className="TableHead">
            <tr>
              <th className="TableHeader">Role</th>
              <th className="TableHeader hide-mobile">Experience Level</th>
              <th className="TableHeader hide-mobile">Location</th>
              <th className="TableHeader hide-mobile">Posted On</th>
              <th className="TableHeader"></th>
            </tr>
          </thead>
          <tbody className="TableBody">
            {careerops.map((mtr, index) => (
              <tr key={mtr.id}>
                <td>{mtr.title}</td>
                <td className="hide-mobile">{mtr.experience}</td>
                <td className="hide-mobile">{mtr.location}</td>
                <td className="hide-mobile">{new Date(mtr.created_at).toDateString()}</td>
                <td>
                  <button
                    className="ViewButton"
                    onClick={() => applyForJobs(mtr.id, mtr.title)}
                  >
                    View Job
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment> 
  );
};

export default Careerwinjob;




