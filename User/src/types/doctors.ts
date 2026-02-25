import { AppointmentStatus, DoctorPrefix, Gender, Specialization } from "@/utils/constants";

export interface Doctor {
    id: string;
    imageURL: string | null;
    fullName: string;
    gender: Gender
    professionalInfo: {
        PMDCVerifiedAt: string | null;
        specialization: Specialization;
        yearsOfExperience: number;
        prefix: DoctorPrefix;
    }
    averageRating: number;
}

export interface DoctorAppointment {
    id: number;
    appointmentDate: string;
    appointmentTime: string;
    status: AppointmentStatus;
    doctor: {
        id: number;
        fullName: string;
        imageURL?: string | null;
        specialization: Specialization;
        email: string;  
        phoneNumber: string;
    };
    createdAt: Date;
    updatedAt: Date;   
}