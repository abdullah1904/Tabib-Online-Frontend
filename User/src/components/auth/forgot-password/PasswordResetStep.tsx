import { Button, Input, InputOtp } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { PasswordResetFormData, passwordResetFormSchema } from "@/lib/validation";

interface PasswordResetStepProps {
    onSubmit: (data: PasswordResetFormData) => Promise<void>;
    isLoading: boolean;
    userEmail: string;
}

const PasswordResetStep = ({ onSubmit, isLoading, userEmail, }: PasswordResetStepProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PasswordResetFormData>({
        resolver: zodResolver(passwordResetFormSchema),
        mode: "onBlur",
    });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <>
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Reset Password
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    We&apos;ve sent a 6-digit verification code to {userEmail}. Please enter it below and Create a new strong password for your account.
                </p>
            </div>
            <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-2">
                    {[1, 2].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step <= 3
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-400"
                                    }`}
                            >
                                {step}
                            </div>
                            {step < 2 && (
                                <div
                                    className={`w-8 h-0.5 mx-2 transition-colors ${step < 3 ? "bg-primary" : "bg-gray-200"}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-6 max-w-md mx-auto w-full">
                    <div className="space-y-4 mx-auto">
                        <p className="text-primary text-small mb-2 block">Verification Code</p>
                        <InputOtp
                            {...register("otp")}
                            length={6}
                            size="lg"
                            isInvalid={!!errors.otp}
                            errorMessage={errors.otp?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                errorMessage: "text-xs",
                                wrapper: 'flex justify-evenly'
                            }}
                        />
                    </div>
                    <div className="space-y-6">
                        <Input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            endContent={
                                <button
                                    onClick={togglePasswordVisibility}
                                    className="text-primary hover:text-primary-600 transition-colors focus:outline-none"
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            }
                            placeholder="********"
                            label="New Password"
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Input
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            endContent={
                                <button
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="text-primary hover:text-primary-600 transition-colors focus:outline-none"
                                    type="button"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            }
                            placeholder="********"
                            label="Confirm Password"
                            isInvalid={!!errors.confirmPassword}
                            errorMessage={errors.confirmPassword?.message}
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
                        isLoading={isLoading || isSubmitting}
                        disabled={isLoading || isSubmitting}
                        className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        {isLoading || isSubmitting ? "Processing..." : "Reset Password"}
                    </Button>

                    <div className="text-center pt-4">
                        <span className="text-gray-600 text-sm sm:text-base">
                            Remember your password?{" "}
                        </span>
                        <Link
                            href="/signin"
                            className="text-primary font-medium underline hover:text-primary-600 transition-colors text-sm sm:text-base"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </form >
        </>
    );
};

export default PasswordResetStep;