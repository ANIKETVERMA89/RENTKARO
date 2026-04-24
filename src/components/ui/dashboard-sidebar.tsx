"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  Settings, 
  LogOut, 
  User, 
  CreditCard,
  PlusSquare,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/store/useStore";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = user?.role === "provider" 
    ? [
        { name: "Overview", href: "/dashboard/provider", icon: LayoutDashboard },
        { name: "My Fleet", href: "/dashboard/provider/fleet", icon: Car },
        { name: "List New Vehicle", href: "/dashboard/provider/list", icon: PlusSquare },
        { name: "Earnings", href: "/dashboard/provider/earnings", icon: BarChart3 },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
      ]
    : [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
        { name: "Profile", href: "/dashboard/profile", icon: User },
        { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
      ];

  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col border-r border-white/5 sticky top-0">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-2">
          <Car className="w-8 h-8 text-white" />
          <span className="text-xl font-bold font-['Outfit']">Rent<span className="text-slate-500">Karo</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-white text-black shadow-lg shadow-white/5" 
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-black" : "text-slate-600 group-hover:text-white")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
            {user?.name?.[0].toUpperCase() || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-bold truncate text-white/90">{user?.name || "User"}</div>
            <div className="text-[10px] text-slate-600 uppercase tracking-widest">{user?.role}</div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
