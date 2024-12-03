import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { body, validationResult } from "express-validator";
import { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import cors from "cors";
import { getOneMerchant, searchMerchants } from "./searchFoods.js";
import { searchFoods } from "./searchFoods.js";
import { getMerchantInfo } from "./searchFoods.js";
import { checkoutMerchants } from "./searchFoods.js";
import Merchants from "./models/merchant.js";
import Order from "./models/order.js";

// get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// load environment variables
dotenv.config();

//----------------------APP----------------------//
const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

//--------------------MIDDLEWARE-------------------//
// handle URL parameter
app.use(urlencoded({ extended: true }));
// logger
app.use(morgan("dev"));
app.use(json());
app.use(cookieParser());
app.use(body());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//--------------------DB----------------------//
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//-------------------Searching-------------------//
const router = express.Router();
router.get("/search-query", async (req, res) => {
  try {
    const { query } = req.query; // Assuming the request body contains a 'query' property

    // Log the input received in the request body
    console.log("Received search query:", query);
    const returnMerchants = await searchMerchants(query);
    const { foods, merchantNames } = await searchFoods(query);

    const combinedData = {
      merchants: returnMerchants,
      foods: foods,
      merchantNames: merchantNames,
    };
    res.status(200).send(combinedData);

    // Perform any additional processing or handle the search query here
  } catch (error) {
    console.error("Error handling search query:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-orders", async (req, res) => {
  try {
    const { query } = req.query; // Should be username
    const userOrders = await Order.find({username: query})
    res.status(200).send([...userOrders])
  } catch (error) {
    console.error("Error getting user orders");
    res.status(500).send("Internal Service Error")
  }
})

router.get("/get-merch-info", async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Looking for rest_id: ", query);
    const { merchant, menuItems } = await getMerchantInfo(query);
    const combinedData = {
      merchant: merchant,
      menuItems: menuItems,
    };
    res.status(200).send(combinedData);
  } catch (error) {
    console.error("Error handling search query:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/checkout-merchants", async (req, res) => {
  try {
    const { query } = req.query; // Assuming the request body contains a 'query' property

    // Log the input received in the request body
    console.log("Received an ID:", query);
    const returnMerchants = await checkoutMerchants(query);

    res.status(200).send(returnMerchants);

    // Perform any additional processing or handle the search query here
  } catch (error) {
    console.error("Error handling search query:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-merchant", async (req, res) => {
  try {
    const { query } = req.query;
    const returnMerchant = await getOneMerchant(query);
    res.status(200).send(returnMerchant);
  } catch (error) {
    console.error("Error handling search query:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-merchant", async (req, res) => {
  try {
    const { query } = req.query;
    const returnMerchant = await getOneMerchant(query);
    res.status(200).send(returnMerchant);
  } catch (error) {
    console.error("Error handling search query:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/search-user", async (req, res) => {
  try {
    const { query } = req.query; // Assuming the request body contains a 'query' property

    const returnMerchants = await Merchants.findOne({ username: query });

    res.status(200).send(returnMerchants);
  } catch (error) {
    console.error("Error handling search query:", error);
    res.status(500).send("Internal server error");
  }
});
app.use("/", router);
//-------------------ROUTES-------------------//
import userRoutes from "./routes/user.js";
app.use("/", userRoutes);

import merchantRoutes from "./routes/merchant.js";
app.use("/merchant", merchantRoutes);

import menuRoutes from "./routes/menu.js";
app.use("/menu", menuRoutes);

import orderRoutes from "./routes/order.js";
app.use("/orders", orderRoutes);

import restaurantRoutes from "./routes/food_mapping.js";
app.use("/", restaurantRoutes);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

//-------------------LISTENER-------------------//
app.listen(process.env.PORT || 8080, function () {
  console.log("Server is running on port 8080");
});
