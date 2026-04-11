"use client";

import { cancelAppointment, confirmAppointment, listAppointments } from "@/services/appointments.service";
import { Appointment } from "@/types/appointments";
import {
    getAppointmentStatusText,
    getDoctorPrefixText,
    getSpecializationText,
    showToast,
} from "@/utils";
import { AppointmentStatus, UserRole } from "@/utils/constants";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import AppointmentInfoModal from "./AppointmentInfoModal";
import { formatInTimeZone } from 'date-fns-tz';

type Props = {
    role: UserRole;
    showHeader?: boolean;
};

const AppointmentsTable = ({ role, showHeader = false }: Props) => {
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const {
        data: doctorAppointments,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: [`${role}-appointments`],
        queryFn: listAppointments,
    });
    const confirmMutation = useMutation({
        mutationFn: confirmAppointment,
        onSuccess() {
            refetch();
            showToast("Appointment confirmed successfully", "success");
        },
        onError(error) {
            showToast(`Error confirming appointment: ${error instanceof Error ? error.message : "Unknown error"}`, "error");
        }
    });
    const cancelMutation = useMutation({
        mutationFn: cancelAppointment,
        onSuccess() {
            refetch();
            showToast("Appointment cancelled successfully", "success");
        },
        onError(error) {
            showToast(`Error cancelling appointment: ${error instanceof Error ? error.message : "Unknown error"}`, "error");
        }
    });
    const handleConfirm = (appointment: Appointment) => {
        confirmMutation.mutate(appointment.id);
    }
    const handleCancel = (appointment: Appointment) => {
        cancelMutation.mutate(appointment.id);
    }
    const handleViewDetails = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
    }
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2">
                    <Spinner />{" "}
                    <p className="text-gray-600">Loading your information...</p>
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
    return (
        <>
            {showHeader && (
                <div className="text-primary">
                    <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableColumn>
                        {role === UserRole.DOCTOR ? "Patient" : "Doctor"}
                    </TableColumn>
                    <TableColumn>Appointment Date</TableColumn>
                    <TableColumn>Appointment Time</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody className="text-primary overflow-scroll custom-scrollbar">
                    {(doctorAppointments ?? []).map((appointment) => (
                        <TableRow
                            key={appointment.id}
                            className="text-primary overflow-scroll custom-scrollbar"
                        >
                            <TableCell>
                                {role === UserRole.DOCTOR ? (
                                    <div className="text-primary flex items-center gap-3">
                                        <Avatar
                                            showFallback
                                            size="sm"
                                            className="size-14"
                                            src={appointment.user.imageURL ?? undefined}
                                        />
                                        <div className="text-left">
                                            <h2 className="text-base font-semibold">
                                                {appointment.user.fullName}
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                {appointment.user.email}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {appointment.user.phoneNumber}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-primary flex items-center gap-3">
                                        <Avatar
                                            showFallback
                                            size="sm"
                                            className="size-14"
                                            src={appointment.doctor.imageURL ?? undefined}
                                        />
                                        <div className="text-left">
                                            <h2 className="text-base font-semibold">
                                                {getDoctorPrefixText(appointment.doctor.professionalInfo.prefix)} {appointment.doctor.fullName}
                                            </h2>
                                            <p className="text-md text-gray-700">
                                                (
                                                {getSpecializationText(
                                                    appointment.doctor.professionalInfo.specialization,
                                                )}
                                                )
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {appointment.doctor.email}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {appointment.doctor.phoneNumber}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell>
                                {formatInTimeZone(new Date(appointment.appointmentDate), "UTC", "MMM dd, yyyy")}
                            </TableCell>
                            <TableCell>
                                {formatInTimeZone(appointment.appointmentTime, 'UTC', 'hh:mm a')}
                            </TableCell>
                            <TableCell>
                                {getAppointmentStatusText(appointment.status)}
                            </TableCell>
                            <TableCell>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <EllipsisVertical />
                                    </DropdownTrigger>
                                    <DropdownMenu disabledKeys={appointment.status === AppointmentStatus.CONFIRMED ? ['Confirm'] : []}>
                                        <DropdownItem key="view-details" onPress={() => { handleViewDetails(appointment) }}>
                                            View Details
                                        </DropdownItem>
                                        <DropdownItem
                                            hidden={role !== UserRole.DOCTOR}
                                            key="Confirm"
                                            onPress={() => { handleConfirm(appointment) }}
                                        >
                                            Confirm
                                        </DropdownItem>
                                        <DropdownItem key="Cancel" onPress={() => { handleCancel(appointment) }}>
                                            Cancel
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedAppointment && (
                <AppointmentInfoModal
                    selected={selectedAppointment}
                    setSelected={setSelectedAppointment}
                    userRole={role}
                />
            )}
        </>
    );
};

export default AppointmentsTable;
