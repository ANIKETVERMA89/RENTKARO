"use client";

import React from "react";
import { useApp } from "@/store/useStore";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Car, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight,
  MoreVertical,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BookingsPage() {
  const { user, vehicles, bookings } = useApp();
  const userBookings = bookings.filter(b => b.userId === user?.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-sm text-slate-500">Track and manage your vehicle rentals</p>
        </div>
        <Link href="/vehicles">
          <Button className="bg-blue-600">New Booking</Button>
        </Link>
      </div>

      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-px">
        {['All', 'Active', 'Pending', 'Completed'].map((tab) => (
          <button key={tab} className={`pb-4 px-2 text-sm font-bold transition-all border-b-2 ${tab === 'All' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {userBookings.length > 0 ? (
        <div className="space-y-4">
          {userBookings.map((booking) => {
            const vehicle = vehicles.find(v => v.id === booking.vehicleId);
            return (
              <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row divide-x divide-slate-100 dark:divide-slate-800">
                    <div className="p-6 flex-1 flex gap-6">
                      <div className="w-32 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                        <img src={vehicle?.image} className="w-full h-full object-cover" alt="vehicle" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{vehicle?.brand} {vehicle?.name}</h3>
                            <p className="text-xs text-slate-400 font-mono tracking-tight">{booking.id}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                            booking.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                           <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {booking.startDate}</span>
                           <span className="text-slate-300">•</span>
                           <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 2 Days Rental</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 w-full md:w-64 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col justify-between gap-4">
                      <div className="flex justify-between md:flex-col md:items-start lg:flex-row lg:items-center">
                        <span className="text-xs text-slate-500">Total Price</span>
                        <span className="text-xl font-bold text-blue-600">₹{booking.totalPrice}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 h-9">Details</Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 border border-slate-200 dark:border-slate-800">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-xl font-bold mb-2">No Bookings Found</h2>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">Looks like you haven&apos;t booked anything yet. Explore our wide range of vehicles and start your first journey!</p>
          <Link href="/vehicles">
            <Button className="px-8 py-6 rounded-2xl font-bold shadow-xl shadow-blue-500/20">Find a Ride</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
