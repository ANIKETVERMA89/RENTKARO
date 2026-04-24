"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative bg-neutral-900 text-white rounded-3xl p-12 sm:p-16 text-center overflow-hidden border border-white/5 shadow-2xl"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 uppercase tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Ready to Hit the Road?
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8 font-medium">
              Join thousands of happy renters and providers. Start your journey with RentKaro today.
            </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="/vehicles">
                 <Button variant="default" size="lg" className="bg-white text-black hover:bg-slate-200 text-base font-bold w-full sm:w-auto rounded-full px-10">
                   Rent a Vehicle →
                 </Button>
               </Link>
               <Link href="/register">
                 <Button variant="outline" size="lg" className="text-base border-white/10 text-white hover:bg-white/5 w-full sm:w-auto rounded-full px-10">
                   List Your Vehicle →
                 </Button>
               </Link>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
