import { generateRequest } from "@/lib/api-client";
import { Doctor } from "../types/doctors";
import { Consultation } from "@/types/consultations";
import { Review } from "@/types/review";

export const listDoctors = async (query: string) => {
    const response = await generateRequest({
        method: "GET",
        url: query !== '' ? `/doctors/recommend?query=${query}` : '/doctors/recommend',
        isProtected: true
    });
    return response as { doctors: Doctor[], recommendationReasoning: string };
}

export const getDoctor = async (doctorId: string) => {
    const response = await generateRequest({
        method: "GET",
        url: `/doctors/${doctorId}`,
        isProtected: true
    });
    return response.doctor as Doctor & { consultations: Consultation[], doctorReviews: Review[] };
}

