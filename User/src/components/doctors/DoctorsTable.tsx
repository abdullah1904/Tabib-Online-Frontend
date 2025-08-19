"use client"
import React from 'react'
import DoctorCard from './DoctorCard'
import { Card, CardBody, CardFooter, Pagination } from '@heroui/react'
import DoctorFilters from './DoctorFilters';

const doctorsData = [
  {
    id: "1",
    name: "Dr. Ahmed Hassan",
    designation: "Cardiologist",
    image: "Doctor1.png",
    rating: 4.8,
    isVerified: true
  },
  {
    id: "2",
    name: "Dr. Fatima Khan",
    designation: "Dermatologist",
    image: "Doctor2.png",
    rating: 4.6,
    isVerified: true
  },
  {
    id: "3",
    name: "Dr. Muhammad Ali",
    designation: "Neurologist",
    image: "Doctor1.png",
    rating: 4.9,
    isVerified: true
  },
  {
    id: "4",
    name: "Dr. Ayesha Malik",
    designation: "Pediatrician",
    image: "Doctor2.png",
    rating: 4.7,
    isVerified: false
  },
  {
    id: "5",
    name: "Dr. Usman Sheikh",
    designation: "Orthopedist",
    image: "Doctor1.png",
    rating: 4.5,
    isVerified: true
  },
  {
    id: "6",
    name: "Dr. Zara Ahmed",
    designation: "Gynecologist",
    image: "Doctor2.png",
    rating: 4.8,
    isVerified: true
  },
  {
    id: "7",
    name: "Dr. Tariq Mahmood",
    designation: "General Physician",
    image: "Doctor1.png",
    rating: 4.4,
    isVerified: false
  },
  {
    id: "8",
    name: "Dr. Sana Riaz",
    designation: "Psychiatrist",
    image: "Doctor2.png",
    rating: 4.9,
    isVerified: true
  },
  {
    id: "9",
    name: "Dr. Bilal Rashid",
    designation: "ENT Specialist",
    image: "Doctor1.png",
    rating: 4.6,
    isVerified: true
  }
];

const DoctorsTable = () => {
  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-start p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground'>
      <DoctorFilters />
      <Card className='flex-3 w-full'>
        <CardBody className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-primary'>
          {doctorsData.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              designation={doctor.designation}
              image={doctor.image}
              rating={doctor.rating}
              isVerified={doctor.isVerified}
            />
          ))}
        </CardBody>
        <CardFooter className='flex justify-center items-center p-4'>
          <Pagination initialPage={1} total={10} />
        </CardFooter>
      </Card>
    </div>
  )
}

export default DoctorsTable