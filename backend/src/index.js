import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: './.env',
});

connectDB().catch((err) => {
    console.error("MONGODB CONNECTION FAILED!", err);
});

export default app;
