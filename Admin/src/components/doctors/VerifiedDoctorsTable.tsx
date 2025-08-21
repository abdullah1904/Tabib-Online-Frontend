"use client"

import { Ban, EllipsisVertical, Eye, Info, OctagonPause } from "lucide-react"
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

const doctorsData = [
    {
        id: 1,
        avatar: undefined,
        fullName: "Dr. Ahmed Hassan",
        specialization: "Cardiologist",
        email: "ahmed.hassan@email.com",
        phone: "+92 300 6392039",
        location: "Lahore",
    },
    {
        id: 2,
        avatar: undefined,
        fullName: "Dr. Fatima Khan",
        specialization: "Dermatologist",
        email: "fatima.khan@email.com",
        phone: "+92 321 3670982",
        location: "Karachi",
    },
    {
        id: 3,
        avatar: undefined,
        fullName: "Dr. Ayesha Malik",
        specialization: "Pediatrician",
        email: "ayesha.malik@email.com",
        phone: "+92 301 5478034",
        location: "Faisalabad",
    },
    {
        id: 4,
        avatar: undefined,
        fullName: "Dr. Tariq Mahmood",
        specialization: "General Physician",
        email: "tariq.mahmood@email.com",
        phone: "+92 302 2645234",
        location: "Lahore",
    },
    {
        id: 5,
        avatar: undefined,
        fullName: "Dr. Sana Riaz",
        specialization: "Psychiatrist",
        email: "sara.riaz@email.com",
        phone: "+92 323 2849038",
        location: "Peshawar",
    },
    {
        id: 6,
        avatar: undefined,
        fullName: "Dr. Bilal Rashid",
        specialization: "ENT Specialist",
        email: "bilal.rashid@email.com",
        phone: "+92 335 5374839",
        location: "Quetta",
    }
]


const DoctorsTable = () => {
    const router = useRouter();
    const handleView = (userId: number) => {
        router.push(`/users/${userId}`);
    }
    const handleSuspend = (userId: number) => {
        console.log(`User with ID ${userId} has been suspended.`);
        toast.success("User suspended successfully");
    }
    const handleBan = (userId: number) => {
        console.log(`User with ID ${userId} has been banned.`);
        toast.success("User banned successfully");
    }
    return (
        <div className="py-2">
            <div className='flex justify-between pb-3'>
                <h2 className='text-2xl'>Verified Doctors</h2>
                <Input 
                    placeholder="Search doctors..."
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
                        <TableHead className="hidden lg:table-cell">Location</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctorsData.map(doctor => (
                        <TableRow key={doctor.id}>
                            <TableCell className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={doctor.avatar} alt={doctor.fullName} />
                                    <AvatarFallback className="rounded-lg">{doctor.fullName.charAt(4)}</AvatarFallback>
                                </Avatar>
                                {doctor.fullName}
                                <Tooltip>
                                    <TooltipTrigger className="sm:hidden">
                                        <Info className="size-4"/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Specialization: {doctor.specialization}</p>
                                        <p>Email: {doctor.email}</p>
                                        <p>Phone: {doctor.phone}</p>
                                        <p>Location: {doctor.location}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{doctor.specialization}</TableCell>
                            <TableCell className="hidden sm:table-cell">{doctor.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{doctor.phone}</TableCell>
                            <TableCell className="hidden lg:table-cell">{doctor.location}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleView(doctor.id)} className="cursor-pointer">
                                            <Eye /> View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleSuspend(doctor.id)} className="cursor-pointer">
                                            <OctagonPause /> Suspend
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleBan(doctor.id)} className="cursor-pointer">
                                            <Ban /> Ban
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default DoctorsTable