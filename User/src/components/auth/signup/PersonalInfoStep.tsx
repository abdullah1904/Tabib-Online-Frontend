import { PersonalInfoFormData, personalInfoFormSchema } from '@/lib/validation';
import { GenderOptions } from '@/utils/constants';
import { Button, Input, NumberInput, Select, SelectItem } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';

interface PersonalInfoStepProps {
    formData: PersonalInfoFormData | null;
    onSubmit: (data: PersonalInfoFormData) => Promise<void>;
}

const PersonalInfoStep = ({ onSubmit, formData }: PersonalInfoStepProps) => {
    const personalInfoForm = useForm<PersonalInfoFormData>({
        resolver: zodResolver(personalInfoFormSchema),
        mode: "onBlur",
        defaultValues: {
            fullName: formData?.fullName || undefined,
            age: formData?.age || undefined,
            gender: formData?.gender || undefined,
            email: formData?.email || undefined,
            phoneNumber: formData?.phoneNumber || undefined,
            address: formData?.address || undefined,
            emergencyContactName: formData?.emergencyContactName || undefined,
            emergencyPhoneNumber: formData?.emergencyPhoneNumber || undefined,
        }
    });
    return (
        <>
            {/* Header */}
            <div className="text-center mb-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Personal Information
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Tell us a bit about yourself so we can personalize your health experience.
                </p>
            </div>
            <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step <= 1
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-400"
                                    }`}
                            >
                                {step}
                            </div>
                            {step < 4 && (
                                <div
                                    className={`w-8 h-0.5 mx-2 transition-colors ${step < 1 ? "bg-primary" : "bg-gray-200"}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>


            <form onSubmit={personalInfoForm.handleSubmit(onSubmit)} noValidate>
                <div className="space-y-6 mx-auto">
                    <div className='grid md:grid-cols-2 gap-4'>
                        <Input
                            {...personalInfoForm.register("fullName")}
                            type="text"
                            placeholder="John Doe"
                            label="Full Name"
                            isInvalid={!!personalInfoForm.formState.errors.fullName}
                            errorMessage={personalInfoForm.formState.errors.fullName?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <NumberInput
                            name="age"
                            placeholder="30"
                            label="Age"
                            onValueChange={(e) => personalInfoForm.setValue("age", e)}
                            defaultValue={formData?.age || undefined}
                            isInvalid={!!personalInfoForm.formState.errors.age}
                            errorMessage={personalInfoForm.formState.errors.age?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Select
                            {...personalInfoForm.register('gender')}
                            placeholder="Male/Female"
                            label="Gender"
                            isInvalid={!!personalInfoForm.formState.errors.gender}
                            errorMessage={personalInfoForm.formState.errors.gender?.message}
                            classNames={{
                                base: "w-full",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        >
                            {GenderOptions.map((gender) => (
                                <SelectItem key={gender.value}>
                                    {gender.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input
                            {...personalInfoForm.register("email")}
                            type="text"
                            placeholder="john.doe@example.com"
                            label="Email"
                            isInvalid={!!personalInfoForm.formState.errors.email}
                            errorMessage={personalInfoForm.formState.errors.email?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Input
                            {...personalInfoForm.register("phoneNumber")}
                            type="text"
                            placeholder="+1 (555) 123-4567"
                            label="Phone Number"
                            isInvalid={!!personalInfoForm.formState.errors.phoneNumber}
                            errorMessage={personalInfoForm.formState.errors.phoneNumber?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Input
                            {...personalInfoForm.register("address")}
                            type="text"
                            placeholder="123 Main St, Anytown, USA"
                            label="Address"
                            isInvalid={!!personalInfoForm.formState.errors.address}
                            errorMessage={personalInfoForm.formState.errors.address?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Input
                            {...personalInfoForm.register("emergencyContactName")}
                            type="text"
                            placeholder="Jane Doe"
                            label="Emergency Contact Name"
                            isInvalid={!!personalInfoForm.formState.errors.emergencyContactName}
                            errorMessage={personalInfoForm.formState.errors.emergencyContactName?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Input
                            {...personalInfoForm.register("emergencyPhoneNumber")}
                            type="text"
                            placeholder="+1 (555) 123-4567"
                            label="Emergency Phone Number"
                            isInvalid={!!personalInfoForm.formState.errors.emergencyPhoneNumber}
                            errorMessage={personalInfoForm.formState.errors.emergencyPhoneNumber?.message}
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
                        isLoading={personalInfoForm.formState.isSubmitting}
                        disabled={personalInfoForm.formState.isSubmitting}
                        className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        {personalInfoForm.formState.isSubmitting ? "Processing..." : "Continue"}
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

export default PersonalInfoStep