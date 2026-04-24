"use client";

import React, { useState } from "react";
import { useApp } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Car, Plus, MapPin, Fuel, Users, Star,
  MoreHorizontal, Eye, Pencil, Trash2, ToggleLeft, ToggleRight
} from "lucide-react";
import Link from "next/link";

export default function MyFleetPage() {
  const { user, vehicles, toggleAvailability } = useApp();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Show vehicles listed by this provider using both ID and Email
  const myVehicles = vehicles.filter(v => 
    v.owner?.id === user?.id || 
    v.owner?.id === user?.email || 
    v.owner?.name === user?.name
  );

  return (
    <div className="space-y-8 relative z-10 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
            My <span className="text-zinc-500 NOT-italic">Fleet</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
            {myVehicles.length} vehicle{myVehicles.length !== 1 ? 's' : ''} listed
          </p>
        </div>
        <Link href="/dashboard/provider/list">
          <Button className="bg-white text-black hover:bg-slate-200 font-black uppercase tracking-widest text-[10px] h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Plus className="w-4 h-4 mr-2" strokeWidth={3} /> Add Vehicle
          </Button>
        </Link>
      </div>

      {/* Fleet Grid */}
      {myVehicles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-3xl"
        >
          <Car className="w-16 h-16 text-zinc-800 mb-6" strokeWidth={1} />
          <h3 className="text-xl font-black text-white uppercase tracking-widest">No Vehicles Listed</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2 font-medium">
            You haven&apos;t added any vehicles to your fleet yet. Start by listing your first vehicle.
          </p>
          <Link href="/dashboard/provider/list" className="mt-8">
            <Button className="bg-white text-black hover:bg-slate-200 font-black uppercase tracking-widest text-[10px] h-12 px-8 rounded-xl">
              <Plus className="w-4 h-4 mr-2" strokeWidth={3} /> List Your First Vehicle
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myVehicles.map((vehicle, idx) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="overflow-hidden bg-zinc-900/60 border-white/10 backdrop-blur-xl hover:border-white/20 transition-all group rounded-3xl relative">
                {/* Vehicle Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Type Badge */}
                  <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                    {vehicle.subType || vehicle.type}
                  </span>
                  {/* Availability Badge */}
                  <span className={`absolute top-4 right-4 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border ${vehicle.available ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                    {vehicle.available ? 'Available' : 'Unavailable'}
                  </span>
                  {/* Price */}
                  <div className="absolute bottom-4 right-4 bg-white text-black rounded-xl px-4 py-1.5 text-sm font-black italic shadow-xl">
                    ₹{vehicle.price}<span className="text-[9px] font-bold opacity-60 NOT-italic ml-1">/day</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tighter italic leading-tight">
                        {vehicle.brand} <span className="text-zinc-500">{vehicle.name}</span>
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">
                        <MapPin className="w-3 h-3" />
                        {vehicle.location ? vehicle.location.split(',')[0] : 'Unknown'}
                      </div>
                    </div>
                    {/* Actions Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === vehicle.id ? null : vehicle.id)}
                        className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
                      >
                        <MoreHorizontal className="w-4 h-4 text-slate-500" />
                      </button>
                      <AnimatePresence>
                        {activeMenu === vehicle.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -5 }}
                            className="absolute right-0 top-10 w-44 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-20"
                          >
                            <Link href={`/vehicles/${vehicle.id}`} className="flex items-center gap-3 px-4 py-3 text-[10px] font-black text-slate-400 hover:text-white hover:bg-white/5 uppercase tracking-widest transition-all">
                              <Eye className="w-3.5 h-3.5" /> View Listing
                            </Link>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black text-slate-400 hover:text-white hover:bg-white/5 uppercase tracking-widest transition-all">
                              <Pencil className="w-3.5 h-3.5" /> Edit Details
                            </button>
                            <button 
                              onClick={() => {
                                toggleAvailability(vehicle.id, !vehicle.available);
                                setActiveMenu(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black text-slate-400 hover:text-amber-400 hover:bg-amber-400/5 uppercase tracking-widest transition-all"
                            >
                              {vehicle.available ? <ToggleLeft className="w-3.5 h-3.5" /> : <ToggleRight className="w-3.5 h-3.5" />}
                              {vehicle.available ? 'Mark Unavailable' : 'Mark Available'}
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black text-red-500 hover:bg-red-500/10 uppercase tracking-widest transition-all border-t border-white/5">
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Specs row */}
                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/5">
                    <div className="flex flex-col items-center gap-1">
                      <Fuel className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{vehicle.specs?.fuel || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-x border-white/5">
                      <Users className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{vehicle.specs?.seats || 4} Seats</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-slate-600 fill-slate-600" />
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{vehicle.owner?.rating || 5.0}</span>
                    </div>
                  </div>

                  {/* Hourly rate */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Hourly</span>
                    <span className="text-sm font-black text-white">₹{vehicle.hourlyPrice || 'N/A'}/hr</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
