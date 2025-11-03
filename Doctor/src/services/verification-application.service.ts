import { generateRequest } from "@/lib/api-client";
import { VerificationApplication } from "@/types/verification-application";

export const listVerificationApplications = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/verification-applications",
        isProtected: true,
    });
    return response.verificationApplications as VerificationApplication[];
}

export const createVerificationApplication = async ()=>{
    const response = await generateRequest({
        method: "POST",
        url: "/verification-applications",
        isProtected: true,
    });
    return response;
}