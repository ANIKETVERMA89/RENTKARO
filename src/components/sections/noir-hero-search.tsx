"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Car, Bike, Info, ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const categories = [
  { id: "all", label: "All Vehicles", icon: Info },
  { id: "car", label: "Cars", icon: Car },
  { id: "bike", label: "Bikes", icon: Bike },
  { id: "scooty", label: "Scooters", icon: Bike },
];

export function NoirHeroSearch() {
  const [activeTab, setActiveTab] = useState("all");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (location) query.set("location", location);
    if (activeTab !== "all") query.set("type", activeTab);
    router.push(`/vehicles?${query.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background Spline Visual */}
      <div className="absolute inset-0 z-0 opacity-40 lg:opacity-60">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
            Premium P2P Rental Platform
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter uppercase italic mb-6">
            Experience <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 NOT-italic">Unmatched</span> Freedom
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Rent high-end cars, legendary bikes, and agile scooters directly from verified owners in your city.
          </p>
        </motion.div>

        {/* Search Component (The core functionality) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-3 shadow-2xl shadow-black/80">
            {/* Tabs */}
            <div className="flex gap-2 p-2 mb-2 justify-center sm:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all relative",
                    activeTab === cat.id 
                      ? "text-black" 
                      : "text-slate-500 hover:text-white"
                  )}
                >
                  {activeTab === cat.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-full z-0"
                    />
                  )}
                  <cat.icon className={cn("w-4 h-4 relative z-10", activeTab === cat.id ? "text-black" : "text-slate-500")} />
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 p-2 bg-black/60 rounded-[2rem] border border-white/5">
              {/* Location */}
              <div className="flex items-center gap-3 px-6 py-4 flex-1 w-full group">
                <MapPin className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">Location</span>
                  <input 
                    type="text" 
                    placeholder="Where are you going?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent text-white placeholder-slate-500 outline-none text-sm font-semibold w-full"
                  />
                </div>
              </div>

              {/* Divider (Desktop only) */}
              <div className="hidden md:block w-px h-10 bg-white/10" />

              {/* Date */}
              <div className="flex items-center gap-3 px-6 py-4 flex-1 w-full group">
                <Calendar className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">Date Range</span>
                  <input 
                    type="text" 
                    placeholder="Select dates"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent text-white placeholder-slate-500 outline-none text-sm font-semibold w-full"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button 
                type="submit"
                className="w-full md:w-auto bg-white text-black p-5 md:p-6 rounded-[1.5rem] hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center group"
              >
                <Search className="w-6 h-6" />
                <span className="md:hidden ml-2 font-bold uppercase tracking-widest text-sm">Find a Ride</span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Action Link Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-12 text-zinc-500 font-bold uppercase tracking-widest text-[10px]"
        >
          <button 
            onClick={() => router.push('/auth')}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <span className="w-8 h-[1px] bg-zinc-800 group-hover:bg-white transition-all w-4 group-hover:w-8" />
            List Your Vehicle
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('stats');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <span className="w-8 h-[1px] bg-zinc-800 group-hover:bg-white transition-all w-4 group-hover:w-8" />
            Trusted Experts
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <span className="w-8 h-[1px] bg-zinc-800 group-hover:bg-white transition-all w-4 group-hover:w-8" />
            Reliable Support
          </button>
        </motion.div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white" />
        <span className="text-[9px] uppercase tracking-[0.3em] font-black italic">Scroll</span>
      </div>
    </section>
  );
}
