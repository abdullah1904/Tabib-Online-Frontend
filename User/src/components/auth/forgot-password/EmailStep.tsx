import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { EmailFormData, emailFormSchema } from "@/lib/validation";

interface EmailStepProps {
    onSubmit: (data: EmailFormData) => Promise<void>;
    isLoading: boolean;
}

const EmailStep = ({ onSubmit, isLoading }: EmailStepProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailFormSchema),
        mode: "onBlur",
    });

    return (
        <>
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Forgot Password
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Enter your email address and we&apos;ll send you a verification code to reset your password.
                </p>
            </div>
            <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step <= 1
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-400"
                                    }`}
                            >
                                {step}
                            </div>
                            {step < 3 && (
                                <div
                                    className={`w-8 h-0.5 mx-2 transition-colors ${step < 1 ? "bg-primary" : "bg-gray-200"}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-6 max-w-md mx-auto w-full">
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder="user@email.com"
                        label="Email"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />

                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        isLoading={isLoading || isSubmitting}
                        disabled={isLoading || isSubmitting}
                        className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        {isLoading || isSubmitting ? "Processing..." : "Send Verification Code"}
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
            </form>
        </>
    );
};

export default EmailStep;