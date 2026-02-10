export interface WalletTopupSession {
    id: string,
    amount: number,
    currency: string,
    status: 'paid' | 'unpaid';
    checkoutURL: string | null;
    createdAt: Date;
}