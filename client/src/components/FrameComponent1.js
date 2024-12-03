import React, { useState, useEffect } from "react";
import axios from "axios";
import FrameComponent3 from "./FrameComponent3";
import FrameComponent2 from "./FrameComponent2";
import "./FrameComponent1.css";

// In App Restaurants on Home Page JS
const FrameComponent1 = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get("http://localhost:8080/search-query");
        console.log(response.data);
        setMerchants(response.data.merchantNames);
      } catch (error) {
        console.error("Error fetching merchants:", error);
      }
    };

    fetchMerchants();
  }, []);

  if (merchants.length === 0) {
    return <div>Loading...</div>;
  }

  const uniqueInAppMerchants = {};

  let count = 0;
  for (const merchant of merchants) {
    if (!uniqueInAppMerchants[merchant.merchantname]) {
      uniqueInAppMerchants[merchant.merchantname] = merchant;
      count++;
    }
    if (count === 4) {
      break;
    }
  }

  return (
    <section className="homepage-inner">
      <div className="frame-parent7">
        <div className="nearby-restaurants-parent">
          <h3 className="nearby-restaurants">In App Restaurants</h3>
          <div className="group-div">
            <div className="frame-parent8">
              {Object.entries(uniqueInAppMerchants).map(([key, merchant]) => (
                <div className="frame-component-container" key={key}>
                  <FrameComponent3
                    rectangle26="/rectangle-26@2x.png"
                    davidAndEmilysPatisserie={merchant.merchantname}
                    frenchPatisserie={merchant.category}
                    restaurantId={merchant.restaurant_id}
                    prop="4.2"
                    mins="15 mins"
                    prop1="$$"
                    offer="15% off"
                    imgSrc={merchant && merchant.logo_url}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="recommended-food-items-parent">
          <h3 className="recommended-food-items">Nearby Restaurants</h3>
          <div className="group-div">
            <div className="frame-parent12">
              <FrameComponent2
                rectangle26="/rectangle-26-3@2x22.png"
                notYourMothersFalafel="Kovai Cafe"
                faasosWrapsRolls={`indian`}
                prop="$10 off"
                mins="20 Mins"
                rating="4.1"
                cost="$$"
              />
              <FrameComponent2
                rectangle26="/rectangle-26-4@2x2.png"
                notYourMothersFalafel="Mountain Mike's"
                faasosWrapsRolls={`Pizza`}
                prop="15% off"
                mins="20 Mins"
                rating="4.0"
                cost="$$"
              />
            </div>
            <div className="frame-parent13">
              <FrameComponent2
                rectangle26="/rectangle-26-5@2x2.png"
                notYourMothersFalafel="La Victoria Taqueria"
                faasosWrapsRolls="mexican"
                prop="5% off"
                mins="25 Mins"
                rating="4.3"
                cost="$$"
              />
              <FrameComponent2
                rectangle26="/rectangle-26-6@2x2.png"
                notYourMothersFalafel="Boba Loca"
                faasosWrapsRolls="Drinks"
                prop="$5 off"
                mins="15 Mins"
                rating="3.8"
                cost="$$"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent1;
