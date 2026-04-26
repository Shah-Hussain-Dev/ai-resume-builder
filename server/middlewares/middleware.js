import jwt from "jsonwebtoken";

// auth middleware 
const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return errorResponse(res, 401, "UnAuthorized ", error);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next()
    } catch (error) {
        return errorResponse(res, 401, "UnAuthorized ", error);
    }
}


export default protect;