import { useMemo } from "react";
import "./FrameComponent2.css";
import { Link, useNavigate } from "react-router-dom";

// Nearby Restaurants on Homepage
const FrameComponent2 = ({
  rectangle26,
  notYourMothersFalafel,
  faasosWrapsRolls,
  prop,
  mins,
  rating,
  cost,
  propAlignSelf,
  propWidth,
  propPadding,
  propAlignSelf1,
  propHeight,
  propMinWidth,
  propMinWidth1,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
      padding: propPadding,
    };
  }, [propAlignSelf, propWidth, propPadding]);

  const notYourMothersStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
      height: propHeight,
    };
  }, [propAlignSelf1, propHeight]);

  const faasosWrapsStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const div2Style = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  const navigate = useNavigate();

  const handleFrameClick = () => {
    navigate(
      `/searched-results?query=${encodeURIComponent(notYourMothersFalafel)}`
    );
  };

  return (
    <div className="link" onClick={handleFrameClick}>
      <div className="rectangle-container" style={frameDivStyle}>
        <img className="frame-child1" alt="" src={rectangle26} />
        <div className="not-your-mothers" style={notYourMothersStyle}>
          {notYourMothersFalafel}
        </div>
        <div className="faasos-wraps-rolls-wrapper">
          <div className="faasos-wraps" style={faasosWrapsStyle}>
            {faasosWrapsRolls}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
