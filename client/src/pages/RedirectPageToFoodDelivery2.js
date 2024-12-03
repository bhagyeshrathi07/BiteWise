import FrameComponent4 from "../components/FrameComponent4";
import GroupComponent2 from "../components/GroupComponent2";
import FrameComponent6a from "../components/FrameComponent6a";
import "./RedirectPageToFoodDelivery.css";
import { generateUniqueArray } from "../components/getDeliveryData"

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSearchParams } from "react-router-dom";

const RedirectPageToFoodDelivery2 = () => {
  const [searchedParams, setSearchParams] = useSearchParams();
  const [searchedRestuarants, setSearchResults] = useState([]);
  console.log("Clicked Restuarant: ", searchedParams.get("merchant"))
  const [offAppRest] = useState([]) // change the sorting of this based on filter options
  const [prices] = useState([])
  const [sortedArray, setSortedArray] = useState([]); // State for sortedArray
  const [sortedPrices, setSortedPrices] = useState([]); // State for sortedPrices

  const determineSorting = (option) => {
    switch (option) {
      case "searchedRestaurant":
        setSortedArray([...offAppRest]); // Update sortedArray state
        setSortedPrices([...prices]); // Update sortedPrices state
        break;
      case "lowToHigh":
        const sortedByMinPrice = [...offAppRest].sort((a, b) => {
          const minPriceA = Math.min(...prices[offAppRest.indexOf(a)]);
          const minPriceB = Math.min(...prices[offAppRest.indexOf(b)]);
          return minPriceA - minPriceB;
        });
        const sortedPricesByMinPrice = [...prices].sort((a, b) => {
          const minPriceA = Math.min(...a);
          const minPriceB = Math.min(...b);
          return minPriceA - minPriceB;
        });
        setSortedArray(sortedByMinPrice);
        setSortedPrices(sortedPricesByMinPrice);
        break;
      case "highToLow":
        const sortedByMaxPrice = [...offAppRest].sort((a, b) => {
          const maxPriceA = Math.max(...prices[offAppRest.indexOf(a)]);
          const maxPriceB = Math.max(...prices[offAppRest.indexOf(b)]);
          return maxPriceA - maxPriceB;
        });
        const sortedPricesByMaxPrice = [...prices].sort((a, b) => {
          const maxPriceA = Math.max(...a);
          const maxPriceB = Math.max(...b);
          return maxPriceA - maxPriceB;
        });
        setSortedArray(sortedByMaxPrice);
        setSortedPrices(sortedPricesByMaxPrice);
        break;
      default:
        break;
    }
  }

  // Fetch Search results based on searchQuery
  useEffect(() => {
    const searchQuery = searchedParams.get("merchant")
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/checkout-merchants', {
          params: {
            query: searchQuery}, // Bobs Burgers
        });
        setSearchResults(response.data)
        response.data.forEach(item => {
          if(!item.in_App) {
            offAppRest.push(item)
            prices.push(generateUniqueArray(item.restaurant_id))
          }
        })
        setSortedArray([...offAppRest]);
        setSortedPrices([...prices]);
      } catch (error) {
          console.error('Error sending search request:', error);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchedParams, offAppRest, prices])

  return (
    <div className="redirect-page-to-food-deliverys">
      <FrameComponent4 />
      <div className="redirect-header-frame">
        <header className="redirect-header">
          <h3 className="view1">Compare Prices</h3>
        </header>
      </div>
      <section className="frame-parents-compare-prices">
        <div className="frame-groups">
          <GroupComponent2 onSortChange={determineSorting} />
          <div className="frame-list">
            {searchedRestuarants && sortedArray && sortedArray.map((rest, index) => (
              <FrameComponent6a 
                key={index}
                id={rest.restaurant_id} 
                name={rest.merchantname}
                circleImage={rest.logo_url}
                distance="2.95 mi"
                rating="/group-98.png"
                price="/group-95.png"
                features={[rest.category]}
                icon="/pickup-black.png"
                deliveryFees={sortedPrices[index]}
                estimatedTime="15 min"
              />
            ))}
          </div>
        </div>
      </section>
      <div className="view-more-button-wrappers">
        <h2 className="view-more-buttons">End of Results</h2>
      </div>
    </div>
  );
};

export default RedirectPageToFoodDelivery2;
