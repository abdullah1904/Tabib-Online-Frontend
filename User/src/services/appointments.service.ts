import { generateRequest } from "@/lib/api-client";
import { AppointmentFormData } from "@/lib/validation";
import { Appointment } from "@/types/appointments";

export const listAppointments = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/appointments",
        isProtected: true
    });
    return response.appointments as Appointment[];
}

export const createAppointment = async (data: AppointmentFormData & {doctorId: string, consultationId: string})=>{
    const response = await generateRequest({
        method: "POST",
        url: `/appointments`,
        isProtected: true,
        data
    });
    return response;
}

export const confirmAppointment = async (appointmentId: string) => {
    const response = await generateRequest({
        method: "PATCH",
        url: `/appointments/${appointmentId}/confirm`,
        isProtected: true
    });
    return response;
}

export const cancelAppointment = async (appointmentId: string) => {
    const response = await generateRequest({
        method: "PATCH",
        url: `/appointments/${appointmentId}/cancel`,
        isProtected: true
    });
    return response;
}

export const completeAppointment = async (appointmentId: string) => {
    const response = await generateRequest({
        method: "PATCH",
        url: `/appointments/${appointmentId}/complete`,
        isProtected: true
    });
    return response;
}
