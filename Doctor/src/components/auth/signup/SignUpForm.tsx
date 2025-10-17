"use client";

import { ConsentFormData, PersonalInfoFormData, ProfessionalInfoFormData, ProfessionalVerificationFormData, VerificationFormData } from "@/lib/validation";
import { useState } from "react";
import PersonalInfoStep from "./PersonalInfoStep";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Stethoscope } from "lucide-react";
import ProfessionalInfoStep from "./ProfessionalInfoStep";
import VerificationStep from "./VerificationStep";
import ProfessionalVerificationStep from "./ProfessionalVerificationStep";
import ConsentStep from "./ConsentStep";

const SignUpForm = ({ className, ...props }: React.ComponentProps<"div">) => {
    const [currentStep, setCurrentStep] = useState(5);
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
        setCurrentStep(5);
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
                    isLoading={false}
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