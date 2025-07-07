"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/assets/Hero8.jpg')",
                }}
            />

            <div className="absolute inset-0 bg-black opacity-50" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
                    Your Health, Our Priority{' '}
                    <span className="block text-primary">Anytime, Anywhere</span>
                </h2>

                <p className="text-lg md:text-xl text-secondary mb-8 max-w-5xl mx-auto leading-relaxed">
                    Are you seeking reliable healthcare from the comfort of your home? Look no further! Welcome to{' '}
                    <span className="text-primary font-semibold">Tabib Online</span>, your gateway to world-class medical care.
                    Whether you need a routine consultation or urgent medical advice, our platform connects you with certified doctors
                    and healthcare professionals across all specialties. Experience healthcare redefined.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button as={Link} href="/doctors" size="lg" color="primary" >
                        Book Consultation
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Hero;