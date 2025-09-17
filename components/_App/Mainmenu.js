import React, { useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from "@/utils/ActiveLink";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        
        <Box sx={{ width: '100%' }}>
         {children}
        </Box>
      )}
    </div>
  );
}
 
TabPanel.propTypes = { 
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
} 

const Mainmenu = () => {
 
    const [value, setValue] = React.useState(0);

    const [menuitems, setMenuitems] = React.useState([]);
    const [menucatnames, setMenucatnames] = React.useState([]);
    const [menucats, setMenucats] = React.useState([]);

    useEffect(() => {
         getmenuitems();
    },[]);


    const getmenuitems = async() => {

                const url2 = `https://winupskill.in/api/api/menucats?visible=yes&sort_by=menuorder`
                    var response = await axios.get(url2).then(
                     result => {
                        setMenucatnames(result.data.data)
                })


               const url = `https://winupskill.in/api/api/menus?type=web&sort_by=morder`
                var response = await axios.get(url).then(
                 result => {
                    setMenuitems(result.data.data)
                 })
                const uniqueNames = menuitems
                  .map((obj) => obj.mcategory)
                  .filter((mcategory, index, self) => {
                    return index === self.indexOf(mcategory);
                });
           setMenucats(uniqueNames);
    } 



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabHover = (event, newValue) => {
    if (event.type === 'mouseover') {
      setValue(newValue);
    }
  };


    return (
        <>

        
           
             
                
                                      
 
            <Box
                  sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: 360 }}
                  
                >


               
                  <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: '#592a9c' }}
                    
                    style={{"minWidth":"375px"}}
                  > 

                     {menucatnames.map((menucs, index2) => (
                         <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, index2)} label={   <>
                    {menucs.name}
                    &nbsp;
                    <span
                      style={{
                        backgroundColor: menucs.tagbgcolor
                          ? menucs.tagbgcolor
                          : "none",
                        color: menucs.tagfontcolor
                          ? menucs.tagfontcolor
                          : "none",
                        display: menucs.tagname ? menucs.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
               
                      {menucs.tagname}
                    </span>
                  </>} {...a11yProps(index2)} />
                     ))}
                  </Tabs>



                  


                   
                    <TabPanel value={value} index={0}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 1)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		                 <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                    <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>
                  
                    <TabPanel value={value} index={1}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 2)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		                  <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                       <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 3)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		      <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                       <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>

                    <TabPanel value={value} index={3}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 4)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		      <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                       <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>

                    <TabPanel value={value} index={4}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 5)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		      <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                       <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>

                    <TabPanel value={value} index={5}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 6)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		      <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                       <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>

                    <TabPanel value={value} index={6}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 7)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		      <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                       <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>

                    <TabPanel value={value} index={7}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 8)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		      <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                       <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>

                    <TabPanel value={value} index={8}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 9)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		      <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                       <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>

                      <TabPanel value={value} index={9}>
                      <ul className="menucolumcontainer"> 
                            {menuitems.map((menus, index) => (
                                <Link 
                                    key={index}
                                    
                                    href={menus.mlink}
                                    activeClassName="active"
                                >
                                    <a className="mainmenuli" style={{display: (menus.mcategory == 12)? 'flex' : 'none'}}>
                                     <span dangerouslySetInnerHTML={{__html: menus.mname}} />
                                     &nbsp;
		      <span
                      style={{
                        backgroundColor: menus.tagbgcolor
                          ? menus.tagbgcolor
                          : "none",
                        color: menus.tagfontcolor
                          ? menus.tagfontcolor
                          : "none",
                        display: menus.tagname ? menus.tagname : "none",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontWeight: "lighter",
                        fontSize: "10px",
                      }}
                    >
                       <span dangerouslySetInnerHTML={{__html: menus.tagname}} />
                    </span>
                                    </a>
                                </Link>
                               ))}
                        </ul>
                    </TabPanel>



                                        

        
        </Box>

       

         

        



        </> 
    )
}

export default Mainmenu; 



/*

<Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: '#592a9c' }}
                    
                    style={{"minWidth":"375px"}}
                  > 

                    <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, 0)} label="IT Service Management Courses" {...a11yProps(0)} />
                    <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, 1)} label="Security & Privacy Management Courses" {...a11yProps(1)} />
                    <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, 2)} label="IT Governance & Resilience Courses" {...a11yProps(2)} />
                    <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, 3)} label="Project, Program & Quality Management Courses" {...a11yProps(3)} />
                    <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, 4)} label="Career-Path Based Courses" {...a11yProps(4)} />
                    <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, 5)} label="ISO Lead Auditor / Implementer Courses" {...a11yProps(5)} />
                    <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, 6)} label="Emerging Technologies Courses" {...a11yProps(6)} />
                    <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, 7)} label="Free Courses" {...a11yProps(7)} />
                    <Tab className="mainmenucat" onMouseOver={(event) => handleTabHover(event, 8)} label="Practice Papers" {...a11yProps(8)} />
                  </Tabs>


*/
