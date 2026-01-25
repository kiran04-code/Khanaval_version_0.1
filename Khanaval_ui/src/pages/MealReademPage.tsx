import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Utensils, CheckCircle2, XCircle, ArrowLeft, 
  MapPin, Clock, Loader2, ShieldCheck, Zap,
  ChevronRight, CalendarDays
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
  const isExpired = myMess?.RemainingDay <= 0;

  const handleRedeem = async () => {
    setLoading(true);
    try {
      const { data } = await axioseInstace.post("/api/meals/redeem", {
        messId: scanMessId,
        userId: user?._id || user?.id
      });
      if (data.success) {
        setRedeemed(true);
        toast({ title: "Enjoy your meal!", description: "Redemption successful." });
      }
    } catch (error) {
      toast({ 
        title: "Access Denied", 
        description: error.response?.data?.message || "Could not verify your meal today.",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  // --- ERROR STATE: Wrong Mess ---
  if (!isCorrectMess) {
    return (
      <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-red-100">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Access Denied</h2>
            <p className="text-slate-500 font-bold mb-8">
              This QR code belongs to <span className="text-red-600 font-black underline italic">another mess</span>. 
              You are currently subscribed to:
            </p>
            <div className="p-4 bg-orange-50 rounded-2xl border-2 border-orange-100 mb-8">
              <p className="text-orange-600 font-black text-xl">{myMess?.messId?.identity?.name || "No Mess Found"}</p>
              <p className="text-orange-400 text-xs font-bold uppercase tracking-widest">{myMess?.messId?.location?.landmark}</p>
            </div>
            <Button 
              onClick={() => navigate(-1)} 
              className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black hover:scale-[1.02] transition-transform"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> TAKE ME BACK
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- SUCCESS STATE: After Redemption ---
  if (redeemed) {
    return (
      <div className="min-h-screen bg-emerald-500 flex items-center justify-center p-6 overflow-hidden">
        <div className="relative text-center space-y-8 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl relative">
              <CheckCircle2 className="w-20 h-20 text-emerald-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-white tracking-tighter italic">VALIDATED!</h1>
            <p className="text-emerald-100 font-black uppercase tracking-[0.3em] text-sm">Meal Pass Redeemed</p>
          </div>
          <div className="pt-4 flex flex-col gap-3">
            <Button onClick={() => navigate("/profile")} className="bg-slate-900 text-white font-black rounded-2xl h-16 px-12 shadow-2xl hover:bg-slate-800">
               DONE & CLOSE
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN REDEEM UI ---
  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans selection:bg-orange-100">
      {/* Dynamic Header */}
      <div className="h-64 bg-slate-900 rounded-b-[4rem] relative overflow-hidden flex flex-col justify-center items-center text-center px-6">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500 blur-[100px] rounded-full" />
        </div>
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-6 p-4 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-xl text-white transition-all active:scale-90"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <Badge className="bg-emerald-500 text-white border-none py-1.5 px-4 rounded-full font-black text-[10px] uppercase tracking-widest animate-pulse mb-3">
          Verifying Identity...
        </Badge>
        <h1 className="text-white text-3xl font-black tracking-tight leading-none">Confirm Attendance</h1>
      </div>

      <div className="container max-w-md mx-auto px-6 -mt-16">
        <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[45px] overflow-hidden bg-white">
          <CardContent className="p-0">
            
            {/* Upper Ticket Section */}
            <div className="p-8 pb-6 relative">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                  <Utensils className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Ticket #8291</p>
                  <p className="font-black text-slate-900 text-lg">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
                </div>
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 leading-tight mb-1 uppercase italic tracking-tighter">
                {myMess.messId?.identity?.name}
              </h2>
              <p className="flex items-center gap-1.5 text-slate-400 font-bold text-xs uppercase">
                <MapPin className="w-3.5 h-3.5 text-orange-500" /> {myMess.messId?.location?.landmark}
              </p>
            </div>

            {/* Perforation Line */}
            <div className="flex items-center gap-0 px-2 overflow-hidden">
               <div className="w-6 h-6 rounded-full bg-slate-50 -ml-4 shadow-inner" />
               <div className="flex-1 border-t-4 border-dashed border-slate-50 mx-2" />
               <div className="w-6 h-6 rounded-full bg-slate-50 -mr-4 shadow-inner" />
            </div>

            {/* Lower Details Section */}
            <div className="p-8 pt-6 space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-3xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Pass Holder</p>
                  <p className="font-black text-slate-800 text-sm truncate">{user?.first_name} {user?.last_name}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100/50">
                  <p className="text-[9px] font-black text-emerald-600 uppercase mb-1">Status</p>
                  <p className="font-black text-emerald-700 text-sm">AUTHORIZED</p>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-[35px] flex items-center justify-between text-white shadow-xl">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-orange-400 fill-orange-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-black leading-none">{myMess.RemainingDay}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Meals Left</p>
                    </div>
                 </div>
                 <div className="h-10 w-[1px] bg-white/10" />
                 <div className="text-right">
                    <div className="flex items-center gap-1.5 text-orange-400 justify-end mb-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-black uppercase tracking-tight">Dinner/Lunch</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">SESSION OPEN</p>
                 </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleRedeem}
                  disabled={loading || isExpired}
                  className="w-full h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-[2rem] shadow-2xl shadow-orange-200 transition-all flex items-center justify-center group active:scale-[0.98]"
                >
                  {loading ? (
                    <Loader2 className="animate-spin w-8 h-8" />
                  ) : (
                    <div className="flex items-center justify-between w-full px-4">
                      <div className="text-left">
                        <p className="text-lg font-black tracking-tight uppercase">Redeem Now</p>
                        <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Slide to confirm</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-7 h-7" />
                      </div>
                    </div>
                  )}
                </Button>
                
                <p className="text-center text-[10px] font-bold text-slate-400 flex items-center justify-center gap-1.5 uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Encrypted Attendance Scan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}