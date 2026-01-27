import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Star, MapPin, Clock, Phone,
  ChevronRight, Navigation,
  UserCheck, ShieldCheck, Utensils, Image as ImageIcon,
  Coffee, Moon, MessageSquare, IndianRupee, AlertCircle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GetALLmess } from "@/hooks/MessData";
import { calculateDistance } from "./components/Distance";
import { useStateContex } from "@/context/State";
import { useCurrentUser } from "@/hooks/user-hook";

const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse rounded-md bg-slate-200", className)} />
);

export default function MessDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams();
  const { AllMESS } = GetALLmess();
  const mess = AllMESS?.find((mess) => mess._id === id);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dineout");
  const { userlat, userlng } = useStateContex();

  const monthlyPrice = mess?.MontlyPrices || 0
  const isMonthlyAvailable = monthlyPrice && Number(monthlyPrice) > 0;
  const { user } = useCurrentUser()
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const { axioseInstace } = useStateContex()
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const formatIndianTime = (time: string) => {
    if (!time) return "";
    // Check if it's already in 12hr format
    if (time.includes('AM') || time.includes('PM')) return time;

    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  const openMaps = () => {
    if (mess?.location) {
      const { lat, lng } = mess.location;
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32 font-sans">
      {/* Full Image Lightbox - Premium Version */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          {/* Top Bar for Actions */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
            <div className="text-white/70 text-sm font-medium">
              Viewing Photo
            </div>
            <div className="flex gap-4">
              {/* Optional Download Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const link = document.createElement('a');
                  link.href = selectedImg;
                  link.download = 'mess-image.jpg';
                  link.click();
                }}
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
              >
                <Navigation className="w-5 h-5 rotate-180" /> {/* Using Navigation icon as a download proxy or use a Download icon */}
              </button>

              <button
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-500 transition-all active:scale-90"
                onClick={() => setSelectedImg(null)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative w-full max-w-4xl px-4 flex items-center justify-center">
            <img
              src={selectedImg}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500 ease-out"
              alt="Full view"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </div>

          {/* Bottom Hint */}
          <div className="absolute bottom-10 animate-pulse">
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
              Tap anywhere to dismiss
            </p>
          </div>
        </div>
      )}
      <div className="relative group overflow-hidden bg-slate-200 h-[350px] md:h-[450px]">
        {!mess ? (
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
        <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden mb-6 bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-600 text-white px-2 py-0.5 rounded-md text-sm flex items-center gap-1 font-bold">
                      <Star className="w-3.5 h-3.5 fill-white" /> {mess?.rating || "4.1"}
                    </div>
                    <span className="text-slate-500 text-xs font-bold">•
                      {isMonthlyAvailable ? ` ₹${monthlyPrice} Monthly` : " Price on request"}
                    </span>
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


        <div className="transition-all duration-300">
          {activeTab === "dineout" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section>
                <h3 className="text-xl ml-2 font-black text-slate-800 mb-4 flex items-center gap-2">
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
                        {mess?.location?.address}, {mess?.location?.city} {mess?.location?.state}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 pt-2 border-t border-slate-50">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">
                          <span className="font-black text-slate-700">Landmark:</span> {mess?.location?.landmark}
                        </p>
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
                        {formatIndianTime(mess?.identity?.startTime)} — {formatIndianTime(mess?.identity?.endTime)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-orange-100 text-orange-700 border-none font-black uppercase text-[10px] px-3 py-1 rounded-lg">{mess?.identity?.operatingMode}</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 border-none font-black uppercase text-[10px] px-3 py-1 rounded-lg">{mess?.identity?.dietaryType}</Badge>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          )}

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
                  {mess.Menu.map((item, index) => (
                    <div key={index} className="break-inside-avoid mb-4">
                      <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
                        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-50">
                          <div className="flex items-center gap-2">
                            {item.types === "breakfast" ? <Coffee className="w-4 h-4 text-orange-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                            <span className="text-sm font-black text-slate-800 uppercase">{item.types}</span>
                          </div>
                        </div>
                        <img src={item.imageUrl} className="w-full h-auto block" alt={item.types} />
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-slate-100">
                  <Utensils className="w-10 h-10 text-slate-100 mb-4" />
                  <p className="text-slate-400 font-bold text-sm uppercase">Menu is empty</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "photos" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in slide-in-from-bottom-4 duration-500">
              {Object.entries(mess?.media || {}).map(([key, url]) => (
                url && (
                  <div
                    key={key}
                    onClick={() => setSelectedImg(String(url))} // Click to open
                    className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border-2 border-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-zoom-in group"
                  >
                    <img
                      src={String(url)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={key}
                    />
                  </div>
                )
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 animate-in fade-in duration-500 max-w-2xl mx-auto">
              {mess?.UserFeedBack?.length > 0 ? (
                mess.UserFeedBack.map((review, idx) => (
                  <Card key={idx} className="rounded-[24px] border-none shadow-sm p-5 bg-white">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center font-black text-slate-400">
                        {review.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-black text-slate-900">{review.username}</h4>
                          <div className="bg-emerald-600 text-white px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] font-black">
                            {review.ratingInStar} <Star className="w-2.5 h-2.5 fill-white" />
                          </div>
                        </div>
                        <p className="text-[13px] text-slate-600 mt-2">{review.Text}</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="py-20 text-center bg-white rounded-[32px]">
                  <p className="text-slate-400 font-black text-[10px] uppercase">No feedback yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {!loading && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <div className="container mx-auto max-w-5xl flex items-center justify-between gap-4">
            {isMonthlyAvailable ? (
              <>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Monthly Subscription</p>
                  <div className="flex items-baseline gap-1">
                    <IndianRupee className="w-4 h-4 text-slate-900" />
                    <p className="text-2xl font-black text-slate-900">{monthlyPrice}</p>
                  </div>
                </div>

                <Button onClick={() => navigate(`/pass/${id}`)} size="lg" className="rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black px-8 h-14 shadow-lg shadow-orange-200">
                  GET PASS <ChevronRight className="ml-1 w-5 h-5" />
                </Button>

              </>
            ) : (
              <div className="flex items-center gap-3 bg-slate-50 w-full p-3 rounded-2xl border border-dashed border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-700 uppercase">Monthly Subscription</p>
                  <p className="text-[11px] font-bold text-slate-400">Not currently available for this mess</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}