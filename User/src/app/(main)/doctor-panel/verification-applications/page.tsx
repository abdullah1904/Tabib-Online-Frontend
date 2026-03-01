import VerificationApplicationsTable from "@/components/verification-applications/VerificationApplicationsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification Applications | Tabib Online",
};

const VerificationApplicationsPage = () => {
  return (
    <VerificationApplicationsTable/>
  )
}

export default VerificationApplicationsPage