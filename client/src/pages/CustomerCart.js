import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import FrameComponent4 from "../components/FrameComponent4";
import "./CustomerCart.css";

const CustomerCart = () => {
  const location = useLocation();
  console.log("Location state:", location.state);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  const setCartLocalStorage = (cartData) => {
    localStorage.setItem("cartItems", JSON.stringify(cartData));
  };

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsFromStorage =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartFromStorage.length > 0) {
      const incomingHasDifferentRestaurant = cartFromStorage.some(
        (item) =>
          !cartItemsFromStorage.some(
            (existingItem) =>
              existingItem.restaurantName === item.restaurantName
          )
      );

      if (incomingHasDifferentRestaurant) {
        cartItemsFromStorage = cartFromStorage;
      } else {
        cartFromStorage.forEach((item) => {
          const existingItemIndex = cartItemsFromStorage.findIndex(
            (existingItem) => existingItem.id === item.id
          );
          if (existingItemIndex === -1) {
            cartItemsFromStorage.push(item);
          } else {
            if (item.quantity === 0) {
              cartItemsFromStorage[existingItemIndex].quantity = item.quantity;
            }
            cartItemsFromStorage[existingItemIndex].quantity += item.quantity;
          }
        });
      }
    }

    setCartData(cartItemsFromStorage);
    localStorage.setItem("cartItems", JSON.stringify(cartItemsFromStorage));
    localStorage.removeItem("cart");
  }, []);

  console.log("Cart data:", cartData);
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartData
      .map((item) => {
        if (item.id === itemId) {
          const quantity = Math.max(0, newQuantity);
          if (quantity === 0) {
            return null;
          }
          return {
            ...item,
            quantity,
          };
        }
        return item;
      })
      .filter(Boolean);

    setCartData(updatedCartItems);
    setCartLocalStorage(updatedCartItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartData.filter((item) => item.id !== itemId);
    setCartData(updatedCartItems);
    setCartLocalStorage(updatedCartItems);
  };

  const handleCheckout = () => {
    navigate(`/in-app-checkout`, {
      state: { cartData },
    });
  };

  return (
    <div className="my-cart">
      <FrameComponent4 />
      <div className="redirect-header-frame">
        <header className="redirect-header">
          <h3 className="cart1">My Cart</h3>
        </header>
      </div>
      <div className="cart-details">
        <div className="restaurant-name-group">
          <div className="restaurant-name2">From</div>
          <div className="restaurant-name3">
            {cartData.length > 0 && cartData[0].restaurantName}
          </div>
        </div>
        {console.log("Cart data:", cartData)}
        {cartData?.map((item) => (
          <div key={item.id} className="cart-item2">
            <div className="cart-item-name">{item.name}</div>
            <div className="quantity">
              <Button
                className="quantity-button2 minus"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity === 0}
              >
                –
              </Button>
              <span>{item.quantity}</span>
              <Button
                className="quantity-button2 plus"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
            <div className="remove-container">
              <Button
                className="remove-button"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}

        <div className="compare-prices-container">
          <Button
            className="compare-prices"
            onClick={handleCheckout}
            disabled={cartData.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
      <div className="dashboard-footer">
        <Footer propHeight="20.9px" propHeight1="24px" />
      </div>
    </div>
  );
};

export default CustomerCart;
