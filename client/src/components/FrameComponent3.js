import { useMemo } from "react";
import { Link } from "react-router-dom";
import "./FrameComponent3.css";

// Used for In App Restaurants on Home Page
const FrameComponent3 = ({
  rectangle26,
  davidAndEmilysPatisserie,
  frenchPatisserie,
  restaurantId,
  prop,
  mins,
  prop1,
  propWidth,
  propMinWidth,
  propTextTransform,
  propMinWidth1,
  offer,
  imgSrc,
}) => {
  const rectangleIconStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const frenchPatisserieStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const divStyle = useMemo(() => {
    return {
      textTransform: propTextTransform,
    };
  }, [propTextTransform]);

  const div1Style = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  return (
    <Link
      to={{
        pathname: "/food-item-page",
        search: `?merchant=${encodeURIComponent(restaurantId)}`,
      }}
      state={{
        restaurantName: davidAndEmilysPatisserie,
        restaurantId: restaurantId,
        restaurantInfo: {
          rectangle26,
          davidAndEmilysPatisserie,
          frenchPatisserie,
          restaurantId,
          prop,
          mins,
          prop1,
          propWidth,
          propMinWidth,
          propTextTransform,
          propMinWidth1,
          offer,
          imgSrc,
        },
      }}
      className="link"
    >
      <div className="frame-wrapper3">
        <div className="rectangle-group">
          <img
            className="rectangle-icon"
            loading="lazy"
            alt=""
            src={imgSrc}
            style={rectangleIconStyle}
          />
          <div className="david-and-emilys">{davidAndEmilysPatisserie}</div>
          <div className="data-aggregator">
            <div className="french-patisserie" style={frenchPatisserieStyle}>
              {frenchPatisserie}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FrameComponent3;
