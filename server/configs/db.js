import mongoose from "mongoose";



const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connection established.");
        });
        let mongoURI = process.env.MONGO_URI;

        // console.log("MONGO_URI:", mongoURI); // Debugging line to check the value of MONGO_URI
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in environment variables.");
        }


        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}


export default connectDB;