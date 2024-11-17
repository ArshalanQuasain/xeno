// src/components/Customer/CustomerForm.jsx
import React, { useState } from 'react';
import { api } from '../api/api';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    total_spending: 0,
    visits: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.customer.create(formData);
      alert('Customer added successfully!');
      setFormData({ name: '', email: '', phone: '', total_spending: 0, visits: 0 });
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer.');
    }
  };

  return (
    <form className="p-4 bg-white shadow rounded-md max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add Customer</h2>
      {['name', 'email', 'phone'].map((field) => (
        <div key={field} className="mb-4">
          <label className="block mb-1 text-sm font-medium capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
        Add Customer
      </button>
    </form>
  );
};

export default CustomerForm;
