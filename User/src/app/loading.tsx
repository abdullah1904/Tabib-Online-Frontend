"use client";
import { Stethoscope, Heart, Activity } from "lucide-react";

const LoadingPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <div className="w-full">
                        <div className="flex flex-col lg:flex-row min-h-[600px]">
                            {/* Content Section */}
                            <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                                {/* Loading Animation */}
                                <div className="text-center mb-8">
                                    <div className="relative mb-8">
                                        {/* Animated Medical Icons */}
                                        <div className="flex items-center justify-center mb-6 relative">
                                            <div className="relative">
                                                <Stethoscope 
                                                    size={80} 
                                                    className="text-primary animate-pulse"
                                                />
                                                
                                                {/* Rotating heartbeat circle */}
                                                <div className="absolute -top-4 -right-4">
                                                    <Heart 
                                                        size={24} 
                                                        className="text-red-500 animate-bounce"
                                                        style={{ animationDelay: '0.5s' }}
                                                    />
                                                </div>
                                                
                                                {/* Activity indicator */}
                                                <div className="absolute -bottom-2 -left-2">
                                                    <Activity 
                                                        size={20} 
                                                        className="text-primary animate-pulse"
                                                        style={{ animationDelay: '1s' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Spinning loader */}
                                        <div className="relative mx-auto mb-6 w-16 h-16">
                                            <div className="absolute inset-0 border-4 border-secondary rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                                        Loading...
                                    </h2>
                                    
                                    <p className="text-primary text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
                                        Please wait! We&apos;re preparing your healthcare experience. 
                                    </p>                                    
                                </div>

                                {/* Loading States */}
                                <div className="space-y-4 max-w-md mx-auto w-full">
                                    
                                    {/* Tips while loading */}
                                    <div className="text-center pt-4 border-t border-gray-200">
                                        <p className="text-xs text-gray-500 mb-2 font-medium">
                                            💡 Quick Tip
                                        </p>
                                        <p className="text-sm text-gray-600 animate-pulse">
                                            Keep your medical records updated for better consultation experiences
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage