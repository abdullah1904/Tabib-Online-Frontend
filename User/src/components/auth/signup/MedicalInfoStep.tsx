import { MedicalInfoFormData, medicalInfoFormSchema } from '@/lib/validation';
import { Button, Input, NumberInput, Textarea, Tooltip } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';

interface MedicalInfoStepProps {
    formData: MedicalInfoFormData | null;
    onSubmit: (data: MedicalInfoFormData) => Promise<void>;
}

const MedicalInfoStep = ({ onSubmit, formData }: MedicalInfoStepProps) => {
    const medicalInfoForm = useForm<MedicalInfoFormData>({
        resolver: zodResolver(medicalInfoFormSchema),
        mode: "onBlur",
        defaultValues: {
            bloodType: formData?.bloodType || undefined,
            height: formData?.height || undefined,
            weight: formData?.weight || undefined,
            currentMedications: formData?.currentMedications || undefined,
            familyMedicalHistory: formData?.familyMedicalHistory || undefined,
            knownAllergies: formData?.knownAllergies || undefined,
            pastMedicalHistory: formData?.pastMedicalHistory || undefined,
        }
    });
    return (
        <>
            {/* Header */}
            <div className="text-center mb-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Medical Information
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Tell us about your medical history and any conditions you may have.
                </p>
            </div>
            <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step <= 2
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-400"
                                    }`}
                            >
                                {step}
                            </div>
                            {step < 4 && (
                                <div
                                    className={`w-8 h-0.5 mx-2 transition-colors ${step < 2 ? "bg-primary" : "bg-gray-200"}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={medicalInfoForm.handleSubmit(onSubmit)} noValidate>
                <div className="space-y-6 mx-auto">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            {...medicalInfoForm.register("bloodType")}
                            type="text"
                            placeholder="A+"
                            label="Blood Type"
                            isInvalid={!!medicalInfoForm.formState.errors.bloodType}
                            errorMessage={medicalInfoForm.formState.errors.bloodType?.message}
                            className='col-span-1 md:col-span-2'
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <NumberInput
                            name="height"
                            placeholder="170"
                            label="Height (cm)"
                            onValueChange={(e) => medicalInfoForm.setValue("height", e)}
                            isInvalid={!!medicalInfoForm.formState.errors.height}
                            defaultValue={formData?.height || undefined}
                            errorMessage={medicalInfoForm.formState.errors.height?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <NumberInput
                            name="weight"
                            placeholder="30"
                            label="Weight (kgs)"
                            onValueChange={(e) => medicalInfoForm.setValue("weight", e)}
                            isInvalid={!!medicalInfoForm.formState.errors.weight}
                            defaultValue={formData?.weight || undefined}
                            errorMessage={medicalInfoForm.formState.errors.weight?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Textarea
                            {...medicalInfoForm.register("knownAllergies")}
                            placeholder="List any known allergies"
                            label="Known Allergies"
                            isInvalid={!!medicalInfoForm.formState.errors.knownAllergies}
                            errorMessage={medicalInfoForm.formState.errors.knownAllergies?.message}
                            minRows={2}
                            maxRows={2}
                            endContent={
                                <Tooltip
                                    content={
                                        <div className='text-primary'>
                                            <p>List any medications, foods, or substances that cause allergic reactions.</p>
                                            <p>Include the type of reaction (rash, swelling, difficulty breathing) </p>
                                            <p>to help avoid potentially dangerous interactions.</p>
                                        </div>
                                    }
                                    showArrow={true}
                                    placement='top'
                                >
                                    <Info className='text-primary size-4'/>
                                </Tooltip>
                            }
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Textarea
                            {...medicalInfoForm.register("currentMedications")}
                            placeholder="List any current medications"
                            label="Current Medications"
                            isInvalid={!!medicalInfoForm.formState.errors.currentMedications}
                            errorMessage={medicalInfoForm.formState.errors.currentMedications?.message}
                            minRows={2}
                            maxRows={2}
                            endContent={
                                <Tooltip
                                    content={
                                        <div className='text-primary'>
                                            <p>Include all medications you&apos;re currently taking - prescription drugs, over-the-counter medicines, vitamins, and supplements.</p>
                                            <p>This prevents harmful drug interactions and ensures safe advice.</p>
                                        </div>
                                    }
                                    showArrow={true}
                                    placement='top'
                                >
                                    <Info className='text-primary size-4'/>
                                </Tooltip>
                            }
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Textarea
                            {...medicalInfoForm.register("familyMedicalHistory")}
                            placeholder="Describe your family medical history"
                            label="Family Medical History"
                            isInvalid={!!medicalInfoForm.formState.errors.familyMedicalHistory}
                            errorMessage={medicalInfoForm.formState.errors.familyMedicalHistory?.message}
                            minRows={2}
                            maxRows={2}
                            endContent={
                                <Tooltip
                                    content={
                                        <div className='text-primary'>
                                            <p>Note any significant health conditions that run in your family (heart disease, diabetes, cancer, etc.).</p>
                                            <p>Genetic factors can influence your health risks and help with preventive care guidance.</p>
                                        </div>
                                    }
                                    showArrow={true}
                                    placement='top'
                                >
                                    <Info className='text-primary size-4'/>
                                </Tooltip>
                            }
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Textarea
                            {...medicalInfoForm.register("pastMedicalHistory")}
                            placeholder="Describe your past medical history"
                            label="Past Medical History"
                            isInvalid={!!medicalInfoForm.formState.errors.pastMedicalHistory}
                            errorMessage={medicalInfoForm.formState.errors.pastMedicalHistory?.message}
                            minRows={2}
                            maxRows={2}
                            endContent={
                                <Tooltip
                                    content={
                                        <div className='text-primary'>
                                            <p>Record any previous illnesses, surgeries, or chronic conditions you&apos;ve been diagnosed with.</p>
                                            <p>This helps provide context for your current health and guides appropriate recommendations.</p>
                                        </div>
                                    }
                                    showArrow={true}
                                    placement='top'
                                >
                                    <Info className='text-primary size-4'/>
                                </Tooltip>
                            }
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        isLoading={medicalInfoForm.formState.isSubmitting}
                        disabled={medicalInfoForm.formState.isSubmitting}
                        className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        {medicalInfoForm.formState.isSubmitting ? "Processing..." : "Continue"}
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

export default MedicalInfoStep