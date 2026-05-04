'use client';
import { completeAppointment, getAppointment } from '@/services/appointments.service';
import { showToast } from '@/utils';
import { ConsultationType } from '@/utils/constants';
import { Avatar, Button, Card, CardBody, CardFooter, Spinner } from '@heroui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PhoneOff, Video, VideoOff, Volume2, VolumeOff } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

type Props = {
    appointmentId: string;
}

const Call = ({ appointmentId }: Props) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [otherUserConnected, setOtherUserConnected] = useState(false);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["call", appointmentId],
        queryFn: () => getAppointment(appointmentId),
        enabled: !!appointmentId
    });
    const {mutate, isPending} = useMutation({
        mutationFn: completeAppointment,
        onSuccess() {
            router.push(`/doctor-panel/appointments`);
            showToast("Appointment completed", "success");
        },
        onError(error) {
            showToast(error instanceof Error ? error.message : "Failed to complete appointment", "error");
        }
    });

    useEffect(() => {
        if (!data) return;
        const timer = setTimeout(() => {
            setOtherUserConnected(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2">
                    <Spinner />
                    <p className="text-gray-600">Loading call...</p>
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-600">
                    Error loading call:{" "}
                    {error instanceof Error ? error.message : "Unknown error"}
                </p>
            </div>
        );
    }
    if (data?.consultation.type === ConsultationType.IN_PERSON) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-600">
                    This is an in-person consultation. No video or audio call available.
                </p>
            </div>
        );
    }

    const otherUser = session?.user.id === data?.doctor.id ? data?.user : data?.doctor;

    const handleCallEnd = () => mutate(appointmentId);
    const toggleMute = () => setIsMuted(!isMuted);
    const toggleVideo = () => setIsVideoOff(!isVideoOff);

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
                    <CardFooter className='w-full flex justify-center'>
                        <p className='text-center text-sm text-primary-light'>
                            {session?.user.fullName} (You)
                        </p>
                    </CardFooter>
                </Card>

                <Card>
                    <CardBody className='size-100 flex justify-evenly items-center p-4'>
                        <Avatar
                        isBordered={!otherUserConnected}
                            className={`size-28 ${otherUserConnected && 'border-2 border-green-600'}`}
                            showFallback
                            src={otherUser?.imageURL ?? undefined}
                            fallback={otherUser?.fullName}
                        />
                        {!otherUserConnected && (
                            <div className='absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg'>
                                <Spinner size='sm' />
                            </div>
                        )}
                    </CardBody>
                    <CardFooter className='w-full flex flex-col items-center gap-1'>
                        <p className='text-center text-sm text-primary-light'>
                            {otherUser?.fullName}
                        </p>
                    </CardFooter>
                </Card>
            </div>

            <div className='w-1/3 bg-white rounded-lg p-4 mt-8 flex flex-row-reverse items-center justify-evenly'>
                <Button onPress={handleCallEnd} color='danger' isLoading={isPending}>
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

export default Call;