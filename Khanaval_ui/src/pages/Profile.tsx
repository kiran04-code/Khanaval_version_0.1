import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LogOut, ChevronRight, MapPin, History, ShieldCheck, 
  UtensilsCrossed, Clock, Mail, QrCode, Calendar, ChevronDown, ChevronUp 
} from "lucide-react";
import { useCurrentUser } from "@/hooks/user-hook";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function KhanavalProfile() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  
  const [showHistory, setShowHistory] = useState(false);

  const myMess = user?.myMess;
  const total = myMess?.totalDays || 1; 
  const remaining = myMess?.RemainingDay || 0;
  const totalScansCount = myMess?.allScans?.length || 0;

  // Updated formatter to match: "Monday, 26 Jan • 01:07 PM"
  const formatScanTime = (val) => {
    if (!val) return { relative: "No scans", fullInfo: "N/A" };
    const date = new Date(Number(val));
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    
    // Exact format: Monday, 26 Jan • 01:07 PM
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' }); 
    const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const fullInfo = `${dayName}, ${dateStr} • ${timeStr}`;

    let relative = "";
    if (diffInMinutes < 1) relative = "Just now";
    else if (diffInMinutes < 60) relative = `${diffInMinutes}m ago`;
    else if (diffInMinutes < 1440) relative = `${Math.floor(diffInMinutes / 60)}h ago`;
    else relative = `${Math.floor(diffInMinutes / 1440)}d ago`;

    return { relative, fullInfo };
  };

  const formatDateOnly = (val) => {
    if (!val) return "N/A";
    const date = new Date(Number(val));
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Get data for the specific lastScannedAt field from your DB
  const latestScan = formatScanTime(myMess?.lastScannedAt);

  const percentage = Math.min(100, Math.max(0, (remaining / total) * 100));

  const handlelogout = () => {
    window.localStorage.removeItem("_user_Token__");
    queryClient.invalidateQueries({ queryKey: ["current_user"] });
    queryClient.clear();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-[#FFFBF9] pb-24 selection:bg-orange-100">
      <div className="relative h-40 lg:h-56 bg-gradient-to-r from-orange-600 to-orange-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]" />
        <div className="absolute -bottom-16 left-0 right-0 h-32 bg-[#FFFBF9] rounded-[100%] scale-x-125" />
      </div>

      <div className="container mx-auto max-w-3xl px-4 lg:px-8 -mt-20 lg:-mt-28 relative z-10">
        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <img
              src={user?.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.first_name}`}
              className="w-28 h-28 lg:w-40 lg:h-40 rounded-[40px] lg:rounded-[50px] bg-white border-4 lg:border-8 border-white shadow-2xl relative object-cover"
              alt="Profile"
            />
            <div className="absolute bottom-1 right-1 lg:bottom-3 lg:right-3 bg-green-500 rounded-xl p-1.5 lg:p-2.5 border-2 lg:border-4 border-white shadow-lg">
              <ShieldCheck className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>
          </div>
          <div className="text-center mt-4 lg:mt-6 space-y-1">
            <h1 className="text-xl lg:text-3xl font-black text-slate-900 leading-tight">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-slate-500 font-medium text-xs lg:text-base flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> {user?.emailId}
            </p>
          </div>
        </div>

        {/* Check-in Button */}
        {myMess && remaining > 0 && (
          <button 
            onClick={() => navigate("/scan-qr")}
            className="w-full mb-8 bg-slate-900 text-white rounded-[28px] lg:rounded-[35px] p-5 lg:p-8 shadow-xl flex items-center justify-between active:scale-[0.98] transition-all border-b-4 border-slate-950"
          >
            <div className="flex items-center gap-4 lg:gap-6 text-left">
              <div className="bg-orange-500 p-3 lg:p-5 rounded-2xl lg:rounded-3xl shrink-0">
                <QrCode className="w-6 h-6 lg:w-10 lg:h-10" />
              </div>
              <div>
                <p className="text-base lg:text-2xl font-black leading-tight">Check-in for Meal</p>
                <p className="text-slate-400 text-[10px] lg:text-sm font-bold uppercase mt-1">
                   Scan at {myMess.messId?.identity?.name || "Mess"}
                </p>
              </div>
            </div>
            <div className="h-10 w-10 lg:h-14 lg:w-14 rounded-full bg-white/10 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 lg:w-8 lg:h-8 text-white" />
            </div>
          </button>
        )}

        {/* Active Subscription Card */}
        {myMess ? (
          <Card className="border-none shadow-lg rounded-[32px] lg:rounded-[45px] overflow-hidden bg-white mb-8">
            <CardContent className="p-6 lg:p-10">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4 lg:gap-6 min-w-0">
                  <div className="w-12 h-12 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl flex items-center justify-center shrink-0 bg-orange-50">
                    <UtensilsCrossed className="w-6 h-6 lg:w-10 lg:h-10 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg lg:text-2xl font-black text-slate-900 truncate">{myMess.messId?.identity?.name || "Mess"}</h3>
                    
                    {/* Latest Scan Badge using lastScannedAt */}
                    <div className="flex flex-col gap-1 mt-1 lg:mt-2">
                        <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg w-fit border border-orange-100">
                            <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span className="text-[9px] lg:text-xs font-black uppercase tracking-tight">
                                Latest: {latestScan.fullInfo} ({latestScan.relative})
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 ml-1">
                          <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span className="text-[9px] lg:text-xs font-black uppercase">Start: {formatDateOnly(myMess.startAt)}</span>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] lg:text-xs font-black text-slate-300 uppercase">Price</p>
                  <p className="text-slate-900 font-black text-lg lg:text-2xl">₹{myMess.price}</p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-slate-50 rounded-[28px] lg:rounded-[35px] p-6 lg:p-10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1 lg:gap-2">
                    <span className="text-4xl lg:text-7xl font-black tracking-tighter text-slate-900">
                      {remaining}
                    </span>
                    <span className="text-xs lg:text-xl text-slate-400 font-bold uppercase">Meals Left</span>
                  </div>
                  <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Plan: {total} Days</p>
                </div>

                <div className="relative w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90 absolute">
                    <circle cx="50%" cy="50%" r="35%" stroke="currentColor" strokeWidth="10%" fill="transparent" className="text-slate-200" />
                    <circle
                      cx="50%" cy="50%" r="35%"
                      stroke="currentColor" strokeWidth="10%" fill="transparent" strokeLinecap="round"
                      style={{ 
                        strokeDasharray: "220%", 
                        strokeDashoffset: `${220 - (percentage * 2.2)}%` 
                      }}
                      className="text-orange-500 transition-all duration-1000"
                    />
                  </svg>
                  <History className="w-5 h-5 lg:w-8 lg:h-8 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Scan History Toggle with Total Count */}
        {myMess?.allScans && myMess.allScans.length > 0 && (
          <div className="mb-8">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between p-5 lg:p-7 bg-white border border-slate-100 rounded-3xl lg:rounded-[35px] shadow-sm hover:border-orange-200 transition-all"
            >
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="bg-orange-100 p-2.5 lg:p-3.5 rounded-xl lg:rounded-2xl">
                   <History className="w-4 h-4 lg:w-6 lg:h-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <span className="block text-xs lg:text-lg font-black text-slate-700 uppercase tracking-wider">
                    Full Scan History ({totalScansCount})
                  </span>
                  <span className="text-[10px] lg:text-xs text-slate-400 font-bold uppercase">Total Meals Tracked</span>
                </div>
              </div>
              {showHistory ? <ChevronUp className="w-5 h-5 lg:w-7 lg:h-7 text-slate-400" /> : <ChevronDown className="w-5 h-5 lg:w-7 lg:h-7 text-slate-400" />}
            </button>
            
            {showHistory && (
              <div className="mt-4 space-y-3 lg:space-y-4 px-2">
                {[...myMess.allScans].reverse().map((scan, index) => {
                  const timeData = formatScanTime(scan.scannedAt);
                  return (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 lg:p-6 bg-white/60 border border-slate-100 rounded-2xl lg:rounded-3xl hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-3 lg:gap-5">
                        <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5 lg:w-7 lg:h-7" />
                        </div>
                        <div>
                          <p className="font-bold lg:font-black text-slate-800 text-sm lg:text-lg tracking-tight">Meal Verified</p>
                          <p className="text-[10px] lg:text-sm font-bold text-slate-400 uppercase mt-0.5">
                            {timeData.fullInfo}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[9px] lg:text-xs px-2 lg:px-4 py-1">
                        {timeData.relative}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-5 lg:p-7 bg-white border border-slate-50 rounded-3xl lg:rounded-[35px] hover:border-orange-100 shadow-sm transition-all group">
            <div className="flex items-center gap-3 lg:gap-5">
              <div className="p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="text-left">
                <p className="font-black text-slate-800 text-xs lg:text-lg">Mess Location</p>
                <p className="text-[10px] lg:text-sm font-bold text-slate-400 uppercase truncate">
                  {myMess?.messId?.location?.landmark || "Not set"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 lg:w-7 lg:h-7 text-slate-200 group-hover:text-orange-500" />
          </button>

          <button onClick={handlelogout} className="w-full flex items-center justify-center gap-2 p-5 text-red-500 font-black uppercase text-[10px] lg:text-sm tracking-widest mt-4 hover:bg-red-50 rounded-2xl lg:rounded-3xl transition-colors">
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}