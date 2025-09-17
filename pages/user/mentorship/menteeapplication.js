import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import PageBanner from "@/components/Common/PageBanner";
import style from "./mentor.module.css";
import Alert from "react-popup-alert";
import Router from "next/router";
import Preloader from "@/components/_App/Preloader";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  "Cyber Security",
  "Network Security",
  "IOT",
  "Artificial Intelligence",
  "IT Business Development",
  "Key Account Management",
  "Managed Services",
  "Cloud Adoption",
  "IT Leadership",
  "Process Governance",
  "Service Management",
  "Infrastructure architecture & Operations",
  "Cloud Migration",
  "Security Operations",
  "Data Center & Network architecture",
];

const Menteeapplication = () => {
  const [loading, setLoading] = useState(false);
  const [headertext, setHeadertext] = useState(0);
  const [btntext, setBtntext] = useState(0);
  const [mentorid, setMentorid] = useState("14");
  const [alert, setAlert] = useState({
    type: "error",
    text: "This is an alert message",
    show: false,
  });

  function onCloseAlert() {
    setAlert({
      type: "",
      text: "",
      show: false,
    });

    Router.push("/user/my-profile");
  }

  function onShowAlert(type, text) {
    setAlert({
      type: type,
      text: text,
      show: true,
    });
  }

  const [userID, setUserID] = useState();
  const [location, setLocation] = useState("n/a");
  const [workExperience, setWorkExperience] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentcompany, setCurrentcompany] = useState("");
  const [mentorshipMotivation, setMentorshipMotivation] = useState(""); // Updated state: Change from input to textarea
  const [cvFile, setCVFile] = useState(null);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCVFile(file);
  };

  useEffect(() => {
    setUserID(localStorage.getItem("userid"));
  }, []);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(typeof userID);
    const formData = new FormData();
    formData.append("userid", userID);
    formData.append("location", location);
    formData.append("yearsofexp", workExperience);
    formData.append("workExperience", workExperience);
    formData.append("currenttitle", currentPosition);
    formData.append("currentcompany", currentcompany);
    formData.append("motivation", mentorshipMotivation);
    formData.append("domain", selectedDomains);
    formData.append("mentorid", mentorid);

    if (cvFile) {
      formData.append("cvurl", cvFile, cvFile.name);
    } else {
      formData.append("cvurl", "none");
    }

    axios
      .post("https://winupskill.in/api/api/menteeapplications", formData)
      .then((response) => {
        console.log("Success1:", response.data);
        const formData2 = new FormData();
        formData2.append("userid", userID);
        formData2.append("service", "mentorship");
        formData2.append("mentor", localStorage.getItem("mentorid"));

        axios
          .post("https://winupskill.in/api/api/clubservices", formData2)
          .then((response2) => {
            console.log("Success2:", response2.data);
            setLoading(false);

            setHeadertext("Success!");
            setBtntext("Close");
            onShowAlert(
              "success",
              "We have received your request and have forwarded the same to our mentor for review!"
            );
          })

          .catch((error2) => {
            console.log("Error:", error2);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error:", error);
      });
  };

  const handleOptionChange = (event) => {
    const selectedOptions = event.target.value;
    if (selectedOptions.length > 4) {
      setSelectedDomains(selectedOptions.slice(0, 4));
    } else {
      setSelectedDomains(selectedOptions);
    }
  };

  const renderOptions = () => {
    return options.map((option) => (
      <MenuItem key={option} value={option}>
        <Checkbox checked={selectedDomains.includes(option)} />
        <ListItemText primary={option} />
      </MenuItem>
    ));
  };

  return (
    <>
      <React.Fragment>
        <PageBanner
          pageTitle={`Apply to get mentored`}
          homePageUrl="/"
          homePageText="Home"
          activePageText="Apply to get mentored"
        />

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

        <div
          style={{
            minHeight: "500px",
            backgroundColor: "#f8f8f8",
            padding: "50px",
          }}
        >
          <section className={style.mainform}>
            <h2 className={style.mentesTitle}>
              Winupskill: Mentorship Session Intake Form
            </h2>
            <form className={style.mentesForm} onSubmit={handleSubmit}>
              <div>
                <label htmlFor="workExperience" className={style.label}>
                  Years of Work Experience:
                </label>
                <select
                  id="workExperience"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  className={style.input}
                  required
                >
                  <option value="">select Experience</option>
                  <option value="0-3">0 - 3</option>
                  <option value="4-7">4 - 7</option>
                  <option value="8-12">8 - 12</option>
                  <option value="13-16">13 - 16</option>
                  <option value="17-20">17 - 20</option>
                  <option value="20+">20+</option>
                </select>
              </div>
              <div>
                <label htmlFor="currentPosition" className={style.label}>
                  Current Role:
                </label>
                <input
                  type="text"
                  id="currentPosition"
                  value={currentPosition}
                  onChange={(e) => setCurrentPosition(e.target.value)}
                  className={style.input}
                  required
                />
              </div>
              <div>
                <label htmlFor="currentCompany" className={style.label}>
                  Current Organisation:
                </label>
                <input
                  type="text"
                  id="currentCompany"
                  onChange={(e) => setCurrentcompany(e.target.value)}
                  className={style.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="mentorshipDomain" className={style.label}>
                  Mentorship needed on:
                </label>
                <div className={style.checkboxDropdown}>
                  {dropdownVisible && (
                    <div className={style.dropdownOptions}>
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="mentorship-domain-label">
                          Select Domains
                        </InputLabel>
                        <Select
                          labelId="mentorship-domain-label"
                          id="mentorship-domain"
                          multiple
                          value={selectedDomains}
                          onChange={handleOptionChange}
                          input={<OutlinedInput label="Select Domains" />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {renderOptions()}
                        </Select>
                      </FormControl>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="mentorshipMotivation" className={style.label}>
                  Why do you need a mentor? (critical points)
                </label>
                <textarea // Changed from input to textarea
                  rows="4"
                  cols="50"
                  id="mentorshipMotivation"
                  onChange={(e) => setMentorshipMotivation(e.target.value)}
                  className={style.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="cv" className={style.label}>
                  CV:
                </label>
                <input
                  type="file"
                  id="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={style.input}
                />
              </div>
              <div className={style.termsContainer}>
                    <label htmlFor="terms" className={style.termsLabel}>
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        onClick={() => {
                          const checkbox = document.getElementById("terms");
                          if (checkbox.checked) {
                            window.open(
                              "/user/mentorship/T&Cmentee",
                              "_blank"
                            );
                          }
                        }}
                      />
                      <span className={style.termsText}>
                        I agree to the{" "}
                        Terms & Conditions
                      </span>
                    </label>
                  </div>
              <button type="submit" className="default-btn mt-10">
                Submit
              </button>
            </form>
          </section>
        </div>
      </React.Fragment>
    </>
  );
};

export default Menteeapplication;
