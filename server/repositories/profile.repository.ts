import { IProfileRepository } from "server/interfaces/IProfileRepository";
import User, { IUser } from "../models/user.model";
import { UpdateProfileDTO } from "server/dtos/profile.dto";

export class ProfileRepository implements IProfileRepository {
    async findById(userId: string): Promise<IUser | null> {
        return await User.findById(userId).select('-password').exec();
    }

    async updateById(userId: string, updateData: UpdateProfileDTO): Promise<IUser | null> {
        return await User.findByIdAndUpdate(userId, updateData, { new: true })
            .select('-password')
            .exec();
    }
}