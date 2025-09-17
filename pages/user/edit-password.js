import React, { useState, useEffect } from "react";
// import Navbar from '../components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
 import { parseCookies } from 'nookies';
// import Footer from '../components/_App/Footer';
import Alert from 'react-popup-alert';
import axios from "axios";

const EditPassword = (user,tok) => {

  
    const [pass, setPass] = useState('');
    const [cnfpass, setCnfpass] = useState('');

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

      function onShowAlert(type,text) {
        setAlert({
          type: type,
          text: text,
          show: true
        })
      }
  


    const editpasswordsubmit = async(e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        if(pass === cnfpass){
            if(pass === ''){
               setHeadertext("Error!"),
               setBtntext("Close");
               onShowAlert("error","You have not entered any password");

            }

            else{
            const url = `https://winupskill.in/api/api/users/${user.user.id}`
           if(token){
            const payload = {
              headers: {Authorization: 'Bearer '+token}
            } 
            
            var formData = new FormData();
            formData.append("id", user.user.id);
            formData.append("password", pass);
            formData.append("test", "test");

            var response = await axios.patch(url, {"password": pass}, payload).then(
             result => {
               console.log("response",result);
               setHeadertext("Password Changed!"),
               setBtntext("Close");
               onShowAlert("success","Your password has been successfully changed.");
             })
            }

            }


               

        }

        else{
               setHeadertext("Error!"),
               setBtntext("Close");
               onShowAlert("error","The new password entered in two boxes doesn't match. Please try again");
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
                    <div className="border-box">
                        <form>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" onChange={e => setPass(e.target.value)} className="form-control" id="pass" />
                            </div> 

                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" className="form-control" onChange={e => setCnfpass(e.target.value)} id="cnfpass" />
                            </div>

                            <button onClick={editpasswordsubmit} type="submit" className="default-btn">
                                Update

                                <span></span>
                            </button> 
                        </form>
                    </div>
                </div>
          
    )
}

export default EditPassword;