import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Users,
  CheckCircle,
  ChevronRight,
  Calendar,
  Share2,
  Heart,
  Image as ImageIcon,
  RefreshCcw,
  Sparkles,
  Navigation,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const messData = {
  id: "1",
  name: "Sharma's Kitchen",
  tagline: "Authentic North Indian Home Food",
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
  menuImageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800",
  lastUpdated: "2h ago",
  weekRange: "Jan 12 - Jan 18",
  rating: 4.5,
  totalRatings: 234,
  distance: "0.5 km",
  timing: "7AM - 10PM",
  monthlyPrice: 3000,
  weeklyPrice: 950,
  dailyPrice: 150,
  amenities: ["AC Dining", "Pure Veg", "Hygienic"],
  menu: {
    monday: {
      breakfast: ["Poha", "Tea/Coffee"],
      lunch: ["Dal Fry", "Roti (4)", "Rice", "Aloo Gobi"],
      dinner: ["Paneer Masala", "Roti (4)", "Jeera Rice"]
    },
    tuesday: {
      breakfast: ["Upma", "Tea/Coffee"],
      lunch: ["Rajma", "Rice", "Roti", "Salad"],
      dinner: ["Mix Veg", "Roti", "Dal Tadka"]
    },
    // ... add other days similarly
  }
};

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

export default function MobileMessDetail() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [isLiked, setIsLiked] = useState(false);
  
  // Auto-select current day
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });

  return (
    <div className="min-h-screen bg-slate-50 pb-32 selection:bg-orange-100">
      
      {/* 1. MOBILE IMAGE HEADER (Sticky Back Button) */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img 
          src={messData.image} 
          className="h-full w-full object-cover" 
          alt="Mess Hero" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-30">
          <Link to="/dashboard">
            <Button size="icon" variant="secondary" className="rounded-2xl bg-white/20 backdrop-blur-xl border-white/20 text-white shadow-2xl">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button size="icon" variant="secondary" className="rounded-2xl bg-white/20 backdrop-blur-xl border-white/20 text-white">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              onClick={() => setIsLiked(!isLiked)}
              className={cn("rounded-2xl bg-white/20 backdrop-blur-xl border-white/20 transition-colors", isLiked ? "text-red-500" : "text-white")}
            >
              <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
            </Button>
          </div>
        </div>

        {/* Hero Text Over Image */}
        <div className="absolute bottom-6 left-6 right-6">
           <Badge className="mb-3 bg-orange-500 text-white border-none px-3 py-1 font-black uppercase text-[10px] tracking-widest animate-pulse">
             Menu Updated
           </Badge>
           <h1 className="text-3xl font-black text-white leading-none mb-2">{messData.name}</h1>
           <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold">{messData.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold">{messData.distance}</span>
              </div>
           </div>
        </div>
      </div>

      {/* 2. QUICK ACTIONS BAR (Mobile Optimized) */}
      <div className="grid grid-cols-4 bg-white border-b border-slate-100 py-4 px-2">
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-active:scale-90 transition-transform">
            <Navigation className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Route</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 rounded-2xl bg-green-50 text-green-600 group-active:scale-90 transition-transform">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Call</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 group-active:scale-90 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Chat</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 rounded-2xl bg-orange-50 text-orange-600 group-active:scale-90 transition-transform">
            <ImageIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Menu Pic</span>
        </button>
      </div>

      {/* 3. MENU SECTION */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Weekly Menu</h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <RefreshCcw className="w-3 h-3" /> Updated {messData.lastUpdated}
          </span>
        </div>

        <Tabs defaultValue={currentDay} className="w-full">
          {/* Day Selector - Scrollable on mobile */}
          <TabsList className="flex w-full h-auto p-1 bg-slate-100 rounded-[20px] mb-6 overflow-x-auto no-scrollbar">
            {days.map((day, idx) => (
              <TabsTrigger 
                key={day} 
                value={day} 
                className="flex-1 min-w-[50px] py-3 rounded-2xl data-[state=active]:bg-white data-[state=active]:text-orange-600 font-black text-xs"
              >
                {dayLabels[idx]}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Meal Cards */}
          {days.map((day) => (
            <TabsContent key={day} value={day} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 outline-none">
              {["breakfast", "lunch", "dinner"].map((mealType) => (
                <div key={mealType} className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                    {mealType === "breakfast" ? "🍳" : mealType === "lunch" ? "🍱" : "🍛"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">{mealType}</h4>
                      <Clock className="w-3 h-3 text-slate-300" />
                    </div>
                    <p className="text-slate-600 font-bold text-sm leading-relaxed">
                      {(messData.menu[day]?.[mealType] || ["Coming Soon"]).join(" • ")}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* 4. SUBSCRIPTION PICKER (Horizontal Cards) */}
      <div className="mt-10 px-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-4">Choose Subscriptions</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 snap-x">
          {[
            { id: "daily", label: "Daily", price: messData.dailyPrice, save: "" },
            { id: "weekly", label: "Weekly", price: messData.weeklyPrice, save: "Save ₹100" },
            { id: "monthly", label: "Monthly", price: messData.monthlyPrice, save: "Best Value" }
          ].map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                "min-w-[160px] p-5 rounded-[32px] snap-center transition-all border-2",
                selectedPlan === plan.id 
                  ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-300" 
                  : "bg-white border-slate-100 text-slate-900 shadow-sm"
              )}
            >
              <p className={cn("text-[10px] font-black uppercase tracking-tighter mb-1", selectedPlan === plan.id ? "text-orange-400" : "text-slate-400")}>
                {plan.label}
              </p>
              <div className="flex items-baseline gap-0.5 mb-3">
                <span className="text-sm font-bold">₹</span>
                <span className="text-2xl font-black">{plan.price}</span>
              </div>
              {plan.save && (
                <span className={cn("text-[9px] font-black px-2 py-1 rounded-lg uppercase", 
                  selectedPlan === plan.id ? "bg-white/10 text-orange-300" : "bg-orange-50 text-orange-600")}>
                  {plan.save}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. FIXED MOBILE ACTION BAR (The Bottom Sheet Style) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-slate-100 px-6 py-5 z-50 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-6 max-w-lg mx-auto">
          <div className="shrink-0">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Amount</p>
            <div className="flex items-baseline gap-1 text-slate-900">
              <span className="text-sm font-bold">₹</span>
              <span className="text-2xl font-black tracking-tight">
                {selectedPlan === 'monthly' ? messData.monthlyPrice : selectedPlan === 'weekly' ? messData.weeklyPrice : messData.dailyPrice}
              </span>
            </div>
          </div>
          <Link to="/checkout" className="flex-1">
            <Button className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-lg shadow-xl shadow-orange-200 transition-transform active:scale-95">
              Pay & Subscribe
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}