"use client";
import { UserRole } from "@/utils/constants";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Bot, Calendar, CreditCard, LayoutDashboard, LogIn, LogOut, Mails, Star, Stethoscope, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AppNavbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      "name": "Doctors",
      "link": "/doctors",
      "icon": <Stethoscope className="size-4" />,
      "forRole": UserRole.USER
    },
    // {
    //   "name": "Hospitals",
    //   "link": "/hospitals",
    //   "icon": <Hospital className="size-4" />
    // },
    {
      "name": "Tabib Bot",
      "link": "/tabib-bot",
      "icon": <Bot className="size-4" />,
      "forRole": UserRole.USER
    },
    {
      "name": "Dashboard",
      "link": "/doctor-panel",
      "icon": <LayoutDashboard className="size-4" />,
      "forRole": UserRole.DOCTOR
    },
    {
      "name": "Consultations",
      "link": "/doctor-panel/consultations",
      "icon": <Stethoscope className="size-4" />,
      "forRole": UserRole.DOCTOR
    },
    {
      "name": "Appointments",
      "link": "/doctor-panel/appointments",
      "icon": <Calendar className="size-4" />,
      "forRole": UserRole.DOCTOR
    },
    {
      "name": "Reviews",
      "link": "/doctor-panel/reviews",
      "icon": <Star className="size-4" />,
      "forRole": UserRole.DOCTOR
    },
    {
      "name": "Verification Applications",
      "link": "/doctor-panel/verification-applications",
      "icon": <Mails className="size-4" />,
      "forRole": UserRole.DOCTOR
    }
  ];
  const handleSignOut = () => {
    signOut();
  }
  const handlePress = (link: string) => {
    setIsMenuOpen(false);
    router.push(link);
  }
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="flex items-center bg-primary text-white">
      <NavbarContent className="mx-auto" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-semibold text-2xl text-secondary">
            Tabib Online {session?.user.role === UserRole.DOCTOR && "(Doctor)"}
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.filter(item => item.forRole === UserRole.USER).map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`} onClick={() => handlePress(item.link)}>
            <Link
              className="w-full flex items-center justify-start gap-2 text-secondary"
              color="secondary"
              href={item.link}
              hidden={!!session && item.forRole !== session.user?.role}
            >
              {item.icon} {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className={`sm:flex gap-4`} justify="end">
        {session?.user ? (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  showFallback
                  src={session.user.imageURL ?? undefined}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="info"
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session.user.email}</p>
                </DropdownItem>
                {/* <Divider/> */}
                <DropdownItem
                  key="profile"
                  startContent={<User className="size-4" />}
                  onPress={() => handlePress('/profile')}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="appointments"
                  hidden={session.user.role !== UserRole.USER}
                  startContent={<Calendar className="size-4" />}
                  onPress={() => handlePress('/profile/appointments')}
                >
                  Appointments
                </DropdownItem>
                <DropdownItem
                  key="wallet"
                  startContent={<CreditCard className="size-4" />}
                  onPress={() => handlePress('/profile/wallet')}
                >
                  Wallet
                </DropdownItem>
                <DropdownItem
                  key="signOut"
                  color="danger"
                  startContent={<LogOut className="size-4" />}
                  onPress={handleSignOut}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button as={Link} href="/signin" endContent={<LogIn className="size-4" />}>
              Sign In
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <button
              className="w-full flex items-center justify-start gap-2"
              onClick={() => handlePress(item.link)}
              hidden={session ? item.forRole !== session.user?.role : item.forRole !== UserRole.USER}
            >
              {item.icon} {item.name}
            </button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default AppNavbar