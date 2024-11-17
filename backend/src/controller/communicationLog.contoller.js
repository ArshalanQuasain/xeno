import { CommunicationsLog } from '../model/communication.model.js' ;
import { asyncHandler } from '../utils/assynchandler.js';
import { ApiResponse } from '../utils/apiresponse.js';
import { ApiError } from '../utils/aperror.js';

// Create a communication log
const createCommunicationLog = asyncHandler(async (req, res) => {
  const { campaign_id, customer_id, status } = req.body;

  if (![campaign_id, customer_id, status].every(field => field && field.trim())) {
    throw new ApiError(400, 'All fields are required.');
  }

  try {
    const log = new CommunicationsLog({ campaign_id, customer_id, status });
    await log.save(); 
    return res.status(201).json(new ApiResponse(201, { logId: log._id }, 'Communication log created successfully'));
  } catch (err) {
    throw new ApiError(500, err.message); // Handle internal errors
  }
});

export { createCommunicationLog };
