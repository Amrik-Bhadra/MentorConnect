import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ProfileService } from "../services/profile.service";
import { ZodError } from "zod";
import { updateProfileDTOSchema } from "server/dtos/profile.dto";

export class ProfileController {
    private static profileService = new ProfileService();

    static async getMyProfile(req: Request, res: Response) {
        try {
            const userId = (req.user as JwtPayload)?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const userProfile = await ProfileController.profileService.getProfile(userId);
            return res.status(200).json(userProfile);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server error" });
        }
    }

    static async updateMyProfile(req: Request, res: Response) {
        try {
            const userId = (req.user as JwtPayload)?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // 2. Validate the request body using the Zod schema
            const validatedData = updateProfileDTOSchema.parse(req.body);

            const updatedProfile = await ProfileController.profileService.updateProfile(userId, validatedData);
            return res.status(200).json(updatedProfile);

        } catch (error) {
            // 3. Handle validation errors
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: error.flatten().fieldErrors
                });
            }
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}