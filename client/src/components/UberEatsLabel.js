import PostmatesLogo from "./PostmatesLogo";
import FrameComponent9 from "./FrameComponent9";
import "./UberEatsLabel.css";
import React, { useState, useEffect } from "react";
import "@lottiefiles/lottie-player";
import axios from "axios";
import { generateUniqueArray } from "../components/getDeliveryData";

// Used for view all deals page
const UberEatsLabel = ({ merchantID }) => {
  const [merchant, setMerchant] = useState();
  const [prices, setPrices] = useState();

  const [routing, setRouting] = useState([
    "UberEats-",
    "Grubhub-",
    "Doordash-",
    "Postmates-",
  ]);
  const [serviceName, setServiceNames] = useState([
    "Uber Eats",
    "Grubhub",
    "Doordash",
    "Postmates",
  ]);

  // Create a custom comparator function

  const compareServices = (a, b) => {
    // Find the index of a and b in the serviceName array
    const indexA = serviceName.indexOf(a);
    const indexB = serviceName.indexOf(b);

    // Compare prices based on the index
    return prices[indexA] - prices[indexB];
  };

  const compareRoutes = (a, b) => {
    // Find the index of a and b in the serviceName array
    const indexA = routing.indexOf(a);
    const indexB = routing.indexOf(b);

    // Compare prices based on the index
    return prices[indexA] - prices[indexB];
  };

  const navigateCheckout = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/place_order/${routing[0]}${
          merchant && merchant.merchantname
        }`
      );
      if (response) {
        const redirectURL = await response.text();
        window.location.href = redirectURL;
      } else {
        throw new Error("Error placing order");
      }
    } catch (error) {
      console.log("Error rerouting to outside service: ", error);
    }
  };

  useEffect(() => {
    const runCompare = (priced, merchanted) => {
      if (priced && merchanted) {
        setServiceNames(serviceName.sort(compareServices));
        setRouting(routing.sort(compareRoutes));
        setPrices(prices.sort((a, b) => a - b));
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-merchant", {
          params: {
            query: merchantID,
          },
        });
        setMerchant(response.data);
        setPrices(generateUniqueArray(response.data.restaurant_id));

        // Sort the serviceName array using the custom comparator function
        runCompare(prices, merchant);
      } catch (error) {
        console.log("Error fetching merchant data: ", error);
      }
    };
    if (merchantID) {
      fetchData();
    }
  }, [merchantID, serviceName, prices, routing]);

  return (
    <div className="uber-eats-label">
      <div className="rectangle-parentz">
        <div className="frame-child" />
        <div className="place-order-button">
          <div className="switch-to-pickup-label">
            <div className="chow-now-label">
              <div className="est-fee-and-time-container">
                <div className="deliverycom-label">
                  <img
                    className="deliverycom-label-child"
                    loading="lazy"
                    alt=""
                    src={merchant && merchant.logo_url}
                  />
                </div>
                <div className="david-and-emilys-patisserie-parent">
                  <h3 className="david-and-emilys">
                    {merchant && merchant.merchantname}
                  </h3>
                  <div className="first-child-container">
                    <div className="third-child-container">
                      {merchant && merchant.streetAddress},{" "}
                      {merchant && merchant.city}
                      <div className="third-child-container-item">
                        {merchant && merchant.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              href={`/redirect-page-to-food-delivery-app?merchant=${
                merchant && merchant.restaurant_id
              }`}
              className="pickup-page-link"
            >
              <img
                className="switch-to-pickup-label-child"
                loading="lazy"
                alt=""
                src="/group-124.png"
              />
            </a>
          </div>
        </div>
        <div className="eighth-child-container">
          <img
            className="delivery-service-line"
            loading="lazy"
            alt=""
            src="/line-7.png"
          />
          <div className="ninth-child-container">
            <div className="tenth-child-container">
              <div className="eleventh-child-container">
                <div className="twelfth-child-container">
                  <div className="seventeenth-child-container">
                    <img
                      className="group-icon2"
                      loading="lazy"
                      alt=""
                      src="/pickup-black.png"
                    />
                    <div className="nineteenth-child-container">
                      <h1 className="uber-eats">
                        {merchant && serviceName[0]}
                      </h1>
                      <div className="twenty-first-child-container">
                        <h3 className="best-deal">Best Deal</h3>
                      </div>
                    </div>
                  </div>
                  <div className="thirteenth-child-container">
                    <div className="fourteen-child-container">
                      <div className="fifteenth-child-container">
                        ${merchant && prices[0]}
                      </div>
                    </div>
                    <div className="est-fee2">Est. Fee</div>
                  </div>
                  <div className="thirteenth-child-container1">
                    <div className="min-wrapper">
                      <div className="min2">15 min</div>
                    </div>
                    <div className="est-time2">Est. Time</div>
                  </div>
                </div>
              </div>
              <div className="place-order-btn-parent">
                <button className="place-order-btn" onClick={navigateCheckout}>
                  <div className="place-order2">Place Order</div>
                </button>
                {/* <div className="pickup-option-btn">
                  <div className="switch-to-pickup">Switch to Pickup</div>
                </div> */}
                <img
                  className="delivery-service-line"
                  loading="lazy"
                  alt=""
                  src="/line-7.png"
                />
              </div>
            </div>
          </div>
          <PostmatesLogo
            postmates={merchant && serviceName[1]}
            group="/pickup-black.png"
            sVG="/pickup2.png"
            prop={merchant && `$${prices[1]}`}
            min="17 min"
            url={`http://localhost:8080/place_order/${routing[1]}${
              merchant && merchant.merchantname
            }`}
          />
          <img
            className="delivery-service-line"
            loading="lazy"
            alt=""
            src="/line-7.png"
          />
          <FrameComponent9
            grubHub={merchant && serviceName[2]}
            group="/pickup-black.png"
            prop={merchant && `$${prices[2]}`}
            min="20 min"
            url={`http://localhost:8080/place_order/${routing[2]}${
              merchant && merchant.merchantname
            }`}
          />
          <img
            className="delivery-service-line"
            loading="lazy"
            alt=""
            src="/line-7.png"
          />
          <FrameComponent9
            grubHub={merchant && serviceName[3]}
            group="/pickup-black.png"
            prop={merchant && `$${prices[3]}`}
            min="35 min"
            propPadding="0px var(--padding-12xl) 0px var(--padding-19xl)"
            url={`http://localhost:8080/place_order/${routing[3]}${
              merchant && merchant.merchantname
            }`}
          />
          <img
            className="delivery-service-line"
            loading="lazy"
            alt=""
            src="/line-7.png"
          />
        </div>
      </div>
    </div>
  );
};

export default UberEatsLabel;
