import React, { useState, useEffect } from 'react';
import { api } from '../api/api';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    amount: '',
  });
  const [customers, setCustomers] = useState([]); // List of customers
  const [orders, setOrders] = useState([]); // List of last 10 orders
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedOrder, setSelectedOrder] = useState(null); // Selected order for details

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch customers and orders from the API
  const fetchData = async () => {
    try {
      const [customerResponse, orderResponse] = await Promise.all([
        api.customer.getAll(),
        api.order.getLastTen(),
      ]);
  
      console.log('Customer Response:', customerResponse.data);
  
      // Extract customers (ensure it's an array)
      const customersArray = customerResponse.data.data || []; // Use customerResponse.data directly

      if (Array.isArray(customersArray)) {
        setCustomers(customersArray);
      } else {
        console.error('Unexpected customers data format:', customersArray);
        setCustomers([]);
      }
  
      // Extract orders (ensure it's an array)
      const ordersArray = orderResponse.data?.data || [];
      if (Array.isArray(ordersArray)) {
        setOrders(ordersArray);
      } else {
        console.error('Unexpected orders data format:', ordersArray);
        setOrders([]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to fetch data. Please check your connection.');
    }
  };
  

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.order.create(formData);
      alert('Order created successfully!');
      setFormData({ customer_id: '', amount: '' });
      fetchData(); // Refresh orders
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  // Handle viewing detailed order information
  const handleViewOrderDetails = (order) => {
    const customer = customers.find((cust) => cust._id === order.customer_id);
    setSelectedOrder({ ...order, customer });
  };

  return (
    <div className="p-4 bg-white shadow rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Order</h2>

      {/* Order Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Customer</label>
          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Customer</option>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name} ({customer.email})
                </option>
              ))
            ) : (
              <option disabled>No customers available</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Order'}
        </button>
      </form>
      {/* Detailed Order View */}
      {selectedOrder && (
        <div className="mt-6 p-4 bg-gray-100 rounded border">
          <h3 className="text-lg font-bold">Order Details</h3>
          <p>
            <strong>Order ID:</strong> {selectedOrder._id}
          </p>
          <p>
            <strong>Customer:</strong>{' '}
            {selectedOrder.customer ? selectedOrder.customer.name : 'Unknown Customer'}
          </p>
          <p>
            <strong>Amount:</strong> ${selectedOrder.amount}
          </p>
          <p>
            <strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}
          </p>
          {selectedOrder.customer && (
            <>
              <p>
                <strong>Email:</strong> {selectedOrder.customer.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.customer.phone}
              </p>
              <p>
                <strong>Total Spending:</strong> ${selectedOrder.customer.total_spending}
              </p>
            </>
          )}
        </div>
      )}
      {/* Last 10 Orders Section */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Last 10 Orders</h3>
        {orders.length > 0 ? (
          <ul className="space-y-2">
            {orders.map((order) => {
              const customer = customers.find((cust) => cust._id === order.customer_id);
              return (
                <li
                  key={order._id}
                  className="p-3 bg-gray-100 rounded border border-gray-300 flex justify-between"
                >
                  <div>
                    <p className="font-medium">Order ID: {order._id}</p>
                    <p>Customer: {customer ? customer.name : 'Unknown Customer'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount: ${order.amount}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleViewOrderDetails(order)}
                      className="mt-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-600">No orders found.</p>
        )}
      </div>


    </div>
  );
};

export default OrderForm;
