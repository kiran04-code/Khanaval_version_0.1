import React, { useState } from 'react';
import { 
  Camera, ArrowRight, Navigation2, CheckCircle2, 
  ChevronLeft, Store, MapPin, ShieldCheck, 
  Image as ImageIcon, Utensils, Info, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ZomatoStyleOnboarding() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('Home-made');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-[#F8F8F8] font-sans text-[#1C1C1C] max-w-md mx-auto flex flex-col">
      
      {/* 1. TOP NAVIGATION */}
      <nav className="p-4 flex items-center bg-white border-b border-gray-100">
        <button onClick={prevStep} className={`p-2 ${step === 1 ? 'invisible' : ''}`}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Step {step} of 4</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </nav>

      {/* 2. PROGRESS BAR */}
      <div className="w-full h-1 bg-gray-100">
        <div 
          className="h-full bg-[#E23744] transition-all duration-500" 
          style={{ width: `${(step / 4) * 100}%` }} 
        />
      </div>

      <main className="flex-1 p-6 flex flex-col">
        
        {/* STEP 1: BUSINESS IDENTITY */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-gray-900">List your Mess</h1>
              <p className="text-gray-500 text-sm font-medium">Create a professional profile for students</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase">Mess Name</label>
                <input 
                  className="w-full h-12 border-b-2 border-gray-100 focus:border-[#E23744] outline-none transition-all text-lg font-bold placeholder:text-gray-200" 
                  placeholder="e.g. Annapurna Tiffin" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase">Operating Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Home-made', 'Commercial', 'Tiffin-only'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        selectedType === type 
                        ? 'border-[#E23744] bg-red-50/50' 
                        : 'border-gray-50 bg-gray-50'
                      }`}
                    >
                      <span className={`font-bold ${selectedType === type ? 'text-[#E23744]' : 'text-gray-600'}`}>{type}</span>
                      {selectedType === type && <CheckCircle2 className="w-5 h-5 text-[#E23744] fill-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: VISUALS (THE ZOMATO HERO) */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-black">Upload Photos</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Primary Thali Image */}
              <div className="col-span-2 aspect-video bg-white rounded-[32px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 hover:bg-red-50/30 hover:border-[#E23744] transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Utensils className="text-[#E23744] w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm">Main Thali Photo</p>
                  <p className="text-[10px] text-gray-400 font-medium">This is your cover image</p>
                </div>
              </div>

              {['Kitchen', 'Dining', 'Front Gate'].map(label => (
                <div key={label} className="aspect-square bg-white rounded-[24px] border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION (ZOMATO RADAR) */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-black text-center">Store Location</h2>
            
            <div className="relative aspect-square w-full flex items-center justify-center">
              {/* Animated Rings */}
              <div className="absolute w-64 h-64 bg-red-100/30 rounded-full animate-ping" />
              <div className="absolute w-48 h-48 bg-red-100/50 rounded-full animate-pulse" />
              
              <div className="z-10 bg-white p-6 rounded-[40px] shadow-2xl shadow-red-200/50 border border-red-50 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#E23744] rounded-3xl rotate-12 flex items-center justify-center shadow-lg shadow-red-200 mb-4">
                  <MapPin className="text-white w-8 h-8 -rotate-12" />
                </div>
                <Button className="rounded-full bg-[#1C1C1C] px-6 text-[11px] font-black uppercase tracking-widest">
                  Auto-Detect GPS
                </Button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
               <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Detailed Address</label>
               <textarea 
                className="w-full bg-transparent font-medium text-sm outline-none resize-none" 
                rows={3} 
                placeholder="Street name, Landmark, Building floor..."
              />
            </div>
          </div>
        )}

        {/* STEP 4: LEGAL */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-2xl">
                <ShieldCheck className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black">Safety & Trust</h2>
                <p className="text-xs font-medium text-gray-500">Mandatory FSSAI Compliance</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase">FSSAI License Number</label>
                <input 
                  type="number"
                  className="w-full h-12 bg-gray-50 rounded-xl px-4 font-mono font-bold tracking-[0.3em] outline-none focus:ring-2 focus:ring-red-100 transition-all" 
                  placeholder="14 DIGITS"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase">License Expiry Date</label>
                <input 
                  type="date"
                  className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold text-gray-600 outline-none" 
                />
              </div>

              <div className="p-4 bg-orange-50 rounded-2xl flex items-start gap-3">
                <Info className="w-4 h-4 text-orange-600 mt-1 shrink-0" />
                <p className="text-[10px] text-orange-800 font-medium leading-relaxed">
                  Listing your FSSAI license increases student trust by 40% and helps in faster approval of your mess.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 3. STICKY FOOTER */}
      <footer className="p-6 bg-white border-t border-gray-100">
        <Button 
          onClick={nextStep}
          className="w-full h-14 bg-[#E23744] hover:bg-[#CB202D] text-white rounded-2xl font-black text-md shadow-lg shadow-red-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {step === 4 ? 'COMPLETE LISTING' : 'CONTINUE'}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </footer>
    </div>
  );
}