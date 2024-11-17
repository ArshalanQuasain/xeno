import { Router } from 'express';
import {
  createSegment,
  getSegmentCustomers,
  getAllSegments, // Import the new controller function
} from '../controller/audienceSegment.controller.js';

const router = Router();

// Route to create a new audience segment
router.post('/', createSegment);

// Route to get all audience segments
router.get('/', getAllSegments);

// Route to get customers based on an audience segment's conditions
router.get('/:id', getSegmentCustomers);

export default router;
