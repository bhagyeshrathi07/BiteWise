import FrameComponent4 from "../components/FrameComponent4";
import SignalProcessor from "../components/SignalProcessor";
import FrameComponent1 from "../components/FrameComponent1";
import Footer from "../components/Footer";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <img className="union-icon" loading="lazy" alt="" src="/union@2x.png" />
      <FrameComponent4 />
      <SignalProcessor />
      <FrameComponent1 />
      <Footer />
    </div>
  );
};

export default Homepage;