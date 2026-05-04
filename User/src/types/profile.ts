export interface ProfessionalStats {
    totalAppointments: number;
    pendingAppointments: number;
    averageRating: number;
    monthlyStats: {
        month: number;
        year: number;
        totalAppointments: number;
        totalEarnings: number;
    }[]
}