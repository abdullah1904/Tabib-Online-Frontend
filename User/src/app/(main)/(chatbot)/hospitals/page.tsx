import HospitalsTable from '@/components/hospitals/HospitalsTable';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Hospitals | Tabib Online",
};

const HospitalsPage = () => {
  return (
    <HospitalsTable/>
  )
}

export default HospitalsPage