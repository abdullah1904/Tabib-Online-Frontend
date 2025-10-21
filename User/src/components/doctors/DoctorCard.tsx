import { Button, Card, CardBody, CardFooter } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { Star, BadgeCheck } from "lucide-react"

type DoctorCardProps = {
    id: number;
    doctorPrefix: string;
    fullName: string;
    specialization: string;
    rating: number;
    isVerified: boolean;
    image: string | null;
}

const DoctorCard = ({doctorPrefix,fullName, specialization, image, rating, isVerified, id}:DoctorCardProps) => {
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        // Render full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            );
        }
        
        // Render half star
        if (hasHalfStar) {
            stars.push(
                <div key="half" className="relative">
                    <Star className="w-4 h-4 text-gray-300" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0" 
                          style={{ clipPath: 'inset(0 50% 0 0)' }} />
                </div>
            );
        }
        
        // Render empty stars
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
            );
        }
        
        return stars;
    };

    return (
        <Card>
            <CardBody>
                <div className="relative inline-block mx-auto">
                    <Image
                        src={image ?? `/assets/Doctor1.png`}
                        alt="Doctor"
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-primary border-2"
                    />
                </div>
                
                <div className="flex items-center justify-center gap-1">
                    <h3 className="text-primary-dark text-lg font-semibold text-center">{doctorPrefix} {fullName}</h3>
                    {/* Alternative verification tick next to name */}
                    {isVerified && (
                        <BadgeCheck className="w-5 h-5 text-primary" />
                    )}
                </div>
                
                <p className="text-primary text-center mb-2">
                    {specialization}
                </p>
                
                {/* Rating Section */}
                <div className="flex items-center justify-center gap-1 mb-2">
                    {renderStars()}
                    <span className="text-sm text-gray-600 ml-1">
                        ({rating.toFixed(1)})
                    </span>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button as={Link} href={`/doctors/${id}`} className="mx-auto" color="primary">
                    View Profile
                </Button>
            </CardFooter>
        </Card>
    )
}

export default DoctorCard