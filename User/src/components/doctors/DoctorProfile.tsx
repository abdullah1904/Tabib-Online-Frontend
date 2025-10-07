"use client"
import { Button, Card, CardBody, CardHeader } from '@heroui/react'
import { BadgeCheck, FileBadge, Hospital, MessageCircle, Phone, Star, Video, } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import ConsultationDetailModel from './ConsultationDetailModel';

type Props = {
  userId: string
}

const doctor = {
  "name": "Dr. Jane Smith",
  "specialization": "Cardiologist",
  "isVerified": true,
  "qualification": ["MBBS", "MCPS", "FCPS"],
  "experience": "10 years",
  "totalReviews": 200,
  "overAllRating": 4.8,
  "consultationType": [
    "In-person",
    "Video Call",
    "Audio Call",
  ],
  "reviews": [
    {
      "username": "Ali Khan",
      "rating": 5,
      "comment": "Excellent consultation, very professional and helpful!",
      "date": "2025-08-10"
    },
    {
      "username": "Sara Ahmed",
      "rating": 4,
      "comment": "Good experience overall, but waiting time was a bit long.",
      "date": "2025-08-15"
    },
    {
      "username": "Usman Tariq",
      "rating": 5,
      "comment": "Doctor explained everything clearly. Highly recommended.",
      "date": "2025-08-18"
    },
    {
      "username": "Fatima Noor",
      "rating": 3,
      "comment": "Consultation was fine, but could be more detailed.",
      "date": "2025-08-20"
    }
  ]

}

const DoctorProfile = ({ }: Props) => {
  const [showModel, setShowModel] = useState<'Appointment' | 'Review' | 'Complaint' | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const renderStars = (rating: number) => {
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
  const handleConsultationClick = (type: string) => {
    setShowModel('Appointment');
    setSelectedConsultation(type);
  }
  return (
    <>
      <div className='w-full flex flex-col justify-start items-center p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground'>
        <Card className='w-full max-w-4xl lg:w-3/4 p-4'>
          <CardBody className='flex w-full flex-col md:flex-row items-center sm:items-start gap-4'>
            <div className="flex-shrink-0">
              <Image
                src={`/assets/Doctor1.png`}
                alt="Doctor"
                width={50}
                height={50}
                className="w-20 h-20 sm:w-24 sm:h-24 md:size-28 rounded-full border-primary border-2"
              />
            </div>
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                {/* Doctor Info */}
                <div className="w-full text-center sm:text-left">
                  {/* Name + Badge */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-2 mb-2">
                    <h3 className="text-primary-dark text-xl sm:text-2xl font-semibold">
                      {doctor.name}
                    </h3>
                    {doctor.isVerified && (
                      <BadgeCheck className="w-5 h-5 text-primary" />
                    )}
                  </div>

                  {/* Specialization */}
                  <p className="text-base sm:text-lg text-gray-700">
                    {doctor.specialization}
                  </p>

                  {/* Qualification */}
                  <p className="text-sm sm:text-base text-gray-600 mb-3">
                    {doctor.qualification.join(", ")}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-6 mt-2">
                    {/* Rating */}
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      {renderStars(doctor.overAllRating)}
                      <span className="text-sm text-gray-600 ml-1">
                        ({doctor.overAllRating.toFixed(1)})
                      </span>
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-600">
                        {doctor.totalReviews} Reviews
                      </span>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <FileBadge className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-600">
                        {doctor.experience} Experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </CardBody>
        </Card>
        <Card className='w-full max-w-4xl lg:w-3/4 p-4'>
          <CardHeader>
            <h3 className='text-primary-dark text-xl font-semibold'>Consultation Details</h3>
          </CardHeader>
          <CardBody>
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
              {doctor.consultationType.map((type, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-between border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white"
                >
                  {/* Icon */}
                  {type === "In-person" && (
                    <Hospital className="w-12 h-12 text-primary mb-4" />
                  )}
                  {type === "Audio Call" && (
                    <Phone className="w-12 h-12 text-primary mb-4" />
                  )}
                  {type === "Video Call" && (
                    <Video className="w-12 h-12 text-primary mb-4" />
                  )}

                  {/* Title */}
                  <p className="text-base font-medium text-gray-800 mb-3 text-center">
                    {type}
                  </p>

                  {/* Button */}
                  <Button className="w-full" size="sm" color="primary" onPress={() => handleConsultationClick(type)}>
                    Make {type} Appointment
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card className='w-full max-w-4xl lg:w-3/4 p-2'>
          <CardBody className='grid grid-cols-2 items-center gap-2'>
            <Button className="w-full" size="md" color="primary">
              Give Review
            </Button>
            <Button className="w-full" size="md" color="danger" >
              Complaint
            </Button>
          </CardBody>
        </Card>
        <Card className='w-full max-w-4xl lg:w-3/4 p-4'>
          <CardHeader>
            <h3 className="text-primary-dark text-xl font-semibold">Reviews</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            {doctor.reviews.map((review, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                {/* Top Row: Username + Rating + Date */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">{review.username}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </CardBody>
        </Card>

      </div>
      {showModel == 'Appointment' && selectedConsultation && (
        <ConsultationDetailModel
          showModel={showModel}
          setShowModel={setShowModel}
          consultationType={selectedConsultation}
          setConsultationType={setSelectedConsultation}

        />
      )}
    </>
  )
}

export default DoctorProfile