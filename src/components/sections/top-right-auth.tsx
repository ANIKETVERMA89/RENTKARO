"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/store/useStore";
import { cn } from "@/lib/utils";

export function TopRightAuth() {
  const { user, logout } = useApp();

  return (
    <div className="fixed top-6 right-6 z-[60] flex items-center gap-3">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="auth-buttons"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2"
          >
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white bg-white/5 border border-white/10 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </motion.button>
            </Link>

            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-black bg-white transition-all flex items-center gap-2"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Sign Up
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="user-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </motion.button>
            </Link>

            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
