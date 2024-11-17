import { asyncHandler } from '../utils/assynchandler.js';
import { ApiResponse } from '../utils/apiresponse.js';
import { ApiError } from '../utils/aperror.js';
import { Campaign } from '../model/campaign.model.js';
import { CommunicationsLog } from '../model/communication.model.js';
import { Customer } from '../model/customer.model.js';
import { AudienceSegment } from '../model/audience.model.js';

// Create a new campaign
export const createCampaign = asyncHandler(async (req, res) => {
  const { segment_id, name, message } = req.body;

  if (![segment_id, name, message].every(field => field && field.trim())) {
    throw new ApiError(400, 'All fields are required.');
  }

  const segmentExists = await AudienceSegment.findById(segment_id);
  if (!segmentExists) {
    throw new ApiError(400, 'Invalid segment ID provided.');
  }

  const campaign = new Campaign({ segment_id, name, message });
  await campaign.save();
  return res.status(201).json(new ApiResponse(201, { campaignId: campaign._id }, 'Campaign created successfully'));
});


export const sendCampaignMessages = asyncHandler(async (req, res) => {
  const { campaign_id } = req.body;

  if (!campaign_id) {
    throw new ApiError(400, 'Campaign ID is required');
  }

  const campaign = await Campaign.findById(campaign_id);
  if (!campaign) {
    throw new ApiError(404, 'Campaign not found');
  }

  const segment = await AudienceSegment.findById(campaign.segment_id);
  if (!segment) {
    throw new ApiError(404, 'Audience segment not found');
  }

  const customers = await Customer.find(segment.conditions);
  if (customers.length === 0) {
    throw new ApiError(404, 'No valid customers found');
  }

  const logs = customers.map(customer => ({
    insertOne: {
      document: {
        campaign_id,
        customer_id: customer._id,
        status: Math.random() < 0.9 ? 'SENT' : 'FAILED',
      },
    },
  }));
  await CommunicationsLog.bulkWrite(logs);

  return res.status(200).json(new ApiResponse(200, logs.length, 'Messages sent successfully'));
});

// Get campaign statistics
export const getCampaignStats = async (req, res) => {
  try {
    const logs = await CommunicationsLog.find({ campaign_id: req.params.campaignId });  // Get logs for the specified campaign
    const sent = logs.filter(log => log.status === 'SENT').length;  // Count successfully sent messages
    const failed = logs.filter(log => log.status === 'FAILED').length;  // Count failed messages

    // New API response format
    res.status(200).json({
      status: 'success',
      message: 'Campaign statistics retrieved successfully',
      data: {
        sent,
        failed
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
      data: null
    });
  }
};




// Get all campaigns
export const getAllCampaigns = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const campaigns = await Campaign.find()
    .populate('segment_id')
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Campaign.countDocuments();

  return res
    .status(200)
    .json(new ApiResponse(200, { campaigns, total, page, limit }, 'Campaigns retrieved successfully'));
});
