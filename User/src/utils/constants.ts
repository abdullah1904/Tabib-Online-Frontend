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

export enum DoctorServiceType {
    IN_PERSON = 1,
    AUDIO_CALL = 2,
    VIDEO_CALL = 3,
}

export enum DoctorServiceDuration {
    MIN_30 = 1,
    MIN_45 = 2,
    MIN_60 = 3,
}

export enum DayOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,   
}

export enum AppointmentStatus {
    PENDING = 0,
    CONFIRMED = 1,
    COMPLETED = 2,
    CANCELLED = 3,
    RESCHEDULED = 4,
}