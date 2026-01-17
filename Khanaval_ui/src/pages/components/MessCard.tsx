import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/user-hook";
import { cn } from "@/lib/utils";
import { Clock, Heart, MapPin, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useNavigation } from "react-router-dom";
import { calculateDistance } from "./Distance";
import { useStateContex } from "@/context/State";

const MessCard = ({ _id, identity, media, distance, rating ,location}) => {
    const [lat1, setlat] = useState<number>()
    const [lng1, setlog] = useState<number>()
    console.log(lat1, lng1)
    const {userlat,userlng,} = useStateContex()
    const navigate = useNavigate();

    const { user } = useCurrentUser()
    return (
        <Card className="group overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(255,145,77,0.15)] hover:-translate-y-2">
            <div className="relative h-56 w-full overflow-hidden">
                <img src={media?.cover} alt={identity.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className={cn(
                        "px-4 py-1.5 backdrop-blur-md border-none font-black text-[10px] uppercase shadow-xl",
                        identity.dietaryType ? "bg-emerald-500/90 text-white" : "bg-rose-500/90 text-white"
                    )}>
                        {identity.dietaryType ? "Pure Veg" : "Non-Veg"}
                    </Badge>
                    <div className="flex items-center gap-1 rounded-2xl bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs font-black shadow-xl">
                        <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                        <span className="text-slate-800">{rating}</span>
                    </div>
                </div>
            </div>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-orange-500 transition-colors line-clamp-1">{identity.name}</h3>
                    <button className="text-slate-300 hover:text-rose-500 transition-colors"><Heart className="w-5 h-5" /></button>
                </div>
                <div className="flex items-center gap-4 text-slate-400 mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">
                        <MapPin className="h-3.5 w-3.5 text-orange-500" /> {calculateDistance(userlat,userlng,location.lat,location.lng)} KM
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">
                        <Clock className="h-3.5 w-3.5 text-slate-400" /> {identity?.startTime} - {identity?.endTime}
                    </div>
                </div>
                <div className="flex flex-col gap-5 items-center justify-between border-t border-slate-50">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {location.city} , {location.society} ,{location.houseNo}  {location.landmark},
                            </p>
                    </div>
                    {
                        user ? <Button
                            onClick={() => navigate(`/mess/${_id}`)}
                            className="rounded-2xl bg-slate-900 px-6 py-6 w-60 font-bold text-white hover:bg-orange-500 shadow-xl shadow-slate-200"
                        >
                            View Menu
                        </Button> : <Button
                            onClick={() => navigate(`/auth`)}
                            className="rounded-2xl bg-slate-900 px-6 py-6 font-bold text-white hover:bg-orange-500 shadow-xl shadow-slate-200"
                        >
                            View Menu
                        </Button>
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default React.memo(MessCard)