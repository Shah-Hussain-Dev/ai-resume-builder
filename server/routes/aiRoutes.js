import express from "express"
import protect from "../middlewares/middleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary, enhanceProjectDescription, generateAtsScore, uploadResume } from "../controllers/AiController.js";


const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription)
aiRouter.post('/enhance-project-desc', protect, enhanceProjectDescription)
aiRouter.post('/upload-resume', protect, uploadResume)
aiRouter.post('/ats-score', protect, generateAtsScore)


export default aiRouter