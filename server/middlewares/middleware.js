import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler.js";

const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return errorResponse(res, 401, "Unauthorized");
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.userId = decoded.id;
        next()
    } catch (error) {
        return errorResponse(res, 401, "Unauthorized");
    }
}


export default protect;