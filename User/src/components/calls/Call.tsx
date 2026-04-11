'use client';
import { getAppointment } from '@/services/appointments.service';
import { ConsultationType } from '@/utils/constants';
import { Avatar, Button, Card, CardBody, Spinner } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { PhoneOff, Video, VideoOff, Volume2, VolumeOff } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

type Props = {
    appointmentId: string;
}

const Call = ({ appointmentId }: Props) => {
    const { data: session } = useSession();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["call", appointmentId],
        queryFn: () => getAppointment(appointmentId),
        enabled: !!appointmentId
    });
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2">
                    <Spinner />{" "}
                    <p className="text-gray-600">Loading call...</p>
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2 text-red-600">
                    <p className="text-gray-600">
                        Error loading medical record:{" "}
                        {error instanceof Error ? error.message : "Unknown error"}
                    </p>
                </div>
            </div>
        );
    }
    if (data?.consultation.type === ConsultationType.IN_PERSON) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2 text-red-600">
                    <p className="text-gray-600">
                        This is an in-person consultation. No video or audio call available.
                    </p>
                </div>
            </div>
        );
    }

    const handleCallEnd = () => {

    };
    const toggleMute = () => {
        setIsMuted(!isMuted);
    };
    const toggleVideo = () => {
        setIsVideoOff(!isVideoOff);
    };
    return (
        <div className='h-[91vh] flex items-center justify-around flex-col'>
            <div className='w-full flex items-center justify-center gap-4'>
                <Card>
                    <CardBody className='size-100 flex justify-evenly items-center p-4'>
                        <Avatar
                            className='size-28'
                            showFallback
                            src={session?.user.imageURL ?? undefined}
                            fallback={session?.user.fullName}
                        />
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className='size-100 flex justify-evenly items-center p-4'>
                        <Avatar
                            className='size-28'
                            showFallback
                            fallback={data?.user.id === data?.doctor.id ? data?.user.fullName : data?.doctor.fullName}
                            src={data?.user.id === data?.doctor.id ? data?.user.imageURL ?? undefined : data?.doctor.imageURL ?? undefined}
                        />
                    </CardBody>
                </Card>
            </div>
            <div className='w-1/3 bg-white rounded-lg p-4 mt-8 flex flex-row-reverse items-center justify-evenly'>
                <Button onPress={handleCallEnd} color='danger'>
                    <PhoneOff />
                </Button>
                <Button onPress={toggleMute}>
                    {isMuted ? <Volume2 /> : <VolumeOff />}
                </Button>
                {data?.consultation.type === ConsultationType.VIDEO_CALL && (
                    <Button onPress={toggleVideo}>
                        {isVideoOff ? <Video /> : <VideoOff />}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Call