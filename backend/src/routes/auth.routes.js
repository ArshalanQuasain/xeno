import express from 'express';
import { googleAuth } from '../controller/auth.controller.js';

const router = express.Router();

// Route for Google Authentication
router.post('/google', googleAuth); // Used by frontend to authenticate users using Google OAuth

export default router;
