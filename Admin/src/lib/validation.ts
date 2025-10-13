import { AdminPrivilegeOptions } from "@/utils/constants";
import { z } from "zod";

export const signInFormSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;

export const forgotPasswordFormSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

export const resetPasswordFormSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
    otp: z.string().min(6, {
        message: "OTP must be 6 characters.",
    }),
    newPassword: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

export const changePasswordFormSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    newPassword: z
        .string()
        .min(1, "New password is required")
        .min(8, "New password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "New password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),

});

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;

export const updateProfileFormSchema = z.object({
    profilePicture: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= 5 * 1024 * 1024,
            'File size must be less than 5MB'
        )
        .refine(
            (file) => !file || ['image/jpeg', 'image/png', 'image/heic', 'image/heif'].includes(file.type),
            'Only JPEG, PNG, HEIC, and HEIF images are allowed'
        ),
    fullName: z
        .string("Full name is required")
        .min(2, "Full name must be at least 2 characters long")
        .max(100, "Full name must be less than or equal to 100 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
    phoneNumber: z
        .string("Phone Number is required")
        .regex(
            /^\+[1-9]\d{1,14}$/,
            "Phone number must be in international format (e.g., +923001234567)"
        ),
    privilege: z.enum(AdminPrivilegeOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Privilege is required' }),
    recoveryEmail: z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;