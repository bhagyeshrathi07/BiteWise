import "./UserHistoryOrders.css";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Component to display user's order history
const UserHistoryOrders = ({ orders }) => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [deletionStatus, setDeletionStatus] = useState(null); // State to track deletion status
    const navigate = useNavigate();

    const handleClickDelete = async (orderNum) => {
        try {
            const response = await axios.delete(`http://localhost:8080/orders/delete/${orderNum}`);
            if (response.status === 200) {
                console.log("Order deleted successfully");
                // Remove the deleted order from orderDetails
                setOrderDetails(orderDetails.filter(order => order.orderNumber !== orderNum));
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            setDeletionStatus(false);
        }
    };

    const handClickContact = async (email) => {
        const redirectURL = `http://mail:${email}`;
        window.location.href = redirectURL;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (orders) {
                    const orderDetailsPromises = orders.map(async (order) => {
                        const response = await axios.get("http://localhost:8080/get-merchant", {
                            params: { query: order.restaurant_id },
                        });
                        if (response.data) {
                            const dateObject = new Date(order.createdAt);
                            const restName = response.data.merchantname;
                            const email = response.data.email;
                            const fullDateTime = dateObject.toLocaleString("en-US", {
                                timeZone: "America/Los_Angeles"
                            })
                            const date = fullDateTime.split(", ")[0];
                            const time = fullDateTime.split(", ")[1];

                            var itemQuan = ""

                            for (var i = 0; i < order.items.length; i++) {
                                itemQuan += (order.items[i].quantity + "x " + order.items[i].name + " ")
                            }

                            return { ...order, date, restName, time, itemQuan, email };
                        }
                        return null;
                    });

                    const updatedOrderDetails = await Promise.all(orderDetailsPromises);
                    setOrderDetails(updatedOrderDetails.filter(Boolean));
                }
            } catch (error) {
                console.error("Failed getting Restaurant Name:", error);
            }
        };

        if (orders) {
            fetchData();
        }
    }, [orders, deletionStatus]); // Include deletionStatus in dependency array

    return (
        <div className="history-orders">
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Restaurant Name</th>
                        <th>Order Details</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.map((order) => (
                        <tr key={order.id}>
                            <td>{order.orderNumber}</td>
                            <td>{order.date}</td>
                            <td>{order.time}</td>
                            <td>{order.restName}</td>
                            <td>{order.itemQuan}</td>
                            <td>{order.status}</td>
                            <td>
                                {(order.status === "Pending" || order.status === "pending") && (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleClickDelete(order.orderNumber)}
                                    >
                                        Cancel Order
                                    </Button>
                                )}
                            </td>
                            <td>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handClickContact(order.email)}
                                >
                                    Contact
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserHistoryOrders;
