"use client"

import { UserCheck, EllipsisVertical, AlertTriangle, Info } from "lucide-react"
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

const userData = [
    {
        id: 1,
        avatar: undefined,
        fullName: "Ahmed Ali Khan",
        email: "ahmed.ali@email.com",
        phone: "+92 300 1234567",
        Reason: "Misuse of Services"
    },
    {
        id: 2,
        avatar: undefined,
        fullName: "Fatima Sheikh",
        email: "fatima.sheikh@email.com",
        phone: "+92 321 2345678",
        Reason: "False Information"
    },
    {
        id: 3,
        avatar: undefined,
        fullName: "Muhammad Hassan",
        email: "m.hassan@email.com",
        phone: "+92 333 3456789",
        Reason: "Multiple Accounts"
    },
    {
        id: 4,
        avatar: undefined,
        fullName: "Ayesha Malik",
        email: "ayesha.malik@email.com",
        phone: "+92 301 4567890",
        Reason: "False Information"
    },
    {
        id: 5,
        avatar: undefined,
        fullName: "Tariq Ahmad",
        email: "tariq.ahmad@email.com",
        phone: "+92 322 5678901",
        Reason: "Multiple Accounts"
    },
    {
        id: 6,
        avatar: undefined,
        fullName: "Zainab Nawaz",
        email: "zainab.nawaz@email.com",
        phone: "+92 334 6789012",
        Reason: "Misuse of Services"
    }
]


const BannedUsersTable = () => {
    const router = useRouter();
    const handleComplain = (userId: number) => {
        router.push(`/users/${userId}`);
    }
    const handleUnBan = (userId: number) => {
        console.log(`User with ID ${userId} has been banned.`);
        toast.success("User banned successfully");
    }
    return (
        <div className="py-2">
            <div className='flex justify-between pb-3'>
                <h2 className='text-2xl'>Banned Users</h2>
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
                        <TableHead className="hidden lg:table-cell">Reason</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userData.map(user => (
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
                                        <p>Reason: {user.phone}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                            <TableCell className="hidden lg:table-cell">{user.Reason}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleComplain(user.id)} className="cursor-pointer">
                                            <AlertTriangle /> Complain
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleUnBan(user.id)} className="cursor-pointer">
                                            <UserCheck /> Un-Ban
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

export default BannedUsersTable