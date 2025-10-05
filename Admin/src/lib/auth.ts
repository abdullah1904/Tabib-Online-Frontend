import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
                    const user = response.data;
                    if (user && response.status === 200) {
                        return {
                            id: user.admin.id,
                            imageURL: user.admin.imageURL,
                            fullName: user.admin.fullName,
                            email: user.admin.email,
                            phone: user.admin.phone,
                            privilegeLevel: user.admin.privilegeLevel,
                            recoveryEmail: user.admin.recoveryEmail,
                            status: user.admin.status,
                            accessToken: user.admin.accessToken,
                            refreshToken: user.admin.refreshToken
                        };
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
                token.id = user.id;
                token.imageURL = user.imageURL;
                token.fullName = user.fullName;
                token.email = user.email;
                token.phone = user.phone;
                token.privilegeLevel = user.privilegeLevel;
                token.recoveryEmail = user.recoveryEmail;
                token.status = user.status;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.imageURL = token.imageURL as string;
                session.user.fullName = token.fullName as string;
                session.user.email = token.email as string;
                session.user.phone = token.phone as string;
                session.user.privilegeLevel = token.privilegeLevel as number;
                session.user.recoveryEmail = token.recoveryEmail as string;
                session.user.status = token.status as number;
                session.user.accessToken = token.accessToken as string;
                session.user.refreshToken = token.refreshToken as string;
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