import FileUpload from '@/components/FileUpload';
import { VerificationFormData, verificationFormSchema } from '@/lib/validation';
import { VerificationDocumentOptions } from '@/utils/constants';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';

interface VerificationStepProps {
    formData: VerificationFormData | null;
    onSubmit: (data: VerificationFormData) => Promise<void>;
}

const VerificationStep = ({ formData, onSubmit }: VerificationStepProps) => {
    const verificationForm = useForm<VerificationFormData>({
        resolver: zodResolver(verificationFormSchema),
        mode: "onBlur",
        defaultValues: {
            verificationType: formData?.verificationType || undefined,
            verificationNumber: formData?.verificationNumber || undefined,
            verificationDocument: formData?.verificationDocument || undefined,
        }
    })
    return (
        <>
            {/* Header */}
            <div className="text-center mb-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Verification
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Upload your identification document to verify your account and ensure secure access to your medical information.
                </p>
            </div>
            <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step <= 2
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-400"
                                    }`}
                            >
                                {step}
                            </div>
                            {step < 3 && (
                                <div
                                    className={`w-8 h-0.5 mx-2 transition-colors ${step < 3 ? "bg-primary" : "bg-gray-200"}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={verificationForm.handleSubmit(onSubmit)} noValidate>
                <div className="space-y-6 mx-auto">
                    <div className='grid md:grid-cols-2 gap-4'>
                        <Select
                            {...verificationForm.register('verificationType')}
                            placeholder="Select Verification Document"
                            label="Verification Document"
                            isInvalid={!!verificationForm.formState.errors.verificationType}
                            errorMessage={verificationForm.formState.errors.verificationType?.message}
                            classNames={{
                                base: "w-full",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        >
                            {VerificationDocumentOptions.map((document) => (
                                <SelectItem key={document.value}>
                                    {document.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input
                            {...verificationForm.register("verificationNumber")}
                            type="text"
                            placeholder="12345-6789012-3"
                            label="Verification Number"
                            isInvalid={!!verificationForm.formState.errors.verificationNumber}
                            errorMessage={verificationForm.formState.errors.verificationNumber?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <div className='md:col-span-2'>
                            <FileUpload
                                name="verificationDocument"
                                control={verificationForm.control}
                                rules={{ required: "Verification document is required" }}
                                label="Upload Verification Document"
                                errorMessage={verificationForm.formState.errors.verificationDocument?.message}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        isLoading={verificationForm.formState.isSubmitting}
                        disabled={verificationForm.formState.isSubmitting}
                        className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        {verificationForm.formState.isSubmitting ? "Processing..." : "Continue"}
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

export default VerificationStep