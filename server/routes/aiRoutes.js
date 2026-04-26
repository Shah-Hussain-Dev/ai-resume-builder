import express from "express"
import protect from "../middlewares/middleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary } from "../controllers/AiController.js";
import { updateResume } from "../controllers/ResumeController.js";

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription)
aiRouter.post('/upload-resume', protect, updateResume)


export default aiRouter