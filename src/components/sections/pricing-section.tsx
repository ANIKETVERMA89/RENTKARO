"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "HOURLY",
    price: "₹150",
    period: "/hr",
    features: [
      "Flexible hours",
      "No minimum booking",
      "Fuel included",
      "Basic insurance",
      "Cancel anytime",
    ],
    popular: false,
  },
  {
    name: "DAILY",
    price: "₹999",
    period: "/day",
    features: [
      "Full day access",
      "200 km included",
      "Insurance covered",
      "24/7 roadside support",
      "Fuel included",
      "Free cancellation",
    ],
    popular: true,
  },
  {
    name: "WEEKLY",
    price: "₹5,999",
    period: "/week",
    features: [
      "7-day rental",
      "1000 km included",
      "Free pick & drop",
      "Priority support",
      "Full insurance",
      "Best value deal",
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#0B1D3A] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3 block">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400">
            No hidden fees. Pay only for what you use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.popular
                  ? "bg-white/[0.08] border-2 border-blue-500 shadow-2xl shadow-blue-500/10 scale-105"
                  : "bg-white/[0.04] border border-white/10"
              } backdrop-blur-xl hover:-translate-y-2 transition-all duration-400 group`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.15em] mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {plan.price}
                  </span>
                  <span className="text-slate-400 text-lg">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-slate-300 text-sm">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                className="w-full"
              >
                Choose {plan.name.charAt(0) + plan.name.slice(1).toLowerCase()} Plan
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          * Actual prices vary by vehicle. Above are starting prices.
        </p>
      </div>
    </section>
  );
}
