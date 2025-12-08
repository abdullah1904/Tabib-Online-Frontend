import SignInForm from '@/components/auth/signin/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In | Tabib Online",
};

type Props = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>
}


const SigninPage = async ({searchParams}:Props) => {
  const {callbackUrl} = await searchParams;
  return (
    <SignInForm callbackUrl={callbackUrl}/>
  )
}

export default SigninPage