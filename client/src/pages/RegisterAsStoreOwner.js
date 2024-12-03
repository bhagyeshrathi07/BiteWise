import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import Axios
import "./RegisterAsStoreOwner.css";
import FrameComponent4 from "../components/FrameComponent4";

const RegisterAsStoreOwner = () => {
  const [formData, setFormData] = useState({
    merchantname: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    category: "",
    logo_url: "",
    in_App: true,
    username: "",
    email: "",
    password: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const validateInputs = () => {
    if((validEmail(formData.email) != "") ||
      (validPassword(formData.password) != "") ||
     (validPhone(formData.phone) != "") ||
     (validUsername(formData.username) != "")||
      (validateAddress(formData.streetAddress)  != "") ||
      (validateCity(formData.city)  != "") ||
      (validateFName(formData.merchantname)  != "") ||
      (validateState(formData.state)  != "") ||
      (validateZipCode(formData.zipCode)  != "") ||
      (validateFName(formData.category)  != "")
    ) {
      return true;
    } else {
      return false;
    }
  }

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
    if (!emailValid && (field != "")) {
      return "Invalid email address!";
    } else {
      return "";
    }
  };

  const validPhone = (field) => {
    // phone validation
    let phoneValid = field.match(/^[0-9]{10}$/);
    if (!phoneValid) {
      return "Must be 10 digits, excluding dashes and spaces.";
    } else {
      return "";
    }
  };

  const validUsername = (field) => {
    // username validation
    let usernameValid = field.match(/^[a-zA-Z0-9]+$/);
    if (!usernameValid && (field != "")) {
      return "The username must contain at least one of each a-z, A-Z, and 0-9. It cannot contain any special characters.";
    } else return "";
  };

  const validateFName = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "This field can only contain letters!";
    else return "";
  };

  const validateCity = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "City can only contain letters!";
    else return "";
  };

  const validateState = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "State can only contain letters!";
    else return "";
  };

  const validateLName = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "Last Name can only contain letters (a-z A-Z) only!";
    else return "";
  };

  const validateAddress = (field) => {
    if (/[^a-zA-Z0-9\s#]+/.test(field))
      return "Address can only contain letters or numbers!";
    else return "";
  };

  const validateZipCode = (field) => {
    if (/[^0-9-\s]+/.test(field))
      return "Zip Code can only contain numbers!";
    else return "";
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
    
    if(!validateInputs) return ;

    setFormSubmitted(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/merchant/register",
        formData
      );
      console.log("Signup Successful:", response.data);
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

  const navigate = useNavigate();
  const onSignInClick = () => {
    navigate("/login");
  };

  const onCartClick = () => {
    navigate("/cart");
  };

  const onLogoContainerClick = () => {
    navigate("/");
  };

  return (
    <div className="register-as-store-owner">
      <section className="store-registration">
        <div className="subtract-button-parent">
          <FrameComponent4 />
          <div className="redirect-header-frame">
            <header className="redirect-header">
              <h3 className="cart1">Register Business</h3>
            </header>
          </div>
          <div className="business-registration-parent">
            <div className="phone-number-input">
              <form className="state-zipcode-fields" onSubmit={handleSubmit}>
                <div className="state-zipcode-fields-child" />
                <div className="state-zipcode-fields-item" />
                <div className="state-zipcode-fields-inner" />
                <div className="state-input">
                  <div className="zipcode-input">
                    <div className="email-input-field">
                      <h2 className="add-business">Add Business</h2>
                    </div>
                    <div className="frame-container">
                      <TextField
                        className="frame-child-name"
                        placeholder="Business Name"
                        onChange={handleChange}
                        name="merchantname"
                        error={validateFName(formData.merchantname)}
                        helperText={validateFName(formData.merchantname)}
                        value={formData.merchantname}
                        variant="outlined"
                        required
                        sx={{
                          "& fieldset": { borderColor: "#1ac84b" },
                          "& .MuiInputBase-root": {
                            height: "47px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            fontSize: "14px",
                          },
                          "& .MuiInputBase-input": { color: "#808080" },
                        }}
                      />
                      <TextField
                        className="frame-item"
                        placeholder="Business Phone Number"
                        name="phone"
                        onChange={handleChange}
                        value={formData.phone}
                        error={validPhone(formData.phone)}
                        helperText={validPhone(formData.phone)}
                        variant="outlined"
                        required
                        sx={{
                          "& fieldset": { borderColor: "#1ac84b" },
                          "& .MuiInputBase-root": {
                            height: "49px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            fontSize: "14px",
                          },
                          "& .MuiInputBase-input": { color: "#808080" },
                        }}
                      />
                    </div>
                    <TextField
                      className="city-input"
                      placeholder="Street Address"
                      name="streetAddress"
                      onChange={handleChange}
                      required
                      value={formData.streetAddress}
                      error={validateAddress(formData.streetAddress)}
                      helperText={validateAddress(formData.streetAddress)}
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "47px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          fontSize: "14px",
                        },
                        "& .MuiInputBase-input": { color: "#808080" },
                      }}
                    />
                    <div className="calorie-calculator-label">
                      <div className="blog-label">
                        <TextField
                          className="subtract-icon2"
                          placeholder="City"
                          name="city"
                          required
                          onChange={handleChange}
                          error={validateCity(formData.city)}
                          helperText={validateCity(formData.city)}
                          variant="outlined"
                          value={formData.city}
                          sx={{
                            "& fieldset": { borderColor: "#1ac84b" },
                            "& .MuiInputBase-root": {
                              height: "47px",
                              backgroundColor: "#fff",
                              borderRadius: "10px",
                              fontSize: "14px",
                            },
                            "& .MuiInputBase-input": { color: "#808080" },
                          }}
                        />
                      </div>
                      <TextField
                        className="delivery-info-label"
                        placeholder="State"
                        name="state"
                        required
                        onChange={handleChange}
                        error={validateState(formData.state)}
                        helperText={validateState(formData.state)}
                        variant="outlined"
                        value={formData.state}
                        sx={{
                          "& fieldset": { borderColor: "#1ac84b" },
                          "& .MuiInputBase-root": {
                            height: "47px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            fontSize: "14px",
                          },
                          "& .MuiInputBase-input": { color: "#808080" },
                          width: "173px",
                        }}
                      />
                      <TextField
                        className="delivery-info-label1"
                        placeholder="Zip code"
                        name="zipCode"
                        required
                        onChange={handleChange}
                        variant="outlined"
                        error={validateZipCode(formData.zipCode)}
                        helperText={validateZipCode(formData.zipCode)}
                        value={formData.zipCode}
                        sx={{
                          "& fieldset": { borderColor: "#1ac84b" },
                          "& .MuiInputBase-root": {
                            height: "47px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            fontSize: "14px",
                          },
                          "& .MuiInputBase-input": { color: "#808080" },
                          width: "173px",
                        }}
                      />
                    </div>
                    <TextField
                      className="city-input1"
                      placeholder="Category"
                      name="category"
                      required
                      onChange={handleChange}
                      variant="outlined"
                      error={validateFName(formData.category)}
                      helperText={validateFName(formData.category)}
                      value={formData.category}
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "47px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          fontSize: "14px",
                        },
                        "& .MuiInputBase-input": { color: "#808080" },
                        marginBottom: "20px",
                      }}
                    />
                    <TextField
                      className="city-input1"
                      placeholder="Logo Image URL"
                      name="logo_url"
                      required
                      onChange={handleChange}
                      variant="outlined"
                      value={formData.logo_url}
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "47px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          fontSize: "14px",
                        },
                        "& .MuiInputBase-input": { color: "#808080" },
                      }}
                    />
                  </div>
                </div>
                <div className="frame-divv">
                  <div className="frame-parent12">
                    <div className="owner-details-wrapper">
                      <h2 className="owner-details">Owner Details</h2>
                    </div>
                    <div className="last-name-input">
                      <TextField
                        className="phone-number-input1"
                        placeholder="First Name"
                        name="firstname"
                        required
                        onChange={handleChange}
                        variant="outlined"
                        value={formData.firstname}
                        sx={{
                          "& fieldset": { borderColor: "#1ac84b" },
                          "& .MuiInputBase-root": {
                            height: "47px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            fontSize: "14px",
                          },
                          "& .MuiInputBase-input": { color: "#808080" },
                        }}
                      />
                      <TextField
                        className="last-name-input-child"
                        placeholder="Last Name"
                        required
                        name="lastname"
                        onChange={handleChange}
                        variant="outlined"
                        value={formData.lastname}
                        sx={{
                          "& fieldset": { borderColor: "#1ac84b" },
                          "& .MuiInputBase-root": {
                            height: "49px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            fontSize: "14px",
                          },
                          "& .MuiInputBase-input": { color: "#808080" },
                        }}
                      />
                    </div>
                  </div>
                  <div className="phone-number-email-parent">
                    <TextField
                      className="phone-number-email"
                      placeholder="Username"
                      name="username"
                      required
                      onChange={handleChange}
                      error={validUsername(formData.username)}
                      helperText={validUsername(formData.username)}
                      value={formData.username}
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "54px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          fontSize: "14px",
                        },
                        "& .MuiInputBase-input": { color: "#808080" },
                      }}
                    />
                    <TextField
                      className="phone-number-email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      required
                      error={validEmail(formData.email)}
                      helperText={validEmail(formData.email)}
                      value={formData.email}
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "54px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          fontSize: "14px",
                        },
                        "& .MuiInputBase-input": { color: "#808080" },
                      }}
                    />
                    <TextField
                      className="phone-number-email1"
                      placeholder="Password"
                      variant="outlined"
                      required
                      onChange={handleChange}
                      name="password"
                      type="password"
                      error={validPassword(formData.password)}
                      helperText={validPassword(formData.password)}
                      value={formData.password}
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "54px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          fontSize: "14px",
                        },
                        "& .MuiInputBase-input": { color: "#808080" },
                      }}
                    />
                  </div>
                  <div className="sign-in-wrapper">
                    <Button
                      type="submit"
                      className="sign-in3"
                      disableElevation={true}
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        color: "#fff",
                        fontSize: "14",
                        background: "#2f7c31",
                        borderRadius: "10px",
                        "&:hover": { background: "#2f7c31" },
                        width: 143,
                        height: 49,
                      }}
                    >
                      Add Business
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer propHeight="20.9px" propHeight1="24px" />
    </div>
  );
};

export default RegisterAsStoreOwner;
