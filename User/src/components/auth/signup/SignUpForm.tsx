"use client";
import { Card, CardBody } from "@heroui/react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useState } from "react";
import PersonalInfoStep from "./PersonalInfoStep";
import { ConsentFormData, MedicalInfoFormData, medicalInfoFormSchema, PersonalInfoFormData, personalInfoFormSchema, VerificationFormData, verificationFormSchema } from "@/lib/validation";
import { showToast } from "@/utils";
import MedicalInfoStep from "./MedicalInfoStep";
import VerificationStep from "./VerificationStep";
import ConsentStep from "./ConsentStep";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/auth.service";


const SignUpForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    personalInfoData: PersonalInfoFormData | null,
    medicalInfoData: MedicalInfoFormData | null,
    verificationData: VerificationFormData | null
    consentData: ConsentFormData | null
  }>({ medicalInfoData: null, personalInfoData: null, verificationData: null, consentData: null });

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      showToast("Sign Up successful! Please verify your account.", "success");
      router.push(`/verify-account?email=${formData.personalInfoData?.email}`);
    },
    onError: (error) => {
      showToast(error.message || "Sign Up failed. Please try again.", "error");
    }
  });

  const onPersonalInfoSubmit = async (data: PersonalInfoFormData) => {
    setFormData(prev => ({ ...prev, personalInfoData: data }));
    setCurrentStep(2);
  };
  const onMedicalInfoSubmit = async (data: MedicalInfoFormData) => {
    setFormData(prev => ({ ...prev, medicalInfoData: data }));
    setCurrentStep(3);
  };

  const onVerificationSubmit = async (data: VerificationFormData) => {
    setFormData(prev => ({ ...prev, verificationData: data }));
    setCurrentStep(4);
  };
  const onConsentSubmit = async (data: ConsentFormData) => {
    setFormData(prev => ({ ...prev, consentData: data }));
    setCurrentStep(4);
    const personalInfoDataResult = personalInfoFormSchema.safeParse(formData.personalInfoData);
    const medicalInfoDataResult = medicalInfoFormSchema.safeParse(formData.medicalInfoData);
    const verificationDataResult = verificationFormSchema.safeParse(formData.verificationData);
    if (!personalInfoDataResult.success) {
      showToast("Invalid personal information data. Please review your inputs.","error");
      setCurrentStep(1);
      return;
    }
    if (!medicalInfoDataResult.success) {
      showToast("Invalid medical information data. Please review your inputs.","error");
      setCurrentStep(2);
      return;
    }
    if (!verificationDataResult.success) {
      showToast("Invalid verification data. Please review your inputs.","error");
      setCurrentStep(3);
      return;
    }
    const userData = new FormData();
    userData.append('fullName', formData.personalInfoData?.fullName || '');
    userData.append('age', String(formData.personalInfoData?.age || 0));
    userData.append('gender', String(formData.personalInfoData?.gender || 0));
    userData.append('email', formData.personalInfoData?.email || '');
    userData.append('phone', formData.personalInfoData?.phoneNumber || '');
    userData.append('address', formData.personalInfoData?.address || '');
    userData.append('emergencyContactNumber', formData.personalInfoData?.emergencyPhoneNumber || '');
    userData.append('emergencyContactName', formData.personalInfoData?.emergencyContactName || '');
    userData.append('bloodType', formData.medicalInfoData?.bloodType || '');
    userData.append('height', String(formData.medicalInfoData?.height || 0));
    userData.append('weight', String(formData.medicalInfoData?.weight || 0));
    userData.append('allergies', formData.medicalInfoData?.knownAllergies || '');
    userData.append('currentMedications', formData.medicalInfoData?.currentMedications || '');
    userData.append('familyMedicalHistory', formData.medicalInfoData?.familyMedicalHistory || '');
    userData.append('pastMedicalHistory', formData.medicalInfoData?.pastMedicalHistory || '');
    userData.append('verificationDocumentType', formData.verificationData?.verificationType || '');
    userData.append('verificationDocumentNumber', formData.verificationData?.verificationNumber || '');
    userData.append('image', formData.verificationData?.verificationDocument || '');
    userData.append('password', data.password);
    userData.append('treatmentConsent', data.treatmentConsent ? 'true' : 'false');
    userData.append('healthInfoDisclosureConsent', data.healthInfoDisclosure ? 'true' : 'false');
    userData.append('privacyPolicyConsent', data.privacyPolicyAgreement ? 'true' : 'false');
    mutate(userData);
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep onSubmit={onPersonalInfoSubmit} formData={formData.personalInfoData} />;
      case 2:
        return <MedicalInfoStep onSubmit={onMedicalInfoSubmit} formData={formData.medicalInfoData} />;
      case 3:
        return <VerificationStep onSubmit={onVerificationSubmit} formData={formData.verificationData} />;
      case 4:
        return <ConsentStep onSubmit={onConsentSubmit} isLoading={isPending} formData={formData.consentData} />;
      default:
        return <PersonalInfoStep onSubmit={onPersonalInfoSubmit} formData={formData.personalInfoData} />;
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