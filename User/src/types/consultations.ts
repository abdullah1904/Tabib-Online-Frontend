import { ConsultationDuration, ConsultationType } from "@/utils/constants";

export interface ConsultationSlot {
    id: string;
    serviceId: string;
    dayOfWeek: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Consultation {
    id: string;
    title: string;
    type: ConsultationType;
    price: number;
    duration: ConsultationDuration;
    time: string;
    location: string;
    allowCustom: boolean;
    doctorId: string;
    createdAt: Date;
    updatedAt: Date;
    consultationSlots: ConsultationSlot[];
}