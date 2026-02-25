import { generateRequest } from "@/lib/api-client";
import { MedicalInfoFormData, ProfessionalInfoFormData } from "@/lib/validation";
import { MedicalRecord, ProfessionalInfo } from "@/types/users";

export const updatePersonalProfile = async (data: FormData ) => {
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

export const updateMedicalProfile = async (data:MedicalInfoFormData)=>{
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

export const updateProfessionalProfile = async (data: ProfessionalInfoFormData)=>{
    const response = await generateRequest({
        method: "PUT",
        url: "/users/profile/professional",
        data,
        isProtected: true
    });
    return response.professionalInfo as ProfessionalInfo;
}