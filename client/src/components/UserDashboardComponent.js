import React from "react";
import { Link } from "react-router-dom";
import "./OwnerDashboardComponent.css";

// User Dashboard Options
const UserDashboardComponent = () => {
  return (
    <div className="owner-dashboard">
      <div className="dashboard-options">
        <Link to="/user-orders" className="dashboard-option">
          <div className="option-content">
            <img alt="" src="/orders.png" className="icon" />
            <h3>Orders</h3>
          </div>
        </Link>
        <Link to="/user-view-profile" className="dashboard-option">
          <div className="option-content">
            <img alt="" src="/view-profile.png" className="icon" />
            <h3>View Profile</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboardComponent;
