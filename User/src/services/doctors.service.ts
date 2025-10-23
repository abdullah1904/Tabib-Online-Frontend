import { generateRequest } from "@/lib/api-client";
import { Doctor } from "@/types/doctors";
import { Review } from "@/types/review";

export const listDoctors = async (query: string) => {
    const response = await generateRequest({
        method: "GET",
        url: query !== '' ? `/doctors?query=${query}` : '/doctors',
        isProtected: true
    });
    return response.doctors as Doctor[];
}

export const getDoctor = async (doctorId: string) => {
    const response = await generateRequest({
        method: "GET",
        url: `/doctors/${doctorId}`,
        isProtected: true
    });
    return response.doctor as Doctor & { reviewsCount: number, reviews: Review[] };
}

export const doctorReview = async ({doctorId, comment}: {doctorId: string, comment: string}) => {
    const response = await generateRequest({
        method: "POST",
        url: `/doctors/${doctorId}/review`,
        isProtected: true,
        data: { comment }
    });
    return response;
}