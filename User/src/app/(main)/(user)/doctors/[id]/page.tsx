import DoctorProfile from '@/components/doctors/DoctorProfile'
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

const DoctorPage = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <DoctorProfile doctorId={id} />
  )
}

export default DoctorPage