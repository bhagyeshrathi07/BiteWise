import FrameComponent4 from "../components/FrameComponent4";
import UberEatsLabel from "../components/UberEatsLabel";
import "./ViewAllDeals.css";
import { useSearchParams } from "react-router-dom";

const ViewAllDeals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("Searched: ", searchParams.get("merchant"));

  return (
    <div className="view-all-deals">
      <FrameComponent4 />
      <div className="view-all-deals-frame">
        <header className="view-all-deals-header">
          <h3 className="view1">View All Deals</h3>
        </header>
      </div>
      <UberEatsLabel merchantID={searchParams.get("merchant")}/>
    </div>
  );
};

export default ViewAllDeals;
