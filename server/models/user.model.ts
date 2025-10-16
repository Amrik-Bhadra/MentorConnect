import { Schema, Document, model, models, Model } from "mongoose";
import { codes } from "../constants/countryTelephoneCodes";

export type UserRole = "mentor" | "mentee" | "admin";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    countryCode: string;
    phoneNumber: string;
    avatar?: string;

    resetToken: string,
    resetTokenExpiry: Date;
    resetTokenUsed: boolean;

    // Mentor-specific fields
    designation?: string;
    skills?: string[];
    experience?: number;
    bio?: string;
    isVerified?: boolean;    // NEW: For admin approval of mentors
    availability?: string;   // NEW: e.g., "Weekdays after 6 PM IST"
    sessionFee?: number;     // NEW: e.g., price per session in INR

    // mentee specific field
     goals?: string[];
    
    // Common fields
    interests?: string[];

    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], trim: true, unique: true, lowercase: true },
    password: { type: String, required: [true, "Password is required"] },
    role: { type: String, enum: ["mentor", "mentee"], required: [true, "Role is required"], trim: true, lowercase: true },
    countryCode: { type: String, enum: codes },
    phoneNumber: { type: String, required: [true, "Phone Number is required"], minlength: 10, maxlength: 15 },
    avatar: { type: String, default: "" },

    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    resetTokenUsed: { type: Boolean },

    // Mentor-specific optional fields
    designation: { type: String, default: "" },
    skills: { type: [String], default: [] },
    experience: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    isVerified: { type: Boolean, default: false }, // NEW
    availability: { type: String, default: "Not specified" }, // NEW
    sessionFee: { type: Number, default: 0 }, // NEW

    // Mentee-specific optional fields
    goals: { type: [String], default: [] }, // NEW

    // Common optional fields
    interests: { type: [String], default: [] },
}, { timestamps: true });

// Prevent recompilation error in watch mode
const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);
export default User;
