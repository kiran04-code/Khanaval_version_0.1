import React, { useState, Suspense, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, Bell, MapPin, ChevronDown, QrCode, 
  Home, User, Navigation, X, Beef, Leaf, IndianRupee 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GetALLmess } from "@/hooks/MessData";
import { useStateContex } from "@/context/State";
import { calculateDistance } from "./components/Distance";
import { useCurrentUser } from "@/hooks/user-hook";

const MessCard = React.lazy(() => import("./components/MessCard"));

// --- SKELETON COMPONENT ---
const MessCardSkeleton = () => (
  <div className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 shrink-0 snap-center">
    <div className="bg-white rounded-[2rem] p-4 h-[350px] shadow-sm animate-pulse flex flex-col gap-4 border border-slate-50">
      <div className="bg-slate-200 h-[40%] w-full rounded-[1.5rem]" />
      <div className="space-y-3 px-2 flex-1">
        <div className="h-5 bg-slate-200 rounded-md w-3/4" />
        <div className="h-3 bg-slate-100 rounded-md w-1/2" />
        <div className="h-8 bg-slate-50 rounded-xl w-full mt-4" />
      </div>
    </div>
  </div>
);

// --- REUSABLE TAB COMPONENT ---
const QuickActionBadge = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap border-2 shrink-0",
      active
        ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200 scale-105"
        : "bg-white border-slate-100 text-slate-500 hover:border-orange-200"
    )}
  >
    <Icon className={cn("w-4 h-4", active ? "text-white" : "text-orange-500")} />
    {label}
  </button>
);

