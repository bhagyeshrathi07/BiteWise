import Menu from "../models/menu.js";

// Function to add a new menu item
const addMenuItem = async (req, res) => {
  const { restaurant_id } = req.params;
  const menuItem = new Menu({
    restaurant_id: restaurant_id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
  });
  try {
    // Save the menu item to the db
    const newItem = await menuItem.save();

    res.status(201).json({ message: "Menu item added successfully", newItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// remove an item based on restaurant id
const removeMenuItem = async (req, res) => {
  const { restaurant_id, id } = req.params;

  try {
    //find item based on id and restaurantId
    const deletedItem = await Menu.findOneAndDelete({ restaurant_id, id });
    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json({ message: "Menu item removed", deletedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeAllMenuItems = async (req, res) => {
  const { restaurant_id } = req.params;

  try {
    await Menu.deleteMany({ restaurant_id });

    res.status(200).json({ message: "All menu items removed successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing menu items.", error: error.message });
  }
};

// update menu item
const updateMenuItem = async (req, res) => {
  const { restaurant_id, id } = req.params;
  const updates = req.body;

  try {
    const updatedItem = await Menu.findOneAndUpdate(
      { restaurant_id, id },
      updates,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({ message: "Menu item updated successfully", updatedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMenuItems = async (req, res) => {
  const { restaurant_id } = req.params;

  try {
    // Find all menu items with the given restaurant ID
    const menuItems = await Menu.find({ restaurant_id });

    // if (menuItems.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No menu items found for the restaurant" });
    // }

    //res.json({ menuItems });
    res.status(200).send(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  addMenuItem,
  removeMenuItem,
  removeAllMenuItems,
  updateMenuItem,
  getMenuItems,
};
