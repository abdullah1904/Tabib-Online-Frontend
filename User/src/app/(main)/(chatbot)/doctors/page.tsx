import DoctorsTable from "@/components/doctors/DoctorsTable"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors | Tabib Online",
};

const DoctorsPage = () => {
  return (
    <DoctorsTable/>
  )
}

export default DoctorsPage