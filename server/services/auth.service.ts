import { IUser } from "../models/user.model";
import { AuthRepository } from "../repositories/auth.repository";
import { generateAccessToken, generateRefreshToken, hashPassword, passwordCompare, verifyRefreshToken } from "../utils/token.util";
import { LoginDTO, RegisterDTO, ResetPasswordDTO } from "../dtos/auth.dto";
import crypto from "crypto";
import transporter from "../config/nodemailer-setup";
import { getMailOption } from "../utils/mailer.util";
import { RESET_PASSWORD_EMAIL_TEMPLATE } from "../constants/emailTemplates";

export class AuthService {
    private authRepository = new AuthRepository();

    async register(userData: RegisterDTO): Promise<IUser> {
        const existingUser = await this.authRepository.findByEmail(userData.email!);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashPass = await hashPassword(userData.password);
        const newUserData = {
            name: userData.name,
            email: userData.email,
            password: hashPass,
            role: userData.role,
            countryCode: userData.countryCode,
            phoneNumber: userData.phoneNumber
        }
        const user = await this.authRepository.create(newUserData);
        return user;
    }

    async login({ email, password }: LoginDTO) {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordMatch = await passwordCompare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Wrong Password");
        }

        const payload = {
            userId: user._id as string,
            role: user.role
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return { accessToken, refreshToken, user };
    }

    async forgotPassword(email: string) {
        const user = await this.authRepository.findByEmail(email);

        if (user) {
            const rawToken = crypto.randomBytes(32).toString("hex");
            const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
            const expiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

            await this.authRepository.storeResetToken(email, hashedToken, expiry);

            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const resetLink = `${frontendUrl}/auth/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

            const destination = user.email;
            const source = `"MentorLink Support" <${process.env.SMTP_USER}>`;
            const subject = "Password Reset Link";
            const htmlContent = RESET_PASSWORD_EMAIL_TEMPLATE(user.name, resetLink);

            await transporter.sendMail(getMailOption(source, destination, subject, htmlContent));
        }

        // CHANGE: Always return the same generic message, regardless of whether the user was found
        return "If the email exists, a password reset link has been sent.";
    }

    async resetPassword({ email, token, newPassword }: ResetPasswordDTO) {
        const user = await this.authRepository.findByEmail(email);

        if (!user || !user.resetToken) {
            throw new Error("Invalid or expired reset link");
        }

        const hashToken = crypto.createHash("sha256").update(token).digest('hex');
        console.log('hashToken:', hashToken);
        console.log('user reset token:', user.resetToken);

        if (hashToken !== user.resetToken) throw new Error("Invalid token");
        if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) throw new Error("Token Expired");
        if (user.resetTokenUsed) throw new Error("Token already used");

        const hashedPassword = await hashPassword(newPassword);
        await this.authRepository.updatePasswordAfterReset(email, hashedPassword);

        return "Password has been reset successfully.";
    }

    async refreshAccessToken(refreshToken: string) {
        const decoded = verifyRefreshToken(refreshToken);

        if (typeof decoded === 'string' || !decoded.userId) {
            throw new Error("Invalid refresh token payload");
        }

        const user = await this.authRepository.findById(decoded.userId);

        if (!user) throw new Error("User not found");

        const payload = {
            userId: user._id as string,
            role: user.role
        };

        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    async getUserProfile(userId: string) {
        const user = await this.authRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const { ...userProfile } = user.toObject();
        return userProfile;
    }
}