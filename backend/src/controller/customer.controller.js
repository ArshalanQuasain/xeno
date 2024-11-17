import { Customer } from '../model/customer.model.js';
import { asyncHandler } from '../utils/assynchandler.js';
import { ApiResponse } from '../utils/apiresponse.js';
import { ApiError } from '../utils/aperror.js';

// Create a new customer
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone, total_spending = 0, visits = 0 } = req.body;

  // Validate required fields
  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    throw new ApiError(400, 'Name, email, and phone are required.');
  }

  // Check for duplicate email
  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) {
    throw new ApiError(400, 'A customer with this email already exists.');
  }

  try {
    // Create and save the customer
    const customer = await Customer.create({ name, email, phone, total_spending, visits });
    return res
      .status(201)
      .json(new ApiResponse(201, { customerId: customer._id }, 'Customer added successfully'));
  } catch (err) {
    throw new ApiError(500, `Internal server error: ${err.message}`);
  }
});

// Get all customers
const getAllCustomers = asyncHandler(async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 }); // Fetch all customers, sorted by creation date
    return res
      .status(200)
      .json(new ApiResponse(200, customers, 'Customers fetched successfully'));
  } catch (err) {
    throw new ApiError(500, `Internal server error: ${err.message}`);
  }
});

export { createCustomer, getAllCustomers };
