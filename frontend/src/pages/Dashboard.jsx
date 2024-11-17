import React, { useState, useEffect } from 'react';

import {api} from '../api/api.js'

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [segmentCount, setSegmentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer count
        const customersResponse = await api.customer.getAll();
        setCustomerCount(customersResponse.data.data.length || 0);
    
        // Fetch recent orders
        const ordersResponse = await api.order.getLastTen();
        setRecentOrders(ordersResponse.data.data || []);
    
        // Fetch active campaigns
        const campaignsResponse = await api.campaign.getAll();
        
        // Get the length of the campaigns array
        setActiveCampaigns(campaignsResponse.data.data.campaigns || []);
    
        // Fetch segment count
        const segmentsResponse = await api.segment.getAll();
        setSegmentCount(segmentsResponse.data.data.length || 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchData();
    

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Customers Count */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Customers</h2>
            <p className="text-4xl font-bold text-blue-600">{customerCount}</p>
            <p className="text-gray-600">Total Customers</p>
          </div>

          {/* Segments Count */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Segments</h2>
            <p className="text-4xl font-bold text-blue-600">{segmentCount}</p>
            <p className="text-gray-600">Customer Segments</p>
          </div>

          {/* Active Campaigns Count */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Active Campaigns</h2>
            <p className="text-4xl font-bold text-blue-600">{activeCampaigns.length}</p>
            <p className="text-gray-600">Campaigns Running</p>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <p className="text-4xl font-bold text-blue-600">{recentOrders.length}</p>
            <p className="text-gray-600">Orders in Last 10</p>
          </div>
        </div>

        {/* Detailed Data */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          {recentOrders.length > 0 ? (
            <ul className="bg-white p-4 rounded shadow divide-y">
              {recentOrders.map((order) => (
                <li key={order._id} className="py-2 flex justify-between">
                  <div>
                    <p className="font-bold">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-600">
                      Customer: {order.customer_id?.name || 'Unknown'}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800">${order.amount}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No recent orders found.</p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Active Campaigns</h2>
          {activeCampaigns.length > 0 ? (
            <ul className="bg-white p-4 rounded shadow divide-y">
              {activeCampaigns.map((campaign) => (
                <li key={campaign._id} className="py-2">
                  <p className="font-bold">{campaign.name}</p>
                  <p className="text-sm text-gray-600">{campaign.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No active campaigns found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
