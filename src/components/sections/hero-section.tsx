"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { Button } from "@/components/ui/button";
import { MapPin, Car, CalendarDays, Search, Shield, Headphones, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
          >
            <Car className="w-4 h-4" />
            #1 Vehicle Rental Platform
          </motion.div>
 
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Drive Your Way,{" "}
            <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              Rent Today
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            Choose from hundreds of cars, bikes & scooters at the best prices near you. Verified owners, secure payments, instant booking.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-2 mb-8 max-w-2xl mx-auto lg:mx-0"
          >
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl px-4 py-3 flex-1 min-w-0">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Enter city..."
                className="bg-transparent text-white placeholder-slate-500 text-sm outline-none w-full"
              />
            </div>
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl px-4 py-3 flex-1 min-w-0">
              <Car className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <select className="bg-transparent text-white text-sm outline-none w-full appearance-none cursor-pointer">
                <option value="" className="bg-neutral-900">Vehicle type</option>
                <option value="car" className="bg-neutral-900">Cars</option>
                <option value="bike" className="bg-neutral-900">Bikes</option>
                <option value="scooty" className="bg-neutral-900">Scooty</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl px-4 py-3 flex-1 min-w-0">
              <CalendarDays className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Pickup date"
                className="bg-transparent text-white placeholder-slate-500 text-sm outline-none w-full"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => { if (!e.target.value) e.target.type = "text" }}
              />
            </div>
            <button className="bg-white text-black font-bold rounded-xl p-3 hover:bg-slate-200 transition-all flex-shrink-0">
              <Search className="w-5 h-5" />
            </button>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
          >
            <Link href="/vehicles">
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 text-base font-semibold w-full sm:w-auto">
                Rent a Vehicle →
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 text-base w-full sm:w-auto">
                Learn More ↓
              </Button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-white/40" />
              Verified Owners
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-white/40" />
              Secure Payments
            </span>
            <span className="flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-white/40" />
              24/7 Support
            </span>
          </motion.div>
        </div>

        {/* Right Floating Cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex-1 hidden lg:flex items-center justify-center relative"
        >
          <div className="relative w-[420px] h-[420px]">
            {/* Central glow */}
            <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />

            {/* Floating stat card 1 */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-4 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl px-5 py-4 shadow-2xl"
            >
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-xs text-slate-500">Vehicles Available</div>
            </motion.div>

            {/* Floating stat card 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-20 left-0 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl px-5 py-4 shadow-2xl"
            >
              <div className="text-2xl font-bold text-slate-200">4.8 ★</div>
              <div className="text-xs text-slate-500">Average Rating</div>
            </motion.div>

            {/* Floating stat card 3 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-4 right-8 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl px-5 py-4 shadow-2xl"
            >
              <div className="text-2xl font-bold text-slate-300">24/7</div>
              <div className="text-xs text-slate-500">Customer Support</div>
            </motion.div>

            {/* Large decorative car icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Car className="w-32 h-32 text-white/5" strokeWidth={0.5} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
