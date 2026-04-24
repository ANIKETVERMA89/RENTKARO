"use client";

import React, { useState } from "react";
import { useApp } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, UploadCloud, Car, Info, Settings2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AddVehiclePage() {
  const { user, addVehicle } = useApp();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "car" as "car" | "bike" | "scooty",
    subType: "",
    price: 0,
    hourlyPrice: 0,
    image: "",
    imagesList: "", // Will split into images array
    location: "",
    // Specs
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 4,
    mileage: "",
    km: "",
    year: 2024,
    // features
    featuresList: "", // Will split into features array
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ["price", "hourlyPrice", "seats", "year"].includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    const vehicleData = {
      name: formData.name,
      brand: formData.brand,
      type: formData.type,
      subType: formData.subType,
      price: formData.price,
      hourlyPrice: formData.hourlyPrice,
      image: formData.image,
      images: formData.imagesList.split(',').map(s => s.trim()).filter(Boolean),
      specs: {
        fuel: formData.fuel,
        transmission: formData.transmission,
        seats: formData.seats,
        mileage: formData.mileage,
        km: formData.km,
        year: formData.year,
      },
      owner: {
        id: user.id || 'usr',
        name: user.name || 'Provider',
        rating: 5.0,
        verified: true,
      },
      features: formData.featuresList.split(',').map(s => s.trim()).filter(Boolean),
      location: formData.location,
      available: true
    };

    await addVehicle(vehicleData);
    
    setIsSubmitting(false);
    router.push("/dashboard");
  };

  if (user?.role !== 'provider') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-black uppercase text-white mb-2">Access Denied</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">You must be a verified provider to access this transmission.</p>
        <Link href="/dashboard" className="mt-6">
          <Button variant="outline" className="border-white/10 text-white">Return to Base</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 relative z-10">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-8 group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit to Dashboard</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Initialize <span className="text-zinc-500 NOT-italic">Asset</span>
        </h1>
        <p className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">Provide technical specifications to list your vehicle on the public network.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Core Payload */}
        <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
             <Car className="w-32 h-32" />
           </div>
           
           <h3 className="text-lg font-black text-white/90 mb-6 flex items-center gap-2 uppercase tracking-wider relative z-10">
             <Info className="w-5 h-5 text-white" /> Core Details
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Brand / Manufacturer</label>
               <input required name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Tesla" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Model Name</label>
               <input required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Model S Plaid" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Vehicle Class</label>
               <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold cursor-pointer">
                 <option value="car" className="bg-zinc-900">Car</option>
                 <option value="bike" className="bg-zinc-900">Bike</option>
                 <option value="scooty" className="bg-zinc-900">Scooty</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Sub Type</label>
               <input required name="subType" value={formData.subType} onChange={handleChange} placeholder="e.g. Luxury Sedan" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none focus:border-white/30 transition-all font-bold" />
             </div>
           </div>
        </section>

        {/* Financials & Location */}
        <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl">
           <h3 className="text-lg font-black text-white/90 mb-6 flex items-center gap-2 uppercase tracking-wider">
             <Settings2 className="w-5 h-5 text-white" /> Operations & Financials
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Daily Rate (₹)</label>
               <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Hourly Rate (₹)</label>
               <input required type="number" name="hourlyPrice" value={formData.hourlyPrice} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Location City</label>
               <input required name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bangalore" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none focus:border-white/30 transition-all font-bold" />
             </div>
           </div>
        </section>

        {/* Technical Specs */}
        <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl">
           <h3 className="text-lg font-black text-white/90 mb-6 flex items-center gap-2 uppercase tracking-wider">
             <Settings2 className="w-5 h-5 text-white" /> Specifications
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Fuel Type</label>
               <input name="fuel" value={formData.fuel} onChange={handleChange} placeholder="Petrol / Electric / Diesel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Transmission</label>
               <input name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Automatic / Manual" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Seating Capacity</label>
               <input type="number" name="seats" value={formData.seats} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Mileage Range</label>
               <input name="mileage" value={formData.mileage} onChange={handleChange} placeholder="e.g. 15 km/l" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Kilometers Driven</label>
               <input name="km" value={formData.km} onChange={handleChange} placeholder="e.g. 12,500" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Manufacture Year</label>
               <input type="number" name="year" value={formData.year} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold" />
             </div>
           </div>
           
           <div className="mt-8 space-y-2">
             <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Additional Features (comma separated)</label>
             <input name="featuresList" value={formData.featuresList} onChange={handleChange} placeholder="e.g. Sunroof, Bluetooth, Autopilot, Extra Helmet" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-bold" />
           </div>
        </section>

        {/* Media */}
        <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
           <h3 className="text-lg font-black text-white/90 mb-6 flex items-center gap-2 uppercase tracking-wider">
             <UploadCloud className="w-5 h-5 text-white" /> Asset Media
           </h3>
           <div className="space-y-6">
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Primary Display Image (Direct URL)</label>
               <input required name="image" value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com/photo-..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none focus:border-white/30 transition-all font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Gallery Images (Comma separated URLs)</label>
               <input name="imagesList" value={formData.imagesList} onChange={handleChange} placeholder="image1.jpg, image2.jpg" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none focus:border-white/30 transition-all font-bold" />
             </div>
           </div>

           {formData.image && (
             <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-8 border border-white/10 rounded-2xl overflow-hidden h-48 w-full max-w-sm">
               <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
             </motion.div>
           )}
        </section>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-white text-black hover:bg-zinc-200 uppercase tracking-[0.2em] font-black h-14 px-10 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Broadcast Asset"}
          </Button>
        </div>
      </form>
    </div>
  );
}
