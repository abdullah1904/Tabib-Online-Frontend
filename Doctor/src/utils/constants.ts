export enum Gender {
    MALE = 1,
    FEMALE = 2
}

export const GenderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 }
]

export enum VerificationDocumentType {
    NATIONAL_ID_CARD = 1,
    PASSPORT = 2,
    OTHER_GOVT_ID = 3
}

export const VerificationDocumentOptions = [
    { label: "National ID Card", value: 1 },
    { label: "Passport", value: 2 },
    { label: "Other Govt Issued ID", value: 3 }
]

export enum AccountStatus {
    PENDING = 0,
    ACTIVE = 1,
    DEACTIVATED = 2,
    SUSPENDED = 3
}

export enum MedicalDegree {
    MBBS = 1,
    BDS = 2,
    DVM = 3,
    PHARM_D = 4,
    DPT = 5,
    BEMS = 6,
    BUMS = 7,
    DHMS = 8
}

export const MedicalDegreeOptions = [
    { label: "MBBS", value: 1 },
    { label: "BDS", value: 2 },
    { label: "DVM", value: 3 },
    { label: "Pharm-D", value: 4 },
    { label: "DPT", value: 5 },
    { label: "BEMS", value: 6 },
    { label: "BUMS", value: 7 },
    { label: "DHMS", value: 8 }
]

export enum PostGraduateDegree {
    NONE = 0,
    FCPS = 1,
    MCPS = 2,
    MD = 3,
    MS = 4,
    MDS = 5,
    MPhil = 6,
    MPH = 7,
    PhD = 8
}

export const PostGraduateDegreeOptions = [
    { label: "None", value: 0 },
    { label: "FCPS", value: 1 },
    { label: "MCPS", value: 2 },
    { label: "MD", value: 3 },
    { label: "MS", value: 4 },
    { label: "MDS", value: 5 },
    { label: "MPhil", value: 6 },
    { label: "MPH", value: 7 },
    { label: "PhD", value: 8 }
]

export enum Specialization {
    // --- General & Family Practice ---
    GeneralPhysician = 1,
    FamilyMedicine = 2,
    InternalMedicine = 3,
    GeneralSurgeon = 4,

    // --- Internal Medicine Subspecialties ---
    Cardiologist = 5,
    Dermatologist = 6,
    Endocrinologist = 7,
    Gastroenterologist = 8,
    Hematologist = 9,
    Nephrologist = 10,
    Neurologist = 11,
    Oncologist = 12,
    Pulmonologist = 13,
    Rheumatologist = 14,
    InfectiousDiseaseSpecialist = 15,

    // --- Surgical Specialties ---
    OrthopedicSurgeon = 16,
    Neurosurgeon = 17,
    CardiothoracicSurgeon = 18,
    PlasticSurgeon = 19,
    PediatricSurgeon = 20,
    Urologist = 21,
    VascularSurgeon = 22,
    LaparoscopicSurgeon = 23,

    // --- Women & Child Health ---
    Gynecologist = 24,
    Obstetrician = 25,
    Pediatrician = 26,
    Neonatologist = 27,

    // --- Eye, ENT, Dental ---
    Ophthalmologist = 28,
    ENT_Specialist = 29,
    Dentist = 30,
    Orthodontist = 31,
    OralSurgeon = 32,
    Periodontist = 33,
    Prosthodontist = 34,
    Endodontist = 35,

    // --- Mental Health ---
    Psychiatrist = 36,
    Psychologist = 37,
    ClinicalPsychologist = 38,

    // --- Diagnostic & Lab ---
    Radiologist = 39,
    Pathologist = 40,
    NuclearMedicineSpecialist = 41,

    // --- Emergency & Intensive Care ---
    Anesthesiologist = 42,
    EmergencyMedicine = 43,
    CriticalCareSpecialist = 44,
    PainManagementSpecialist = 45,

    // --- Public & Preventive Health ---
    PublicHealthSpecialist = 46,
    Epidemiologist = 47,
    CommunityMedicine = 48,
    OccupationalHealth = 49,

    // --- Rehab & Allied Medicine ---
    Physiotherapist = 50,
    Nutritionist = 51,
    Dietitian = 52,
    SpeechTherapist = 53,
    Chiropractor = 54,

    // --- Cosmetic & Misc ---
    CosmeticSurgeon = 55,
    SportsMedicine = 56,
    SleepMedicineSpecialist = 57,
    SexualHealthSpecialist = 58
}

