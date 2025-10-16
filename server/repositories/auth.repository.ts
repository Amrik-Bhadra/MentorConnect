import User, { IUser } from "../models/user.model";
import { IAuthRepository } from "../interfaces/IAuthRepository";

export class AuthRepository implements IAuthRepository {
    async create(user: Partial<IUser>): Promise<IUser> {
        const newUser = new User(user);
        return await newUser.save();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).exec();
    }

    async findById(id: string): Promise<IUser | null> {
        return await User.findById(id).exec();
    }

    async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async delete(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id).exec();
    }

    async storeResetToken(email: string, hashedToken: string, expiry: Date) {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { resetToken: hashedToken, resetTokenExpiry: expiry, resetTokenUsed: false },
            { new: true }
        );

        return updatedUser;
    }

    async updatePasswordAfterReset(email: string, newPassword: string) {
        return await User.findOneAndUpdate(
            { email },
            {
                password: newPassword,
                resetToken: null,
                resetTokenExpiry: null,
                resetTokenUsed: true
            },
            { new: true }
        );
    }
}