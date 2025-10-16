export const RESET_PASSWORD_EMAIL_TEMPLATE = (username: string, resetLink: string) => `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Password Reset Request</h2>
                    <p>Hello ${username},</p>
                    <p>You requested a password reset. Click the button below to reset your password.</p>
                    <a href="${resetLink}"
                       style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
                       Reset Password
                    </a>
                    <p>This link will expire in 30 minutes.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>`