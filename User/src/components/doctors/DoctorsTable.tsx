"use client"
import React, { useState } from 'react'
import DoctorCard from './DoctorCard'
import { Card, CardBody, CardFooter, Pagination, Spinner } from '@heroui/react'
import DoctorFilters from './DoctorFilters';
import { useQuery } from '@tanstack/react-query';
import { listDoctors } from '@/services/doctors.service';
import { useDebounce } from 'use-debounce';
import { getDoctorPrefixText, getSpecializationText } from '@/utils';

const DoctorsTable = () => {
  const [searchTerm] = useState<string>("");
  const [value] = useDebounce(searchTerm, 1000);
  const {
    data: doctorsData = [],
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
        <CardBody className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-primary'>
          {doctorsData.map((doctor) => (
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
        <CardFooter className='flex justify-center items-center p-4'>
          <Pagination initialPage={1} total={10} />
        </CardFooter>
      </Card >
    </div >
  )
}

export default DoctorsTable