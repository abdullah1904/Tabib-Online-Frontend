export interface VerificationApplication {
    id: string;
    doctor: {
        id: string;
        fullName: string;
        imageURL: string | null;
        email: string;
        phoneNumber: string;
    };
    PMDCRedgNo: string;
    PMDCRedgDate: string;
    PMDCLicenseDocumentURL: string;
    status: number;
    reviewedAt: string | null;
    reviewedBy: string | null;
    results: string | null;
    createdAt: string;
    updatedAt: string;
}