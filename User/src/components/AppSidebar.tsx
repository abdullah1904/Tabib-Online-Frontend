"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Star,
  ChevronDown,
  LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ChildItem {
  label: string;
  href: string;
}

interface NavItemType {
  label: string;
  icon: LucideIcon;
  href: string;
  children?: ChildItem[];
}

// ─── Menu config ──────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItemType[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/doctor" },
  { label: "Reviews", icon: Star, href: "/doctor/reviews" },
  // { label: "Appointments", icon: CalendarDays, href: "/doctor/appointments" },
  // {
  //   label: "Patients",
  //   icon: Users,
  //   href: "/doctor/patients",
  //   children: [
  //     { label: "All Patients", href: "/doctor/patients" },
  //     { label: "New Patient", href: "/doctor/patients/new" },
  //     { label: "Discharged", href: "/doctor/patients/discharged" },
  //   ],
  // },
  // { label: "Consultations", icon: Stethoscope, href: "/doctor/consultations" },
  // { label: "Analytics", icon: BarChart3, href: "/doctor/analytics" },
];

// ─── NavItem ──────────────────────────────────────────────────────────────────
const NavItem = ({
  item,
  currentPath,
  onNavigate,
}: {
  item: NavItemType;
  currentPath: string;
  onNavigate: (href: string) => void;
}) => {
  const hasChildren = (item.children?.length ?? 0) > 0;
  const isActive =
    currentPath === item.href ||
    item.children?.some((c) => c.href === currentPath);
  const [open, setOpen] = useState(!!isActive);
  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren) {
      setOpen((o) => !o);
    } else {
      onNavigate(item.href);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`
            relative w-full flex items-center gap-3 rounded-xl text-sm font-medium
            transition-all duration-200 group cursor-pointer px-3 py-2.5
            ${isActive
            ? "bg-white text-primary shadow-lg shadow-primary"
            : "text-white"
          }
          `}
      >
        {isActive && (
          <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full" />
        )}

        <Icon
          size={18}
          className={`shrink-0 transition-colors ${isActive && "text-primary"}`}
        />

        <span className="flex-1 text-left truncate">{item.label}</span>
        {hasChildren && (
          <ChevronDown
            size={14}
            className={`shrink-0 text-primary transition-transform duration-200 ${open ? "rotate-180" : ""
              }`}
          />
        )}
      </button>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="ml-4 mt-1 pl-4 border-l border-slate-700/60 space-y-0.5 pb-1">
            {item.children?.map((child) => (
              <button
                key={child.href}
                onClick={() => onNavigate(child.href)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${currentPath === child.href
                  ? "text-primary bg-white font-medium"
                  : "text-slate-500 hover:text-white hover:bg-slate-800"
                  }`}
              >
                {child.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// ─── AppSidebar ───────────────────────────────────────────────────────────────
const AppSidebar = () => {
  const currentPath = usePathname();
  const router = useRouter();

  return (
    <>
      <aside className="hidden md:flex h-full shrink-0">
        <div
          className={`flex flex-col h-full bg-primary transition-all duration-300 ease-in-out w-64`}
        >
          <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 py-1 mt-5">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                currentPath={currentPath}
                onNavigate={(href) => router.push(href)}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;