import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Footer from "../components/Footer";
import FrameComponent4 from "../components/FrameComponent4";
import "./OwnerViewProfile.css";
import axios from "axios";

const OwnerViewProfile = () => {
  // Assuming you have owner details stored in state
  const [ownerDetails, setOwnerDetails] = useState({
    Username: "",
    Merchantname: "",
    Email: "",
    Phone: "",
    StreetAddress: "",
    Restaurant_id: 0,
  });

  // State to manage the visibility of owner details
  const [showDetails, setShowDetails] = useState(true);

  // Function to fetch owner details, you may need to implement it according to your backend logic
  useEffect(() => {
    const fetchOwnerDetails = async (e) => {
      try {
        const merchant_email = localStorage.getItem("email");
        const response = await axios.get(
          `http://localhost:8080/merchant/${merchant_email}`
        );

        const {
          username,
          merchantname,
          email,
          phone,
          streetAddress,
          restaurant_id,
        } = response.data;

        setOwnerDetails({
          Username: username,
          Merchantname: merchantname,
          Email: email,
          Phone: phone,
          StreetAddress: streetAddress,
          Restaurant_id: restaurant_id,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchOwnerDetails();
  }, []);

  // Function to toggle the visibility of owner details
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="register-as-store-owner17">
      <section className="store-registration17">
        <div className="subtract-button-parent17">
          <FrameComponent4 />
          <div className="business-registration-parent17">
            <header className="business-registration17">
              <h2 className="register-business17">Business Profile</h2>
            </header>
            <div className="owner-details-box17">
              {/* Owner Details */}
              <div className="owner-details-content17">
                <h2 className="owner-details17">Owner Details</h2>
                <div
                  style={{
                    display: showDetails ? "block" : "none",
                    fontSize: "24px",
                  }}
                >
                  <p>
                    <strong>Restaurant ID:</strong> {ownerDetails.Restaurant_id}
                  </p>
                  <p>
                    <strong>Username:</strong> {ownerDetails.Username}
                  </p>
                  <p>
                    <strong>Business Name:</strong> {ownerDetails.Merchantname}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {ownerDetails.Phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {ownerDetails.Email}
                  </p>
                  <p>
                    <strong>Street Address:</strong>{" "}
                    {ownerDetails.StreetAddress}
                  </p>
                </div>
              </div>
              {/* End Owner Details */}
            </div>
            {/* Toggle button */}
            <div className="toggle-details-button17">
              <Button
                className="sign-in317"
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
                onClick={toggleDetails}
              >
                {showDetails ? "Hide Details" : "Show Details"}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer propHeight="20.9px" propHeight1="24px" />
    </div>
  );
};

export default OwnerViewProfile;
