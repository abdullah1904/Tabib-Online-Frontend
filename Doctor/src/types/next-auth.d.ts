import { AccountStatus, Gender, MedicalDegree, PostGraduateDegree, Specialization, UserVerificationDocumentType } from "@/utils/constants";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            imageURL?: string;
            fullName: string;
            age: number;
            gender: Gender;
            email: string;
            address: string;
            phoneNumber: string;
            pmdcRedgNo: string;
            pmdcRedgDate: Date;
            medicalDegree: MedicalDegree;
            postGraduateDegree: PostGraduateDegree;
            specialization: Specialization;
            yearsOfExperience: number;
            pmdcLicenseDocumentURL: string,
            verificationDocumentType: UserVerificationDocumentType;
            verificationDocumentNumber: string;
            verificationDocumentURL: string;
            status: AccountStatus;
            verifiedAt?: Date | null;
            pmdcVerifiedAt?: Date | null;
            doctorPrefix: number,
            accessToken: string;
            refreshToken: string;
        } & DefaultSession["user"];
    }
    interface User {
        id: number;
        imageURL?: string;
        fullName: string;
        age: number;
        gender: Gender;
        email: string;
        address: string;
        phoneNumber: string;
        pmdcRedgNo: string;
        pmdcRedgDate: Date;
        medicalDegree: MedicalDegree;
        postGraduateDegree: PostGraduateDegree;
        specialization: Specialization;
        yearsOfExperience: number;
        pmdcLicenseDocumentURL: string,
        verificationDocumentType: UserVerificationDocumentType;
        verificationDocumentNumber: string;
        verificationDocumentURL: string;
        status: AccountStatus;
        pmdcVerifiedAt?: Date | null;
        doctorPrefix: number,
        verifiedAt?: Date | null;
        accessToken: string;
        refreshToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: number;
        imageURL?: string;
        fullName: string;
        age: number;
        gender: Gender;
        email: string;
        address: string;
        phoneNumber: string;
        pmdcRedgNo: string;
        pmdcRedgDate: Date;
        medicalDegree: MedicalDegree;
        postGraduateDegree: PostGraduateDegree;
        specialization: Specialization;
        yearsOfExperience: number;
        pmdcLicenseDocumentURL: string;
        verificationDocumentType: UserVerificationDocumentType;
        verificationDocumentNumber: string;
        verificationDocumentURL: string;
        status: AccountStatus;
        pmdcVerifiedAt?: Date | null;
        doctorPrefix: number,
        verifiedAt?: Date | null;
        accessToken: string;
        refreshToken: string;
    }
}