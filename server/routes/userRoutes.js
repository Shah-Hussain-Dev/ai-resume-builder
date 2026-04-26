import express from "express";
import { getProfile, getUserResume, login, register } from "../controllers/UserController.js";
import protect from "../middlewares/middleware.js";




const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/data", protect, getProfile)
userRouter.post("/resumes", protect, getUserResume)



export default userRouter
