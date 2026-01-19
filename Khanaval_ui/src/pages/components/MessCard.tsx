import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/user-hook";
import { cn } from "@/lib/utils";
import { 
  Clock, Heart, MapPin, Star, ArrowRight, 
  ShieldCheck, Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { calculateDistance } from "./Distance";
import { useStateContex } from "@/context/State";
import { Getmymess } from "@/hooks/PorviderMess";
import { UserProviderdata } from "@/hooks/Provider";

const MessCard = ({ _id, identity, media, rating, location, messVerified, legal, providerId }) => {
    const { userlat, userlng } = useStateContex();
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    const {Providerdata} = UserProviderdata()
    const distance = calculateDistance(userlat, userlng, location.lat, location.lng);

    return (
        <Card className="group relative overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 active:scale-95 md:hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] h-[420px]">
            
            {/* IMAGE SECTION - Occupies 50% of height */}
            <div className="relative h-1/2 w-full overflow-hidden">
                <img 
                    src={media?.cover} 
                    alt={identity.name} 
                    className="h-full w-full object-cover transition-transform duration-1000 md:group-hover:scale-110" 
                />
                
                {/* Floating Badges (Trust & Type) */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {messVerified && (
                        <div className="bg-emerald-500 text-white py-1 px-2 rounded-lg font-black text-[8px] uppercase tracking-tighter flex items-center gap-1 shadow-lg w-fit">
                            <ShieldCheck className="w-2.5 h-2.5" /> Verified
                        </div>
                    )}
                    <div className="bg-white/90 backdrop-blur-md text-slate-900 py-1 px-2 rounded-lg font-black text-[8px] uppercase tracking-tighter flex items-center gap-1 shadow-lg w-fit">
                        <Utensils className="w-2.5 h-2.5 text-orange-500" /> {identity.dietaryType}
                    </div>
                </div>

                {/* Floating Stats (Distance & Rating) */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md p-1 pr-3 rounded-xl border border-white/10 shadow-2xl">
                        <div className="bg-orange-500 p-1 rounded-lg">
                            <Star className="h-3 w-3 fill-white text-white" />
                        </div>
                        <span className="text-xs font-black text-white">{rating || "4.2"}</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-xl border border-white">
                        <p className="text-[10px] font-black text-slate-800 tracking-tighter">{distance} KM away</p>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION - Compact Layout */}
            <CardContent className="p-5 flex flex-col justify-between h-1/2">
                <div>
                    <div className="flex justify-between items-start">
                        <div className="w-[80%]">
                            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none truncate capitalize group-hover:text-orange-500 transition-colors">
                                {identity.name}
                            </h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">
                                By {providerId?.OwnerName || "Premium Partner"}
                            </p>
                        </div>
                        <Heart className="w-5 h-5 text-slate-200 hover:text-rose-500 cursor-pointer transition-colors shrink-0" />
                    </div>

                    <div className="flex items-center gap-1 mt-3 text-slate-500">
                        <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                        <p className="text-[10px] font-bold truncate leading-none">
                            {location.society}, {location.landmark}
                        </p>
                    </div>

                    {/* Compact Timing & FSSAI Line */}
                    <div className="flex items-center gap-3 mt-4 py-2 border-y border-slate-50">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span className="text-[10px] font-black text-slate-600">{identity.startTime}-{identity.endTime}</span>
                        </div>
                        <div className="w-[1px] h-3 bg-slate-100" />
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-[9px] font-black text-slate-400 uppercase">FSSAI Certified</span>
                        </div>
                    </div>
                </div>

                {/* Main Action Area */}
                <div className="flex items-center justify-between gap-3 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-300 uppercase leading-none">Monthly</span>
                        <span className="text-sm font-black text-slate-800">₹3,500</span>
                    </div>
                    <Button
                        onClick={() => navigate(user || Providerdata ? `/mess/${_id}` : `/auth`)}
                        className="flex-1 rounded-xl bg-slate-900 h-10 font-black text-[10px] text-white hover:bg-orange-500 transition-all shadow-lg group/btn"
                    >
                        VIEW MENU
                        <ArrowRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default React.memo(MessCard);