import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Star, MapPin, Clock, Phone,
  ChevronRight, Navigation,
  UserCheck, ShieldCheck, Utensils, Image as ImageIcon,
  Coffee, Moon, MessageSquare, Calendar, Send,
  ThumbsUp, MessageCircle, MoreHorizontal, Share2
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
  const [activeTab, setActiveTab] = useState("dineout");
  const { userlat, userlng } = useStateContex();

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
    <div className="min-h-screen bg-slate-50/50 pb-32 font-sans">
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
        {/* Floating Reference Card */}
        <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden mb-6 bg-white">
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
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">{mess?.identity?.name}</h1>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                    {mess?.identity?.dietaryType} • {mess?.identity?.operatingMode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="truncate">{mess?.location?.society}, {mess?.location?.landmark}</span>
              </div>

              <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open now • <span className="text-slate-500 font-medium uppercase">TILL {mess?.identity?.endTime}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4 mt-2">
                <Button variant="ghost" className="text-orange-600 font-black gap-2 hover:bg-orange-50 h-12 rounded-2xl" onClick={() => window.open(`tel:${mess?.providerId?.number}`)}>
                  <Phone className="w-4 h-4" /> CALL
                </Button>
                <Button variant="ghost" className="text-orange-600 font-black gap-2 hover:bg-orange-50 h-12 rounded-2xl" onClick={openMaps}>
                  <Navigation className="w-4 h-4" /> DIRECTION
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Selection */}
        <div className="sticky top-2 z-30 px-4 mb-8">
          <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-between">
            {[
              { id: "dineout", label: "Dine", icon: <Utensils className="w-3.5 h-3.5" /> },
              { id: "photos", label: "Photos", icon: <ImageIcon className="w-3.5 h-3.5" /> },
              { id: "menu", label: "Menu", icon: <MessageSquare className="w-3.5 h-3.5" /> },
              { id: "reviews", label: "Review", icon: <Star className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[18px] text-[10px] font-black uppercase tracking-tighter transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-orange-500 text-white shadow-md shadow-orange-100 scale-[1.02]"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="transition-all duration-300">
          {activeTab === "dineout" && (
            <div className="space-y-8 animate-in fade-in duration-500">
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
                      <p className="text-xl font-black text-slate-800 capitalize leading-none mb-1">{mess?.providerId?.OwnerName}</p>
                      <p className="text-[12px] font-black text-slate-800 capitalize leading-none">{mess?.providerId?.number}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-50 text-blue-600 border-none px-4 py-1.5 font-black uppercase text-[10px]">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                </div>
              </section>

              {/* RESTORED: Your original Location layout */}
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
                        <p className="text-[11px] font-medium text-slate-400 leading-tight">{mess?.location?.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                      <p className="text-[12px] px-2 font-medium text-orange-400 leading-tight">
                        {calculateDistance(userlat, userlng, mess?.location?.lat, mess?.location?.lng)} KM AWAY
                      </p>
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
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none font-black uppercase text-[10px] px-3 py-1 rounded-lg">{mess?.identity?.operatingMode}</Badge>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-black uppercase text-[10px] px-3 py-1 rounded-lg">{mess?.identity?.dietaryType}</Badge>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none font-black uppercase text-[10px] px-3 py-1 rounded-lg">Dine-in Available</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 animate-in fade-in duration-500 max-w-2xl mx-auto">
              {mess?.UserFeedBack && mess.UserFeedBack.length > 0 ? (
                mess.UserFeedBack.map((review, idx) => (
                  <Card key={idx} className="rounded-[24px] border-none shadow-sm p-5 bg-white">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center font-black text-slate-400 text-sm">
                        {review.username?.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-1 space-y-1">
                        {/* Header Info */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-black text-slate-900 leading-none">{review.username}</h4>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                              {new Date(review.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                          </div>

                          {/* Rating Badge */}
                          <div className="bg-emerald-600 text-white px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] font-black">
                            {review.ratingInStar} <Star className="w-2.5 h-2.5 fill-white" />
                          </div>
                        </div>

                        {/* Review Text */}
                        <p className="text-[13px] text-slate-600 leading-snug pt-1">
                          {review.Text}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="py-20 text-center bg-white rounded-[32px] border border-slate-50">
                  <MessageSquare className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">No feedback yet</p>
                </div>
              )}
            </div>
          )}
          {/* RESTORED: Your original masonry Menu layout */}
 {activeTab === "menu" && (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex items-center justify-between px-2">
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Today's Menu</h3>
      <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-black text-emerald-600 uppercase">Live</span>
      </div>
    </div>

    {mess?.Menu && mess.Menu.length > 0 ? (
      <div className="columns-1 md:columns-2 gap-4 space-y-4">
        {mess.Menu.map((item, index) => {
          const menuDate = new Date(item?.createdAt);
          const today = new Date();
          const menuMidnight = new Date(menuDate.getFullYear(), menuDate.getMonth(), menuDate.getDate());
          const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

          const yesterday = new Date(todayMidnight);
          yesterday.setDate(yesterday.getDate() - 1);
          const tomorrow = new Date(todayMidnight);
          tomorrow.setDate(tomorrow.getDate() + 1);

          let dayLabel = "";
          const isSameDate = (d1, d2) => 
            d1.getDate() === d2.getDate() && 
            d1.getMonth() === d2.getMonth() && 
            d1.getFullYear() === d2.getFullYear();

          if (isSameDate(menuDate, today)) {
            dayLabel = "Today";
          } else if (isSameDate(menuDate, yesterday)) {
            dayLabel = "Yesterday";
          } else if (isSameDate(menuDate, tomorrow)) {
            dayLabel = "Tomorrow";
          } else if (menuMidnight < yesterday) {
            const diffTime = Math.abs(todayMidnight - menuMidnight);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            dayLabel = `${diffDays} days ago`;
          } else {
            dayLabel = menuDate.toLocaleDateString('en-US', { weekday: 'long' });
          }
          const formattedDate = menuDate.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short' 
          });

          return (
            <div key={index} className="break-inside-avoid mb-4">
              <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white">
                <div className="px-5 py-4 flex items-center justify-between border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    {item.types === "breakfast" ? (
                      <Coffee className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Moon className="w-4 h-4 text-indigo-500" />
                    )}
                    <span className="text-sm font-black text-slate-800 uppercase tracking-wide">
                      {item.types}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-orange-500 uppercase leading-none">
                      {dayLabel}
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                      {formattedDate}
                    </p>
                  </div>
                </div>
                
                <div className="w-full h-auto bg-slate-50">
                  <img 
                    src={item.imageUrl} 
                    className="w-full h-auto block" 
                    alt={item.types} 
                    loading="lazy" 
                  />
                </div>

                <div className="p-4 bg-slate-50/50 flex justify-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Tap image to zoom
                  </p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-slate-100 shadow-inner">
        <Utensils className="w-10 h-10 text-slate-100 mb-4" />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
          Menu is empty
        </p>
      </div>
    )}
  </div>
)}

          {activeTab === "photos" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in slide-in-from-bottom-4 duration-500">
              {Object.entries(mess?.media || {}).map(([key, url]) => (
                url && (
                  <div key={key} className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border-2 border-white shadow-sm hover:shadow-xl transition-all duration-300">
                    <img src={String(url)} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" alt={key} />
                  </div>
                )
              ))}
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
              <p className="text-2xl font-black text-slate-900">₹{mess?.identity?.price || "4000"}</p>
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