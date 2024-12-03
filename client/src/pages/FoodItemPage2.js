// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { TextField, Button } from "@mui/material";
// import { menuData } from "./MenuData";
// import Footer from "../components/Footer";
// import FrameComponent4 from "../components/FrameComponent4";
// import "./FoodItemPage.css";

// const FoodItemPage2 = () => {
//   const location = useLocation();

//   const { restaurantName, restaurantInfo } = location.state || {};

//   const [selectedCategory, setSelectedCategory] = useState([]);

//   const [selectedItems, setSelectedItems] = useState([]);

//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     setMenuItems(menuData[restaurantName] || []);
//     setSelectedCategory(menuData[restaurantName][0]?.name || []);
//   }, [restaurantName]);

//   const addToCart = (item, category) => {
//     const existingItem = selectedItems.findIndex(
//       (selectedItem) =>
//         selectedItem.id === item.id && selectedItem.category === category
//     );
//     if (existingItem !== -1) {
//       const updated = [...selectedItems];
//       selectedItems[existingItem].quantity += 1;
//       setSelectedItems(updated);
//     } else {
//       setSelectedItems([...selectedItems, { ...item, quantity: 1, category }]);
//     }
//   };

//   const removeFromCart = (itemId, category) => {
//     const updated = selectedItems
//       .map((item) => {
//         if (
//           item.id === itemId &&
//           item.category === category &&
//           item.quantity > 0
//         ) {
//           return { ...item, quantity: item.quantity - 1 };
//         } else {
//           return item;
//         }
//       })
//       .filter((item) => item.quantity > 0);
//     setSelectedItems(updated);
//   };

//   const goToComparePrices = () => {};

//   return (
//     <div className="food-item">
//       <FrameComponent4 />
//       <section className="food-item-inner">
//         <div className="restaurant-info">
//           <img
//             className="restaurant-photo"
//             src={restaurantInfo.rectangle26}
//             alt={restaurantInfo.notYourMothersFalafel}
//           />
//           <div className="restaurant-details">
//             <div className="restaurant-name">
//               <h2>{restaurantInfo.notYourMothersFalafel}</h2>
//             </div>
//             <div className="french-patisserie">
//               <p>{restaurantInfo.faasosWrapsRolls}</p>
//             </div>
//             <div className="info-container">
//               <div className="rating">
//                 <img
//                   alt=""
//                   src="/vector-2.svg"
//                   style={{
//                     filter:
//                       "brightness(0) saturate(100%) invert(38%) sepia(99%) saturate(6100%) hue-rotate(134deg) brightness(90%) contrast(88%)",
//                   }}
//                 />
//                 <p>{restaurantInfo.rating}</p>
//               </div>
//               <div className="delivery-time">
//                 <p>{restaurantInfo.mins} Delivery Time</p>
//               </div>
//               <div className="cost">
//                 <p>{restaurantInfo.cost}</p>
//               </div>
//             </div>
//             <div className="frame-wrapper">
//               <div className="frame-parent5">
//                 <TextField
//                   className="frame-textfield"
//                   placeholder="Search for other food items"
//                   variant="outlined"
//                   sx={{
//                     "& fieldset": { borderColor: "#808080" },
//                     "& .MuiInputBase-root": {
//                       height: "49px",
//                       backgroundColor: "#fff",
//                       borderRadius: "10px",
//                       fontSize: "14px",
//                     },
//                     "& .MuiInputBase-input": { color: "#808080" },
//                   }}
//                 />
//                 <Button
//                   className="sign-in5"
//                   disableElevation={true}
//                   variant="contained"
//                   sx={{
//                     textTransform: "none",
//                     color: "#000",
//                     fontSize: "14",
//                     background: "#fff",
//                     borderRadius: "10px",
//                     "&:hover": { background: "#29a679" },
//                     width: 129,
//                     height: 49,
//                   }}
//                 >
//                   <img
//                     alt=""
//                     src="/star_fav.png"
//                     style={{
//                       width: "15px",
//                       height: "15px",
//                       marginRight: "8px",
//                     }}
//                   />
//                   Favorite
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <div className="offer">
//             <h3>Offers</h3>
//             <div className="offer-details">
//               <img
//                 alt=""
//                 src="/offer.png"
//                 style={{
//                   width: "15px",
//                   height: "15px",
//                   marginRight: "8px",
//                   filter:
//                     "brightness(0) saturate(100%) invert(38%) sepia(99%) saturate(6100%) hue-rotate(134deg) brightness(90%) contrast(88%)",
//                 }}
//               />
//               <p>{restaurantInfo.prop}</p>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div className="menu">
//         <div className="menu-category">
//           {menuItems.map((category) => (
//             <div
//               key={category.name}
//               className={`category ${
//                 selectedCategory === category.name ? "selected" : ""
//               }`}
//               onClick={() => setSelectedCategory(category.name)}
//             >
//               {category.name}
//             </div>
//           ))}
//         </div>
//         <div className="menu-items">
//           {selectedCategory &&
//             menuItems
//               .find((category) => category.name === selectedCategory)
//               ?.items?.map((item) => (
//                 <div className="menu-item" key={item.id}>
//                   <div className="item-info">
//                     <h3>{item.name}</h3>
//                     <p>{item.description}</p>
//                   </div>
//                   <button
//                     className="add-button"
//                     onClick={() => addToCart(item, item.category)}
//                   >
//                     Add +
//                   </button>
//                 </div>
//               ))}
//         </div>
//         <div className="cart">
//           <h2>Cart</h2>
//           <p>
//             from{" "}
//             <div className="cart-name">
//               {restaurantInfo.notYourMothersFalafel}
//             </div>
//           </p>
//           <div className="cart-items">
//             {selectedItems.map((item, index) => (
//               <div key={index} className="cart-item">
//                 <div className="cart-item-info">
//                   <h3>{item.name}</h3>
//                 </div>
//                 <div className="cart-item-quantity">
//                   <button
//                     className="quantity-button"
//                     onClick={() => removeFromCart(item.id, item.category)}
//                   >
//                     –
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     className="quantity-button"
//                     onClick={() => addToCart(item, item.category)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button onClick={goToComparePrices} className="compare-prices">
//             Go To Compare Prices
//           </button>
//         </div>
//       </div>
//       <Footer propHeight="20.9px" propHeight1="24px" />
//     </div>
//   );
// };

// export default FoodItemPage2;
