import AppNavbar from "@/components/AppNavbar";
import AppSidebar from "@/components/AppSidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DoctorLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <AppNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;