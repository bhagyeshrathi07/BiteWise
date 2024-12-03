import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import FrameComponent4 from "../components/FrameComponent4";
import React, { useState, useEffect } from "react";
import "./RegisterAsStoreOwner.css";
import axios from "axios";

const OwnerEditMenuItem = () => {
  const { restaurantId, itemId } = useParams();
  const [ownerDetails, setOwnerDetails] = useState([]);

  const item_info = JSON.parse(localStorage.getItem("item_info"));
  const [updatedItemDetails, setUpdatedItemDetails] = useState({
    newName: item_info.name,
    newPrice: item_info.price,
    newDescription: item_info.description,
    newCategory: item_info.category,
  });

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const { newName, newPrice, newDescription, newCategory } =
      updatedItemDetails;

    if(validPrice(updatedItemDetails.newPrice) != ""){
      return ;
    }
    
    try {
      const response = await axios.put(
        `http://localhost:8080/menu/update/${restaurantId}/${itemId}`,
        {
          name: newName,
          price: newPrice,
          description: newDescription,
          category: newCategory,
        }
      );
      const updatedItem = response.data;

      setOwnerDetails([...ownerDetails, updatedItem]);

      console.log("Data updated:", updatedItem);
      window.location.href = `/owner-edit-menu`;
    } catch (error) {
      console.error("Error updating menu items:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItemDetails({
      ...updatedItemDetails,
      [name]: value,
    });
  };

  const validPrice = (field) => {
    // phone validation
    let phoneValid = field.match(/^\d+(\.\d{1,2})?$/);
    if (!phoneValid) {
      return "Numerical input only!";
    } else {
      return "";
    }
  };


  return (
    <div className="register-as-store-owner">
      <section className="store-registration">
        <div className="subtract-button-parent">
          <FrameComponent4 />
          <div className="business-registration-parent">
            <header className="business-registration">
              <h2 className="register-business">Edit Item</h2>
            </header>
            <div className="phone-number-input">
              <form className="state-zipcode-fields" onSubmit={handleUpdateItem}>
                <div className="state-input">
                  <div className="zipcode-input">
                    <div className="email-input-field">
                      <h2 className="add-business">Item</h2>
                    </div>
                    <div className="frame-container">
                      <TextField
                        className="frame-item"
                        placeholder="Item Name"
                        variant="outlined"
                        required
                        name="newName"
                        value={updatedItemDetails.newName}
                        onChange={handleInputChange}
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
                        placeholder="Price"
                        variant="outlined"
                        required
                        name="newPrice"
                        value={updatedItemDetails.newPrice}
                        error={validPrice(updatedItemDetails.newPrice)}
                        helperText={validPrice(updatedItemDetails.newPrice)}
                        onChange={handleInputChange}
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
                      className="city-input2"
                      placeholder="Description"
                      variant="outlined"
                      required
                      name="newDescription"
                      value={updatedItemDetails.newDescription}
                      onChange={handleInputChange}
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "200px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          fontSize: "14px",
                        },
                        "& .MuiInputBase-input": { color: "#808080" },
                      }}
                    />
                    <TextField
                      className="city-input2"
                      placeholder="Category"
                      variant="outlined"
                      required
                      name="newCategory"
                      value={updatedItemDetails.newCategory}
                      onChange={handleInputChange}
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "200px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          fontSize: "14px",
                        },
                        "& .MuiInputBase-input": { color: "#808080" },
                      }}
                    />
                  </div>
                </div>
                <div className="sign-in-wrapper">
                  <Button
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
                    type='submit'
                  >
                    Update
                  </Button>
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

export default OwnerEditMenuItem;
