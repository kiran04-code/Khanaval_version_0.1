import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LogOut, ChevronRight, MapPin, History, ShieldCheck, 
  UtensilsCrossed, Clock, Mail, Phone, QrCode, AlertTriangle, Calendar 
} from "lucide-react";
import { useCurrentUser } from "@/hooks/user-hook";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

export default function KhanavalProfile() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  
  const myMess = user?.myMess;
  const total = myMess?.totalDays || 1; 
  const remaining = myMess?.RemainingDay || 0;

  // --- NEW: RELATIVE TIME FORMATTER ---
  const formatRelativeTime = (val) => {
    if (!val) return "Never scanned";
    const date = new Date(isNaN(val) ? val : Number(val));
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    // Time string for the exact time
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (diffInSeconds < 60) return `Just now (${timeStr})`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago (${timeStr})`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago (${timeStr})`;
    
    const days = Math.floor(diffInSeconds / 86400);
    if (days === 1) return `Yesterday (${timeStr})`;
    if (days < 7) return `${days} days ago`;
    
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  const formatDate = (val) => {
    if (!val) return "N/A";
    const date = new Date(isNaN(val) ? val : Number(val));
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const percentage = Math.min(100, Math.max(0, (remaining / total) * 100));
  const radius = 34;
  const circumference = 2 * Math.PI * radius; 
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const isExpiringSoon = remaining <= 2 && remaining > 0;
  const isExpired = remaining === 0;

  const handlelogout = () => {
    window.localStorage.removeItem("_user_Token__");
    queryClient.invalidateQueries({ queryKey: ["current_user"] });
    queryClient.clear();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-[#FFFBF9] pb-24 selection:bg-orange-100">
      <div className="relative h-48 bg-gradient-to-r from-orange-600 to-orange-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]" />
        <div className="absolute -bottom-16 left-0 right-0 h-32 bg-[#FFFBF9] rounded-[100%] scale-x-125" />
      </div>

      <div className="container mx-auto max-w-2xl px-6 -mt-24 relative z-10">
        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-400 blur-2xl opacity-20 transition-opacity" />
            <img
              src={user?.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.first_name}`}
              className="w-32 h-32 rounded-[45px] bg-white border-8 border-white shadow-2xl relative object-cover"
              alt="Profile"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 rounded-2xl p-2 border-4 border-white shadow-lg">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="text-center mt-6 space-y-1">
            <h1 className="text-[clamp(1.5rem,6vw,2rem)] font-black text-slate-900 tracking-tight">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-slate-500 font-medium text-[clamp(0.75rem,3vw,0.875rem)] flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {user?.emailId}
            </p>
          </div>
        </div>

        {/* Check-in Button */}
        {myMess && !isExpired && (
          <button 
            onClick={() => navigate("/scan-qr")}
            className="w-full mb-8 bg-slate-900 hover:bg-orange-600 text-white rounded-[32px] p-6 shadow-2xl flex items-center justify-between group transition-all transform active:scale-95 border-b-4 border-slate-950 active:border-b-0"
          >
            <div className="flex items-center gap-5">
              <div className="bg-orange-500 p-4 rounded-2xl shadow-inner group-hover:bg-white group-hover:text-orange-600 transition-colors">
                <QrCode className="w-8 h-8" />
              </div>
              <div className="text-left">
                <p className="text-[clamp(1rem,4.5vw,1.25rem)] font-black tracking-tight leading-none">Check-in for Meal</p>
                <p className="text-slate-400 group-hover:text-orange-100 text-[clamp(0.6rem,2.5vw,0.75rem)] font-bold uppercase mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Scan QR at {myMess.messId?.identity?.name || "Mess"}
                </p>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-400 transition-all">
              <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        )}

        {/* Active Subscription Card */}
        {myMess ? (
          <Card className={`border-none shadow-[0_30px_60px_-15px_rgba(249,115,22,0.15)] rounded-[40px] overflow-hidden bg-white mb-8 border ${isExpiringSoon ? 'ring-2 ring-red-500/20' : 'border-orange-50'}`}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isExpiringSoon ? 'bg-red-50' : 'bg-orange-50'}`}>
                    <UtensilsCrossed className={`w-7 h-7 ${isExpiringSoon ? 'text-red-500' : 'text-orange-500'}`} />
                  </div>
                  <div>
                    <h3 className="text-[clamp(1rem,4.5vw,1.25rem)] font-black text-slate-900 leading-tight">{myMess.messId?.identity?.name || "Mess"}</h3>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <div className="flex items-center gap-1 text-emerald-600">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[clamp(0.55rem,2.2vw,0.65rem)] font-black uppercase tracking-wider">Started: {formatDate(myMess.startAt)}</span>
                      </div>
                      
                      {/* LAST SCAN UI ADDED HERE */}
                      <div className="flex items-center gap-1 text-orange-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-[clamp(0.55rem,2.2vw,0.65rem)] font-black uppercase tracking-wider">
                          Last Scan: {formatRelativeTime(myMess.lastScannedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[clamp(0.55rem,2.2vw,0.65rem)] font-black text-slate-300 uppercase">Price</p>
                  <p className="text-slate-900 font-black text-[clamp(1rem,4.5vw,1.125rem)]">₹{myMess.price}</p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-slate-50 rounded-[32px] p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[clamp(2.5rem,12vw,3.5rem)] font-black tracking-tighter leading-none ${isExpiringSoon ? 'text-red-600' : 'text-slate-900'}`}>
                      {remaining}
                    </span>
                    <span className="text-[clamp(0.875rem,4vw,1.125rem)] text-slate-400 font-bold">Days</span>
                  </div>
                  <p className="text-[clamp(0.55rem,2.2vw,0.65rem)] font-bold text-slate-400 uppercase tracking-widest">Plan: {total} Days</p>
                </div>

                {/* Radial Loader */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                    <circle
                      cx="50%" cy="50%" r="34"
                      stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round"
                      style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset,
                      }}
                      className={`${isExpiringSoon ? 'text-red-500' : 'text-orange-500'} transition-all duration-1000 ease-out`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <History className={`w-5 h-5 ${isExpiringSoon ? 'text-red-500' : 'text-orange-500'}`} />
                  </div>
                </div>
              </div>

              {!isExpired && (
                <Link 
                  to={`/mess/${myMess.messId?.id}`} 
                  className="w-full mt-6 h-16 rounded-[24px] bg-slate-900 hover:bg-orange-600 text-white font-black text-[clamp(0.875rem,4vw,1.125rem)] transition-all shadow-xl flex items-center justify-center group"
                >
                  View Today's Menu
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="p-12 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-200 mb-8">
            <p className="text-slate-400 font-bold text-[clamp(0.875rem,4vw,1rem)]">No active mess found</p>
          </div>
        )}

        {/* Action List */}
        <div className="grid grid-cols-1 gap-3">
          <button className="flex items-center justify-between p-5 bg-white border border-slate-50 rounded-3xl hover:border-orange-100 transition-all group shadow-sm hover:shadow-md text-left">
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="p-3 rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-black text-slate-800 text-[clamp(0.75rem,3.5vw,0.875rem)]">Mess Location</p>
                <p className="text-[clamp(0.6rem,2.8vw,0.7rem)] font-bold text-slate-400 uppercase truncate w-full pr-2">
                  {myMess?.messId?.location?.landmark || "Not set"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-orange-500 transition-colors shrink-0" />
          </button>

          <button onClick={handlelogout} className="flex items-center justify-center gap-2 p-5 text-red-500 font-black uppercase text-[clamp(0.6rem,2.5vw,0.7rem)] tracking-[0.2em] mt-4 hover:bg-red-50 rounded-3xl transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}