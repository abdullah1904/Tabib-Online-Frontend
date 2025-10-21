import { AccountStatus, Gender, MedicalDegree, PostGraduateDegree, Specialization, UserVerificationDocumentType } from "@/utils/constants";

export interface Doctor {
    id: number;
    imageURL?: string | null;
    fullName: string;
    age: number;
    gender: Gender;
    email: string;
    address: string;
    phoneNumber: string;
    pmdcRedgNo: string
    pmdcRedgDate: string
    medicalDegree: MedicalDegree
    postGraduateDegree: PostGraduateDegree
    specialization: Specialization
    yearsOfExperience: number
    pmdcLicenseDocumentURL: string
    verificationDocumentType: UserVerificationDocumentType;
    verificationDocumentNumber: string;
    verificationDocumentURL: string;
    password: string;
    authenticInformationConsent: boolean
    licenseVerificationConsent: boolean
    termsAgreementConsent: boolean
    dataUsageConsentConsent: boolean
    status: AccountStatus;
    pmdcVerifiedAt: Date | null;
    doctorPrefix: number;
    verifiedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}