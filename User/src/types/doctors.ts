import { AccountStatus, DoctorPrefix, Gender, MedicalDegree, PostGraduateDegree, Specialization, VerificationDocumentType } from "@/utils/constants";

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
    verificationDocumentType: VerificationDocumentType;
    verificationDocumentNumber: string;
    verificationDocumentURL: string;
    password: string;
    authenticInformationConsent: boolean
    licenseVerificationConsent: boolean
    termsAgreementConsent: boolean
    dataUsageConsentConsent: boolean
    pmdcVerifiedAt: Date | null;
    doctorPrefix: DoctorPrefix;
    status: AccountStatus;
    ratings: number;
    verifiedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}