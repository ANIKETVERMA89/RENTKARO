"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Car, Menu, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useApp } from "@/store/useStore";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Browse Vehicles", href: "/vehicles" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Stats", href: "/#stats" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    }
  },
};

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);
  const { user } = useApp();

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    }
    else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-white/[0.08] bg-black/80 shadow-lg shadow-black/40 backdrop-blur-2xl h-12",
          !isExpanded && "cursor-pointer justify-center"
        )}
      >
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 flex items-center gap-2 font-semibold pl-5 pr-2"
        >
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-5 w-5 text-white" />
            <span className="text-white font-bold text-base tracking-tight">
              Rent<span className="text-slate-400">Karo</span>
            </span>
          </Link>
        </motion.div>

        <motion.div
          className={cn(
            "flex items-center gap-1 sm:gap-3 pr-5",
            !isExpanded && "pointer-events-none"
          )}
        >
          {navItems.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <Link
                href={item.href}
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-2.5 py-1 rounded-full hover:bg-white/5"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          
          {user && (
            <motion.div variants={itemVariants}>
              <Link
                href="/dashboard"
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-semibold text-black bg-white px-4 py-1.5 rounded-full hover:bg-slate-200 transition-all ml-1 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            </motion.div>
          )}
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            <Menu className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}
