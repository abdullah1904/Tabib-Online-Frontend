"use client"

import { EllipsisVertical, Eye, Info } from "lucide-react"
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
import { Input } from "../ui/input"
import { Tooltip, TooltipContent } from "../ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"

const doctorData = [
    {
        id: 1,
        avatar: undefined,
        fullName: "Dr. Ahmed Hassan",
        qualification: "Cardiologist",
        verificationStatus: "Verified",
        verifiedBy: "Admin",
    },
    {
        id: 2,
        avatar: undefined,
        fullName: "Dr. Fatima Khan",
        qualification: "Dermatologist",
        verificationStatus: "Verified",
        verifiedBy: "Admin",
    },
    {
        id: 3,
        avatar: undefined,
        fullName: "Dr. Muhammad Ali",
        qualification: "Neurologist",
        verificationStatus: "In Progress",
        verifiedBy: "Agent",
    },
    {
        id: 4,
        avatar: undefined,
        fullName: "Dr. Ayesha Malik",
        qualification: "Pediatrician",
        verificationStatus: "Verified",
        verifiedBy: "Admin",
    },
    {
        id: 5,
        avatar: undefined,
        fullName: "Dr. Usman Sheikh",
        qualification: "Orthopedist",
        verificationStatus: "Failed",
        verifiedBy: "Agent",
    },
    {
        id: 6,
        avatar: undefined,
        fullName: "Dr. Zara Ahmed",
        qualification: "Gynecologist",
        verificationStatus: "In Progress",
        verifiedBy: "Admin",
    },
    {
        id: 7,
        avatar: undefined,
        fullName: "Dr. Tariq Mahmood",
        qualification: "General Physician",
        verificationStatus: "Verified",
        verifiedBy: "Agent",
    },
    {
        id: 8,
        avatar: undefined,
        fullName: "Dr. Sana Riaz",
        qualification: "Psychiatrist",
        verificationStatus: "Verified",
        verifiedBy: "Agent",
    },
    {
        id: 9,
        avatar: undefined,
        fullName: "Dr. Bilal Rashid",
        qualification: "ENT Specialist",
        verificationStatus: "Verified",
        verifiedBy: "Admin",
    }
]


const VerificationApplicationsTable = () => {
    const router = useRouter();
    const handleView = (userId: number) => {
        router.push(`/users/${userId}`);
    }
    return (
        <div className="py-2">
            <div className='flex justify-between pb-3'>
                <h2 className='text-2xl'>Verification Applications</h2>
                <Input 
                    placeholder="Search doctors..."
                    className="w-3xs sm:w-2xs md:w-xs lg:w-sm" 
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Qualification</TableHead>
                        <TableHead className="hidden sm:table-cell">Verification Status</TableHead>
                        <TableHead className="hidden md:table-cell">Verified By</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctorData.map(doctor => (
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
                                        <p>Qualification: {doctor.qualification}</p>
                                        <p>Verification Status: {doctor.verificationStatus}</p>
                                        <p>Verified By: {doctor.verifiedBy}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{doctor.qualification}</TableCell>
                            <TableCell className="hidden sm:table-cell">{doctor.verificationStatus}</TableCell>
                            <TableCell className="hidden md:table-cell">{doctor.verifiedBy}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleView(doctor.id)} className="cursor-pointer">
                                            <Eye /> View
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

export default VerificationApplicationsTable