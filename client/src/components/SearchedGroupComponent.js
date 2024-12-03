import React, { useState, useEffect } from "react";
import SearchedComponent from "./SearchedComponent";
import Button from "@mui/material/Button";
import "./SearchedGroupComponent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchedGroupComponent = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState({
    merchants: [],
    foods: [],
    merchantNames: [],
  });
  const [selectedButton, setSelectedButton] = useState("Restaurants");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  const navigate = useNavigate();

  // Fetch Search results based on searchQuery
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/search-query", {
          params: {
            query: searchQuery,
          }, // Bobs Burgers
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error sending search request:", error);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <section className="homepage-child">
      <div className="frame-parent14">
        <div className="personalized-recommendations-parent">
          <h3 className="personalized-recommendations">
            Search results for "{searchQuery}"
          </h3>
          <div className="search-result-buttons">
            <Button
              variant="contained"
              className="search-result-button"
              style={{
                backgroundColor:
                  selectedButton === "Items" ? "#307651" : "transparent",
                color: selectedButton === "Items" ? "white" : "black",
              }}
              onClick={() => setSelectedButton("Items")}
            >
              Items
            </Button>
            <Button
              variant="contained"
              className="search-result-button"
              style={{
                backgroundColor:
                  selectedButton === "Restaurants" ? "#307651" : "transparent",
                color: selectedButton === "Restaurants" ? "white" : "black",
              }}
              onClick={() => setSelectedButton("Restaurants")}
            >
              Restaurants
            </Button>
          </div>
          <div className="searched-group-component">
            {selectedButton === "Restaurants" && searchResults.merchants && searchResults.merchants.map((result) => (
              <SearchedComponent
                image={result.logo_url} // TODO: change to result.logo_url
                itemName={result.merchantname}
                restaurantName={`${result.city}, ${result.state}`}
                deal={result.category}
                mins={result.in_App ? "BiteWise" : "Off Site"} // Conditionally set the text based on result.inApp
                propAlignSelf="unset"
                propWidth="307px"
                propPadding="36px 27px 25px"
                propAlignSelf1="stretch"
                propHeight="unset"
                propMinWidth="unset"
                propMinWidth1="50px"
                onClicked={() => {
                  if(result.in_App) {
                    navigate(`/food-item-page?merchant=${result.restaurant_id}`)
                  }
                  else {
                    navigate(`/redirect-page-to-food-delivery-app?merchant=${result.restaurant_id}`);
                  }
                }}
              />
            ))}
            {selectedButton === "Items" && searchResults.foods && searchResults.merchantNames && searchResults.foods.map((result, index) => (
              <SearchedComponent
                image={searchResults.merchantNames[index].logo_url} // TODO: change to searchResults.merchantNames[index].logo_url
                itemName={result.name}
                restaurantName={searchResults.merchantNames[index].merchantname}
                deal={searchResults.merchantNames[index].category}
                mins={searchResults.merchantNames[index].in_App ? "BiteWise" : "Off Site"}
                propAlignSelf="unset"
                propWidth="307px"
                propPadding="36px 27px 25px"
                propAlignSelf1="stretch"
                propHeight="unset"
                propMinWidth="unset"
                propMinWidth1="50px"
                onClicked={() => {
                  if(searchResults.merchantNames[index].in_App) {
                    navigate(`/food-item-page?merchant=${searchResults.merchantNames[index].restaurant_id}`)
                  }
                  else {
                    navigate(`/redirect-page-to-food-delivery-app?merchant=${searchResults.merchantNames[index].restaurant_id}`);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchedGroupComponent;
