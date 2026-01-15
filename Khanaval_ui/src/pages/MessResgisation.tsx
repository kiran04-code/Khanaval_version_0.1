import React, { useState } from 'react';
import { 
  Camera, ArrowRight, CheckCircle2, 
  ChevronLeft, MapPin, ShieldCheck, 
  Utensils, Smartphone, MessageCircle,
  Clock, Search, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpdishOnboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('Home-made');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step < 4) {
        setStep(s => s + 1);
      } else {
        setIsCompleted(true);
      }
    }, 1500); // Slightly longer to appreciate the animation
  };

  const prevStep = () => setStep(s => s - 1);

  // --- BRANDED THALI LOADER ---
// ... (previous imports remains the same)

  // --- BRANDED THALI LOADER ---
  const UpdishLoader = () => (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated Outer Ring */}
        <div className="absolute -inset-4 border-2 border-dashed border-orange-200 rounded-full animate-spin-slow" />
        
        {/* The Thali Image Container */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80" 
            alt="Indian Thali"
            className="w-full h-full object-cover animate-pulse-gentle"
          />
          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Small Floating Icon */}
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <Utensils className="text-white w-5 h-5" />
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <div className="flex items-center justify-center gap-1 mb-2">
           <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
           <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
           <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg tracking-tight">Setting up your kitchen</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mt-1">Updish Premium</p>
      </div>

      <style    >{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

// ... (rest of the component logic remains the same)

  // --- FINAL SUCCESS VIEW ---
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
          <Check className="w-8 h-8 text-white stroke-[3px]" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Received</h2>
        <p className="text-slate-500 text-sm mb-8">Verification takes up to <span className="text-orange-600 font-bold">24 hours</span> before going live.</p>
        
        <div className="w-full space-y-3">
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">WhatsApp Alerts</p>
              <p className="text-[10px] text-slate-500 tracking-tight">Enabled for incoming orders</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">App Notifications</p>
              <p className="text-[10px] text-slate-500 tracking-tight">Real-time status tracking active</p>
            </div>
          </div>
        </div>

        <Button className="mt-10 w-full h-14 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] max-w-md mx-auto flex flex-col font-sans">
      {loading && <UpdishLoader />}

      <nav className="p-4 flex items-center bg-white border-b border-gray-100">
        <button onClick={prevStep} className={`p-2 hover:bg-gray-50 rounded-full transition-colors ${step === 1 ? 'invisible' : ''}`}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Step {step} of 4</span>
        </div>
        <div className="w-10" />
      </nav>

      <div className="w-full h-1 bg-gray-100">
        <div className="h-full bg-orange-600 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
      </div>

      <main className="flex-1 p-6 flex flex-col">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-gray-900">Kitchen Identity</h1>
              <p className="text-gray-500 text-sm">Basic details for your student profile</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase">Mess Name</label>
                <input className="w-full h-10 border-b border-gray-100 focus:border-orange-600 outline-none font-bold text-lg placeholder:text-gray-200" placeholder="e.g. Royal Kitchen" />
              </div>
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase">Operating Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Home-made', 'Commercial', 'Tiffin-only'].map(type => (
                    <button key={type} onClick={() => setSelectedType(type)} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${selectedType === type ? 'border-orange-600 bg-orange-50/50 text-orange-600' : 'border-gray-50 bg-gray-50 text-gray-600'}`}>
                      <span className="font-bold">{type}</span>
                      {selectedType === type && <CheckCircle2 className="w-5 h-5" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold">Menu Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-video bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-orange-50/30 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                  <Utensils className="text-orange-600 w-6 h-6" />
                </div>
                <p className="font-bold text-sm">Cover Photo</p>
              </div>
              {['Kitchen', 'Dining'].map(label => (
                <div key={label} className="aspect-square bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-1 hover:border-orange-200 transition-colors cursor-pointer">
                  <Camera className="w-5 h-5 text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold text-center">Service Location</h2>
            <div className="relative aspect-square w-full flex items-center justify-center">
              <div className="absolute w-48 h-48 bg-orange-100 rounded-full animate-pulse opacity-50" />
              <div className="z-10 bg-white p-6 rounded-[32px] shadow-xl border border-orange-50 flex flex-col items-center">
                <MapPin className="text-orange-600 w-8 h-8 mb-4" />
                <Button className="rounded-full bg-slate-900 px-6 h-10 text-[10px] font-bold uppercase tracking-widest text-white">Detect GPS</Button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold">Safety & Legal</h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase">FSSAI Number</label>
                <input className="w-full h-12 bg-gray-50 rounded-xl px-4 font-mono font-bold tracking-widest outline-none border border-transparent focus:border-orange-200" placeholder="14 DIGITS" />
              </div>
              <div className="p-4 bg-blue-50 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-[11px] text-blue-800 font-medium leading-relaxed">Verified licenses get 2x more orders from safety-conscious students.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 bg-white border-t border-gray-100">
        <Button onClick={handleNext} className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-orange-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
          {step === 4 ? 'Complete Registration' : 'Continue'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </footer>
    </div>
  );
}