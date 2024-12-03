import {
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import FrameComponent4 from "../components/FrameComponent4";
import "./IACustomerCheckout.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

const IACustomerCheckout = () => {
  const taxRate = 0.0875;
  const deliveryFee = 5.5;
  const empty = 0;
  const years = [
    2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
  ];

  const location = useLocation();
  const [cartData, setCartData] = useState(location.state?.cartData || []);

  const [itemTotal, setItemTotal] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    console.log("Cart Data from UseEffect func:", cartData);
    let totalPrice = 0.0;
    cartData.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });

    let taxes = totalPrice * taxRate;
    let subtotal = totalPrice + taxes + deliveryFee;

    setItemTotal(totalPrice.toFixed(2));
    setTaxPrice(taxes.toFixed(2));
    setSubtotal(subtotal.toFixed(2));
  }, [cartData]);

  useEffect(() => {
    console.log("Cart Data from UseEffect func:", cartData);
    const cartFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartData(cartFromStorage);
    localStorage.removeItem("cart");
  }, []);

const completeCheckout = async () => {
      try {
          console.log('Checking out...');
          const cart = JSON.parse(localStorage.getItem("cartItems")); 
          const restaurant_id = cart[0].restaurant_id;
          const username = localStorage.getItem("username");
          const order = {
              items: cart,
              restaurant_id: restaurant_id,
              username: username,
          };
          const response = await axios.post('http://localhost:8080/orders/create', order);
          console.log('Order created:', response.data);
      } catch (error) {
          console.error('Error Checking out:', error);
      }
  }

  const handleSubmit = async (e) => {
    console.log("Form submitted");
    e.preventDefault();
    if (
      validateFName(formData.fname) !== "" ||
      validateFName(formData.lname) !== "" ||
      validateState(formData.state) !== "" ||
      validateAddress(formData.address1) !== "" ||
      validateAddress(formData.address2) !== "" ||
      validateCity(formData.city) !== "" ||
      validateZipCode(formData.zipCode) !== ""
    ) {
      console.log("Invalid form data")
      return false;
    } else {
      completeCheckout();
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("cart", JSON.stringify([]));
      navigate("/in-app-order-confirm");
    }
  };

  

  // validation functions
  const validateFName = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "First Name can only contain letters (a-z A-Z) only!";
    else return "";
  };

  const validateCity = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "City can only contain letters (a-z A-Z) only!";
    else return "";
  };

  const validateState = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "State can only contain letters (a-z A-Z) only!";
    else return "";
  };

  const validateLName = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "Last Name can only contain letters (a-z A-Z) only!";
    else return "";
  };

  const validateCCNum = (field) => {
    if (/[^0-9\s]+/.test(field))
      return "Can only contain numbers (0-9) only!";
    else return "";
  };

  const validateCVVNum = (field) => {
    if (/[^0-9]+/.test(field))
      return "Can only contain numbers (0-9) only!";
    else return "";
  };

  const validateAddress = (field) => {
    if (/[^a-zA-Z0-9\s]+/.test(field))
      return "Address can only contain letters (a-z A-Z) or numbers only!";
    else return "";
  };

  const validateZipCode = (field) => {
    if (/[^0-9-\s]+/.test(field))
      return "Zip Code can only contain numbers only!";
    else return "";
  };

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
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    fname: "",
    lname: "",
    ccnum: "",
    expMonth: "",
    expYear: "",
    cvvNum: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  return (
    <div className="checkout-container">
      <FrameComponent4 />
      <header className="register-wrapper">
        <h3 className="register1">In App Checkout</h3>
      </header>
      <section className="section1">
        <div className="first-body">
          <div className="checkout-form-wrapper">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="delivery-payment-sections">
                <div className="delivery-payment-header">
                  <img className="loc-icon" alt="" src="/location.svg" />
                  <h5 className="create-your-account">Delivery Address</h5>
                </div>
                <div className="delivery-sub">
                  <TextField
                    className="street-address"
                    placeholder="Address Line 1"
                    error={validateAddress(formData.address1)}
                    helperText={validateAddress(formData.address1)}
                    variant="outlined"
                    name="address1"
                    onChange={handleChange}
                    required
                    sx={{
                      "& fieldset": { borderColor: "#1ac84b" },
                      "& .MuiInputBase-root": {
                        height: "40px",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                      },
                      "& .MuiInputBase-input": {
                        color: "#808080",
                        height: "10px",
                      },
                    }}
                  />
                  <TextField
                    className="street-address"
                    placeholder="Address Line 2"
                    name="address2"
                    variant="outlined"
                    error={validateAddress(formData.address2)}
                    helperText={validateAddress(formData.address2)}
                    onChange={handleChange}
                    sx={{
                      "& fieldset": { borderColor: "#1ac84b" },
                      "& .MuiInputBase-root": {
                        height: "40px",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                      },
                      "& .MuiInputBase-input": {
                        color: "#808080",
                        height: "10px",
                      },
                    }}
                  />
                  <div className="city-state-info">
                    <TextField
                      className="city-field"
                      placeholder="City"
                      variant="outlined"
                      name="city"
                      error={validateCity(formData.city)}
                      helperText={validateCity(formData.city)}
                      onChange={handleChange}
                      required
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "40px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                        },
                        "& .MuiInputBase-input": {
                          color: "#808080",
                          height: "10px",
                        },
                      }}
                    />
                    <TextField
                      className="city-field"
                      placeholder="State"
                      variant="outlined"
                      name="state"
                      error={validateState(formData.state)}
                      helperText={validateState(formData.state)}
                      onChange={handleChange}
                      required
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "40px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                        },
                        "& .MuiInputBase-input": {
                          color: "#808080",
                          height: "10px",
                        },
                      }}
                    />

                    <TextField
                      className="street-address"
                      placeholder="Zip Code"
                      variant="outlined"
                      name="zipCode"
                      error={validateZipCode(formData.zipCode)}
                      helperText={validateZipCode(formData.zipCode)}
                      onChange={handleChange}
                      required
                      sx={{
                        "& fieldset": { borderColor: "#1ac84b" },
                        "& .MuiInputBase-root": {
                          height: "40px",
                          width: "168px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                        },
                        "& .MuiInputBase-input": {
                          color: "#808080",
                          height: "10px",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="delivery-payment-header">
                <img className="loc-icon" alt="" src="/card.svg" />
                <h5 className="create-your-account">Payment Information</h5>
              </div>
              <div className="delivery-sub">
                <img className="payments-img" alt="" src="/payments.svg" />
                <div className="payment-info">
                  <TextField
                    className="name-field"
                    placeholder="First Name"
                    variant="outlined"
                    name="fname"
                    onChange={handleChange}
                    error={validateFName(formData.fname)}
                    helperText={validateFName(formData.fname)}
                    required
                    sx={{
                      "& fieldset": { borderColor: "#1ac84b" },
                      "& .MuiInputBase-root": {
                        height: "40px",

                        backgroundColor: "#fff",
                        borderRadius: "10px",
                      },
                      "& .MuiInputBase-input": {
                        color: "#808080",
                        height: "10px",
                      },
                    }}
                  />
                  <TextField
                    className="name-field"
                    placeholder="Last Name"
                    variant="outlined"
                    name="lname"
                    onChange={handleChange}
                    error={validateLName(formData.lname)}
                    helperText={validateLName(formData.lname)}
                    required
                    sx={{
                      "& fieldset": { borderColor: "#1ac84b" },
                      "& .MuiInputBase-root": {
                        height: "40px",

                        backgroundColor: "#fff",
                        borderRadius: "10px",
                      },
                      "& .MuiInputBase-input": {
                        color: "#808080",
                        height: "10px",
                      },
                    }}
                  />
                </div>
                <TextField
                  className="street-address"
                  placeholder="Credit Card Number (xxxx xxxx xxxx xxxx)"
                  variant="outlined"
                  name="ccnum"
                  error={validateCCNum(formData.ccnum)}
                  helperText={validateCCNum(formData.ccnum)}
                  onChange={handleChange}
                  required
                  sx={{
                    "& fieldset": { borderColor: "#1ac84b" },
                    "& .MuiInputBase-root": {
                      height: "40px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                    },
                    "& .MuiInputBase-input": {
                      color: "#808080",
                      height: "10px",
                    },
                  }}
                />
                <div className="city-state-info">
                  <Select
                    placeholder="Month (i.e. September)"
                    className="city-field"
                    value={formData.expMonth}
                    name="expMonth"
                    onChange={handleChange}
                    sx={{
                      height: "40px",
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#1ac84b" },
                      "& .MuiInputBase-root": {
                        width: "626px",
                        backgroundColor: "#fff",
                        borderRadius: "20px",
                      },
                      "& .MuiInputBase-input": {
                        color: "#808080",
                        height: "10px",
                      },
                    }}
                  >
                    <MenuItem value={"January"}>Jan</MenuItem>
                    <MenuItem value={"February"}>Feb</MenuItem>
                    <MenuItem value={"March"}>Mar</MenuItem>
                    <MenuItem value={"April"}>Apr</MenuItem>
                    <MenuItem value={"May"}>May</MenuItem>
                    <MenuItem value={"June"}>Jun</MenuItem>
                    <MenuItem value={"July"}>Jul</MenuItem>
                    <MenuItem value={"August"}>Aug</MenuItem>
                    <MenuItem value={"September"}>Sep</MenuItem>
                    <MenuItem value={"October"}>Oct</MenuItem>
                    <MenuItem value={"November"}>Nov</MenuItem>
                    <MenuItem value={"December"}>Dec</MenuItem>
                  </Select>
                  <Select
                    placeholder="Month (i.e. September)"
                    className="city-field"
                    value={formData.expYear}
                    name="expYear"
                    onChange={handleChange}
                    sx={{
                      height: "40px",
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#1ac84b" },
                      "& .MuiInputBase-root": {
                        width: "626px",
                        backgroundColor: "#fff",
                        borderRadius: "20px",
                      },
                      "& .MuiInputBase-input": {
                        color: "#808080",
                        height: "10px",
                      },
                    }}
                  >
                    {years.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <TextField
                    className="street-address"
                    placeholder="CVV"
                    variant="outlined"
                    name="cvvNum"
                    onChange={handleChange}
                    error={validateCVVNum(formData.cvvNum)}
                    helperText={validateCVVNum(formData.cvvNum)}
                    required
                    type="password"
                    inputProps={{ maxLength: 3 }}
                    sx={{
                      "& fieldset": { borderColor: "#1ac84b" },
                      "& .MuiInputBase-root": {
                        height: "40px",
                        width: "168px",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                      },
                      "& .MuiInputBase-input": {
                        color: "#808080",
                        height: "10px",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="sign-in-parent">
                <Button
                  className="sign-in1"
                  type="submit"
                  disableElevation={true}
                  variant="contained"
                  disabled={cartData.length === 0}
                  sx={{
                    textTransform: "none",
                    marginTop: "25px",
                    color: "#fff",
                    fontSize: "14",
                    background: "#307651",
                    borderRadius: "10px",
                    "&:hover": { background: "#307651" },
                    height: 49,
                  }}
                >
                  Confirm Payment
                </Button>
              </div>
            </form>
          </div>
          <div className="cart-wrapper">
            <h3 className="cart-header">Cart</h3>
            {cartData?.map((item) => (
              <div className="cart-item">
                <div className="order-info">
                  <p className="item-name">{item.name}</p>
                  <p className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="quantity-btns">
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    <RemoveIcon className="sub-btn" />
                  </IconButton>
                  <span className="item-quantity">{item.quantity}</span>
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <AddIcon className="add-btn" />
                  </IconButton>
                </div>
              </div>
            ))}
            <div className="subtotal-div">
              <div className="item-total-div">
                <p className="label">Item Total </p>
                <p className="value"> ${itemTotal}</p>
              </div>
              <div className="item-total-div">
                <p className="label">Taxes </p>
                <p className="taxprice-val"> ${taxPrice}</p>
              </div>
              <div className="item-total-div">
                <p className="delivery-label">Delivery Fee </p>
                <p className="delivery-val"> ${(cartData.length === 0) ? empty.toFixed(2) : deliveryFee.toFixed(2)}</p>
              </div>
              <div className="total-price-div">
                <h4 className="total-label">Total </h4>
                <h4 className="total-value"> ${(cartData.length === 0) ? empty.toFixed(2) : subtotal}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer propHeight="20.9px" propHeight1="24px" />
    </div>
  );
};

export default IACustomerCheckout;
