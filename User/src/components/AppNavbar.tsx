"use client";
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
import { Bot, Hospital, LogIn, LogOut, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin] = useState(true);

  const menuItems = [
    {
      "name": "Doctors",
      "link": "/doctors",
      "icon": <Stethoscope className="size-4" />
    },
    {
      "name": "Hospitals",
      "link": "/hospitals",
      "icon": <Hospital className="size-4" />
    },
    {
      "name": "Tabib Bot",
      "link": "tabib-bot",
      "icon": <Bot className="size-4" />
    }
  ];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="flex items-center bg-primary text-white">
      <NavbarContent className="mx-auto" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-semibold text-2xl text-secondary">Tabib Online</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link
              className="w-full flex items-center justify-start gap-2 text-secondary"
              color="secondary"
              href={item.link}
            >
              {item.icon} {item.name}
            </Link>

          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className={`sm:flex gap-4`} justify="end">
        {isLogin ? (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  showFallback
                  src="https://images.unsplash.com/broken"
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="profile"
                  startContent={<User className="size-4" />}
                >
                  <Link href={'/profile'}>
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="signOut"
                  color="danger"
                  startContent={<LogOut className="size-4" />}
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
            <Link
              className="w-full flex items-center justify-start gap-2"
              color="primary"
              href={item.link}
            >
              {item.icon} {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default AppNavbar