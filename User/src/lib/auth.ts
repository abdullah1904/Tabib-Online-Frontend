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
    emergencyContactNumber: string;
    emergencyContactName: string;
    verificationDocumentType: VerificationDocumentType;
    verificationDocumentNumber: string;
    verificationDocumentURL: string;
    status: AccountStatus;
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
                            id: data.user.id,
                            imageURL: data.user.imageURL,
                            fullName: data.user.fullName,
                            age: data.user.age,
                            gender: data.user.gender,
                            email: data.user.email,
                            address: data.user.address,
                            phoneNumber: data.user.phoneNumber,
                            emergencyContactNumber: data.user.emergencyContactNumber,
                            emergencyContactName: data.user.emergencyContactName,
                            verificationDocumentType: data.user.verificationDocumentType,
                            verificationDocumentNumber: data.user.verificationDocumentNumber,
                            verificationDocumentURL: data.user.verificationDocumentURL,
                            status: data.user.status,
                            verifiedAt: data.user.verifiedAt,
                            accessToken: data.user.accessToken,
                            refreshToken: data.user.refreshToken,
                        }
                    }
                    return null;
                } catch (error) {
                    console.log(error);
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
        jwt: async ({ token, user, trigger, session }) => {
            if (user) {
                token = { ...token, ...(user as User) };
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
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