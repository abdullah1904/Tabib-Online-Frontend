import { generateRequest } from "@/lib/api-client";
import { verificationApplicationFormData } from "@/lib/validation";
import { VerificationApplication } from "@/types/verification-application";

export const createVerificationApplication = async ({doctorId, data}: {doctorId: string, data: verificationApplicationFormData}) => {
    const response = await generateRequest({
        method: "POST",
        url: `/pmdc-verification/${doctorId}`,
        isProtected: true,
        data,
        isFormData: true
    });
    return response;
}

export const listVerificationApplications = async (doctorId: string) => {
    const response = await generateRequest({
        method: "GET",
        url: `/pmdc-verification/${doctorId}`,
        isProtected: true
    });
    return response.applications as VerificationApplication[];
}
