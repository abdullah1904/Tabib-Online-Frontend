import AppointmentsProfile from "@/components/profile/AppointmentsProfile";
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