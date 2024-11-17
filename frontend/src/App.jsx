import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './component/ProtectedRoute';
import Header from './component/Header';
import CustomerForm from './component/CustomerForm';
import SegmentForm from './component/SegmentForm';
import OrderForm from './component/OrderForm';
import CampaignForm from './component/CampaignForm';
import Dashboard from './pages/Dashboard'

const App = () => (
  <div>
    <Header />
    <Routes>
      {/* Login Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes for Dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-100">
              <div className="container mx-auto p-6">
                <Routes>
                  <Route path='/' element={<Dashboard/>}></Route>
                  <Route path="/add-customer" element={<CustomerForm />} />
                  <Route path="/segments" element={<SegmentForm />} />
                  <Route path="/orders" element={<OrderForm />} />
                  <Route path="/campaigns" element={<CampaignForm />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  </div>
);

export default App;
