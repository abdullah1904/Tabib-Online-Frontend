import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                        {
                            email: credentials?.email,
                            password: credentials?.password,
                        }
                    );

                    const data = response.data;

                    if (data && response.status === 200) {
                        return {
                            ...data.user,
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                        };
                    }

                    return null;
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        throw new Error(error.response?.data?.error || "Login failed");
                    } else if (error instanceof Error) {
                        throw error;
                    } else {
                        throw new Error("An unexpected error occurred during login");
                    }
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user, trigger, session }) => {
            if (user) {
                // `user` here is what authorize() returned — spread everything including tokens
                const { accessToken, refreshToken, ...userFields } = user as typeof user & {
                    accessToken: string;
                    refreshToken: string;
                };
                token = {
                    ...token,
                    ...userFields,
                    accessToken,
                    refreshToken,
                };
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },
        session: async ({ session, token }) => {
            const { accessToken, refreshToken, ...userFields } = token as typeof token & {
                accessToken: string;
                refreshToken: string;
            };
            session.user = { ...session.user, ...userFields };
            session.accessToken = accessToken;
            session.refreshToken = refreshToken;
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
    secret: process.env.NEXTAUTH_SECRET,
};