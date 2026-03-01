import { generateRequest } from "@/lib/api-client";
import { Review } from "@/types/review";

export const listReviews = async () => {
    const response = await generateRequest({
        method: "GET",
        url: `/doctors/reviews`,
        isProtected: true
    });
    return response.reviews as Review[];
}

export const createDoctorReview = async ({doctorId, comment}: {doctorId: string, comment: string}) => {
    const response = await generateRequest({
        method: "POST",
        url: `/doctors/${doctorId}/reviews`,
        isProtected: true,
        data: { comment }
    });
    return response;
}