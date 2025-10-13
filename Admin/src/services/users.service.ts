import { generateRequest } from "@/lib/api-client";
import { User } from "@/types/users";

export const listUsers = async (query: string) => {
    const response = await generateRequest({
        method: "GET",
        url: query !== '' ? `/users?query=${query}` : '/users',
        isProtected: true
    });
    return response.users as User[];
}

export const getUser = async (userId: string) => {
    const response = await generateRequest({
        method: "GET",
        url: `/users/${userId}`,
        isProtected: true
    });
    return response.user as User;
}

export const activateUser = async (userId: number) => {
    const response = await generateRequest({
        method: 'PATCH',
        url: `/users/${userId}/activate`,
        isProtected: true
    });
    return response;
}

export const suspendUser = async (userId: number) => {
    const response = await generateRequest({
        method: 'PATCH',
        url: `/users/${userId}/suspend`,
        isProtected: true
    });
    return response;
}

export const banUser = async (userId: number) => {
    const response = await generateRequest({
        method: 'PATCH',    
        url: `/users/${userId}/ban`,
        isProtected: true
    });
    return response;
}