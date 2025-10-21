import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';
import { ConsentFormData, consentFormSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type ConsentStepProps = {
    onSubmit: (data: ConsentFormData) => Promise<void>;
    formData: ConsentFormData | null;
    isLoading: boolean;
}

const ConsentStep = ({ formData, isLoading, onSubmit }: ConsentStepProps) => {
    const consentForm = useForm<ConsentFormData>({
        mode: 'onBlur',
        resolver: zodResolver(consentFormSchema),
        defaultValues: {
            password: formData?.password || '',
            authenticInformationConsent: formData?.authenticInformationConsent || false,
            dataUsageConsent: formData?.dataUsageConsent || false,
            licenseVerificationConsent: formData?.licenseVerificationConsent || false,
            termsAgreementConsent: formData?.termsAgreementConsent || false,
        }
    });
    return (
        <>
            <div className="text-center mb-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Consent & Authorization
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Please review and provide your consent for the following items. All consents are required to proceed with our healthcare platform.
                </p>
            </div>
            <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                                step <= 5 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                                {step}
                            </div>
                            {step < 5 && (
                                <div className={cn(
                                    "w-8 h-0.5 mx-2 transition-colors",
                                    step < 5 ? "bg-primary" : "bg-muted"
                                )} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Form {...consentForm}>
                <form onSubmit={consentForm.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <FormField
                                control={consentForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={consentForm.control}
                                name="authenticInformationConsent"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex gap-2'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>I confirm that all the information and documents I have provided are true, accurate, and belong to me.</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={consentForm.control}
                                name="licenseVerificationConsent"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex gap-2'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>I consent to the verification of my professional license and credentials with the relevant medical authorities.</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={consentForm.control}
                                name="termsAgreementConsent"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex gap-2'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>I have read and agree to abide by the platform’s terms of service, privacy policy, and code of conduct for medical professionals.</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={consentForm.control}
                                name="dataUsageConsent"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex gap-2'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>I consent to the use of my professional and personal data for verification and compliance purposes.</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Create Account"}
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

export default ConsentStep