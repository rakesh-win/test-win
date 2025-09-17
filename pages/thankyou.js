import React from 'react';
import PageBanner from '../components/Common/PageBanner';
import cookie from 'js-cookie'
import Router from 'next/router'

import TagManager from 'react-gtm-module';


const thankyou = () => { 




 

      const tagManagerArgs = {
             gtmId: 'GTM-K9NXHCN',
             events: {
                 name: cookie.get('name'),
                 page:"thankyou",
                 landingurl: cookie.get('landingurl'),
                 utm_source:cookie.get('id'), 
                 utm_source_current:cookie.get('utm_source_current')
             }
         }

  
         TagManager.initialize(tagManagerArgs);
	

 return (
 	<React.Fragment>
		
<PageBanner 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Thank you for your details"
            />  


 <div className="thankyoupage ptb-100 container">
 We have received your details, will be in touch shortly. Meanwhile you can take a look at our available courses!
 <p></p>
 <p><a href="/">Click here</a> to go to the home page and continue browsing.</p>
 		<div className="ptb-100">
 		</div>


 </div>
 </React.Fragment>
 	
    )
}

export default thankyou;  