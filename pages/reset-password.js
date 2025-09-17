import React from 'react'
import PageBanner from '../components/Common/PageBanner'
import ResetForm from '../components/Authentication/ResetForm'
 


const Resetpwd = () => {

      

    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="Reset Password!" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Reset Password" 
            />  

               
            <div className="profile-authentication-area ptbpage">
                <div className="container">
                    <div className="row">
                            <ResetForm />
                        
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Resetpwd;