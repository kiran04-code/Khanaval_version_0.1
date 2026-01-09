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
  Search, Bell, User, Wallet, MapPin, Filter,
  ChevronDown, Clock, QrCode, Package, Utensils,
  History, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- SKELETON COMPONENT (If not already in UI folder) ---
const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse rounded-md bg-slate-200", className)} />
);

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

// --- HELPER COMPONENTS ---
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
  const [loading, setLoading] = useState(true); // Loading state
  const activeSub = mySubscriptions[0];

  // Dummy 3-second loader effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-6">
            <Link to="/" className="md:w-[230px] w-[200px] md:h-fit">
              <img src="/logo.png" alt="logo" className="" />
            </Link>

            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search for 'Homemade Thali'..."
                  className="pl-10 bg-slate-100/80 border-none rounded-2xl h-11"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end mr-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none mb-1">Credits</span>
                {loading ? <Skeleton className="h-4 w-16" /> : <span className="text-sm font-bold text-slate-900">₹540.00</span>}
              </div>
              <Button variant="outline" size="icon" className="rounded-2xl relative">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-2xl bg-orange-100 overflow-hidden">
                {loading ? <Skeleton className="w-full h-full" /> : <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* WELCOME SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            {loading ? (
              <>
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-48" />
              </>
            ) : (
              <>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Good Afternoon, Rahul! 👋</h1>
                <button className="text-slate-500 flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  Koramangala, 4th Block, Bangalore
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </button>
              </>
            )}
          </div>
          {!loading && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl"><History className="w-4 h-4 mr-2" /> History</Button>
              <Button variant="default" size="sm" className="rounded-xl bg-slate-900 text-white"><Wallet className="w-4 h-4 mr-2" /> Recharge</Button>
            </div>
          )}
        </div>

        {/* ACTIVE E-PASS CARD */}
        {loading ? (
          <Skeleton className="h-40 w-full rounded-3xl mb-10" />
        ) : (
          activeSub && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 p-6 mb-10 text-white shadow-xl shadow-orange-200">
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
                      <span className="text-orange-50 text-xs font-medium">Valid till {activeSub.validUntil}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 md:border-l md:border-white/20 md:pl-8">
                  <div className="text-center md:text-left">
                    <p className="text-4xl font-black leading-none">{activeSub.mealsLeft}</p>
                    <p className="text-[10px] text-orange-100 uppercase font-bold mt-1">Meals Left</p>
                  </div>
                  <Button className="bg-white text-orange-600 font-bold px-8 py-6 rounded-2xl">View Pass</Button>
                </div>
              </div>
            </div>
          )
        )}

        {/* EXPLORE TABS */}
        <Tabs defaultValue="nearby-mess" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-slate-200 pb-2">
            <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start">
              <TabsTrigger value="nearby-mess" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-slate-900 text-slate-500 font-bold pb-4">Nearby Mess</TabsTrigger>
              <TabsTrigger value="tiffin" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-slate-900 text-slate-500 font-bold pb-4">Tiffin Services</TabsTrigger>
              <TabsTrigger value="orders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-slate-900 text-slate-500 font-bold pb-4">Recent Orders</TabsTrigger>
            </TabsList>
            {!loading && (
              <Button variant="ghost" className="text-orange-600 font-bold">
                <Filter className="w-4 h-4 mr-2" /> Advanced Filters
              </Button>
            )}
          </div>

          <TabsContent value="nearby-mess">
            <div className="flex gap-2 overflow-x-auto pb-6">
              <QuickActionBadge icon={Sparkles} label="Popular Near You" active />
              <QuickActionBadge icon={Utensils} label="Pure Veg" active={undefined} />
              <QuickActionBadge icon={Clock} label="Under 15 Mins" active={undefined} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full rounded-2xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              ) : (
                nearbyMesses.map((mess) => <MessCard key={mess.id} {...mess} />)
              )}
            </div>
          </TabsContent>

          {/* SIMILAR LOGIC FOR TIFFIN & ORDERS */}
          <TabsContent value="tiffin">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)
              ) : (
                tiffinServices.map((t) => <TiffinCard key={t.id} {...t} />)
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
             <div className="max-w-3xl mx-auto space-y-4">
               {loading ? (
                 Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)
               ) : (
                 recentOrders.map((order) => (
                   <Card key={order.id} className="border-slate-100 rounded-2xl">
                     <CardContent className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center"><Package /></div>
                           <div><h4 className="font-bold">{order.providerName}</h4><p className="text-xs text-slate-400">{order.date}</p></div>
                        </div>
                        <div className="text-right"><p className="font-black">₹{order.total}</p></div>
                     </CardContent>
                   </Card>
                 ))
               )}
             </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}