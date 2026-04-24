"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehra",
    location: "Jaipur",
    rating: 5,
    text: "Amazing service! The booking was seamless and the car was in perfect condition. Highly recommend RentKaro for anyone looking for hassle-free vehicle rental.",
    vehicle: "Hyundai Creta",
  },
  {
    name: "Sneha Patel",
    location: "Delhi",
    rating: 5,
    text: "Best rental experience I've ever had. The app made it so easy to compare prices and find the right vehicle. The provider was very professional.",
    vehicle: "Royal Enfield Classic",
  },
  {
    name: "Arjun Kapoor",
    location: "Mumbai",
    rating: 4,
    text: "Smooth process from start to finish. Loved the transparent pricing — no hidden charges. Will definitely use RentKaro again for my next trip.",
    vehicle: "Honda Activa",
  },
  {
    name: "Priya Sharma",
    location: "Bangalore",
    rating: 5,
    text: "The pick and drop service was a game-changer! Got the car delivered right to my doorstep. Excellent condition and fair pricing.",
    vehicle: "Maruti Swift",
  },
  {
    name: "Vikram Singh",
    location: "Chandigarh",
    rating: 5,
    text: "RentKaro connects you with verified owners which gives me peace of mind. The security deposit refund was instant after return. Great platform!",
    vehicle: "KTM Duke",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      indices.push((current + i + testimonials.length) % testimonials.length);
    }
    return indices;
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-cyan-600 uppercase tracking-widest mb-3 block">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-500">
            Real reviews from real renters across India.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {getVisibleIndices().map((idx, pos) => {
                const t = testimonials[idx];
                return (
                  <motion.div
                    key={`${idx}-${current}`}
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{
                      opacity: pos === 1 ? 1 : 0.7,
                      x: 0,
                      scale: pos === 1 ? 1 : 0.95,
                    }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-white rounded-2xl p-6 border ${
                      pos === 1 ? "border-blue-200 shadow-xl" : "border-slate-200 shadow-md"
                    } relative`}
                  >
                    <Quote className="w-10 h-10 text-blue-100 absolute top-4 right-4" />

                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className={`w-4 h-4 ${si < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                        />
                      ))}
                      <span className="text-sm font-semibold text-slate-700 ml-2">{t.rating}.0</span>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">{t.name}</div>
                        <div className="text-xs text-slate-400">{t.location} • {t.vehicle}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-blue-600 w-8" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
