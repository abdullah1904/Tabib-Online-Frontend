import { generateRequest } from "@/lib/api-client";
import { Appointment } from "@/types/appointments";

export const listAppointments = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/appointments",
        isProtected: true,
    });
    return response.appointments as Appointment[];
}

export const approveAppointment = async (appointmentId: number) => {
    const response = await generateRequest({
        method: "PUT",
        url: `/appointments/${appointmentId}/approve`,
        isProtected: true,
    });
    return response.appointment as Appointment;
}