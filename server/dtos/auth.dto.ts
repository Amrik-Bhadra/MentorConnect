import { z } from "zod";

export const loginDTOSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password should be at least 8 characters long")
        .regex(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
            "Password must include at least one uppercase letter, one number, and one special character"),
});


export const registerDTOSchema = z.object({
    name: z
        .string()
        .min(2, "Name should be at least 2 characters")
        .max(50, "Name should be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password should be at least 8 characters")
        .regex(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
            "Password must include at least one uppercase letter, one number, and one special character"
        ),
    countryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    role: z.enum(["mentor", "mentee"], "Role must be either mentor or mentee"),
});

export const resetPasswordDTOSchema = z.object({
    email: z.email().nonempty(),
    token: z.string().nonempty(),
    newPassword: z.string().min(8, "Password should be at least 8 characters")
        .regex(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
            "Password must include at least one uppercase letter, one number, and one special character"
        )
})


export type LoginDTO = z.infer<typeof loginDTOSchema>;
export type RegisterDTO = z.infer<typeof registerDTOSchema>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordDTOSchema>
