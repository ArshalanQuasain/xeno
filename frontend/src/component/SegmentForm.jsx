import React, { useState, useEffect } from 'react';
import { api } from '../api/api';

const SegmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    conditions: '',
  });
  const [segments, setSegments] = useState([]);
  const [allSegments, setAllSegments] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Fetch existing segments when the component mounts
  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      const response = await api.segment.getAll();
      console.log('Segment Response:', response.data); // Debugging
      const segmentArray = response.data.data; // Extract segments from API response
      if (Array.isArray(segmentArray)) {
        setSegments(segmentArray);
      } else {
        console.error('Unexpected segments data:', segmentArray);
        setSegments([]);
      }
    } catch (error) {
      console.error('Failed to fetch segments:', error);
      alert('Failed to fetch segments');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSegment = {
        ...formData,
        conditions: JSON.parse(formData.conditions), // Parse JSON for conditions
      };
      const response = await api.segment.create(newSegment);
      alert('Segment created successfully');
      console.log(response.data);

      fetchSegments(); // Refresh segments
      setFormData({
        name: '',
        conditions: '',
      });
    } catch (error) {
      console.error('Failed to create segment:', error);
      alert('Failed to create segment');
    }
  };

  const handleShowAllSegments = async () => {
    try {
      const response = await api.segment.getAll();
      const allSegmentArray = response.data.data; 
      if (Array.isArray(allSegmentArray)) {
        setAllSegments(allSegmentArray);
      } else {
        console.error('Unexpected all segments data:', allSegmentArray);
        setAllSegments([]);
      }
    } catch (error) {
      console.error('Failed to fetch all segments:', error);
      alert('Failed to fetch all segments');
    }
  };

  const handleViewSegmentDetails = (segment) => {
    setSelectedSegment(segment);
  };

  return (
    <div className="p-4 bg-white shadow rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Segment</h2>

      {/* Segment Form */}
      <form onSubmit={handleSubmit}>
        {/* Segment Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Segment Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Segment Name"
          />
        </div>

        {/* Conditions Input (JSON) */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Conditions (JSON)</label>
          <textarea
            name="conditions"
            value={formData.conditions}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder='{"field": "value"}'
          />
        </div>

        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600">
          Create Segment
        </button>
      </form>

      <button
        onClick={handleShowAllSegments}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
      >
        Show All Segments
      </button>

      {/* Segment Details Section */}
      {selectedSegment && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Segment Details</h3>
          <p>
            <strong>Name:</strong> {selectedSegment.name}
          </p>
          <p>
            <strong>Conditions:</strong> {JSON.stringify(selectedSegment.conditions)}
          </p>
        </div>
      )}

      {/* Existing Segments Section */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Existing Segments</h3>
        {segments.length > 0 ? (
          <ul className="space-y-2">
            {segments.map((segment) => (
              <li
                key={segment._id}
                className="p-3 bg-gray-100 rounded border border-gray-300 flex justify-between"
              >
                <div>
                  <p className="font-medium">ID: {segment._id}</p>
                  <p className="font-medium">Name: {segment.name}</p>
                  <p>Conditions: {JSON.stringify(segment.conditions)}</p>
                </div>
                <button
                  onClick={() => handleViewSegmentDetails(segment)}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No segments found.</p>
        )}
      </div>
    </div>
  );
};

export default SegmentForm;
