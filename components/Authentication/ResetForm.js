import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Alert from 'react-popup-alert';
import LoadingSpinner from '@/utils/LoadingSpinner';

const INITIAL_USER = {email: "",};

const ResetForm = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [headertext, setHeadertext] = useState('');
  const [btntext, setBtntext] = useState('');

  const [alert, setAlert] = useState({
    type: 'error',
    text: '',
    show: false
  });

  function onCloseAlert() {
    console.log("at close alert", alert.type);
    if (alert.type === 'success') {
      Router.push('/authentication');
    }
    setAlert({
      type: '',
      text: '',
      show: false
    });
  }

  function onShowAlert(type, text) {
    setAlert({
      type: type,
      text: text,
      show: true
    });
  }

  useEffect(() => {
    const isUserValid = user.email.trim() !== '';
    setDisabled(!isUserValid);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const forgotpwd = async (e) => {
    e.preventDefault();
    console.log("Submitted email:", user.email);

    try {
      setLoading(true);
      const url = `https://winupskill.in/api/api/forgotpwd`;
      const payload = { email: user.email };
      const response = await axios.post(url, payload);

      console.log("Response:", response.data);

      setHeadertext("Success!");
      setBtntext("Close");
      onShowAlert("success", response.data?.data || "Password reset link sent!");
    } catch (error) {
      console.error("Error:", error.response || error.message);
      setHeadertext("Error!");
      setBtntext("Close");
      onShowAlert("error", error?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h3>Enter your registered email id and submit to reset your password!</h3>

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

      <form onSubmit={forgotpwd}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={disabled || loading}>
          Submit {loading && <LoadingSpinner />}
        </button>
      </form>
    </div>
  );
};

export default ResetForm;
