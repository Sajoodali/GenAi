import mongoose from "mongoose";


async function connectToDB() {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined. Make sure .env is loaded before connectToDB() is called.");
        }
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
}

export default connectToDB;