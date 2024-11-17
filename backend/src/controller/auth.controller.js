import { OAuth2Client } from 'google-auth-library';
import { User } from '../model/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new OAuth2Client(process.env.CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { token } = req.body;  // Frontend sends the token in request body
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID  // External API call: Verifies the token with Google OAuth2 API
    });
    
    const payload = ticket.getPayload();  // Decodes the token and retrieves user data from Google
    let user = await User.findOne({ email: payload.email });  // Check if user already exists in database
    if (!user) {
      user = new User({
        name: payload.name || "Unknown USER",
        email: payload.email,
        google_id: payload.sub,  // Stores Google ID for future reference
      });
      await user.save();  // Save the new user in the database
    }
    res.status(200).json({ message: 'Authentication successful', user });  // Return user info to frontend
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Invalid token' });  // Frontend handles token validation failure
  }
};

