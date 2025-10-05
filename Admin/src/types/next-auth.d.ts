import { DefaultSession } from "next-auth";

// Extend the `Session` interface
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
        } & DefaultSession["user"];  // Include all other properties of the default user
    }

    // Extend the `User` interface
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

// Extend the `JWT` interface in `next-auth/jwt`
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