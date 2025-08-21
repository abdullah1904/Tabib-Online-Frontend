"use client"
import { AlertTriangle, EllipsisVertical, Info, UserCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Input } from "../ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const doctorsData = [
  {
    id: 1,
    avatar: undefined,
    fullName: "Dr. Ahmed Ali Khan",
    specialization: "Cardiologist",
    email: "ahmed.ali@email.com",
    phone: "+92 300 1234567",
    reason: "Sharing False Medical Information"
  },
  {
    id: 2,
    avatar: undefined,
    fullName: "Dr. Fatima Sheikh",
    specialization: "Dermatologist",
    email: "fatima.sheikh@email.com",
    phone: "+92 321 2345678",
    reason: "Prescription Misuse"
  },
  {
    id: 3,
    avatar: undefined,
    fullName: "Dr. Muhammad Hassan",
    specialization: "Neurologist",
    email: "m.hassan@email.com",
    phone: "+92 333 3456789",
    reason: "Impersonating a Doctor"
  },
  {
    id: 4,
    avatar: undefined,
    fullName: "Dr. Ayesha Malik",
    specialization: "Pediatrician",
    email: "ayesha.malik@email.com",
    phone: "+92 301 4567890",
    reason: "Abusive Behavior with Medical Staff"
  },
  {
    id: 5,
    avatar: undefined,
    fullName: "Dr. Tariq Ahmad",
    specialization: "Orthopedic Surgeon",
    email: "tariq.ahmad@email.com",
    phone: "+92 322 5678901",
    reason: "Fraudulent Insurance Claim"
  },
  {
    id: 6,
    avatar: undefined,
    fullName: "Dr. Zainab Nawaz",
    specialization: "Gynecologist",
    email: "zainab.nawaz@email.com",
    phone: "+92 334 6789012",
    reason: "Privacy Violation of Patient Data"
  }
]


const BannedDoctorsTable = () => {
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
                        <TableHead className="hidden lg:table-cell">Reason</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctorsData.map(user => (
                        <TableRow key={user.id}>
                            <TableCell className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.fullName} />
                                    <AvatarFallback className="rounded-lg">{user.fullName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {user.fullName}
                                <Tooltip>
                                    <TooltipTrigger className="sm:hidden">
                                        <Info className="size-4" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Specialization: {user.specialization}</p>
                                        <p>Email: {user.email}</p>
                                        <p>Phone: {user.phone}</p>
                                        <p>Reason: {user.reason}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{user.specialization}</TableCell>
                            <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                            <TableCell className="hidden lg:table-cell">{user.reason}</TableCell>
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

export default BannedDoctorsTable