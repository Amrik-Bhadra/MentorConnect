import { UpdateProfileDTO } from "server/dtos/profile.dto";
import { IUser } from "../models/user.model";
import { ProfileRepository } from "../repositories/profile.repository";

export class ProfileService {
    private profileRepository = new ProfileRepository();

    async getProfile(userId: string) {
        const user = await this.profileRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async updateProfile(userId: string, data: UpdateProfileDTO) {
        const updatedUser = await this.profileRepository.updateById(userId, data);
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    }
}