"use client"

import { Ban, EllipsisVertical, Eye, Info, OctagonPause, ShieldCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Input } from "../ui/input"
import { Tooltip, TooltipContent } from "../ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { activateDoctor, banDoctor, listDoctors, suspendDoctor } from "@/services/doctors.service"
import { Spinner } from "../ui/spinner"
import { getAccountStatusText, getAvatarFallbackText, getSpecializationText } from "@/utils"
import { Badge } from "../ui/badge"
import { AccountStatus } from "@/utils/constants"



const DoctorsTable = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [value] = useDebounce(searchTerm, 1000);

    const {
        data: doctorsData = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["doctors", value],
        queryFn: () => listDoctors(value),
    });

    const { mutate: activateMutate, isPending: isActivating } = useMutation({
        mutationFn: activateDoctor,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
            toast.success("Doctor activated successfully");
        },
        onError(error) {
            toast.error(error.message || "Failed to activate doctor");
        },
        onSettled() {
            setSelectedDoctorId(null);
        },
    });

    const { mutate: suspendMutate, isPending: isSuspending } = useMutation({
        mutationFn: suspendDoctor,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
            toast.success("Doctor suspended successfully");
        },
        onError(error) {
            toast.error(error.message || "Failed to suspend doctor");
        },
        onSettled() {
            setSelectedDoctorId(null);
        },
    });

    const { mutate: banMutate, isPending: isBanning } = useMutation({
        mutationFn: banDoctor,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
            toast.success("Doctor banned successfully");
        },
        onError(error) {
            toast.error(error.message || "Failed to ban doctor");
        },
        onSettled() {
            setSelectedDoctorId(null);
        },
    });

    const handleView = (doctorId: number) => {
        router.push(`/doctors/${doctorId}`);
    }
    const handleActivate = (doctorId: number) => {
        setSelectedDoctorId(doctorId);
        activateMutate(doctorId);
    }
    const handleSuspend = (doctorId: number) => {
        setSelectedDoctorId(doctorId);
        suspendMutate(doctorId);
    }
    const handleBan = (doctorId: number) => {
        setSelectedDoctorId(doctorId);
        banMutate(doctorId);
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-40 text-red-500">
                Error loading doctors: {error.message}
            </div>
        );
    }
    return (
        <div className="py-2">
            <div className='flex justify-between pb-3'>
                <h2 className='text-2xl'>Doctors</h2>
                <Input
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-3xs sm:w-2xs md:w-xs lg:w-sm"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Specialization</TableHead>
                        <TableHead className="hidden sm:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead className="hidden lg:table-cell">Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-center text-gray-500 py-6"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Spinner className="size-6" /> Loading doctors...
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : doctorsData.length > 0 ? (
                        doctorsData.map((doctor) => (
                            <TableRow key={doctor.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={doctor.imageURL ?? ""} alt={doctor.fullName} />
                                            <AvatarFallback className="rounded-lg">
                                                {getAvatarFallbackText(doctor.fullName)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {doctor.fullName}
                                        <Tooltip>
                                            <TooltipTrigger className="sm:hidden">
                                                <Info className="size-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Specialization: {getSpecializationText(doctor.specialization)}</p>
                                                <p>Email: {doctor.email}</p>
                                                <p>Phone: {doctor.phoneNumber}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>

                                <TableCell className="hidden sm:table-cell">
                                    {getSpecializationText(doctor.specialization)}
                                </TableCell>

                                <TableCell className="hidden sm:table-cell">
                                    {doctor.email}
                                </TableCell>

                                <TableCell className="hidden md:table-cell">
                                    {doctor.phoneNumber}
                                </TableCell>

                                <TableCell className="hidden lg:table-cell">
                                    <Badge
                                        variant={
                                            doctor.status === AccountStatus.BANNED
                                                ? "destructive"
                                                : "default"
                                        }
                                    >
                                        {getAccountStatusText(doctor.status)}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisVertical />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() => handleView(doctor.id)}
                                                className="cursor-pointer"
                                            >
                                                <Eye /> View
                                            </DropdownMenuItem>

                                            {doctor.status === AccountStatus.SUSPENDED && (
                                                <DropdownMenuItem
                                                    onClick={() => handleActivate(doctor.id)}
                                                    className="cursor-pointer"
                                                    disabled={isActivating && selectedDoctorId === doctor.id}
                                                >
                                                    <ShieldCheck /> Activate
                                                </DropdownMenuItem>
                                            )}

                                            {doctor.status === AccountStatus.ACTIVE && (
                                                <>
                                                    <DropdownMenuItem
                                                        onClick={() => handleSuspend(doctor.id)}
                                                        className="cursor-pointer"
                                                        disabled={isSuspending && selectedDoctorId === doctor.id}
                                                    >
                                                        <OctagonPause /> Suspend
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        onClick={() => handleBan(doctor.id)}
                                                        className="cursor-pointer"
                                                        disabled={isBanning && selectedDoctorId === doctor.id}
                                                    >
                                                        <Ban /> Ban
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
                            <TableCell
                                colSpan={6}
                                className="text-center text-gray-500 py-6"
                            >
                                No doctors found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DoctorsTable