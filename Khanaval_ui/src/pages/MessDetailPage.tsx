import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Star, MapPin, Clock, Phone,
  CheckCircle, ChevronRight, Share2, Heart, Navigation,
  UserCheck, ShieldCheck
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
  console.log(mess)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const { userlat, userlng } = useStateContex()
  const openMaps = () => {
    if (mess?.location) {
      const { lat, lng } = mess.location;
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      {/* Hero Image */}
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

      <div className="container mx-auto px-4 max-w-5xl -mt-16 relative z-10">
        <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden">
          <CardContent className="p-8">
            {/* 1. Header & Location Section */}
            <div className="flex flex-col md:flex-row justify-between gap-6 pb-8 border-b border-slate-100">
              <div className="space-y-4 flex-1">
                {loading ? (
                  <Skeleton className="h-10 w-3/4" />
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 font-bold">
                        <CheckCircle className="w-3 h-3 mr-1" /> FSSAI Certified
                      </Badge>
                      {mess?.MessRegister && (
                        <Badge className="bg-blue-50 text-blue-600 border-none px-3 font-bold">
                          <ShieldCheck className="w-3 h-3 mr-1" /> Verified Provider
                        </Badge>
                      )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-slate-900">{mess?.identity?.name}</h1>

                    <div className="flex items-start gap-2 text-slate-500">
                      <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-slate-700">{mess?.location?.houseNo}, {mess?.location?.society}</p>
                        <p className="text-sm">{mess?.location?.address}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          {/* Distance Badge */}
                          <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm">
                            <Navigation className="w-3.5 h-3.5 fill-orange-600" />
                            <span className="text-xs font-black tracking-tight">
                              {calculateDistance(userlat, userlng, mess?.location?.lat, mess?.location?.lng)} KM AWAY
                            </span>
                          </div>

                          {/* Landmark Badge */}
                          {mess?.location?.landmark && (
                            <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200">
                              <MapPin className="w-3.5 h-3.5" />
                              <p className="text-xs font-bold capitalize">
                                Near {mess?.location?.landmark}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {!loading && (
                <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 text-center min-w-[180px]">
                  <p className="text-xs font-black text-orange-600 uppercase mb-1">Monthly Plan</p>
                  <div className="flex items-baseline justify-center gap-1 text-orange-600">
                    <span className="text-xl font-bold">₹</span>
                    <span className="text-4xl font-black">4000</span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Owner / Provider Details Section */}
            {!loading && (
              <div className="py-8 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-500" /> Managed By
                </h3>
                <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-50 p-5 rounded-2xl gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xl capitalize">
                      {mess?.providerId.OwnerName?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-tighter">Owner Name</p>
                      <p className="text-lg font-black text-slate-800 capitalize">{mess?.providerId.OwnerName}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3 ">
                    <a href={`tel:${mess?.providerId?.number}`} className="flex-1">
                      <Button variant="outline" className=" rounded-xl w-60 border-slate-200  gap-2 font-bold text-slate-700">
                        <Phone className="w-4 h-4" />{mess?.providerId?.number}
                      </Button>
                    </a>
                    <Button onClick={openMaps} variant="secondary" className="rounded-xl gap-2 w-full font-bold">
                      <Navigation className="w-4 h-4" /> Directions
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Features / Dietary Tags */}
            <div className="flex flex-wrap gap-3 pt-6">
              {!loading && (
                <div className="flex gap-5">
                  <div className="flex items-center gap-2 text-[13px] bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm text-slate-700 font-bold">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    {mess?.identity?.dietaryType}
                  </div>
                  <div className="flex items-center gap-2 text-[13px] bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm text-slate-700 font-bold">
                    <div className="w-2 h-2 rounded-full  bg-emerald-500" />
                    {mess?.identity?.operatingMode}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Bottom Bar */}
      {!loading && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-t border-slate-100 p-4">
          <div className="container mx-auto max-w-5xl flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase">Per Meal</p>
              <p className="text-2xl font-black">₹150.00</p>
            </div>
            <div className="flex-1 flex justify-end gap-3">
              <Button size="lg" variant="outline" className="rounded-2xl font-bold hidden md:flex">
                Ask a Question
              </Button>
              <Link to="/epass" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-64 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black">
                  Subscribe & Get Pass <ChevronRight className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}