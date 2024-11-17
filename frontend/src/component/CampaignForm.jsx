import React, { useState, useEffect } from 'react';
import { api } from '../api/api';

const CampaignForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [segmentId, setSegmentId] = useState('');
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState({}); // Track loading state for each campaign
  const [campaignSuccess, setCampaignSuccess] = useState({}); // Track success/failure for each campaign

  useEffect(() => {
    const fetchData = async () => {
      try {
        const segmentsResponse = await api.segment.getAll();
        setSegments(segmentsResponse.data.data || []);

        const campaignsResponse = await api.campaign.getAll();
        setActiveCampaigns(campaignsResponse.data.data.campaigns || []); 
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message || !segmentId) {
      setSuccess(false);
      return;
    }
    setLoading(true);

    try {
      await api.campaign.create({
        name,
        message,
        segment_id: segmentId,
      });
      setSuccess(true);
      setName('');
      setMessage('');
      setSegmentId('');

      // Refresh active campaigns
      const campaignsResponse = await api.campaign.getAll();
      setActiveCampaigns(campaignsResponse.data.data.campaigns || []); // Ensure campaigns is an array
    } catch (err) {
      console.error('Error creating campaign:', err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Send Message Functionality
  const handleSendMessage = async (campaignId) => {
    try {
      await api.campaign.sendMessages(campaignId); // Assuming sendMessages is the API call to send messages
      alert('Messages sent successfully!');
    } catch (err) {
      alert('Failed to send messages. Please try again.');
      console.error('Error sending messages:', err);
    }
  };



  // View Stats Functionality
  const handleViewStats = async (campaignId) => {
    try {
      const statsResponse = await api.campaign.getStats(campaignId); // Assuming getStats is the API call to get campaign stats
      alert(JSON.stringify(statsResponse.data, null, 2)); // Display stats as a JSON string for simplicity
    } catch (err) {
      console.error('Error fetching stats:', err);
      alert('Failed to fetch stats');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Campaign Name</label>
          <input
            type="text"
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter campaign name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter campaign message"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Segment</label>
          <select
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
            value={segmentId}
            onChange={(e) => setSegmentId(e.target.value)}
          >
            <option value="">Select a segment</option>
            {Array.isArray(segments) &&
              segments.map((segment) => (
                <option key={segment._id} value={segment._id}>
                  {segment.name}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Campaign'}
        </button>
      </form>
      {success === true && <div className="mt-4 text-green-600 font-medium">Campaign created successfully!</div>}
      {success === false && <div className="mt-4 text-red-600 font-medium">Error creating campaign. Please try again.</div>}

      {/* Display active campaigns */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Active Campaigns</h3>
        <div>
          {activeCampaigns.length === 0 ? (
            <p>No active campaigns yet.</p>
          ) : (
            activeCampaigns.map((campaign) => (
              <div key={campaign._id} className="border-b border-gray-300 py-2">
                <h4 className="font-bold">{campaign.name}</h4>
                <p>{campaign.message}</p>
                <div className="mt-2 space-x-4">
                  <button
                    onClick={() => handleSendMessage(campaign._id)}
                    className="text-blue-600 hover:underline"
                    disabled={loadingCampaigns[campaign._id]}
                  >
                    {loadingCampaigns[campaign._id] ? 'Sending...' : 'Send Message'}
                  </button>
                  {campaignSuccess[campaign._id] !== undefined && (
                    <span className={`ml-2 ${campaignSuccess[campaign._id] ? 'text-green-600' : 'text-red-600'}`}>
                      {campaignSuccess[campaign._id] ? 'Success' : 'Failed'}
                    </span>
                  )}
                  <button
                    onClick={() => handleViewStats(campaign._id)}
                    className="text-blue-600 hover:underline"
                  >
                    View Stats
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
