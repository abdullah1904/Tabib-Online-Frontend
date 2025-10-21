"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { VerificationFormData, verificationFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VerificationDocumentOptions } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type VerificationStepProps = {
    onSubmit: (data: VerificationFormData) => Promise<void>;
    formData: VerificationFormData | null
}

const VerificationStep = ({ formData, onSubmit }: VerificationStepProps) => {
    const verificationForm = useForm<VerificationFormData>({
        mode: 'onBlur',
        resolver: zodResolver(verificationFormSchema),
        defaultValues: {
            verificationDocument: formData?.verificationDocument || undefined,
            verificationNumber: formData?.verificationNumber || '',
            verificationType: formData?.verificationType || undefined,
        }
    });
    return (
        <>
            <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Verification</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                    Upload your identification document to verify your account and ensure secure access to your medical information.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4,5].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                                step <= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                                {step}
                            </div>
                            {step < 5 && (
                                <div className={cn(
                                    "w-8 h-0.5 mx-2 transition-colors",
                                    step < 4 ? "bg-primary" : "bg-muted"
                                )} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Form {...verificationForm}>
                <form onSubmit={verificationForm.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={verificationForm.control}
                                name="verificationType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Type</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="Select verification type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {VerificationDocumentOptions.map((type) => (
                                                        <SelectItem key={type.value} value={String(type.value)}>
                                                            {type.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={verificationForm.control}
                                name="verificationNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <FormField
                                control={verificationForm.control}
                                name="verificationDocument"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Document</FormLabel>
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
                    <Button type="submit" className="w-full" size="lg" disabled={verificationForm.formState.isSubmitting}>
                        {verificationForm.formState.isSubmitting ? "Processing..." : "Continue"}
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

export default VerificationStep