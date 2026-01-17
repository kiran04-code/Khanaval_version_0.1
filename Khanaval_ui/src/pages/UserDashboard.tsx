import React, { useState, useEffect, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search, Bell, MapPin, ChevronDown, Clock, QrCode, 
  Utensils, Sparkles, Star, Wallet, Home, User, Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/common/Skeleton";
import { GetALLmess } from "@/hooks/MessData";
const MessCard = React.lazy(()=>import ("./components/MessCard"))

const QuickActionBadge = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap border-2",
      active
        ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200 scale-105"
        : "bg-white border-slate-100 text-slate-500 hover:border-orange-200 hover:text-orange-600 active:scale-95"
    )}
  >
    <Icon className={cn("w-4 h-4", active ? "text-white" : "text-orange-500")} />
    {label}
  </button>
);

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);
  const {AllMESS} = GetALLmess()
  console.log(AllMESS)
  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-24 md:pb-12">
      
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100/60 hidden md:block">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-10">
           <Link to="/" className="md:w-[170px] w-[200px] md:h-fit">
            <img src="/logo.png" alt="logo" className="w-full h-auto" />
          </Link>

          <div className="flex-1 max-w-3xl flex items-center bg-slate-50 rounded-[1.25rem] border border-slate-100 p-1">
            <button className="flex items-center gap-2 px-4 py-2 border-r border-slate-200 text-slate-700 hover:bg-slate-100 rounded-l-xl transition-colors min-w-[180px]">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-sm font-bold truncate">Koramangala, BK</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for 'Pure Veg Thali' or 'Sharma Mess'..." 
                className="pl-12 bg-transparent border-none shadow-none focus-visible:ring-0 h-11 text-sm font-medium" 
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50"><Bell className="w-5 h-5" /></Button>
            <div className="w-10 h-10 rounded-2xl bg-orange-100 cursor-pointer overflow-hidden border-2 border-white shadow-md" onClick={() => navigate("/profile")}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" alt="user" />
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden sticky top-0 z-50 bg-white px-4 pt-4 pb-3 shadow-sm border-b border-slate-50">
        <div className="flex items-center justify-between mb-3">
              <Link to="/" className="md:w-[170px] w-[200px] md:h-fit">
            <img src="/logo.png" alt="logo" className="w-full h-auto" />
          </Link>
           <Button variant="ghost" size="icon" className="rounded-full"><Bell className="w-5 h-5" /></Button>
        </div>
        
        <div className="flex flex-col gap-3">
          <button className="flex items-center gap-2 text-slate-900">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-black">Koramangala, 4th Block</span>
            <ChevronDown className="w-4 h-4 text-orange-500" />
          </button>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search dishes or mess..." 
              className="pl-11 bg-slate-100/80 border-none rounded-2xl h-12 text-sm" 
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 pt-6 md:pt-10 max-w-7xl">
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0">
          <QuickActionBadge icon={Sparkles} label="Popular" active={activeTab === "popular"} onClick={() => setActiveTab("popular")} />
          <QuickActionBadge icon={Utensils} label="Pure Veg" active={activeTab === "veg"} onClick={() => setActiveTab("veg")} />
          <QuickActionBadge icon={Clock} label="Fastest" active={activeTab === "fast"} onClick={() => setActiveTab("fast")} />
          <QuickActionBadge icon={Wallet} label="Budget Friendly" active={activeTab === "budget"} onClick={() => setActiveTab("budget")} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3 gap-8 md:gap-10">
          {loading ? (
             Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-[2.5rem]" />)
          ) : (
            AllMESS.map((mess,idx) => (
              <Suspense fallback={<div>loading....</div>}>
                <MessCard key={idx} {...mess} />
              </Suspense>
            ))
          )}
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-4 md:hidden flex justify-between items-center">
        <button className="flex flex-col items-center gap-1 text-orange-500 font-bold"><Home className="w-6 h-6" /><span className="text-[10px]">Explore</span></button>
        <button onClick={()=>navigate("/scan-qr")} className="relative -top-8 bg-slate-900 p-4 rounded-full shadow-2xl shadow-orange-500/40 border-4 border-white active:scale-95 transition-transform"><QrCode className="w-6 h-6 text-white" /></button>
        <button onClick={()=>navigate("/profile")} className="flex flex-col items-center gap-1 text-slate-400 font-bold"><User className="w-6 h-6" /><span className="text-[10px]" >Profile</span></button>
      </nav>
    </div>
  );
}