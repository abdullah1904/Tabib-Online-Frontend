"use client";
import { Button, Divider } from "@heroui/react"
import { CircleSmall } from "lucide-react";
import Image from "next/image"
import Link from "next/link"


const WhyUs = () => {
    return (
        <div className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-evenly gap-4 p-4 md:p-10 overflow-hidden bg-secondary">
            <div className="w-full flex justify-center items-center">
                <Image
                    src="/assets/WhyUs.png"
                    width={450}
                    height={450}
                    alt="Why Us"
                    className="w-full h-auto object-cover md:w-[450px] md:h-[450px]"
                />
            </div>
            <div className="flex justify-start flex-col w-full">
                <h2 className="text-primary text-4xl">Why choose Tabib Online?</h2>
                <Divider className="w-full mx-auto my-2 bg-primary" />
                <p className="text-primary-dark text-justify py-2 font-open-sans">At Tabib Online, we understand that accessing quality healthcare can be overwhelming and time-consuming. That&apos;s why we&apos;ve revolutionized the consultation process to make your healthcare journey seamless and convenient. With our user-friendly platform and advanced medical matching algorithms.</p>
                <div className="text-primary-dark text-justify">
                    <div className="flex items-center">
                        <CircleSmall className="size-4 mr-2"/> Tabib Chatbot
                    </div>
                    <div className="flex items-center">
                        <CircleSmall className="size-4 mr-2"/> Verified Doctors
                    </div>
                    <div className="flex items-center">
                        <CircleSmall className="size-4 mr-2"/> Efficient Doctor Ranking On Your Record
                    </div>
                </div>
                <Button as={Link} href="/login" color="primary" size="md" className="w-[50%] md:w-[20%] mt-4">
                    Get Started
                </Button>
            </div>
        </div>
    )
}

export default WhyUs