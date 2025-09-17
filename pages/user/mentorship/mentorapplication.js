import React, { useEffect, useState } from "react";
import axios from "axios";
import PageBanner from "@/components/Common/PageBanner";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "./mentor.module.css";
import Alert from "react-popup-alert";
import Router from "next/router";
import Preloader from "@/components/_App/Preloader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";

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

const expertiseOptions = [
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
       
const Mentorapplication = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [expertise, setExpertise] = useState([]);
  const [currentorganisation, setCurrentorganisation] = useState("");
  const [currentrole, setCurrentrole] = useState("");
  const [experience, setExperience] = useState("");
  const [userImage, setUserImage] = useState("");
  const [experiencedetail, setExperiencedetail] = useState("");
  const [achievements, setAchievements] = useState("");
  const [talksabout, setTalksabout] = useState(null);
  const [motivation, setMotivation] = useState(null);
  const [availablehours, setAvailablehours] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [alert, setAlert] = useState({
    type: "",
    text: "",
    show: false,
    timeoutId: null,
  });

  const router = useRouter();
                         
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUser(token);
    } else {
      router.push("/login");
    }
  }, []);

  const getUser = async (token) => {
    setLoading(true);
    const url = `https://winupskill.in/api/api/users`;

    const payload = {
      headers: { Authorization: "Bearer " + token },
    };

    try {
      const response = await axios.get(url, payload);
      setUser(response.data);

      const response2 = await axios.get(
        `https://winupskill.in/api/api/signedusers`,
        payload
      );
      const userData = response2.data;

      if (Array.isArray(userData) && userData.length > 0) {
        const imageUrl = userData[0].image;
        setUserImage(imageUrl);
      }
    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("userid", user.id);
    formData.append("image", imageFile);
    formData.append(
      "experience",
      `${experience}\ncurrentorganisation: ${currentorganisation}\ncurrentrole: ${currentrole}\nexpdetails: ${experiencedetail}`
    );
    formData.append("achievements", achievements);
    formData.append("expertise", expertise.join(","));
    formData.append("motivation", motivation);
    formData.append("availablehours", availablehours);
    formData.append("email", user.email);

    const talkAboutPlainText = new DOMParser().parseFromString(
      talksabout,
      "text/html"
    ).documentElement.textContent;
    formData.append("talksabout", talkAboutPlainText);

    try {
      const response = await axios.post(
        "https://winupskill.in/api/api/mentorapplications",
        formData
      );
      console.log("Success:", response.data);
      setLoading(false);
      onShowAlert(
        "success",
        "We have received your request. We will get in touch soon!"
      );
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
      onShowAlert("error", "An error occurred while submitting the form.");
    }
  };
                                    
  function onShowAlert(type, text) {
    clearTimeout(alert.timeoutId); // Clear any existing timeout
    const timeoutId = setTimeout(() => {
      setAlert({
        type: "",
        text: "",
        show: false,
        timeoutId: null,
      });
    }, 10000);
 
    setAlert({
      type: type,
      text: text,
      show: true,
      timeoutId: timeoutId,
    });
  }

  const handleChange = (event) => {
    const selectedExpertise = event.target.value;
    if (selectedExpertise.length <= 4) {
      setExpertise(selectedExpertise);
    }
  };

  const onCloseAlert = () => {
    clearTimeout(alert.timeoutId); // Clear any existing timeout
    setAlert({
      type: "",
      text: "",
      show: false,
      timeoutId: null,
    });
  };

  const currentorga = (e) => {
    setCurrentorganisation(e.target.value);
  };

  const role = (e) => {
    setCurrentrole(e.target.value);
  };

  const expdetails = (e) => {
    setExperiencedetail(e.target.value);
  };

  const achie = (e) => {
    setAchievements(e.target.value);
  };

  const handleIM = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <>
      <React.Fragment>
        <PageBanner
          pageTitle="Become a Mentor"
          homePageUrl="/"
          homePageText="Home"
          activePageText="Become a Mentor"
        />

        <div className={style.mainform}>
          <div className="row">
            <div className={`col-lg-12 col-md-12 ${style.userCard}`}>
              <div className={style.userWrapper}>
                {/* <div className={style.userImage}>
                  {userImage ? (
                    <img
                      src={userImage}
                      alt="User Image"
                      height="200px"
                      width="400px"
                    />
                  ) : (
                    <div className={style.loadingImage}></div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className={`${style.formContent} ${style.shadow}`}>
                <h3>Apply as Mentor</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Your Name"
                      required
                      value={user.name}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <InputLabel id="expertise-label">
                      Expertise: (select any 4)
                    </InputLabel>
                    <FormControl
                      sx={{ m: 1, minWidth: 160 }}
                      size="small"
                    >
                      <InputLabel id="mentorship-domain-label">
                        Expertise
                      </InputLabel>
                      <Select
                        labelId="expertise-label"
                        id="expertise"
                        multiple
                        value={expertise}
                        label="Expertise"
                        onChange={handleChange}
                        renderValue={(selected) =>
                          selected.length === 0
                            ? "Select expertise"
                            : selected.join(", ")
                        }
                        MenuProps={MenuProps}
                        input={<OutlinedInput label="Expertise" />}
                      >
                        {expertiseOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            <Checkbox
                              checked={expertise.indexOf(option) > -1}
                            />
                            <ListItemText primary={option} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form-group">
                    <label htmlFor="motivation">Current Role:</label>
                    <input
                      type="text"
                      name="motivation"
                      id="motivation"
                      className="form-control"
                      placeholder="Current Role"
                      required
                      value={currentrole}
                      onChange={role}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="currentOrg">
                      Current Organisation:
                    </label>
                    <input
                      type="text"
                      name="currentOrg"
                      id="currentOrg"
                      className="form-control"
                      placeholder="Current Organisation"
                      required
                      onChange={currentorga}
                    />
                  </div>

                  <label htmlFor="experienceDetails">
                    Years of experience:
                  </label>
                  <div className="form-group">
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      size="small"
                    >
                      <InputLabel id="work-experience-label">
                        Years
                      </InputLabel>
                      <Select
                        labelId="work-experience-label"
                        id="work-experience"
                        value={experience}
                        label="Years of Work Experience"
                        onChange={(e) => setExperience(e.target.value)}
                      >
                        <MenuItem value="0-3">0 - 3 years</MenuItem>
                        <MenuItem value="4-7">4 - 7 years</MenuItem>
                        <MenuItem value="8-12">8 - 12 years</MenuItem>
                        <MenuItem value="13-16">13 - 16 years</MenuItem>
                        <MenuItem value="17-20">17 - 20 years</MenuItem>
                        <MenuItem value="20+">20+ years</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experienceDetails">
                      Experience details:
                    </label>
                    <textarea
                      name="experienceDetails"
                      id="experienceDetails"
                      className="form-control"
                      placeholder="Experience in details"
                      required
                      value={experiencedetail}
                      onChange={expdetails}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="achievements">
                      Achievements / Notable accomplishments:
                    </label>
                    <textarea
                      name="achievements"
                      id="achievements"
                      className="form-control"
                      placeholder="Achievements / Notable accomplishments"
                      required
                      value={achievements}
                      onChange={achie}
                    />
                  </div>

                  <label>Upload an image for your Profile:</label>
                  <input type="file" onChange={handleIM} />

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
                              "/user/mentorship/T&Cmentor",
                              "_blank"
                            );
                          }
                        }}
                      />
                      <span className={style.termsText}>
                        I agree to the{" "}
                        <Link href="/user/mentorship/T&Cmentor">
                          <a target="_blank" rel="noopener noreferrer">
                            Terms & Conditions
                          </a>
                        </Link>
                      </span>
                    </label>
                  </div>

                  <div className={style.submitButtonContainer}>
                    <button
                      type="submit"
                      className={`btn btn-primary ${style.submitButton}`}
                      disabled={loading}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Alert
          type={alert.type}
          text={alert.text}
          show={alert.show}
          onClosePress={onCloseAlert}
        />
      </React.Fragment>
    </>
  );
};

export default Mentorapplication;
