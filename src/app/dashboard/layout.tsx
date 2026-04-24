"use client";

import { DashboardSidebar } from "@/components/ui/dashboard-sidebar";
import { useApp } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    // If we're fully implementing this, we should check if user is null after hydration
    // For now, let's keep it simple
  }, [user, router]);

  return (
    <div className="flex bg-black min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto h-screen">
        <header className="h-20 bg-black/40 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-2xl">
          <h2 className="text-xl font-bold text-white font-['Outfit']">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold text-white/90">{user?.name}</div>
              <div className="text-xs text-slate-500">{user?.role === 'provider' ? 'Rental Provider' : 'Renter'}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold shadow-xl shadow-white/5">
              {user?.name?.[0].toUpperCase()}
            </div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
