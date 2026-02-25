import { generateRequest } from "@/lib/api-client";
import { AppointmentFormData } from "@/lib/validation";
import { Doctor, DoctorAppointment } from "@/types/doctors";
import { Review } from "@/types/review";
import { Service } from "@/types/services";

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
    return response.doctor as Doctor & { reviewsCount: number, reviews: Review[], services: Service[] };
}

export const createDoctorAppointment = async ({doctorId, serviceId, appointmentData}: {doctorId: number, serviceId: number, appointmentData: AppointmentFormData}) => {
    const response = await generateRequest({
        method: "POST",
        url: `/doctors/${doctorId}/services/${serviceId}/appointments`,
        isProtected: true,
        data: appointmentData
    });
    return response.appointment;
}

export const listDoctorAppointments = async ()=>{
    const response = await generateRequest({
        method: "GET",
        url: `/doctors/appointments`,
        isProtected: true
    });
    return response.appointments as DoctorAppointment[];
}

export const createDoctorReview = async ({doctorId, comment}: {doctorId: string, comment: string}) => {
    const response = await generateRequest({
        method: "POST",
        url: `/doctors/${doctorId}/review`,
        isProtected: true,
        data: { comment }
    });
    return response;
}