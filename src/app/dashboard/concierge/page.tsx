"use client";

import { SideNav } from "@/components/ui/side-nav";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Headphones, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  PhoneCall, 
  MessageSquare, 
  Clock, 
  ChevronRight,
  LifeBuoy,
  Info,
  Navigation,
  X,
  Activity,
  Signal
} from "lucide-react";

const userDashboardNav = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "calendar_today", label: "My Bookings", href: "/dashboard/bookings" },
  { icon: "directions_car", label: "Fleet", href: "/vehicles" },
  { icon: "support_agent", label: "Concierge", href: "/dashboard/concierge" },
  { icon: "settings", label: "Settings", href: "/settings" },
];

export default function ConciergePage() {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState({ lat: 28.6139, lng: 77.2090, speed: 0 });

  // Simulate Google Analytics Tracking Event
  const trackEvent = (eventName: string, params: object) => {
    console.log(`[Google Analytics] Event: ${eventName}`, params);
    // In a real app, this would be:
    // window.gtag('event', eventName, params);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      trackEvent('start_live_tracking', { vehicle_id: 'RK-9922', timestamp: Date.now() });
      interval = setInterval(() => {
        setTrackingData(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
          speed: Math.floor(Math.random() * 60) + 20
        }));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const conciergeServices = [
    {
      id: "roadside",
      icon: <Zap className="w-5 h-5" />,
      title: "Roadside Assistance",
      description: "Breakdowns, flat tires, or fuel delivery anywhere in India.",
      action: "Call Emergency Line",
      onClick: () => trackEvent('concierge_action', { service: 'roadside_assistance' })
    },
    {
      id: "chauffeur",
      icon: <LifeBuoy className="w-5 h-5" />,
      title: "Chauffeur on Demand",
      description: "Professional drivers available for long-distance trips or city tours.",
      action: "Request Chauffeur",
      onClick: () => trackEvent('concierge_action', { service: 'chauffeur_request' })
    },
    {
      id: "insurance",
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Insurance & Claim Assistance",
      description: "Hassle-free insurance and claim assistance.",
      action: "View Policy",
      onClick: () => trackEvent('concierge_action', { service: 'insurance_claim' })
    },
    {
      id: "tracking",
      icon: <MapPin className="w-5 h-5" />,
      title: "Live Tracking",
      description: "Real-time GPS tracking and geofencing for your rental.",
      action: "Track Ride",
      onClick: () => setIsTracking(true)
    }
  ];

  const contactOptions = [
    { icon: <PhoneCall className="w-5 h-5 text-emerald-500" />, label: "Priority Voice Call", sub: "Avg. wait: < 2 mins", action: () => trackEvent('support_contact', { method: 'voice' }) },
    { icon: <MessageSquare className="w-5 h-5 text-emerald-500" />, label: "WhatsApp Concierge", sub: "Instant messaging", action: () => trackEvent('support_contact', { method: 'whatsapp' }) },
    { icon: <Clock className="w-5 h-5 text-indigo-500" />, label: "Schedule a Callback", sub: "We call you", action: () => trackEvent('support_contact', { method: 'callback' }) }
  ];

  return (
    <div className="flex bg-background text-foreground min-h-screen">
      <SideNav items={userDashboardNav} />

      <main className="flex-1 with-sidebar overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          
          <header className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl font-black tracking-tight mb-6 text-gradient uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Your Journey, Our Priority
              </h1>
              <p className="text-slate-500 text-xl max-w-3xl font-medium leading-relaxed">
                Premium care and instant support for a <span className="text-white font-bold underline decoration-white/20 decoration-2 underline-offset-8">smooth</span> ride through every mile of your experience.
              </p>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-24">
              <div className="space-y-10">
                {conciergeServices.map((service, i) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/[0.03] border border-white/5 rounded-xl p-10 hover:bg-white/[0.06] transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                  >
                    <div className="flex items-center gap-10">
                      <div className="bg-white/5 w-20 h-20 rounded-xl flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                        <div className="text-slate-400 group-hover:text-inherit transition-colors">
                          {service.icon}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-black text-white tracking-tight mb-2 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>{service.title}</h3>
                        <p className="text-slate-500 text-base max-w-sm leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                    <button 
                      onClick={service.onClick}
                      className="whitespace-nowrap px-10 py-4 rounded-lg border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
                    >
                      {service.action}
                    </button>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#1b1b1d] rounded-xl p-16 lg:p-20 relative overflow-hidden group border border-white/[0.03] shadow-2xl"
              >
                 <div className="relative z-10 max-w-xl">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <ShieldCheck className="w-8 h-8 text-white" />
                       </div>
                       <h3 className="text-4xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>Safe Rides. Happy Journeys.</h3>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed mb-10">
                       Our specialized concierge team is monitoring every rental 24/7. RentKaro ensures you have professional assistance whenever and wherever you need it.
                    </p>
                    <button className="bg-white text-black px-10 py-4 rounded-lg font-bold uppercase tracking-[0.2em] text-[11px] hover:scale-105 active:scale-95 transition-all">
                       Explore Services
                    </button>
                 </div>
                 
                 <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden flex items-end pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
                    <img 
                      src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop" 
                      alt="Safe Journey" 
                      className="w-full h-auto object-contain translate-x-12 translate-y-8 filter brightness-125 grayscale group-hover:scale-110 transition-transform duration-1000"
                    />
                 </div>
              </motion.div>
            </div>

            <div className="lg:col-span-4 space-y-12">
              <div className="bg-[#131315] border border-white/5 rounded-xl p-10 shadow-xl">
                <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <Info className="w-4 h-4 text-white/50" />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">Essential Info</h3>
                </div>
                <div className="space-y-8">
                  {[
                    { icon: <Zap className="w-4 h-4" />, label: "Toll payments auto-debited via FASTag" },
                    { icon: <ShieldCheck className="w-4 h-4" />, label: "Original RC & Insurance in Glove Box" },
                    { icon: <LifeBuoy className="w-4 h-4" />, label: "Fuel Type: Unleaded Petrol Only" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="mt-1 text-white/20">
                        {item.icon}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#131315] border border-white/5 rounded-xl p-10 shadow-xl">
                <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <Headphones className="w-4 h-4 text-white/50" />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">Contact Support</h3>
                </div>
                <div className="space-y-4">
                  {contactOptions.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={opt.action}
                      className="w-full flex items-center gap-5 p-5 rounded-lg hover:bg-white/[0.04] transition-all group text-left border border-white/5 hover:border-white/10"
                    >
                      <div className="bg-white/5 p-4 rounded-lg group-hover:bg-white group-hover:text-black transition-all">
                        {opt.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-bold tracking-tight">{opt.label}</p>
                        <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.15em] mt-0.5">{opt.sub}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Live Tracking Modal (Google Analytics Integrated Simulation) */}
      <AnimatePresence>
        {isTracking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#131315] border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/20">
                    <Navigation className="w-6 h-6 text-emerald-500 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Live Vehicle Tracking</h2>
                    <p className="text-slate-500 text-sm font-mono tracking-widest uppercase">RK-9922 | STATUS: ON ROAD</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsTracking(false);
                    trackEvent('stop_live_tracking', { vehicle_id: 'RK-9922' });
                  }}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              <div className="relative h-[400px] bg-[#0c0c0e] flex items-center justify-center overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:20px_20px]"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
                </div>

                {/* Animated Vehicle Pulse */}
                <motion.div 
                  animate={{ 
                    x: (trackingData.lng - 77.2090) * 100000, 
                    y: (trackingData.lat - 28.6139) * 100000 
                  }}
                  className="relative z-10"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-40 animate-pulse scale-150"></div>
                    <div className="bg-emerald-500 p-4 rounded-full border-4 border-[#131315] shadow-2xl relative z-10">
                      <Navigation className="w-8 h-8 text-white rotate-45" />
                    </div>
                  </div>
                </motion.div>

                {/* Telemetry Overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between">
                  <div className="flex gap-4">
                    <div className="bg-black/60 backdrop-blur-md border border-white/5 p-4 rounded-xl min-w-[120px]">
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Current Speed</p>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-white">{trackingData.speed}</span>
                        <span className="text-[10px] text-slate-500 mb-1">KM/H</span>
                      </div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-md border border-white/5 p-4 rounded-xl min-w-[120px]">
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Connectivity</p>
                      <div className="flex items-center gap-2">
                        <Signal className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-bold text-white uppercase tracking-tighter">Excellent</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md border border-white/5 p-4 rounded-xl flex items-center gap-4">
                    <Activity className="w-6 h-6 text-purple-500 animate-pulse" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">AI Engine Status</p>
                      <p className="text-sm font-bold text-white">Monitoring Active</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-black/40 flex items-center justify-between text-xs">
                <div className="flex gap-6 text-slate-500">
                  <div className="flex items-center gap-2 font-mono">LAT: {trackingData.lat.toFixed(6)}</div>
                  <div className="flex items-center gap-2 font-mono">LNG: {trackingData.lng.toFixed(6)}</div>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 font-black uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                  Real-time Data Stream Enabled
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
