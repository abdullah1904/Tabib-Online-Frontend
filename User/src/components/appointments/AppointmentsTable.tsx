"use client";

import { getAppointmentStatusText, getSpecializationText } from "@/utils";
import { UserRole } from "@/utils/constants";
import { Avatar, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Props = {
    role: UserRole
}


const AppointmentsTable = ({ role }: Props) => {
  const { data: doctorAppointments, isLoading, isError, error } = useQuery({
        queryKey: [`${role}-appointments`],
        queryFn: ()=>{
            // if(role === UserRole.USER) {
        },
    });
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2">
                    <Spinner /> <p className="text-gray-600">Loading your information...</p>
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2 text-red-600">
                    <p className="text-gray-600">Error loading medical record: {error instanceof Error ? error.message : 'Unknown error'}</p>
                </div>
            </div>
        )
    }
    return (
        <Table>
            <TableHeader>
                <TableColumn>Doctor</TableColumn>
                <TableColumn>Appointment Date</TableColumn>
                <TableColumn>Appointment Time</TableColumn>
                <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody className="text-primary overflow-scroll custom-scrollbar">
                {(doctorAppointments ?? []).map((appointment) => (
                    <TableRow key={appointment.id} className="text-primary overflow-scroll custom-scrollbar">
                        <TableCell>
                            <div className="text-primary flex items-center gap-3">
                                <Avatar
                                    showFallback
                                    size="sm"
                                    className="size-14"
                                    src={appointment.doctor.imageURL ?? undefined}
                                />
                                <div className="text-left">
                                    <h2 className="text-base font-semibold">
                                        {appointment.doctor.fullName} 
                                    </h2>
                                    <p className="text-md text-gray-700">({getSpecializationText(appointment.doctor.specialization)})</p>
                                    <p className="text-sm text-gray-600">{appointment.doctor.email}</p>
                                    <p className="text-xs text-gray-500">{appointment.doctor.phoneNumber}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{format(new Date(`2000-01-01T${appointment.appointmentTime}`), 'hh:mm a')}</TableCell>
                        <TableCell>{getAppointmentStatusText(appointment.status)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default AppointmentsTable