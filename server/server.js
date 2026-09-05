import 'dotenv/config';

import dns from "node:dns/promises";
import cors from "cors";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from './routes/aiRoutes.js';
const app = express();
// Connect database

app.use(express.json());
const rawAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  process.env.CLIENT_URL
].filter(Boolean);

const allowedOrigins = rawAllowedOrigins.map(url => url.replace(/\/$/, ""));

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);

        const cleanOrigin = origin.replace(/\/$/, "");

        // Allow allowedOrigins, Netlify apps, or any localhost/127.0.0.1 port
        if (
            allowedOrigins.includes(cleanOrigin) ||
            /^https?:\/\/.*\.netlify\.app$/.test(cleanOrigin) ||
            /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(cleanOrigin)
        ) {
            return callback(null, true);
        }
        
        return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));
await connectDB();
app.get("/", (req, res) => {
    res.send("API running...");
});

// route middleware for users
app.use("/api/users", userRouter)
app.use("/api/resumes", resumeRouter)
app.use("/api/ai", aiRouter)



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});