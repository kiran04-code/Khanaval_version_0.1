import React, { useMemo, useState } from "react";
import {
  MapPin, Star, Search, Navigation,
  ChevronRight, UtensilsCrossed, Zap,
  ShieldCheck, ArrowRight, Heart
} from "lucide-react";
import { GetALLmess } from "@/hooks/MessData";
import { useStateContex } from "@/context/State";
import { calculateDistance } from "./components/Distance";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/user-hook";
import { UserProviderdata } from "@/hooks/Provider";

const MessOrbitDashboard = () => {
  const { AllMESS, isLoading } = GetALLmess();
  const { userlat, userlng } = useStateContex();
  const [activeTab, setActiveTab] = useState("nearby");
  const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate()
   const {user} = useCurrentUser()
   const {Providerdata} = UserProviderdata()
  const processedMesses = useMemo(() => {
    if (!AllMESS) return [];
    return AllMESS
      .map(mess => {
        const dist = calculateDistance(userlat, userlng, mess.location?.lat, mess.location?.lng);
        const price = mess.MontlyPrices ? Number(mess.MontlyPrices) : Infinity;
        return { ...mess, calculatedDistance: parseFloat(dist) || 0, sortPrice: price };
      })
      .filter(mess => {
        if (!mess.messVerified) return false;
        const query = searchQuery.toLowerCase();
        const matchesSearch = mess.identity?.name?.toLowerCase().includes(query) ||
          mess.location?.city?.toLowerCase().includes(query);
        let matchesTab = true;
        if (activeTab === "veg") matchesTab = mess.identity?.dietaryType === "Pure Veg";
        return matchesSearch && matchesTab;
      })
      .sort((a, b) => activeTab === "price" ? a.sortPrice - b.sortPrice : a.calculatedDistance - b.calculatedDistance)
      .slice(0, 3);
  }, [AllMESS, searchQuery, activeTab, userlat, userlng]);

  return (
    <div className="min-h-screen bg-[#FDFDFD]  text-slate-900 font-sans">

      {/* HERO & SEARCH SECTION */}
      <section className="max-w-7xl mx-auto px-4 mt-8 md:mt-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
            Premium Messes <br className="hidden md:block" />
            <span className="text-orange-500 underline decoration-orange-200">Near Your Location</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">Verified hygienic messes within {processedMesses[0]?.calculatedDistance || '...'} km</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by mess name, city or landmark..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 focus:border-orange-500 outline-none transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 overflow-x-auto no-scrollbar">
            {['nearby', 'veg', 'price'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* MESS GRID */}
        {/* MESS GRID - SHOWING ONLY 2 FOR THE "NEARBY" FOCUS */}

        {/* MESS GRID - COMPACT MOBILE OPTIMIZED */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
          {isLoading ? (
            [1, 2].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[2.5rem]"></div>)
          ) : processedMesses.slice(0, 2).map((mess) => (
            <div key={mess.id} className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden active:scale-[0.98] transition-all">

              {/* 1. MAP-STYLE ROUTE HEADER */}
              <div className="h-40 bg-slate-50 relative flex items-center justify-between px-8 overflow-hidden">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-[0.05] bg-[path('M0_0h16v16H0z')] bg-[length:16px_16px] [background-image:linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]"></div>

                {/* User Node (Start) */}
                <div className="relative z-10 flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping absolute"></div>
                    <MapPin className="w-5 h-5 text-slate-900 relative z-10" />
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">YOU</span>
                </div>

                {/* CURVED PATH SVG (Inspired by your image) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-20">
                  <svg width="100%" height="60" viewBox="0 0 100 40" fill="none" preserveAspectRatio="none" className="overflow-visible">
                    <path
                      d="M0 20 C 25 0, 75 40, 100 20"
                      stroke="#f97316"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      className="animate-[dash_20s_linear_infinite]"
                    />
                    {/* Moving Dot on Path */}
                    <circle r="3" fill="#f97316">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M0 20 C 25 0, 75 40, 100 20" />
                    </circle>
                  </svg>

                  {/* Floating Distance Tooltip */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-3 py-1 rounded-full shadow-lg border-2 border-white">
                    <span className="text-[10px] font-black italic whitespace-nowrap">{mess.calculatedDistance} KM</span>
                  </div>
                </div>

                {/* Mess Node (Destination) */}
                <div className="relative z-10 flex flex-col items-center gap-1.5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-all duration-500">
                    <img
                      src={mess.media?.cover || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                      className="w-full h-full object-cover"
                      alt="mess"
                    />
                  </div>
                  <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">MESS</span>
                </div>
              </div>

              {/* 2. INFO SECTION */}
              <div className="p-6 pt-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xl font-bold text-slate-900 leading-none tracking-tight">
                        {mess.identity?.name}
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Navigation className="w-3 h-3" />
                      <p className="text-[11px] font-medium truncate w-40 italic">
                        {mess.location?.landmark}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-lg border border-green-100">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[11px] font-black">4.8</span>
                  </div>
                </div>

                {/* 3. CLEAN ACTION AREA */}
                <div className="flex items-center gap-3">
                  <button onClick={() => navigate(user || Providerdata ? `/mess/${mess._id}` : `/auth`)} className="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-orange-600 transition-all shadow-lg shadow-slate-200">
                    View Menu <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className={`px-4 py-3 rounded-2xl border-2 flex items-center justify-center ${mess.identity?.dietaryType === 'Pure Veg'
                      ? 'border-green-100 bg-green-50 text-green-600'
                      : 'border-red-100 bg-red-50 text-red-600'
                    }`}>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{mess.identity?.dietaryType}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default MessOrbitDashboard;