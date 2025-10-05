import { generateRequest } from "@/lib/api-client";


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

export const changePassword = async (data: { oldPassword: string, newPassword: string }) => {
    const response = await generateRequest({
        method: "PUT",
        url: "/auth/change-password",
        data,
        isProtected: true
    });
    return response;
}