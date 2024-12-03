import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    value : Number,
    required: false,
    unique: true,
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: false,
  },
  items: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem", // Reference to the MenuItem collection
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
    }
  ],
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  restaurant_id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: false,
    maxlength: 32,
    lowercase: true,
  }
});;

orderSchema.pre("save", async function (next) {
  // Generate a unique order number if it's not already provided
  if (!this.orderNumber) {
    // Find the highest existing order number
    const highestOrder = await this.constructor.findOne({}, { orderNumber: 1 }, { sort: { orderNumber: -1 } });
    const maxOrderNumber = highestOrder ? highestOrder.orderNumber : 0;
    
    // Generate a unique order number
    this.orderNumber = maxOrderNumber + 1;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;