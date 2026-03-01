import { DoctorPrefix, Gender, Specialization } from "@/utils/constants";

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