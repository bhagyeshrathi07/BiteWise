import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  restaurant_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
  },
});

menuItemSchema.pre("save", async function (next) {
  const randomId = Math.floor(Math.random() * (20000 - 100 + 1)) + 100;
  const doc = this;
  if (!doc.isNew) {
    return next();
  }

  try {
    const highestIdDoc = await MenuItem.findOne({
      restaurant_id: doc.restaurant_id,
    }).sort({ id: -1 });

    if (highestIdDoc) {
      doc.id = highestIdDoc.id + 1;
    } else {
      doc.id = randomId; // randomly generates a starting point for each unique restaurant_id to avoid duplication error
    }
    next();
  } catch (err) {
    return next(err);
  }
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
