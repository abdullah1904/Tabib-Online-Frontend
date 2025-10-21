"use client";

import { ConsentFormData, PersonalInfoFormData, personalInfoFormSchema, ProfessionalInfoFormData, professionalInfoFormSchema, ProfessionalVerificationFormData, professionalVerificationFormSchema, VerificationFormData, verificationFormSchema } from "@/lib/validation";
import { useState } from "react";
import PersonalInfoStep from "./PersonalInfoStep";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Stethoscope } from "lucide-react";
import ProfessionalInfoStep from "./ProfessionalInfoStep";
import VerificationStep from "./VerificationStep";
import ProfessionalVerificationStep from "./ProfessionalVerificationStep";
import ConsentStep from "./ConsentStep";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/auth.service";

const SignUpForm = ({ className, ...props }: React.ComponentProps<"div">) => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<{
        personalInfoData: PersonalInfoFormData | null;
        professionalInfoData: ProfessionalInfoFormData | null;
        professionalVerificationData: ProfessionalVerificationFormData | null;
        verificationData: VerificationFormData | null;
        consentData: ConsentFormData | null;
    }>({
        personalInfoData: null,
        professionalInfoData: null,
        professionalVerificationData: null,
        verificationData: null,
        consentData: null,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            toast.success("Sign Up successful! Please verify your email.");
            router.push(`/verify-account?email=${formData.personalInfoData?.email}`);
        },
        onError: (error) => {
            toast.error(error.message || "Sign Up failed. Please try again.");
        }
    });

    const onPersonalInfoSubmit = async (data: PersonalInfoFormData): Promise<void> => {
        setFormData((prev) => ({
            ...prev,
            personalInfoData: data,
        }));
        setCurrentStep(2);
    };

    const onProfessionalInfoSubmit = async (data: ProfessionalInfoFormData): Promise<void> => {
        setFormData((prev) => ({
            ...prev,
            professionalInfoData: data,
        }));
        setCurrentStep(3);
    };

    const onProfessionalVerificationSubmit = async (data: ProfessionalVerificationFormData): Promise<void> => {
        setFormData((prev) => ({
            ...prev,
            professionalVerificationData: data,
        }));
        setCurrentStep(4);
    }

    const onVerificationSubmit = async (data: VerificationFormData): Promise<void> => {
        setFormData((prev) => ({
            ...prev,
            verificationData: data,
        }));
        setCurrentStep(5)
    }

    const onConsentSubmit = async (data: ConsentFormData): Promise<void> => {
        setFormData((prev) => ({
            ...prev,
            consentData: data,
        }));
        const personalInfoDataResult = personalInfoFormSchema.safeParse(formData.personalInfoData);
        const professionalInfoDataResult = professionalInfoFormSchema.safeParse(formData.professionalInfoData);
        const professionalVerificationDataResult = professionalVerificationFormSchema.safeParse(formData.professionalVerificationData);
        const verificationDataResult = verificationFormSchema.safeParse(formData.verificationData);
        if (!personalInfoDataResult.success) {
            toast.error("Invalid personal information data. Please review your inputs.");
            setCurrentStep(1);
            return;
        }
        if (!professionalInfoDataResult.success) {
            toast.error("Invalid professional information data. Please review your inputs.");
            setCurrentStep(2);
            return;
        }
        if (!professionalVerificationDataResult.success) {
            toast.error("Invalid professional verification data. Please review your inputs.");
            setCurrentStep(3);
            return;
        }
        if (!verificationDataResult.success) {
            toast.error("Invalid verification data. Please review your inputs.");
            setCurrentStep(4);
            return;
        }
        const doctorData = new FormData();
        doctorData.append('fullName', formData.personalInfoData?.fullName || '');
        doctorData.append('age', String(formData.personalInfoData?.age || 0));
        doctorData.append('gender', String(formData.personalInfoData?.gender || 0));
        doctorData.append('email', formData.personalInfoData?.email || '');
        doctorData.append('phone', formData.personalInfoData?.phoneNumber || '');
        doctorData.append('address', formData.personalInfoData?.address || '');
        doctorData.append('pmdcRedgNo', formData.professionalInfoData?.pmdcRedgNo || '');
        doctorData.append('pmdcRedgDate', formData.professionalInfoData?.pmdcRedgDate?.toISOString() || '');
        doctorData.append('medicalDegree', String(formData.professionalInfoData?.medicalDegree || 0));
        doctorData.append('postGraduateDegree', String(formData.professionalInfoData?.postgraduateDegree || 0));
        doctorData.append('specialization', String(formData.professionalInfoData?.specialization || 0));
        doctorData.append('yearsOfExperience', String(formData.professionalInfoData?.yearsOfExperience || 0));
        doctorData.append('image1', formData.professionalVerificationData?.pmdcLicenseDocument || '');
        doctorData.append('verificationDocumentType', String(formData.verificationData?.verificationType || 0));
        doctorData.append('verificationDocumentNumber', formData.verificationData?.verificationNumber || '');
        doctorData.append('image2', formData.verificationData?.verificationDocument || '');
        doctorData.append('password', data.password);
        doctorData.append('authenticInformationConsent', data.authenticInformationConsent ? 'true' : 'false');
        doctorData.append('licenseVerificationConsent', data.licenseVerificationConsent ? 'true' : 'false');
        doctorData.append('termsAgreementConsent', data.termsAgreementConsent ? 'true' : 'false');
        doctorData.append('dataUsageConsentConsent', data.dataUsageConsent ? 'true' : 'false');
        mutate(doctorData);
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoStep
                    onSubmit={onPersonalInfoSubmit}
                    formData={formData.personalInfoData}
                />;
            case 2:
                return <ProfessionalInfoStep
                    onSubmit={onProfessionalInfoSubmit}
                    formData={formData.professionalInfoData}
                />;
            case 3:
                return <ProfessionalVerificationStep
                    onSubmit={onProfessionalVerificationSubmit}
                    formData={formData.professionalVerificationData}
                />;
            case 4:
                return <VerificationStep
                    onSubmit={onVerificationSubmit}
                    formData={formData.verificationData}

                />;
            case 5:
                return <ConsentStep
                    onSubmit={onConsentSubmit}
                    formData={formData.consentData}
                    isLoading={isPending}
                />;
            default:
                return <PersonalInfoStep
                    onSubmit={onPersonalInfoSubmit}
                    formData={formData.personalInfoData}
                />;
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-6xl">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <div className="p-6 md:p-8">
                                {currentStep > 1 && (
                                    <div className="mb-6">
                                        <button
                                            onClick={goBack}
                                            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                                        >
                                            <ArrowLeft size={20} />
                                            Back
                                        </button>
                                    </div>
                                )}
                                {renderCurrentStep()}
                            </div>
                            <div className="relative hidden md:flex items-center justify-center bg-muted/60 dark:bg-muted rounded-r-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-muted to-background opacity-70" />
                                <Stethoscope className="w-2/3 h-2/3 text-foreground/10 dark:text-white/10" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;