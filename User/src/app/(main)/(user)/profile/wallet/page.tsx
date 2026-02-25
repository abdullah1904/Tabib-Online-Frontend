import WalletProfile from '@/components/profile/WalletProfile';
import { Metadata } from 'next';
import React from 'react'

type Props = {
    searchParams: Promise<{ topup?: 'success' | 'cancel' }>
}

export const metadata: Metadata = {
  title: "Wallet | Tabib Online",
};

const WalletPage = async ({searchParams}: Props) => {
    const { topup } = await searchParams;

  return (
    <WalletProfile topupStatus={topup} />
  )
}

export default WalletPage