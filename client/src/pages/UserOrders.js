import React, { useEffect, useState } from "react";
import UserHistoryOrders from "../components/UserHistoryOrders";
import Footer from "../components/Footer";
import FrameComponent4 from "../components/FrameComponent4";
import "./UserOrders.css";
import axios from "axios";

const UserOrders = () => {
  // Hard-coded history orders for testing

  const [historyOrders, setHistoryOrders] = useState([]);
  const username = localStorage.getItem("username")

  useEffect( () => {
    const fetchData = async () => {
      try{
        const response = await axios.get("http://localhost:8080/get-orders", {
          params: {
            query: localStorage.getItem("username")}
          });
        if(response) {
          console.log("History Orders:", response.data);
          setHistoryOrders(response.data)
        }
      } catch(error) {
        console.error("Failed getting Menu Items:", error);
      }
    }
    if(username) {
      fetchData()
    }
  }, [username]);

  return (
    <div className="owner-orders">
      <FrameComponent4 />
      <div className="history-orders-frame">
        <div className="history-orders">
          <div className="section-header">
            <img alt="" src="/history.png" className="icon" />
            <h3>History</h3>
          </div>
          <div className="contain">
            <UserHistoryOrders orders={historyOrders} />
          </div>
        </div>
      </div>
      <div className="footer-div">
        <Footer propHeight="20.9px" propHeight1="24px" />
      </div>
    </div>
  );
};

export default UserOrders;
