import { Button, Card, CardBody, CardFooter } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

type DoctorCardProps = {
    name: string;
    designation: string;
    image?: string;
}

const DoctorCard = ({name,designation,image}:DoctorCardProps) => {
  return (
    <Card>
        <CardBody>
            <Image
                src={`/assets/${image}`}
                alt="Doctor"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-primary-dark text-lg font-semibold text-center mb-2">{name}</h3>
            <p className="text-primary text-center">
                {designation}
            </p>
        </CardBody>
        <CardFooter className="pt-0">
            <Button as={Link} href="/appointment" className="mx-auto" color="primary">
                View Profile
            </Button>
        </CardFooter>
    </Card>
  )
}

export default DoctorCard