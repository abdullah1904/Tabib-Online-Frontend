"use client";
import { Card, CardBody } from "@heroui/react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useState } from "react";
import PersonalInfoStep from "./PersonalInfoStep";
import { ConsentFormData, MedicalInfoFormData, PersonalInfoFormData, VerificationFormData } from "@/lib/validation";
import { showToast } from "@/utils";
import MedicalInfoStep from "./MedicalInfoStep";
import VerificationStep from "./VerificationStep";
import ConsentStep from "./ConsentStep";
import { useRouter } from "next/navigation";


const SignUpForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    personalInfoData: PersonalInfoFormData | null,
    medicalInfoData: MedicalInfoFormData | null,
    verificationData: VerificationFormData | null
    consentData: ConsentFormData | null
  }>({ medicalInfoData: null, personalInfoData: null, verificationData: null, consentData: null });

  const onPersonalInfoSubmit = async (data: PersonalInfoFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Personal Info Submitted:", data);
      setFormData(prev => ({ ...prev, personalInfoData: data }));
      setCurrentStep(2);
      showToast("Personal Info submitted successfully!", "success");
    } catch (error) {
      console.error("Personal Info submission failed:", error);
      showToast("Invalid Personal Info. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const onMedicalInfoSubmit = async (data: MedicalInfoFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Medical Info Submitted:", data);
      setFormData(prev => ({ ...prev, medicalInfoData: data }));
      setCurrentStep(3);
      showToast("Medical Info submitted successfully!", "success");
    } catch (error) {
      console.error("Medical Info submission failed:", error);
      showToast("Invalid Medical Info. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerificationSubmit = async (data: VerificationFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Medical Info Submitted:", data);
      setFormData(prev => ({ ...prev, verificationData: data }));
      setCurrentStep(4);
      showToast("Verification Info submitted successfully!", "success");
    } catch (error) {
      console.error("Verification submission failed:", error);
      showToast("Invalid Verification Info. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const onConsentSubmit = async (data: ConsentFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Consent Info Submitted:", data);
      setFormData(prev => ({ ...prev, consentData: data }));
      setCurrentStep(4);
      showToast("Consent Info submitted successfully!", "success");
      router.push("/doctors");
    } catch (error) {
      console.error("Consent submission failed:", error);
      showToast("Invalid Consent Info. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep onSubmit={onPersonalInfoSubmit} isLoading={isLoading} formData={formData.personalInfoData} />;
      case 2:
        return <MedicalInfoStep onSubmit={onMedicalInfoSubmit} isLoading={isLoading} formData={formData.medicalInfoData} />;
      case 3:
        return <VerificationStep onSubmit={onVerificationSubmit} isLoading={isLoading} formData={formData.verificationData} />;
      case 4:
        return <ConsentStep onSubmit={onConsentSubmit} isLoading={isLoading} formData={formData.consentData} />;
      default:
        return <PersonalInfoStep onSubmit={onPersonalInfoSubmit} isLoading={isLoading} formData={formData.personalInfoData} />;
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
                {/* Back Button */}
                {currentStep > 1 && (
                  <div className="mb-6">
                    <button
                      onClick={goBack}
                      className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors font-medium"
                    >
                      <ArrowLeft size={20} />
                      Back
                    </button>
                  </div>
                )}

                {/* Render Current Step */}
                {renderCurrentStep()}
              </div>

              {/* Image Section */}
              <div className="flex-1 relative hidden lg:flex items-center justify-center p-6">
                <div className="relative w-full max-w-md mx-auto">
                  <Image
                    src="/assets/WhyUs.png"
                    alt="Tabib Online - Password Reset Illustration"
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

export default SignUpForm