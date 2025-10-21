import { generateRequest } from "@/lib/api-client";
import { Doctor } from "@/types/doctors";

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
    return response.doctor as Doctor;
}