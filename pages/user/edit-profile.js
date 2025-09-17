import React, { useState, useEffect } from "react";
import PageBanner from '@/components/Common/PageBanner';
import { parseCookies } from 'nookies';
import Alert from 'react-popup-alert';
import axios from "axios";

const EditProfile = (user) => {

    const [name, setName] = useState(user.user.name);
    const [mobile, setMobile] = useState(user.user.mobile);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [experience, setExperience] = useState('');
    const [currentrole, setCurrentrole] = useState('');
    const [linkedinurl, setLinkedinurl] = useState('');
    const [cvurl, setCvurl] = useState('');
    const [userprofile2, setUserprofile2] = useState({});
    const [headertext, setHeadertext] = useState(0);
    const [btntext, setBtntext] = useState(0);
    const [token, setToken] = useState();
    const [alert, setAlert] = useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
    });
    const [previousValues, setPreviousValues] = useState({});

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setName(user.user.name);
        setMobile(user.user.mobile);
        setAddress(user.userprofile.address);
        setExperience(user.userprofile.experience);
        setCurrentrole(user.userprofile.currentrole);
        setLinkedinurl(user.userprofile.linkedinurl);
        setCountry(user.userprofile.country);
        setState(user.userprofile.state);
        setCvurl(user.userprofile.cvurl);

        // Store initial values (before edit)
        setPreviousValues({
            name: user.user.name,
            mobile: user.user.mobile,
            country: user.userprofile.country,
            state: user.userprofile.state,
            address: user.userprofile.address,
            experience: user.userprofile.experience,
            currentrole: user.userprofile.currentrole,
            linkedinurl: user.userprofile.linkedinurl,
            cvurl: user.userprofile.cvurl
        });
    }, [user]);

    const onCloseAlert = () => {
        setAlert({
            type: '',
            text: '',
            show: false
        });
    };

    const onShowAlert = (type, text) => {
        setAlert({
            type: type,
            text: text,
            show: true
        });
    };

    const getprofdetails = async () => {
        if (token) {
            const payload = {
                headers: { Authorization: 'Bearer ' + token }
            };
            var re = axios.get(`https://winupskill.in/api/api/usrprofile`, payload).then(
                result3 => {
                    console.log("70", result3);
                    setUserprofile2(result3.data[0]);
                    setCountry(result3.data[0].country);
                    setState(result3.data[0].state);
                    setAddress(result3.data[0].address);
                    setExperience(result3.data[0].experience);
                    setCurrentrole(result3.data[0].currentrole);
                    setLinkedinurl(result3.data[0].linkedinurl);
                }
            );
        }
    };

    const compareChanges = () => {
        const changes = {};
        if (previousValues.name !== name) changes.name = { old: previousValues.name, new: name };
        if (previousValues.mobile !== mobile) changes.mobile = { old: previousValues.mobile, new: mobile };
        if (previousValues.country !== country) changes.country = { old: previousValues.country, new: country };
        if (previousValues.state !== state) changes.state = { old: previousValues.state, new: state };
        if (previousValues.address !== address) changes.address = { old: previousValues.address, new: address };
        if (previousValues.experience !== experience) changes.experience = { old: previousValues.experience, new: experience };
        if (previousValues.currentrole !== currentrole) changes.currentrole = { old: previousValues.currentrole, new: currentrole };
        if (previousValues.linkedinurl !== linkedinurl) changes.linkedinurl = { old: previousValues.linkedinurl, new: linkedinurl };
        return changes;
    };

    const editpasswordsubmit = async (e) => {
        e.preventDefault();

        const url = `https://winupskill.in/api/api/users/${user.user.id}`;
        if (token) {
            const payload = {
                "Content-Type": "multipart/form-data",
                headers: { Authorization: "Bearer " + token }
            };

            var response = await axios.patch(url, {
                name,
                mobile
            }, payload).then(async (result) => {
                var result2 = await axios.patch(`https://winupskill.in/api/api/usrprofile/${user.user.id}`, {
                    country,
                    state,
                    address,
                    experience,
                    currentrole,
                    linkedinurl
                }, payload);

                // Send the changes (before and after) to the backend API for logging
                const changes = compareChanges();
                if (Object.keys(changes).length > 0) {
                    axios.post(`https://www.winupskill.in/api/api/profile-acti`, {
                        "mail": user.user.email,
                        mobile,
                        "changes": JSON.stringify(changes),  // Send the changes as a JSON string
                        name,
                        url: window.location.href,
                        action:"edit",
                        "userid":localStorage.getItem('userid')
                        
                    }).then(res => console.log(res)).catch(err=> console.log(err));
                }

                user.onObjectChange(result.data.data);
                getprofdetails();
                setHeadertext("Profile Updated!");
                setBtntext("Close");
                onShowAlert("success", "Your profile data has been successfully updated.");
            });
        }
    };

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
                        <label>Name</label>
                        <input type="text" onChange={e => setName(e.target.value)} value={name} className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                        <label>Mobile</label>
                        <input type="mobile" onChange={e => setMobile(e.target.value)} value={mobile} className="form-control" id="mobile" />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input type="text" onChange={e => setCountry(e.target.value)} value={country} className="form-control" id="country" />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input type="text" onChange={e => setState(e.target.value)} value={state} className="form-control" id="state" />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" onChange={e => setAddress(e.target.value)} value={address} className="form-control" id="address" />
                    </div>
                    <div className="form-group">
                        <label>Experience (in Years)</label>
                        <input type="text" onChange={e => setExperience(e.target.value)} value={experience} className="form-control" id="experience" />
                    </div>
                    <div className="form-group">
                        <label>Current Role</label>
                        <input type="text" onChange={e => setCurrentrole(e.target.value)} value={currentrole} className="form-control" id="currentrole" />
                    </div>
                    <div className="form-group">
                        <label>Linkedin Profile URL</label>
                        <input type="text" onChange={e => setLinkedinurl(e.target.value)} value={linkedinurl} className="form-control" id="linkedinurl" />
                    </div>
                    <button onClick={editpasswordsubmit} type="submit" className="default-btn">
                        Update
                        <span></span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
