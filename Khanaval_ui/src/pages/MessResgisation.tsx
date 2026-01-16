import React, { useState, useRef } from 'react';
import {
    Camera, ArrowRight, CheckCircle2,
    ChevronLeft, MapPin, ShieldCheck,
    Utensils, Smartphone, MessageCircle,
    Clock, Search, Check, Info, Lock, Loader2, Navigation,
    Image as ImageIcon, UploadCloud, X, AlertCircle, MapPinned
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { UserProviderdata } from '@/hooks/Provider';

export default function UpdishOnboarding() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();

    // --- FORM STATES ---
    const [messName, setMessName] = useState("");
    const [startTime, setStartTime] = useState("08:00");
    const [endTime, setEndTime] = useState("22:00");
    const [dietaryType, setDietaryType] = useState('Pure Veg');
    const [selectedType, setSelectedType] = useState('Home-made');
    const [fssai, setFssai] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "error" });

    const [previews, setPreviews] = useState({
        cover: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop",
        kitchen: null,
        dining: null
    });
    const fileInputRef = useRef(null);
    const [activeSlot, setActiveSlot] = useState(null);
    const { Providerdata } = UserProviderdata();

    // --- ENHANCED LOCATION STATE ---
    const [locationData, setLocationData] = useState({
        lat: null,
        lng: null,
        address: "",
        city: "",
        state: "",
        postcode: ""
    });
    const [locationStatus, setLocationStatus] = useState('idle');

    const showToast = (msg, type = "error") => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3000);
    };

    const detectLocation = () => {
        if (!navigator.geolocation) {
            return showToast("Your browser does not support GPS detection.");
        }

        setLocationStatus('detecting');

        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude, accuracy } = position.coords;

                try {
                    // Using LocationIQ for Reverse Geocoding
                    const response = await fetch(
                        `https://us1.locationiq.com/v1/reverse.php?key=pk.91fc812339a9eec58d906360c5be50fc&lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const data = await response.json();
                    
                    setLocationData({
                        lat: latitude,
                        lng: longitude,
                        address: data.display_name,
                        city: data.address.city || data.address.town || data.address.village || "N/A",
                        state: data.address.state,
                        postcode: data.address.postcode,
                        accuracy: Math.round(accuracy) + "m"
                    });
                    
                    setLocationStatus('confirmed');
                    showToast("Mess Location Verified!", "success");
                } catch (err) {
                    setLocationData(prev => ({ ...prev, lat: latitude, lng: longitude }));
                    setLocationStatus('confirmed');
                    showToast("GPS captured, but address lookup failed.");
                }
            },
            (error) => {
                setLocationStatus('idle');
                showToast("Please enable GPS/Location permissions.");
            },
            options
        );
    };

    const handleSubmit = () => {
        if (!locationData.lat || !locationData.lng) {
            return showToast("Please detect location before submitting.");
        }
        if (fssai.length < 14) {
            return showToast("Please enter a valid 14-digit FSSAI number");
        }

        setLoading(true);
        const finalData = {
            id: Providerdata.id,
            identity: { name: messName, startTime, endTime, dietaryType, operatingMode: selectedType },
            media: { coverImage: previews.cover, kitchenImage: previews.kitchen, diningImage: previews.dining },
            location: locationData,
            legal: { fssaiNumber: fssai },
            submittedAt: new Date().toISOString()
        };

        console.log("🚀 FINAL SUBMISSION DATA:", finalData);
        setTimeout(() => {
            setLoading(false);
            setIsCompleted(true);
        }, 2000);
    };

    const handleNext = () => {
        if (step === 1 && !messName.trim()) return showToast("Mess name is required");
        if (step === 2 && !previews.kitchen) return showToast("Please upload a kitchen photo");
        if (step === 3 && locationStatus !== 'confirmed') return showToast("Please detect your GPS location first");

        if (step < 4) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setStep(s => s + 1);
            }, 800);
        } else {
            handleSubmit();
        }
    };

    const prevStep = () => setStep(s => s - 1);
    const triggerUpload = (slot) => { setActiveSlot(slot); fileInputRef.current.click(); };
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

    const UpdishLoader = () => (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="relative">
                <div className="absolute -inset-4 border-2 border-dashed border-orange-200 rounded-full animate-spin-slow" />
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80" alt="Loading" className="w-full h-full object-cover animate-pulse-gentle" />
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
                <p className="text-slate-500 text-sm mb-8 leading-relaxed px-4">Great job! Our team is verifying details. Usually takes <span className="text-orange-600 font-bold">~24 hours</span>.</p>
                <div className="w-full space-y-3">
                    {[{ icon: MessageCircle, color: "text-green-600", bg: "bg-green-50", title: "WhatsApp Alert Enabled", desc: "You'll get a ping when verified" },
                    { icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50", title: "Trust Verification", desc: "Background check in progress" },
                    { icon: Clock, color: "text-orange-600", bg: "bg-orange-50", title: "Dashboard Access", desc: "You can start adding menu items now" }].map((item, idx) => (
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
                <Button onClick={() => navigate("/provider")} className="mt-10 w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-slate-800 shadow-xl active:scale-95">Go to Dashboard</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBFBFB] max-w-md mx-auto flex flex-col font-sans relative overflow-hidden">
            {loading && <UpdishLoader />}

            {toast.show && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                            <AlertCircle className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs font-bold leading-tight">{toast.message}</p>
                    </div>
                </div>
            )}

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />

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
                            <p className="text-gray-500 text-sm">Configure your mess profile and timing</p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-5">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Mess Name</label>
                                <input value={messName} onChange={(e) => setMessName(e.target.value)} className="w-full h-10 border-b border-gray-100 focus:border-orange-600 outline-none font-bold text-lg placeholder:text-gray-200" placeholder="e.g. Royal Kitchen" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase">Opening Time</label>
                                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold text-slate-700 outline-none border border-transparent focus:border-orange-200" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase">Closing Time</label>
                                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold text-slate-700 outline-none border border-transparent focus:border-orange-200" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Dietary Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Pure Veg', 'Pure Non-Veg', 'Hybrid'].map(diet => (
                                        <button key={diet} onClick={() => setDietaryType(diet)} className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider border transition-all ${dietaryType === diet ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-100' : 'bg-white border-gray-100 text-gray-400'}`}>{diet}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2 pt-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Operating Mode</label>
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
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-900">Visual Showcase</h2>
                            <p className="text-gray-500 text-sm">Upload quality photos of your space</p>
                        </div>
                        <div className="space-y-4">
                            <div onClick={() => triggerUpload('cover')} className="relative group overflow-hidden rounded-3xl border-2 border-dashed border-orange-200 bg-orange-50/30 cursor-pointer">
                                <div className="aspect-[16/9] w-full relative">
                                    <img src={previews.cover} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Cover" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <div className="bg-white/90 px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2"><Camera className="w-4 h-4 text-orange-600" /><span className="text-[10px] font-black uppercase tracking-tight">Main Thali Photo</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {['kitchen', 'dining'].map((slot) => (
                                    <div key={slot} onClick={() => triggerUpload(slot)} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-white group cursor-pointer hover:border-orange-300 transition-all">
                                        {previews[slot] ? <img src={previews[slot]} className="w-full h-full object-cover animate-in fade-in duration-300" alt={slot} /> :
                                            <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center">
                                                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-orange-50 transition-colors"><Camera className="w-5 h-5 text-slate-300 group-hover:text-orange-500" /></div>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase">{slot === 'kitchen' ? '02. KITCHEN' : '03. Dining Area'}</span>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in flex-1 flex flex-col">
                        <div className="text-center space-y-1">
                            <h2 className="text-xl font-bold text-gray-900">Service Location</h2>
                            <p className="text-xs text-gray-500 italic">Live GPS verification</p>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center">
                            {locationStatus === 'detecting' && (
                                <div className="absolute flex items-center justify-center">
                                    <div className="w-48 h-48 bg-orange-100 rounded-full animate-ping opacity-30" />
                                </div>
                            )}

                            <div className={`w-full max-w-xs bg-white p-6 rounded-[32px] border transition-all duration-500 flex flex-col items-center text-center ${locationStatus === 'confirmed' ? 'border-emerald-100 shadow-xl bg-emerald-50/20' : 'border-gray-100 shadow-sm'}`}>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${locationStatus === 'confirmed' ? 'bg-emerald-500' : 'bg-orange-50'}`}>
                                    {locationStatus === 'confirmed' ? <MapPinned className="text-white w-8 h-8" /> : <MapPin className="text-orange-600 w-8 h-8" />}
                                </div>

                                {locationStatus === 'idle' && (
                                    <>
                                        <h3 className="font-bold text-slate-900 mb-2">Enable GPS</h3>
                                        <p className="text-xs text-slate-400 mb-6 px-4">We need your current location to show your mess to nearby students.</p>
                                        <Button onClick={detectLocation} className="rounded-xl bg-slate-900 px-6 h-12 text-[10px] font-black uppercase text-white shadow-lg">Detect Location</Button>
                                    </>
                                )}

                                {locationStatus === 'detecting' && (
                                    <div className="space-y-3">
                                        <Loader2 className="w-6 h-6 text-orange-600 animate-spin mx-auto" />
                                        <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest">Fetching Coordinates...</p>
                                    </div>
                                )}

                                {locationStatus === 'confirmed' && (
                                    <div className="animate-in zoom-in-95 duration-500 w-full">
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Verified Address</span>
                                        </div>
                                        
                                        <div className="space-y-3 text-left bg-white p-4 rounded-2xl border border-emerald-100/50">
                                            <div>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase">Street / Landmark</p>
                                                <p className="text-xs font-bold text-slate-800 line-clamp-2">{locationData.address}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">City</p>
                                                    <p className="text-xs font-bold text-slate-800">{locationData.city}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Pincode</p>
                                                    <p className="text-xs font-bold text-slate-800">{locationData.postcode}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <button onClick={detectLocation} className="mt-4 text-[10px] font-bold text-orange-600 hover:underline">Incorrect? Try Again</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold">Safety & Legal</h2>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4 shadow-sm">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase">FSSAI Number</label>
                                    <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full">Mandatory</span>
                                </div>
                                <input value={fssai} onChange={(e) => setFssai(e.target.value.replace(/\D/g, ""))} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-mono font-bold tracking-widest outline-none border border-transparent focus:border-orange-200 transition-all" placeholder="14 DIGITS" maxLength={14} />
                            </div>
                        </div>
                        <div className="space-y-3 px-2">
                            {[{ icon: Check, text: "High hygiene standards maintained" }, { icon: Check, text: "Transparent pricing for students" }, { icon: Lock, text: "Data encrypted & secure" }].map((item, i) => (
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
                <Button onClick={handleNext} className={`w-full h-14 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-100`}>
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