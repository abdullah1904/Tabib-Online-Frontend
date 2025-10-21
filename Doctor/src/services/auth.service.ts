import { generateRequest } from "@/lib/api-client";

export const signUp = async (data: FormData) => {
    const response = await generateRequest({
        method: "POST",
        url: "/auth/signup",
        data,
        isFormData: true
    });
    return response;
}

export const sendOtp = async (data: { email: string }) => {
    const response = await generateRequest({
        method: "POST",
        url: "/auth/send-otp",
        data
    });
    return response;
}

export const verifyAccount = async (data: { email: string, otp: string }) => {
    const response = await generateRequest({
        method: "POST",
        url: "/auth/verify-account",
        data
    });
    return response;
}

export const forgotPassword = async (data: { email: string }) => {
    const response = await generateRequest({
        method: "POST",
        url: "/auth/forgot-password",
        data
    });
    return response;
}

export const resetPassword = async (data: { email: string, otp: string, newPassword: string }) => {
    const response = await generateRequest({
        method: "POST",
        url: "/auth/reset-password",
        data
    })
    return response;
}

export const changePassword = async (data: { currentPassword: string, newPassword: string }) => {
    const response = await generateRequest({
        method: "PUT",
        url: "/auth/change-password",
        data,
        isProtected: true
    });
    return response;
}