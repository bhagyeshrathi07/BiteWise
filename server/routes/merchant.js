import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// import controller
import { register } from "../controllers/merchant.js";
import { homepage } from "../controllers/merchant.js";
import { login } from "../controllers/merchant.js";
import { logout } from "../controllers/merchant.js";
import { updateMerchant } from "../controllers/merchant.js";
import { validate } from "../controllers/merchant.js";
import {
  getMerchantDetails,
  getAllMerchantDetails,
  deleteRestaurant,
} from "../controllers/merchant.js";


// import middlewares
import { merchantRegisterValidator } from "../middlewares/merchant.js";

// api routes
router.get("/homepage", homepage);

// route for getting credentials from client
router.post("/googleSuccessfullSignIn", (req, res) => {
  console.log(req.body);
  // decode id token and get user info
  const idToken = req.body.credential;
  const decoded = jwt.decode(idToken);
  console.log(decoded);
});

router.post("/register", merchantRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);

// Route for updating merchant information
router.put("/updateInfo/:restaurant_id", updateMerchant);
router.get("/:merchant_email", getMerchantDetails);
router.get("/details/:merchant_email", getAllMerchantDetails);
router.delete("/remove/:restaurant_id/", deleteRestaurant);
router.post("/validate", validate);

export default router;
