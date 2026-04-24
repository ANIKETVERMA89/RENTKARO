"use client";

import React from "react";
import { motion } from "framer-motion";
import { PoemAnimation } from "@/components/ui/3d-animation";

const STORY_DATA = {
    poemHTML: `
        <p className="text-white">At <span>RentKaro</span>, we believe that every journey should be as memorable as the destination itself. Our story began with a simple <span>vision</span>: to empower every traveler with the <span>courage</span> to explore, providing a bridge between shared <span>mobility</span> and individual freedom. We <span>dance</span> between convenience and quality, ensuring that every booking is a <span>triumph</span> of trust. Whether you're <span>daring</span> to take a weekend getaway or a long-distance <span>adventure</span>, we're here to catch you, ensuring you discovered unity in every mile. Step into our world, knowing that great experiences bloom when we're <span>daring greatly</span> together.</p>
`,
    backgroundImageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070",
    boyImageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070"
};

export function StorySection() {
  return (
    <section className="py-24 bg-background overflow-hidden relative z-10">
      <div className="absolute inset-0 z-0 bg-blue-900/10"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3 block">
            Our Vision
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            The RentKaro Story
          </h2>
        </motion.div>

        <PoemAnimation 
          poemHTML={STORY_DATA.poemHTML}
          backgroundImageUrl={STORY_DATA.backgroundImageUrl}
          boyImageUrl={STORY_DATA.boyImageUrl}
        />
      </div>
    </section>
  );
}
