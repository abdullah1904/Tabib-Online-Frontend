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
import { useQuery } from "@tanstack/react-query"
import { listUsers } from "@/services/users.service"
import { getAccountStatusText, getAvatarFallbackText } from "@/utils"
import { Spinner } from "../ui/spinner"
import { Badge } from "../ui/badge"
import { AccountStatus } from "@/utils/constants"


const UsersTable = () => {
    const router = useRouter();
    const { data: usersData, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: listUsers,
    })
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
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-40 text-gray-600 gap-2">
                <Spinner className="size-6" /> Loading users...
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center h-40 text-red-500">
                Error loading users: {(error as Error).message}
            </div>
        );
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
                        <TableHead className="hidden lg:table-cell">Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usersData?.map(user => (
                        <TableRow key={user.id}>
                            <TableCell className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.imageURL!} alt={user.fullName} />
                                    <AvatarFallback className="rounded-lg">{getAvatarFallbackText(user.fullName)}</AvatarFallback>
                                </Avatar>
                                {user.fullName}
                                <Tooltip>
                                    <TooltipTrigger className="sm:hidden">
                                        <Info className="size-4" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Email: {user.email}</p>
                                        <p>Phone: {user.phoneNumber}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{user.phoneNumber}</TableCell>
                            <TableCell className="hidden lg:table-cell">
                                <Badge variant={user.status === AccountStatus.SUSPENDED ? 'destructive' : 'default'}>
                                    {getAccountStatusText(user.status)}
                                </Badge>
                            </TableCell>
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