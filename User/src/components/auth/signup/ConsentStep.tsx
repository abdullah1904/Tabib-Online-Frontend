import { consentFormSchema, ConsentFormData } from '@/lib/validation';
import { Button, Checkbox, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

interface ConsentStepProps {
    formData: ConsentFormData | null;
    onSubmit: (data: ConsentFormData) => Promise<void>;
    isLoading: boolean;
}

const ConsentStep = ({ formData, onSubmit, isLoading }: ConsentStepProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const consentForm = useForm<ConsentFormData>({
        resolver: zodResolver(consentFormSchema),
        mode: "onBlur",
        defaultValues: {
            password: formData?.password || undefined,
            treatmentConsent: formData?.treatmentConsent || false,
            privacyPolicyAgreement: formData?.privacyPolicyAgreement || false,
            healthInfoDisclosure: formData?.healthInfoDisclosure || false,
        }
    })
    return (
        <>
            <div className="text-center mb-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Consent & Authorization
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Please review and provide your consent for the following items. All consents are required to proceed with your healthcare services.
                </p>
            </div>
            <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step <= 4
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-400"
                                    }`}
                            >
                                {step}
                            </div>
                            {step < 4 && (
                                <div
                                    className={`w-8 h-0.5 mx-2 transition-colors ${step < 4 ? "bg-primary" : "bg-gray-200"}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={consentForm.handleSubmit(onSubmit)} noValidate>
                <div className="space-y-6 mx-auto">
                    <div className='grid grid-cols-1 gap-4'>
                        <Input
                            {...consentForm.register("password")}
                            type={showPassword ? "text" : "password"}
                            endContent={
                                <button
                                    onClick={togglePasswordVisibility}
                                    className="text-primary hover:text-primary-600 transition-colors focus:outline-none"
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            }
                            placeholder="********"
                            label="Password"
                            isInvalid={!!consentForm.formState.errors.password}
                            errorMessage={consentForm.formState.errors.password?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Checkbox
                            {...consentForm.register("treatmentConsent")}
                            color='primary'
                            classNames={{ label: 'text-primary' }}
                        >
                            I consent to receive treatment for my health condition.
                            {consentForm.formState.errors.treatmentConsent && (
                                <p className="text-xs text-danger">
                                    {consentForm.formState.errors.treatmentConsent.message}
                                </p>
                            )}
                        </Checkbox>
                        <Checkbox
                            {...consentForm.register("healthInfoDisclosure")}
                            color='primary'
                            classNames={{ label: 'text-primary' }}
                        >
                            I consent to the disclosure of my health information for treatment purposes.
                            {consentForm.formState.errors.healthInfoDisclosure && (
                                <p className="text-xs text-danger">
                                    {consentForm.formState.errors.healthInfoDisclosure.message}
                                </p>
                            )}
                        </Checkbox>
                        <Checkbox
                            {...consentForm.register("privacyPolicyAgreement")}
                            isInvalid={!!consentForm.formState.errors.privacyPolicyAgreement}

                            color='primary'
                            classNames={{ label: 'text-primary' }}
                        >
                            I acknowledge that I gave reviewed and agree to the privacy policy.
                            {consentForm.formState.errors.privacyPolicyAgreement && (
                                <p className="text-xs text-danger">
                                    {consentForm.formState.errors.privacyPolicyAgreement.message}
                                </p>
                            )}
                        </Checkbox>
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        isLoading={isLoading || consentForm.formState.isSubmitting}
                        disabled={isLoading || consentForm.formState.isSubmitting}
                        className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        {isLoading || consentForm.formState.isSubmitting ? "Processing..." : "Create Account"}
                    </Button>

                    <div className="text-center pt-4">
                        <span className="text-gray-600 text-sm sm:text-base">
                            Already have an account?{" "}
                        </span>
                        <Link
                            href="/signin"
                            className="text-primary font-medium underline hover:text-primary-600 transition-colors text-sm sm:text-base"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ConsentStep