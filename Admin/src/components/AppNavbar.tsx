import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"


const AppNavbar = () => {
    return (
        <header className="sticky top-0 left-0 right-0 z-50 flex h-16 border-b-2 bg-white shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <div className='p-2'>
                    <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>Tabib Online</h2>
                </div>
            </div>
        </header>
    )
}

export default AppNavbar