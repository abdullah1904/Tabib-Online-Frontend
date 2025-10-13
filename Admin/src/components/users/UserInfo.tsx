"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAccountStatusText, getAvatarFallbackText, getGenderText, getVerificationDocumentTypeText } from "@/utils";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { AccountStatus } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/users.service";
import { Spinner } from "../ui/spinner";

type Props = {
  id: string;
};

const UserInfo = ({ id }: Props) => {
  const { data: userData, isLoading, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-600 gap-2">
        <Spinner className="size-6" /> Loading user...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        Error loading user: {(error as Error).message}
      </div>
    );
  }
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-600">
        No user data available.
      </div>
    )
  }
  return (
    <div className="py-2">
      <div className="flex justify-between pb-3">
        <h2 className="text-2xl">User</h2>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.imageURL ?? undefined} alt={userData.fullName} />
              <AvatarFallback>
                {getAvatarFallbackText(userData.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex gap-2">
                <h2 className="text-2xl font-semibold">{userData.fullName}</h2>
                <Badge variant={userData.status === AccountStatus.BANNED ? 'destructive' : 'default'}>
                  {getAccountStatusText(userData.status)}
                </Badge>
              </div>
              <p className="text-muted-foreground">{userData.email}</p>
              <p className="text-sm text-muted-foreground">{userData.phoneNumber}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full mx-auto">
              <TabsTrigger value="profile">Personal Info</TabsTrigger>
              <TabsTrigger value="settings">Medical Info</TabsTrigger>
              <TabsTrigger value="appointments">Appointments Info</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-6">
              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Full Name</Label>
                  <div className="text-base font-medium">{userData.fullName}</div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Age</Label>
                  <div className="text-base font-medium">{userData.age}</div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Gender</Label>
                  <div className="text-base font-medium capitalize">{getGenderText(userData.gender)}</div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <div className="text-base font-medium">{userData.email}</div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Phone Number</Label>
                  <div className="text-base font-medium">{userData.phoneNumber}</div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Address</Label>
                  <div className="text-base font-medium">{userData.address}</div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Emergency Contact Name</Label>
                  <div className="text-base font-medium">
                    {userData.emergencyContactName}
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Emergency Contact Number</Label>
                  <div className="text-base font-medium">
                    {userData.emergencyContactNumber}
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Verification Document Type</Label>
                  <div className="text-base font-medium">
                    {getVerificationDocumentTypeText(userData.verificationDocumentType)}
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Verification Document Number</Label>
                  <div className="text-base font-medium">
                    {userData.verificationDocumentNumber}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Label className="text-sm text-muted-foreground">Verification Document</Label>
                  <div className="text-base font-medium flex justify-center items-center p-4">
                    {userData.verificationDocumentURL ? (
                      <Image
                        src={`${userData.verificationDocumentURL}`}
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
            <TabsContent value="settings">
              {/* Medical Info content goes here */}
              <div>Medical Info not available.</div>
            </TabsContent>
            <TabsContent value="appointments">
              {/* Appointments Info content goes here */}
              <div>Appointments Info not available.</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfo;
