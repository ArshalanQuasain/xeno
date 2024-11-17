import { Router } from 'express';
import { createCommunicationLog } from '../controller/communicationLog.contoller.js';

const router = Router();

// Route for creating a communication log entry (to log the result of a campaign message sent to a customer)
router.post('/', createCommunicationLog); // Used by backend to log communication results after a campaign message is sent (SENT or FAILED)

export default router;
