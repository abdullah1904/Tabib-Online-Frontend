import { generateRequest } from "@/lib/api-client";
import { Message } from "@/types/chatbot";

export const getChatHistory = async () => {
    const response = await generateRequest({
        method: "GET",
        url: `/chatbot/history`,
        isProtected: true
    });
    return response.messages as Message[];
}