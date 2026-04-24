"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Car, Users, MapPin, Star } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out: decelerate towards end
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(target);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  {
    icon: <Car className="w-6 h-6" />,
    value: 500,
    suffix: "+",
    label: "Vehicles Available",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: 10000,
    suffix: "+",
    label: "Happy Customers",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    value: 50,
    suffix: "+",
    label: "Cities Covered",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: <Star className="w-6 h-6" />,
    value: 4.8,
    suffix: "★",
    label: "Average Rating",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export function StatsSection() {
  return (
    <section id="stats" className="py-32 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div
                className="text-4xl lg:text-5xl font-bold text-white mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {stat.value === 4.8 ? (
                  <span>4.8{stat.suffix}</span>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
