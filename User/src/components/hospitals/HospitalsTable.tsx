"use client"
import { Card, CardBody, CardFooter, Pagination } from "@heroui/react"
import HospitalCard from "./HospitalCard"

const hospitalsData = [
  {
    "id": "1",
    "name": "City Hospital",
    "location": "Downtown",
    "image": "Hospital1.png",
    "rating": 4.5
  },
  {
    "id": "2",
    "name": "General Medical Center",
    "location": "Midtown",
    "image": "Hospital2.png",
    "rating": 4.3
  },
  {
    "id": "3",
    "name": "Regional Health Institute",
    "location": "North District",
    "image": "Hospital3.png",
    "rating": 4.7
  },
  {
    "id": "4",
    "name": "Memorial Hospital",
    "location": "South Side",
    "image": "Hospital4.png",
    "rating": 4.6
  },
  {
    "id": "5",
    "name": "Community Care Center",
    "location": "East End",
    "image": "Hospital1.png",
    "rating": 4.2
  },
  {
    "id": "6",
    "name": "University Hospital",
    "location": "Campus Area",
    "image": "Hospital2.png",
    "rating": 4.8
  },
  {
    "id": "7",
    "name": "Central Medical Complex",
    "location": "City Center",
    "image": "Hospital3.png",
    "rating": 4.4
  },
  {
    "id": "8",
    "name": "Riverside Hospital",
    "location": "Waterfront",
    "image": "Hospital4.png",
    "rating": 4.5
  },
  {
    "id": "9",
    "name": "Metro Health Services",
    "location": "Uptown",
    "image": "Hospital1.png",
    "rating": 4.3
  }
]

const HospitalsTable = () => {
  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-start p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground'>
      <Card className='flex-1 w-full shadow-lg rounded-lg h-[80vh]'>
        <CardBody className='text-primary'>
          Filter Section
        </CardBody>
      </Card>
      <Card className='flex-3 w-full'>
        <CardBody className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-primary'>
          {hospitalsData.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              id={hospital.id}
              name={hospital.name}
              location={hospital.location}
              image={hospital.image}
              rating={hospital.rating}
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

export default HospitalsTable