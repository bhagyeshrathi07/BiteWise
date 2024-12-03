import { TextField, Button, Snackbar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import Footer from "../components/Footer";
import GoogleSignIn from "../pages/googleSignIn";
import "./Register.css";
import Cookies from "js-cookie";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbars
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("jwt"));
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validPassword = (field) => {
    let hasSixChar = field.length >= 6;
    let hasLowerChar = /(.*[a-z].*)/.test(field);
    let hasUpperChar = /(.*[A-Z].*)/.test(field);
    let hasNumber = /(.*[0-9].*)/.test(field);
    let hasSpecialChar = /[^A-Za-z0-9]/.test(field);
    if (
      !hasSixChar ||
      !hasLowerChar ||
      !hasUpperChar ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      return "The password must have: at least 6 characters and include at least one each: a-z, A-Z, 0-9, and special characters.";
    } else return "";
  };

  const validEmail = (field) => {
    // email validation
    let emailValid = field.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid) {
      return "Invalid email address!";
    } else {
      return "";
    }
  };

  const validPhone = (field) => {
    // phone validation
    let phoneValid = field.match(/^[0-9]{10}$/);
    if (!phoneValid) {
      return "Invalid phone number! Please enter the number without dashes (-) and spaces.";
    } else {
      return "";
    }
  };

  const validUsername = (field) => {
    // username validation
    let usernameValid = field.match(/^[a-zA-Z0-9]+$/);
    if (!usernameValid) {
      return "The username must contain at least one of each a-z, A-Z, and 0-9. It cannot contain any special characters.";
    } else return "";
  };

  const validateFName = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "First Name can only contain letters (a-z A-Z) only!";
    else return "";
  };

  const validateLName = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "Last Name can only contain letters (a-z A-Z) only!";
    else return "";
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSignInSuccess = (response) => {
    axios
      .post("http://localhost:8080/googleSuccessfullSignIn", response)
      .then((responseFromBackend) => {
        console.log("Login Successful:", responseFromBackend);
        // Set the JWT token in the browser's cookies
        document.cookie = Cookies.set("jwt", responseFromBackend.data.jwt);
        setOpenSnackbar(true); // Open Snackbar on successful registration
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Signup Failed:", error);
        if (error.response) {
          console.error("Response Data:", error.response.data);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if((validEmail(formData.email) !== "") ||
      (validPassword(formData.password) !== "") ||
      (validPhone(formData.phone) !== "") ||
      (validUsername(formData.username) !== "") ||
      (validateFName(formData.firstname)!== "") ||
      (validateLName(formData.lastname) !== "")){
        return ;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        formData
      );
      console.log("Signup Successful:", response.data);
      setOpenSnackbar(true); // Open Snackbar on successful registration
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after a delay
      }, 2000);
    } catch (error) {
      console.error("Signup Failed:", error);

      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
    }
  };

  const onLogoContainerClick = () => {
    navigate("/");
  };

  const onAlreadyHaveAnClick = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <section className="register-inner">
        <div className="frame-parent">
          <div className="frame-group">
            <div className="logo-wrapper">
              <div className="logo">
                <h2 className="bitewise">BiteWise</h2>
                <img
                  className="subtract-icon"
                  loading="lazy"
                  alt=""
                  src="/subtract1.svg"
                />
              </div>
            </div>
            <div className="first-name-field">
              <TextField
                className="last-name-field"
                placeholder="Enter item or restaurant you are looking for"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <img width="19px" height="19px" src="/vector.svg" />
                  ),
                }}
                sx={{
                  "& fieldset": { borderColor: "#808080" },
                  "& .MuiInputBase-root": {
                    height: "49px",
                    backgroundColor: "#fff",
                    paddingRight: "25px",
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input": { color: "#808080" },
                }}
              />
              <div className="sign-in-instance">
                <div className="bag">
                  <img
                    className="calorie-info-icon"
                    alt=""
                    src="/vector-1.svg"
                  />
                  <div className="delivery-info" />
                </div>
              </div>
              <div className="sign-in-button" onClick={onAlreadyHaveAnClick}>
                <Button
                  className="sign-in"
                  disableElevation={true}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#fdfbfa",
                    fontSize: "14",
                    background: "#202020",
                    borderRadius: "10px",
                    "&:hover": { background: "#202020" },
                    width: 96,
                    height: 49,
                  }}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <img
              className="image-1-icon"
              alt=""
              src="/image-1@2x.png"
              onClick={onLogoContainerClick}
            />
          </div>
          <div className="first-parent">
            <header className="register-wrapper">
              <h3 className="register1">Register</h3>
            </header>
            <div className="phone-number-label">
              <form className="email-label2" onSubmit={handleSubmit}>
                <div className="email-label-child" />
                <div className="password-label">
                  <div className="confirm-password-label">
                    <h3 className="create-your-account">Create Your Account</h3>
                  </div>
                  <div className="register-button">
                    <div className="first-name-parent">
                      <TextField
                        className="first-name"
                        name="firstname"
                        value={formData.firstname}
                        placeholder="First Name"
                        required
                        error={
                          formSubmitted &&
                          validateFName(formData.firstname) != ""
                        }
                        helperText={
                          formSubmitted ? validateFName(formData.firstname) : ""
                        }
                        onChange={handleChange}
                        variant="outlined"
                        sx={{
                          "& fieldset": { borderColor: "#1ac84b" },
                          "& .MuiInputBase-root": {
                            height: "54px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                          },
                          "& .MuiInputBase-input": { color: "#808080" },
                        }}
                      />
                      <TextField
                        className="last-name"
                        name="lastname"
                        value={formData.lastname}
                        required
                        placeholder="Last Name"
                        error={
                          formSubmitted &&
                          validateLName(formData.lastname) != ""
                        }
                        helperText={
                          formSubmitted ? validateLName(formData.lastname) : ""
                        }
                        onChange={handleChange}
                        variant="outlined"
                        sx={{
                          "& fieldset": { borderColor: "#1ac84b" },
                          "& .MuiInputBase-root": {
                            height: "54px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                          },
                          "& .MuiInputBase-input": { color: "#808080" },
                        }}
                      />
                    </div>
                    <div class="other-info">
                      <div className="phone-number-wrapper">
                        <TextField
                          className="phone-number"
                          placeholder="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          error={
                            formSubmitted && validPhone(formData.phone) != ""
                          }
                          helperText={
                            formSubmitted ? validPhone(formData.phone) : ""
                          }
                          variant="outlined"
                          sx={{
                            "& fieldset": { borderColor: "#1ac84b" },
                            "& .MuiInputBase-root": {
                              width: "650px",
                              height: "54px",
                              backgroundColor: "#fff",
                              borderRadius: "10px",
                            },
                            "& .MuiInputBase-input": { color: "#808080" },
                          }}
                        />
                      </div>
                      <div className="phone-number-wrapper">
                        <TextField
                          className="phone-number1"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          required
                          error={
                            formSubmitted && validEmail(formData.email) != ""
                          }
                          helperText={
                            formSubmitted ? validEmail(formData.email) : ""
                          }
                          onChange={handleChange}
                          variant="outlined"
                          sx={{
                            "& fieldset": { borderColor: "#1ac84b" },
                            "& .MuiInputBase-root": {
                              height: "54px",
                              backgroundColor: "#fff",
                              borderRadius: "10px",
                            },
                            "& .MuiInputBase-input": { color: "#808080" },
                          }}
                        />
                      </div>
                      <div className="phone-number-wrapper">
                        <TextField
                          className="phone-number2"
                          name="username"
                          value={formData.username}
                          placeholder="Username"
                          error={
                            formSubmitted &&
                            validUsername(formData.username) != ""
                          }
                          helperText={
                            formSubmitted
                              ? validUsername(formData.username)
                              : ""
                          }
                          onChange={handleChange}
                          variant="outlined"
                          sx={{
                            "& fieldset": { borderColor: "#1ac84b" },
                            "& .MuiInputBase-root": {
                              height: "54px",
                              backgroundColor: "#fff",
                              borderRadius: "10px",
                            },
                            "& .MuiInputBase-input": { color: "#808080" },
                          }}
                        />
                      </div>
                      <div className="phone-number-wrapper">
                        <TextField
                          className="phone-number3"
                          name="password"
                          value={formData.password}
                          placeholder="Password"
                          type="password"
                          onChange={handleChange}
                          error={
                            formSubmitted &&
                            validPassword(formData.password) != ""
                          }
                          helperText={
                            formSubmitted
                              ? validPassword(formData.password)
                              : ""
                          }
                          variant="outlined"
                          sx={{
                            "& fieldset": { borderColor: "#1ac84b" },
                            "& .MuiInputBase-root": {
                              width: "650px",
                              height: "54px",
                              backgroundColor: "#fff",
                              borderRadius: "10px",
                            },
                            "& .MuiInputBase-input": { color: "#808080" },
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className="already-have-an-container"
                      onClick={onAlreadyHaveAnClick}
                    >
                      {`Already have an account? `}
                      <span className="sign-in-here">Sign In Here</span>
                    </div>
                  </div>
                </div>
                <div className="sign-in-parent">
                  <div /*onClick = {onLogoContainerClick}*/>
                    <Button
                      type="submit"
                      className="sign-in1"
                      disableElevation={true}
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        color: "#fff",
                        fontSize: "14",
                        background: "#307651",
                        borderRadius: "10px",
                        "&:hover": { background: "#307651" },
                        width: 103,
                        height: 49,
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
                <div className="google-sign-in">
                  <GoogleSignIn onGoogleSignInSuccess={handleSignInSuccess} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer propHeight="20.9px" propHeight1="24px" />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Registration successful!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            X
          </IconButton>
        }
      />
    </div>
  );
};

export default Register;
