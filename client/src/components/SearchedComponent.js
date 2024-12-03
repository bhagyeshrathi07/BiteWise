import { useMemo } from "react";
import "./SearchedComponent.css";
import { Navigate } from "react-router-dom";

const SearchedComponent = ({
  image,
  itemName,
  restaurantName,
  deal,
  mins,
  propAlignSelf,
  propWidth,
  propPadding,
  propAlignSelf1,
  propHeight,
  propMinWidth,
  propMinWidth1,
  onClicked
}) => {
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

  return (
    <div className="search-container" onClick={onClicked}>
      <div className="search-container2">
        <img className="frame-search-image" alt="" src={image} />
        <div className="search-container-inner">
          <div className="search-name" style={notYourMothersStyle}>
            {itemName}
          </div>
          <div className="search-wrapper">
            <div className="search-item" style={faasosWrapsStyle}>
              {restaurantName}
            </div>
          </div>
          <div className="search-parent2">
            <div className="search-d">
              <img
                className="data-aggregator-icon"
                alt=""
                src="/vector-10.svg"
              />
              <div className="deal2" style={div2Style}>
                {deal}
              </div>
            </div>
            <div className="group-group">
              <img className="group-icon1" alt="" src="/group.svg" />
              <div className="mins2">{mins}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedComponent;
