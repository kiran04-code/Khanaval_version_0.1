import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessCard } from "@/components/common/MessCard";
import { TiffinCard } from "@/components/common/TiffinCard";
import {
  Search,
  Bell,
  User,
  Wallet,
  MapPin,
  Filter,
  ChevronDown,
  Clock,
  QrCode,
  Package,
  Utensils,
  History,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const nearbyMesses = [
  { id: "1", name: "Sharma's Kitchen", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400", distance: "0.5 km", monthlyPrice: 3000, rating: 4.5, isVeg: true, timing: "7AM - 10PM" },
  { id: "2", name: "Gupta Bhojanalaya", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400", distance: "0.8 km", monthlyPrice: 2800, rating: 4.3, isVeg: true, timing: "8AM - 9PM" },
  { id: "3", name: "South Spice Kitchen", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400", distance: "1.2 km", monthlyPrice: 3200, rating: 4.7, isVeg: false, timing: "7AM - 11PM" },
  { id: "4", name: "Punjab Da Dhaba", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400", distance: "1.5 km", monthlyPrice: 3500, rating: 4.6, isVeg: false, timing: "6AM - 10PM" },
];

const tiffinServices = [
  { id: "1", name: "Mom's Tiffin", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400", distance: "0.3 km", pricePerMeal: 80, rating: 4.8, isVeg: true, todaysMenu: ["Dal Fry", "Roti", "Rice"] },
  { id: "2", name: "Ghar Ka Khana", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400", distance: "0.6 km", pricePerMeal: 90, rating: 4.5, isVeg: true, todaysMenu: ["Chole", "Puri", "Rice"] },
];

const mySubscriptions = [
  { id: "1", messName: "Sharma's Kitchen", plan: "Monthly", mealsLeft: 24, validUntil: "Jan 31, 2026", status: "active" },
];

const recentOrders = [
  { id: "1", providerName: "Mom's Tiffin", date: "Today, 12:30 PM", items: ["Dal, Roti, Rice"], total: 80, status: "delivered" },
  { id: "2", providerName: "Ghar Ka Khana", date: "Yesterday, 1:00 PM", items: ["Chole, Puri"], total: 90, status: "delivered" },
];

// --- COMPONENTS ---

const QuickActionBadge = ({ icon: Icon, label, active }) => (
  <button className={cn(
    "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap",
    active 
      ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200" 
      : "bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600"
  )}>
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const activeSub = mySubscriptions[0];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-6">
            <Link to="/" className="shrink-0 transition-transform active:scale-95">
              <img src="/logo.png" alt="Khanaval" className="h-8 md:h-10 w-auto" />
            </Link>
            
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  placeholder="Search for 'Homemade Thali' or 'Sharma Mess'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-100/80 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 rounded-2xl h-11"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
               <div className="hidden sm:flex flex-col items-end mr-1">
                 <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none mb-1">Credits</span>
                 <span className="text-sm font-bold text-slate-900">₹540.00</span>
               </div>
               <Button variant="outline" size="icon" className="rounded-2xl relative border-slate-200 hover:bg-orange-50 hover:text-orange-600 transition-all">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-orange-600 border-2 border-white" />
               </Button>
               <Link to="/profile" className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-100 to-orange-200 border border-orange-200 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-orange-500/20 transition-all">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
               </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* WELCOME SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Good Afternoon, Rahul! 👋</h1>
            <button className="text-slate-500 mt-1 flex items-center gap-1.5 hover:text-orange-600 transition-colors text-sm font-medium">
              <MapPin className="w-4 h-4 text-orange-500" /> 
              Koramangala, 4th Block, Bangalore
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-600">
               <History className="w-4 h-4 mr-2" />
               History
             </Button>
             <Button variant="default" size="sm" className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200">
               <Wallet className="w-4 h-4 mr-2" />
               Recharge
             </Button>
          </div>
        </div>

        {/* ACTIVE E-PASS CARD (PRIORITY UI) */}
        {activeSub && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 p-6 mb-10 text-white shadow-xl shadow-orange-200">
            <div className="absolute top-[-20%] right-[-5%] opacity-10">
               <Utensils size={200} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-1">Active Mess Subscription</p>
                  <h2 className="text-2xl font-black">{activeSub.messName}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-white/20">{activeSub.plan}</span>
                    <span className="text-orange-50 text-xs font-medium italic opacity-80 underline underline-offset-4 decoration-orange-300">Valid till {activeSub.validUntil}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8 md:border-l md:border-white/20 md:pl-8">
                <div className="text-center md:text-left">
                  <p className="text-4xl font-black leading-none">{activeSub.mealsLeft}</p>
                  <p className="text-[10px] text-orange-100 uppercase font-bold tracking-tighter mt-1">Meals Left</p>
                </div>
                <Button className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-6 rounded-2xl shadow-lg transition-transform active:scale-95">
                  View Pass
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* EXPLORE TABS */}
        <Tabs defaultValue="nearby-mess" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-slate-200 pb-2">
            <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start">
              <TabsTrigger 
                value="nearby-mess" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 text-slate-500 font-bold pb-4 transition-all"
              >
                Nearby Mess
              </TabsTrigger>
              <TabsTrigger 
                value="tiffin" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 text-slate-500 font-bold pb-4 transition-all"
              >
                Tiffin Services
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 text-slate-500 font-bold pb-4 transition-all"
              >
                Recent Orders
              </TabsTrigger>
            </TabsList>

            <Button variant="ghost" className="text-orange-600 font-bold hover:bg-orange-50 hover:text-orange-700">
               <Filter className="w-4 h-4 mr-2" />
               Advanced Filters
            </Button>
          </div>

          {/* NEARBY MESS CONTENT */}
          <TabsContent value="nearby-mess" className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6">
              <QuickActionBadge icon={Sparkles} label="Popular Near You" active />
              <QuickActionBadge icon={Utensils} label="Pure Veg" active={undefined} />
              <QuickActionBadge icon={Clock} label="Under 15 Mins" active={undefined} />
              <QuickActionBadge icon={Wallet} label="Budget Options" active={undefined} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nearbyMesses.map((mess) => (
                <div key={mess.id} className="group transition-all duration-300 hover:-translate-y-1">
                  <MessCard {...mess} />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TIFFIN CONTENT */}
          <TabsContent value="tiffin" className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tiffinServices.map((tiffin) => (
                <div key={tiffin.id} className="transition-all duration-300 hover:-translate-y-1">
                  <TiffinCard {...tiffin} />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ORDERS CONTENT */}
          <TabsContent value="orders" className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="max-w-3xl mx-auto space-y-4">
               {recentOrders.map((order) => (
                 <Card key={order.id} className="border-slate-100 hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                            <Package size={28} />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-900">{order.providerName}</h4>
                            <p className="text-sm text-slate-500 font-medium">{order.items.join(", ")}</p>
                            <p className="text-xs text-slate-400 mt-1">{order.date}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="font-black text-slate-900 text-lg leading-none mb-1">₹{order.total}</p>
                         <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 font-bold uppercase text-[10px]">
                            {order.status}
                         </Badge>
                      </div>
                    </CardContent>
                 </Card>
               ))}
             </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}