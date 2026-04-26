import mongoose from "mongoose";
import Resume from "../models/resume.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import imagekit from "../configs/imagekit.js";
import fs from "fs"



// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        // get the userId from token the middleware 
        const userId = req.userId;
        const { title } = req.body;
        const newResume = await Resume.create({
            userId, title
        })
        return successResponse(res, 200, "Resume Created Successfully!", { resume: newResume });
    } catch (error) {
        return errorResponse(res, 400, "Failed to retrieve reusme", error);

    }
}

// Delete Resume
// DELETE : /api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        // get the userId from token the middleware 
        const userId = req.userId;
        const { resumeId } = req.params;
        await Resume.findOneAndDelete({ userId, _id: resumeId })
        return successResponse(res, 200, "Resume Deleted  Successfully!");
    } catch (error) {
        return errorResponse(res, 400, "Failed to retrieve reusme", error);

    }
}

// get User Resume by Id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        // get the userId from token the middleware 
        const userId = req.userId;
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ userId, _id: resumeId })
        if (!resume) {
            return errorResponse(res, 404, "Resume not found!");

        }
        return successResponse(res, 200, "Resume fetch  Successfully!", { resume });
    } catch (error) {
        return errorResponse(res, 400, "Failed to retrieve reusme", error);

    }
}

// get User Resume by Id public
// GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId })
        if (!resume) {
            return errorResponse(res, 404, "Resume not found!");

        }
        return successResponse(res, 200, "Resume fetch  Successfully!", { resume });
    } catch (error) {
        return errorResponse(res, 400, "Failed to retrieve reusme", error);

    }
}


// Update Resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body
        const image = req.file;
        if (image) {
            const imageBufferData = fs.createReadStream(image.path)
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300,h-300, fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url
        }
        let resumeDataCopy = JSON.parse(resumeData);
        const resume = await Resume.findByIdAndUpdate({ userId, _id: resumeId },
            resumeDataCopy, { new: true })
        return successResponse(res, 200, "Resume fetch  Successfully!", { resume });
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}