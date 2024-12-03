import { useMemo } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";


const Footer = ({ propHeight, propHeight1 }) => {

  const frameDiv1Style = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  const dataAggregatorStyle = useMemo(() => {
    return {
      height: propHeight1,
    };
  }, [propHeight1]);
  
  const navigate = useNavigate();

  const onLogoContainerClick = () => {
    navigate("/");
  };

  return (
    <footer className="footer">
      <div className="frame-parent17">
        <div className="frame-parent18">
        </div>
        <img 
            className="image-1-icon" 
            alt="" 
            src="/image-2@2x.png" 
            onClick={onLogoContainerClick}
        />
      </div>
    </footer>
  );
};

export default Footer;
