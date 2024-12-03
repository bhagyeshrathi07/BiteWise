import React from "react";
import { Button } from "@mui/material";
import "./OwnerIncomingOrders.css";

// Incoming Orders Component for Owner
const OwnerIncomingOrders = ({ orders, onAccept, onReject, onComplete }) => {
  const pendingOrders = orders.filter(order => order.status !== 'Completed');
  return (
    <div className="incoming-orders">
      {pendingOrders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>Order #{order.orderNumber}</h3>
          <p>
            {order.date} {order.time}
          </p>
          <div>
            <ul className="items-list">
              {order.orderItems.map((item) => (
                <li key={item.name} className="order-item">
                  <div className="item-name">{item.name}</div>
                  <div className="item-quantity2">Qty: {item.quantity}</div>
                </li>
              ))}
            </ul>
          </div>
          {order.status === "Pending" && (
            <div className="buttons">
              <Button
                onClick={() => onReject(order.orderNumber)}
                className="reject-button"
                startIcon={
                  <img
                    width="40px"
                    height="40px"
                    src={"/reject.png"}
                    alt="reject"
                  />
                }
                disableElevation={true}
                variant="outlined"
              ></Button>
              <Button
                onClick={() => onAccept(order.orderNumber)}
                className="accept-button"
                startIcon={
                  <img
                    width="40px"
                    height="40px"
                    src={"/accept.png"}
                    alt="accept"
                  />
                }
                disableElevation={true}
                variant="outlined"
              ></Button>
            </div>
          )}
          {order.status === "Accepted" && (
            <div className="buttons">
              <Button
                className="accept-button-after"
                disableElevation={true}
                variant="outlined"
              >
                Accepted
              </Button>
              <Button
                onClick={() => onComplete(order.orderNumber)}
                className="complete-order-button"
                disableElevation={true}
                variant="outlined"
                startIcon={
                  <img
                    width="25px"
                    height="25px"
                    src={"/accept.png"}
                    alt="accept"
                  />
                }
              >
                Complete
              </Button>
              
            </div>
          )}
          {order.status === "Rejected" && (
            <div className="buttons">
              <Button
                className="reject-button-after"
                startIcon={
                  <img
                    width="30px"
                    height="30px"
                    src={"/reject.png"}
                    alt="reject"
                  />
                }
                disableElevation={true}
                variant="outlined"
              >
                Rejected
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OwnerIncomingOrders;
