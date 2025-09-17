import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Progress_sml from "../Common/Progress_sml";

import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Typography, Modal, Radio, FormControlLabel, RadioGroup } from "@mui/material";

const fetchCourseTypes = async (userid) => {
  try {
    const response = await axios.get(
      `https://winupskill.in/api/api/enrollcrstype?userid=${userid}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching enrolled course types:", error);
    return [];
  }
};

function Enrolled({ enrolledCourses, loading2, cmpl }) {
  const [types, setTypes] = useState([]);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [displayedCourses, setDisplayedCourses] = useState(enrolledCourses);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    if (userid) {
      fetchCourseTypes(userid).then(setTypes);
    }
  }, []);

  useEffect(() => {
    let filtered = [...enrolledCourses];
  
    // Apply filtering
    if (filterOption === "LVC") {
      filtered = filtered.filter((ec) =>
        types.find((el) => parseInt(el.courseid) === ec.id)?.crstype === "LVC"
      );
    } else if (filterOption === "SelfPaced") {
      filtered = filtered.filter((ec) =>
        types.find((el) => parseInt(el.courseid) === ec.id)?.crstype === "Self-paced"
      );
    } else if (filterOption === "Exam") {
      filtered = filtered.filter((ec) =>
        types.find((el) => parseInt(el.courseid) === ec.id)?.crstype === "Exam"
      );
    } else if (filterOption === "All" || filterOption === "") {
      // No filtering, display all courses
      filtered = [...enrolledCourses];
    }
  
    // Apply sorting
    if (sortOption === "AtoZ") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "ZtoA") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
  
    setDisplayedCourses(filtered);
  }, [sortOption, filterOption, enrolledCourses, types]);
  

  const handleSortOpen = () => setSortOpen(true);
  const handleSortClose = () => setSortOpen(false);

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  if(loading2) { 
    <div style={{ margin: "100px 100px 300px 100px" }}>Loading...</div>
   }else {
    <h4 className="empty-content">
    Still wondering which course to choose? Do get in touch with us
    for guidance!
  </h4>
   }

  return (
    <>
      <div className="profile-tab-container row">
        {/* Sort Button */}
        <p>
          <Button style={{ color: "black" }} onClick={handleSortOpen} endIcon={<SortIcon />}>
            Sort
          </Button>
     
          <Button style={{ color: "black" }} onClick={handleFilterOpen} endIcon={<FilterListIcon />}>
            Filter
          </Button>
        </p>

        {/* Sort Modal */}
        <Modal
          open={sortOpen}
          onClose={handleSortClose}
          aria-labelledby="sort-modal-title"
          aria-describedby="sort-modal-description"
        >
          <Box sx={modalStyle}>
            <center>
              <Typography id="sort-modal-title" variant="h6" component="h2">
                Sort Options
              </Typography>
            </center>
            <br />
            <RadioGroup value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <FormControlLabel value="AtoZ" control={<Radio />} label="Sort: A-Z" />
              <FormControlLabel value="ZtoA" control={<Radio />} label="Sort: Z-A" />
            </RadioGroup>
            <center>
              <button onClick={handleSortClose} className="default-btn">
                Apply
              </button>
            </center>
          </Box>
        </Modal>

        {/* Filter Modal */}
        <Modal
          open={filterOpen}
          onClose={handleFilterClose}
          aria-labelledby="filter-modal-title"
          aria-describedby="filter-modal-description"
        >
          <Box sx={modalStyle}>
            <center>
              <Typography id="filter-modal-title" variant="h6" component="h2">
                Filter Options
              </Typography>
            </center>
            <br />
            <RadioGroup value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
            <FormControlLabel value="All" control={<Radio />} label=" All" />
              <FormControlLabel value="LVC" control={<Radio />} label=" Live Online" />
              <FormControlLabel value="SelfPaced" control={<Radio />} label=" Self-Paced" />
              <FormControlLabel value="Exam" control={<Radio />} label=" Exam" />
            </RadioGroup>
            <center>
              <button variant="contained" onClick={handleFilterClose} className="default-btn">
                Apply
              </button>
            </center>
          </Box>
        </Modal>

        {displayedCourses.length > 0 ? (
          displayedCourses.map((ec, index) => {
            const matchTag = types.find((el) => parseInt(el.courseid) === ec.id);

            return (
              <div
                className="col-lg-2 col-md-3"
                key={index}
                style={{
                  display: ec.complstatus === "yes" ? "none" : "block",
                  marginRight: "30px",
                }}
              >
                <Link href={`/my-courses/view/${ec.id}`}>
                  <div className="single-courses-box">
                  {matchTag?.crstype && (
  <span>
    <span
      style={{
        position: "absolute",
        zIndex: 100,
        backgroundColor: "#40af40",
        color: "white",
        padding: "5px",
        margin: "5px",
        fontSize: "10px",
        fontWeight: 100,
        borderRadius: "5px",
        display:matchTag?.crstype === "LVC" ? 'block' : 'none' 
      }}
    >
    Live Online
    </span>
    <span
      style={{
        position: "absolute",
        zIndex: 100,
        backgroundColor: "blue",
        color: "white",
        padding: "5px",
        margin: "5px",
        fontSize: "10px",
        fontWeight: 100,
        borderRadius: "5px",
        display:matchTag?.crstype === "Exam" ? 'block' : 'none' 
      }}
    >
     {matchTag?.crstype} 
    </span>
    <span
      style={{
        position: "absolute",
        zIndex: 100,
        backgroundColor: "#D0140F",
        color: "white",
        padding: "5px",
        margin: "5px",
        fontSize: "10px",
        fontWeight: 100,
        borderRadius: "5px",
        display:matchTag?.crstype === "Self-paced" ? 'block' : 'none' 
      }}
    >
     Self-Paced
    </span>
    
    </span>
    
  )}

                    <div className="courses-image">
                      <a className="d-block image">
                        <img src={ec.image} alt={ec.name} />
                      </a>
                    </div>

                    <div
                      className="courses-content profiletable"
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        height: "100px",
                      }}
                    >
                      <h3>
                        <Link href={`/my-courses/view/${ec.id}`}>
                          <a style={{ fontSize: "14px" }}>{ec.name}</a>
                        </Link>
                      </h3>

{cmpl.map((cmp, index2) => (<div className="" key={index2} style={{ display: (ec.id == cmp.crsid) ? 'block' : 'none' }}>
  <Progress_sml style={{ margin: '0px' }} bgcolor="#f7dada" progress={cmp.pct} height={25} />
</div>
))}
</div>
</div>
</Link>
</div>
            );
          })
        ) : (
          <div className="col-lg-12">
{
  loading2 ? 
    "Loading..." : 
    (enrolledCourses.length === 0 ? 
      "Still wondering which course to choose? Do get in touch with us for guidance!" : 
      (displayedCourses.length === 0 ? < >No courses match the filter criteria.</> : null)
    )
}

        </div>
)}
</div>
    </>
  );
}

export default Enrolled;
