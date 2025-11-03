import { DoctorApplicationStatus, VerificationHandlerType } from "@/utils/constants";

export interface VerificationApplication {
    id: number;
    status: DoctorApplicationStatus;
    reviewedAt: Date | null;
    reviewedBy: VerificationHandlerType | null;
    results: string | null;
    createdAt: string;
    updatedAt: string;
}