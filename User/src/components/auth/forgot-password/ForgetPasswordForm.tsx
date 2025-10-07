"use client";
import { Card, CardBody } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EmailStep from "./EmailStep";
import PasswordResetStep from "./PasswordResetStep";
import { EmailFormData, PasswordResetFormData } from "@/lib/validation";
import { showToast } from "@/utils";

const ForgotPasswordForm = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    // Step 1: Send OTP
    const onEmailSubmit = async (data: EmailFormData) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("OTP sent to:", data.email);
            setUserEmail(data.email);
            setCurrentStep(2);
            showToast("OTP sent successfully! Please check your email.", "success");
        } catch (error) {
            console.error("Failed to send OTP:", error);
            showToast("Failed to send OTP. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Step 3: Reset Password
    const onPasswordSubmit = async (data: PasswordResetFormData) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Password reset successful!", data);
            router.push("/signin");
            showToast("Password reset successful! You can now log in.", "success");
        } catch (error) {
            console.error("Password reset failed:", error);
            showToast("Failed to reset password. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <EmailStep onSubmit={onEmailSubmit} isLoading={isLoading} />;
            case 2:
                return (
                    <PasswordResetStep
                        onSubmit={onPasswordSubmit}
                        isLoading={isLoading}
                        userEmail={userEmail}
                    />
                );

            default:
                return <EmailStep onSubmit={onEmailSubmit} isLoading={isLoading} />;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <Card className="w-full shadow-lg">
                    <CardBody className="p-0">
                        <div className="flex flex-col lg:flex-row min-h-[600px]">
                            {/* Form Section */}
                            <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                                {/* Back Button */}
                                {currentStep > 1 && (
                                    <div className="mb-6">
                                        <button
                                            onClick={goBack}
                                            className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors font-medium"
                                        >
                                            <ArrowLeft size={20} />
                                            Back
                                        </button>
                                    </div>
                                )}

                                {/* Render Current Step */}
                                {renderCurrentStep()}
                            </div>

                            {/* Image Section */}
                            <div className="flex-1 relative hidden lg:flex items-center justify-center p-6">
                                <div className="relative w-full max-w-md mx-auto">
                                    <Image
                                        src="/assets/WhyUs.png"
                                        alt="Tabib Online - Password Reset Illustration"
                                        width={450}
                                        height={450}
                                        className="w-full h-auto object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;