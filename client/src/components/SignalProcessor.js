import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import "./SignalProcessor.css";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Used for Homepage
const SignalProcessor = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate()
  const handleSearch = async () => {
    navigate(`/searched-results?query=${encodeURIComponent(searchInput)}`);
  };
  return (
    <section className="signal-processor">
      <div className="frame-parent3">
        <div className="frame-parent4">
          <div className="rectangle-parent">
            <div className="rectangle-div" />
            <h1 className="say-goodbye-to-container">
              <p className="say-goodbye-to">Say goodbye to</p>
              <p className="overpaying-for">overpaying for your</p>
              <p className="favorite-meals">{`favorite meals `}</p>
            </h1>
          </div>
          <div className="discover-the-tastiest-deals-wi-wrapper">
            <div className="discover-the-tastiest">
              Discover the tastiest deals with BiteWise! Let us do the legwork -
              from DoorDash to Uber Eats, we compare rates so you can savor
              every bite without breaking the bank. Join BiteWise today and
              feast smarter!
            </div>
          </div>
          <div className="frame-wrapper">
            <div className="frame-parent5">
              <TextField // Text field to type search
                className="frame-textfield"
                placeholder="Enter an item or restaurant"
                variant="outlined"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} // Add an onChange handler to update searchInput
                sx={{
                  "& fieldset": { borderColor: "#808080" },
                  "& .MuiInputBase-root": {
                    height: "49px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    fontSize: "14px",
                  },
                  "& .MuiInputBase-input": { color: "#808080" },
                }}
              />
              <Button // Search button
                className="sign-in5"
                disableElevation={true}
                variant="contained"
                onClick={handleSearch}
                sx={{
                  textTransform: "none",
                  color: "#fdfbfa",
                  fontSize: "14",
                  background: "#202020",
                  borderRadius: "10px",
                  "&:hover": { background: "#202020" },
                  width: 129,
                  height: 49,
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="find-meals-near-your-area-wrapper">
            <div className="find-meals-near">Find meals near your area</div>
          </div>
        </div>
        <div className="frame-wrapper1">
          <div className="wrapper-image-3-parent">
            <div className="wrapper-image-3">
              <img
                className="image-3-icon"
                loading="lazy"
                alt=""
                src="/image-3@2x.png"
              />
            </div>
            <div className="frame-wrapper2">
              <div className="union-parent">
                <img className="union-icon1" alt="" src="/union-1@2x.png" />
                <div className="wrapper-image-4">
                  <img className="image-4-icon" alt="" src="/image-4@2x.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="signal-processor-inner">
        <div className="san-jose-parent">
          <div className="san-jose">San Jose</div>
          <div className="seattle">Seattle</div>
          <div className="los-angeles">Los Angeles</div>
          <div className="atlanta">Atlanta</div>
          <div className="phoenix">Phoenix</div>
          <div className="new-york">New York</div>
          <div className="and-more">and more!</div>
        </div>
      </div>
    </section>
  );
};

export default SignalProcessor;
