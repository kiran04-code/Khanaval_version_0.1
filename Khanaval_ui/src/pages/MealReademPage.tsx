import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Utensils, CheckCircle2, XCircle, ArrowLeft, 
  MapPin, Clock, Loader2, ShieldCheck, 
  ChevronRight, Fingerprint, Receipt, Info
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

  const handleRedeem = async () => {
    setLoading(true);
    try {
      const { data } = await axioseInstace.post("/api/meals/redeem", {
        messId: scanMessId,
        userId: user?._id || user?.id
      });
      if (data.success) {
        setRedeemed(true);
      }
    } catch (error) {
      toast({ 
        title: "Verification Failed", 
        description: error.response?.data?.message || "Internal validation error.",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isCorrectMess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="max-w-sm w-full text-center">
          <div className="mb-8 inline-flex p-6 bg-red-50 rounded-[2.5rem] text-red-500">
            <XCircle className="w-16 h-16" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Invalid Location</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            This QR does not match your active plan. You are registered at <span className="text-slate-900 font-bold underline">{myMess?.messId?.identity?.name}</span>.
          </p>
          <Button 
            onClick={() => navigate(-1)} 
            className="w-full h-16 rounded-3xl bg-slate-900 text-white font-bold shadow-2xl hover:bg-slate-800 transition-all"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (redeemed) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-white">
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-40 animate-pulse" />
          <div className="relative w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]">
            <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-2 italic">VERIFIED</h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-12">Access Granted • Enjoy your meal</p>
        <Button 
          onClick={() => navigate("/profile")} 
          className="bg-white text-slate-900 font-black rounded-2xl h-14 px-12 hover:scale-105 transition-transform"
        >
          CLOSE PASS
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 pb-10">
      {/* Premium Gradient Backdrop */}
      <div className="h-80 bg-slate-900 relative overflow-hidden flex flex-col items-center pt-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-orange-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-600/20 blur-[120px] rounded-full" />
        </div>
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md text-white border border-white/10 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="relative z-10 text-center px-6">
          <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] mb-3">Identity Verified</p>
          <h1 className="text-white text-4xl font-black tracking-tight leading-tight">Meal Check-in</h1>
        </div>
      </div>

      {/* The "Pass" Interface */}
      <div className="max-w-md mx-auto px-6 -mt-24 relative z-20">
        <Card className="border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-[3rem] overflow-hidden bg-white">
          <CardContent className="p-0">
            
            {/* Header / Brand */}
            <div className="p-8 pb-10 bg-white">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 leading-none">{myMess.messId?.identity?.name}</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase mt-1 tracking-widest">{myMess.messId?.identity?.dietaryType}</p>
                  </div>
                </div>
                <Receipt className="w-6 h-6 text-slate-200" />
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-y-6 border-t border-slate-50 pt-8">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Student</p>
                  <p className="font-black text-slate-800 uppercase">{user?.first_name} {user?.last_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pass Status</p>
                  <div className="inline-flex items-center gap-1 text-emerald-600 font-black text-xs bg-emerald-50 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> ACTIVE
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Session</p>
                  <p className="font-black text-slate-800 uppercase">{new Date().getHours() < 16 ? "Lunch" : "Dinner"}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Valid Until</p>
                  <p className="font-black text-slate-800 uppercase">{myMess.RemainingDay} Days Left</p>
                </div>
              </div>
            </div>

            {/* Perforation Divider */}
            <div className="relative h-4 bg-slate-50 flex items-center">
               <div className="absolute -left-3 w-6 h-6 rounded-full bg-slate-50 shadow-inner" />
               <div className="w-full border-t-2 border-dashed border-slate-200 mx-4" />
               <div className="absolute -right-3 w-6 h-6 rounded-full bg-slate-50 shadow-inner" />
            </div>

            {/* Call to Action Section */}
            <div className="p-8 pt-10 space-y-8">
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-[2rem] border border-orange-100/50">
                <Info className="w-5 h-5 text-orange-600 mt-0.5" />
                <p className="text-xs font-bold text-orange-800/80 leading-relaxed">
                  By clicking redeem, one meal session will be deducted from your <span className="font-black">Digital Register</span>.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <Button 
                  onClick={handleRedeem}
                  disabled={loading}
                  className="relative w-full h-24 bg-slate-900 hover:bg-slate-800 text-white rounded-[2.2rem] shadow-2xl flex items-center justify-between px-8 group overflow-hidden transition-all active:scale-[0.97]"
                >
                  {loading ? (
                    <Loader2 className="animate-spin w-8 h-8 mx-auto" />
                  ) : (
                    <>
                      <div className="flex items-center gap-5">

                        <div className="text-left">
                          <p className="text-xl font-black tracking-tight italic">REDEEM PASS</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tap to process</p>
                        </div>
                      </div>
                      <ChevronRight className="w-8 h-8 text-slate-500 group-hover:translate-x-2 group-hover:text-white transition-all" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-center text-[9px] font-black text-slate-300 flex items-center justify-center gap-2 uppercase tracking-[0.2em]">
                 <ShieldCheck className="w-4 h-4" /> Military-Grade Security Verified
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}