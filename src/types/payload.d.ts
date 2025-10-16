import { User } from "./auth";

export interface LoginPayloadType {
    accessToken: string;
    user: User
}