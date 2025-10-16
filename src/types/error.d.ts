export interface LoginErrorProps {
    emailError: string | null;
    passwordError: string | null;
}
export interface SignupErrorProps {
    nameError: string | null;
    emailError: string | null;
    roleError: string | null;
    passwordError: string | null;
    confirmPasswordError: string | null;
}
export interface ResetPasswordErrorProps {
    passwordError: string | null;
    confirmPasswordError: string | null;
}