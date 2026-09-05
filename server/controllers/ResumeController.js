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
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        if (!resumeData) {
            return errorResponse(res, 400, "Resume data is required");
        }

        let resumeDataCopy;
        if (typeof resumeData === "string") {
            try {
                resumeDataCopy = JSON.parse(resumeData);
            } catch (parseErr) {
                return errorResponse(res, 400, "Invalid JSON in resumeData");
            }
        } else {
            resumeDataCopy = { ...resumeData };
        }

        const targetId = resumeId || (resumeDataCopy && resumeDataCopy._id);

        if (!targetId) {
            return errorResponse(res, 400, "Resume ID is required");
        }

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);

            let transformation = 'w-300,h-300,c-maintain';
            if (removeBackground === 'yes' || removeBackground === true) {
                transformation += ',e-bgremove';
            }
            transformation += ',fo-face,z-0.75';

            try {
                const uploadFn = (imagekit.files && typeof imagekit.files.upload === 'function')
                    ? imagekit.files.upload.bind(imagekit.files)
                    : (typeof imagekit.upload === 'function' ? imagekit.upload.bind(imagekit) : null);

                if (!uploadFn) {
                    throw new Error("ImageKit upload function is not available on ImageKit SDK instance");
                }

                const response = await uploadFn({
                    file: imageBufferData,
                    fileName: `resume-${Date.now()}.png`,
                    folder: 'user-resumes',
                    transformation: {
                        pre: transformation
                    }
                });
                if (resumeDataCopy.personal_info) {
                    resumeDataCopy.personal_info.image = response.url;
                }
            } catch (imgErr) {
                console.error("ImageKit upload error:", imgErr);
            }
        }

        const resume = await Resume.findOneAndUpdate(
            { _id: targetId, userId },
            resumeDataCopy,
            { new: true }
        );

        if (!resume) {
            return errorResponse(res, 404, "Resume not found or unauthorized!");
        }

        return successResponse(res, 200, "Resume Updated Successfully!", { resume });
    }
    catch (error) {
        console.error("Update Resume Error:", error);
        return errorResponse(res, 400, "Failed to update resume", error.message || error);
    }
}

// Update Resume Title
// PUT: /api/resumes/update-title/:resumeId
export const updateResumeTitle = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        const { title } = req.body;

        if (!title) {
            return errorResponse(res, 400, "Title is required");
        }

        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            { title },
            { new: true }
        );

        if (!resume) {
            return errorResponse(res, 404, "Resume not found!");
        }

        return successResponse(res, 200, "Resume title updated successfully!", { resume });
    } catch (error) {
        return errorResponse(res, 400, "Failed to update resume title", error);
    }
}