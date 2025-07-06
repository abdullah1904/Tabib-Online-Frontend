"use client"
import React from 'react'
import DoctorCard from './DoctorCard'
import { Card, CardBody, CardFooter, Pagination } from '@heroui/react'


const doctorsData = [
  {
    id: "1",
    name: "Dr. Ahmed Hassan",
    designation: "Cardiologist",
    image: "Doctor1.png"
  },
  {
    id: "2",
    name: "Dr. Fatima Khan",
    designation: "Dermatologist",
    image: "Doctor2.png"
  },
  {
    id: "3",
    name: "Dr. Muhammad Ali",
    designation: "Neurologist",
    image: "Doctor1.png"
  },
  {
    id: "4",
    name: "Dr. Ayesha Malik",
    designation: "Pediatrician",
    image: "Doctor2.png"
  },
  {
    id: "5",
    name: "Dr. Usman Sheikh",
    designation: "Orthopedist",
    image: "Doctor1.png"
  },
  {
    id: "6",
    name: "Dr. Zara Ahmed",
    designation: "Gynecologist",
    image: "Doctor2.png"
  },
  {
    id: "7",
    name: "Dr. Tariq Mahmood",
    designation: "General Physician",
    image: "Doctor1.png"
  },
  {
    id: "8",
    name: "Dr. Sana Riaz",
    designation: "Psychiatrist",
    image: "Doctor2.png"
  },
  {
    id: "9",
    name: "Dr. Bilal Rashid",
    designation: "ENT Specialist",
    image: "Doctor1.png"
  }
];


const DoctorsTable = () => {
  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-start p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground'>
      {/* <div className='flex-1 flex justify-center items-center bg-secondary shadow-lg rounded-lg h-[80vh]'>
            Filters Section
        </div> */}
      {/* <div className='flex-3 grid grid-cols-3 gap-4 bg-secondary shadow-xl rounded-lg p-10'>
             {Array.from({ length: 9 }).map((_, index) => (
                <DoctorCard key={index} />
             ))}
        </div> */}
      <Card className='flex-1 w-full shadow-lg rounded-lg h-[80vh]'>
        <CardBody className='text-primary'>
          Filter Section
        </CardBody>
      </Card>
      <Card className='flex-3 w-full'>
        <CardBody className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-primary'>
          {doctorsData.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              designation={doctor.designation}
              image={doctor.image}
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