import { generateRequest } from "@/lib/api-client";
import { OTPType } from "@/utils/constants";

export const register = async (data: FormData) => {
    const response = await generateRequest({
        method: "POST",
        url: "/auth/register",
        data,
        isFormData: true
    });
    return response;
}

export const sendOtp = async (data: { email: string, type: OTPType }) => {
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
        url: "/auth/verify-email",
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