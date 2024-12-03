const mongoose = require("mongoose");

const merchantOrderSchema = new mongoose.Schema({
  customerName: String,
  items: [String],
  total: Number,

  // Timestamp for the order
  createdAt: { type: Date, default: Date.now },
});

const merchantOrder = mongoose.model("merchantOrder", merchantOrderSchema);

module.exports = merchantOrder;
