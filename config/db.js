import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URL = process.env.MONGO_URL;

async function connectToDatabase() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB: ", error);
        throw error;
    }
}

export {connectToDatabase};