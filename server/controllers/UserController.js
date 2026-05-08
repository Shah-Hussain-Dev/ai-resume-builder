import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import Resume from "../models/resume.js";

// Helper function to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// generate token function 


// Register a new user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return errorResponse(res, 400, "All fields are required");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse(res, 409, "Email already registered");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = generateToken(user._id);
        return successResponse(res, 201, "User registered successfully", { user: { id: user._id, name, email }, token });
    } catch (error) {
        return errorResponse(res, 500, "Registration failed", error);
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return errorResponse(res, 400, "Email and password are required");
        }
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            return errorResponse(res, 401, "Invalid credentials");
        }
        const token = generateToken(user._id);
        return successResponse(res, 200, "Login successful", { user: { id: user._id, name: user.name, email }, token });
    } catch (error) {
        return errorResponse(res, 500, "Login failed", error);
    }
};

// Get user profile
export const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return errorResponse(res, 404, "User not found");
        }
        return successResponse(res, 200, "Profile retrieved", user);
    } catch (error) {
        return errorResponse(res, 400, "Failed to retrieve profile", error);
    }
};




// Get users resume 
export const getUserResume = async (req, res) => {
    try {
        const userId = req.userId;
        // return resumes
        const resumes = await Resume.find({ userId })
        return successResponse(res, 200, "Resume Fetch Successfully", resumes);
    } catch (error) {
        return errorResponse(res, 400, "Failed to retrieve reusme", error);
    }

}