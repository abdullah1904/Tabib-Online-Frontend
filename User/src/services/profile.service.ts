import { generateRequest } from "@/lib/api-client";
import { CheckoutFormData, MedicalInfoFormData, ProfessionalInfoFormData } from "@/lib/validation";
import { ProfessionalStats } from "@/types/profile";
import { Checkouts, MedicalRecord, ProfessionalInfo } from "@/types/users";

export const updatePersonalProfile = async (data: FormData) => {
    const response = await generateRequest({
        method: "PATCH",
        url: "/users/profile/personal",
        data,
        isFormData: true,
        isProtected: true,
    });
    return response;
}

export const getMedicalProfile = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/users/profile/medical",
        isProtected: true
    });
    return response.medicalRecord as MedicalRecord;
}

export const updateMedicalProfile = async (data: MedicalInfoFormData) => {
    const response = await generateRequest({
        method: "PUT",
        url: "/users/profile/medical",
        data,
        isProtected: true
    });
    return response.medicalRecord as MedicalRecord;
}

export const getProfessionalProfile = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/users/profile/professional",
        isProtected: true
    });
    return response.professionalInfo as ProfessionalInfo;
}

export const getProfessionalStats = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/users/profile/professional/stats",
        isProtected: true
    }
    );
    return response.stats as ProfessionalStats; 

}

export const updateProfessionalProfile = async (data: ProfessionalInfoFormData) => {
    const response = await generateRequest({
        method: "PUT",
        url: "/users/profile/professional",
        data,
        isProtected: true
    });
    return response.professionalInfo as ProfessionalInfo;
}

export const createCheckout = async (data: CheckoutFormData) => {
    const response = await generateRequest({
        method: "POST",
        url: '/users/profile/wallet/checkouts',
        isProtected: true,
        data
    });
    return response;
}

export const listCheckouts = async () => {
    const response = await generateRequest({
        method: "GET",
        url: '/users/profile/wallet/checkouts',
        isProtected: true
    });
    return response as { sessions: Checkouts[], balance: number };
}