"use client"
import { Button, Card, CardBody, CardHeader, Spinner } from '@heroui/react'
import { BadgeCheck, FileBadge, Hospital, MessageCircle, Phone, Star, Video, } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getDoctor } from '@/services/doctors.service';
import { getConsultationDurationText, getDayText, getDoctorPrefixText, getSpecializationText } from '@/utils';
import { formatDate } from 'date-fns';
import { Consultation } from '@/types/consultations';
import { ConsultationType } from '@/utils/constants';
import ReviewModal from '../reviews/ReviewModal';
import AppointmentFormModal from '../appointments/AppointmentFormModal';
import { formatInTimeZone } from 'date-fns-tz';

type Props = {
  doctorId: string
}

const DoctorProfile = ({ doctorId }: Props) => {
  const [showModal, setShowModal] = useState<'Appointment' | 'Review' | 'Complaint' | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  const { data: doctorData, isLoading, isError, error } = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => getDoctor(doctorId)
  });

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
  const handleAppointmentClick = (consultation: Consultation) => {
    setShowModal('Appointment');
    setSelectedConsultation(consultation);
  }
  const handleReviewClick = () => {
    setShowModal('Review');
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[91vh]  text-red-500">
        Error loading doctor: {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[91vh]  gap-2 text-primary">
        <Spinner /> Loading doctor...
      </div>
    )
  }
  if(doctorId == null) {
    return (
      <div className="flex items-center justify-center min-h-[91vh]  text-red-500">
        Doctor ID is missing.
      </div>
    );
  }
  return (
    <>
      <div className='w-full flex flex-col justify-start items-center p-2 md:p-10 gap-2 min-h-[91vh] relative'>
        <Card className='w-full max-w-4xl lg:w-3/4 p-4'>
          <CardBody className='flex w-full flex-col md:flex-row items-center sm:items-start gap-4'>
            <div className="shrink-0">
              <Image
                src={doctorData?.imageURL ?? `/assets/Doctor1.png`}
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
                      {getDoctorPrefixText(doctorData?.professionalInfo.prefix ?? 0)} {doctorData?.fullName}
                    </h3>
                    {doctorData?.professionalInfo.PMDCVerifiedAt && (
                      <BadgeCheck className="w-5 h-5 text-primary" />
                    )}
                  </div>

                  {/* Specialization */}
                  <p className="text-base sm:text-lg text-gray-700">
                    {getSpecializationText(doctorData?.professionalInfo.specialization ?? 0)}
                  </p>

                  {/* Qualification */}
                  {/* <p className="text-sm sm:text-base text-gray-600 mb-3">
                    {doctorData?.qualification.join(", ")}
                  </p> */}

                  {/* Stats */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-6 mt-2">
                    {/* Rating */}
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      {renderStars(doctorData?.averageRating ?? 0)}
                      <span className="text-sm text-gray-600 ml-1">
                        ({doctorData?.averageRating.toFixed(1)})
                      </span>
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-600">
                        {doctorData?.doctorReviews.length ?? 0} Reviews
                      </span>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <FileBadge className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-600">
                        {doctorData?.professionalInfo.yearsOfExperience} years Experience
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
              {doctorData?.consultations.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white"
                >
                  {/* Icon */}
                  {service.type === ConsultationType.IN_PERSON && (
                    <Hospital className="w-12 h-12 text-primary mb-4" />
                  )}
                  {service.type === ConsultationType.AUDIO_CALL && (
                    <Phone className="w-12 h-12 text-primary mb-4" />
                  )}
                  {service.type === ConsultationType.VIDEO_CALL && (
                    <Video className="w-12 h-12 text-primary mb-4" />
                  )}

                  {/* Title */}
                  <p className="text-base font-semibold text-gray-800 mb-2 text-center">
                    {service.title}
                  </p>

                  {/* Service Details */}
                  <div className="w-full space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-gray-900">Rs. {service.price}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900">{getConsultationDurationText(service.duration)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium text-gray-900">{formatInTimeZone(new Date(service.time), 'UTC', 'hh:mm a')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Availability Days:</span>
                      <span className="font-medium text-gray-900">{service.consultationSlots.map((slot) => getDayText(slot.dayOfWeek)).join(",")}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full"
                    size="sm"
                    color="primary"
                    onPress={() => handleAppointmentClick(service)}
                  >
                    Make Appointment
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card >
        <Card className='w-full max-w-4xl lg:w-3/4 p-2'>
          <CardBody className='grid grid-cols-2 items-center gap-2'>
            <Button className="w-full" size="md" color="primary" onPress={handleReviewClick}>
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
            {doctorData?.doctorReviews.map((review, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">{review.user.fullName}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(review.createdAt, 'dd/MM/yyyy')}</span>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div >
      {showModal == 'Appointment' && selectedConsultation && (
        <AppointmentFormModal
          showModal={showModal}
          setShowModal={setShowModal}
          consultation={selectedConsultation}
          setConsultation={setSelectedConsultation}

        />
      )}
      {
        showModal == 'Review' && (
          <ReviewModal
            doctorId={doctorId}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )
      }
    </>
  )
}

export default DoctorProfile;
