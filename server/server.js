import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
dotenv.config();
const app = express();
// Connect database

await connectDB();
app.get("/", (req, res) => {
    res.send("API running...");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});