// enhancing a resume's professional summary

import ai from "../configs/ai.js";
import Resume from "../models/resume.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js"

// POST: /api/ai/enhance-pro-summary
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return errorResponse(res, 400, "Missing Required fields");
        }

        const aiResponse = await ai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                {
                    role: "system", content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume.The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives.Make it compelling and ATS- friendly.and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })
        const enhancedContent = aiResponse.choices[0].message.content
        return successResponse(res, 200, "Professional Summary Enhanced Successfully!", enhancedContent);
    } catch (error) {
        return errorResponse(res, 400, error.message, error);
    }
}

// POST : /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return errorResponse(res, 400, "Missing Required fields");
        }

        const aiResponse = await ai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume.The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements.Use action verbs and quantifiable results where possible.Make it ATS- friendly.and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })
        const enhancedContent = aiResponse.choices[0].message.content
        return successResponse(res, 200, "Job Description Enhanced successfull!", enhancedContent);
    } catch (error) {
        return errorResponse(res, 400, error.message, error);
    }
}

// POST : /api/ai/enhance-project-desc
export const enhanceProjectDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return errorResponse(res, 400, "Missing Required fields");
        }

        const aiResponse = await ai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance project descriptions for resumes. Keep descriptions crisp, concise, and impactful (2-3 sentences max). Highlight key technologies used, your role, and measurable outcomes. Make it ATS-friendly. Return only the enhanced text, nothing else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })
        const enhancedContent = aiResponse.choices[0].message.content
        return successResponse(res, 200, "Project Description Enhanced!", enhancedContent);
    } catch (error) {
        return errorResponse(res, 400, error.message, error);
    }
}

// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return errorResponse(res, 400, "Missing Required fields");
        }

        const systemPrompt = "You are an expert Ai Agent to exact data from resume."
        const userPrompt = `extract data from this resume : ${resumeText}
        
        Provide data in the following JSON format with no additional text before or after:
        {
            professional_summary: { type: String, default: '' },
            skills: [{ type: String }],
            personal_info: {
                image: { type: String, default: '' },
                full_name: { type: String, default: '' },
                profession: { type: String, default: '' },
                email: { type: String, default: '' },
                phone: { type: String, default: '' },
                location: { type: String, default: '' },
                linkedin: { type: String, default: '' },
                website: { type: String, default: '' }
            },
            experience: [
                {
                    company: { type: String },
                    position: { type: String },
                    start_date: { type: String },
                    end_date: { type: String },
                    description: { type: String },
                    is_current: { type: Boolean },
                }
            ],
            project: [
                {
                    name: { type: String },
                    type: { type: String },
                    description: { type: String },
                }
            ],
            education: [
                {
                    institution: { type: String },
                    degree: { type: String },
                    field: { type: String },
                    graduation_date: { type: String },
                    gpa: { type: String },
                }
            ],
        }
        
        `
        const aiResponse = await ai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: { type: "json_object" }
        })
        const extractedData = aiResponse.choices[0].message.content
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({ userId, title, ...parsedData })
        return successResponse(res, 200, "Resume Uploaded Successfully", { resumeId: newResume._id });
    } catch (error) {
        return errorResponse(res, 400, error.message, error);
    }
}