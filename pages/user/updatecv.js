import React, { useState, useEffect } from "react";
// import Navbar from '../components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
 import { parseCookies } from 'nookies';
// import Footer from '../components/_App/Footer';
import Alert from 'react-popup-alert';
import axios from "axios";

import Preloader from '@/components/_App/Preloader';

const Updatecv = (user) => {
    

     const [loading, setLoading] = React.useState(false);

    const [name, setName] = useState(user.user.name);
    const [mobile, setMobile] = useState(user.user.mobile);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    
    const [address, setAddress] = useState('');
    const [experience, setExperience] = useState('');
    const [currentrole, setCurrentrole] = useState('');
    const [linkedinurl, setLinkedinurl] = useState('');

    const [userprofile2, setUserprofile2] = React.useState({});
    
    const [headertext, setHeadertext] = useState(0);
    const [btntext, setBtntext] = useState(0);
    const [token, setToken] = React.useState();
     const [cv, setCv] = useState(null);
     const [tempcv, setTempcv] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
     setToken(user.token);
     setCv(user.userprofile.cvurl);
    },[]);

    useEffect(() => {
     setToken(user.token);
     setCv(user.userprofile.cvurl);
    },[user]);


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
        }),
        window.location.reload();
      } 

      function onShowAlert(type,text) {
        setAlert({
          type: type,
          text: text,
          show: true
        })
      }
    

    function handlecvInputChange(event) {
        const file = event.target.files[0];
        setTempcv(file);

    }
 

      function handleUploadButtonClick() {
        setLoading(true);
          if (tempcv) {
            const formData = new FormData();
            formData.append("cv", tempcv);


            const payload = {
              headers: {Authorization: 'Bearer '+token}
            } 
          
            
            axios.post('https://winupskill.in/api/api/usercvupdate',formData,payload)
              .then(response => {
               setCv(response.data.cvurl);
               setLoading(false);

                setHeadertext("Success!"),
                setBtntext("Close"),
                onShowAlert("success","CV Updated!")

                
                })
              .catch(error => {
                setLoading(false);
                console.log("err",error)
                // Do something with the error, such as displaying an error message or updating the UI
              });
          }
        }



    return (
       
                <div className="container">
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

                    <div className="border-box">
                    <div style={{display: cv ==="NA" ? 'none': ''}}>
                         <a href={cv} target="_blank">Currently Updated CV</a>
                    </div>
                     <p></p>
                     <input className="imgupl" type="file" onChange={handlecvInputChange} />
                         <button className="default-btn mt-10" onClick={handleUploadButtonClick}>Update CV</button>
                 

                        <div style={{display: cv ==="Not Updated" ? '': 'none'}}>

                       
                         
                         </div>
                    </div>
                </div>
        
    
    )
}

export default Updatecv;

