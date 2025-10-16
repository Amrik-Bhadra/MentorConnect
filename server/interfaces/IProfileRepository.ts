import { UpdateProfileDTO } from "server/dtos/profile.dto";
import { IUser } from "server/models/user.model";

export interface IProfileRepository {
    findById(userId: string): Promise<IUser | null>;
    updateById(userId: string, updateData: UpdateProfileDTO): Promise<IUser | null>;
}