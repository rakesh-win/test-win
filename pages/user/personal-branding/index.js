import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from '@/components/Common/PageBanner';

const Personalbranding = () => {
 

  return (
    <>
    <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle={`Personal Branding`}
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Personal Branding" 
            />  
      <div style={{
        height:"500px"
      }}>

      </div>


    </React.Fragment>
    </>
  );
};

export default Personalbranding;