import { generateRequest } from "@/lib/api-client";
import { AdminUser } from "@/types/users";

export const updateProfile = async (data: FormData ) => {
    const response = await generateRequest({
        method: "PUT",
        url: "/profile",
        data,
        isFormData: true,
        isProtected: true,
    });
    return response.profile as AdminUser;
}