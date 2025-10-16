import { z } from "zod";

export const updateProfileDTOSchema = z.object({
    avatar: z.string().url("Invalid URL format.").optional().nullable(),
    
    // Mentor specific fields
    designation: z.string().max(100).optional().nullable(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional().nullable(),
    skills: z.array(z.string()).optional(),
    experience: z.number().positive("Experience must be a positive number.").optional().nullable(),
    availability: z.string().max(200).optional().nullable(),
    sessionFee: z.number().min(0, "Fee cannot be negative.").optional().nullable(),

    // Mentee specific fields
    goals: z.array(z.string()).optional(),

    // Common fields
    interests: z.array(z.string()).optional(),

}).partial(); // .partial() makes all fields in the object optional.

export type UpdateProfileDTO = z.infer<typeof updateProfileDTOSchema>;