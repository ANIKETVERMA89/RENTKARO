"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { VehicleCard } from "@/components/ui/vehicle-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, SlidersHorizontal, ChevronDown, Check, MapPin } from "lucide-react";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { Footer } from "@/components/sections/footer";

import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

function VehiclesList() {
  const searchParams = useSearchParams();
  const { vehicles, isLoadingVehicles } = useApp();

  const [search, setSearch] = useState(searchParams.get("location") || "");
  const [selectedType, setSelectedType] = useState<string>(searchParams.get("type") || "all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState("newest");

  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter(v => {
      const matchesSearch = (v.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (v.brand?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (v.location?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesType = selectedType === "all" || v.type === selectedType;
      const matchesPrice = v.price >= priceRange[0] && v.price <= priceRange[1];

      return v.available !== false && matchesSearch && matchesType && matchesPrice;
    });

    // Handle Sorting
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [vehicles, search, selectedType, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedNavFramer />

      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-0" />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        {/* Centered Search Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Find Your <span className="text-zinc-500 NOT-italic">Perfect</span> Ride
          </motion.h1>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-2xl p-2">
              <Search className="ml-4 h-5 w-5 text-slate-500" />
              <input
                placeholder="Search by brand, model, type or location..."
                className="flex-1 bg-transparent border-none text-white px-4 py-3 outline-none placeholder-slate-600 text-lg font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="hidden sm:flex items-center gap-2 px-4 border-l border-white/10 ml-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Explore India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar - Clean Noir Style */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-10">
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-4 h-4 text-white" />
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Filters</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-4">Vehicle Type</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['all', 'car', 'bike', 'scooty'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={cn(
                            "px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border",
                            selectedType === type
                              ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                              : "bg-transparent text-slate-500 border-white/5 hover:border-white/20 hover:text-white"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Price Limit</span>
                      <span className="text-xs font-bold text-white">₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-700 mt-2">
                      <span>MIN</span>
                      <span>MAX</span>
                    </div>
                  </div>
                </div>
              </section>

              <Button
                variant="outline"
                className="w-full border-white/10 text-slate-500 hover:text-white hover:border-white/30 rounded-xl h-12 uppercase tracking-widest font-black text-[10px]"
                onClick={() => { setSearch(""); setSelectedType("all"); setPriceRange([0, 10000]); }}
              >
                Clear All
              </Button>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{filteredVehicles.length} Result{filteredVehicles.length !== 1 ? 's' : ''}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[10px] font-black text-white uppercase tracking-widest outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-zinc-900">Newest First</option>
                  <option value="price-low" className="bg-zinc-900">Price: Low to High</option>
                  <option value="price-high" className="bg-zinc-900">Price: High to Low</option>
                </select>
              </div>
            </div>

            {isLoadingVehicles ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/5 flex flex-col h-[450px] animate-pulse">
                    <div className="w-full h-[60%] bg-white/5" />
                    <div className="p-8 flex-1 flex flex-col gap-6">
                      <div className="w-3/4 h-6 bg-white/5 rounded-full" />
                      <div className="w-1/2 h-4 bg-white/5 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-3xl">
                <SlidersHorizontal className="w-12 h-12 text-zinc-800 mb-6" />
                <h3 className="text-xl font-black text-white uppercase tracking-widest">No Matches Found</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2 font-medium">Try broadening your search or resetting the filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-black uppercase tracking-widest">Loading Vehicles...</div>}>
      <VehiclesList />
    </Suspense>
  );
}
