import { Router } from 'express';
import { createCustomer, getAllCustomers } from '../controller/customer.controller.js';

const router = Router();

// Route for creating a new customer
router.post('/', createCustomer);
router.get ('/' , getAllCustomers)

export default router;
