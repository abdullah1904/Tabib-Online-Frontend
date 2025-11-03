import { generateRequest } from "@/lib/api-client";
import { Review } from "@/types/reviews";

export const listReviews = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/reviews",
        isProtected: true,
    });
    return response.reviews as Review[];
}