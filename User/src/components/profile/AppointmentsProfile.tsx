"use client";
import { Card, CardHeader, Avatar, CardBody, Tabs, Tab } from "@heroui/react";
import { Stethoscope } from "lucide-react";
import { useSession } from "next-auth/react";
import AppointmentsTable from "../appointments/AppointmentsTable";
import { UserRole } from "@/utils/constants";

const DoctorAppointmentsTab = () => {
    return <AppointmentsTable role={UserRole.USER} />
}

// const HospitalAppointmentsTab = () => {
//     return (
//         <div>
//             <h1>Hospital Appointments Tab</h1>
//         </div>
//     )
// }

const AppointmentsProfile = () => {
    const { data: session } = useSession();

    return (
        <div className='w-full flex justify-center items-start p-2 md:p-10 gap-2 min-h-[91vh] relative'>
            <Card className="flex-1 max-w-5xl">
                <CardHeader>
                    <div className="text-primary flex items-center justify-center gap-6">
                        <Avatar
                            showFallback
                            size="lg"
                            className="size-20"
                            src={session?.user.imageURL ?? undefined}
                        />
                        <div className="text-left space-y-1">
                            <h2 className="text-2xl font-semibold">{session?.user.fullName}</h2>
                            <p>{session?.user.email}</p>
                            <p className="text-sm">{session?.user.phoneNumber}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <Tabs color="primary" fullWidth={true} defaultSelectedKey={'doctorAppointments'} destroyInactiveTabPanel={false}>
                        <Tab key="doctorAppointments" title={
                            <div className="flex items-center space-x-2">
                                <Stethoscope />
                                <span>Doctor Appointments</span>
                            </div>
                        }>
                            <DoctorAppointmentsTab />
                        </Tab>
                        {/* <Tab key="hospitalAppointments" title={
                            <div className="flex items-center space-x-2">
                                <Hospital />
                                <span>Hospital Appointments</span>
                            </div>
                        }>
                            <HospitalAppointmentsTab />
                        </Tab> */}
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    )
}

export default AppointmentsProfile