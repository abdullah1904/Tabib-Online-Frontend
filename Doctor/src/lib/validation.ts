import { DayOfWeekOptions, DoctorPrefixOptions, DoctorServiceDurationOptions, DoctorServiceType, DoctorServiceTypeOptions, GenderOptions, MedicalDegreeOptions, PostGraduateDegreeOptions, SpecializationOptions, VerificationDocumentOptions } from "@/utils/constants";
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
        .string("Email is required")
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
});

export const professionalInfoFormSchema = z.object({
    pmdcRedgNo: z.string().refine(
        val =>
            /^\d{1,6}-\d{2}-.$/.test(val) ||
            /^\d{1,6}-.$/.test(val),
        {
            message: 'Invalid PMDC number format. Expected formats: XXXXXX-XX-X or XXXXX-X'
        }
    ),
    pmdcRedgDate: z
        .date("PMDC Registration Date is required")
        .refine(date => date instanceof Date && !isNaN(date.getTime()), {
            message: "Invalid PMDC Registration Date",
        }),
    medicalDegree: z.enum(MedicalDegreeOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Medical Degree is required' }),
    postgraduateDegree: z.enum(PostGraduateDegreeOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Postgraduate Degree is required' }),
    specialization: z.enum(SpecializationOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Specialization is required' }),
    yearsOfExperience: z
        .number("Years of Experience is required")
        .min(0, "Years of Experience must be a positive number")
        .max(60, "Years of Experience must be less than or equal to 60"),
});

export const professionalVerificationFormSchema = z.object({
    pmdcLicenseDocument: z.instanceof(File, { message: "PMDC License document is required" })
});

export const verificationFormSchema = z.object({
    verificationType: z.enum(VerificationDocumentOptions.map(option => String(option.value)), 'Verification type is required'),
    verificationNumber: z.string().min(1, "Verification number is required"),
    verificationDocument: z.instanceof(File, { message: "Verification document is required" }),
});

export const consentFormSchema = z.object({
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    authenticInformationConsent: z.boolean()
        .refine((value) => value === true, {
            message: "You must agree that the information provided is authentic to proceed"
        }),
    licenseVerificationConsent: z.boolean()
        .refine((value) => value === true, {
            message: "You must agree to license verification to proceed"
        }),
    termsAgreementConsent: z.boolean()
        .refine((value) => value === true, {
            message: "You must agree to the terms and conditions to proceed"
        }),
    dataUsageConsent: z.boolean()
        .refine((value) => value === true, {
            message: "You must agree to data usage policy to proceed"
        }),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoFormSchema>;
export type ProfessionalInfoFormData = z.infer<typeof professionalInfoFormSchema>;
export type ProfessionalVerificationFormData = z.infer<typeof professionalVerificationFormSchema>;
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

// ForgotPasswordForm validation schema and types
export const forgotPasswordFormSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
});


export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

// ResetPasswordForm validation schema and types
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
    currentPassword: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    newPassword: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
});

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;

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
});

export type UpdatePersonalProfileFormData = z.infer<typeof updatePersonalProfileFormSchema>;

export const updateProfessionalProfileFormSchema = z.object({
    medicalDegree: z.enum(MedicalDegreeOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Medical Degree is required' }),
    postGraduateDegree: z.enum(PostGraduateDegreeOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Postgraduate Degree is required' }),
    specialization: z.enum(SpecializationOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Specialization is required' }),
    yearsOfExperience: z
        .number("Years of Experience is required")
        .min(0, "Years of Experience must be a positive number")
        .max(60, "Years of Experience must be less than or equal to 60"),
    doctorPrefix: z.enum(DoctorPrefixOptions.map(option => String(option.value)) as [string, ...string[]], { message: 'Doctor Prefix is required' }),
});

export type UpdateProfessionalProfileFormData = z.infer<typeof updateProfessionalProfileFormSchema>;

export const serviceFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
    type: z.enum(DoctorServiceTypeOptions.map(option => String(option.value)) as [string, ...string[]], { message: "Service type is required" }),
    duration: z.enum(DoctorServiceDurationOptions.map(option => String(option.value)) as [string, ...string[]], { message: "Duration is required" }),
    price: z.number("Price is required").int().min(0, "Price must be 0 or more"),
    time: z.string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be in HH:MM format"),
    availableDays: z.array(z.enum(DayOfWeekOptions.map(option => String(option.value)) as [string, ...string[]])).min(1, "At least one available day is required"),
    location: z.string().max(200).optional(),
    allowCustom: z.boolean(),
}).refine(
  (data) => {
    if (data.type === DoctorServiceType.IN_PERSON.toString()) {
      return !!data.location && data.location.trim().length > 0;
    }
    return true;
  },
  {
    message: "Location is required for in-person services",
    path: ["location"],
  }
);

export type ServiceFormData = z.infer<typeof serviceFormSchema>;