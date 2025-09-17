"use client";

import { EllipsisVertical, Eye, Info } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useRouter } from "next/navigation"

const appointmentsData = [
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
        appointmentType: "In Person",
        appointmentTime: new Date("2025-09-18T09:30:00"),
    },
    {
        id: 2,
        user: {
            avatar: undefined,
            name: "Fatima Ahmed",
            email: "fatima.ahmed@example.com",
            phone: "03211223344",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Hamza Rauf",
            specialization: "Dermatologist",
            email: "hamza.rauf@clinic.com",
            phone: "03215556677",
        },
        appointmentType: "Video",
        appointmentTime: new Date("2025-09-18T11:00:00"),
    },
    {
        id: 3,
        user: {
            avatar: undefined,
            name: "Bilal Hussain",
            email: "bilal.hussain@example.com",
            phone: "03451112233",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Ayesha Siddiqui",
            specialization: "Pediatrician",
            email: "ayesha.siddiqui@hospital.com",
            phone: "03456667788",
        },
        appointmentType: "Audio",
        appointmentTime: new Date("2025-09-19T10:15:00"),
    },
    {
        id: 4,
        user: {
            avatar: undefined,
            name: "Omar Farooq",
            email: "omar.farooq@example.com",
            phone: "03334445566",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Imran Qureshi",
            specialization: "Orthopedic",
            email: "imran.qureshi@hospital.com",
            phone: "03336667788",
        },
        appointmentType: "In Person",
        appointmentTime: new Date("2025-09-19T15:00:00"),
    },
    {
        id: 5,
        user: {
            avatar: undefined,
            name: "Hira Zafar",
            email: "hira.zafar@example.com",
            phone: "03045556677",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Asad Mehmood",
            specialization: "ENT Specialist",
            email: "asad.mehmood@clinic.com",
            phone: "03047778899",
        },
        appointmentType: "Video",
        appointmentTime: new Date("2025-09-20T09:45:00"),
    },
    {
        id: 6,
        user: {
            avatar: undefined,
            name: "Zainab Ali",
            email: "zainab.ali@example.com",
            phone: "03228889900",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Khalid Anwar",
            specialization: "General Physician",
            email: "khalid.anwar@hospital.com",
            phone: "03223334455",
        },
        appointmentType: "Audio",
        appointmentTime: new Date("2025-09-20T14:00:00"),
    },
    {
        id: 7,
        user: {
            avatar: undefined,
            name: "Ahmed Raza",
            email: "ahmed.raza@example.com",
            phone: "03112223344",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Mahnoor Javed",
            specialization: "Neurologist",
            email: "mahnoor.javed@hospital.com",
            phone: "03117778899",
        },
        appointmentType: "In Person",
        appointmentTime: new Date("2025-09-21T10:30:00"),
    },
    {
        id: 8,
        user: {
            avatar: undefined,
            name: "Sana Tariq",
            email: "sana.tariq@example.com",
            phone: "03009998877",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Usman Iqbal",
            specialization: "Psychiatrist",
            email: "usman.iqbal@clinic.com",
            phone: "03001112233",
        },
        appointmentType: "Video",
        appointmentTime: new Date("2025-09-21T16:15:00"),
    },
    {
        id: 9,
        user: {
            avatar: undefined,
            name: "Tariq Nawaz",
            email: "tariq.nawaz@example.com",
            phone: "03459998877",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Nadia Khan",
            specialization: "Gynecologist",
            email: "nadia.khan@hospital.com",
            phone: "03457776655",
        },
        appointmentType: "Audio",
        appointmentTime: new Date("2025-09-22T09:00:00"),
    },
    {
        id: 10,
        user: {
            avatar: undefined,
            name: "Maryam Yousaf",
            email: "maryam.yousaf@example.com",
            phone: "03331112233",
        },
        doctor: {
            avatar: undefined,
            name: "Dr. Salman Akhtar",
            specialization: "Dentist",
            email: "salman.akhtar@clinic.com",
            phone: "03334445522",
        },
        appointmentType: "In Person",
        appointmentTime: new Date("2025-09-22T11:30:00"),
    },
];



const DoctorAppointmentsTable = () => {
    const router = useRouter();
    const handleView = (userId: number) => {
        router.push(`/doctors/appointments/${userId}`);
    }
    return (
        <div className="py-2">
            <div className='flex justify-between pb-3'>
                <h2 className='text-2xl'>Doctor Appointments</h2>
                <Input
                    placeholder="Search appointment by doctor or user..."
                    className="w-3xs sm:w-2xs md:w-xs lg:w-sm"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Doctor</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead className="hidden sm:table-cell">Appointment Type</TableHead>
                        <TableHead className="hidden md:table-cell">Appointment Time</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointmentsData.map(appointment => (
                        <TableRow key={appointment.id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={appointment.doctor.avatar} alt={appointment.doctor.name} />
                                        <AvatarFallback className="rounded-lg">{appointment.doctor.name.charAt(4)}</AvatarFallback>
                                    </Avatar>
                                    {appointment.doctor.name}
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="size-4" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Specialization: {appointment.doctor.specialization}</p>
                                            <p>Email: {appointment.doctor.email}</p>
                                            <p>Phone: {appointment.doctor.phone}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={appointment.user.avatar} alt={appointment.user.name} />
                                        <AvatarFallback className="rounded-lg">{appointment.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {appointment.user.name}
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="size-4" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Email: {appointment.user.email}</p>
                                            <p>Phone: {appointment.user.phone}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{appointment.appointmentType}</TableCell>
                            <TableCell className="hidden md:table-cell">{appointment.appointmentTime.toLocaleString()}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleView(appointment.id)} className="cursor-pointer">
                                            <Eye /> View
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}

export default DoctorAppointmentsTable