import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRole } from "server/models/user.model";

interface TokenPayload {
    userId: string;
    role: UserRole;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
}

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function passwordCompare(password: string, hash: string): Promise<boolean>{
    return await bcrypt.compare(password, hash);
}

export function verifyRefreshToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
    return decoded;
  } catch (error) {
    console.error("Refresh token verification error:", error);
    throw new Error("Invalid or expired refresh token");
  }
}