import React, { useState, useRef } from 'react';
import {
    Camera, ArrowRight, CheckCircle2,
    ChevronLeft, MapPin, ShieldCheck,
    Utensils, Smartphone, MessageCircle,
    Clock, Search, Check, Info, Lock, Loader2, Navigation,
    Image as ImageIcon, UploadCloud, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export default function UpdishOnboarding() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState('Home-made');
    const [isCompleted, setIsCompleted] = useState(false);

    // Image Preview States
    const [previews, setPreviews] = useState({
        cover: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop",
        kitchen: null,
        dining: null
    });
    const fileInputRef = useRef(null);
    const [activeSlot, setActiveSlot] = useState(null);

    // Location States
    const [locationStatus, setLocationStatus] = useState('idle'); 
    const [dummyAddress, setDummyAddress] = useState("");
 const navgigat = useNavigate()
    // --- Handlers ---
    const handleNext = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (step < 4) {
                setStep(s => s + 1);
            } else {
                setIsCompleted(true);
            }
        }, 1200);
    };

    const prevStep = () => setStep(s => s - 1);

    const triggerUpload = (slot) => {
        setActiveSlot(slot);
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [activeSlot]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const detectLocation = () => {
        setLocationStatus('detecting');
        setTimeout(() => {
            setDummyAddress("Flat 402, Green Avenue, Kothrud, Pune - 411038");
            setLocationStatus('confirmed');
        }, 2000);
    };

    // --- Sub-components ---
    const UpdishLoader = () => (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="relative">
                <div className="absolute -inset-4 border-2 border-dashed border-orange-200 rounded-full animate-spin-slow" />
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80"
                        alt="Loading"
                        className="w-full h-full object-cover animate-pulse-gentle"
                    />
                </div>
            </div>
            <div className="mt-12 text-center">
                <h3 className="font-bold text-slate-900 text-lg tracking-tight">Syncing Kitchen Data</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mt-1">Updish Premium</p>
            </div>
        </div>
    );

    if (isCompleted) {
        return (
            <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20 scale-150" />
                    <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-100">
                        <Check className="w-10 h-10 text-white stroke-[3px]" />
                    </div>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Application Under Review</h2>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed px-4">
                    Great job! Our team is verifying your FSSAI and kitchen details. Usually takes <span className="text-orange-600 font-bold">~24 hours</span>.
                </p>
                <div className="w-full space-y-3">
                    {[
                        { icon: MessageCircle, color: "text-green-600", bg: "bg-green-50", title: "WhatsApp Alert Enabled", desc: "You'll get a ping when verified" },
                        { icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50", title: "Trust Verification", desc: "Background check in progress" },
                        { icon: Clock, color: "text-orange-600", bg: "bg-orange-50", title: "Dashboard Access", desc: "You can start adding menu items now" }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 text-left shadow-sm">
                            <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-900">{item.title}</p>
                                <p className="text-[10px] text-slate-500 font-medium tracking-tight">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Button onClick={()=>navgigat("/provider")} className="mt-10 w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                    Go to Dashboard
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBFBFB] max-w-md mx-auto flex flex-col font-sans relative">
            {loading && <UpdishLoader />}
            
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange} 
            />

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
                {/* STEP 1: IDENTITY */}
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

                {/* STEP 2: IMAGE PREVIEW SEQUENCE */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-900">Visual Showcase</h2>
                            <p className="text-gray-500 text-sm">Students order when they see quality food</p>
                        </div>

                        <div className="space-y-4">
                            {/* Main Cover */}
                            <div 
                                onClick={() => triggerUpload('cover')}
                                className="relative group overflow-hidden rounded-3xl border-2 border-dashed border-orange-200 bg-orange-50/30 cursor-pointer"
                            >
                                <div className="aspect-[16/9] w-full relative">
                                    <img 
                                        src={previews.cover} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                        alt="Cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <div className="bg-white/90 px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                                            <Camera className="w-4 h-4 text-orange-600" />
                                            <span className="text-[10px] font-black uppercase tracking-tight">Update Thali Photo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Sequence */}
                            <div className="grid grid-cols-2 gap-4">
                                {['kitchen', 'dining'].map((slot) => (
                                    <div 
                                        key={slot}
                                        onClick={() => triggerUpload(slot)}
                                        className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-white group cursor-pointer hover:border-orange-300 transition-all"
                                    >
                                        {previews[slot] ? (
                                            <img src={previews[slot]} className="w-full h-full object-cover animate-in fade-in duration-300" alt={slot} />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center">
                                                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                                                    <Camera className="w-5 h-5 text-slate-300 group-hover:text-orange-500" />
                                                </div>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase">
                                                    {slot === 'kitchen' ? '02. SHOP' : '03. Dining Area'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3">
                            <Info className="w-5 h-5 text-orange-500 shrink-0" />
                            <p className="text-[11px] text-orange-700 leading-snug">
                                <strong>Tip:</strong> Uploading photos of a clean kitchen area increases your profile trust score by 80%.
                            </p>
                        </div>
                    </div>
                )}

                {/* STEP 3: LOCATION */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 flex-1 flex flex-col">
                        <div className="text-center space-y-1">
                            <h2 className="text-xl font-bold text-gray-900">Service Location</h2>
                            <p className="text-xs text-gray-500 italic">Live Geo-tagging required for delivery</p>
                        </div>

                        <div className="relative flex-1 flex flex-col items-center justify-center min-h-[300px]">
                            {locationStatus === 'detecting' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-64 h-64 bg-orange-100 rounded-full animate-ping opacity-20" />
                                </div>
                            )}

                            <div className={`z-10 bg-white p-8 rounded-[40px] shadow-2xl border transition-all duration-500 flex flex-col items-center text-center ${locationStatus === 'confirmed' ? 'border-teal-100 scale-105 bg-teal-50/30' : 'border-orange-50'}`}>
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-colors ${locationStatus === 'confirmed' ? 'bg-teal-500 shadow-lg shadow-teal-100' : 'bg-orange-50'}`}>
                                    {locationStatus === 'confirmed' ?
                                        <Navigation className="text-white w-10 h-10 animate-pulse" /> :
                                        <MapPin className="text-orange-600 w-10 h-10" />
                                    }
                                </div>

                                {locationStatus === 'idle' && (
                                    <Button
                                        onClick={detectLocation}
                                        className="rounded-2xl bg-slate-900 px-8 h-14 text-xs font-black uppercase tracking-widest text-white shadow-xl active:scale-95 transition-all"
                                    >
                                        Detect My GPS
                                    </Button>
                                )}

                                {locationStatus === 'detecting' && (
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Syncing GPS...</p>
                                    </div>
                                )}

                                {locationStatus === 'confirmed' && (
                                    <div className="animate-in zoom-in-95 duration-300">
                                        <span className="text-[10px] font-black text-white bg-teal-600 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                                            Geo-Tagged Successfully
                                        </span>
                                        <p className="mt-4 text-sm font-bold text-teal-900 max-w-[200px] leading-snug">
                                            {dummyAddress}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {locationStatus === 'confirmed' && (
                            <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 animate-in slide-in-from-bottom-2">
                                <div className="flex items-center gap-3 mb-1">
                                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                                    <p className="text-[11px] font-black text-teal-900 uppercase">Verified Address</p>
                                </div>
                                <p className="text-[11px] text-teal-700 font-medium">This location is now locked for your kitchen profile.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 4: LEGAL */}
                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold">Safety & Legal</h2>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4 shadow-sm">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase">FSSAI Number</label>
                                    <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full">Mandatory</span>
                                </div>
                                <input className="w-full h-12 bg-gray-50 rounded-xl px-4 font-mono font-bold tracking-widest outline-none border border-transparent focus:border-orange-200 transition-all" placeholder="14 DIGITS" maxLength={14} />
                            </div>
                        </div>
                        <div className="space-y-3 px-2">
                             {[
                                { icon: Check, text: "High hygiene standards maintained" },
                                { icon: Check, text: "Transparent pricing for students" },
                                { icon: Lock, text: "Data encrypted & secure" }
                             ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                                        <item.icon className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-xs text-gray-600">{item.text}</span>
                                </div>
                             ))}
                        </div>
                    </div>
                )}
            </main>

            <footer className="p-6 bg-white border-t border-gray-100">
                <Button
                    onClick={handleNext}
                    disabled={step === 3 && locationStatus !== 'confirmed'}
                    className={`w-full h-14 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${step === 3 && locationStatus !== 'confirmed' ? 'bg-slate-200 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-100'}`}
                >
                    {step === 4 ? 'Complete Registration' : 'Continue'}
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </footer>

            <style>{`
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes pulse-gentle { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
                .animate-spin-slow { animation: spin-slow 12s linear infinite; }
                .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
            `}</style>
        </div>
    );
}