import { generateRequest } from "@/lib/api-client";
import { AppointmentFormData } from "@/lib/validation";

// export const listReviews = async () => {
//     const response = await generateRequest({
//         method: "GET",
//         url: `/doctors/reviews`,
//         isProtected: true
//     });
//     return response.reviews as Review[];
// }

export const createAppointment = async (data: AppointmentFormData & {doctorId: string, consultationId: string})=>{
    const response = await generateRequest({
        method: "POST",
        url: `/appointments`,
        isProtected: true,
        data
    });
    return response;
}