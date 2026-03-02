import AppointmentsTable from "@/components/appointments/AppointmentsTable";
import { UserRole } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Appointments | Tabib Online",
};

const AppointmentsPage = () => {
    return (
        <div>
            <AppointmentsTable
                role={UserRole.DOCTOR}
                showHeader={true}
            />
        </div>
    )
}

export default AppointmentsPage