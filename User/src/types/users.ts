export interface MedicalRecord {
    emergencyContactName: string;
    emergencyContactNumber: string;
    bloodType: string;
    height: number;
    weight: number;
    allergies: string;
    currentMedications: string;
    pastMedicalHistory: string;
    familyMedicalHistory: string;
}

export interface ProfessionalInfo {
    prefix: number;
    medicalDegree: number;
    postGraduateDegree: number;
    specialization: number;
    yearsOfExperience: number;
    PMDCRedgNo: string;
    PMDCRedgDate: string;
    PMDCLicenseDocumentURL: string;
    PMDCVerifiedAt: string | null;
    isActive: boolean;
    isPMDCEditable: boolean;
    createdAt: string;
    updatedAt: string;
}