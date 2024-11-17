import { AudienceSegment } from '../model/audience.model.js';
import { Customer } from '../model/customer.model.js';
import { asyncHandler } from '../utils/assynchandler.js';
import { ApiResponse } from '../utils/apiresponse.js';
import { ApiError } from '../utils/aperror.js';

// Create a new audience segment
const createSegment = asyncHandler(async (req, res) => {
  const { name, conditions } = req.body;

  if (!name || !conditions) {
    throw new ApiError(400, 'Name and conditions are required.');
  }

  // Create and save the new segment
  const segment = new AudienceSegment({ name, conditions });
  await segment.save(); 

  // Fetch customers based on the conditions stored in the segment
  const customers = await Customer.find(conditions); // Fetch customers

  // Return the segment details along with the customers and audience size
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        segment_id: segment._id,
        audience_size: customers.length, // Count of customers
        customers, // List of customers
      },
      'Audience segment created successfully'
    )
  );
});

// Get customers for a specific segment (External API)
const getSegmentCustomers = asyncHandler(async (req, res) => {
  const segmentId = req.params.id;

  if (!segmentId) {
    throw new ApiError(400, 'Segment ID is required.');
  }

  const segment = await AudienceSegment.findById(segmentId);
  if (!segment) {
    throw new ApiError(404, 'Segment not found');
  }

  const conditions = segment.conditions;

  // Validate conditions before querying customers
  if (typeof conditions !== 'object' || Array.isArray(conditions)) {
    throw new ApiError(400, 'Invalid segment conditions format.');
  }

  // Fetch the customers based on the conditions
  const customers = await Customer.find(conditions);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        audience_size: customers.length, // Customer count
        customers, // List of customers
      },
      'Customers retrieved successfully'
    )
  );
});

const getAllSegments = asyncHandler(async (req, res) => {
  const segments = await AudienceSegment.find({}); // Fetch all segments
  if (!segments || segments.length === 0) {
    throw new ApiError(404, 'No segments found');
  }

  return res.status(200).json(
    new ApiResponse(200, segments, 'Segments retrieved successfully')
  );
});

export { createSegment, getSegmentCustomers ,getAllSegments};
