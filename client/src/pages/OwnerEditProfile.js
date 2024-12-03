import { TextField, Button } from "@mui/material";
import Footer from "../components/Footer";
import FrameComponent4 from "../components/FrameComponent4";
import "./RegisterAsStoreOwner.css";
import "./OwnerEditProfile.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const OwnerEditProfile = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [name, setItemName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [mcity, setMCity] = useState("");
  const [mstate, setMState] = useState("");
  const [mzipCode, setMZip] = useState("");
  const [mcategory, setMCategory] = useState("");
  const [memail, setMEmail] = useState("");

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
      return "Must be 10 digits, excluding dashes and spaces.";
    } else {
      return "";
    }
  };

  const validateCity = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "City can contain a-z and A-Z only!";
    else return "";
  };

  const validateState = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "State can contain a-z and A-Z only!";
    else return "";
  };

  const validateAddress = (field) => {
    if (/[^a-zA-Z0-9\s#]+/.test(field))
      return "Address can only contain letters (a-z A-Z) or numbers only!";
    else return "";
  };

  const validateZipCode = (field) => {
    if (/[^0-9-\s]+/.test(field))
      return "Zip Code can only contain numbers only!";
    else return "";
  };

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setMCategory(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };
  const handleCityChange = (event) => {
    setMCity(event.target.value);
  };
  const handleStateChange = (event) => {
    setMState(event.target.value);
  };
  const handleZipChange = (event) => {
    setMZip(event.target.value);
  };
  const handleEmailChange = (event) => {
    setMEmail(event.target.value);
  };

  const handleEditClick = async (e) => {
    e.preventDefault();

    if((validEmail(memail) != "") ||
      (validPhone(phone) != "") ||
      (validateAddress(street) != "") ||
      (validateCity(mcity) != "") ||
      (validateState(mstate) != "") ||
      (validateZipCode(mzipCode) != "")
    ) {
      return ; // will not submit if input is wrong for edit
    }
    try {
      const restaurant_id = localStorage.getItem("restaurant_id");
      await axios.put(
        `http://localhost:8080/merchant/updateInfo/${restaurant_id}`,
        {
          merchantname: name,
          phone: phone,
          streetAddress: street,
          city: mcity,
          state: mstate,
          zipCode: mzipCode,
          category: mcategory,
          email: memail,
        }
      );
      navigate("/owner-dashboard");
    } catch (error) {
      console.log(error);
    }

    return true;
  };

  const handleCloseClick = async () => {
    try {
      const restaurant_id = localStorage.getItem("restaurant_id");
      await axios.delete(
        `http://localhost:8080/menu/removeAll/${restaurant_id}`
      );
      await axios.delete(
        `http://localhost:8080/merchant/remove/${restaurant_id}`
      );
      setOpenSnackbar(true);

      localStorage.removeItem("username");
      localStorage.removeItem("restaurant_id");
      localStorage.removeItem("email");
      localStorage.removeItem("isOwner");
      localStorage.removeItem("isLoggedIn");

      Cookies.remove("jwt");

      navigate("/login");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  useEffect(() => {
    async function getOwnerProfile() {
      try {
        const merchant_email = localStorage.getItem("email");
        const response = await axios.get(
          `http://localhost:8080/merchant/${merchant_email}`
        );

        const {
          merchantname,
          city,
          state,
          zipCode,
          email,
          phone,
          category,
          streetAddress,
        } = response.data;

        console.log(response.data);

        setItemName(merchantname);
        setPhone(phone);
        setStreet(streetAddress);
        setMCity(city);
        setMState(state);
        setMZip(zipCode);
        setMCategory(category);
        setMEmail(email);
      } catch (error) {
        console.error(error);
      }
    }

    getOwnerProfile();
  }, []);
  return (
    <div className="register-as-store-owner">
      <section className="store-registration">
        <div className="subtract-button-parent">
          <FrameComponent4 />
          <div className="business-registration-parent">
            <header className="business-registration">
              <h2 className="register-business">Business Profile</h2>
            </header>
            <div className="phone-number-input">
              <form className="state-zipcode-fields" onSubmit={handleEditClick}>
                <div className="state-zipcode-fields-child" />
                <div className="state-zipcode-fields-item" />
                <div className="state-zipcode-fields-inner" />
                <div className="state-input">
                  <div className="zipcode-input">
                    {/* <div className="delete-button">
                      <Button
                        className="delete"
                        disableElevation={true}
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          width: 143,
                          height: 49,
                          borderRadius: "10px",
                        }}
                      >
                        Close Business
                      </Button>
                    </div> */}
                    <div className="email-input-field">
                      <h2 className="add-business">Business Details</h2>
                    </div>

                    <div className="frame-container">
                      <TextField
                        className="frame-child-name"
                        placeholder="Business Name"
                        value={name}
                        required
                        onChange={handleNameChange}
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
                      <TextField
                        className="frame-item"
                        placeholder="Business Phone Number"
                        value={phone}
                        required
                        error={validPhone(phone)}
                        helperText={validPhone(phone)}
                        onChange={handlePhoneChange}
                        variant="outlined"
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
                      value={street}
                      required
                      error={validateAddress(street)}
                      helperText={validateAddress(street)}
                      onChange={handleStreetChange}
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
                          value={mcity}
                          required
                          error={validateCity(mcity)}
                          helperText={validateCity(mcity)}
                          onChange={handleCityChange}
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
                      </div>
                      <TextField
                        className="delivery-info-label"
                        placeholder="State"
                        value={mstate}
                        required
                        error={validateState(mstate)}
                        helperText={validateState(mstate)}
                        onChange={handleStateChange}
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
                          width: "173px",
                        }}
                      />
                      <TextField
                        className="delivery-info-label1"
                        placeholder="Zip code"
                        value={mzipCode}
                        required
                        onChange={handleZipChange}
                        error={validateZipCode(mzipCode)}
                        helperText={validateZipCode(mzipCode)}
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
                          width: "173px",
                        }}
                      />
                    </div>
                    <TextField
                      className="city-input1"
                      placeholder="Category"
                      value={mcategory}
                      required
                      onChange={handleCategoryChange}
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
                        marginTop: '15px'
                      }}
                    />
                    <TextField
                      className="phone-number-email1"
                      placeholder="Email"
                      value={memail}
                      required
                      error={validEmail(memail)}
                      helperText={validEmail(memail)}
                      onChange={handleEmailChange}
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
                        marginTop: '15px'
                      }}
                    />
                  </div>
                </div>
                <div className="frame-divv">
                  <div className="frame-parent12"></div>
                  <div className="phone-number-email-parent"></div>
                  <div className="sign-in-wrapper">
                    <Button
                      className="sign-in3"
                      disableElevation={true}
                      variant="contained"
                      type="submit"
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
                      Update
                    </Button>
                    <Button
                      className="sign-in3"
                      disableElevation={true}
                      variant="contained"
                      onClick={handleCloseClick}
                      sx={{
                        textTransform: "none",
                        color: "#fff",
                        fontSize: "14",
                        background: "#c62828",
                        borderRadius: "10px",
                        margin: "0 0 0 30px",
                        "&:hover": { background: "#c62828" },
                        width: 143,
                        height: 49,
                      }}
                    >
                      Close Business
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

export default OwnerEditProfile;
