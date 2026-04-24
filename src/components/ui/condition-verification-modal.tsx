"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, AlertTriangle, Loader2, X, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConditionVerificationModalProps {
  bookingId: string;
  vehicleName: string;
  phase: "pickup" | "return";
  existingPickupImages?: string[];
  onComplete: (images: string[], damageData?: any) => void;
  onClose: () => void;
}

export function ConditionVerificationModal({
  bookingId,
  vehicleName,
  phase,
  existingPickupImages = [],
  onComplete,
  onClose
}: ConditionVerificationModalProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert file to base64 for preview and API
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string].slice(0, 4)); // max 4 images
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (images.length === 0) return;

    if (phase === "pickup") {
      // Just save pickup images
      onComplete(images);
    } else {
      // Return phase: trigger AI analysis
      setIsAnalyzing(true);
      try {
        const response = await fetch('/api/analyze-damage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pickupImages: existingPickupImages,
            returnImages: images
          })
        });

        const data = await response.json();
        setResult(data);
        setIsAnalyzing(false);
      } catch (error) {
        console.error("Analysis failed:", error);
        setIsAnalyzing(false);
        // Fallback result on error
        setResult({
          damageFound: false,
          description: "System error during AI scan. Contact support.",
          deductionAmount: 0
        });
      }
    }
  };

  const finishProcess = () => {
    if (phase === "pickup") {
      onComplete(images);
    } else {
      onComplete(images, result);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-zinc-950 border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white p-2 bg-white/5 rounded-full z-10 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {phase === "pickup" ? "Pickup Verification" : "Return & AI Scan"}
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
              Vehicle: <span className="text-white">{vehicleName}</span>
            </p>
          </div>

          {!result ? (
            <div className="space-y-6">
              <div 
                className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Capture {phase === "pickup" ? "Pickup" : "Return"} Photos</h3>
                <p className="text-slate-500 text-sm max-w-[250px]">
                  Take up to 4 photos of the vehicle (Front, Back, Left, Right). 
                </p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleImageCapture}
                />
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden group">
                      <img src={img} alt={`capture-${i}`} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removeImage(i)}
                        className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
                  {images.length < 4 && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="relative aspect-square rounded-xl bg-white/5 border border-white/10 border-dashed flex items-center justify-center cursor-pointer hover:bg-white/10"
                    >
                      <UploadCloud className="w-6 h-6 text-slate-500" />
                    </div>
                  )}
                </div>
              )}

              {isAnalyzing ? (
                <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                  <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-1">AI Scanning Condition...</h4>
                  <p className="text-slate-500 text-xs">Comparing against pickup photos using Gemini AI</p>
                </div>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={images.length === 0}
                  className="w-full h-14 bg-white text-black font-black uppercase tracking-widest hover:bg-slate-200"
                >
                  {phase === "pickup" ? "Confirm Pickup Condition" : "Run AI Damage Assessment"}
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6 text-center fade-in">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${result.damageFound ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                {result.damageFound ? <AlertTriangle className="w-10 h-10" /> : <CheckCircle2 className="w-10 h-10" />}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {result.damageFound ? "Damage Detected" : "Clear: No Damage"}
              </h3>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-left mb-6">
                <p className="text-slate-300 text-sm mb-4 leading-relaxed italic border-l-2 border-white/20 pl-3">
                  "{result.description}"
                </p>
                {result.damageFound && (
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Estimated Repair</span>
                    <span className="text-xl font-black text-red-400">₹{result.deductionAmount}</span>
                  </div>
                )}
              </div>

              <Button onClick={finishProcess} className="w-full h-14 bg-white text-black font-black uppercase tracking-widest hover:bg-slate-200">
                Acknowledge & Complete Return
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
