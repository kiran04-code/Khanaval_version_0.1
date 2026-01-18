import React, { useState, useRef } from 'react';
import {
    Camera, ArrowRight, CheckCircle2,
    ChevronLeft, MapPin, ShieldCheck,
    Utensils, Smartphone, MessageCircle,
    Clock, Search, Check, Info, Lock, Loader2, Navigation,
    Image as ImageIcon, UploadCloud, X, AlertCircle, MapPinned,
    Building2, Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { UserProviderdata } from '@/hooks/Provider';
import axios from 'axios';
import { CreatemessForProvider } from '@/hooks/PorviderMess';
import { CreateMessdata, Media } from 'src1/gql/graphql';

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

    // Store URLs returned from API
    const [uploadedUrls, setUploadedUrls] = useState<Media>({ cover: "", kitchen: "", dining: "" });

    const fileInputRef = useRef(null);
    const [activeSlot, setActiveSlot] = useState(null);
    const { Providerdata } = UserProviderdata();

    // --- ENHANCED LOCATION STATE ---
    const [locationData, setLocationData] = useState({
        lat: null,
        lng: null,
        address: "",
        city: "",
        suburb: "",
        state: "",
        landmark: "",
        society: "",
        houseNo: "",
        postcode: ""
    });
    const [locationStatus, setLocationStatus] = useState('idle');
    const { mutate, isSuccess, data } = CreatemessForProvider()
    const showToast = (msg, type = "error") => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3000);
    };
    const [files, setFiles] = useState({
        cover: null,
        kitchen: null,
        dining: null
    });
    // --- NEW: IMAGE UPLOAD API CALL ---
    const uploadImages = async () => {
        if (!files.cover || !files.kitchen) return showToast("Please select all required images");
        setLoading(true);
        const formData = new FormData();
        formData.append("cover", files.cover);
        formData.append("kitchen", files.kitchen);
        if (files.dining) formData.append("dining", files.dining);

        try {
            const { data } = await axios.post("http://localhost:3003/api/provider/ImageUrl", formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );
            console.log(data)
            if (data.success) {
                setUploadedUrls(data.urls);
                setStep(3);
            }
        } catch (error) {
            console.log(error)
            showToast("Image upload failed. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const detectLocation = () => {
        if (!navigator.geolocation) return showToast("Your browser does not support GPS detection.");
        setLocationStatus('detecting');
        const options = { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.91fc812339a9eec58d906360c5be50fc&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`);
                    const data = await response.json();
                    const addr = data.address;
                    setLocationData(prev => ({
                        ...prev, lat: latitude, lng: longitude, address: data.display_name,
                        city: addr.city || addr.town || "N/A", suburb: addr.suburb || "",
                        state: addr.state, postcode: addr.postcode, landmark: addr.building || ""
                    }));
                    setLocationStatus('confirmed');
                    showToast("GPS Captured!", "success");
                } catch (err) {
                    setLocationData(prev => ({ ...prev, lat: latitude, lng: longitude }));
                    setLocationStatus('confirmed');
                }
            },
            () => { setLocationStatus('idle'); showToast("Please enable GPS permissions."); },
            options
        );
    };

    const handleNext = () => {
        if (step === 1 && !messName.trim()) return showToast("Mess name is required");
        if (step === 2) {
            if (!previews.kitchen) return showToast("Please upload a kitchen photo");
            uploadImages();
            return;
        }

        if (step === 3) {
            if (locationStatus !== 'confirmed') return showToast("Please detect location first");
            if (!locationData.society || !locationData.landmark) return showToast("Please enter Society and Landmark");
        }

        if (step < 4) {
            setStep(s => s + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        setLoading(true);
        const finalData: CreateMessdata = {
            providerId: Providerdata?.id,
            identity: { name: messName, startTime, endTime, dietaryType, operatingMode: selectedType },
            media: uploadedUrls,
            location: locationData,
            legal: { fssaiNumber: fssai },

        };
        console.log("🚀 SUBMISSION:", finalData);
        mutate(finalData, {
            onSuccess: () => {
                if (isSuccess) {
                    showToast("Mess is Created Please Wait for Verification in Profile");
                }
            }
        })
        setTimeout(() => { setLoading(false); setIsCompleted(true); }, 2000);
    };

    const prevStep = () => setStep(s => s - 1);
    const triggerUpload = (slot) => { setActiveSlot(slot); fileInputRef.current.click(); };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFiles(prev => ({ ...prev, [activeSlot]: file }));
        const reader = new FileReader();
        reader.onloadend = () => setPreviews(prev => ({ ...prev, [activeSlot]: reader.result }));
        reader.readAsDataURL(file);
        e.target.value = "";
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
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4">
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

            <main className="flex-1 p-6 flex flex-col overflow-y-auto">
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="space-y-1">
                            <h1 className="text-xl font-bold text-gray-900">Kitchen Identity</h1>
                            <p className="text-gray-500 text-sm">Configure your mess profile</p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-5">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Mess Name</label>
                                <input value={messName} onChange={(e) => setMessName(e.target.value)} className="w-full h-10 border-b border-gray-100 focus:border-orange-600 outline-none font-bold text-lg" placeholder="e.g. Royal Kitchen" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase">Opening</label>
                                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase">Closing</label>
                                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Dietary Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Pure Veg', 'Pure Non-Veg', 'Hybrid'].map(diet => (
                                        <button key={diet} onClick={() => setDietaryType(diet)} className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider border transition-all ${dietaryType === diet ? 'bg-orange-600 border-orange-600 text-white' : 'bg-white text-gray-400'}`}>{diet}</button>
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
                            <p className="text-gray-500 text-sm">Upload quality photos</p>
                        </div>
                        <div className="space-y-4">
                            <div onClick={() => triggerUpload('cover')} className="relative group overflow-hidden rounded-3xl border-2 border-dashed border-orange-200 cursor-pointer">
                                <div className="aspect-[16/9] w-full relative">
                                    <img src={previews.cover} className="w-full h-full object-cover" alt="Cover" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <div className="bg-white/90 px-4 py-2 rounded-2xl flex items-center gap-2"><Camera className="w-4 h-4 text-orange-600" /><span className="text-[10px] font-black uppercase">Main Thali Photo</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {['kitchen', 'dining'].map((slot) => (
                                    <div key={slot} onClick={() => triggerUpload(slot)} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer">
                                        {previews[slot] ? <img src={previews[slot]} className="w-full h-full object-cover absolute inset-0" alt={slot} /> :
                                            <>
                                                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center"><Camera className="w-5 h-5 text-slate-300" /></div>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase">{slot}</span>
                                            </>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="text-center space-y-1">
                            <h2 className="text-xl font-bold text-gray-900">Service Location</h2>
                            <p className="text-xs text-gray-500 italic">GPS & Building Details</p>
                        </div>

                        {locationStatus !== 'confirmed' ? (
                            <div className="flex flex-col items-center py-10 space-y-6">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${locationStatus === 'detecting' ? 'bg-orange-100 animate-pulse' : 'bg-orange-50'}`}>
                                    <MapPin className="text-orange-600 w-10 h-10" />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-slate-900">Enable Mess GPS</h3>
                                    <p className="text-xs text-slate-400 mt-2 px-8">We use GPS to show your mess to students nearby.</p>
                                </div>
                                <Button onClick={detectLocation} disabled={locationStatus === 'detecting'} className="rounded-xl bg-slate-900 px-8 h-12 text-[10px] font-black uppercase text-white shadow-lg">
                                    {locationStatus === 'detecting' ? <Loader2 className="animate-spin w-4 h-4" /> : "Verify Location"}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in slide-in-from-bottom-4">
                                <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-100">
                                        <MapPinned className="text-white w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">GPS Verified</p>
                                        <p className="text-[11px] text-slate-600 truncate font-medium">{locationData.address}</p>
                                    </div>
                                    <button onClick={detectLocation} className="text-[10px] font-bold text-orange-600 bg-white px-2 py-1 rounded-lg border border-orange-100">Retry</button>
                                </div>

                                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2">
                                            <Building2 className="w-3 h-3" /> Society / Building Name
                                        </label>
                                        <input value={locationData.society} onChange={(e) => setLocationData({ ...locationData, society: e.target.value })} className="w-full h-10 border-b border-gray-100 focus:border-orange-600 outline-none font-bold text-sm" placeholder="e.g. Gokuldham Society" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2">
                                                <Hash className="w-3 h-3" /> House/Shop No
                                            </label>
                                            <input value={locationData.houseNo} onChange={(e) => setLocationData({ ...locationData, houseNo: e.target.value })} className="w-full h-10 border-b border-gray-100 focus:border-orange-600 outline-none font-bold text-sm" placeholder="e.g. A-101" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2">
                                                <Navigation className="w-3 h-3" /> Landmark
                                            </label>
                                            <input value={locationData.landmark} onChange={(e) => setLocationData({ ...locationData, landmark: e.target.value })} className="w-full h-10 border-b border-gray-100 focus:border-orange-600 outline-none font-bold text-sm" placeholder="e.g. Near Metro Station" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div><p className="text-[9px] font-bold text-slate-400 uppercase">Area</p><p className="text-xs font-bold text-slate-700">{locationData.suburb || "Local"}</p></div>
                                        <div><p className="text-[9px] font-bold text-slate-400 uppercase">City</p><p className="text-xs font-bold text-slate-700">{locationData.city}</p></div>
                                    </div>
                                </div>
                            </div>
                        )}
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
                <Button onClick={handleNext} className="w-full h-14 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 bg-orange-600 shadow-xl shadow-orange-100">
                    {step === 4 ? 'Complete' : 'Continue'}
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