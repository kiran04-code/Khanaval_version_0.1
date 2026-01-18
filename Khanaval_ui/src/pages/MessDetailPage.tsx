import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Star, MapPin, Clock, Phone,
  CheckCircle, ChevronRight, Share2, Heart, Navigation,
  UserCheck, ShieldCheck, Utensils, Image as ImageIcon, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GetALLmess } from "@/hooks/MessData";
import { calculateDistance } from "./components/Distance";
import { useStateContex } from "@/context/State";

const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse rounded-md bg-slate-200", className)} />
);

export default function MessDetailPage() {
  const { id } = useParams();
  const { AllMESS } = GetALLmess();
  const mess = AllMESS?.find((mess) => mess._id === id);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dineout"); // NEW: Tab state
  const { userlat, userlng } = useStateContex();
  console.log(mess)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openMaps = () => {
    if (mess?.location) {
      const { lat, lng } = mess.location;
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      {/* Hero Image Section */}
      <div className="relative group overflow-hidden bg-slate-200 h-[350px] md:h-[450px]">
        {loading ? (
          <Skeleton className="w-full h-full rounded-none" />
        ) : (
          <>
            <img src={mess?.media?.cover} alt={mess?.identity?.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          </>
        )}
        <div className="absolute top-4 left-4 z-20">
          <Link to="/dashboard" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-24 relative z-10">
        {/* Floating Reference Card (Wiggy Style) */}
        <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden mb-6">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-600 text-white px-2 py-0.5 rounded-md text-sm flex items-center gap-1 font-bold">
                      <Star className="w-3.5 h-3.5 fill-white" /> {mess?.rating || "4.1"}
                    </div>
                    <span className="text-slate-500 text-xs font-bold">• ₹150 for one</span>
                  </div>
                  <h1 className="text-3xl font-black text-slate-900">{mess?.identity?.name}</h1>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                    {mess?.identity?.dietaryType} • North Indian
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="truncate">{mess?.location?.society}, {mess?.location?.landmark}</span>
              </div>

              <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open now • <span className="text-slate-500 font-medium">TILL {mess?.identity?.endTime}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4 mt-2">
                <Button variant="ghost" className="text-orange-600 font-black gap-2 hover:bg-orange-50 h-12" onClick={() => window.open(`tel:${mess?.providerId?.number}`)}>
                  <Phone className="w-4 h-4" /> CALL
                </Button>
                <Button variant="ghost" className="text-orange-600 font-black gap-2 hover:bg-orange-50 h-12" onClick={openMaps}>
                  <Navigation className="w-4 h-4" /> DIRECTION
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 mb-8 bg-white/50 backdrop-blur-sm sticky top-0 z-20 rounded-xl overflow-hidden">
          {["dineout", "photos", "menu"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-4 text-sm font-black uppercase tracking-widest transition-all",
                activeTab === tab ? "text-orange-600 border-b-4 border-orange-600 bg-orange-50/50" : "text-slate-400"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content Based on Tabs */}
        <div className="transition-all duration-300">
          {activeTab === "dineout" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* MANAGED BY OWNER SECTION */}
              <section>
                <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-blue-500" /> Owner Details
                </h3>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-2xl uppercase shadow-inner">
                      {mess?.providerId?.OwnerName?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Verified Provider</p>
                      <p className="text-xl font-black text-slate-800 capitalize">{mess?.providerId?.OwnerName}</p>
                      <p className="text-[12px] font-black text-slate-800 capitalize">{mess?.providerId?.number}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-50 text-blue-600 border-none px-4 py-1.5 font-black uppercase text-[10px]">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Card className="rounded-[32px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-7 space-y-5 bg-white">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-800 flex items-center gap-2 tracking-tight">
                      <MapPin className="w-5 h-5 text-orange-500" /> Location Details
                    </h4>
                    <Badge variant="outline" className="text-[10px] border-slate-200 text-slate-400 font-bold px-2 py-0">
                      {mess?.location?.postcode}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-lg font-black text-slate-800 leading-tight">
                        {mess?.location?.houseNo}, {mess?.location?.society}
                      </p>
                      <p className="text-sm font-bold text-slate-500 mt-1">
                        {mess?.location?.city}, {mess?.location?.state}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t border-slate-50">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">
                          <span className="font-black text-slate-700">Landmark:</span> {mess?.location?.landmark}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                        <p className="text-[11px] font-medium text-slate-400 leading-tight">
                          {mess?.location?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="rounded-[32px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-7 space-y-6 bg-white">
                  <h4 className="font-black text-slate-800 flex items-center gap-2 tracking-tight">
                    <Clock className="w-5 h-5 text-emerald-500" /> Operating Details
                  </h4>

                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Service Hours</span>
                      <p className="text-sm font-black text-slate-700">
                        {mess?.identity?.startTime} — {mess?.identity?.endTime}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Facilities & Type</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none font-black uppercase text-[10px] px-3 py-1 rounded-lg">
                          {mess?.identity?.operatingMode}
                        </Badge>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-black uppercase text-[10px] px-3 py-1 rounded-lg">
                          {mess?.identity?.dietaryType}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none font-black uppercase text-[10px] px-3 py-1 rounded-lg">
                          Dine-in Available
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          )}

          {activeTab === "photos" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 animate-in slide-in-from-bottom-4 duration-500">
              {[
                { src: mess?.media?.cover, label: "Cover" },
                { src: mess?.media?.dining, label: "Dining Area" },
                { src: mess?.media?.kitchen, label: "Kitchen" },
                { src: mess?.media?.interior, label: "Interior" },
              ]
                .filter((img) => img.src)
                .map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border-2 border-white shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={image.src}
                      alt={image.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-[10px] font-black uppercase tracking-widest">{image.label}</p>
                    </div>
                  </div>
                ))}

              {(!mess?.media?.dining && !mess?.media?.kitchen) && (
                <div className="col-span-2 md:col-span-3 py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem]">
                  <ImageIcon className="w-10 h-10 text-slate-300 mb-2" />
                  <p className="text-slate-400 font-bold text-sm">More photos coming soon</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "menu" && (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              <h3 className="text-2xl font-black text-slate-800">Available Menu</h3>
              {/* Static Example - Map your actual menu items here */}
              <Card className="rounded-3xl border-slate-50 shadow-sm overflow-hidden p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden"><img src={mess?.media?.cover} className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <Badge className="bg-emerald-100 text-emerald-700 border-none text-[9px] font-black uppercase mb-1">Veg Special</Badge>
                    <h5 className="font-black text-slate-800 text-lg">Daily Unlimited Thali</h5>
                    <p className="text-orange-600 font-black text-xl">₹150</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {!loading && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <div className="container mx-auto max-w-5xl flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Monthly Subscription</p>
              <p className="text-2xl font-black text-slate-900">₹4000</p>
            </div>
            <Link to="/epass">
              <Button size="lg" className="rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black px-8 h-14 shadow-lg shadow-orange-200">
                GET PASS <ChevronRight className="ml-1 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}