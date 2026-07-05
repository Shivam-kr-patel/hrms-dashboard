"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  ClipboardList,
  Wallet,
  Briefcase,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

const navLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Employees",
    href: "/dashboard/employees",
    icon: Users,
  },
  {
    label: "Departments",
    href: "/dashboard/departments",
    icon: Building2,
  },
  {
    label: "Attendance",
    href: "/dashboard/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Leave Management",
    href: "/dashboard/leaves",
    icon: ClipboardList,
  },
  {
    label: "Payroll",
    href: "/dashboard/payroll",
    icon: Wallet,
  },
  {
    label: "Recruitment",
    href: "/dashboard/recruitment",
    icon: Briefcase,
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-800 bg-gray-900">

      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-800 px-6">

        <h1 className="text-2xl font-bold tracking-tight text-white">
          HRMS
        </h1>

        <span className="ml-2 rounded-full bg-blue-600/20 px-2 py-1 text-xs font-medium text-blue-400">
          Admin
        </span>

      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3 py-5">

        {navLinks.map((link) => {
          const Icon = link.icon;

          const isActive =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isActive
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-gray-800 active:bg-gray-700"
              }`}
            >
              <Icon
                size={20}
                className="text-white transition-colors"
              />

              <span className="text-white">
                {link.label}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-5">

        <p className="text-sm font-medium text-white">
          HRMS Dashboard
        </p>

        <p className="mt-1 text-xs text-gray-400">
          Version 1.0
        </p>

      </div>

    </aside>
  );
}