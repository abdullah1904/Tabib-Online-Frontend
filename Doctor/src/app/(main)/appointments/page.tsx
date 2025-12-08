import AppointmentsTable from "@/components/appointments/AppointmentsTable"
import { Breadcrumb, BreadcrumbList, BreadcrumbLink,BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const AppointmentsPage = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/">
              Doctor
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Appointments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AppointmentsTable />
    </div>
  )
}

export default AppointmentsPage