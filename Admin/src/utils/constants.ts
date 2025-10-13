export enum Gender {
    MALE = 1,
    FEMALE = 2
}

export enum UserVerificationDocumentType {
    NATIONAL_ID_CARD = 1,
    PASSPORT = 2,
    OTHER_GOVT_ID = 3
}

export enum AccountStatus {
    PENDING = 0,
    ACTIVE = 1,
    SUSPENDED = 2,
    BANNED = 3
}

export enum AdminPrivilege {
    SUPER = 1,
    WRITE = 2,
    READ = 3
}

export const AdminPrivilegeOptions = [
    {label: 'Super Admin', value: "1"},
    {label: 'Write Access', value: "2"},
    {label: 'Read Only', value: "3"},
]