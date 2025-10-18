"use client";
import { getDoctor } from '@/services/doctors.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Spinner } from '../ui/spinner';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getAccountStatusText, getAvatarFallbackText } from '@/utils';
import { Badge } from '../ui/badge';
import { AccountStatus } from '@/utils/constants';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

type Props = {
    id: string;
}

const DoctorInfo = ({ id }: Props) => {
    const { data: doctorData, isLoading, isError, error } = useQuery({
        queryKey: ['doctor', id],
        queryFn: () => getDoctor(id)
    });
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-40 text-gray-600 gap-2">
                <Spinner className="size-6" /> Loading doctor...
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center h-40 text-red-500">
                Error loading doctor: {(error as Error).message}
            </div>
        );
    }
    if (!doctorData) {
        return (
            <div className="flex items-center justify-center h-40 text-gray-600">
                No doctor data available.
            </div>
        )
    }
    return (
        <div className="py-2">
            <div className="flex justify-between pb-3">
                <h2 className="text-2xl">Doctor</h2>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={doctorData.imageURL ?? undefined} alt={doctorData.fullName} />
                            <AvatarFallback>
                                {getAvatarFallbackText(doctorData.fullName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left space-y-1">
                            <div className="flex gap-2">
                                <h2 className="text-2xl font-semibold">{doctorData.fullName}</h2>
                                <Badge variant={doctorData.status === AccountStatus.BANNED ? 'destructive' : 'default'}>
                                    {getAccountStatusText(doctorData.status)}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">{doctorData.email}</p>
                            <p className="text-sm text-muted-foreground">{doctorData.phoneNumber}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="w-full mx-auto">
                            <TabsTrigger value="profile">Personal Info</TabsTrigger>
                            <TabsTrigger value="profession">Professional Info</TabsTrigger>
                            <TabsTrigger value="appointments">Appointments Info</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

export default DoctorInfo