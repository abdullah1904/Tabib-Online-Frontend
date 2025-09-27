'use client';

import { SignInFormData, signInFormSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";


const SignInForm = ({ className, ...props }: React.ComponentProps<"div">) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Login successful!", data);
            toast.success("Login successful!");
            router.push("/");
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <Form {...form}>
                                <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-2xl font-bold">Welcome</h1>
                                            <p className="text-muted-foreground text-balance">
                                                Login to your Tabib Online Doctor account
                                            </p>
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
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
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Password</FormLabel>
                                                        <FormControl>
                                                            <PasswordInput placeholder="********" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex items-center">
                                                <Link
                                                    href="/forgot-password"
                                                    className="ml-auto text-sm underline-offset-2 hover:underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                                            {isLoading ? "Loading..." : "Login"}
                                        </Button>
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

export default SignInForm