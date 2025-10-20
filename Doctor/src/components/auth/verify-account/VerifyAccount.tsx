'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils"
import { VerifyAccountFormData, verifyAccountFormSchema } from "@/lib/validation"
import { sendOtp, verifyAccount } from "@/services/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    email: string
}


const VerifyAccount = ({ email }: Props) => {
    const router = useRouter();

    const verifyAccountForm = useForm<VerifyAccountFormData>({
        resolver: zodResolver(verifyAccountFormSchema),
        mode: "onBlur",
    });

    const { mutate: sendOTPMutate, isPending: isSendingOTP } = useMutation({
        mutationFn: sendOtp,
        onSuccess: () => {
            toast.success('OTP sent successfully');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to send OTP');
        }
    });

    const { mutate: verifyAccountMutate, isPending: isVerifyingAccount } = useMutation({
        mutationFn: verifyAccount,
        onSuccess: () => {
            toast.success('Account verified successfully');
            router.push('/signin');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to verify account');
        }
    });

    const onResendOTP = () => {
        sendOTPMutate({ email });
    }
    const onSubmit = (data: VerifyAccountFormData) => {
        verifyAccountMutate({ email, otp: data.otp });
    }
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className={cn("flex flex-col gap-6")}>
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <Form {...verifyAccountForm}>
                                <form className="p-6 md:p-8" onSubmit={verifyAccountForm.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-2xl font-bold">Verify Your Account</h1>
                                            <p className="text-muted-foreground">
                                                We&apos;ve sent a 6-digit verification code to {email}. Please enter it below and verify your account.
                                            </p>
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={verifyAccountForm.control}
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
                                                                <InputOTPGroup>
                                                                    <InputOTPSlot index={2} />
                                                                    <InputOTPSlot index={3} />
                                                                </InputOTPGroup>
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
                                            <div className="grid grid-cols-1 gap-3">
                                                <Button type="submit" className="w-full cursor-pointer" disabled={isVerifyingAccount}>
                                                    {isVerifyingAccount ? "Loading..." : "Verify Account"}
                                                </Button>
                                                <Button type="button" onClick={onResendOTP} variant='outline' className="w-full cursor-pointer" disabled={isSendingOTP}>
                                                    {isSendingOTP ? "Resending..." : "Resend OTP"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                            <div className="relative hidden md:flex items-center justify-center bg-muted/60 dark:bg-muted rounded-r-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-muted to-background opacity-70" />
                                <Stethoscope className="w-2/3 h-2/3 text-foreground/10 dark:text-white/10" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount