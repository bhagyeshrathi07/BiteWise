import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Snackbar,
  Button,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./FrameComponent4.css";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";


// Header
const FrameComponent4 = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isMerchant = localStorage.getItem("isOwner");

  const onSignInClick = () => {
    navigate("/login");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onLogoutClick = async () => {
    try {
      const response = await axios.get("http://localhost:8080/logout");
      console.log("Login Successful:", response.data);
      setOpenSnackbar(true);

      if (isMerchant === 'false') {
        localStorage.removeItem("username");
      } else {
        localStorage.removeItem("restaurant_id");
        localStorage.removeItem("email");
      }
      localStorage.removeItem("isOwner");
      localStorage.removeItem("isLoggedIn");

      Cookies.remove("jwt"); // Remove jwt cookie
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  const onLogoContainerClick = () => {
    navigate("/");
  };

  const [searchInput, setSearchInput] = useState("");
  const handleSearch = async () => {
    navigate(`/searched-results?query=${encodeURIComponent(searchInput)}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="condition-branch-wrapper">
      <div className="condition-branch">
        <img className="logo-icon" loading="lazy" alt="" src="/logo@2x.png" />
        <div className="frame-parent2">
          <TextField
            className="frame-inner"
            placeholder="Enter item or restaurant you are looking for"
            onChange={(e) => setSearchInput(e.target.value)} // Add an onChange handler to update searchInput
            onKeyUp={handleKeyPress} // Add onKeyPress event handler
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
          <div className="bag2">
            <Link to="/cart">
              <img className="vector-icon1" alt="" src="/bag.png" />
            </Link>
          </div>
          <div className="sign-in4-container">
            {isLoggedIn && ( // Conditional rendering based on isLoggedIn state
              <Button
                onClick={() => {
                  isMerchant === "true"
                    ? navigate("/owner-dashboard")
                    : navigate("/user-dashboard");
                }}
                sx={{
                  marginRight: "12px",
                  marginLeft: "-22px",
                  marginTop: "0px",
                }}
              >
                <img
                  alt=""
                  src="/owner-dash.png"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </Button>
            )}
            {isLoggedIn ? ( // Conditional rendering based on isLoggedIn state
              <Button
                className="sign-in4"
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
                onClick={onLogoutClick} // Call onLogoutClick function for logout
              >
                Logout
              </Button>
            ) : (
              <Button
                className="sign-in4"
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
                onClick={onSignInClick}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
        <img
          className="image-1-icon"
          alt=""
          src="/image-1@2x.png"
          onClick={onLogoContainerClick}
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={isLoggedIn ? "Login Successful." : "Logout Successful"}
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
    </header>
  );
};

export default FrameComponent4;
