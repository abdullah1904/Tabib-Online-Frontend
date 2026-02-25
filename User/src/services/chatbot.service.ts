import { generateRequest } from "@/lib/api-client";
import { Message } from "@/types/chatbot";

export const getChatHistory = async () => {
    const response = await generateRequest({
        method: "GET",
        url: `/tabib-bot/history`,
        isProtected: true
    });
    return response.messages as Message[];
}