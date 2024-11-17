import { Order } from '../model/order.model.js';
import { Customer } from '../model/customer.model.js';
import { asyncHandler } from '../utils/assynchandler.js';
import { ApiResponse } from '../utils/apiresponse.js';
import { ApiError } from '../utils/aperror.js';

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const { customer_id, amount } = req.body;

  if (!customer_id || !amount) {
    throw new ApiError(400, 'Customer ID and amount are required.');
  }

  const order = new Order({ customer_id, amount });
  await order.save();

  // Update customer data
  await Customer.findByIdAndUpdate(customer_id, {
    $inc: { total_spending: amount },
    $set: { last_visit_date: new Date() },
  });

  return res.status(201).json(new ApiResponse(201, { orderId: order._id }, 'Order created successfully'));
});

// Get the last 10 orders
const getLastTenOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort({ created_at: -1 }) // Sort by latest
    .limit(10) // Fetch only 10 orders
    .populate('customer_id', 'name'); // Populate customer name

  return res.status(200).json(new ApiResponse(200, orders, 'Last 10 orders fetched successfully'));
});

// Get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('customer_id', 'name email'); // Populate customer details

  return res.status(200).json(new ApiResponse(200, orders, 'All orders fetched successfully'));
});

export { createOrder, getLastTenOrders, getAllOrders };
