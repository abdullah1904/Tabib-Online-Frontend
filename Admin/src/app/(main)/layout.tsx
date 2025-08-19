import AppNavbar from "@/components/AppNavbar";
import AppSidebar from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppNavbar />
                <div className="m-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MainLayout