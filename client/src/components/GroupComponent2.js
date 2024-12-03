import {
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
} from "@mui/material";
import "./GroupComponent2.css";
import React, { useState } from "react";

// Used for Redirect Page
const GroupComponent2 = ({onSortChange}) => {
  const [deliverySelected, setDeliverySelected] = useState(false);
  const [pickupSelected, setPickupSelected] = useState(false);
  const [uberEatsSelected, setUberEatsSelected] = useState(false);
  const [doordashSelected, setDoordashSelected] = useState(false);
  const [postmatesSelected, setPostmatesSelected] = useState(false);
  const [grubhubSelected, setGrubhubSelected] = useState(false);
  const [noneSelected, setNoneSelected] = useState(false);

  const handleDeliveryClick = () => {
    setDeliverySelected(!deliverySelected);
  };
  const handlePickupClick = () => {
    setPickupSelected(!pickupSelected);
  };
  const handleUberEatsClick = () => {
    setUberEatsSelected(!uberEatsSelected);
  };
  const handleDoordashClick = () => {
    setDoordashSelected(!doordashSelected);
  };
  const handlePostmatesClick = () => {
    setPostmatesSelected(!postmatesSelected);
  };
  const handleGrubhubClick = () => {
    setGrubhubSelected(!grubhubSelected);
  };
  const handleNoneClick = () => {
    setNoneSelected(!noneSelected);
  };
  const defaultRating = localStorage.getItem("starRating");

  const [selectedValue, setSelectedValue] = useState("searchedRestaurant"); // State to hold the selected value

  // Function to handle change in the Select component
  const handleSelectChange = (event) => {
    const option = event.target.value;
    setSelectedValue(option); // Update the selected value in state
    onSortChange(option);
  };
  
  return (
    <div className="rectangle-groups">
      <div className="rectangle-divs" />
      <div className="frame-wrapper3s">
        <div className="cart-size-affectss">
          Filter
        </div>
        <div className="form-control-wrapper">
          <FormControl
            className="drop-down-boxs"
            variant="standard"
            sx={{
              borderColor: "#8a8a8a",
              borderStyle: "SOLID",
              borderTopWidth: "2px",
              borderRightWidth: "2px",
              borderBottomWidth: "2px",
              borderLeftWidth: "2px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              width: "72.36842105263158%",
              height: "48px",
              m: 0,
              p: 0,
              "& .MuiInputBase-root": {
                m: 0,
                p: 0,
                minHeight: "48px",
                justifyContent: "center",
                display: "inline-flex",
              },
              "& .MuiInputLabel-root": {
                m: 0,
                p: 0,
                minHeight: "48px",
                display: "inline-flex",
              },
              "& .MuiMenuItem-root": {
                m: 0,
                p: 0,
                height: "48px",
                display: "inline-flex",
              },
              "& .MuiSelect-select": {
                m: 0,
                p: 0,
                height: "48px",
                alignItems: "center",
                display: "inline-flex",
              },
              "& .MuiInput-input": { m: 0, p: 0 },
              "& .MuiInputBase-input": {
                color: "#737373",
                fontSize: 16,
                fontWeight: "Regular",
                fontFamily: "Roboto",
                textAlign: "left",
                p: "0 !important",
                marginLeft: "16px",
              },
            }}
          >
            <InputLabel color="secondary" />
            <Select
              value={selectedValue}
              onChange={handleSelectChange}
              color="secondary"
              disableUnderline
              displayEmpty
              IconComponent={() => (
                <img
                  width="24px"
                  height="24px"
                  src="/caret_down.png"
                  style={{ marginRight: "8px" }}
                  alt="Dropdown Icon"
                />
              )}
            >
              <MenuItem value="searchedRestaurant">Searched Restaurant</MenuItem>
              <MenuItem value="lowToHigh">Fee Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Fee Price: High to Low</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default GroupComponent2;
