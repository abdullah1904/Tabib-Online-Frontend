"use client";
import { Button, Card, CardBody, Input } from "@heroui/react"
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignInFormData, signInFormSchema } from "@/lib/validation";
import { showToast } from "@/utils";


const SignInForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Login successful!", data);
            showToast("Login successful!", "success");
            router.push("/");
        } catch (error) {
            console.error("Login failed:", error);
            showToast("Login failed. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <Card className="w-full shadow-lg">
                    <CardBody className="p-0">
                        <div className="flex flex-col lg:flex-row min-h-[600px]">
                            {/* Form Section */}
                            <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                                        Sign In
                                    </h2>
                                    <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                                        Connect with trusted healthcare professionals and manage your medical needs with our comprehensive platform.
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="space-y-6 max-w-md mx-auto w-full">
                                        {/* Email Input */}
                                        <div>
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
                                        </div>
                                        
                                        {/* Password Input */}
                                        <div>
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
                                                label="Password"
                                                isInvalid={!!errors.password}
                                                errorMessage={errors.password?.message}
                                                classNames={{
                                                    base: "w-full",
                                                    input: "text-base",
                                                    label: "text-sm font-medium",
                                                    errorMessage: "text-xs"
                                                }}
                                            />
                                        </div>

                                        {/* Forgot Password Link */}
                                        <div className="text-right">
                                            <Link 
                                                href="/forgot-password" 
                                                className="text-sm text-primary hover:text-primary-600 underline transition-colors"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>

                                        {/* Login Button */}
                                        <Button
                                            type="submit"
                                            color="primary"
                                            size="lg"
                                            isLoading={isLoading || isSubmitting}
                                            disabled={isLoading || isSubmitting}
                                            className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                            {isLoading || isSubmitting ? "Signing In..." : "Sign In"}
                                        </Button>

                                        {/* Register Link */}
                                        <div className="text-center pt-4">
                                            <span className="text-gray-600 text-sm sm:text-base">
                                                Don&apos;t have an account?{" "}
                                            </span>
                                            <Link 
                                                href="/signup" 
                                                className="text-primary font-medium underline hover:text-primary-600 transition-colors text-sm sm:text-base"
                                            >
                                                Register now
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Image Section */}
                            <div className="flex-1 relative hidden lg:flex items-center justify-center p-6">
                                <div className="relative w-full max-w-md mx-auto">
                                    <Image
                                        src="/assets/WhyUs.png"
                                        alt="Tabib Online - Medical Consultation Illustration"
                                        width={450}
                                        height={450}
                                        className="w-full h-auto object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default SignInForm