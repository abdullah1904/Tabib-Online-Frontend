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