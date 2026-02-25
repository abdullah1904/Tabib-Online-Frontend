import { AccountStatus, Gender, UserRole, VerificationDocumentType } from "@/utils/constants";
// import { DefaultSession } from "next-auth";

interface IUser {
    id: string;
    fullName: string;
    age: number;
    gender: Gender;
    email: string | null;
    address: string;
    phoneNumber: string;
    verificationDocumentType: VerificationDocumentType;
    verificationDocumentNumber: string;
    verificationDocumentURL: string;
    password: string;
    role: UserRole;
    prefix: number;
    suspendedTill: Date | null;
    status: AccountStatus;
    balance: number;
    imageURL: string;
    verifiedAt: string;
    createdAt: string;
    updatedAt: string;
}

declare module "next-auth" {
    interface Session {
        user: Omit<IUser, "email"> & {
            email: string | null;
            name?: string | null;
            image?: string | null;
        };
        accessToken: string;
        refreshToken: string;
    }

    interface User extends Omit<IUser, "email"> {
        email: string;  // email is required and non-null on login
        accessToken: string;
        refreshToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends IUser {
        accessToken: string;
        refreshToken: string;
    }
}