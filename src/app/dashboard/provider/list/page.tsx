"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Car, 
  Bike, 
  Zap, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  Loader2,
  Info,
  Settings2,
  Image as ImageIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useApp } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";

const FEATURES_LIST = [
  "Air Conditioning", "Bluetooth", "Reverse Camera", "Sunroof",
  "GPS", "USB Charging", "ABS", "Airbags", "Child Seat Compatible",
  "Helmet Included", "Insurance Covered", "Roadside Assistance"
];

export default function ListVehiclePage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user, addVehicle } = useApp();
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: "car" as "car" | "bike" | "scooty",
    brand: "",
    name: "",
    subType: "",
    year: 2024,
    price: 0,
    hourlyPrice: 0,
    location: "",
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 4,
    mileage: "",
    km: "",
    image: "",
    imagesList: "",
    selectedFeatures: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ["price", "hourlyPrice", "seats", "year"].includes(name) ? Number(value) : value
    }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter(f => f !== feature)
        : [...prev.selectedFeatures, feature]
    }));
  };

  const handlePublish = async () => {
    if (!user) return;
    setIsLoading(true);

    const vehicleData = {
      name: formData.name,
      brand: formData.brand,
      type: formData.type,
      subType: formData.subType || (formData.type === 'car' ? 'Sedan' : formData.type === 'bike' ? 'Cruiser' : 'Standard'),
      price: formData.price,
      hourlyPrice: formData.hourlyPrice,
      image: formData.image,
      images: formData.imagesList.split(',').map(s => s.trim()).filter(Boolean),
      specs: {
        fuel: formData.fuel,
        transmission: formData.transmission,
        seats: formData.seats,
        mileage: formData.mileage || 'N/A',
        km: formData.km || '0',
        year: formData.year,
      },
      owner: {
        id: user.id,
        name: user.name || 'Provider',
        rating: 5.0,
        verified: true,
      },
      features: formData.selectedFeatures,
      location: formData.location,
      available: true,
      providerEmail: user.email, // needed for provider_email column in Supabase
    };

    try {
      await addVehicle(vehicleData);
      setStep(4);
      setTimeout(() => router.push("/dashboard/provider"), 2500);
    } catch (err) {
      alert('Failed to add vehicle. Please check that your backend is running and all required fields are filled.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none focus:border-white/30 transition-all font-bold";

  return (
    <div className="max-w-3xl mx-auto space-y-8 relative z-10 pb-16">
      {/* Progress Bar */}
      {step < 4 && (
        <div className="flex items-center gap-3 mb-6">
          {[1, 2, 3].map((s, idx) => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${step >= s ? 'bg-white text-black' : 'bg-white/5 text-slate-600'}`}>{s}</div>
              {idx < 2 && <div className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${step > s ? 'bg-white' : 'bg-white/10'}`} />}
            </React.Fragment>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Vehicle Basics */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="bg-white/[0.02] border-white/5 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white font-black uppercase tracking-tighter text-xl flex items-center gap-2"><Info className="w-5 h-5" /> Vehicle Basics</CardTitle>
                <CardDescription className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Select class and enter vehicle identity data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-4 block">Vehicle Class</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {(['car', 'bike', 'scooty'] as const).map((type) => (
                      <button key={type} type="button" onClick={() => setFormData(p => ({ ...p, type }))}
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all group ${formData.type === type ? 'border-white bg-white/10 text-white' : 'border-white/10 bg-white/[0.02] hover:border-white/40 text-slate-500 hover:text-white'}`}>
                        {type === 'car' && <Car className="w-8 h-8" />}
                        {type === 'bike' && <Bike className="w-8 h-8" />}
                        {type === 'scooty' && <Zap className="w-8 h-8" />}
                        <span className="text-xs font-black uppercase tracking-wider">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Brand / Manufacturer</Label>
                    <input required name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Hyundai" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Model Name</Label>
                    <input required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Creta" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Sub-type / Variant</Label>
                    <input name="subType" value={formData.subType} onChange={handleChange} placeholder="e.g. Luxury SUV" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Manufacture Year</Label>
                    <input type="number" name="year" value={formData.year} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <Button className="w-full py-6 bg-white text-black hover:bg-slate-200 font-black uppercase tracking-widest" onClick={() => setStep(2)} disabled={!formData.brand || !formData.name}>
                  Next: Pricing & Specs <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* STEP 2: Pricing, Specs & Location */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <Card className="bg-white/[0.02] border-white/5 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white font-black uppercase tracking-tighter text-xl flex items-center gap-2"><Settings2 className="w-5 h-5" /> Pricing & Location</CardTitle>
                <CardDescription className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Set rental rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Daily Rate (₹)</Label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="2500" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Hourly Rate (₹)</Label>
                    <input type="number" name="hourlyPrice" value={formData.hourlyPrice} onChange={handleChange} placeholder="300" className={inputClass} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Pickup Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-slate-600" />
                    <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Malviya Nagar, Jaipur" className={`${inputClass} pl-11`} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] border-white/5 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white font-black uppercase tracking-tighter text-xl">Technical Specs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Fuel Type</Label>
                    <select name="fuel" value={formData.fuel} onChange={handleChange} className={inputClass}>
                      <option value="Petrol" className="bg-zinc-900">Petrol</option>
                      <option value="Diesel" className="bg-zinc-900">Diesel</option>
                      <option value="Electric" className="bg-zinc-900">Electric</option>
                      <option value="CNG" className="bg-zinc-900">CNG</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Transmission</Label>
                    <select name="transmission" value={formData.transmission} onChange={handleChange} className={inputClass}>
                      <option value="Automatic" className="bg-zinc-900">Automatic</option>
                      <option value="Manual" className="bg-zinc-900">Manual</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Seats</Label>
                    <input type="number" name="seats" value={formData.seats} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Mileage</Label>
                    <input name="mileage" value={formData.mileage} onChange={handleChange} placeholder="e.g. 18 km/l" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Km Driven</Label>
                    <input name="km" value={formData.km} onChange={handleChange} placeholder="e.g. 12,500" className={inputClass} />
                  </div>
                </div>

                <div>
                  <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-4 block">Select Features</Label>
                  <div className="flex flex-wrap gap-2">
                    {FEATURES_LIST.map(feature => (
                      <button key={feature} type="button" onClick={() => toggleFeature(feature)}
                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${formData.selectedFeatures.includes(feature) ? 'bg-white text-black border-white' : 'bg-transparent text-slate-500 border-white/10 hover:border-white/30 hover:text-white'}`}>
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 border-white/10 text-slate-400 hover:text-white h-14 rounded-2xl" onClick={() => setStep(1)}><ChevronLeft className="mr-2 w-4 h-4" /> Back</Button>
              <Button className="flex-[2] bg-white text-black hover:bg-slate-200 font-black uppercase tracking-widest h-14 rounded-2xl" onClick={() => setStep(3)} disabled={!formData.price || !formData.location}>
                Next: Photos <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Media */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="bg-white/[0.02] border-white/5 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white font-black uppercase tracking-tighter text-xl flex items-center gap-2"><ImageIcon className="w-5 h-5" /> Asset Media</CardTitle>
                <CardDescription className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Paste direct image URLs from Unsplash or similar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Primary Image URL (Required)</Label>
                  <input required name="image" value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com/photo-..." className={inputClass} />
                </div>

                {formData.image && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl overflow-hidden h-48 border border-white/10">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Gallery Images (Comma separated URLs)</Label>
                  <input name="imagesList" value={formData.imagesList} onChange={handleChange} placeholder="img1.jpg, img2.jpg, img3.jpg" className={inputClass} />
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <Button variant="outline" className="flex-1 border-white/10 text-slate-400 hover:text-white h-14 rounded-2xl" onClick={() => setStep(2)}><ChevronLeft className="mr-2 w-4 h-4" /> Back</Button>
                  <Button className="flex-[2] bg-white text-black hover:bg-slate-200 font-black uppercase tracking-widest h-14 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)]" onClick={handlePublish} disabled={isLoading || !formData.image}>
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
                    {isLoading ? "Broadcasting..." : "Broadcast Asset"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* STEP 4: Success */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center relative z-10">
            <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-white/20">
              <CheckCircle2 className="w-12 h-12" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">Asset Broadcast!</h2>
            <p className="text-slate-500 max-w-sm font-bold uppercase tracking-widest text-[10px] mt-2">Your vehicle is now live on the RentKaro network. Redirecting to your command center...</p>
            <Loader2 className="mt-8 h-5 w-5 animate-spin text-white opacity-40" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
