import mongoose from "mongoose";

export const connectToDB = async () => {
    const mongo_uri = process.env.MONGO_URI;

    if (!mongo_uri) {
        console.error("❌ MONGO_URI is not defined in your .env file");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongo_uri);
        console.log(`✅ Connected to database`);
    } catch (error) {
        console.log(`❌ Failed to connect to database`, error);
        process.exit(1);
    }
}