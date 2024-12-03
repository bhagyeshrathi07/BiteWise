import Merchant from "../models/merchant.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const userNameExists = await Merchant.findOne({
      username: req.body.username,
    });
    if (userNameExists) {
      return res.status(403).json({
        error: "Username already exists",
      });
    }

    console.log(req.body);

    // Check if email already exists
    const emailExists = await Merchant.findOne({
      email: req.body.email,
    });
    if (emailExists) {
      return res.status(403).json({
        error: "Account already exists. Please login through the login portal.",
      });
    }
    // Create new merchant
    const merchant = new Merchant(req.body);
    await merchant.save();
    res.status(201).json({
      message: "Signup Successful, Please Login to continue.",
    });
  } catch (error) {
    console.error("Error occurred during merchant registration:", error);
    res.status(500).json({
      error: "An unexpected error occurred during registration",
    });
  }
};

const homepage = async (req, res) => {
  res.status(200).json({
    message: "Successful!",
  });
};

const login = async (req, res) => {
  // find the user based on email
  const merchant_email = req.body.email;
  const password = req.body.password;
  try {
    const merchant = await Merchant.findOne({ email: merchant_email });
    console.log(merchant);
    // if no user found
    if (!merchant) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }

    // if user is found, authenticate
    if (!merchant.authenticate(password)) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    // generate a token with user id and jwt secret
    const token = jwt.sign({ _id: merchant._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // persist the token as 'jwt' in cookie with an expiry date
    res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

    // return the response with user
    const merchEmail = merchant.email;
    const { restaurant_id } = merchant;
    return res.json({
      message: "Login Successful",
      email: merchEmail,
      restaurant_id,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const logout = async (req, res) => {
  // clear the cookie
  res.clearCookie("jwt");

  return res.status(200).json({
    message: "Logout Successfull",
  });
};

//Update merchant info
const updateMerchant = async (req, res) => {
  const { restaurant_id } = req.params;
  const updates = req.body;

  try {
    const updatedMerchant = await Merchant.findOneAndUpdate(
      { restaurant_id },
      updates,
      { new: true }
    );
    if (!updatedMerchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }
    res.json({ message: "Merchant updated successfully", updatedMerchant });
  } catch (error) {
    res.status(500).json({ message: "Could not update merchant information" });
  }
};

const getMerchantDetails = async (req, res) => {
  const merchant_email = req.params.merchant_email;
  try {
    const merchant = await Merchant.findOne({ email: merchant_email });
    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }

    const {
      merchantname,
      phone,
      city,
      state,
      zipCode,
      username,
      email,
      category,
      streetAddress,
      restaurant_id,
    } = merchant;

    res.json({
      username,
      merchantname,
      city,
      category,
      state,
      zipCode,
      email,
      phone,
      streetAddress,
      restaurant_id,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllMerchantDetails = async (req, res) => {
  const merchant_email = req.params.merchant_email;
  try {
    const merchant = await Merchant.findOne({ email: merchant_email });
    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }

    const {
      merchantname,
      phone,
      username,
      email,
      streetAddress,
      city,
      state,
      zipCode,
      category,
      restaurant_id,
    } = merchant;

    res.json({
      username,
      merchantname,
      email,
      phone,
      streetAddress,
      city,
      state,
      zipCode,
      category,
      restaurant_id,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRestaurant = async (req, res) => {
  const { restaurant_id } = req.params;
  try {
    const deletedMerchant = await Merchant.findOneAndDelete({ restaurant_id });
    if (!deletedMerchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }
    res.status(200).json({ message: "Merchant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}  

const validate = async (req, res) => {
  try {
    // Check if the JWT token is present
    if (!req.body.jwt) {
      return res
        .status(401)
        .json({ error: "Unauthorized: JWT token is missing" });
    }

    const jwtToken = req.body.jwt;
    // Verify the JWT token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // If decoding is successful, return a success response
    console.log("Decoded JWT:", decoded);
    return res.status(200).json({ message: "JWT Valid" });
  } catch (err) {
    // Handle errors, such as token expiration or invalid signature
    console.error("JWT Validation Error:", err.message);
    return res
      .status(401)
      .json({ error: "Unauthorized: JWT token is invalid" });

  }
};

export { register };
export { login };
export { homepage };
export { logout };
export { updateMerchant };
export { getMerchantDetails };
export { getAllMerchantDetails };
export { deleteRestaurant };
export { validate };
