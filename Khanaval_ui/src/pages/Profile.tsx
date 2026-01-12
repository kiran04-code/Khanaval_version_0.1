import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, Calendar, CreditCard, Settings, LogOut, 
  ChevronRight, MapPin, History, ShieldCheck, 
  Flame, UtensilsCrossed, Bell,
  Clock
} from "lucide-react";
import { useCurrentUser } from "@/hooks/user-hook";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";

export default function KhanavalProfile() {
const navigate = useNavigate();

  const {user} = useCurrentUser()
  const queryClient = useQueryClient()
  const [userData] = useState({
    name: "Aryan Kulkarni",
    email: "aryan.k@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan",
    streak: 12,
    activeSubscriptions: [
      {
        id: "KH-9921",
        messName: "Sharma's Kitchen",
        plan: "Monthly Full Meal",
        startDate: "Jan 01, 2026",
        endDate: "Jan 30, 2026",
        totalDays: 30,
        daysRemaining: 18,
        price: 2800
      }
    ]
  });
const handlelogout = ()=>{
   window.localStorage.removeItem("_user_Token__")
    queryClient.invalidateQueries({queryKey:["current_user"]})
   queryClient.clear();
   navigate("/auth")
}
  return (
    <div className="min-h-screen bg-[#FFFBF9] pb-12 selection:bg-orange-100">
      {/* 1. Dynamic Header with Gradient */}
      <div className="relative h-48 bg-gradient-to-r from-orange-600 to-orange-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]" />
        <div className="absolute -bottom-16 left-0 right-0 h-32 bg-[#FFFBF9] rounded-[100%] scale-x-125" />
      </div>

      <div className="container mx-auto max-w-2xl px-6 -mt-24 relative z-10">
        {/* Profile Card */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <img 
              src={user.imageUrl} 
              className="w-32 h-32 rounded-[45px] bg-white border-8 border-white shadow-2xl relative" 
              alt="Profile"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 rounded-2xl p-2 border-4 border-white shadow-lg">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="text-center mt-6">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.first_name} {user.last_name}</h1>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.emailId}</h1>
            <div className="flex items-center justify-center gap-2 mt-2">
               <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none font-bold">
                 <Flame className="w-3 h-3 mr-1 fill-orange-500" /> {userData.streak} Day Streak
               </Badge>
               <span className="text-slate-400 font-bold text-sm">•</span>
               <span className="text-slate-500 font-bold text-sm">Member since 2025</span>
            </div>
          </div>
        </div>

        {/* 2. Subscription Dashboard (Modern Layout) */}
        <h2 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-4 ml-2">Active Subscription</h2>
        
        {userData.activeSubscriptions.map((sub) => (
          <Card key={sub.id} className="border-none shadow-[0_30px_60px_-15px_rgba(249,115,22,0.15)] rounded-[40px] overflow-hidden bg-white mb-8 border border-orange-50">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
                    <UtensilsCrossed className="text-orange-500 w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{sub.messName}</h3>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">{sub.plan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-300 uppercase">Valid Until</p>
                  <p className="text-slate-900 font-black">{sub.endDate}</p>
                </div>
              </div>

              {/* Unique Circular/Bar Progress Hybrid */}
              <div className="bg-slate-50 rounded-[32px] p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">
                    {sub.daysRemaining} <span className="text-lg text-slate-400 font-bold">Left</span>
                  </p>
                  <p className="text-xs font-bold text-orange-600 bg-orange-100/50 inline-block px-2 py-0.5 rounded-md">
                    Out of {sub.totalDays} days
                  </p>
                </div>
                
                {/* SVG Radial Progress */}
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                    <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={213} strokeDashoffset={213 - (213 * (sub.daysRemaining / sub.totalDays))} className="text-orange-500 stroke-round transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 h-16 rounded-[24px] bg-slate-900 hover:bg-orange-600 text-white font-black text-lg transition-all shadow-xl hover:shadow-orange-200 group">
                Check Today's Menu
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* 3. Action Grid */}
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: "Notification Prefs", icon: Bell, detail: "Daily menu alerts" },
            { label: "Order History", icon: History, detail: "24 orders completed" },
            { label: "Saved Addresses", icon: MapPin, detail: "Home, Office" },
            { label: "Account Settings", icon: Settings, detail: "Security & Privacy" },
          ].map((item) => (
            <button key={item.label} className="flex items-center justify-between p-5 bg-white border border-slate-50 rounded-3xl hover:border-orange-200 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-4 text-left">
                <div className="p-3 rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm leading-tight">{item.label}</p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{item.detail}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-orange-500 transition-colors" />
            </button>
          ))}
          
          <button onClick={handlelogout} className="flex items-center justify-center gap-2 p-5 text-red-500 font-black uppercase text-xs tracking-widest mt-4">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}