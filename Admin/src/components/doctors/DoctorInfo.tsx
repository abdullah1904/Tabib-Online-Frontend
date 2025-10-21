"use client";
import { getDoctor } from '@/services/doctors.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Spinner } from '../ui/spinner';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getAccountStatusText, getAvatarFallbackText, getDoctorPrefixText, getGenderText, getMedicalDegreeText, getPostGraduateDegreeText, getSpecializationText, getVerificationDocumentTypeText } from '@/utils';
import { Badge } from '../ui/badge';
import { AccountStatus } from '@/utils/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import Image from 'next/image';
import {formatDate} from "date-fns"

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
                                <h2 className="text-2xl font-semibold">{getDoctorPrefixText(doctorData.doctorPrefix)} {doctorData.fullName}</h2>
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
                        <TabsContent value="profile" className="space-y-6">
                            <Separator />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground">Full Name</Label>
                                    <div className="text-base font-medium">{doctorData.fullName}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Age</Label>
                                    <div className="text-base font-medium">{doctorData.age}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Gender</Label>
                                    <div className="text-base font-medium capitalize">{getGenderText(doctorData.gender)}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Email</Label>
                                    <div className="text-base font-medium">{doctorData.email}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Phone Number</Label>
                                    <div className="text-base font-medium">{doctorData.phoneNumber}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Address</Label>
                                    <div className="text-base font-medium">{doctorData.address}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Verification Document Type</Label>
                                    <div className="text-base font-medium">
                                        {getVerificationDocumentTypeText(doctorData.verificationDocumentType)}
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Verification Document Number</Label>
                                    <div className="text-base font-medium">
                                        {doctorData.verificationDocumentNumber}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <Label className="text-sm text-muted-foreground">Verification Document</Label>
                                    <div className="text-base font-medium flex justify-center items-center p-4">
                                        {doctorData.verificationDocumentURL ? (
                                            <Image
                                                src={`${doctorData.verificationDocumentURL}`}
                                                alt="Verification Document"
                                                width={200}
                                                height={150}
                                                className="w-96 h-auto rounded-md border"
                                            />
                                        ) : (
                                            <div>No Verification Document Available</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="profession" className="space-y-6">
                            <Separator />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground">PMDC Redg. No.</Label>
                                    <div className="text-base font-medium">{doctorData.pmdcRedgNo}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">PMDC Redg. Date</Label>
                                    <div className="text-base font-medium">{formatDate(doctorData.pmdcRedgDate, "dd/MM/yyyy")}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Medical Degree</Label>
                                    <div className="text-base font-medium">{getMedicalDegreeText(doctorData.medicalDegree)}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Postgraduate Degree</Label>
                                    <div className="text-base font-medium">{getPostGraduateDegreeText(doctorData.postGraduateDegree)}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Specialization</Label>
                                    <div className="text-base font-medium">{getSpecializationText(doctorData.specialization)}</div>
                                </div>

                                <div>
                                    <Label className="text-sm text-muted-foreground">Years of Experience</Label>
                                    <div className="text-base font-medium">{doctorData.yearsOfExperience}</div>
                                </div>
                                <div className="sm:col-span-2">
                                    <Label className="text-sm text-muted-foreground">PMDC License Document</Label>
                                    <div className="text-base font-medium flex justify-center items-center p-4">
                                        {doctorData.pmdcLicenseDocumentURL ? (
                                            <Image
                                                src={`${doctorData.pmdcLicenseDocumentURL}`}
                                                alt="PMDC License Document"
                                                width={200}
                                                height={150}
                                                className="w-96 h-auto rounded-md border"
                                            />
                                        ) : (
                                            <div>No PMDC License Document Available</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

export default DoctorInfo