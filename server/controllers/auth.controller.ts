import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { loginDTOSchema, registerDTOSchema } from "../dtos/auth.dto";
import { ZodError } from "zod";
import { JwtPayload } from "jsonwebtoken";

export class AuthController {
    private static authService = new AuthService();

    // register controller
    static async register(req: Request, res: Response) {
        try {
            const validateData = registerDTOSchema.parse(req.body);
            const user = await AuthController.authService.register(validateData);
            console.log('Register user:', user);
            res.status(201).json({ message: 'Registration Successful!', data: user });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation failed", errors: error.flatten().fieldErrors });
            }
            console.log(error);

            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // login controller
    static async login(req: Request, res: Response) {
        try {
            const validateData = loginDTOSchema.parse(req.body);
            if (!validateData) {
                return res.status(401).json({ message: 'Email or Password not provided!' });
            }

            const {
                accessToken,
                refreshToken,
                user
            } = await AuthController.authService.login(validateData);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({ message: 'Login successful!', data: { accessToken, user } });
        } catch (error) {
            res.status(500).json({ message: error || "Internal Server Error" })
        }
    }

    // logout controller
    static async logout(req: Request, res: Response) {
        try {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            return res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            return res.status(500).json({ message: error || "Internal Server Error" });
        }
    }

    // forgot password controller
    static async forgotPassword(req: Request, res: Response) {
        try {
            const email = req.body.email;
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }

            const result = await AuthController.authService.forgotPassword(email);
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(500).json({ message: error || "Internal Server Error" });
        }
    }

    // reset password controller
    static async resetPassword(req: Request, res: Response) {
        try {
            const { newPassword, email, token } = req.body;
            console.log('New Password, email, token:\n', newPassword, "\n", email, "\n", token);

            if (!email || !token || !newPassword) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const result = await AuthController.authService.resetPassword({ email, token, newPassword });
            return res.status(200).json({ message: result });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // refresh token controller
    static async refreshToken(req: Request, res: Response) {
        try {
            const token = req.cookies.refreshToken;
            if (!token) return res.status(401).json({ message: "No refresh token provided" });

            const { accessToken, refreshToken } = await AuthController.authService.refreshAccessToken(token);

            // Update cookie with new refresh token
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({ accessToken });
        } catch (error) {
            return res.status(500).json({ message: error || "Internal Server Error" });
        }
    }

    // me controller
    static async me(req: Request, res: Response) {
        try {
            // The `protect` middleware has already run and attached the user payload.
            const userPayload = req.user as JwtPayload;

            // Check if user information exists on the request
            if (!userPayload || !userPayload.userId) {
                return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
            }
            
            // Call the service to get the user's profile
            const user = await AuthController.authService.getUserProfile(userPayload.userId);

            // Send the user profile back to the client
            return res.status(200).json({ user });

        } catch (error) {
            return res.status(500).json({ message: error || "Internal Server Error" });
        }
    }
}