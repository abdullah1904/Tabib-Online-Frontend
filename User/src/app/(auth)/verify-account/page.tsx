import VerifyAccount from '@/components/auth/verify-account/VerifyAccount';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: "Verify Account | Tabib Online",
};

type Props = {
    searchParams: Promise<{ email?: string }>
}

const VerifyAccountPage = async ({ searchParams }: Props) => {
    const { email } = await searchParams;
    if(!email){
        notFound();
    }
    
    return (
        <VerifyAccount email={email} />
    )
}

export default VerifyAccountPage