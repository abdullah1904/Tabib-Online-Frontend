"use client";
import { Button, Card, CardBody } from "@heroui/react"
import { ArrowLeft, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <Card className="w-full shadow-lg">
                    <CardBody className="p-0">
                        <div className="flex flex-col lg:flex-row min-h-[600px]">
                            {/* Content Section */}
                            <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                                {/* 404 Number with animation */}
                                <div className="text-center mb-8">
                                    <div className="relative mb-6">
                                        <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-primary opacity-20 select-none">
                                            404
                                        </h1>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Stethoscope 
                                                size={80} 
                                                className="text-primary animate-pulse"
                                            />
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                        Page Not Found
                                    </h2>
                                    
                                    <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-2">
                                        We couldn&apos;t find the medical resource you&apos;re looking for. 
                                        It might have been moved, deleted, or the URL might be incorrect.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-6 max-w-md mx-auto w-full">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            as={Link}
                                            href="/"
                                            color="primary"
                                            size="lg"
                                            startContent={<ArrowLeft size={20} />}
                                            onPress={handleBack}
                                            className="flex-1 font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                            Go Back
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default NotFoundPage