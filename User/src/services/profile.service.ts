import { generateRequest } from "@/lib/api-client";
import { MedicalInfoFormData } from "@/lib/validation";
import { MedicalRecord } from "@/types/medicalRecord";
// import { UpdateProfessionalProfileFormData } from "@/lib/validation";

export const updatePersonalProfile = async (data: FormData ) => {
    const response = await generateRequest({
        method: "PUT",
        url: "/profile/personal",
        data,
        isFormData: true,
        isProtected: true,
    });
    return response.profile;
}

export const getMedicalRecord = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/profile/medical",
        isProtected: true
    });
    return response.medicalRecord as MedicalRecord;
}

export const updateMedicalRecord = async (data:MedicalInfoFormData)=>{
    const response = await generateRequest({
        method: "PUT",
        url: "/profile/medical",
        data: {
            bloodType: data.bloodType,
            height: data.height,
            weight: data.weight,
            allergies: data.knownAllergies,
            currentMedications: data.currentMedications,
            familyMedicalHistory: data.familyMedicalHistory,
            pastMedicalHistory: data.pastMedicalHistory
        },
        isProtected: true
    });
    return response.medicalRecord as MedicalRecord;
} 