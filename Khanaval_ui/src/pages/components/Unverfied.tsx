import { Getmymess } from '@/hooks/PorviderMess';
import React, { useState, useEffect } from 'react';
import {
    Utensils, Clock, MapPin, CheckCircle2,
    Timer, Eye, RefreshCw, PhoneCall,
    Info, MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Unverified = () => {
    const { messdata } = Getmymess();
    const [showReload, setShowReload] = useState(false);
    const SUPPORT_NUMBER = "8788113738";

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowReload(true);
        }, 8000);
        return () => clearTimeout(timer);
    }, []);

    const steps = [
        { label: "Profile Created", status: "complete" },
        { label: "Document Review", status: "current" },
        { label: "Final Approval", status: "pending" }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center font-sans selection:bg-orange-100">
            
            {/* Main Scrollable Content */}
            <main className="w-full max-w-md p-4 pb-40">
                
                {/* Top Status Banner */}
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 mb-6 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="bg-orange-500 rounded-full p-1.5">
                        <Info className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-[10px] font-bold text-orange-800 uppercase tracking-tight">
                        Our team is currently reviewing your documents
                    </p>
                </div>

                {/* Main Header Section */}
                <div className="text-center space-y-5 mb-8">
                    <div className="relative mx-auto w-24 h-24">
                        <div className="absolute inset-0 bg-orange-400/20 rounded-[2.5rem] animate-pulse" />
                        <div className="relative w-24 h-24 bg-white rounded-[2rem] shadow-2xl shadow-orange-200/50 flex items-center justify-center border border-white">
                            <Clock className="w-10 h-10 text-orange-500 animate-[spin_10s_linear_infinite]" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Verification Pending</h1>
                        <p className="text-slate-500 text-xs px-6 leading-relaxed">
                            The mess <span className="text-slate-900 font-bold">"{messdata?.identity?.name}"</span> is under review. You'll get full access once verified.
                        </p>
                    </div>
                </div>

                {/* Verification Timeline */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
                    <div className="flex justify-between relative">
                        <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 -z-0" />
                        {steps.map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#F8FAFC] ${
                                    step.status === 'complete' ? 'bg-emerald-500' : 
                                    step.status === 'current' ? 'bg-orange-500 animate-pulse' : 'bg-slate-200'
                                }`}>
                                    {step.status === 'complete' && <CheckCircle2 className="w-4 h-4 text-white" />}
                                    {step.status === 'current' && <RefreshCw className="w-3 h-3 text-white animate-spin" />}
                                </div>
                                <span className={`text-[9px] font-black uppercase ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Identity Info */}
                    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Utensils className="w-4 h-4 text-orange-500" />
                                <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Kitchen Profile</h2>
                            </div>
                            <Badge className="bg-slate-100 text-slate-500 border-none text-[8px] font-bold uppercase tracking-tighter">Draft Mode</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Operation</p>
                                <p className="text-sm font-black text-slate-800">{messdata?.identity?.operatingMode}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Food Type</p>
                                <p className="text-sm font-black text-slate-800">{messdata?.identity?.dietaryType}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <Timer className="w-4 h-4 text-orange-500" />
                            <p className="text-xs font-black text-slate-700 uppercase tracking-tight">
                                {messdata?.identity?.startTime} <span className="text-slate-300 mx-1">—</span> {messdata?.identity?.endTime}
                            </p>
                        </div>
                    </div>

                    {/* Media Gallery Preview */}
                    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4">
                            <Eye className="w-4 h-4 text-orange-500" />
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Uploaded Photos</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {['cover', 'kitchen', 'dining'].map((type) => (
                                <div key={type} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                                    <img 
                                        src={messdata?.media?.[type]} 
                                        alt={type} 
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compact Location */}
                    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                                <MapPin className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-black text-slate-900 leading-none capitalize">{messdata?.location?.society}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-tight">{messdata?.location?.address}</p>
                                <p className="text-[10px] font-black text-orange-600 uppercase pt-1">{messdata?.location?.city}, {messdata?.location?.postcode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* --- FIXED BOTTOM ACTION DOCK --- */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
                <div className="max-w-md mx-auto space-y-4">
                    {showReload ? (
                        <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-6 duration-500">
                            {/* Primary Call Action */}
                            <a 
                                href={`tel:${SUPPORT_NUMBER}`} 
                                className="bg-orange-600 hover:bg-orange-700 text-white h-16 rounded-2xl shadow-lg shadow-orange-200 flex flex-col items-center justify-center transition-all active:scale-95 group"
                            >
                                <div className="flex items-center gap-2">
                                    <PhoneCall className="w-4 h-4 fill-white/20" />
                                    <span className="text-[11px] font-black uppercase tracking-wider">Call Admin</span>
                                </div>
                                <span className="text-[10px] font-medium opacity-80 mt-0.5">{SUPPORT_NUMBER}</span>
                            </a>

                            {/* Secondary Refresh Action */}
                            <button 
                                onClick={() => window.location.reload()}
                                className="bg-white border-2 border-slate-100 text-slate-700 h-16 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 hover:border-orange-200 group shadow-sm"
                            >
                                <RefreshCw className="w-4 h-4 text-orange-500 group-hover:rotate-180 transition-transform duration-500" />
                                <span className="text-[11px] font-black uppercase tracking-wider">Refresh</span>
                            </button>
                        </div>
                    ) : (
                        <div className="h-16 flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <div className="flex items-center gap-3">
                                <RefreshCw className="w-3 h-3 text-orange-500 animate-spin" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verifying Documents...</span>
                            </div>
                        </div>
                    )}

                    {/* WhatsApp Support Link */}
                    <div className="flex justify-center">
                        <a 
                            href={`https://wa.me/91${SUPPORT_NUMBER}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors py-1"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest border-b border-slate-200">Chat with Support</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Unverified;