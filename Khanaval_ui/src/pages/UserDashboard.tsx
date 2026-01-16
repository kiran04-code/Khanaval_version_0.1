import { useState, useEffect } from "react";
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

// --- QUICK ACTION BADGE ---
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

// --- PREMIUM MESS CARD ---
const MessCard = ({ id, name, image, distance, monthlyPrice, rating, isVeg, timing }) => {
  const navigate = useNavigate();
  return (
    <Card className="group overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(255,145,77,0.15)] hover:-translate-y-2">
      <div className="relative h-56 w-full overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className={cn(
            "px-4 py-1.5 backdrop-blur-md border-none font-black text-[10px] uppercase shadow-xl",
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
          <Button 
            onClick={() => navigate(`/mess/${id}`)}
            className="rounded-2xl bg-slate-900 px-6 py-6 font-bold text-white hover:bg-orange-500 shadow-xl shadow-slate-200"
          >
            View Menu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const nearbyMesses = [
  { id: "1", name: "Sharma's Kitchen", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600", distance: "0.5 km", monthlyPrice: 3000, rating: 4.5, isVeg: true, timing: "7AM - 10PM" },
  { id: "2", name: "Gupta Bhojanalaya", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600", distance: "0.8 km", monthlyPrice: 2800, rating: 4.3, isVeg: true, timing: "8AM - 9PM" },
  { id: "3", name: "South Spice Kitchen", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600", distance: "1.2 km", monthlyPrice: 3200, rating: 4.7, isVeg: false, timing: "7AM - 11PM" },
  { id: "4", name: "Punjab Da Dhaba", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600", distance: "1.5 km", monthlyPrice: 3500, rating: 4.6, isVeg: false, timing: "6AM - 10PM" },
];

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-24 md:pb-12">
      
      {/* --- DESKTOP HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100/60 hidden md:block">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-10">
          <Link to="/" className="md:w-[170px]">
            <img src="/logo.png" alt="logo" className="w-full h-auto" />
          </Link>

          {/* Location & Search Combo */}
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

      {/* --- MOBILE STICKY SEARCH & LOCATION --- */}
      <div className="md:hidden sticky top-0 z-50 bg-white px-4 pt-4 pb-3 shadow-sm border-b border-slate-50">
        <div className="flex items-center justify-between mb-3">
           <img src="/logo.png" alt="logo" className="h-6 w-auto" />
           <Button variant="ghost" size="icon" className="rounded-full"><Bell className="w-5 h-5" /></Button>
        </div>
        
        {/* Mobile Search Bar */}
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
        
        {/* HORIZONTAL FILTERS */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0">
          <QuickActionBadge icon={Sparkles} label="Popular" active={activeTab === "popular"} onClick={() => setActiveTab("popular")} />
          <QuickActionBadge icon={Utensils} label="Pure Veg" active={activeTab === "veg"} onClick={() => setActiveTab("veg")} />
          <QuickActionBadge icon={Clock} label="Fastest" active={activeTab === "fast"} onClick={() => setActiveTab("fast")} />
          <QuickActionBadge icon={Wallet} label="Budget Friendly" active={activeTab === "budget"} onClick={() => setActiveTab("budget")} />
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {loading ? (
             Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-[2.5rem]" />)
          ) : (
            nearbyMesses.map((mess) => (
              <MessCard key={mess.id} {...mess} />
            ))
          )}
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-4 md:hidden flex justify-between items-center">
        <button className="flex flex-col items-center gap-1 text-orange-500 font-bold"><Home className="w-6 h-6" /><span className="text-[10px]">Explore</span></button>
        <div className="relative -top-8 bg-slate-900 p-4 rounded-full shadow-2xl shadow-orange-500/40 border-4 border-white active:scale-95 transition-transform"><QrCode className="w-6 h-6 text-white" /></div>
        <button onClick={()=>navigate("/profile")} className="flex flex-col items-center gap-1 text-slate-400 font-bold"><User className="w-6 h-6" /><span className="text-[10px]" >Profile</span></button>
      </nav>
    </div>
  );
}