import { AccountStatus, Gender, UserVerificationDocumentType } from "@/utils/constants";


export interface AdminUser {
    id: string;
    imageURL?: string;
    fullName: string;
    email: string;
    phone: string;
    privilegeLevel: number;
    recoveryEmail?: string;
    status: number;
    accessToken: string;
    refreshToken: string;
}
export interface User {
    id: number;
    imageURL?: string | null;
    fullName: string;
    age: number;
    gender: Gender;
    email: string;
    address: string;
    phoneNumber: string;
    emergencyContactNumber: string;
    emergencyContactName: string;
    verificationDocumentType: UserVerificationDocumentType;
    verificationDocumentNumber: string;
    verificationDocumentURL: string;
    password: string;
    treatmentConsent: boolean;
    healthInfoDisclosureConsent: boolean;
    privacyPolicyConsent: boolean;
    status: AccountStatus;
    verifiedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}