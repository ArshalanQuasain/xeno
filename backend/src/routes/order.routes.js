import { Router } from 'express';
import { createOrder, getLastTenOrders, getAllOrders } from '../controller/order.controller.js';

const router = Router();

router.post('/', createOrder); // Create a new order
router.get('/last-10', getLastTenOrders); // Fetch last 10 orders
router.get('/', getAllOrders); // Fetch all orders

export default router;
