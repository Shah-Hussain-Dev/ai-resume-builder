// enhancing a resume's professional summary

import { generateGeminiContent, getAiClient } from "../configs/ai.js";
import Resume from "../models/resume.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

const getAiResponseText = async (systemPrompt, userPrompt, jsonMode = false) => {
    return await generateGeminiContent(systemPrompt, userPrompt, jsonMode);
};

// POST: /api/ai/enhance-pro-summary
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return errorResponse(res, 400, "Missing required userContent field");
        }

        if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY.trim()) {
            return errorResponse(res, 400, "GEMINI_API_KEY is missing in server/.env file");
        }

        const systemPrompt = "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Return only the enhanced text, nothing else.";
        const enhancedContent = await getAiResponseText(systemPrompt, userContent, false);
        return successResponse(res, 200, "Professional Summary Enhanced Successfully!", enhancedContent);
    } catch (error) {
        console.error("Enhance Summary Error:", error);
        return errorResponse(res, 400, error.message || "AI Enhancement failed", error);
    }
};

// POST : /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return errorResponse(res, 400, "Missing required userContent field");
        }

        if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY.trim()) {
            return errorResponse(res, 400, "GEMINI_API_KEY is missing in server/.env file");
        }

        const systemPrompt = "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences highlighting key responsibilities and achievements. Use action verbs and quantifiable results. Make it ATS-friendly. Return only the text.";
        const enhancedContent = await getAiResponseText(systemPrompt, userContent, false);
        return successResponse(res, 200, "Job Description Enhanced successfully!", enhancedContent);
    } catch (error) {
        console.error("Enhance Job Error:", error);
        return errorResponse(res, 400, error.message || "AI Enhancement failed", error);
    }
};

// POST : /api/ai/enhance-project-desc
export const enhanceProjectDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return errorResponse(res, 400, "Missing required userContent field");
        }

        if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY.trim()) {
            return errorResponse(res, 400, "GEMINI_API_KEY is missing in server/.env file");
        }

        const systemPrompt = "You are an expert in resume writing. Your task is to enhance project descriptions for resumes. Keep descriptions crisp, concise, and impactful (2-3 sentences max). Highlight key technologies used, your role, and measurable outcomes. Make it ATS-friendly. Return only the enhanced text.";
        const enhancedContent = await getAiResponseText(systemPrompt, userContent, false);
        return successResponse(res, 200, "Project Description Enhanced!", enhancedContent);
    } catch (error) {
        console.error("Enhance Project Error:", error);
        return errorResponse(res, 400, error.message || "AI Enhancement failed", error);
    }
};

// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return errorResponse(res, 400, "Missing required resumeText field");
        }

        if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY.trim()) {
            return errorResponse(res, 400, "GEMINI_API_KEY is missing in server/.env file");
        }

        const systemPrompt = "You are an expert AI agent that extracts structured resume data.";
        const userPrompt = `Extract structured resume data from the following text and respond ONLY in valid JSON format:

${resumeText}

Format JSON strictly as:
{
    "professional_summary": "Summary string here",
    "skills": ["Skill 1", "Skill 2"],
    "personal_info": {
        "full_name": "",
        "profession": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "website": ""
    },
    "experience": [
        {
            "company": "",
            "position": "",
            "start_date": "",
            "end_date": "",
            "description": "",
            "is_current": false
        }
    ],
    "project": [
        {
            "name": "",
            "type": "",
            "description": ""
        }
    ],
    "education": [
        {
            "institution": "",
            "degree": "",
            "field": "",
            "graduation_date": "",
            "gpa": ""
        }
    ]
}`;

        let extractedData = await getAiResponseText(systemPrompt, userPrompt, true);
        extractedData = extractedData.replace(/```json\s*|\s*```/g, "").trim();
        let parsedData = {};
        try {
            parsedData = JSON.parse(extractedData);
        } catch (jsonErr) {
            console.error("JSON parse error from AI response:", jsonErr);
        }

        const newResume = await Resume.create({
            userId,
            title: title || "Uploaded Resume",
            ...parsedData
        });

        return successResponse(res, 200, "Resume Uploaded Successfully", { resumeId: newResume._id });
    } catch (error) {
        console.error("Upload Resume Error:", error);
        return errorResponse(res, 400, error.message || "AI Resume Upload Failed", error);
    }
};