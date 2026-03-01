import ConsultationsTable from "@/components/consultations/ConsultationsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultations | Tabib Online",
};

const ConsultationsPage = () => {
  return (
    <ConsultationsTable/>
  )
}

export default ConsultationsPage