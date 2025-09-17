import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Modal } from "reactstrap";
import { Box, Tooltip } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import AlertReact from "react-popup-alert";
import Preloader from "@/components/_App/Preloader";
import { sendForm } from "@/lib/api.js";
import {
  isocalciOptions,
  calculateRegistrationFee,
  auditTimeStages,
  calculatePerDayAuditFee,
  calculateAdditionalDays,
  style,
  saarcCountries,
} from "@/utils/isocost";

const INITIAL_USER = {
  name: "",
  email: "",
  mobile: "",
};

function Isocalculator() {
  const [employeeOption, setEmployeeOption] = useState("1-5");
  const [locationOption, setLocationOption] = useState(1);
  const [countryOption, setCountryOption] = useState("");
  const [standardOption, setStandardOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [user, setUser] = useState(INITIAL_USER);
  const [open, setOpen] = useState(false);
  const [accept, setAccept] = useState(true);
  const [alert, setAlert] = useState({
    type: "error",
    text: "This is an alert message",
    show: false,
  });
  var handleOpen = () => {
    if (
      !employeeOption ||
      !locationOption ||
      !countryOption ||
      !standardOption ||
      totalCost === 0
    ) {
      setOpen(false);
      onShowAlert("success", "Please Choose an Options & Calculate");
    } else {
      setOpen(true);
    }
  };
  var handleClose = () => setOpen(false);
  const fetchUserData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const url = `https://winupskill.in/api/api/users`;
        const payload = {
          headers: { Authorization: "Bearer " + token },
        };
        const response = await axios.get(url, payload);

        setUser((prevState) => ({
          ...prevState,
          name: response.data.name,
          email: response.data.email,
          mobile: response.data.mobile,
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEmployeeChange = (event) => {
    setEmployeeOption(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationOption(parseInt(event.target.value, 10));
  };

  const handleCountryScopeChange = (event) => {
    const values = event.target.value;
    setCountryOption(values);
    setTotalCost(0);
  };

  const handleChoiceOfStandardChange = (event) => {
    setStandardOption(event.target.value);
  };

  const AgreeAlert = () => {
    if (!accept) {
      onShowAlert(
        "success",
        "The information provided by this calculator is for general information purposes only. While we have made every attempt to ensure that the information provided by this calculator has been obtained from reliable sources, Consultants Factory (a brand of TMMS Solutions Pvt. Ltd.) is not responsible for any errors or inaccuracies. We take no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this calculator."
      );
    } else {
      return null;
    }
  };

  const onCloseAlert = () => {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  };

  const onShowAlert = (type, text) => {
    setAlert({
      type: type,
      text: text,
      show: true,
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const menuProps = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  const handleCalculate = (event) => {
    if (
      !employeeOption ||
      !locationOption ||
      !countryOption ||
      !standardOption
    ) {
      onShowAlert("error", "Please choose options");
    }

    setTotalCost(calculateTotalCost());
  };

  const calculateTotalCost = () => {
    const noOfEmployees = parseFloat(auditTimeStages[employeeOption]);
    const numberLocationScope = parseFloat(
      calculateAdditionalDays(locationOption)
    );
    const countryPrimaryScope = parseInt(
      calculatePerDayAuditFee(countryOption, standardOption)
    );
    const choiceOfStandards = parseInt(
      calculateRegistrationFee(countryOption, standardOption)
    );

    return (
      (noOfEmployees + numberLocationScope) * countryPrimaryScope +
      choiceOfStandards
    );
  };

  const renderCurrency = () => {
    return (
      <span style={{ fontSize: 12 }} id="value">
        {totalCost !== 0 &&
          (saarcCountries.includes(countryOption) ? "INR" : "USD")}
      </span>
    );
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !employeeOption ||
      !locationOption ||
      !countryOption ||
      !standardOption ||
      !user.name ||
      !user.email ||
      !user.mobile
    ) {
      onShowAlert("error", "Please fill in all required fields.");
      return;
    }

    const formData = {
      employeeOption,
      locationOption,
      countryOption,
      standardOption,
      totalCost,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    };

    try {
      sendForm(formData);
      // if(!response.ok){
      //     onShowAlert(
      //       "error",
      //       "Please try again later"
      //     );
      // }else{
      //    onShowAlert(
      //      "success",
      //      "Success! We have received your details and will be in touch shortly."
      //    );
      // }

      onShowAlert(
        "success",
        "Success! We have received your details and will be in touch shortly."
      );

      setOpen(false);
    } catch (error) {
      {
        !response.ok
          ? onShowAlert("error", "An error occurred. Please try again.")
          : "";
      }

      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      <div>
        <AlertReact
          header={""}
          btnText={"OK"}
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
      </div>

      <div className="isocalculator__main" style={{ zindex: 1000 }}>
        <div className="isocalculator__container">
          <div className="isocalculator-form">
            <div className="iso-text">
              <p>ISO Certification Cost Calculator</p>
            </div>

            <div className="isocalculator__values">
              <FormControl>
                {/* <section style={{height:'30px'}}> */}
                <Tooltip
                  title="
                choose the range of total number of employees (IT as well as non-IT) that may come under the scope of the certification
                "
                >
                  <label htmlFor="employee" sx={{ zIndex: 99 }}>
                    No of employees in scope
                    <span>&#9432;</span>
                  </label>
                </Tooltip>
                {/* </section> */}
                <Select
                  id="employee"
                  value={employeeOption}
                  onChange={handleEmployeeChange}
                  className="isocalculator__select"
                  variant="standard"
                >
                  {isocalciOptions.employees.map((emp, i) => (
                    <MenuItem key={i} value={emp} sx={{ zindex: 100000000 }}>
                      {employeeOption ? emp : "select"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="isocalculator__values">
              <FormControl>
                <label htmlFor="location">
                  No of locations in scope
                  <Tooltip
                    title="If the certification is for two different office locations in the same city, 
                    the no. of sites should be 2. If there are three office locations in three different countries in scope, choose 3 etc"
                  >
                    <span>&#9432;</span>
                  </Tooltip>
                </label>
                <Select
                  id="location"
                  onChange={handleLocationChange}
                  value={locationOption}
                  className="isocalculator__select"
                  MenuProps={menuProps}
                  variant="standard"
                >
                  {isocalciOptions.locations.map((loc, i) => (
                    <MenuItem key={i} value={loc}>
                      {loc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="isocalculator__values">
              <FormControl>
                <label htmlFor="choiceOfStandard">
                  Choice of Standard
                  <Tooltip
                    title="
  Choose the ISO standard that your organization wants to be certified for"
                  >
                    <span>&#9432;</span>
                  </Tooltip>
                </label>
                <Select
                  id="choiceOfStandard"
                  onChange={handleChoiceOfStandardChange}
                  value={standardOption}
                  className="isocalculator__select"
                  variant="standard"
                  MenuProps={menuProps}
                >
                  {isocalciOptions.choiceOfStandards.map(
                    (choiceOfStandard, i) => (
                      <MenuItem key={i} value={choiceOfStandard}>
                        {choiceOfStandard}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </div>

            <div className="isocalculator__values">
              <FormControl>
                <label htmlFor="countryScope">
                  Country of Primary Scope
                  <Tooltip
                    title="
                    Decide which site is the primary location (based on its head office location / no. of employees / business interest etc. Example: For an Organization that has 3 sites in 3 different countries (head office in India, two smaller units in USA & in Japan) in scope, the primary country could be India
                    "
                  >
                    <span>&#9432;</span>
                  </Tooltip>
                </label>
                <Select
                  id="countryScope"
                  onChange={handleCountryScopeChange}
                  value={countryOption}
                  className="isocalculator__select"
                  MenuProps={menuProps}
                  style={{ display: "inline-block" }}
                  variant="standard"
                >
                  {isocalciOptions.countryScopes.map((countryScope, i) => (
                    <MenuItem key={i} value={countryScope}>
                      {countryScope}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="iso-component">
            <div className="isotool__container">
              <div className="iso-text isotool__heading">
                <p>ISO Certification Cost Calculator</p>
              </div>
              <div className="isotool__main">
                <div className="isotool_valueslist">
                  <div className="isocalculator__values">
                    <p
                      style={{
                        fontSize: "16px",
                        color: " #052f5f",
                        fontFamily: "Open Sans ,sans-serif",
                        margin: 0,
                        textAlign: "center",
                      }}
                    >
                      Certification Cost
                    </p>
                    <span
                      style={{
                        color: "#1b1dc7",
                        fontSize: "25px",
                        fontWeight: 500,
                        textAlign: "center",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {totalCost}
                      {renderCurrency()}
                    </span>
                    <div className="isocalculator-btn">
                      <button
                        disabled={
                          employeeOption === "" ||
                          locationOption === "" ||
                          countryOption === "" ||
                          standardOption === ""
                        }
                        onClick={handleCalculate}
                      >
                        <p
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Neue Haas Unica",
                          }}
                        >
                          Calculate
                        </p>
                      </button>
                    </div>

                    <label
                      style={{ textAlign: "center" }}
                      className="knowmore-lable"
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "-6px",
                          color: "blue",
                        }}
                        onClick={AgreeAlert}
                      >
                        <input
                          type="checkbox"
                          checked={accept} // Bind the checkbox to the state
                          onChange={(event) => setAccept(event.target.checked)} // Update the state on change
                        />
                        &nbsp; I Agree to the terms & conditions
                      </span>
                    </label>
                    <div className="isocalculator-btn knowmore">
                      <button onClick={handleOpen} disabled={!accept}>
                        <p
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Neue Haas Unica",
                          }}
                        >
                          Know more
                        </p>
                      </button>
                      <div className="isocalculator__values">
                        <label
                          style={{
                            textAlign: "center",
                            fontSize: 10,
                            padding: 14,
                            position: "absolute",
                            top: "22px",
                          }}
                        >
                          Contact us for a pro-bono 20-minutes expert
                          discussion. You may use this call for a more accurate
                          costing for your Organization's ISO journey, or for
                          other related topics
                        </label>
                      </div>
                    </div>
                    <div>
                      {/* suceess */}

                      <Modal isOpen={open} toggle={handleClose}>
                        <Box sx={style}>
                          <span
                            style={{ float: "right", cursor: "pointer" }}
                            onClick={() => setOpen(false)}
                          >
                            {" "}
                            x
                          </span>
                          <form onSubmit={handleFormSubmit}>
                            <div className="iso-forms">
                              <label>Name:</label>
                              <br />

                              <input
                                onChange={handleChange}
                                name="name"
                                value={user.name}
                                style={{
                                  marginBottom: "10px",
                                  borderTop: 0,
                                  borderLeft: 0,
                                  borderRight: 0,
                                  width: "100%",
                                }}
                                required
                              />
                            </div>
                            <div className="">
                              <label>Email:</label>
                              <br />
                              <input
                                name="email"
                                value={user.email}
                                type="email"
                                style={{
                                  marginBottom: "10px",
                                  borderTop: 0,
                                  borderLeft: 0,
                                  borderRight: 0,
                                  width: "100%",
                                  border: "solid 1px 0.1",
                                }}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="">
                              <label>Mobile:</label>
                              <br />
                              <input
                                required
                                name="mobile"
                                type="mobile"
                                value={user.mobile}
                                onChange={handleChange}
                                style={{
                                  marginBottom: "20px",
                                  borderTop: 0,
                                  borderLeft: 0,
                                  borderRight: 0,
                                  width: "100%",
                                  overflow: "hidden",
                                }}
                              />
                            </div>

                            <div className="isocalculator-btn ">
                              <button type="submit">Submit</button>
                            </div>
                          </form>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <p>
          <div>Total Cost:</div>
          (({noOfEmployees}+{numberLocationScope}
          )x{countryPrimaryScope})+
          {choiceOfStandards}={totalCost}
        </p>
      </div> */}
    </>
  );
}

export default Isocalculator;


var styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    fontWeight: "lighter",
  },
};