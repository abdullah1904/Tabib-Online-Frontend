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

const usersData = [
    {
        id: 1,
        avatar: undefined,
        fullName: "Ahmed Ali Khan",
        email: "ahmed.ali@email.com",
        phone: "+92 300 1234567",
        location: "Lahore",
        status: "active",
    },
    {
        id: 2,
        avatar: undefined,
        fullName: "Fatima Sheikh",
        email: "fatima.sheikh@email.com",
        phone: "+92 321 2345678",
        location: "Karachi",
        status: "inactive",
    },
    {
        id: 3,
        avatar: undefined,
        fullName: "Muhammad Hassan",
        email: "m.hassan@email.com",
        phone: "+92 333 3456789",
        location: "Islamabad",
        status: "suspended",
    },
    {
        id: 4,
        avatar: undefined,
        fullName: "Ayesha Malik",
        email: "ayesha.malik@email.com",
        phone: "+92 301 4567890",
        location: "Faisalabad",
        status: "active",
    },
    {
        id: 5,
        avatar: undefined,
        fullName: "Tariq Ahmad",
        email: "tariq.ahmad@email.com",
        phone: "+92 322 5678901",
        location: "Rawalpindi",
        status: "inactive",
    },
    {
        id: 6,
        avatar: undefined,
        fullName: "Zainab Nawaz",
        email: "zainab.nawaz@email.com",
        phone: "+92 334 6789012",
        location: "Multan",
        status: "suspended",
    },
    {
        id: 7,
        avatar: undefined,
        fullName: "Usman Qureshi",
        email: "usman.qureshi@email.com",
        phone: "+92 302 7890123",
        location: "Lahore",
        status: "active",
    },
    {
        id: 8,
        avatar: undefined,
        fullName: "Sara Iqbal",
        email: "sara.iqbal@email.com",
        phone: "+92 323 8901234",
        location: "Peshawar",
        status: "inactive",
    },
    {
        id: 9,
        avatar: undefined,
        fullName: "Bilal Ahmed",
        email: "bilal.ahmed@email.com",
        phone: "+92 335 9012345",
        location: "Quetta",
        status: "suspended",
    },
    {
        id: 10,
        avatar: undefined,
        fullName: "Mariam Khan",
        email: "mariam.khan@email.com",
        phone: "+92 303 0123456",
        location: "Sialkot",
        status: "active",
    }
]


const UsersTable = () => {
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
                <h2 className='text-2xl'>Users</h2>
                <Input 
                    placeholder="Search users..."
                    className="w-3xs sm:w-2xs md:w-xs lg:w-sm" 
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead className="hidden lg:table-cell">Location</TableHead>
                        <TableHead className="hidden lg:table-cell">Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usersData.map(user => (
                        <TableRow key={user.id}>
                            <TableCell className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.fullName} />
                                    <AvatarFallback className="rounded-lg">{user.fullName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {user.fullName}
                                <Tooltip>
                                    <TooltipTrigger className="sm:hidden">
                                        <Info className="size-4"/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Email: {user.email}</p>
                                        <p>Phone: {user.phone}</p>
                                        <p>Location: {user.location}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                            <TableCell className="hidden lg:table-cell">{user.location}</TableCell>
                            <TableCell className="hidden lg:table-cell">{user.status}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleView(user.id)} className="cursor-pointer">
                                            <Eye /> View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleSuspend(user.id)} className="cursor-pointer">
                                            <OctagonPause /> Suspend
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleBan(user.id)} className="cursor-pointer">
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

export default UsersTable