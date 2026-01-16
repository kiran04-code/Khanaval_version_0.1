import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, Bell, MapPin, Filter, ChevronDown, Clock, QrCode, 
  Utensils, History, Sparkles, Star, Wallet, Home, User, Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- IMPROVED QUICK ACTION BADGE (Better Touch Targets) ---
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

// --- PREMIUM MESS CARD (Responsive Layout) ---
const MessCard = ({ name, image, distance, monthlyPrice, rating, isVeg, timing }) => (
  <Card className="group overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(255,145,77,0.15)] mt-10 mb-10 hover:-translate-y-2">
    <div className="relative h-56 w-full overflow-hidden">
      <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      
      {/* Overlay Badges */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        <Badge className={cn(
          "px-4 py-1.5 backdrop-blur-md border-none font-black text-[10px] uppercase tracking-tighter shadow-xl",
          isVeg ? "bg-emerald-500/90 text-white" : "bg-rose-500/90 text-white"
        )}>
          {isVeg ? "Pure Veg" : "Non-Veg"}
        </Badge>
        <div className="flex items-center gap-1 rounded-2xl bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs font-black shadow-xl">
          <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
          <span className="text-slate-800">{rating}</span>
        </div>
      </div>
    </div>

    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-orange-500 transition-colors line-clamp-1">{name}</h3>
        <button className="text-slate-300 hover:text-rose-500 transition-colors"><Heart className="w-5 h-5" /></button>
      </div>
      
      <div className="flex items-center gap-4 text-slate-400 mb-6">
        <div className="flex items-center gap-1.5 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">
          <MapPin className="h-3.5 w-3.5 text-orange-500" /> {distance}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">
          <Clock className="h-3.5 w-3.5 text-slate-400" /> {timing}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-5">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly starting</p>
          <p className="text-2xl font-black text-slate-900">₹{monthlyPrice}</p>
        </div>
        <Button className="rounded-2xl bg-slate-900 px-6 py-6 font-bold text-white hover:bg-orange-500 transition-all shadow-xl shadow-slate-200">
          View Menu
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("popular");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-24 md:pb-12">
      
      {/* DESKTOP HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100/60 hidden md:block">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-10">
           <Link to="/" className="md:w-[170px] w-[200px] md:h-fit">
            <img src="/logo.png" alt="logo" className="w-full h-auto" />
          </Link>
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search your favorite mess..." className="pl-12 bg-slate-50 border-none rounded-2xl h-12 w-full focus-visible:ring-2 focus-visible:ring-orange-500/20" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50"><Bell className="w-5 h-5" /></Button>
            <div className="w-10 h-10 rounded-2xl bg-orange-100 cursor-pointer overflow-hidden border-2 border-white shadow-md" onClick={() => navigate("/profile")}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" alt="user" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 pt-6 md:pt-10 max-w-7xl">
        
        {/* MOBILE TOP BAR */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Location</p>
            <div className="flex items-center gap-1 font-black text-slate-900">
              Koramangala <ChevronDown className="w-4 h-4 text-orange-500" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-2xl border-slate-100"><Search className="w-5 h-5" /></Button>
            <Button variant="outline" size="icon" className="rounded-2xl border-slate-100"><Bell className="w-5 h-5" /></Button>
          </div>
        </div>

        {/* ACTIVE E-PASS - "THE WALLET CARD" */}
        

        {/* HORIZONTAL FILTERS - Optimized for Touch */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0">
          <QuickActionBadge icon={Sparkles} label="Popular" active={activeTab === "popular"} onClick={() => setActiveTab("popular")} />
          <QuickActionBadge icon={Utensils} label="Pure Veg" active={activeTab === "veg"} onClick={() => setActiveTab("veg")} />
          <QuickActionBadge icon={Clock} label="Fastest" active={activeTab === "fast"} onClick={() => setActiveTab("fast")} />
          <QuickActionBadge icon={Wallet} label="Budget Friendly" active={undefined} onClick={undefined} />
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {[1, 2, 3, 4].map((i) => (
            <MessCard 
              key={i}
              name={i % 2 === 0 ? "Gupta Bhojanalaya" : "Sharma's Kitchen"}
              image={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&sig=${i}`}
              distance="0.8 km"
              monthlyPrice={2800 + (i * 100)}
              rating={4.5}
              isVeg={i % 2 === 0}
              timing="7 AM - 10 PM"
            />
          ))}
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-4 md:hidden flex justify-between items-center">
        <button onClick={()=>navigate("/profile")} className="flex flex-col items-center gap-1 text-orange-500 font-bold"><Home className="w-6 h-6" /><span className="text-[10px]">Explore</span></button>
        <div className="relative -top-8 bg-slate-900 p-4 rounded-full shadow-2xl shadow-orange-500/40 border-4 border-white"><QrCode className="w-6 h-6 text-white" /></div>
        <button onClick={()=>navigate("/profile")} className="flex flex-col items-center gap-1 text-slate-400 font-bold"><User className="w-6 h-6" /><span className="text-[10px]" >Profile</span></button>
      </nav>
    </div>
  );
}