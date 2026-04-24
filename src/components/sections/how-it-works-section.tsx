"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, ClipboardList, CreditCard, CarFront } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <Search className="w-7 h-7" />,
    title: "Search & Find",
    desc: "Enter your city, choose vehicle type, and browse available options near you.",
    color: "from-blue-500 to-blue-600",
  },
  {
    num: "02",
    icon: <ClipboardList className="w-7 h-7" />,
    title: "Choose Your Vehicle",
    desc: "Compare prices, ratings, and features. Pick the vehicle that suits you best.",
    color: "from-cyan-500 to-teal-500",
  },
  {
    num: "03",
    icon: <CreditCard className="w-7 h-7" />,
    title: "Pay & Book",
    desc: "Upload your licence, pay a small pre-payment, and confirm your booking instantly.",
    color: "from-violet-500 to-purple-600",
  },
  {
    num: "04",
    icon: <CarFront className="w-7 h-7" />,
    title: "Pick Up & Drive",
    desc: "Collect your vehicle, pay the remaining balance, and enjoy your journey.",
    color: "from-emerald-500 to-green-600",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 bg-background border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3 block">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Rent a Vehicle in 4 Easy Steps
          </h2>
          <p className="text-lg text-slate-400">
            It&apos;s quick, easy, and completely secure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Dashed connector line (desktop only) */}
          <div className="hidden lg:block absolute top-[72px] left-[12%] right-[12%] border-t-2 border-dashed border-white/5 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative z-10 text-center group"
            >
              {/* Step number badge */}
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold mb-4">
                {step.num}
              </div>

              {/* Icon container */}
              <div className="mx-auto w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-400">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
