import React, { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Link from "@/utils/ActiveLink";

export default function Mobmenu() {
  const [menuitems, setMenuitems] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  useEffect(() => {
        getmenuitems();
    },[]);


    const getmenuitems = async() => {
              const url = `https://winupskill.in/api/api/menus?type=Mobile`
                var response = await axios.get(url).then(
                result => {
                    setMenuitems(result.data.data)
                })
    } 


  return (
    <div>

<Accordion   // master
        className="mobmenuitemtop"
        expanded={expanded === "panel20"}
        onChange={handleChange("panel20")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          className="accordbtn"
        >
          <Typography>Master Classes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 12 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>


    

      <Accordion // security and privacy
        className="mobmenuitemtop"
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography>Security & Privacy Management Courses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 2 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>


      <Accordion  //it governance and 
        className="mobmenuitemtop"
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography>IT Governance & Resilience Courses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 3 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>

      
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
          <Typography>IT Service Management Courses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 1 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
  
    
      <Accordion
        className="mobmenuitemtop"
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography>Project, Program & Quality Management Courses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 4 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        className="mobmenuitemtop"
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography>Career-Path Based Courses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 5 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        className="mobmenuitemtop"
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography>ISO Lead Auditor / Implementer Courses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 6 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        className="mobmenuitemtop"
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          className="accordbtn"
        >
          <Typography>Emerging Technologies Courses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 7 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="mobmenuitemtop"
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          className="accordbtn"
        >
          <Typography>Free Courses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 8 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="mobmenuitemtop"
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          className="accordbtn"
        >
          <Typography>Practice Papers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {menuitems.map((menus, index) => (
            <Link key={index} href={menus.mlink} activeClassName="active">
              <a
                className="mainmenuli"
                style={{ display: menus.mcategory == 9 ? "list-item" : "none" }}
              >
                <span dangerouslySetInnerHTML={{ __html: menus.mname }} />
              </a>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>

  
    
    </div>
  );
}
      // <Accordion
      //   aria-controls="panel4bh-content"
      //   id="panel4bh-header"
      //   className="accordbtn"
      // >
      //   <Typography>
      //     <a
      //       style={{ fontWeight: "normal" }}
      //       href="/pages/pg/microlearn-series "
      //     >
      //       Micro Courses
      //     </a>
      //   </Typography>
      // </Accordion>