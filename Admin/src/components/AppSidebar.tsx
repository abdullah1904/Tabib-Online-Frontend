"use client"
import {
    ChevronRight,
    ChevronsUpDown,
    Hospital,
    LogOut,
    Pill,
    Settings,
    Stethoscope,
    User,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "./ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "./ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "./ui/avatar"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner"
import { getAvatarFallbackText } from "@/utils"

const data = {
    navMain: [
        {
            title: "Users",
            url: "#",
            icon: User,
            items: [
                {
                    title: "All Users",
                    url: "/users",
                },
                {
                    title: "Banned Users",
                    url: "/users/banned-users",
                },
            ],
        },
        {
            title: "Doctors",
            url: "#",
            icon: Stethoscope,
            items: [
                {
                    title: "All Doctors",
                    url: "/doctors",
                },
                {
                    title: "Banned Doctors",
                    url: "/doctors/banned-doctors",
                },
                {
                    title: "Verification Applications",
                    url: "/doctors/verification-applications",
                },
                {
                    title: "Verified Doctors",
                    url: "/doctors/verified-doctors",
                },
                {
                    title: "Doctor Appointments",
                    url: "/doctors/appointments",
                },
                {
                    title: "Doctor Complaints",
                    url: "/doctors/complaints",
                },
            ],
        },
        {
            title: "Hospitals",
            url: "#",
            icon: Hospital,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: " System Settings",
            url: "#",
            icon: Settings,
            items: [
                {
                    title: "Admin Users",
                    url: "#",
                },
                // {
                //     title: "Team",
                //     url: "#",
                // },
                // {
                //     title: "Billing",
                //     url: "#",
                // },
                // {
                //     title: "Limits",
                //     url: "#",
                // },
            ],
        },
    ],
}

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const { isMobile } = useSidebar()
    const { data: session } = useSession();
    const router = useRouter()
    const pathname = usePathname()

    const handleLogoClick = () => {
        router.push("/")
    }
    const handleLogOut = () => {
        signOut();
        toast.success("Logged out successfully");
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            {/* HEADER */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                            onClick={handleLogoClick}
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Pill className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <h2 className="truncate font-medium">Tabib Online</h2>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* NAVIGATION */}
            <SidebarContent className="custom-scrollbar">
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <Collapsible
                                key={item.title}
                                asChild
                                // defaultOpen={isParentActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => {
                                                const isActive = pathname === subItem.url
                                                return (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link
                                                                href={subItem.url}
                                                                className={`flex w-full items-center rounded-md px-2 py-1 text-sm ${isActive
                                                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                                    : "hover:bg-muted"
                                                                    }`}
                                                            >
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                )
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            {/* FOOTER */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={session?.user.imageURL} alt={session?.user.fullName} />
                                        <AvatarFallback className="rounded-lg">{getAvatarFallbackText(session?.user.fullName)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{session?.user.fullName}</span>
                                        <span className="truncate text-xs">{session?.user.email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={session?.user.imageURL} alt={session?.user.fullName} />
                                            <AvatarFallback className="rounded-lg">{getAvatarFallbackText(session?.user.fullName)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{session?.user.fullName}</span>
                                            <span className="truncate text-xs">{session?.user.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href="/profile">
                                        <DropdownMenuItem>
                                            <User />
                                            Profile
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogOut}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar >
    )
}

export default AppSidebar