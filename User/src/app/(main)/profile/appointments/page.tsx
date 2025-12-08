import AppointmentsProfile from "@/components/Profile/AppointmentsProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments | Tabib Online",
};


const AppointmentsProfilePage = () => {
  return (
    <AppointmentsProfile/>
  )
}

export default AppointmentsProfilePage