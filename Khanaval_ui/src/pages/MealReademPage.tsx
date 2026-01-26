import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Utensils, CheckCircle2, XCircle, ArrowLeft,
    Loader2, ShieldCheck, ChevronRight, Info,
    Zap, IndianRupee, AlertCircle
} from "lucide-react";
import { useCurrentUser } from "@/hooks/user-hook";
import { useStateContex } from "@/context/State";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function MealRedeemPage() {
    const { scanMessId } = useParams();
    const { user } = useCurrentUser();
    const { axioseInstace } = useStateContex();
    const { toast } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [redeemed, setRedeemed] = useState(false);

    const myMess = user?.myMess;
    const allScans = myMess?.allScans || [];

    const getTodayScansCount = () => {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const todayTimestamp = startOfToday.getTime();

        const scansToday = allScans.filter(scan => {
            const scanTime = Number(scan.scannedAt);
            return scanTime >= todayTimestamp;
        });

        return scansToday.length;
    };

    const todayScansCount = getTodayScansCount();
    const isCapacityOver = todayScansCount >= 2;

    const getMealSession = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) return "BREAKFAST";
        if (hour >= 11 && hour < 16) return "LUNCH";
        return "DINNER";
    };

    const isCorrectMess = myMess && (
        String(myMess?.messId?.id) === String(scanMessId) || 
        String(myMess?.messId?._id) === String(scanMessId)
    );

    useEffect(() => {
        if (redeemed) {
            const timer = setTimeout(() => navigate("/profile"), 3000);
            return () => clearTimeout(timer);
        }
    }, [redeemed, navigate]);

    const handleRedeem = async () => {
        if (isCapacityOver) {
            toast({
                title: "Redeem Capacity Over",
                description: "You have already scanned 2 times today.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        try {
            const { data } = await axioseInstace.post("/api/meals/redeem", {
                sub: myMess.id,
                remaingDay: myMess.RemainingDay 
            });
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ["current_user"] });
                setRedeemed(true);
            } else {
                toast({
                    title: "Verification Failed",
                    description: data?.message || "Internal error",
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Verification Failed",
                description: error.response?.data?.message || "Internal error",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isCorrectMess) {
        return (
            <div className="h-screen bg-white flex items-center justify-center p-6 text-center">
                <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <XCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase italic">Access Denied</h2>
                        <p className="text-slate-500 text-sm leading-relaxed mt-2">
                            This QR belongs to another Mess. <br />
                            Your plan is at: <span className="text-orange-600 font-bold">{myMess?.messId?.identity?.name || "Registered Mess"}</span>
                        </p>
                    </div>
                    <Button onClick={() => navigate(-1)} className="w-full bg-slate-900 rounded-2xl h-14 font-bold">
                        RETURN TO DASHBOARD
                    </Button>
                </div>
            </div>
        );
    }

    if (redeemed) {
        return (
            <div className="h-screen bg-emerald-500 flex items-center justify-center p-6 overflow-hidden">
                <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-20 duration-700">
                    <div className="h-3 bg-emerald-600 w-full" />
                    <div className="p-8 flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-emerald-100 rounded-full scale-150 animate-ping opacity-30" />
                            <div className="relative w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={3} />
                            </div>
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">MEAL VERIFIED</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-6">Success</p>
                        <div className="w-full space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-bold text-slate-400 uppercase">Session</span>
                                <span className="text-[11px] font-black text-emerald-600 uppercase italic">{getMealSession()}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                                <span className="text-[11px] font-bold text-slate-400 uppercase">Remaining Meals</span>
                                <span className="text-xl font-black text-slate-900">{myMess.RemainingDay }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
            <div className="relative h-[30%] bg-orange-600 p-6 flex flex-col items-center justify-center">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-6 p-2.5 bg-white/20 rounded-xl backdrop-blur-md text-white active:scale-90 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-center relative z-10">
                    <p className="text-orange-100 font-black uppercase tracking-[0.3em] text-[9px] mb-1">Smart Check-in</p>
                    <h1 className="text-white text-3xl font-black tracking-tighter uppercase italic">Redeem Meal</h1>
                </div>
            </div>

            <div className="flex-1 px-5 -mt-10 relative z-20 pb-6">
                <Card className="border-none shadow-xl rounded-[2.5rem] bg-white h-full flex flex-col">
                    <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                                        <Utensils className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-slate-900 leading-none">{myMess.messId?.identity?.name || "Your Mess"}</h2>
                                        <p className="text-[9px] font-black text-orange-500 uppercase mt-1 tracking-widest flex items-center gap-1">
                                            <Zap className="w-3 h-3 fill-current" /> Active Plan
                                        </p>
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                                    <IndianRupee className="w-5 h-5 text-orange-600" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Balance</p>
                                    <p className="text-base font-black text-slate-900">{myMess.RemainingDay} Days</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-right">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Usage Today</p>
                                    <p className={`text-base font-black ${isCapacityOver ? 'text-red-600' : 'text-slate-900'}`}>
                                        {todayScansCount} / 2
                                    </p>
                                </div>
                            </div>

                            {isCapacityOver ? (
                                <div className="bg-red-50 rounded-2xl p-4 flex items-start gap-3 border border-red-200">
                                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                                    <p className="text-[10px] font-bold text-red-900 leading-relaxed">
                                        <span className="font-black uppercase">Capacity Over:</span> You have already scanned 2 times today. Please try again tomorrow.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-orange-50 rounded-2xl p-4 flex items-start gap-3">
                                    <Info className="w-4 h-4 text-orange-600 shrink-0" />
                                    <p className="text-[10px] font-bold text-orange-900/80 leading-relaxed">
                                        Tapping redeem will deduct <span className="font-black">1 Meal</span> for <span className="font-black underline">{getMealSession()}</span>.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-auto pt-6">
                            <Button
                                onClick={handleRedeem}
                                disabled={loading || isCapacityOver}
                                className={`w-full h-16 rounded-2xl shadow-lg transition-all flex items-center justify-between px-6 active:scale-95 
                                    ${isCapacityOver ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 text-white'}`}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin w-6 h-6 mx-auto" />
                                ) : (
                                    <>
                                        <span className="font-black italic tracking-tight">
                                            {isCapacityOver ? "DAILY LIMIT REACHED" : `CONFIRM ${getMealSession()}`}
                                        </span>
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}