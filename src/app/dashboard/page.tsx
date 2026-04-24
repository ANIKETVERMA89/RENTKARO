"use client";

import React from "react";
import { useApp } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, 
  Calendar, 
  MapPin, 
  Clock, 
  CreditCard, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ConditionVerificationModal } from "@/components/ui/condition-verification-modal";

export default function DashboardOverview() {
  const { user, vehicles, bookings, updateBookingCondition } = useApp();
  
  const userBookings = bookings.filter(b => b.userId === user?.id);
  const activeBooking = userBookings.find(b => b.status === "active" || b.status === "pending");

  const [verificationModal, setVerificationModal] = React.useState<{
    isOpen: boolean;
    phase: "pickup" | "return";
    bookingId: string;
    vehicleName: string;
    existingPickupImages?: string[];
  } | null>(null);

  const handleVerificationComplete = (images: string[], damageData?: any) => {
    if (!verificationModal) return;
    
    if (verificationModal.phase === "pickup") {
      updateBookingCondition(
        verificationModal.bookingId, 
        { pickupImages: images },
        "active" // Transition to active once pickup is verified
      );
    } else {
      updateBookingCondition(
        verificationModal.bookingId,
        {
          returnImages: images,
          damageAssessed: true,
          damageDescription: damageData?.description,
          deductionAmount: damageData?.deductionAmount,
        },
        "completed" // Transition to completed once return is verified
      );
    }
    setVerificationModal(null);
  };

  return (
    <div className="space-y-8 relative z-10">
      {/* Welcome & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white text-black border-none shadow-xl shadow-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-black/60 flex items-center justify-between uppercase tracking-wider">
              Total Rentals
              <TrendingUp className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{userBookings.length}</div>
            <p className="text-xs text-black/40 mt-1 font-medium">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 flex items-center justify-between uppercase tracking-wider">
              Upcoming
              <Calendar className="h-4 w-4 text-white" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">
              {userBookings.filter(b => b.status === 'pending').length}
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">Confirmed bookings</p>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 flex items-center justify-between uppercase tracking-wider">
              Distance
              <MapPin className="h-4 w-4 text-white" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">1,240 <span className="text-sm font-normal text-slate-600">km</span></div>
            <p className="text-xs text-slate-600 mt-1 font-medium">Life-time stats</p>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 flex items-center justify-between uppercase tracking-wider">
              Wallet
              <CreditCard className="h-4 w-4 text-white" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">₹2,450</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">Refundable deposits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Active Booking or Hero */}
        <div className="lg:col-span-2 space-y-8">
          {user?.role === 'provider' && (
            <section>
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-all" />
                <div className="relative z-10 max-w-sm">
                  <h2 className="text-2xl font-black text-white mb-2 italic uppercase tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>Grow Your <span className="text-zinc-500 NOT-italic">Fleet</span></h2>
                  <p className="text-slate-500 mb-6 font-bold uppercase text-[10px] tracking-widest">List your vehicle and connect with thousands of verified renters across the country.</p>
                  <Link href="/dashboard/add-vehicle">
                    <Button className="bg-white text-black hover:bg-slate-200 font-black uppercase tracking-widest text-[10px] h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">Initialize Listing <ChevronRight className="ml-1 w-4 h-4" /></Button>
                  </Link>
                </div>
                <Car className="absolute bottom-[-10px] right-8 w-48 h-48 text-white/[0.02] -rotate-12 group-hover:scale-110 transition-transform" strokeWidth={0.5} />
              </div>
            </section>
          )}

          {activeBooking ? (
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white/90">
                <Clock className="w-5 h-5 text-white" /> Active Rental
              </h3>
              <Card className="overflow-hidden bg-white/[0.03] border-white/10 backdrop-blur-2xl shadow-2xl">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={vehicles.find(v => v.id === activeBooking.vehicleId)?.image} 
                      className="w-full h-full object-cover opacity-80" 
                      alt="Active car"
                    />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white">{vehicles.find(v => v.id === activeBooking.vehicleId)?.name}</h4>
                        <p className="text-sm text-slate-500 font-mono uppercase tracking-tighter">{activeBooking.id}</p>
                      </div>
                      <span className="bg-white text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {activeBooking.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Pickup</span>
                        <span className="font-bold text-white/90 flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-500" /> {activeBooking.startDate}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Return</span>
                        <span className="font-bold text-white/90 flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-500" /> {activeBooking.endDate}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {activeBooking.status === "pending" ? (
                         <Button 
                           onClick={() => setVerificationModal({
                             isOpen: true,
                             phase: "pickup",
                             bookingId: activeBooking.id,
                             vehicleName: vehicles.find(v => v.id === activeBooking.vehicleId)?.name || "Vehicle"
                           })}
                           className="flex-1 bg-white text-black hover:bg-slate-200 font-bold"
                         >
                           Pickup Verification
                         </Button>
                      ) : (
                         <Button 
                           onClick={() => setVerificationModal({
                             isOpen: true,
                             phase: "return",
                             bookingId: activeBooking.id,
                             vehicleName: vehicles.find(v => v.id === activeBooking.vehicleId)?.name || "Vehicle",
                             existingPickupImages: activeBooking.conditionCheck?.pickupImages
                           })}
                           className="flex-1 bg-white text-black hover:bg-slate-200 font-bold"
                         >
                           Return Vehicle
                         </Button>
                      )}
                      <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">Rental Guide</Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </section>
          ) : (
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-all" />
              <div className="relative z-10 max-w-sm">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Ready for a new adventure?</h2>
                <p className="text-slate-500 mb-6 font-medium">Browse over 500+ verified vehicles and book your ride in less than 2 minutes.</p>
                <Link href="/vehicles">
                  <Button className="bg-white text-black hover:bg-slate-200 font-bold">Explore Vehicles <ChevronRight className="ml-1 w-4 h-4" /></Button>
                </Link>
              </div>
              <Car className="absolute bottom-[-10px] right-8 w-48 h-48 text-white/[0.02] -rotate-12 group-hover:scale-110 transition-transform" strokeWidth={0.5} />
            </div>
          )}

          <section>
            <h3 className="text-lg font-bold mb-4 text-white/90">Recent Bookings</h3>
            <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-0">
                {userBookings.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {userBookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden">
                            <img src={vehicles.find(v => v.id === booking.vehicleId)?.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="car" />
                          </div>
                          <div>
                            <div className="font-bold text-white/80 group-hover:text-white transition-colors">
                              {vehicles.find(v => v.id === booking.vehicleId)?.name}
                            </div>
                            <div className="text-xs text-slate-600 font-mono tracking-tighter">{booking.id} • {booking.startDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="font-bold text-white">₹{booking.totalPrice}</div>
                            <div className={`text-[10px] font-bold uppercase tracking-widest ${booking.status === 'completed' ? 'text-white/40' : 'text-slate-500'}`}>
                              {booking.status}
                            </div>
                            {booking.conditionCheck?.deductionAmount ? (
                              <div className="text-[9px] font-black text-red-500 uppercase tracking-widest mt-1">
                                -₹{booking.conditionCheck.deductionAmount} penalty
                              </div>
                            ) : null}
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-600">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    <p className="font-medium">You haven&apos;t made any bookings yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Sidebar: Recommended & Support */}
        <div className="space-y-8">
          <Card className="bg-white text-black border-none shadow-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold uppercase tracking-wider">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/5">
                <span className="text-xs font-bold text-black/60 uppercase tracking-tight">Licence</span>
                <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">Verified</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/5">
                <span className="text-xs font-bold text-black/60 uppercase tracking-tight">Identity</span>
                <span className="bg-black/10 text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase">Pending</span>
              </div>
              <Button className="w-full bg-black text-white hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider py-5 mt-2">Update Documents</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-base text-white/90 font-bold uppercase tracking-wider">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicles.slice(0, 2).map(v => (
                <div key={v.id} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-16 h-12 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                    {v.image ? (
                      <img src={v.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={v.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <Car className="w-6 h-6 text-white/10" />
                      </div>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold truncate text-white/80 group-hover:text-white transition-colors">{v.name}</div>
                    <div className="text-xs text-slate-500 font-bold">₹{v.price}/day</div>
                  </div>
                </div>
              ))}
              <Link href="/vehicles" className="block text-xs text-center font-bold text-slate-600 hover:text-white transition-colors py-2 uppercase tracking-widest">
                View All Vehicles
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Verification Modal */}
      <AnimatePresence>
        {verificationModal && verificationModal.isOpen && (
          <ConditionVerificationModal 
            bookingId={verificationModal.bookingId}
            vehicleName={verificationModal.vehicleName}
            phase={verificationModal.phase}
            existingPickupImages={verificationModal.existingPickupImages}
            onComplete={handleVerificationComplete}
            onClose={() => setVerificationModal(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
