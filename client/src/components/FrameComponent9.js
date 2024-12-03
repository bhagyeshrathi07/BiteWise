import { useMemo } from "react";
import "./FrameComponent9.css";
import "@lottiefiles/lottie-player";

// Used for Uber Eats Label + Compare Prices
const FrameComponent9 = ({ grubHub, group, prop, min, propPadding, url }) => {;

  const navigateCheckout = async () => {
    try {
      const response = await fetch(url);
      if(response) {
        const redirectURL = await response.text();
        window.location.href = redirectURL;
      }
      else {
        throw new Error("Error placing order")
      }
    } catch(error) {
      console.log('Error rerouting to outside service: ', error)
    }
  };
  const frameDivStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div className="frame-outside" style={frameDivStyle}>
      <div className="frame-parentz1">
        <div className="frame-parentz2">
          <div className="grubhub-parent2">
            <h3 className="grubhub-name">{grubHub}</h3>
            <div className="alternative-methods">
              <img className="group-icon1" alt="" src={group} />
            </div>
          </div>
          <div className="frame-parentz3">
            <div className="parent-fee">
              <div className="div1">{prop}</div>
              <div className="est-fee1">Est. Fee</div>
            </div>
            <div className="min-parent">
              <div className="min1">{min}</div>
              <div className="est-time1">Est. Time</div>
            </div>
          </div>
        </div>
        <div className="confirm-step-button">
          <button className="place-order-container" onClick={navigateCheckout}>
            <div className="place-order1">Place Order</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent9;
