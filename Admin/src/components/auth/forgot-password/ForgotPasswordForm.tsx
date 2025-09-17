"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { PasswordInput } from "@/components/ui/password-input"
import { cn } from "@/lib/utils"
import { ForgotPasswordFormData, forgotPasswordFormSchema, ResetPasswordFormData, resetPasswordFormSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"


const ForgotPasswordForm = ({ className, ...props }: React.ComponentProps<"div">) => {
    const router = useRouter();
    const [step, setStep] = useState<'FORGOT' | 'RESET'>('FORGOT')
    const handleBack = () => {
        setStep('FORGOT');
    }
    const forgotPasswordForm = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: '',
        }
    });
    const onForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStep('RESET');
        toast.success(`OTP sent to your ${data.email}!`);
    }
    const resetPasswordForm = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            otp: '',
            password: '',
        }
    });
    const onResetPasswordSubmit = async (data: ResetPasswordFormData) => {
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success("Password reset successful! Please login with your new password.");
        router.push('/signin');
    }
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            {step === 'FORGOT' && (
                                <Form {...forgotPasswordForm}>
                                    <form className="p-6 md:p-8" onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}>
                                        <div className="flex flex-col gap-6">
                                            <div className="flex flex-col items-center text-center">
                                                <h1 className="text-2xl font-bold">Forgot Password</h1>
                                                <p className="text-muted-foreground text-balance">
                                                    Enter your email to reset your Tabib Online Admin password.
                                                </p>
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={forgotPasswordForm.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="admin@example.com" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex items-center">
                                                    <Link
                                                        href="/signin"
                                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                                    >
                                                        Remember your password?
                                                    </Link>
                                                </div>
                                            </div>
                                            <Button type="submit" className="w-full cursor-pointer" disabled={forgotPasswordForm.formState.isSubmitting}>
                                                {forgotPasswordForm.formState.isSubmitting ? "Loading..." : "Send Reset OTP"}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            )}
                            {step === 'RESET' && (
                                <Form {...resetPasswordForm}>
                                    <form className="p-6 md:p-8" onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)}>
                                        <div className="flex flex-col gap-6">
                                            <div className="flex flex-col items-center text-center">
                                                <h1 className="text-2xl font-bold">Reset Password</h1>
                                                <p className="text-muted-foreground">
                                                    Enter your new password and the OTP sent to your email. {forgotPasswordForm.getValues('email')}
                                                </p>
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={resetPasswordForm.control}
                                                    name="otp"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>OTP</FormLabel>
                                                            <FormControl className="w-full mx-auto">
                                                                <InputOTP maxLength={6} {...field}>
                                                                    <InputOTPGroup>
                                                                        <InputOTPSlot index={0} />
                                                                        <InputOTPSlot index={1} />
                                                                    </InputOTPGroup>
                                                                    <InputOTPSeparator />
                                                                    <InputOTPSlot index={2} />
                                                                    <InputOTPSlot index={3} />
                                                                    <InputOTPSeparator />
                                                                    <InputOTPGroup>
                                                                        <InputOTPSlot index={4} />
                                                                        <InputOTPSlot index={5} />
                                                                    </InputOTPGroup>
                                                                </InputOTP>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={resetPasswordForm.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>New Password</FormLabel>
                                                            <FormControl>
                                                                <PasswordInput placeholder="New password" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex items-center">
                                                    <Link
                                                        href="/signin"
                                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                                    >
                                                        Remember your password?
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3">
                                                <Button type="submit" className="w-full cursor-pointer" disabled={resetPasswordForm.formState.isSubmitting}>
                                                    {resetPasswordForm.formState.isSubmitting ? "Loading..." : "Reset Password"}
                                                </Button>
                                                <Button type="button" onClick={handleBack} variant='outline' className="w-full cursor-pointer" disabled={resetPasswordForm.formState.isSubmitting}>
                                                    Change Email
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            )}
                            <div className="relative hidden md:flex items-center justify-center bg-muted/60 dark:bg-muted rounded-r-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-muted to-background opacity-70" />
                                <Shield className="w-2/3 h-2/3 text-foreground/10 dark:text-white/10" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordForm