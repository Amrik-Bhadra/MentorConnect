export type UserRoles = "mentor" | "mentee" | "";

export interface SignupDataProps {
    name: string;
    email: string;
    role: UserRoles;
    password: string;
    confirmPassword: string;
}

export interface LoginDataProps {
    email: string;
    password: string;
}

export interface OtpInputProps {
    value: string;
    onChange: (value: string) => void;
}

export interface ResetPasswordProps {
    password: string;
    confirmPassword: string;
}

export interface User{
    id: string;
    name: string;
    email: string;
    role: string;
}