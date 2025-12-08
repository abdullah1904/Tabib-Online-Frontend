
import { GenderOptions, VerificationDocumentOptions } from "@/utils/constants";
import z from "zod";

// SignInForm validation schema and types
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


// SignUpForm validation schema and types
export const personalInfoFormSchema = z.object({
    fullName: z
        .string("Full name is required")
        .min(2, "Full name must be at least 2 characters long")
        .max(100, "Full name must be less than or equal to 100 characters"),
    age: z
        .number("Age is required")
        .min(0, "Age must be a positive number")
        .max(120, "Age must be less than or equal to 120"),
    gender: z.enum(GenderOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Gender is required' }),
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
    address: z
        .string("Address is required")
        .min(5, "Address must be at least 5 characters long")
        .max(200, "Address must be less than or equal to 200 characters"),
    emergencyContactName: z
        .string("Full name is required")
        .min(2, "Full name must be at least 2 characters long")
        .max(100, "Full name must be less than or equal to 100 characters"),
    emergencyPhoneNumber: z
        .string("Phone Number is required")
        .regex(
            /^\+[1-9]\d{1,14}$/,
            "Phone number must be in international format (e.g., +923001234567)"
        ),
});

export const medicalInfoFormSchema = z.object({
    bloodType: z
        .string()
        .min(1, "Blood type is required")
        .max(3, "Blood type must be less than or equal to 3 characters long"),
    height: z.number("Height is required").min(0, "Height must be a positive number"),
    weight: z.number("Weight is required").min(0, "Weight must be a positive number"),
    knownAllergies: z.string().min(5, "Known allergies must be at least 5 characters long"),
    currentMedications: z.string().min(5, "Current medications must be at least 5 characters long"),
    pastMedicalHistory: z.string().min(5, "Past medical history must be at least 5 characters long"),
    familyMedicalHistory: z.string().min(5, "Family medical history must be at least 5 characters long"),
});

export const verificationFormSchema = z.object({
    verificationType: z.enum(VerificationDocumentOptions.map(option => String(option.value)), 'Verification type is required'),
    verificationNumber: z.string().min(1, "Verification number is required"),
    verificationDocument: z.instanceof(File, { message: "Verification document is required" })
})

export const consentFormSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    treatmentConsent: z
        .boolean()
        .refine((value) => value === true, {
            message: "You must consent to receive treatment to proceed"
        }),
    healthInfoDisclosure: z
        .boolean()
        .refine((value) => value === true, {
            message: "You must consent to health information disclosure for treatment purposes"
        }),
    privacyPolicyAgreement: z
        .boolean()
        .refine((value) => value === true, {
            message: "You must acknowledge that you have reviewed and agree to the privacy policy"
        }),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoFormSchema>;
export type MedicalInfoFormData = z.infer<typeof medicalInfoFormSchema>;
export type VerificationFormData = z.infer<typeof verificationFormSchema>;
export type ConsentFormData = z.infer<typeof consentFormSchema>;

// VerifyAccountForm validation schema and types
export const verifyAccountFormSchema = z.object({
    otp: z
        .string()
        .min(1, "OTP is required")
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export type VerifyAccountFormData = z.infer<typeof verifyAccountFormSchema>;


// ForgetPasswordForm validation schema and types
export const emailFormSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
});

// PasswordResetForm validation schema and types
export const passwordResetFormSchema = z.object({
    otp: z
        .string()
        .min(1, "OTP is required")
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
    newPassword: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
});

export type EmailFormData = z.infer<typeof emailFormSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetFormSchema>;

export const updatePersonalProfileFormSchema = z.object({
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
    age: z
        .number("Age is required")
        .min(0, "Age must be a positive number")
        .max(120, "Age must be less than or equal to 120"),
    gender: z.enum(GenderOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Gender is required' }),
    address: z
        .string("Address is required")
        .min(5, "Address must be at least 5 characters long")
        .max(200, "Address must be less than or equal to 200 characters"),
    emergencyContactName: z
        .string("Full name is required")
        .min(2, "Full name must be at least 2 characters long")
        .max(100, "Full name must be less than or equal to 100 characters"),
    emergencyPhoneNumber: z
        .string("Phone Number is required")
        .regex(
            /^\+[1-9]\d{1,14}$/,
            "Phone number must be in international format (e.g., +923001234567)"
        ),
});

export type UpdatePersonalProfileFormData = z.infer<typeof updatePersonalProfileFormSchema>;


export const reviewFormSchema = z.object({
    comment: z.string().min(10, "Comment must be at least 10 characters long").max(500, "Comment must be less than or equal to 500 characters long"),
});

export type ReviewFormData = z.infer<typeof reviewFormSchema>;

export const chatbotFormSchema = z.object({
    query: z.string().min(1, "Message cannot be empty").max(500, "Message must be less than or equal to 500 characters long")
});

export type ChatbotFormData = z.infer<typeof chatbotFormSchema>;

export const appointmentFormSchema = z.object({
    appointmentDate: z
        .string("Appointment date is required")
        .min(1, "Appointment date is required")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected YYYY-MM-DD"),

    appointmentTime: z
        .string("Appointment time is required")
        .min(1, "Appointment time is required")
        .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Invalid time format. Expected HH:MM or HH:MM:SS"),

    additionalNotes: z
        .string()
        .max(500, "Additional notes must be less than or equal to 500 characters long"),
    healthInfoSharingConsent: z
        .boolean()
        .refine((value) => value === true, {
            message: "Health sharing consent is required"
        }),
});

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;
