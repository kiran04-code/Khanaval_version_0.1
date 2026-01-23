import { Getmymess } from '@/hooks/PorviderMess';
import React, { useState, useEffect } from 'react'
import {
  Utensils,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Home,
  Building2,
  Timer,
  Eye,
  RefreshCw,
  PhoneCall
} from "lucide-react";

const Unverfied = () => {
    const { messdata } = Getmymess()
    const [showReload, setShowReload] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowReload(true);
        }, 10000); // Trigger after 10 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-4 pb-12 font-sans">
            
            {/* Action Bar at Top */}
            {showReload && (
                <div className="w-full max-w-md grid grid-cols-2 gap-2 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
                    {/* Call Button - Opens Dialer */}
                    <a 
                        href="tel:8788113738" 
                        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-2xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        <PhoneCall className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-tight">Call Support</span>
                    </a>

                    {/* Reload Button */}
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-white border border-slate-200 text-slate-700 p-3 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        <RefreshCw className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-black uppercase tracking-tight text-slate-500">Reload</span>
                    </button>
                </div>
            )}

            <div className="w-full max-w-md mt-4 mb-6 text-center space-y-4">
                <div className="relative mx-auto w-20 h-20">
                    <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-25" />
                    <div className="relative w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-orange-50">
                        <Clock className="w-10 h-10 text-orange-500" />
                    </div>
                </div>
                <div className="space-y-1">
                    <h1 className="text-xl font-black text-slate-900">Under Verification</h1>
                    <p className="text-slate-500 text-xs leading-relaxed">
                        Your mess <span className="text-orange-600 font-bold">"{messdata?.identity?.name}"</span> is being reviewed. 
                        Usually takes within 24 hours.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-md space-y-4">
                {/* Kitchen Identity Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
                        <Utensils className="w-4 h-4 text-orange-500" />
                        <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Kitchen Identity</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Operating Mode</p>
                            <p className="text-sm font-bold text-slate-800">{messdata?.identity?.operatingMode}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Dietary Type</p>
                            <p className="text-sm font-bold text-slate-800">{messdata?.identity?.dietaryType}</p>
                        </div>
                        <div className="col-span-2 flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                            <Timer className="w-4 h-4 text-slate-400" />
                            <p className="text-xs font-bold text-slate-700">
                                {messdata?.identity?.startTime} — {messdata?.identity?.endTime}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Media Showcase Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
                        <Eye className="w-4 h-4 text-orange-500" />
                        <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Media Showcase</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {['cover', 'kitchen', 'dining'].map((type) => (
                            <div key={type} className="space-y-1">
                                <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                    <img 
                                        src={messdata?.media?.[type]} 
                                        alt={type} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-[8px] font-black uppercase text-center text-slate-400">{type}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location Details Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Location Details</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                <Building2 className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Society / Landmark</p>
                                <p className="text-sm font-bold text-slate-800">{messdata?.location?.society}</p>
                                <p className="text-xs text-slate-500">{messdata?.location?.landmark}</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                <Home className="w-4 h-4 text-slate-400" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Address</p>
                                <p className="text-[11px] font-medium text-slate-600 leading-tight">
                                    {messdata?.location?.houseNo}, {messdata?.location?.address}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                            <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">City</p>
                                <p className="text-xs font-bold text-slate-700">{messdata?.location?.city}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Pincode</p>
                                <p className="text-xs font-bold text-slate-700">{messdata?.location?.postcode}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FSSAI Footer Card */}
                <div className="bg-slate-900 rounded-3xl p-5 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">FSSAI License</p>
                                <p className="text-sm font-mono font-bold text-white tracking-widest">
                                    {messdata?.legal?.fssaiNumber}
                                </p>
                            </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Unverfied;