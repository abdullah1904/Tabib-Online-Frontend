import FileUpload from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { ProfessionalVerificationFormData, professionalVerificationFormSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';

type ProfessionalVerificationStepProps = {
    formData: ProfessionalVerificationFormData | null;
    onSubmit: (data: ProfessionalVerificationFormData) => Promise<void>;
}

const ProfessionalVerificationStep = ({ formData, onSubmit }: ProfessionalVerificationStepProps) => {
    const professionalVerificationForm = useForm<ProfessionalVerificationFormData>({
        mode: 'onBlur',
        resolver: zodResolver(professionalVerificationFormSchema),
        defaultValues: {
            pmdcLicenseDocument: formData?.pmdcLicenseDocument || undefined,
        }
    });
    return (
        <>
            <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                    Professional Verification
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                    Upload your PMDC license to verify your qualifications
                    and gain access to professional features.
                </p>
            </div>
            <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                                step <= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                                {step}
                            </div>
                            {step < 5 && (
                                <div className={cn(
                                    "w-8 h-0.5 mx-2 transition-colors",
                                    step < 3 ? "bg-primary" : "bg-muted"
                                )} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Form {...professionalVerificationForm}>
                <form onSubmit={professionalVerificationForm.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4"> 
                        <div className="space-y-2 col-span-2">
                            <FormField
                                control={professionalVerificationForm.control}
                                name="pmdcLicenseDocument"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PMDC License Document</FormLabel>
                                        <FormControl>
                                            <FileUpload
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={professionalVerificationForm.formState.isSubmitting}>
                        {professionalVerificationForm.formState.isSubmitting ? "Processing..." : "Continue"}
                    </Button>

                    <div className="text-center mt-2">
                        <span className="text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/signin"
                                className="ml-auto text-sm underline-offset-2 hover:underline"
                            >
                                Sign In
                            </Link>
                        </span>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ProfessionalVerificationStep