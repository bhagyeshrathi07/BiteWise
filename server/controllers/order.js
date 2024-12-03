import e from 'express';
import Order from '../models/order.js';

const createOrder = async (req, res) => {
    console.log(req.body);
    try {
        const newOrder = new Order({
            restaurant_id: req.body.restaurant_id,
            username: req.body.username,
            items: req.body.items
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteOrder = async (req, res) => {
    const { orderNumber } = req.params;
    try {
        const deletedOrder = await Order.findOneAndDelete({ orderNumber });
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const acceptOrder = async (req, res) => {
    console.log(req.params);
    const { orderNumber } = req.params;
    try {
        // Find the order by orderNumber
        const order = await Order.findOne({ orderNumber });

        if (!order) {
            console.log('Order not found for orderNumber: ', orderNumber);
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'accepted';

        order.updatedAt = new Date();

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const rejectOrder = async (req, res) => {
    console.log(req.params);
    const { orderNumber } = req.params;
    try {
        // Find the order by orderNumber
        const order = await Order.findOne({ orderNumber });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'rejected'; 
        
        order.updatedAt = new Date();

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const completeOrder = async (req, res) => {
    const { orderNumber } = req.params;
    try {
        // Find the order by orderNumber
        const order = await Order.findOne({ orderNumber });

        if (!order || order.status !== 'accepted') {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'completed'; 
        
        order.updatedAt = new Date();

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getOrders = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        Order.find({ 
            restaurant_id: restaurantId, 
            status: ['pending', 'accepted']
        })
        .then(orders => {
            res.json({ orders }); // Send JSON response with orders array
        })
        .catch(error => {
            console.error(error);
        });

        res.status(200)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrderHistory = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        Order.find({ 
            restaurant_id: restaurantId, 
        })
        .then(orders => {
            res.json({ orders }); // Send JSON response with orders array
        })
        .catch(error => {
            console.error(error);
        });

        res.status(200)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export { deleteOrder };
export { createOrder };
export { rejectOrder };
export { acceptOrder };
export { completeOrder };
export { getOrders };
export { getOrderHistory };