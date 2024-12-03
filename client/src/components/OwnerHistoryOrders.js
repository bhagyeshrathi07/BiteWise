import React from "react";
import "./OwnerHistoryOrders.css";

// Order History Component for Owner
const OwnerHistoryOrders = ({ orders }) => {
  return (
    <div className="history-orders">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Customer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerHistoryOrders;
