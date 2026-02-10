import { generateRequest } from "@/lib/api-client";
import { TopUpFormData } from "@/lib/validation";
import { WalletTopupSession } from "@/types/wallet";

export const createWalletTopup = async (data: TopUpFormData) => {
    const response = await generateRequest({
        method: "POST",
        url: '/wallet/top-ups',
        isProtected: true,
        data
    });
    return response;
}

export const listWalletTopups = async () => {
    const response = await generateRequest({
        method: "GET",
        url: '/wallet/top-ups',
        isProtected: true
    });
    return response as { sessions: WalletTopupSession[], balance: number };
}