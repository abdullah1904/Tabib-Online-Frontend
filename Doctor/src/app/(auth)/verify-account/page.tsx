import VerifyAccount from '@/components/auth/verify-account/VerifyAccount';
import { notFound } from 'next/navigation';

type Props = {
    searchParams: { email?: string }
}

const VerifyAccountPage = ({ searchParams }: Props) => {
    const { email } = searchParams;
    if(!email){
        notFound();
    }
    
    return (
        <VerifyAccount email={email} />
    )
}

export default VerifyAccountPage