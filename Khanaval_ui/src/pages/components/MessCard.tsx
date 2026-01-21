import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/user-hook";
import { cn } from "@/lib/utils";
import {
    Clock, Heart, MapPin, Star, ArrowRight,
    ShieldCheck, Utensils, MessageSquare, X, Send,
    Loader2, Navigation // Added Navigation icon for distance
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { calculateDistance } from "./Distance";
import { useStateContex } from "@/context/State";
import { UserProviderdata } from "@/hooks/Provider";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const MessCard = ({ _id, identity, media, rating, location, messVerified, legal, providerId }) => {
    const { userlat, userlng, axioseInstace } = useStateContex();
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    const { Providerdata } = UserProviderdata();
    
    // Distance Calculation
    const distance = calculateDistance(userlat, userlng, location.lat, location.lng);
    const queryClient = useQueryClient();

    // --- FEEDBACK STATES ---
    const [isRating, setIsRating] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const handleSubmitFeedback = async () => {
        try {
            setIsSubmitting(true);
            const { data } = await axioseInstace.post("/api/sendFeedback", {
                messId: _id,
                name: `${user.first_name + " " + user.last_name}`,
                text: comment,
                Stars: userRating
            });

            if (data.success) {
                setIsRating(false);
                setUserRating(0);
                setComment("");
                queryClient.invalidateQueries({
                    queryKey: ["GET_ALL_MESS"]
                });
                toast({ title: "Feedback Submitted" });
            } else {
                toast({ title: "Something went wrong with the server", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Failed to send feedback", variant: "destructive" });
        } finally {
            setIsSubmitting(false); 
        }
    };

    if (!messVerified) return null;

    return (
        <Card className="group relative overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 h-[420px]">
            {/* IMAGE SECTION */}
            <div className="relative h-1/2 w-full overflow-hidden">
                <img
                    src={media?.cover}
                    alt={identity.name}
                    className="h-full w-full object-cover transition-transform duration-1000 md:group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    <div className="bg-emerald-500 text-white py-1 px-2 rounded-lg font-black text-[8px] uppercase tracking-tighter flex items-center gap-1 shadow-lg w-fit">
                        <ShieldCheck className="w-2.5 h-2.5" /> Verified
                    </div>
                </div>
                
                {/* DISTANCE BADGE ON IMAGE (Optional UI Style) */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                   <p className="text-[10px] font-black text-slate-800 flex items-center gap-1">
                      <Navigation className="w-2 h-2 fill-orange-500 text-orange-500" /> {distance} km
                   </p>
                </div>
            </div>

            <CardContent className="p-5 flex flex-col justify-between h-1/2 relative">
                {isRating ? (
                    <div className="flex flex-col h-full animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-xs font-black text-slate-800 uppercase">Rate Experience</h4>
                            <X className="w-4 h-4 cursor-pointer text-slate-400" onClick={() => !isSubmitting && setIsRating(false)} />
                        </div>

                        <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    onClick={() => !isSubmitting && setUserRating(star)}
                                    className={cn("w-5 h-5 transition-colors",
                                        !isSubmitting && "cursor-pointer",
                                        userRating >= star ? "fill-orange-500 text-orange-500" : "text-slate-200")}
                                />
                            ))}
                        </div>

                        <textarea
                            disabled={isSubmitting}
                            className="flex-1 w-full bg-slate-50 rounded-xl p-3 text-[11px] outline-none ring-1 ring-slate-100 focus:ring-orange-500 resize-none mb-3 disabled:opacity-50"
                            placeholder="Tell us about the food quality..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <Button
                            onClick={handleSubmitFeedback}
                            disabled={userRating === 0 || isSubmitting}
                            className="w-full bg-orange-500 h-9 rounded-xl font-black text-[10px] text-white hover:bg-slate-900 transition-colors"
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>SUBMIT <Send className="ml-2 w-3 h-3" /></>}
                        </Button>
                    </div>
                ) : (
                    <>
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

                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-1 text-slate-500 overflow-hidden">
                                    <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                                    <p className="text-[10px] font-bold truncate leading-none">
                                        {location.society}, {location.landmark}
                                    </p>
                                </div>
                                {/* DISTANCE TEXT NEXT TO ADDRESS */}
                                <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md shrink-0">
                                    {distance} km
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mt-4 py-2 border-y border-slate-50">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <span className="text-[10px] font-black text-slate-600">{identity.startTime}-{identity.endTime}</span>
                                </div>
                                <div className="ml-auto flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                                    <Star className="w-2.5 h-2.5 fill-orange-500 text-orange-500" />
                                    <span className="text-[10px] font-black text-slate-700">{rating || "4.2"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 mt-auto">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-slate-300 uppercase leading-none">Price</span>
                                <span className="text-sm font-black text-slate-800">₹3,500</span>
                                <button
                                    onClick={() => user ? setIsRating(true) : navigate(`/auth`)}
                                    className="text-[9px] font-black text-orange-500 uppercase mt-1 hover:underline text-left"
                                >
                                    + Add Feedback
                                </button>
                            </div>
                            <Button
                                onClick={() => navigate(user || Providerdata ? `/mess/${_id}` : `/auth`)}
                                className="flex-1 rounded-xl bg-slate-900 h-10 font-black text-[10px] text-white hover:bg-orange-500 transition-all shadow-lg group/btn"
                            >
                                VIEW MENU
                                <ArrowRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default React.memo(MessCard);