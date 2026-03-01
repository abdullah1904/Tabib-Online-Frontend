export interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    user: {
        fullName: string;
        email: string;
        imageURL: string;
    }
}