import { generateRequest } from "@/lib/api-client";
import { UpdateProfessionalProfileFormData } from "@/lib/validation";

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

export const updateProfessionalProfile = async (data:UpdateProfessionalProfileFormData)=>{
    const response = await generateRequest({
        method: "PUT",
        url: "/profile/professional",
        data,
        isProtected: true
    });
    return response.profile;
} 