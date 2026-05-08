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
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
await connectDB();
app.get("/", (req, res) => {
    res.send("API running...");
});

// route middleware for users
app.use("/api/users", userRouter)
app.use("/api/resumes", resumeRouter)
app.use("/api/ai", aiRouter)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});