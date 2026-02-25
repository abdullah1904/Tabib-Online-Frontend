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
import { useMutation } from "@tanstack/react-query";
import { resetPassword, sendOtp } from "@/services/auth.service";
import { OTPType } from "@/utils/constants";

const ForgotPasswordForm = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [userEmail, setUserEmail] = useState("");

    const {mutate: sendOtpMutate, isPending: isSendingOTP} = useMutation({
        mutationFn: sendOtp,
        onSuccess: ()=>{
            setCurrentStep(2);
            showToast("OTP sent to your email", "success");
        },
        onError: (error)=>{
            showToast(error.message || "Failed to send OTP", "error");
        }
    });

    const {mutate: resetPasswordMutate, isPending: isResettingPassword} = useMutation({
        mutationFn: resetPassword,
        onSuccess: ()=>{
            showToast("Password reset successfully", "success");
            router.push("/signin");
        },
        onError: (error)=>{
            showToast(error.message || "Failed to reset password", "error");
        }
    });

    const onEmailSubmit = async (data: EmailFormData) => {
        setUserEmail(data.email);
        sendOtpMutate({
            email: data.email,
            type: OTPType.PASSWORD_RESET
        });
    };

    const onPasswordSubmit = async (data: PasswordResetFormData) => {
        resetPasswordMutate({ 
            email: userEmail,
            otp: data.otp,
            newPassword: data.newPassword
         });
    };

    const goBack = () => {
        if (currentStep > 1 && !isSendingOTP && !isResettingPassword) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <EmailStep onSubmit={onEmailSubmit} isLoading={isSendingOTP} />;
            case 2:
                return (
                    <PasswordResetStep
                        onSubmit={onPasswordSubmit}
                        isLoading={isResettingPassword}
                        userEmail={userEmail}
                    />
                );

            default:
                return <EmailStep onSubmit={onEmailSubmit} isLoading={isSendingOTP} />;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <Card className="w-full shadow-lg">
                    <CardBody className="p-0">
                        <div className="flex flex-col lg:flex-row min-h-150">
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