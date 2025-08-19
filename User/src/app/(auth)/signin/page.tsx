import SignInForm from '@/components/auth/signin/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In | Tabib Online",
};


const SigninPage = () => {
  return (
    <SignInForm />
  )
}

export default SigninPage