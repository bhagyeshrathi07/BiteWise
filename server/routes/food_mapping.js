import express from "express";
const router = express.Router();

const restaurants = {
  //mcdonalds
  "UberEats-McDonald's":
    "https://www.ubereats.com/store/mcdonalds-santa-clara-st/aCRdpwDxTLSFkPiYM8gs-A?diningMode=DELIVERY",
  "Doordash-McDonald's":
    "https://www.doordash.com/store/mcdonald's-san-jose-662214/?pickup=false",
  "Grubhub-McDonald's":
    "https://www.grubhub.com/restaurant/mcdonalds-1299-e-santa-clara-st-san-jose/2494036",
  "Postmates-McDonald's":
    "https://postmates.com/store/mcdonalds-777-story-rd/7F9BadIKQ1GHx_6uqpXyOw?diningMode=DELIVERY&sc=SEARCH_SUGGESTION",

  //Panda Express
  "UberEats-PandaExpress":
    "https://www.ubereats.com/store/panda-express-567-coleman-ave/XK0CZlT1TPS9_HCHIIKKEg?diningMode=DELIVERY&sc=SEARCH_SUGGESTION",
  "Doordash-PandaExpress":
    "https://www.doordash.com/store/panda-express-san-jose-54372/?event_type=autocomplete&pickup=false",
  "Grubhub-PandaExpress":
    "https://www.grubhub.com/restaurant/panda-express-567-coleman-ave-san-jose/322640",
  "Postmates-PandaExpress":
    "https://postmates.com/store/panda-express-2131-monterey-hwy/xadPwLztQ2iFJrFi1OMeBw?sc=SEARCH_SUGGESTION",

  //Mountain Mike's
  "UberEats-MountainMike's":
    "https://www.ubereats.com/store/mountain-mikes-pizza-29-s-third-street/HAjXMv7kWBSkQpx6t4zt9w?diningMode=DELIVERY",
  "Doordash-MountainMike's":
    "https://www.doordash.com/store/25672403/?cursor=eyJzdG9yZV9wcmltYXJ5X3ZlcnRpY2FsX2lkcyI6WzFdfQ==&pickup=false",
  "Grubhub-MountainMike's":
    "https://www.grubhub.com/restaurant/mountain-mikes-pizza-29-s-third-st-san-jose/6803144",
  "Postmates-MountainMike's":
    "https://postmates.com/store/mountain-mikes-pizza-29-s-third-street/HAjXMv7kWBSkQpx6t4zt9w?diningMode=DELIVERY",

  //El Abuelo Taqueria
  "UberEats-ElAbueloTaqueria":
    "https://www.ubereats.com/store/el-abuelo-taqueria/TRTRz2WfQsigdVC-He9rUg?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION",
  "Doordash-ElAbueloTaqueria":
    "https://www.doordash.com/store/taqueria-el-abuelo-san-jose-724437/?event_type=autocomplete&pickup=false",
  "Grubhub-ElAbueloTaqueria":
    "https://www.grubhub.com/restaurant/taqueria-el-abuelo-1005-lincoln-ave-san-jose/322256",
  "Postmates-ElAbueloTaqueria":
    "https://postmates.com/store/el-abuelo-taqueria/TRTRz2WfQsigdVC-He9rUg?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION",

  // La-victoria-taqueria
  "UberEats-LaVictoriaTaqueria":
    "https://www.ubereats.com/store/la-victoria-taqueria-4th-gish-st/73BsHi43R8WBDRD1BetvwA?diningMode=DELIVERY",
  "Doordash-LaVictoriaTaqueria":
    "https://www.doordash.com/store/190/?event_type=autocomplete&pickup=false",
  "Grubhub-LaVictoriaTaqueria":
    "https://www.grubhub.com/restaurant/la-victoria-taqueria-140-e-san-carlos-st-san-jose/2072725",
  "Postmates-LaVictoriaTaqueria":
    "https://postmates.com/store/la-victoria-taqueria-san-carlos-st/BafLSzDURd2zsEXw0E0bZA?sc=SEARCH_SUGGESTION",

  // Banh Mi Oven
  "UberEats-BanhMiOven":
    "https://www.ubereats.com/store/banh-mi-oven-downtown/8WFl8MRcQ3a3Uzp9olYdQQ?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION",
  "Doordash-BanhMiOven":
    "https://www.doordash.com/store/2467541/?event_type=autocomplete&pickup=false",
  "Grubhub-BanhMiOven":
    "https://www.grubhub.com/restaurant/banh-mi-oven-e-san-fernando-st-221-e-san-fernando-st-san-jose/2300458",
  "Postmates-BanhMiOven":
    "https://postmates.com/store/banh-mi-oven-story-rd/PD_41WDtQZKjGkCsSoy7CA?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION",
};

router.get("/place_order/:restaurantName", (req, res) => {
  const restaurantName = req.params.restaurantName.replace(/\s/g, "");
  console.log("restaurantName: ", restaurantName);
  // Check if the restaurant exists
  if (restaurants.hasOwnProperty(restaurantName)) {
    console.log("routing to: ", restaurants[restaurantName]);
    res.status(200).send(restaurants[restaurantName]);
  } else {
    res.status(404).json({ error: "Restaurant not found" });
  }
});

export default router;
