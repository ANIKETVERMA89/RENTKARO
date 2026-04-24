"use client";

import React from "react";
import { motion } from "framer-motion";
import { Vehicle } from "@/store/useStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // I'll create this or use a div
import { Button } from "@/components/ui/button";
import { Star, MapPin, Gauge, Fuel, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-zinc-900 border-white/10 backdrop-blur-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all group rounded-3xl">
        <div className="relative h-56 overflow-hidden">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
              {vehicle.subType}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 bg-white text-black rounded-xl px-4 py-2 text-sm font-black italic shadow-xl">
            ₹{vehicle.price}<span className="text-[10px] font-bold opacity-60 NOT-italic ml-1">/ORBIT</span>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic group-hover:translate-x-1 transition-transform">
                {vehicle.brand} <span className="text-zinc-500">{vehicle.name}</span>
              </h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-2">
                <MapPin className="w-3 h-3" />
                {vehicle.location ? vehicle.location.split(',')[0] : 'Unknown'}
              </div>
            </div>
            <div className="flex items-center gap-1 border border-white/10 px-2 py-1 rounded-lg">
              <Star className="w-3 h-3 text-white fill-white" />
              <span className="text-[10px] font-black text-white">{vehicle.owner?.rating || '4.5'}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 border-y border-white/5 py-4">
            <div className="flex flex-col items-center gap-2">
              <Fuel className="w-4 h-4 text-slate-500" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{vehicle.specs?.fuel || 'N/A'}</span>
            </div>
            <div className="flex flex-col items-center gap-2 border-x border-white/5">
              <Gauge className="w-4 h-4 text-slate-500" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Auto</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{vehicle.specs?.seats || 4} Soul</span>
            </div>
          </div>

          <Link href={`/vehicles/${vehicle.id}`}>
            <Button className="w-full bg-white text-black hover:bg-zinc-200 transition-all font-black uppercase tracking-[0.2em] rounded-2xl h-14 group/btn shadow-lg">
              Explore Mission <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
