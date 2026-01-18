import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/user-hook";
import { cn } from "@/lib/utils";
import { Clock, Heart, MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { calculateDistance } from "./Distance";
import { useStateContex } from "@/context/State";

const MessCard = ({ _id, identity, media, rating, location }) => {
    const { userlat, userlng } = useStateContex();
    const navigate = useNavigate();
    const { user } = useCurrentUser();

    const handleNavigation = () => {
        navigate(user ? `/mess/${_id}` : `/auth`);
    };

    return (
        <Card className="group relative overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 active:scale-95 md:hover:shadow-[0_20px_40px_rgba(255,145,77,0.15)] md:hover:-translate-y-2">
            {/* IMAGE SECTION */}
            <div className="relative h-48 w-full overflow-hidden">
                <img 
                    src={media?.cover} 
                    alt={identity.name} 
                    className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-110" 
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className={cn(
                        "px-3 py-1 backdrop-blur-md border-none font-bold text-[10px] uppercase shadow-lg",
                        identity.dietaryType ? "bg-emerald-500/90 text-white" : "bg-rose-500/90 text-white"
                    )}>
                        {identity.dietaryType ? "Pure Veg" : "Non-Veg"}
                    </Badge>
                    <div className="flex items-center gap-1 rounded-xl bg-white/95 px-2 py-1 text-xs font-black shadow-lg">
                        <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                        <span className="text-slate-800">{rating || "4.0"}</span>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-orange-500 transition-colors line-clamp-1">
                        {identity.name}
                    </h3>
                    <button className="text-slate-300 hover:text-rose-500 transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-3 text-slate-400 mb-4">
                    <div className="flex items-center gap-1 text-[11px] font-bold bg-slate-50 px-2 py-1 rounded-lg">
                        <MapPin className="h-3 w-3 text-orange-500" /> 
                        {calculateDistance(userlat, userlng, location.lat, location.lng)} KM
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold bg-slate-50 px-2 py-1 rounded-lg">
                        <Clock className="h-3 w-3 text-slate-400" /> 
                        {identity?.startTime}
                    </div>
                </div>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 line-clamp-1">
                    {location.society}, {location.landmark}
                </p>

                <Button
                    onClick={handleNavigation}
                    className="w-full rounded-2xl bg-slate-900 h-12 font-bold text-white hover:bg-orange-500 transition-all shadow-lg shadow-slate-200"
                >
                    View Menu
                    <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    );
};

export default React.memo(MessCard);