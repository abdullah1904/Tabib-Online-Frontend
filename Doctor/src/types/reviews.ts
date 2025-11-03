export interface Review {
    id: number;
    ratings: number;
    comment: string;
    user:{
        id: number;
        fullName: string;
        email: string;
        phoneNumber: string;
        imageURL: string | null;
    }
    createdAt: string;
    updatedAt: string;
}