import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
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
        } & DefaultSession["user"];
    }
    interface User {
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
}

declare module "next-auth/jwt" {
    interface JWT {
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
}