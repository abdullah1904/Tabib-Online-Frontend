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

export const activateDoctor = async (doctorId: number) => {
    const response = await generateRequest({
        method: 'PATCH',
        url: `/doctors/${doctorId}/activate`,
        isProtected: true
    });
    return response;
}

export const suspendDoctor = async (doctorId: number) => {
    const response = await generateRequest({
        method: 'PATCH',
        url: `/doctors/${doctorId}/suspend`,
        isProtected: true
    });
    return response;
}

export const banDoctor = async (doctorId: number) => {
    const response = await generateRequest({
        method: 'PATCH',    
        url: `/doctors/${doctorId}/ban`,
        isProtected: true
    });
    return response;
}