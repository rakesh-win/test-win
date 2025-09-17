import React, { useState, useEffect } from "react";
// import Navbar from '../components/_App/Navbar';
import { parseCookies } from 'nookies';
import axios from 'axios';
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import baseUrl from '@/utils/baseUrl'
import cookie from 'js-cookie'
// import Footer from '../components/_App/Footer';

const MyBadges = () => {

const [badges, setBadges] = React.useState([]);
const [token, setToken] = React.useState();

     useEffect(() => {
     setToken(localStorage.getItem("token"));
     getBadges();
     },[token]); 
  

    useEffect(() => {
     setToken(localStorage.getItem("token"));
    },[]);
    
    const payload = {
        headers: {Authorization: 'Bearer '+token}
    }

    const getBadges = async() => {

           const url = `https://winupskill.in/api/api/badges`
           console.log("payload",payload)

           if(token){
          
            var response = await axios.get(url, payload).then(
             result => {
                console.log("badges",result.data),
                setBadges(result.data)
             })
            }
          
    } 

      const getenrolledCourses = async ctx => {
        loadfunc = 1;
        console.log("ingetalcr",loadfunc);
        if(!token){
            return {enrolled: []}
        }

        const payload = {
            headers: {Authorization: 'Bearer '+token}
        }


        const url = `https://winupskill.in/api/api/enrollstats`
            var response = await axios.get(url, payload).then(
             result => {
                 console.log("response",result)
                setenrolledCourses(result.data),
                enrolledCourse2 = result.data
                
             })

      }




    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle="My Badges" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="My Badges" 
            />  

            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                  
                        <h3>Obtained Badges</h3>

                        {badges.length ? badges.map(userbadges => (
                         <div className="badgecontainer">
                            <img class="coursebadge" src={userbadges.image} />
                            <br/><b>Valid from:</b> {userbadges.created_at.slice(0, 10)}
                        </div>

                        )) : (
                            <h1>No badges found!</h1>
                        )}


                    </div>

                       
                </div>
            </div>
         
        </React.Fragment>
    )
}



export default MyBadges;