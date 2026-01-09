import { useState } from "react";
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
  Info,
  Calendar,
  Share2,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

const messData = {
  id: "1",
  name: "Sharma's Kitchen",
  tagline: "Authentic North Indian Home Food",
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
  images: [
    "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
  ],
  distance: "0.5 km",
  rating: 4.5,
  totalRatings: 234,
  isVeg: true,
  timing: "7:00 AM - 10:00 PM",
  phone: "+91 98765 43210",
  address: "123, MG Road, Koramangala, Bangalore - 560034",
  subscribers: 156,
  monthlyPrice: 3000,
  weeklyPrice: 900,
  dailyPrice: 150,
  amenities: ["AC Dining", "Pure Veg", "Hygienic", "Home Style"],
  menu: {
    monday: {
      breakfast: ["Poha", "Tea/Coffee"],
      lunch: ["Dal Fry", "Roti (4)", "Rice", "Aloo Gobi", "Salad"],
      dinner: ["Paneer Butter Masala", "Roti (4)", "Jeera Rice", "Dal Tadka"],
    },
    tuesday: {
      breakfast: ["Upma", "Tea/Coffee"],
      lunch: ["Rajma", "Roti (4)", "Rice", "Bhindi Fry", "Salad"],
      dinner: ["Mix Veg", "Roti (4)", "Pulao", "Dal Makhani"],
    },
    wednesday: {
      breakfast: ["Aloo Paratha", "Curd", "Tea/Coffee"],
      lunch: ["Chole", "Roti (4)", "Rice", "Baingan Bharta", "Salad"],
      dinner: ["Shahi Paneer", "Roti (4)", "Rice", "Yellow Dal"],
    },
    thursday: {
      breakfast: ["Idli", "Sambhar", "Tea/Coffee"],
      lunch: ["Kadhi Pakora", "Roti (4)", "Rice", "Aloo Matar", "Salad"],
      dinner: ["Dal Makhani", "Roti (4)", "Veg Biryani"],
    },
    friday: {
      breakfast: ["Poori Bhaji", "Tea/Coffee"],
      lunch: ["Chana Masala", "Roti (4)", "Rice", "Lauki Sabzi", "Salad"],
      dinner: ["Palak Paneer", "Roti (4)", "Jeera Rice", "Dal Fry"],
    },
    saturday: {
      breakfast: ["Dosa", "Sambhar", "Chutney", "Tea/Coffee"],
      lunch: ["Mixed Dal", "Roti (4)", "Rice", "Cabbage Sabzi", "Salad"],
      dinner: ["Veg Kofta", "Roti (4)", "Pulao", "Dal Tadka"],
    },
    sunday: {
      breakfast: ["Chole Bhature", "Tea/Coffee"],
      lunch: ["Special Thali - Paneer, Dal, 6 Roti, Rice, Dessert"],
      dinner: ["Sunday Special - Chef's Choice"],
    },
  },
};

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MessDetailPage() {
  const { id } = useParams();
  const mess = messData;
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      {/* 1. STICKY HEADER & IMAGE GALLERY */}
      <div className="relative group overflow-hidden bg-slate-200 h-[350px] md:h-[450px]">
        <img src={mess.image} alt={mess.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        
        {/* Navigation Overlays */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
          <Link to="/dashboard" className="w-10 h-10 rounded-full  bg-black flex items-center justify-center text-white hbg-white  transition-all shadow-xl">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex gap-2">
            <Button  size="icon" className="rounded-full  backdrop-blur-md text-white border-none">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full  backdrop-blur-md  border-none text-red-500">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Floating Mini Gallery Button */}
        <div className="absolute bottom-20 right-4 z-20">
          <Button  className=" backdrop-blur-sm border-none rounded-xl text-xs font-bold shadow-lg">
            View all 12 photos
          </Button>
        </div>
      </div>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="container mx-auto px-4 max-w-5xl -mt-16 relative z-10">
        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-100">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none px-3 font-bold">
                    <CheckCircle className="w-3 h-3 mr-1" /> FSSAI Certified
                  </Badge>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-black text-amber-700">{mess.rating}</span>
                    <span className="text-xs text-amber-600/60 font-bold border-l border-amber-200 pl-1.5">{mess.totalRatings} Reviews</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{mess.name}</h1>
                <p className="text-slate-500 font-medium text-lg italic">{mess.tagline}</p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-bold">{mess.distance} away</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-bold">{mess.timing}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-bold">{mess.subscribers} Active Users</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-orange-50 rounded-3xl border border-orange-100 min-w-[180px]">
                <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-1">Monthly Plan</p>
                <div className="flex items-baseline gap-1 text-orange-600">
                  <span className="text-xl font-bold">₹</span>
                  <span className="text-4xl font-black">{mess.monthlyPrice}</span>
                </div>
                <p className="text-[10px] text-orange-400 font-bold uppercase mt-1 italic">Save ₹1500 vs daily</p>
              </div>
            </div>

            {/* Amenities Bar */}
            <div className="flex flex-wrap gap-3 py-6">
              {mess.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm text-slate-700 text-sm font-bold">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  {amenity}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3. MENU SECTION - REDESIGNED FOR SCANABILITY */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Weekly Meal Schedule</h2>
              <p className="text-slate-500 text-sm font-medium">Fresh menu updated every week</p>
            </div>
            <Badge variant="outline" className="rounded-xl px-4 py-2 border-slate-200">
              <Calendar className="w-4 h-4 mr-2 text-orange-500" /> Today: {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            </Badge>
          </div>

          <Tabs defaultValue="monday" className="w-full">
            <TabsList className="w-full h-auto p-1 bg-white border border-slate-200 rounded-[20px] mb-8 overflow-x-auto no-scrollbar shadow-sm">
              {days.map((day, index) => (
                <TabsTrigger 
                  key={day} 
                  value={day} 
                  className="flex-1 py-3 rounded-2xl data-[state=active]:bg-slate-900 data-[state=active]:text-white text-slate-500 font-bold transition-all"
                >
                  {dayLabels[index]}
                </TabsTrigger>
              ))}
            </TabsList>

            {days.map((day) => (
              <TabsContent key={day} value={day} className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { type: "breakfast", icon: "🍳", time: "8:00 AM - 10:00 AM" },
                    { type: "lunch", icon: "🍱", time: "12:30 PM - 2:30 PM" },
                    { type: "dinner", icon: "🍛", time: "7:30 PM - 9:30 PM" }
                  ].map((meal) => (
                    <Card key={meal.type} className="border-none shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden group">
                      <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between group-hover:bg-slate-100/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{meal.icon}</span>
                          <span className="font-black text-slate-900 uppercase tracking-tighter">{meal.type}</span>
                        </div>
                        <Info className="w-4 h-4 text-slate-300" />
                      </div>
                      <CardContent className="p-6">
                        <ul className="space-y-4">
                          {(mess.menu as unknown)[day][meal.type].map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 group/item">
                              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 transition-transform group-hover/item:scale-125" />
                              <span className="text-slate-600 font-bold leading-tight">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                           <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{meal.time}</span>
                           <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* 4. PRICING PLANS - REDESIGNED */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 px-2">Choose Your Pass</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { id: "daily", label: "Daily Pass", price: mess.dailyPrice, period: "1 Day", savings: null },
              { id: "weekly", label: "Weekly Pass", price: mess.weeklyPrice, period: "7 Days", savings: "Save ₹150" },
              { id: "monthly", label: "Monthly Gold", price: mess.monthlyPrice, period: "30 Days", savings: "Save ₹1500" }
            ].map((plan) => (
              <div 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "relative p-6 rounded-[32px] cursor-pointer transition-all duration-300 border-2",
                  selectedPlan === plan.id 
                    ? "bg-slate-900 border-slate-900 text-white scale-105 shadow-2xl shadow-slate-400" 
                    : "bg-white border-slate-100 text-slate-900 hover:border-orange-200 shadow-lg shadow-slate-200/50"
                )}
              >
                {plan.id === "monthly" && (
                  <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-500 border-none">POPULAR</Badge>
                )}
                <p className={cn("text-xs font-black uppercase tracking-widest mb-1", selectedPlan === plan.id ? "text-orange-400" : "text-slate-400")}>
                  {plan.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold">₹</span>
                  <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-4">
                  <Calendar className={cn("w-4 h-4", selectedPlan === plan.id ? "text-orange-400" : "text-orange-500")} />
                  <span className="text-sm font-bold opacity-80">Validity: {plan.period}</span>
                </div>
                {plan.savings && (
                  <p className={cn("mt-4 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full w-fit", 
                    selectedPlan === plan.id ? "bg-white/10 text-orange-300" : "bg-orange-50 text-orange-600")}>
                    {plan.savings}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. FIXED BOTTOM ACTION BAR */}
     {/* FIXED BOTTOM ACTION BAR - RESPONSIVE OPTIMIZED */}
<div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-t border-slate-100 pb-safe">
  <div className="container mx-auto max-w-5xl px-4 py-4 md:py-6">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Price Info: Visible on Desktop, Hidden or Re-styled on Mobile */}
      <div className="hidden sm:block">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
          Subscription starting at
        </p>
        <div className="flex items-baseline gap-1 text-slate-900">
          <span className="text-sm font-bold">₹</span>
          <span className="text-2xl font-black">150.00</span>
          <span className="text-xs text-slate-400 font-bold">/meal avg</span>
        </div>
      </div>

      {/* Action Buttons: Full width on Mobile */}
      <div className="flex w-full sm:w-auto items-center gap-3">
        {/* Call Button: Smaller on mobile to save space */}
        <Button 
          variant="outline" 
          className="h-12 md:h-14 px-4 md:px-6 rounded-2xl border-slate-200 font-bold hover:bg-slate-50 flex-shrink-0"
        >
          <Phone className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Call Mess</span>
        </Button>

        {/* Primary Action: Takes remaining space on mobile */}
        <Link to="/epass" className="flex-1 sm:flex-none">
          <Button className="w-full sm:w-64 h-12 md:h-14 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm md:text-lg shadow-xl shadow-orange-200 transition-transform active:scale-95 flex items-center justify-center">
            <span className="truncate">Subscribe & Get Pass</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 flex-shrink-0" />
          </Button>
        </Link>
      </div>
      
    </div>
  </div>
</div>
    </div>
  );
}