import AppSidebar from "@/components/AppSidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DoctorLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-[91vh]">
      <div className="flex flex-1 overflow-hidden relative">
        <div className="sticky top-0 h-full overflow-y-auto shrink-0">
          <AppSidebar />
        </div>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;