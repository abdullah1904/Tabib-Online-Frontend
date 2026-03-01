import { generateRequest } from "@/lib/api-client";
import { ConsultationFormData } from "@/lib/validation";
import { Consultation } from "@/types/consultations";

export const createConsultation = async (data: ConsultationFormData) => {
    const response = await generateRequest({
        method: "POST",
        url: '/consultations',
        isProtected: true,
        data
    });
    return response.consultation as Consultation;
}

export const listConsultations = async () => {
    const response = await generateRequest({
        method: "GET",
        url: '/consultations',
        isProtected: true
    });
    return response.consultations as Consultation[];
}

export const updateConsultation = async ({consultationId, data}:{consultationId: string, data: ConsultationFormData}) => {
    const response = await generateRequest({
        method: "PUT",
        url: `/consultations/${consultationId}`,
        isProtected: true,
        data
    });
    return response.consultation as Consultation;
}

export const deleteConsultation = async (consultationId: string) => {
    const response = await generateRequest({
        method: "DELETE",
        url: `/consultations/${consultationId}`,
        isProtected: true
    });
    return response;
}