export const SpecializationOptions = [
    // --- General & Family Practice ---
    { label: "General Physician", value: 1 },
    { label: "Family Medicine", value: 2 },
    { label: "Internal Medicine", value: 3 },
    { label: "General Surgeon", value: 4 },

    // --- Internal Medicine Subspecialties ---
    { label: "Cardiologist", value: 5 },
    { label: "Dermatologist", value: 6 },
    { label: "Endocrinologist", value: 7 },
    { label: "Gastroenterologist", value: 8 },
    { label: "Hematologist", value: 9 },
    { label: "Nephrologist", value: 10 },
    { label: "Neurologist", value: 11 },
    { label: "Oncologist", value: 12 },
    { label: "Pulmonologist", value: 13 },
    { label: "Rheumatologist", value: 14 },
    { label: "Infectious Disease Specialist", value: 15 },

    // --- Surgical Specialties ---
    { label: "Orthopedic Surgeon", value: 16 },
    { label: "Neurosurgeon", value: 17 },
    { label: "Cardiothoracic Surgeon", value: 18 },
    { label: "Plastic Surgeon", value: 19 },
    { label: "Pediatric Surgeon", value: 20 },
    { label: "Urologist", value: 21 },
    { label: "Vascular Surgeon", value: 22 },
    { label: "Laparoscopic Surgeon", value: 23 },

    // --- Women & Child Health ---
    { label: "Gynecologist", value: 24 },
    { label: "Obstetrician", value: 25 },
    { label: "Pediatrician", value: 26 },
    { label: "Neonatologist", value: 27 },

    // --- Eye, ENT, Dental ---
    { label: "Ophthalmologist", value: 28 },
    { label: "ENT Specialist", value: 29 },
    { label: "Dentist", value: 30 },
    { label: "Orthodontist", value: 31 },
    { label: "Oral Surgeon", value: 32 },
    { label: "Periodontist", value: 33 },
    { label: "Prosthodontist", value: 34 },
    { label: "Endodontist", value: 35 },

    // --- Mental Health ---
    { label: "Psychiatrist", value: 36 },
    { label: "Psychologist", value: 37 },
    { label: "Clinical Psychologist", value: 38 },

    // --- Diagnostic & Lab ---
    { label: "Radiologist", value: 39 },
    { label: "Pathologist", value: 40 },
    { label: "Nuclear Medicine Specialist", value: 41 },

    // --- Emergency & Intensive Care ---
    { label: "Anesthesiologist", value: 42 },
    { label: "Emergency Medicine", value: 43 },
    { label: "Critical Care Specialist", value: 44 },
    { label: "Pain Management Specialist", value: 45 },

    // --- Public & Preventive Health ---
    { label: "Public Health Specialist", value: 46 },
    { label: "Epidemiologist", value: 47 },
    { label: "Community Medicine", value: 48 },
    { label: "Occupational Health", value: 49 },

    // --- Rehabilitation & Allied Medicine ---
    { label: "Physiotherapist", value: 50 },
    { label: "Nutritionist", value: 51 },
    { label: "Dietitian", value: 52 },
    { label: "Speech Therapist", value: 53 },
    { label: "Chiropractor", value: 54 },

    // --- Cosmetic & Misc ---
    { label: "Cosmetic Surgeon", value: 55 },
    { label: "Sports Medicine", value: 56 },
    { label: "Sleep Medicine Specialist", value: 57 },
    { label: "Sexual Health Specialist", value: 58 }
];

export enum DoctorPrefix {
  Dr = 1,
  Prof = 2,
  ProfDr = 3,
  MrDr = 4,
  MsDr = 5,
  MrsDr = 6,
  MxDr = 7,
  AssocProf = 8,
  AsstProf = 9,
  AssocProfDr = 10,
  AsstProfDr = 11,
  RevDr = 12,
  Consultant = 13,
  Surgeon = 14,
}

export const DoctorPrefixOptions = [
    { label: "Dr", value: 1 },
    { label: "Prof", value: 2 },
    { label: "Prof Dr", value: 3 },
    { label: "Mr Dr", value: 4 },
    { label: "Ms Dr", value: 5 },
    { label: "Mrs Dr", value: 6 },
    { label: "Mx Dr", value: 7 },
    { label: "Assoc Prof", value: 8 },
    { label: "Asst Prof", value: 9 },
    { label: "Assoc Prof Dr", value: 10 },
    { label: "Asst Prof Dr", value: 11 },
    { label: "Rev Dr", value: 12 },
    { label: "Consultant", value: 13 },
    { label: "Surgeon", value: 14 }   
]

export enum DoctorServiceType {
    IN_PERSON = 1,
    AUDIO_CALL = 2,
    VIDEO_CALL = 3,
}

export const DoctorServiceTypeOptions = [
    { label: "In-Person", value: 1 },
    { label: "Audio Call", value: 2 },
    { label: "Video Call", value: 3 },
]

export enum DoctorServiceDuration {
    MIN_30 = 1,
    MIN_45 = 2,
    MIN_60 = 3,
}

export const DoctorServiceDurationOptions = [
    { label: "30 Minutes", value: 1 },
    { label: "45 Minutes", value: 2 },
    { label: "60 Minutes", value: 3 },
]

export enum DayOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,   
}

export const DayOfWeekOptions = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
]

export enum DoctorApplicationStatus {
    PENDING = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
    ERROR = 3,
}

export enum VerificationHandlerType {
    AGENT = 1,
    WORKER = 2,
} 