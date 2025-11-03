"use client";

import * as React from "react"
import { BadgeCheck, Briefcase, CalendarCheck, ChevronsUpDown, LogOut, MessageSquareText, Stethoscope, User } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { getAvatarFallbackText, getDoctorPrefixText } from "@/utils";

type NavItem = {
    title: string;
    url: string;
    icon: React.ReactNode
    items?: NavItem[];
}

const navMain: NavItem[] = [
    {
        title: "Offered Services",
        url: "/services",
        icon: <Briefcase />
    },
    {
        title: "Appointments",
        url: "/appointments",
        icon: <CalendarCheck/>
    },
    {
        title: "Reviews",
        url: "/reviews",
        icon: <MessageSquareText/>
    },
    {
        title: "Verification Applications",
        url: "/verification-applications",
        icon: <BadgeCheck/>
    }
]


const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const { isMobile } = useSidebar();
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogoClick = () => {
        router.push("/")
    }
    const handleLogOut = () => {
        signOut();
        toast.success("Logged out successfully");
    }
    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                            onClick={handleLogoClick}
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Stethoscope className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <h2 className="truncate font-medium">Tabib Online</h2>
                                <span className="truncate text-xs">Doctor Panel</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="custom-scrollbar">
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url} className="font-medium">
                                        {item.icon} {item.title}
                                    </Link>
                                </SidebarMenuButton>
                                {item.items && item.items.length > 0 ? (
                                    <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                                        {item.items.map((subItem) => {
                                            const isActive = pathname === subItem.url
                                            return (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild isActive={isActive}>
                                                        <Link href={subItem.url}>{subItem.title}</Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            )
                                        })}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
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
                                        <span className="truncate font-medium">{getDoctorPrefixText(session?.user.doctorPrefix ?? 0)} {session?.user.fullName}</span>
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
                                            <span className="truncate font-medium">{getDoctorPrefixText(session?.user.doctorPrefix ?? 0)} {session?.user.fullName}</span>
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
        </Sidebar>
    )
}

export default AppSidebar