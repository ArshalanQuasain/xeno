import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

const app = express () ;

dotenv.config();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


// Enable CORS
app.use(cors({
  origin: '*', // Allow specific origin (frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true, // Allow cookies or auth headers
}));


// Security Headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none'); // Update for compatibility during development
  next();
});


import campaignRoutes from './routes/campaign.routes.js'
import customerRoutes from './routes/customer.routes.js';
import orderRoutes from './routes/order.routes.js';
import segmentRoutes from './routes/segment.routes.js';
import communicationLogRoutes from './routes/communicatinLog.route.js';
import authRoutes from './routes/auth.routes.js';

app.use('/api/campaign', campaignRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/segment', segmentRoutes);
app.use('/api/communication_log', communicationLogRoutes);
app.use('/api/auth', authRoutes);

export default app;
