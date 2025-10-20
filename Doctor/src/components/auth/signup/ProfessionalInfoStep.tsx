'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ProfessionalInfoFormData, professionalInfoFormSchema } from '@/lib/validation';
import { MedicalDegreeOptions, PostGraduateDegreeOptions, SpecializationOptions } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';

type ProfessionalInfoStepProps = {
    onSubmit: (data: ProfessionalInfoFormData) => Promise<void>;
    formData: ProfessionalInfoFormData | null;
}

const ProfessionalInfoStep = ({ formData, onSubmit }: ProfessionalInfoStepProps) => {
    const professionalInfoForm = useForm<ProfessionalInfoFormData>({
        resolver: zodResolver(professionalInfoFormSchema),
        mode: "onBlur",
        defaultValues: {
            pmdcRedgNo: formData?.pmdcRedgNo || '',
            pmdcRedgDate: formData?.pmdcRedgDate ? new Date(formData.pmdcRedgDate) : undefined,
            medicalDegree: formData?.medicalDegree || undefined,
            postgraduateDegree: formData?.postgraduateDegree || undefined,
            specialization: formData?.specialization || undefined,
            yearsOfExperience: formData?.yearsOfExperience || undefined,
        }
    });
    return (
        <>
            <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Professional Information</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                    Tell us about your professional background.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                                step <= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                                {step}
                            </div>
                            {step < 5 && (
                                <div className={cn(
                                    "w-8 h-0.5 mx-2 transition-colors",
                                    step < 2 ? "bg-primary" : "bg-muted"
                                )} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Form {...professionalInfoForm}>
                <form onSubmit={professionalInfoForm.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={professionalInfoForm.control}
                                name="pmdcRedgNo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PMDC Registration No.</FormLabel>
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
                                control={professionalInfoForm.control}
                                name="pmdcRedgDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PMDC Registration Date</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        data-empty={!field.value}
                                                        className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                                    >
                                                        {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className='ml-auto' />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        captionLayout="dropdown"
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            // update only if valid date
                                                            if (date) field.onChange(date);
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={professionalInfoForm.control}
                                name="medicalDegree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Medical Degree</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={`${field.value ? "text-foreground" : "text-muted-foreground"} font-normal w-full justify-between`}
                                                    >
                                                        {field.value
                                                            ? MedicalDegreeOptions.find((degree) => String(degree.value) === field.value)?.label
                                                            : "Select Medical Degree..."}
                                                        <ChevronDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search Medical Degree..." />
                                                        <CommandList>
                                                            <CommandEmpty>No medical degree found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {MedicalDegreeOptions.map((degree) => (
                                                                    <CommandItem
                                                                        key={degree.value}
                                                                        value={String(degree.value)}
                                                                        onSelect={(currentValue) => {
                                                                            field.onChange(currentValue);
                                                                        }}
                                                                    >
                                                                        {degree.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                field.value === String(degree.value) ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={professionalInfoForm.control}
                                name="postgraduateDegree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postgraduate Degree</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={`${field.value ? "text-foreground" : "text-muted-foreground"} font-normal w-full justify-between`}
                                                    >
                                                        {field.value
                                                            ? PostGraduateDegreeOptions.find((framework) => String(framework.value) === field.value)?.label
                                                            : "Select Postgraduate Degree..."}
                                                        <ChevronDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search Postgraduate Degree..." />
                                                        <CommandList>
                                                            <CommandEmpty>No postgraduate degree found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {PostGraduateDegreeOptions.map((degree) => (
                                                                    <CommandItem
                                                                        key={degree.value}
                                                                        value={String(degree.value)}
                                                                        onSelect={(currentValue) => {
                                                                            field.onChange(currentValue);
                                                                        }}
                                                                    >
                                                                        {degree.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                field.value === String(degree.value) ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={professionalInfoForm.control}
                                name="specialization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Specialization</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={`${field.value ? "text-foreground" : "text-muted-foreground"} font-normal w-full justify-between`}
                                                    >
                                                        {field.value
                                                            ? SpecializationOptions.find((framework) => String(framework.value) === field.value)?.label
                                                            : "Select Specialization..."}
                                                        <ChevronDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search Specialization..." />
                                                        <CommandList>
                                                            <CommandEmpty>No specialization found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {SpecializationOptions.map((specialization) => (
                                                                    <CommandItem
                                                                        key={specialization.value}
                                                                        value={String(specialization.value)}
                                                                        onSelect={(currentValue) => {
                                                                            field.onChange(currentValue);
                                                                        }}
                                                                    >
                                                                        {specialization.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                field.value === String(specialization.value) ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={professionalInfoForm.control}
                                name="yearsOfExperience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Years of Experience</FormLabel>
                                        <FormControl>
                                            <NumberInput placeholder="5" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={professionalInfoForm.formState.isSubmitting}>
                        {professionalInfoForm.formState.isSubmitting ? "Processing..." : "Continue"}
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

export default ProfessionalInfoStep