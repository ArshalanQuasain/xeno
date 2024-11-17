import { Router } from 'express';
import { createCampaign , sendCampaignMessages , getCampaignStats, getAllCampaigns } from '../controller/campaign.controller.js';

const router = Router();

// Route for creating a campaign
router.post('/', createCampaign); // Used by frontend to create a new campaign with a segment and message
router.get('/', getAllCampaigns); // Used by frontend to create a new campaign with a segment and message

// Route for sending campaign messages to customers
router.post('/send_message', sendCampaignMessages); // Used by frontend to trigger the sending of messages to the campaign audience

// Route for getting campaign statistics (e.g., number of sent/failed messages)
router.get('/stats/:campaignId', getCampaignStats); // Used by frontend to get statistics of a particular campaign (successful and failed message counts)

export default router;
