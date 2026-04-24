"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/store/useStore";
import { motion } from "framer-motion";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, MapPin, Gauge, Fuel, Users, Calendar, 
  ShieldCheck, Info, CheckCircle2, ChevronRight, 
  CalendarDays, ArrowLeft, Loader2
} from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export default function VehicleDetailPage() {
  const { id } = useParams();
  const { vehicles, user, addBooking } = useApp();
  const router = useRouter();
  
  const vehicle = vehicles.find(v => String(v.id) === String(id));
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  if (!vehicle) return <div>Vehicle not found</div>;

  const handleBook = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setIsBooking(true);
  };

  const confirmBooking = async () => {
    try {
      const price = vehicle.price * 2; // mock 2 days
      const amountInPaise = price * 100;

      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInPaise })
      });
      const orderData = await orderRes.json();

      if (orderData.simulated) {
        processSuccessOption();
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RentKaro Core",
        description: `Deployment Protocol for ${vehicle.name}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              isSimulated: false
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            processSuccessOption();
          } else {
            alert("Payment signature cryptographically rejected.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "9999999999"
        },
        theme: {
          color: "#000000"
        }
      };

      const razorpayObj = new (window as any).Razorpay(options);
      razorpayObj.open();

    } catch (error) {
      console.error(error);
      alert("Failed to initialize billing orbital.");
    }
  };

  const processSuccessOption = () => {
    addBooking({
      vehicleId: vehicle.id,
      userId: user!.id,
      startDate: dateRange.start,
      endDate: dateRange.end,
      totalPrice: vehicle.price * 2, // Mock 2 days
      status: 'pending'
    });
    setBookingStep(3);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      <AnimatedNavFramer />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        <Link href="/vehicles" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-12 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit to Listings</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Images and Specs */}
          <div className="flex-1 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-zinc-900 border border-white/10"
            >
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-[600px] object-cover opacity-80" />
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {(vehicle.images || []).map((img, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl overflow-hidden border border-white/10 h-28 bg-zinc-900 cursor-pointer"
                >
                  <img src={img} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" alt="Gallery" />
                </motion.div>
              ))}
            </div>

            <div className="bg-zinc-900/40 rounded-[2.5rem] p-10 border border-white/5 backdrop-blur-xl">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-10">Technical <span className="text-zinc-500 NOT-italic">Payload</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  { label: "Genesis", value: vehicle.specs?.year || 'N/A', icon: <CalendarDays className="w-5 h-5 text-white" /> },
                  { label: "Propulsion", value: vehicle.specs?.fuel || 'N/A', icon: <Fuel className="w-5 h-5 text-white" /> },
                  { label: "System", value: vehicle.specs?.transmission || 'N/A', icon: <Gauge className="w-5 h-5 text-white" /> },
                  { label: "Range", value: vehicle.specs?.mileage || 'N/A', icon: <Info className="w-5 h-5 text-white" /> },
                  { label: "Odometer", value: vehicle.specs?.km || 'N/A', icon: <MapPin className="w-5 h-5 text-white" /> },
                  { label: "Capacity", value: `${vehicle.specs?.seats || 4} Soul`, icon: <Users className="w-5 h-5 text-white" /> },
                ].map((spec) => (
                  <div key={spec.label} className="group">
                    <div className="flex items-center gap-3 mb-3 border-l-2 border-white/10 pl-4 group-hover:border-white transition-colors">
                      {spec.icon}
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{spec.label}</span>
                    </div>
                    <div className="text-xl font-bold text-white pl-4">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-black text-white uppercase tracking-widest">Equipped Features</h2>
              <div className="flex flex-wrap gap-3">
                {(vehicle.features || []).map(f => (
                  <span key={f} className="px-6 py-2 bg-white/5 border border-white/10 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:text-white hover:border-white/30 transition-all cursor-default">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing and Booking */}
          <div className="w-full lg:w-[450px] space-y-8">
            <div className="sticky top-28 p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 backdrop-blur-3xl shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">{vehicle.brand} <br /> {vehicle.name}</h1>
                  <p className="text-slate-600 font-bold uppercase tracking-widest text-xs mt-4">{vehicle.subType} — {vehicle.location}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-4xl font-black text-white italic">₹{vehicle.price}</div>
                  <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">per orbit</div>
                </div>
              </div>

              {!isBooking ? (
                <Button className="w-full py-8 text-sm font-black uppercase tracking-[0.3em] bg-white text-black hover:bg-zinc-200 transition-all rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]" onClick={handleBook}>
                  Initialize Booking
                </Button>
              ) : (
                <div className="space-y-8">
                  {bookingStep === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Select Launch Windows</div>
                      <div className="space-y-3">
                        <input 
                          type="date" 
                          className="w-full p-4 rounded-xl border border-white/10 bg-black text-white outline-none focus:border-white/30 transition-all" 
                          onChange={e => setDateRange({...dateRange, start: e.target.value})}
                        />
                        <input 
                          type="date" 
                          className="w-full p-4 rounded-xl border border-white/10 bg-black text-white outline-none focus:border-white/30 transition-all" 
                          onChange={e => setDateRange({...dateRange, end: e.target.value})}
                        />
                      </div>
                      <Button className="w-full bg-white text-black font-black uppercase tracking-widest" onClick={() => setBookingStep(2)}>Verify Route</Button>
                    </motion.div>
                  )}
                  {bookingStep === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Route Confirmation</div>
                      <div className="p-6 bg-white/[0.04] rounded-2xl border border-white/10 text-sm">
                        <span className="text-slate-500 uppercase tracking-widest block mb-2 font-bold text-[10px]">Estimated Credits:</span>
                        <span className="font-black text-white text-2xl tracking-tighter italic">₹{vehicle.price * 2}</span>
                      </div>
                      <Button className="w-full bg-white text-black font-black uppercase tracking-widest" onClick={confirmBooking}>Finalize Protocol</Button>
                    </motion.div>
                  )}
                  {bookingStep === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10">
                      <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <h3 className="font-black text-white uppercase tracking-[0.2em]">Deployment Success</h3>
                      <p className="text-[10px] text-slate-600 mt-4 uppercase font-bold tracking-widest">Transmitting to Command Center...</p>
                      <Loader2 className="mt-6 h-5 w-5 animate-spin text-white" />
                    </motion.div>
                  )}
                </div>
              )}

              <div className="mt-10 pt-10 border-t border-white/5 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-black text-lg">
                    {vehicle.owner?.name?.[0] || 'O'}
                  </div>
                  <div>
                    <div className="text-sm font-black text-white uppercase tracking-widest">{vehicle.owner?.name || 'Unknown Operator'}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-white fill-white" />
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{vehicle.owner?.rating || '4.5'} Trust Index</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest"><ShieldCheck className="w-3 h-3 text-white" /> Operator Verified</span>
                  <span className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest"><ShieldCheck className="w-3 h-3 text-white" /> Prime Insured Asset</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
              <h3 className="text-[10px] font-black text-white mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                <Info className="w-4 h-4" /> Termination Policy
              </h3>
              <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-widest">
                Cancel mission up to 24 cycles before deployment for full credit return. Internal system protocols apply within 24 cycle window.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
