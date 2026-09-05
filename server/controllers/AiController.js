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

// POST: /api/ai/ats-score
export const generateAtsScore = async (req, res) => {
    try {
        const { resumeData, resumeText, jobDescription, jobTitle } = req.body;

        if (!resumeData && !resumeText) {
            return errorResponse(res, 400, "Missing required resume content");
        }

        if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY.trim()) {
            return errorResponse(res, 400, "GEMINI_API_KEY is missing in server/.env file");
        }

        let formattedResume = "";
        if (typeof resumeText === "string" && resumeText.trim()) {
            formattedResume = resumeText.trim();
        } else if (typeof resumeData === "object") {
            const pInfo = resumeData.personal_info || {};
            const expList = (resumeData.experience || []).map(e => `- ${e.position || ''} at ${e.company || ''} (${e.start_date || ''} - ${e.end_date || 'Present'}): ${e.description || ''}`).join("\n");
            const eduList = (resumeData.education || []).map(e => `- ${e.degree || ''} in ${e.field || ''} from ${e.institution || ''} (${e.graduation_date || ''})`).join("\n");
            const projList = (resumeData.projects || resumeData.project || []).map(p => `- ${p.name || ''}: ${p.description || ''}`).join("\n");
            const skillsList = Array.isArray(resumeData.skills) ? resumeData.skills.join(", ") : (resumeData.skills || "");

            formattedResume = `
Name: ${pInfo.full_name || ''}
Profession / Title: ${pInfo.profession || ''}
Email: ${pInfo.email || ''} | Phone: ${pInfo.phone || ''} | Location: ${pInfo.location || ''}
Professional Summary: ${resumeData.professional_summary || ''}
Skills: ${skillsList}

Work Experience:
${expList}

Education:
${eduList}

Projects:
${projList}
            `.trim();
        } else if (typeof resumeData === "string") {
            formattedResume = resumeData;
        }

        const systemPrompt = `You are a world-class Talent Acquisition Specialist and Applicant Tracking System (ATS) optimization expert. Your task is to evaluate a candidate's resume against best ATS practices and (if provided) a specific target Job Description / Job Title. Analyze keyword density, section structure, action verbs, measurable impact (quantifiable metrics), formatting readiness, and skills alignment.`;

        const targetContext = (jobDescription && jobDescription.trim()) || (jobTitle && jobTitle.trim())
            ? `Target Job Title: ${jobTitle || 'Not specified'}\nTarget Job Description:\n${jobDescription || 'N/A'}` 
            : `Target Role: General Tech & Software Industry ATS Standards (No specific job description provided, perform comprehensive general ATS quality audit).`;

        const userPrompt = `Evaluate the following resume and return ONLY a valid JSON object without markdown formatting.

RESUME CONTENT:
${formattedResume}

TARGET CONTEXT:
${targetContext}

Return JSON with this exact structure:
{
    "overallScore": 85,
    "scoreBreakdown": {
        "formatting": 90,
        "keywordMatch": 80,
        "experienceImpact": 85,
        "skillsRelevance": 90,
        "sectionCompleteness": 88
    },
    "summary": "Executive summary of ATS readiness and key strengths/gaps in 2-3 sentences.",
    "matchedKeywords": ["React", "Node.js", "TypeScript", "REST APIs"],
    "missingKeywords": ["GraphQL", "Docker", "CI/CD", "AWS"],
    "strengths": [
        "Clear quantifiable achievements in experience section",
        "Strong professional summary highlighting key technical stack"
    ],
    "weaknesses": [
        "Missing cloud infrastructure keywords (e.g. AWS/GCP)",
        "Some bullet points lack measurable metrics"
    ],
    "suggestions": [
        {
            "priority": "high",
            "category": "Keywords",
            "recommendation": "Incorporate keywords like AWS, Docker, and CI/CD into your skills or experience sections."
        },
        {
            "priority": "medium",
            "category": "Experience Impact",
            "recommendation": "Add quantifiable results to your project bullet points."
        }
    ]
}`;

        let aiResultText = await getAiResponseText(systemPrompt, userPrompt, true);
        aiResultText = aiResultText.replace(/```json\s*|\s*```/g, "").trim();

        let parsedScore = {};
        try {
            parsedScore = JSON.parse(aiResultText);
        } catch (parseError) {
            console.error("Failed to parse ATS JSON response:", parseError, aiResultText);
            throw new Error("Failed to parse structured ATS score response from AI");
        }

        return successResponse(res, 200, "ATS Score generated successfully", parsedScore);
    } catch (error) {
        console.error("Generate ATS Score Error:", error);
        return errorResponse(res, 400, error.message || "ATS Score generation failed", error);
    }
};