import { AccountStatus, Gender, UserVerificationDocumentType } from "@/utils/constants";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
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
            status: AccountStatus;
            verifiedAt?: Date | null;
            accessToken: string;
            refreshToken: string;
        } & DefaultSession["user"];
    }
    interface User {
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
        status: AccountStatus;
        verifiedAt?: Date | null;
        accessToken: string;
        refreshToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
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
        status: AccountStatus;
        verifiedAt?: Date | null;
        accessToken: string;
        refreshToken: string;
    }
}