export default function UserDashboard() {
  const navigate = useNavigate();
  const { AllMESS, isLoading } = GetALLmess(); 
  const { user } = useCurrentUser(); 

  const { userlat, userlng } = useStateContex(); 
  const [activeTab, setActiveTab] = useState("nearby"); 
  const [searchQuery, setSearchQuery] = useState("");

  const processedMesses = useMemo(() => {
    if (!AllMESS) return [];
    
    return AllMESS
      .map(mess => {
        const dist = calculateDistance(userlat, userlng, mess.location?.lat, mess.location?.lng);
        // Ensure price is a number for sorting, default to infinity if no price to put them at the end
        const price = mess.MontlyPrices ? Number(mess.MontlyPrices) : Infinity;
        return { ...mess, calculatedDistance: parseFloat(dist) || 0, sortPrice: price };
      })
      .filter(mess => {
        if (!mess.messVerified) return false;
        
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          mess.identity?.name?.toLowerCase().includes(query) || 
          mess.location?.landmark?.toLowerCase().includes(query) ||
          mess.location?.society?.toLowerCase().includes(query) ||
          mess.location?.city?.toLowerCase().includes(query);

        let matchesTab = true;
        if (activeTab === "veg") matchesTab = mess.identity?.dietaryType === "Pure Veg";
        if (activeTab === "nonveg") matchesTab = mess.identity?.dietaryType === "Pure Non-Veg" || mess.identity?.dietaryType === "Veg & Non-Veg";
        // "price" and "nearby" tabs show all types but affect sorting below
        
        return matchesSearch && matchesTab;
      })
      .sort((a, b) => {
        // Primary Sort Logic
        if (activeTab === "price") {
          return a.MontlyPrices - b.MontlyPrices;
        }
        // Default sort by distance
        return a.calculatedDistance - b.calculatedDistance;
      }); 
  }, [AllMESS, searchQuery, activeTab, userlat, userlng]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-24 md:pb-12">
      
      {/* --- DESKTOP HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100/60 hidden md:block">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-10">
          <Link to="/" className="w-[170px]">
            <img src="/logo.png" alt="logo" className="w-full h-auto" />
          </Link>

          <div className="flex-1 max-w-3xl flex items-center bg-slate-50 rounded-[1.25rem] border border-slate-100 p-1">
            <button className="flex items-center gap-2 px-4 py-2 border-r border-slate-200 text-slate-700 min-w-[180px]">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-sm font-bold truncate">Current Location</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by mess name, society or landmark..." 
                className="pl-12 bg-transparent border-none shadow-none focus-visible:ring-0 h-11 text-sm font-medium" 
              />
              {searchQuery && (
                <X 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 cursor-pointer hover:text-slate-600" 
                  onClick={() => setSearchQuery("")}
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50"><Bell className="w-5 h-5" /></Button>
            {user && (
              <div 
                className="w-10 h-10 rounded-2xl bg-orange-100 cursor-pointer overflow-hidden border-2 border-white shadow-md" 
                onClick={() => navigate("/profile")}
              >
                 <img src={user ? `${user?.imageUrl}` : "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80" } alt="user" /> 
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden sticky top-0 z-50 bg-white px-4 pt-4 pb-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <Link to="/" className="w-[140px]">
            <img src="/logo.png" alt="logo" className="w-full h-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <Button onClick={()=>navigate("/Annousment")} variant="ghost" size="icon" className="rounded-full"><Bell className="w-5 h-5" /></Button>
            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden" onClick={() => navigate("/profile")}>
              <img src={user ? `${user?.imageUrl}` : "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80" } alt="user" />
            </div>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messes..." 
            className="pl-11 bg-slate-100/80 border-none rounded-2xl h-12 text-sm" 
          />
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 pt-6 md:pt-10 max-w-7xl">
        
        {/* --- TABS / FILTERS --- */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0">
          <QuickActionBadge 
            icon={Navigation} 
            label="Nearby" 
            active={activeTab === "nearby"} 
            onClick={() => setActiveTab("nearby")} 
          />
          <QuickActionBadge 
            icon={IndianRupee} 
            label="Lowest Price" 
            active={activeTab === "price"} 
            onClick={() => setActiveTab("price")} 
          />
          <QuickActionBadge 
            icon={Leaf} 
            label="Pure Veg" 
            active={activeTab === "veg"} 
            onClick={() => setActiveTab("veg")} 
          />
          <QuickActionBadge 
            icon={Beef} 
            label="Non-Veg" 
            active={activeTab === "nonveg"} 
            onClick={() => setActiveTab("nonveg")} 
          />
        </div>

        {/* --- MESS GRID --- */}
        <div className="
          flex overflow-x-auto gap-5 pb-10 -mx-4 px-4 no-scrollbar
          snap-x-mandatory scroll-smooth
          md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10 md:mx-0 md:px-0 md:overflow-visible md:snap-none
        ">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => <MessCardSkeleton key={i} />)
          ) : processedMesses.length > 0 ? (
            processedMesses.map((mess) => (
              <div 
                key={mess._id} 
                className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 shrink-0 snap-center transition-all duration-500"
              >
                <Suspense fallback={<MessCardSkeleton />}>
                  <MessCard {...mess} />
                </Suspense>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center w-full flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-slate-200" />
              </div>
              <h3 className="text-slate-800 font-bold text-lg">No Messes Found</h3>
              <p className="text-slate-400 text-sm max-w-[250px] mx-auto mt-1">
                Try adjusting your filters or search to find messes in your area.
              </p>
              <Button 
                variant="link" 
                onClick={() => {setSearchQuery(""); setActiveTab("nearby")}}
                className="text-orange-500 font-bold mt-4"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-4 md:hidden flex justify-between items-center">
        <button 
          onClick={() => navigate("/")}
          className="flex flex-col items-center gap-1 text-orange-500 font-bold"
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px]">Explore</span>
        </button>
        <button 
          onClick={() => navigate("/scan-qr")} 
          className="relative -top-8 bg-slate-900 p-4 rounded-full shadow-2xl border-4 border-white active:scale-95 transition-transform"
        >
          <QrCode className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={() => navigate("/profile")} 
          className="flex flex-col items-center gap-1 text-slate-400 font-bold"
        >
          <User className="w-6 h-6" />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </div>
  );
}