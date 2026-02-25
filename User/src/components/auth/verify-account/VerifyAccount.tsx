'use client';
import { verifyAccountFormSchema, VerifyAccountFormData } from '@/lib/validation';
import { sendOtp, verifyAccount } from '@/services/auth.service';
import { showToast } from '@/utils';
import { OTPType } from '@/utils/constants';
import { Button, Card, CardBody, InputOtp } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Props = {
  email: string
}

const VerifyAccount = ({ email }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyAccountFormData>({
    resolver: zodResolver(verifyAccountFormSchema),
    mode: "onBlur",
  });

  const { mutate: sendOTPMutate, isPending: isSendingOTP } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      showToast('OTP sent successfully', 'success');
    },
    onError: (error) => {
      showToast(error.message || 'Failed to send OTP', 'error');
    }
  });

  const { mutate: verifyAccountMutate, isPending: isVerifyingAccount } = useMutation({
    mutationFn: verifyAccount,
    onSuccess: () => {
      showToast('Account verified successfully', 'success');
      router.push('/doctors');
    },
    onError: (error) => {
      showToast(error.message || 'Failed to verify account', 'error');
    }
  });

  const onResendOTP = () => {
    sendOTPMutate({ email, type: OTPType.EMAIL_VERIFICATION });
  }
  const onSubmit = (data: VerifyAccountFormData) => {
    verifyAccountMutate({ email, otp: data.otp });
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <Card className="w-full shadow-lg">
          <CardBody className="p-0">
            <div className="flex flex-col lg:flex-row min-h-150">
              {/* Form Section */}
              <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12">


                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Verify Your Account
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    We&apos;ve sent a 6-digit verification code to {email}. Please enter it below and verify your account.
                  </p>
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
                                input: "text-base text-primary",
                                errorMessage: "text-sm",
                                wrapper: 'flex justify-evenly',
                                passwordChar: 'text-primary text-lg',
                                segment: 'text-primary text-lg'
                            }}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        isLoading={isVerifyingAccount}
                        disabled={isVerifyingAccount}
                        className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {isVerifyingAccount ? "Verifying..." : "Verify Account"}
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        size="lg"
                        onPress={onResendOTP}
                        isLoading={isSendingOTP}
                        disabled={isSendingOTP}
                        className="text-primary w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {isSendingOTP || isSubmitting ? "Resending OTP..." : "Resend OTP"}
                      </Button>
                    </div>
                  </div>
                </form >
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

export default VerifyAccount