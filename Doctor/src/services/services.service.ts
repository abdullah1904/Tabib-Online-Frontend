import { generateRequest } from "@/lib/api-client";
import { ServiceFormData } from "@/lib/validation";
import { Service } from "@/types/services";

export const listServices = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/services",
        isProtected: true,
    });
    return response.services as Service[];
}

export const createService = async (serviceData: ServiceFormData) => {
    const response = await generateRequest({
        method: "POST",
        url: "/services",
        data: serviceData,
        isProtected: true,
    });
    return response;
}

export const deleteService = async (serviceId: number) => {
    const response = await generateRequest({
        method: "DELETE",
        url: `/services/${serviceId}`,
        isProtected: true,
    });
    return response;
}
