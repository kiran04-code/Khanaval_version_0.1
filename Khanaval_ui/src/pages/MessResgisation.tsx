import React, { useState, useRef, useEffect } from 'react';
import {
    Camera, ArrowRight, CheckCircle2,
    ChevronLeft, MapPin, ShieldCheck,
    Utensils, Smartphone, MessageCircle,
    Clock, Search, Check, Info, Lock, Loader2, Navigation,
    Image as ImageIcon, UploadCloud, X, AlertCircle, MapPinned,
    Building2, Hash, Languages, PhoneCall
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { Button } from "@/components/ui/button";
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { UserProviderdata } from '@/hooks/Provider';
import axios from 'axios';
import { CreatemessForProvider } from '@/hooks/PorviderMess';

// --- TRANSLATION CONTENT ---
const content = {
    en: {
        step: "Step",
        of: "of",
        syncing: "Syncing Kitchen Data",
        underReview: "Under Review",
        reviewTime: "Usually takes ~24 hours",
        dashboard: "Go to Dashboard",
        identity: "Kitchen Identity",
        messName: "Mess Name",
        visuals: "Visual Showcase",
        location: "Service Location",
        verifyLoc: "Verify My Location",
        detectedAddr: "Detected Address",
        verification: "For Verification",
        mobile: "Mobile Number",
        complete: "Complete Registration",
        continue: "Continue",
        contactSupport: "Need help? Contact Support",
        opens: "Opens at",
        closes: "Closes at"
    },
    hi: {
        step: "चरण",
        of: "का",
        syncing: "किचन डेटा सिंक हो रहा है",
        underReview: "समीक्षा के अधीन",
        reviewTime: "आमतौर पर ~24 घंटे लगते हैं",
        dashboard: "डैशबोर्ड पर जाएं",
        identity: "किचन की पहचान",
        messName: "मेस का नाम",
        visuals: "किचन की तस्वीरें",
        location: "सेवा का स्थान",
        verifyLoc: "मेरा स्थान सत्यापित करें",
        detectedAddr: "पता मिल गया",
        verification: "सत्यापन के लिए",
        mobile: "मोबाइल नंबर",
        complete: "पंजीकरण पूरा करें",
        continue: "आगे बढ़ें",
        contactSupport: "मदद चाहिए? सहायता से संपर्क करें",
        opens: "खुलने का समय",
        closes: "बंद होने का समय"
    }
};

const format12h = (time24) => {
    const [hrs, mins] = time24.split(':');
    const h = parseInt(hrs);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const displayHrs = h % 12 || 12;
    return `${displayHrs}:${mins} ${suffix}`;
};

export default function UpdishOnboarding() {
    const [lang, setLang] = useState('en');
    const t = content[lang];

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();

    const [messName, setMessName] = useState("");
    const [startTime, setStartTime] = useState("08:00");
    const [endTime, setEndTime] = useState("20:00");
    const [dietaryType, setDietaryType] = useState('Pure Veg');
    const [selectedType, setSelectedType] = useState('Home-made');
    const [fssai, setFssai] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "error" });

    const [previews, setPreviews] = useState({
        cover: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop",
        kitchen: null,
        dining: null
    });

    const [uploadedUrls, setUploadedUrls] = useState({ cover: "", kitchen: "", dining: "" });
    const fileInputRef = useRef(null);
    const [activeSlot, setActiveSlot] = useState(null);
    const { Providerdata } = UserProviderdata();

    const [locationData, setLocationData] = useState({
        lat: null, lng: null, address: "", city: "", suburb: "",
        state: "", landmark: "", society: "", houseNo: "", postcode: ""
    });
    const [locationStatus, setLocationStatus] = useState('idle');

    const { mutate } = CreatemessForProvider();
    const [files, setFiles] = useState({ cover: null, kitchen: null, dining: null });

    const showToast = (msg, type = "error") => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3000);
    };

    const uploadImages = async () => {
        if (!files.cover || !files.kitchen) return showToast("Please select all required images");
        setLoading(true);
        const formData = new FormData();
        if (files.cover) formData.append("cover", files.cover);
        if (files.kitchen) formData.append("kitchen", files.kitchen);
        if (files.dining) formData.append("dining", files.dining);

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/provider/ImageUrl`, formData);
            if (data.success) {
                setUploadedUrls(data.urls);
                setStep(3);
            }
        } catch (error) {
            showToast("Image Size is To Much. Please Compress Image or Upload low Quality Image");
        } finally {
            setLoading(false);
        }
    };

    const detectLocation = () => {
        if (!navigator.geolocation) return showToast("GPS not supported.");
        setLocationStatus('detecting');
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
                    setLocationStatus('confirmed');
                }
            },
            () => { setLocationStatus('idle'); showToast("Please enable GPS permissions."); }
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
        if (step === 4) {
            if (fssai.length !== 10) return showToast("Please enter a valid 10-digit number");
            handleSubmit();
            return;
        }
        setStep(s => s + 1);
    };

    const handleSubmit = () => {
        setLoading(true);
        const finalData = {
            providerId: Providerdata?.id,
            identity: { name: messName, startTime, endTime, dietaryType, operatingMode: selectedType },
            media: uploadedUrls,
            location: locationData,
            legal: { fssaiNumber: fssai },
        };

        mutate(finalData, {
            onSuccess: () => {
                setLoading(false);
                setIsCompleted(true);
            },
            onError: () => {
                setLoading(false);
                showToast("Submission failed. Try again.");
            }
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !activeSlot) return;
        if (
            file.type.includes("heic") ||
            file.type.includes("heif") ||
            file.name.toLowerCase().endsWith(".heic")
        ) {
            showToast("HEIC images not supported. Convert to JPG.");
            return;
        }
        try {
            setLoading(true);
            if (file.size / 1024 / 1024 > 25) {
                showToast("Image too large. Max 25MB allowed.");
                return;
            } 
            const img = new Image();
            img.src = URL.createObjectURL(file);
            await new Promise(res => (img.onload = res));
            const mp = (img.width * img.height) / 1_000_000;
            if (mp > 25) {
                showToast("Image resolution too high. Choose a smaller image.");
                return;
            }

            const compressed = await imageCompression(file, {
                maxSizeMB: 4,
                maxWidthOrHeight: 3000,
                initialQuality: 0.8,
                useWebWorker: true,
            });

            const finalFile = new File(
                [compressed],
                file.name.replace(/\..+$/, ".jpg"),
                { type: "image/jpeg" }
            );

            setFiles(prev => ({ ...prev, [activeSlot]: finalFile }));
            setPreviews(prev => ({
                ...prev,
                [activeSlot]: URL.createObjectURL(finalFile),
            }));

        } catch (error) {
            console.error("Image compression error:", error);
            showToast("Error processing image");
        } finally {
            setLoading(false);
        }
    };

    const UpdishLoader = () => (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="relative">
                <div className="absolute -inset-6 border-4 border-t-orange-500 border-orange-100 rounded-full animate-spin" />
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img src="https://t4.ftcdn.net/jpg/05/84/82/17/240_F_584821767_Fuj7FSi7FO2sXcpExFSkb2BUI4oD1r9z.jpg" className="w-full h-full object-cover" />
                </div>
            </div>
            <h3 className="mt-10 font-black text-slate-900 text-lg tracking-tight">{t.syncing}</h3>
            <div className="mt-2 flex gap-1">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>
        </div>
    );

    if (isCompleted) {
        return (
            <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl mb-6 animate-bounce">
                    <Check className="w-10 h-10 text-white stroke-[3px]" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">{t.underReview}</h2>
                <p className="text-slate-500 text-sm mb-8">{t.reviewTime}</p>
                <Button onClick={() => navigate("/provider")} className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black">{t.dashboard}</Button>
            </div>
        );
    }

    if (Providerdata?.MessRegister === "true" || !Providerdata) {
        return <Navigate to="/provider" replace />;
    }

    return (
        <div className="min-h-screen bg-[#FBFBFB] max-w-md mx-auto flex flex-col font-sans relative overflow-hidden">
            {loading && <UpdishLoader />}

            <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="fixed top-20 right-4 z-40 bg-white shadow-md p-2 rounded-full border border-gray-100 flex items-center gap-1"
            >
                <Languages className="w-4 h-4 text-orange-600" />
                <span className="text-[10px] font-bold">{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {toast.show && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm">
                    <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        <p className="text-xs font-bold">{toast.message}</p>
                    </div>
                </div>
            )}

            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />

            <nav className="p-4 flex items-center bg-white border-b border-gray-100">
                <button onClick={() => setStep(s => s - 1)} className={`p-2 ${step === 1 ? 'invisible' : ''}`}>
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex-1 text-center">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">{t.step} {step} {t.of} 4</span>
                </div>
                <div className="w-10" />
            </nav>

            <div className="w-full h-1 bg-gray-100">
                <div className="h-full bg-orange-600 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
            </div>

            <main className="flex-1 p-6 flex flex-col overflow-y-auto pb-32">
                {step === 1 && (
                    <div className="space-y-6">
                        <h1 className="text-xl font-bold">{t.identity}</h1>
                        <div className="bg-white p-5 rounded-3xl border border-gray-100 space-y-5 shadow-sm">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">{t.messName}</label>
                                <input value={messName} onChange={(e) => setMessName(e.target.value)} className="w-full h-10 border-b outline-none font-bold text-lg focus:border-orange-500 transition-colors" placeholder="e.g. Royal Kitchen" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400">{t.opens}</span>
                                    <div className="relative">
                                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold text-sm appearance-none" />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                                            {format12h(startTime)}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400">{t.closes}</span>
                                    <div className="relative">
                                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold text-sm appearance-none" />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                                            {format12h(endTime)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {['Pure Veg', 'Pure Non-Veg', 'Hybrid'].map(diet => (
                                    <button key={diet} onClick={() => setDietaryType(diet)} className={`px-4 py-2 rounded-full text-[11px] font-black border transition-all ${dietaryType === diet ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-gray-400'}`}>{diet}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">{t.visuals}</h2>
                        <div className="space-y-4">
                            <div onClick={() => { setActiveSlot('cover'); fileInputRef.current.click(); }} className="relative aspect-[16/9] rounded-3xl overflow-hidden border-2 border-dashed border-orange-200 cursor-pointer">
                                <img src={previews.cover} className="w-full h-full object-cover" alt="Cover" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="bg-white/90 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg"><Camera className="w-4 h-4 text-orange-600" /><span className="text-[10px] font-black">UPLOAD COVER</span></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {['kitchen', 'dining'].map((slot) => (
                                    <div key={slot} onClick={() => { setActiveSlot(slot); fileInputRef.current.click(); }} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center cursor-pointer shadow-sm">
                                        {previews[slot] ? <img src={previews[slot]} className="w-full h-full object-cover absolute inset-0" /> : <Camera className="w-6 h-6 text-slate-300" />}
                                        <span className="text-[9px] font-bold text-slate-400 mt-2">{slot.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-extrabold text-slate-900">{t.location}</h2>
                        </div>
                        {locationStatus !== 'confirmed' ? (
                            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                                <MapPin className="text-orange-600 w-12 h-12 mb-4" />
                                <Button onClick={detectLocation} className="w-full bg-slate-900 text-white rounded-2xl py-6">{t.verifyLoc}</Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                                    <p className="text-[10px] uppercase font-bold text-emerald-700">{t.detectedAddr}</p>
                                    <p className="text-sm text-slate-700">{locationData.address}</p>
                                </div>
                                <input placeholder="Society / Building Name" value={locationData.society} onChange={(e) => setLocationData({ ...locationData, society: e.target.value })} className="w-full p-4 bg-white border rounded-xl outline-none focus:border-orange-500" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="House No" value={locationData.houseNo} onChange={(e) => setLocationData({ ...locationData, houseNo: e.target.value })} className="w-full p-4 bg-white border rounded-xl outline-none" />
                                    <input placeholder="Landmark" value={locationData.landmark} onChange={(e) => setLocationData({ ...locationData, landmark: e.target.value })} className="w-full p-4 bg-white border rounded-xl outline-none" />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">{t.verification}</h2>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4 shadow-sm">
                            <label className="text-[11px] font-bold text-gray-400 uppercase">{t.mobile}</label>
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border focus-within:border-orange-500">
                                <span className="font-bold text-gray-400">+91</span>
                                <input
                                    value={fssai}
                                    onChange={(e) => setFssai(e.target.value.replace(/\D/g, ""))}
                                    className="bg-transparent outline-none font-bold text-lg w-full"
                                    placeholder="00000 00000"
                                    maxLength={10}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t space-y-4">
                <div className="flex justify-center">
                    <button
                        onClick={() => window.open('tel:1234567890')}
                        className="flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors"
                    >
                        <PhoneCall className="w-4 h-4" />
                        <span className="text-[11px] font-bold underline underline-offset-4">{t.contactSupport}</span>
                    </button>
                </div>

                <Button
                    onClick={handleNext}
                    className={`w-full h-14 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95 ${step === 4 && fssai.length !== 10 ? 'bg-gray-400' : 'bg-orange-600'}`}
                >
                    {step === 4 ? t.complete : t.continue}
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </footer>
        </div>
    );
}