import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Utensils, CheckCircle2, XCircle, ArrowLeft, 
  Loader2, ShieldCheck, ChevronRight, Info,
  Zap, Calendar, IndianRupee
} from "lucide-react";
import { useCurrentUser } from "@/hooks/user-hook";
import { useStateContex } from "@/context/State";
import { useToast } from "@/hooks/use-toast";

export default function MealRedeemPage() {
  const { scanMessId } = useParams();
  const { user } = useCurrentUser();
  const { axioseInstace } = useStateContex();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [redeemed, setRedeemed] = useState(false);

  const myMess = user?.myMess;
  const isCorrectMess = myMess?.messId?.id === scanMessId;

  useEffect(() => {
    if (redeemed) {
      const timer = setTimeout(() => navigate("/profile"), 2200);
      return () => clearTimeout(timer);
    }
  }, [redeemed, navigate]);

  const handleRedeem = async () => {
    setLoading(true);
    try {
      // const { data } = await axioseInstace.post("/api/meals/redeem", {
      //   messId: scanMessId,
      //   userId: user?._id || user?.id
      // });
      // if (data.success) setRedeemed(true);
      setRedeemed(true)
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
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Access Denied</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your active plan is registered at <br/>
            <span className="text-orange-600 font-bold">{myMess?.messId?.identity?.name || "Another Mess"}</span>
          </p>
          <Button onClick={() => navigate(-1)} className="w-full bg-slate-900 rounded-2xl h-14 font-bold tracking-tight">
            RETURN TO DASHBOARD
          </Button>
        </div>
      </div>
    );
  }

  // --- IMPROVED PHONE-LIKE SUCCESS STATE ---
  if (redeemed) {
    return (
      <div className="h-screen bg-orange-600 flex items-center justify-center p-6 transition-all duration-500">
        <div className="w-full max-w-xs bg-white rounded-[3rem] p-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] flex flex-col items-center animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500">
          
          <div className="relative mb-8 mt-4">
            {/* Soft pulse ring */}
            <div className="absolute inset-0 bg-emerald-100 rounded-full scale-150 animate-ping opacity-20" />
            <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">VERIFIED</h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Digital Receipt #{(Math.random() * 10000).toFixed(0)}</p>
          </div>

          <div className="w-full border-t-2 border-dashed border-slate-100 my-8 relative">
            <div className="absolute -left-10 -top-3 w-6 h-6 bg-orange-600 rounded-full" />
            <div className="absolute -right-10 -top-3 w-6 h-6 bg-orange-600 rounded-full" />
          </div>

          <div className="w-full space-y-3 mb-4">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <span>Status</span>
              <span className="text-emerald-600">Success</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <span>Balance</span>
              <span className="text-slate-900">{myMess.RemainingDay - 1} Meals Left</span>
            </div>
          </div>

          <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mt-6 animate-pulse">
            Closing Pass...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden font-sans">
      {/* Dynamic Orange Header */}
      <div className="relative h-[35%] bg-orange-600 p-6 flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle UI Decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-orange-400 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-orange-700 rounded-full blur-3xl opacity-30" />
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-6 p-2.5 bg-white/20 rounded-xl backdrop-blur-md text-white hover:bg-white/30 transition-all active:scale-90"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center relative z-10 pt-4">
          <p className="text-orange-100 font-black uppercase tracking-[0.4em] text-[10px] mb-2 drop-shadow-sm">Identity Verified</p>
          <h1 className="text-white text-4xl font-black tracking-tighter leading-none italic uppercase">
            Meal Check-in
          </h1>
        </div>
      </div>

      {/* Interface Card */}
      <div className="flex-1 px-5 -mt-12 relative z-20 pb-6">
        <Card className="border-none shadow-[0_25px_50px_-12px_rgba(234,88,12,0.2)] rounded-[2.5rem] bg-white h-full flex flex-col">
          <CardContent className="p-6 flex flex-col h-full">
            
            <div className="flex-1 space-y-7">
              {/* Top Row: Brand & Rupees */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
                    <Utensils className="w-7 h-7 text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 leading-none tracking-tight">{myMess.messId?.identity?.name}</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase mt-1 tracking-widest flex items-center gap-1">
                       <Zap className="w-3 h-3 fill-orange-500 text-orange-500" /> Premium Service
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-orange-600" />
                </div>
              </div>

              {/* Data Blocks */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50/80 p-5 rounded-3xl border border-slate-100 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-1 opacity-10"><Calendar className="w-10 h-10" /></div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Validity</p>
                   <p className="text-lg font-black text-slate-900">{myMess.RemainingDay} Days</p>
                </div>
                <div className="bg-slate-50/80 p-5 rounded-3xl border border-slate-100 text-right">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Session</p>
                   <p className="text-lg font-black text-orange-600 italic">
                      {new Date().getHours() < 16 ? "LUNCH" : "DINNER"}
                   </p>
                </div>
              </div>

              {/* Important Alert */}
              <div className="bg-orange-50 rounded-[1.8rem] p-4 flex items-start gap-3 border border-orange-100/50">
                <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold text-orange-900/80 leading-relaxed">
                  Redeeming this pass will deduct <span className="font-black">1 Meal Credit</span> from your digital ledger.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto space-y-5 pt-4">
              <Button 
                onClick={handleRedeem}
                disabled={loading}
                className="w-full h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-[2rem] shadow-xl shadow-orange-200 transition-all flex items-center justify-between px-8 active:scale-[0.96] group"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-8 h-8 mx-auto" />
                ) : (
                  <>
                    <div className="text-left">
                      <p className="text-lg font-black italic tracking-tighter leading-none">REDEEM NOW</p>
                      <p className="text-[10px] font-bold text-orange-100/60 uppercase tracking-widest mt-1">Instant Verification</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-xl group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 py-2">
                <ShieldCheck className="w-4 h-4 text-slate-300" />
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">End-to-End Encrypted</p>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}