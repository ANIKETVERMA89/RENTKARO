"use client";

import React from "react";
import { useApp } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, 
  IndianRupee, 
  CalendarClock, 
  Users, 
  TrendingUp, 
  MoreHorizontal,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProviderDashboard() {
  const { user, vehicles, bookings } = useApp();
  
  // Filter vehicles listed by this provider using both ID and Email for robustness
  const myVehicles = vehicles.filter(v => 
    v.owner?.id === user?.id || 
    v.owner?.id === user?.email || 
    v.owner?.name === user?.name
  );
  const myVehicleIds = myVehicles.map(v => v.id);
  const myBookings = bookings.filter(b => myVehicleIds.includes(b.vehicleId));
  
  const totalEarnings = myBookings.reduce((acc, b) => acc + b.totalPrice, 0);

  // Health Check
  const [isBackendOnline, setIsBackendOnline] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000")
      .then(res => res.text())
      .then(text => setIsBackendOnline(text.includes("HEALTHY")))
      .catch(() => setIsBackendOnline(false));
  }, []);

  return (
    <div className="space-y-8 relative z-10 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Control <span className="text-zinc-500 NOT-italic">Center</span>
            </h1>
            {isBackendOnline !== null && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${isBackendOnline ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isBackendOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                Backend {isBackendOnline ? 'Online' : 'Offline / Old'}
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
            Welcome back, {user?.name || 'Partner'}
          </p>
        </div>
        <Link href="/dashboard/provider/list">
          <Button className="bg-white text-black hover:bg-slate-200 shadow-xl shadow-white/5 font-extrabold px-6">
            <Plus className="w-4 h-4 mr-2" strokeWidth={3} /> List New Vehicle
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white text-black border-none shadow-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-black/40 uppercase tracking-widest flex items-center justify-between">
              Earnings
              <IndianRupee className="h-4 w-4 text-black" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold">₹{totalEarnings.toLocaleString()}</div>
            <div className="text-[10px] text-black/60 flex items-center mt-1 font-bold">
              <TrendingUp className="h-3 w-3 mr-1" /> +12% from last week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
              Fleet Size
              <Car className="h-4 w-4 text-white" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-white">{myVehicles.length}</div>
            <div className="text-[10px] text-slate-600 mt-1 font-bold">Active listings</div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
              Bookings
              <CalendarClock className="h-4 w-4 text-white" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-white">{myBookings.filter(b => b.status === "active").length}</div>
            <div className="text-[10px] text-slate-600 mt-1 font-bold">Ongoing rentals</div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
              Profile Views
              <Users className="h-4 w-4 text-white" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-white">1,402</div>
            <div className="text-[10px] text-slate-600 mt-1 font-bold">Engagement total</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fleet List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold text-white/90">My Fleet</CardTitle>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {myVehicles.map(vehicle => (
                  <div key={vehicle.id} className="p-4 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-white/5 overflow-hidden">
                        <img src={vehicle.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={vehicle.name} />
                      </div>
                      <div>
                        <div className="font-bold text-white/80 group-hover:text-white transition-colors">{vehicle.brand} {vehicle.name}</div>
                        <div className="text-xs text-slate-600 font-medium tracking-tight">{vehicle.type.toUpperCase()} • {vehicle.specs.year}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">₹{vehicle.price}/day</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Available</div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white/90">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {myBookings.length > 0 ? (
                <div className="space-y-4">
                  {myBookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-white/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                          {booking.id.slice(-2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white/90">New booking for {vehicles.find(v => v.id === booking.vehicleId)?.name}</div>
                          <div className="text-xs text-slate-600 font-mono tracking-tighter">{booking.startDate} - {booking.endDate}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-[10px] font-bold border-white/10 text-slate-500 hover:text-white uppercase tracking-widest">Reject</Button>
                        <Button size="sm" className="text-[10px] font-bold bg-white text-black hover:bg-slate-200 uppercase tracking-widest">Accept Request</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-600">
                   No recent booking requests.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Analytics */}
        <div className="space-y-8">
          <Card className="bg-white text-black border-none shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-black" /> Payout Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-black/5 space-y-1">
                <div className="text-[10px] text-black/40 uppercase tracking-widest font-bold">Primary Account</div>
                <div className="text-sm font-mono truncate font-bold uppercase">**** **** 4242</div>
                <div className="text-[10px] text-black/60 font-bold uppercase">Verified Agency account</div>
              </div>
              <Button className="w-full bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider py-5">Request Settlement</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-between group hover:bg-white/5 text-slate-500 hover:text-white">
                Download Earnings <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors" />
              </Button>
              <Button variant="ghost" className="w-full justify-between group hover:bg-white/5 text-slate-500 hover:text-white">
                Update Portfolio <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors" />
              </Button>
              <Button variant="ghost" className="w-full justify-between group hover:bg-white/5 text-slate-500 hover:text-white">
                Global Visibility <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
