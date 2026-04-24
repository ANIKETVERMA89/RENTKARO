"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Car, Mail, Lock, LucideIcon, ArrowRight, Loader2, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/store/useStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login({
        id: `U-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: "renter"
      });
      router.push("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Car className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Rent<span className="text-slate-500">Karo</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-500">Login to manage your rides and bookings</p>
        </div>

        <Card className="bg-white/[0.04] border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-1 pt-8">
              <CardTitle className="text-lg text-white">Sign in to your account</CardTitle>
              <CardDescription className="text-slate-500">
                Enter your details below to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-400">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder-slate-700 focus:border-white/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-slate-400">Password</Label>
                  <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
                  <Input
                    id="password"
                    type="password"
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder-slate-700 focus:border-white/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full py-6 text-base font-bold bg-white text-black hover:bg-slate-200" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </CardContent>
          </form>

          <div className="px-6 pb-6">
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <span className="relative bg-black px-3 text-xs uppercase text-slate-600">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                <Globe className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                <Globe className="mr-2 h-4 w-4" /> Facebook
              </Button>
            </div>
          </div>

          <CardFooter className="bg-white/[0.02] border-t border-white/5 py-6 flex justify-center">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-white font-bold hover:underline">
                Sign up for free
              </Link>
            </p>
          </CardFooter>
        </Card>

        <p className="text-center mt-8 text-xs text-slate-500 uppercase tracking-[0.2em] font-medium">
          © 2026 RentKaro — All Rights Reserved
        </p>
      </motion.div>
    </div>
  );
}
