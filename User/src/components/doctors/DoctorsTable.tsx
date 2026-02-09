"use client"
import React, { useState } from 'react'
import DoctorCard from './DoctorCard'
import { Alert, Card, CardBody, CardHeader, Spinner } from '@heroui/react'
import DoctorFilters from './DoctorFilters';
import { useQuery } from '@tanstack/react-query';
import { listDoctors } from '@/services/doctors.service';
import { useDebounce } from 'use-debounce';
import { getDoctorPrefixText, getSpecializationText } from '@/utils';

const DoctorsTable = () => {
  const [searchTerm] = useState<string>("");
  const [value] = useDebounce(searchTerm, 1000);
  const {
    data: doctorsData = { doctors: [], reasoning: "" },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["doctors", value],
    queryFn: () => listDoctors(value),
  });
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[91vh]  text-red-500">
        Error loading doctors: {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[91vh]  gap-2 text-primary">
        <Spinner /> Loading doctors...
      </div>
    )
  }
  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-start p-2 md:p-10 gap-2 h-[91vh] relative bg-foreground'>
      <DoctorFilters />
      <Card className='flex-3 w-full h-auto'>
        <CardHeader>
          <Alert
            description={doctorsData.reasoning}
            className='m-2'
            color='success'
          />
        </CardHeader>
        <CardBody className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-primary'>
          {doctorsData.doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              doctorPrefix={getDoctorPrefixText(doctor.doctorPrefix)!}
              fullName={doctor.fullName}
              specialization={getSpecializationText(doctor.specialization)!}
              image={doctor.imageURL!}
              ratings={doctor.ratings}
              isVerified={doctor.pmdcVerifiedAt !== null}
            />
          ))}
        </CardBody>
      </Card >
    </div >
  )
}

export default DoctorsTable