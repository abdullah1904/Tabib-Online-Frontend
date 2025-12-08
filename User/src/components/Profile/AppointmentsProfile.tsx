"use client";
import { listDoctorAppointments } from "@/services/doctors.service";
import { Card, CardHeader, Avatar, CardBody, Tabs, Tab, Spinner, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Hospital, Stethoscope } from "lucide-react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { getAppointmentStatusText, getSpecializationText } from "@/utils";

const DoctorAppointmentsTab = () => {
    const { data: doctorAppointments, isLoading, isError, error } = useQuery({
        queryKey: ['doctorAppointments'],
        queryFn: listDoctorAppointments,
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
        <Table >
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

const HospitalAppointmentsTab = () => {
    return (
        <div>
            <h1>Hospital Appointments Tab</h1>
        </div>
    )
}

const AppointmentsProfile = () => {
    const { data: session } = useSession();

    return (
        <div className='w-full flex justify-center items-start p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground'>
            <Card className="flex-1 max-w-5xl">
                <CardHeader>
                    <div className="text-primary flex items-center justify-center gap-6">
                        <Avatar
                            showFallback
                            size="lg"
                            className="size-20"
                            src={session?.user.imageURL ?? undefined}
                        />
                        <div className="text-left space-y-1">
                            <h2 className="text-2xl font-semibold">{session?.user.fullName}</h2>
                            <p>{session?.user.email}</p>
                            <p className="text-sm">{session?.user.phoneNumber}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <Tabs color="primary" fullWidth={true} defaultSelectedKey={'doctorAppointments'} destroyInactiveTabPanel={false}>
                        <Tab key="doctorAppointments" title={
                            <div className="flex items-center space-x-2">
                                <Stethoscope />
                                <span>Doctor Appointments</span>
                            </div>
                        }>
                            <DoctorAppointmentsTab />
                        </Tab>
                        <Tab key="hospitalAppointments" title={
                            <div className="flex items-center space-x-2">
                                <Hospital />
                                <span>Hospital Appointments</span>
                            </div>
                        }>
                            <HospitalAppointmentsTab />
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    )
}

export default AppointmentsProfile