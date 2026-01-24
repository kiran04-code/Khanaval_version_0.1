import React, { useState, useRef, useEffect } from 'react';
import {
    Camera, ArrowRight, CheckCircle2,
    ChevronLeft, MapPin, ShieldCheck,
    Utensils, Smartphone, MessageCircle,
    Clock, Search, Check, Info, Lock, Loader2, Navigation,
    Image as ImageIcon, UploadCloud, X, AlertCircle, MapPinned,
    Building2, Hash
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { UserProviderdata } from '@/hooks/Provider';
import axios from 'axios';
import { CreatemessForProvider } from '@/hooks/PorviderMess';

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

    const [uploadedUrls, setUploadedUrls] = useState({ cover: "", kitchen: "", dining: "" });
    const fileInputRef = useRef(null);
    const [activeSlot, setActiveSlot] = useState(null);
    const { Providerdata } = UserProviderdata();

    // --- LOCATION STATE ---
    const [locationData, setLocationData] = useState({
        lat: null, lng: null, address: "", city: "", suburb: "",
        state: "", landmark: "", society: "", houseNo: "", postcode: ""
    });
    const [locationStatus, setLocationStatus] = useState('idle');

    const { mutate, isSuccess } = CreatemessForProvider();

    const [files, setFiles] = useState({ cover: null, kitchen: null, dining: null });

    const showToast = (msg, type = "error") => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3000);
    };

    // Helper to cleanup object URLs to prevent memory leaks on mobile
    useEffect(() => {
        return () => {
            if (previews.kitchen && previews.kitchen.startsWith('blob:')) URL.revokeObjectURL(previews.kitchen);
            if (previews.dining && previews.dining.startsWith('blob:')) URL.revokeObjectURL(previews.dining);
        };
    }, [previews.kitchen, previews.dining]);

    const uploadImages = async () => {
        if (!files.cover || !files.kitchen) return showToast("Please select all required images");
        setLoading(true);
        const formData = new FormData();
        // Use the actual file objects from 'files' state
        if (files.cover) formData.append("cover", files.cover);
        if (files.kitchen) formData.append("kitchen", files.kitchen);
        if (files.dining) formData.append("dining", files.dining);

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/provider/ImageUrl`, formData,);
            console.log("you image data", data)
            if (data.success) {
                setUploadedUrls(data.urls);
                setStep(3);
            }
        } catch (error) {
            console.error(error);
            showToast("Mobile upload failed. Check file size or internet.");
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
            // STRICT FSSAI VALIDATION
            if (!fssai || fssai.length !== 10) {
                return showToast("Please enter a valid number");
            }
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
                showToast("Mess Created Successfully!", "success");
            },
            onError: () => {
                setLoading(false);
                showToast("Submission failed. Try again.");
            }
        });
    };

    const triggerUpload = (slot) => {
        setActiveSlot(slot);
        fileInputRef.current.click();
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const options = {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        if (file.size > 10 * 1024 * 1024) {
            return showToast("Image is too large. Max 10MB allowed.");
        }
        setFiles(prev => ({ ...prev, [activeSlot]: compressedFile }));
        const objectUrl = URL.createObjectURL(compressedFile);
        setPreviews(prev => ({ ...prev, [activeSlot]: objectUrl }));
    };

    const UpdishLoader = () => (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="relative">
                <div className="absolute -inset-4 border-2 border-dashed border-orange-200 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300" alt="Loading" className="w-full h-full object-cover" />
                </div>
            </div>
            <h3 className="mt-8 font-bold text-slate-900">Syncing Kitchen Data</h3>
        </div>
    );

    if (isCompleted) {
        return (
            <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl mb-6">
                    <Check className="w-10 h-10 text-white stroke-[3px]" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Under Review</h2>
                <p className="text-slate-500 text-sm mb-8">Usually takes <span className="text-orange-600 font-bold">~24 hours</span>.</p>
                <Button onClick={() => navigate("/provider")} className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black">Go to Dashboard</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBFBFB] max-w-md mx-auto flex flex-col font-sans relative overflow-hidden">
            {loading && <UpdishLoader />}

            {toast.show && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm">
                    <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        <p className="text-xs font-bold">{toast.message}</p>
                    </div>
                </div>
            )}

            {/* Hidden Input - optimized for mobile */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
            />

            <nav className="p-4 flex items-center bg-white border-b border-gray-100">
                <button onClick={() => setStep(s => s - 1)} className={`p-2 ${step === 1 ? 'invisible' : ''}`}>
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex-1 text-center">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Step {step} of 4</span>
                </div>
                <div className="w-10" />
            </nav>

            <div className="w-full h-1 bg-gray-100">
                <div className="h-full bg-orange-600 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
            </div>

            <main className="flex-1 p-6 flex flex-col overflow-y-auto">
                {step === 1 && (
                    <div className="space-y-6">
                        <h1 className="text-xl font-bold">Kitchen Identity</h1>
                        <div className="bg-white p-5 rounded-3xl border border-gray-100 space-y-5">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Mess Name</label>
                                <input value={messName} onChange={(e) => setMessName(e.target.value)} className="w-full h-10 border-b outline-none font-bold text-lg" placeholder="e.g. Royal Kitchen" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold" />
                                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Pure Veg', 'Pure Non-Veg', 'Hybrid'].map(diet => (
                                    <button key={diet} onClick={() => setDietaryType(diet)} className={`px-4 py-2 rounded-full text-[11px] font-black border ${dietaryType === diet ? 'bg-orange-600 text-white' : 'bg-white text-gray-400'}`}>{diet}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">Visual Showcase</h2>
                        <div className="space-y-4">
                            <div onClick={() => triggerUpload('cover')} className="relative aspect-[16/9] rounded-3xl overflow-hidden border-2 border-dashed border-orange-200 cursor-pointer">
                                <img src={previews.cover} className="w-full h-full object-cover" alt="Cover" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="bg-white/90 px-4 py-2 rounded-2xl flex items-center gap-2"><Camera className="w-4 h-4 text-orange-600" /><span className="text-[10px] font-black">UPLOAD COVER</span></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {['kitchen', 'dining'].map((slot) => (
                                    <div key={slot} onClick={() => triggerUpload(slot)} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center cursor-pointer">
                                        {previews[slot] ? <img src={previews[slot]} className="w-full h-full object-cover absolute inset-0" /> : <Camera className="w-6 h-6 text-slate-300" />}
                                        <span className="text-[9px] font-bold text-slate-400 mt-2">{slot.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-extrabold text-slate-900">Service Location</h2>
                            <p className="text-slate-500 text-sm">Where should our technician arrive?</p>
                        </div>

                        {locationStatus !== 'confirmed' ? (
                            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                                <div className="bg-orange-100 p-4 rounded-full mb-4">
                                    <MapPin className="text-orange-600 w-8 h-8" />
                                </div>
                                <p className="text-slate-600 text-sm mb-6 text-center">We need your GPS coordinates to ensure accurate service.</p>
                                <Button
                                    onClick={detectLocation}
                                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-10 py-6 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                >
                                    Verify My Location
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Address Card */}
                                <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                                    <div className="mt-1 bg-emerald-500 rounded-full p-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-700">Detected Address</p>
                                        <p className="text-sm text-slate-700 leading-relaxed">{locationData.address}</p>
                                    </div>
                                </div>

                                {/* Manual Inputs */}
                                <div className="bg-white p-2 space-y-1">
                                    <div className="group border-b border-slate-200 focus-within:border-orange-500 transition-colors py-2">
                                        <label className="block text-[10px] uppercase font-bold text-slate-400 group-focus-within:text-orange-600">Society / Building Name</label>
                                        <input
                                            value={locationData.society}
                                            onChange={(e) => setLocationData({ ...locationData, society: e.target.value })}
                                            className="w-full bg-transparent outline-none font-medium text-slate-900 placeholder:text-slate-300"
                                            placeholder="e.g. Green Valley Apartments"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 pt-2">
                                        <div className="group border-b border-slate-200 focus-within:border-orange-500 transition-colors py-2">
                                            <label className="block text-[10px] uppercase font-bold text-slate-400 group-focus-within:text-orange-600">House/Shop No</label>
                                            <input
                                                value={locationData.houseNo}
                                                onChange={(e) => setLocationData({ ...locationData, houseNo: e.target.value })}
                                                className="w-full bg-transparent outline-none font-medium text-slate-900 placeholder:text-slate-300"
                                                placeholder="A-102"
                                            />
                                        </div>
                                        <div className="group border-b border-slate-200 focus-within:border-orange-500 transition-colors py-2">
                                            <label className="block text-[10px] uppercase font-bold text-slate-400 group-focus-within:text-orange-600">Landmark</label>
                                            <input
                                                value={locationData.landmark}
                                                onChange={(e) => setLocationData({ ...locationData, landmark: e.target.value })}
                                                className="w-full bg-transparent outline-none font-medium text-slate-900 placeholder:text-slate-300"
                                                placeholder="Near Metro Station"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">For Verification</h2>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4 shadow-sm">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase">Mobile Number</label>
                                    <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full">Required</span>
                                </div>
                                <input
                                    value={fssai}
                                    onChange={(e) => setFssai(e.target.value.replace(/\D/g, ""))}
                                    className="w-full h-12 bg-gray-50 rounded-xl px-4 font-mono font-bold tracking-widest outline-none border border-transparent focus:border-orange-200"
                                    placeholder="Mobile Number"
                                    maxLength={10}
                                />
                                {fssai.length > 0 && fssai.length < 10 && (
                                    <p className="text-[10px] text-red-500 font-medium">Needs {10 - fssai.length} more digits</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="p-6 bg-white border-t">
                <Button
                    onClick={handleNext}
                    className={`w-full h-14 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl ${step === 4 && fssai.length !== 14 ? 'bg-gray-400' : 'bg-orange-600'}`}
                >
                    {step === 4 ? 'Complete Registration' : 'Continue'}
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </footer>
        </div>
    );
}