import { AppointmentStatus } from "@/utils/constants";

export interface Appointment {
    id: number;
    appointmentDate: string;
    appointmentTime: string;
    status: AppointmentStatus;
    user:{
        id: number;
        fullName: string;
        email: string;
        phoneNumber: string;
        imageURL: string | null;
    }
    createdAt: Date;
    updatedAt: Date;   
}