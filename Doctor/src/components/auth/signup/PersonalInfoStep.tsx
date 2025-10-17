import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PersonalInfoFormData, personalInfoFormSchema } from '@/lib/validation';
import { GenderOptions } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';


type PersonalInfoStepProps = {
    onSubmit: (data: PersonalInfoFormData) => Promise<void>;
    formData: PersonalInfoFormData | null;
}

const PersonalInfoStep = ({ onSubmit, formData }: PersonalInfoStepProps) => {
    const personalInfoForm = useForm<PersonalInfoFormData>({
        resolver: zodResolver(personalInfoFormSchema),
        mode: "onBlur",
        defaultValues: {
            fullName: formData?.fullName || '',
            age: formData?.age || undefined,
            gender: formData?.gender || undefined,
            email: formData?.email || '',
            phoneNumber: formData?.phoneNumber || '',
            address: formData?.address || '',

        }
    });

    return (
        <>
            <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Personal Information</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                    Tell us a bit about yourself so we can personalize your experience.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4,5].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                                step <= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                                {step}
                            </div>
                            {step < 5 && (
                                <div className={cn(
                                    "w-8 h-0.5 mx-2 transition-colors",
                                    step < 1 ? "bg-primary" : "bg-muted"
                                )} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Form {...personalInfoForm}>
                <form onSubmit={personalInfoForm.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={personalInfoForm.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={personalInfoForm.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age</FormLabel>
                                        <FormControl>
                                            <NumberInput placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={personalInfoForm.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {GenderOptions.map((gender) => (
                                                        <SelectItem key={gender.value} value={String(gender.value)}>
                                                            {gender.label}
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
                                control={personalInfoForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="johndoe@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={personalInfoForm.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+923001234567" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={personalInfoForm.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123 Main St, City, Country" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={personalInfoForm.formState.isSubmitting}>
                        {personalInfoForm.formState.isSubmitting ? "Processing..." : "Continue"}
                    </Button>

                    <div className="text-center mt-2">
                        <span className="text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/signup"
                                className="ml-auto text-sm underline-offset-2 hover:underline"
                            >
                                Sign In
                            </Link>
                        </span>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default PersonalInfoStep