import React, { useState, useEffect } from "react";
import OwnerIncomingOrders from "../components/OwnerIncomingOrders";
import OwnerHistoryOrders from "../components/OwnerHistoryOrders";
import Footer from "../components/Footer";
import FrameComponent4 from "../components/FrameComponent4";
import "./OwnerOrders.css";
import axios from "axios"; // Import Axios


const OwnerOrders = () => {
  // Hard-coded incoming and history orders for testing
  const [incomingOrders, setIncomingOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const restId = localStorage.getItem("restaurant_id");
        const response = await axios.get(`http://localhost:8080/orders/${restId}`)
        const orders = response.data.orders.map(order => ({
          id: order._id,
          orderNumber: order.orderNumber.toString(),
          date: new Date(order.createdAt).toLocaleDateString(),
          time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          orderItems: order.items.map(item => ({
            name: item.name, // Assuming item name is available in your data
            quantity: item.quantity // Assuming item quantity is available in your data
          })),
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1) // Capitalize status
        }));
        setIncomingOrders(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []); // Empty dependency array to run effect only once


  const [historyOrders, setHistoryOrders] = useState([]);

  useEffect(() => {
    console.log("Fetching orders...");
    const fetchOrders = async () => {
      try {
        const restId = localStorage.getItem("restaurant_id");
        const response = await axios.get(`http://localhost:8080/orders/history/${restId}`);
        const orders = response.data.orders.map(order => ({
          id: order._id,
          orderNumber: order.orderNumber.toString(),
          date: new Date(order.createdAt).toLocaleDateString(),
          time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          customerName: order.username,
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1) // Capitalize status
        }));
        setHistoryOrders(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to run effect only once

  const handleAcceptOrder = async (orderId) => {
    try {
      console.log("Accepting order:", orderId);
      // Make PUT request to update order status to 'Accepted'
      await axios.put(`http://localhost:8080/orders/accept/${orderId}`);
      // If the request is successful, update the order status locally
      setIncomingOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderNumber === orderId ? { ...order, status: "Accepted" } : order
        )
      );
      // Reload the database table by fetching updated orders
      window.location.reload();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      console.log("Rejecting order:", orderId);
      // Make PUT request to update order status to 'Rejected'
      await axios.put(`http://localhost:8080/orders/reject/${orderId}`);
      // If the request is successful, update the order status locally
      setIncomingOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderNumber === orderId ? { ...order, status: "Rejected" } : order
        )
      );
      // Reload the database table by fetching updated orders
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      console.log("Completing order:", orderId);
      // Make PUT request to update order status to 'Rejected'
      await axios.put(`http://localhost:8080/orders/complete/${orderId}`);
      // If the request is successful, update the order status locally
      setIncomingOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderNumber === orderId ? { ...order, status: "Completed" } : order
        )
      );
      // Reload the database table by fetching updated orders
      window.location.reload();
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return (
    <div className="owner-orders">
      <FrameComponent4 />
      <div className="incoming-orders-frame">
        <header className="incoming-wrapper">
          <h3 className="incoming1">Orders</h3>
        </header>
        <div className="incoming-order-cards">
          <div className="section-header">
            <img alt="" src="/incoming.png" className="icon" />
            <h3>Incoming</h3>
          </div>
          <OwnerIncomingOrders
            orders={incomingOrders}
            onAccept={handleAcceptOrder}
            onReject={handleRejectOrder}
            onComplete={handleCompleteOrder}
          />
        </div>
      </div>
      <div className="history-orders-frame">
        <div className="history-orders">
          <div className="section-header">
            <img alt="" src="/history.png" className="icon" />
            <h3>History</h3>
          </div>
          <OwnerHistoryOrders orders={historyOrders} />
        </div>
      </div>
      <Footer propHeight="20.9px" propHeight1="24px" />
    </div>
  );
};

export default OwnerOrders;
