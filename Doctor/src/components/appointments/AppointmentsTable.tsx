"use client";

import { useState } from "react";
import {
    EllipsisVertical,
    Eye,
    Info,
    CheckCircle,
    XCircle,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Spinner } from "../ui/spinner";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    approveAppointment,
    listAppointments,
} from "@/services/appointments.service";

import { getAppointmentStatusText, getAvatarFallbackText } from "@/utils";
import { Appointment } from "@/types/appointments";
import { AppointmentStatus } from "@/utils/constants";
import { format } from "date-fns";
import { toast } from "sonner";

const AppointmentsTable = () => {
    const queryClient = useQueryClient();
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const {
        data: appointmentsData = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["appointments"],
        queryFn: listAppointments,
    });

    const { mutate: approveMutate, isPending: isApproving } = useMutation({
        mutationFn: approveAppointment,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            toast.success("Appointment approved successfully");
        },
        onError(error) {
            toast.error(error.message || "Failed to approve appointment");
        },
        onSettled() {
            setSelectedAppointment(null);
        },
    });

    const handleApprove = (appointment: Appointment): void => {
        setSelectedAppointment(appointment);
        approveMutate(appointment.id);
    };

    const handleView = (appointment: Appointment): void => {
        console.log("VIEW APPOINTMENT", appointment);
        // You can open a modal here if needed
    };

    if (isError) {
        return (
            <div className="flex items-center justify-center h-40 text-red-500">
                Error loading appointments: {error.message}
            </div>
        );
    }

    return (
        <div className="py-2">
            <div className="flex justify-between pb-3">
                <h2 className="text-2xl font-semibold">Appointments</h2>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead className="hidden sm:table-cell">
                            Appointment Date
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                            Appointment Time
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                                <div className="flex items-center justify-center gap-2">
                                    <Spinner className="size-6" /> Loading appointments...
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : appointmentsData.length > 0 ? (
                        appointmentsData.map((appointment) => (
                            <TableRow key={appointment.id}>
                                {/* USER */}
                                <TableCell>
                                    <div className="flex items-center gap-2 text-wrap">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={appointment.user.imageURL ?? ""}
                                                alt={appointment.user.fullName}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                {getAvatarFallbackText(appointment.user.fullName)}
                                            </AvatarFallback>
                                        </Avatar>

                                        {appointment.user.fullName}

                                        <Tooltip>
                                            <TooltipTrigger className="sm:hidden">
                                                <Info className="size-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Email: {appointment.user.email}</p>
                                                <p>Phone: {appointment.user.phoneNumber}</p>
                                                {/* <Horizone */}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>

                                {/* DATE */}
                                <TableCell className="hidden sm:table-cell">
                                    {format(new Date(appointment.appointmentDate), "MMM dd, yyyy")}
                                </TableCell>

                                {/* TIME */}
                                <TableCell className="hidden sm:table-cell">
                                    {format(
                                        new Date(`2000-01-01T${appointment.appointmentTime}`),
                                        "hh:mm a"
                                    )}
                                </TableCell>

                                {/* STATUS */}
                                <TableCell>
                                    <Badge
                                        variant={
                                            appointment.status === AppointmentStatus.CANCELLED
                                                ? "destructive"
                                                : "default"
                                        }
                                    >
                                        {getAppointmentStatusText(appointment.status)}
                                    </Badge>
                                </TableCell>

                                {/* ACTIONS */}
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger disabled={isApproving}>
                                            {isApproving &&
                                                selectedAppointment?.id === appointment.id ? (
                                                <Spinner className="size-6" />
                                            ) : (
                                                <EllipsisVertical />
                                            )}
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() => handleView(appointment)}
                                                className="cursor-pointer"
                                            >
                                                <Eye /> View
                                            </DropdownMenuItem>

                                            {appointment.status === AppointmentStatus.PENDING && (
                                                <>
                                                    <DropdownMenuItem
                                                        onClick={() => handleApprove(appointment)}
                                                        className="cursor-pointer"
                                                        disabled={
                                                            isApproving &&
                                                            selectedAppointment?.id === appointment.id
                                                        }
                                                    >
                                                        <CheckCircle /> Approve
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <XCircle /> Cancel
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                                No appointments found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppointmentsTable;
