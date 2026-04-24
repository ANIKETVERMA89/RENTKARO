"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import type { Tab } from "@/components/ui/animated-tabs";
import { Car, Bike, Zap, Crown, Gauge, Wind, Battery, Sparkles } from "lucide-react";
import Link from "next/link";

const carTypes = [
  { name: "Sedan", icon: <Car className="w-5 h-5" />, count: "45+", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop" },
  { name: "SUV", icon: <Car className="w-5 h-5" />, count: "38+", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop" },
  { name: "Luxury", icon: <Crown className="w-5 h-5" />, count: "15+", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=250&fit=crop" },
  { name: "Economy", icon: <Gauge className="w-5 h-5" />, count: "52+", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=250&fit=crop" },
];

const bikeTypes = [
  { name: "Sports", icon: <Wind className="w-5 h-5" />, count: "28+", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=250&fit=crop" },
  { name: "Cruiser", icon: <Bike className="w-5 h-5" />, count: "18+", img: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400&h=250&fit=crop" },
  { name: "Commuter", icon: <Bike className="w-5 h-5" />, count: "35+", img: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=250&fit=crop" },
  { name: "Electric", icon: <Battery className="w-5 h-5" />, count: "12+", img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=250&fit=crop" },
];

const scootyTypes = [
  { name: "Standard", icon: <Sparkles className="w-5 h-5" />, count: "30+", img: "https://images.unsplash.com/photo-1621963416944-a641b6e5c320?w=400&h=250&fit=crop" },
  { name: "Electric", icon: <Zap className="w-5 h-5" />, count: "22+", img: "https://images.unsplash.com/photo-1597075561824-7e9b52685566?w=400&h=250&fit=crop" },
  { name: "Premium", icon: <Crown className="w-5 h-5" />, count: "10+", img: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?w=400&h=250&fit=crop" },
];

function VehicleGrid({ items }: { items: typeof carTypes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative bg-white/[0.03] rounded-2xl border border-white/[0.08] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 cursor-pointer"
        >
          <Link href="/vehicles">
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {item.count}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/60">{item.icon}</span>
                <h4 className="font-semibold text-white/90 text-lg">{item.name}</h4>
              </div>
              <p className="text-sm text-slate-500">Starting from ₹150/hr</p>
              <button className="mt-3 w-full text-sm font-semibold text-black bg-white hover:bg-slate-200 rounded-lg py-2 transition-colors">
                Browse {item.name} →
              </button>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function CategoriesSection() {
  const vehicleTabs: Tab[] = [
    {
      id: "cars",
      label: "🚗  Cars",
      content: <VehicleGrid items={carTypes} />,
    },
    {
      id: "bikes",
      label: "🏍️  Bikes",
      content: <VehicleGrid items={bikeTypes} />,
    },
    {
      id: "scooty",
      label: "🛵  Scooty",
      content: <VehicleGrid items={scootyTypes} />,
    },
  ];

  return (
    <section id="vehicles" className="py-32 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3 block">
            Browse Vehicles
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Find Your Perfect Ride
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            From economy to luxury, we&apos;ve got the perfect vehicle for every journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatedTabs tabs={vehicleTabs} defaultTab="cars" className="max-w-full" />
        </motion.div>
      </div>
    </section>
  );
}
