import express from 'express';
import { acceptOrder, rejectOrder, deleteOrder, createOrder, completeOrder, getOrderHistory} from '../controllers/order.js';
import { getOrders } from '../controllers/order.js';

const router = express.Router();

router.post('/create', createOrder);

// delete order by orderNumber
router.delete('/delete/:orderNumber', deleteOrder);

// route to accept an order by orderNumber for merchant
router.put('/accept/:orderNumber', acceptOrder);

router.put('/reject/:orderNumber', rejectOrder);

router.put('/complete/:orderNumber', completeOrder);

router.get('/history/:restaurantId', getOrderHistory);
router.get('/:restaurantId', getOrders);
export default router;
