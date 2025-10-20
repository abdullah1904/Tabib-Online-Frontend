import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { AccountStatus, Gender, VerificationDocumentType } from "@/utils/constants";

interface User {
    id: number;
    imageURL?: string | null;
    fullName: string;
    age: number;
    gender: Gender;
    email: string;
    address: string;
    phoneNumber: string;
    verificationDocumentType: VerificationDocumentType;
    verificationDocumentNumber: string;
    verificationDocumentURL: string;
    status: AccountStatus;
    pmdcVerifiedAt?: Date | null;
    verifiedAt?: Date | null;
    accessToken: string;
    refreshToken: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });
                    const data = response.data;
                    if (data && response.status === 200) {
                        return {
                            id: data.doctor.id,
                            imageURL: data.doctor.imageURL,
                            fullName: data.doctor.fullName,
                            age: data.doctor.age,
                            gender: data.doctor.gender,
                            email: data.doctor.email,
                            address: data.doctor.address,
                            phoneNumber: data.doctor.phoneNumber,
                            verificationDocumentType: data.doctor.verificationDocumentType,
                            verificationDocumentNumber: data.doctor.verificationDocumentNumber,
                            verificationDocumentURL: data.doctor.verificationDocumentURL,
                            status: data.doctor.status,
                            verifiedAt: data.doctor.verifiedAt,
                            accessToken: data.doctor.accessToken,
                            refreshToken: data.doctor.refreshToken,
                        }
                    }
                    return null;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        throw new Error(error.response?.data?.error || "Login failed");
                    } else {
                        throw new Error("An unexpected error occurred");
                    }
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token = { ...token, ...(user as User) };
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user && token) {
                session.user = { ...session.user, ...(token as User) };
            }
            return session;
        },
    },
    pages: {
        signIn: "/signin",
        error: "/signin",
        signOut: "/signin",
    },
    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET
}