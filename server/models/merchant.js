import mongoose from "mongoose";
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';

const merchantSchema = new mongoose.Schema(
  {
    merchantname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
      unique: false,
    },
    restaurant_id: {
      type: Number,
      required: false,
      unique: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 10,
      required: true,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
      lowercase: true,
      sparse: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true
    },
    logo_url: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    in_App: {
      type: Boolean,
      default: false,
    },
    salt: String,
  },
  {
    timestamps: true,
  }
);

// virtual field
merchantSchema.virtual('password')
    // create a temporary variable, _password, which is not stored in the database
    .set(function(password) {
        this._password = password;
        // generate a timestamp, uuidv1 gives us a unique id (unix timestamp)
        this.salt = uuidv1();
        // encrypt the password function call
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });


// methods
merchantSchema.methods = { 
  // authenticate method
  authenticate: function(plainText) {
      return this.encryptPassword(plainText) === this.hashed_password;
  },
  // encrypt password method
  encryptPassword: function(password) {
      if (!password) return "";
      try {
          return crypto.createHmac('sha256', this.salt)
                      .update(password)
                      .digest('hex');
      } catch (err) {
          return "";
      }
  }
};


merchantSchema.pre("save", function (next) {
  // Generate a random order number only if it's not already provided
  if (!this.restaurant_id) {
    this.restaurant_id = Math.floor(Math.random() * 500) + 1;
  }
  next();
});



const Merchant = mongoose.model("Merchant", merchantSchema);

export default Merchant;
export { Merchant };
