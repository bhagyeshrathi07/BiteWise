import React from "react";
import { Link } from "react-router-dom";
import "./OwnerDashboardComponent.css";

// Owner Dashboard Options
const OwnerDashboardComponent = ({ ownerDetails }) => {
  return (
    <div className="owner-dashboard">
      <div className="dashboard-options">
        <Link to="/owner-orders" className="dashboard-option">
          <div className="option-content">
            <img alt="" src="/orders.png" className="icon" />
            <h3>Orders</h3>
          </div>
        </Link>
        <Link
          to={{ pathname: "/owner-edit-menu", state: { ownerDetails } }}
          className="dashboard-option"
        >
          <div className="option-content">
            <img alt="" src="/edit-menu.png" className="icon" />
            <h3>Edit Menu</h3>
          </div>
        </Link>
        <Link to="/owner-edit-profile" className="dashboard-option">
          <div className="option-content">
            <img alt="" src="/edit-profile.png" className="icon" />
            <h3>Edit Business Profile</h3>
          </div>
        </Link>
        <Link to="/owner-view-profile" className="dashboard-option">
          <div className="option-content">
            <img alt="" src="/view-profile.png" className="icon" />
            <h3>View Business Profile</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OwnerDashboardComponent;
