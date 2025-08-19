import ForgetPasswordForm from "@/components/auth/forgot-password/ForgetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password | Tabib Online",
};

const ForgetPasswordPage = () => {
  return (
    <ForgetPasswordForm/>
  )
}

export default ForgetPasswordPage