"use client";
import { Check, EllipsisVertical, Eye, Info, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useRouter } from "next/navigation"

const complaintData = [
    {
        id: 1,
        user: {
            avatar: undefined,
            name: "Ali Khan",
            email: "ali.khan@example.com",
            phone: "03001234567",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Sara Malik",
            specialization: "Cardiologist",
            email: "sara.malik@hospital.com",
            phone: "03019876543",
        },
        severity: "High",
        provincial: true,
    },
    {
        id: 2,
        user: {
            avatar: undefined,
            name: "Fatima Ahmed",
            email: "fatima.ahmed@example.com",
            phone: "03002345678",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Imran Shah",
            specialization: "Dermatologist",
            email: "imran.shah@hospital.com",
            phone: "03017654321",
        },
        severity: "Medium",
        provincial: false,
    },
    {
        id: 3,
        user: {
            avatar: undefined,
            name: "Usman Tariq",
            email: "usman.tariq@example.com",
            phone: "03003456789",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Nadia Pervez",
            specialization: "Neurologist",
            email: "nadia.pervez@hospital.com",
            phone: "03014567890",
        },
        severity: "Low",
        provincial: true,
    },
    {
        id: 4,
        user: {
            avatar: undefined,
            name: "Hira Yousaf",
            email: "hira.yousaf@example.com",
            phone: "03004567891",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Kamran Ali",
            specialization: "Orthopedic",
            email: "kamran.ali@hospital.com",
            phone: "03019874321",
        },
        severity: "High",
        provincial: false,
    },
    {
        id: 5,
        user: {
            avatar: undefined,
            name: "Zainab Saeed",
            email: "zainab.saeed@example.com",
            phone: "03005678912",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Faisal Qureshi",
            specialization: "Pediatrician",
            email: "faisal.qureshi@hospital.com",
            phone: "03016789234",
        },
        severity: "Medium",
        provincial: true,
    },
    {
        id: 6,
        user: {
            avatar: undefined,
            name: "Omar Javed",
            email: "omar.javed@example.com",
            phone: "03006789123",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Rabia Anwar",
            specialization: "Psychiatrist",
            email: "rabia.anwar@hospital.com",
            phone: "03013456782",
        },
        severity: "Low",
        provincial: false,
    },
    {
        id: 7,
        user: {
            avatar: undefined,
            name: "Ayesha Khan",
            email: "ayesha.khan@example.com",
            phone: "03007891234",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Saad Mehmood",
            specialization: "ENT Specialist",
            email: "saad.mehmood@hospital.com",
            phone: "03019871234",
        },
        severity: "High",
        provincial: true,
    },
    {
        id: 8,
        user: {
            avatar: undefined,
            name: "Bilal Hussain",
            email: "bilal.hussain@example.com",
            phone: "03008912345",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Farah Noor",
            specialization: "Gynecologist",
            email: "farah.noor@hospital.com",
            phone: "03014561234",
        },
        severity: "Medium",
        provincial: false,
    },
    {
        id: 9,
        user: {
            avatar: undefined,
            name: "Sana Riaz",
            email: "sana.riaz@example.com",
            phone: "03009123456",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Khalid Mustafa",
            specialization: "Oncologist",
            email: "khalid.mustafa@hospital.com",
            phone: "03017659876",
        },
        severity: "Low",
        provincial: true,
    },
    {
        id: 10,
        user: {
            avatar: undefined,
            name: "Hamza Ali",
            email: "hamza.ali@example.com",
            phone: "03001239876",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Mariam Siddiqui",
            specialization: "General Surgeon",
            email: "mariam.siddiqui@hospital.com",
            phone: "03013214567",
        },
        severity: "High",
        provincial: false,
    },
];


const DoctorComplaintsTable = () => {
    const router = useRouter();
    const handleView = (userId: number) => {
        router.push(`/doctors/complaints/${userId}`);
    }
    return (
        <div className="py-2">
            <div className='flex justify-between pb-3'>
                <h2 className='text-2xl'>Doctor Complaints</h2>
                <Input
                    placeholder="Search complaint by doctor or user..."
                    className="w-3xs sm:w-2xs md:w-xs lg:w-sm"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Doctor</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead className="hidden sm:table-cell">Severity</TableHead>
                        <TableHead className="hidden md:table-cell">Provincial Complaint</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {complaintData.map(complaint => (
                        <TableRow key={complaint.id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={complaint.doctor.avatar} alt={complaint.doctor.name} />
                                        <AvatarFallback className="rounded-lg">{complaint.doctor.name.charAt(4)}</AvatarFallback>
                                    </Avatar>
                                    {complaint.doctor.name}
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="size-4" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Specialization: {complaint.doctor.specialization}</p>
                                            <p>Email: {complaint.doctor.email}</p>
                                            <p>Phone: {complaint.doctor.phone}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={complaint.user.avatar} alt={complaint.user.name} />
                                        <AvatarFallback className="rounded-lg">{complaint.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {complaint.user.name}
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="size-4" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Email: {complaint.user.email}</p>
                                            <p>Phone: {complaint.user.phone}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{complaint.severity}</TableCell>
                            <TableCell className="hidden sm:table-cell">{complaint.provincial ? <Check/> : <X/>}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleView(complaint.id)} className="cursor-pointer">
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

export default DoctorComplaintsTable