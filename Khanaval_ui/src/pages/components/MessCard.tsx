import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/user-hook";
import { cn } from "@/lib/utils";
import {
    Clock, Heart, MapPin, Star, ArrowRight,
    ShieldCheck, MessageSquare, X, Send,
    Loader2, Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { calculateDistance } from "./Distance";
import { useStateContex } from "@/context/State";
import { UserProviderdata } from "@/hooks/Provider";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const MessCard = ({ _id, identity, media, MontlyPrices, rating, location, messVerified, legal, providerId }) => {
    const { userlat, userlng, axioseInstace } = useStateContex();
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    const { Providerdata } = UserProviderdata();
    
    const distance = calculateDistance(userlat, userlng, location.lat, location.lng);
    const queryClient = useQueryClient();

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
                queryClient.invalidateQueries({ queryKey: ["GET_ALL_MESS"] });
                toast({ title: "Feedback Submitted" });
            } else {
                toast({ title: "Something went wrong", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Failed to send feedback", variant: "destructive" });
        } finally {
            setIsSubmitting(false); 
        }
    };

    if (!messVerified) return null;

    return (
        <Card className="group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 flex flex-col h-full w-full max-w-sm sm:max-w-md lg:max-w-full mx-auto">
            
            {/* IMAGE SECTION - Aspect ratio changes for better mobile fit */}
            <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden shrink-0 bg-slate-100">
                <img
                    src={media?.cover}
                    alt={identity.name}
                    className="h-full w-full object-cover transition-transform duration-1000 md:group-hover:scale-110"
                />
                
                {/* Badges - Slightly larger on mobile for tap-ability */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-1.5">
                    <div className="bg-emerald-500 text-white py-1 px-2 rounded-lg font-black text-[9px] md:text-[10px] uppercase tracking-tighter flex items-center gap-1 shadow-lg w-fit">
                        <ShieldCheck className="w-3 h-3" /> Verified
                    </div>
                </div>
                
                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                    <p className="text-[10px] md:text-xs font-black text-slate-800 flex items-center gap-1">
                        <Navigation className="w-2.5 h-2.5 fill-orange-500 text-orange-500" /> {distance} km
                    </p>
                </div>
            </div>

            <CardContent className="p-4 md:p-6 flex flex-col flex-grow relative min-h-[220px]">
                {isRating ? (
                    /* RATING VIEW */
                    <div className="flex flex-col h-full animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-xs md:text-sm font-black text-slate-800 uppercase">Rate Experience</h4>
                            <X className="w-5 h-5 cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => !isSubmitting && setIsRating(false)} />
                        </div>

                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    onClick={() => !isSubmitting && setUserRating(star)}
                                    className={cn("w-6 h-6 transition-colors",
                                        !isSubmitting && "cursor-pointer",
                                        userRating >= star ? "fill-orange-500 text-orange-500" : "text-slate-200")}
                                />
                            ))}
                        </div>

                        <textarea
                            disabled={isSubmitting}
                            className="flex-1 w-full bg-slate-50 rounded-xl p-3 text-xs md:text-sm outline-none ring-1 ring-slate-100 focus:ring-orange-500 resize-none mb-4 disabled:opacity-50"
                            placeholder="Tell us about the food quality..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <Button
                            onClick={handleSubmitFeedback}
                            disabled={userRating === 0 || isSubmitting}
                            className="w-full bg-orange-500 h-10 md:h-12 rounded-xl font-black text-xs md:text-sm text-white hover:bg-slate-900 transition-colors"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>SUBMIT FEEDBACK <Send className="ml-2 w-4 h-4" /></>}
                        </Button>
                    </div>
                ) : (
                    /* DEFAULT VIEW */
                    <div className="flex flex-col h-full">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base md:text-xl font-black text-slate-800 tracking-tight leading-tight truncate capitalize group-hover:text-orange-500 transition-colors">
                                        {identity.name}
                                    </h3>
                                    <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mt-1">
                                        By {providerId?.OwnerName || "Premium Partner"}
                                    </p>
                                </div>
                                <Heart className="w-5 h-5 md:w-6 md:h-6 text-slate-200 hover:text-rose-500 cursor-pointer transition-colors shrink-0" />
                            </div>

                            <div className="flex items-center justify-between mt-3 md:mt-4">
                                <div className="flex items-center gap-1.5 text-slate-500 overflow-hidden">
                                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                    <p className="text-[11px] md:text-sm font-bold truncate">
                                        {location.society}, {location.landmark}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-4 py-3 border-y border-slate-50">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span className="text-[11px] md:text-sm font-black text-slate-600">{identity.startTime}-{identity.endTime}</span>
                                </div>
                                <div className="ml-auto flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                                    <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                                    <span className="text-[11px] md:text-sm font-black text-slate-700">{rating || "4.2"}</span>
                                </div>
                            </div>
                        </div>

                        {/* ACTION SECTION - Stacks or stays row based on price exists */}
                        <div className="flex items-center justify-between gap-3 mt-6">
                            {MontlyPrices ? (
                                <>
                                    <div className="flex flex-col min-w-[70px]">
                                        <span className="text-[9px] font-black text-slate-400 uppercase leading-none">Monthly</span>
                                        <span className="text-base md:text-lg font-black text-slate-800">₹{MontlyPrices}</span>
                                        <button
                                            onClick={() => user ? setIsRating(true) : navigate(`/auth`)}
                                            className="text-[10px] font-black text-orange-500 uppercase mt-1 hover:underline text-left"
                                        >
                                            + Feedback
                                        </button>
                                    </div>
                                    <Button
                                        onClick={() => navigate(user || Providerdata ? `/mess/${_id}` : `/auth`)}
                                        className="flex-1 rounded-xl bg-slate-900 h-11 md:h-12 font-black text-xs md:text-sm text-white hover:bg-orange-500 transition-all shadow-lg group/btn"
                                    >
                                        VIEW MENU
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </>
                            ) : (
                                <div className="flex w-full gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => user ? setIsRating(true) : navigate(`/auth`)}
                                        className="flex-1 rounded-xl border-slate-200 h-11 font-black text-[10px] md:text-xs text-slate-600 hover:bg-slate-50"
                                    >
                                        <MessageSquare className="w-3.5 h-3.5 mr-1" /> FEEDBACK
                                    </Button>
                                    <Button
                                        onClick={() => navigate(user || Providerdata ? `/mess/${_id}` : `/auth`)}
                                        className="flex-1 rounded-xl bg-slate-900 h-11 font-black text-[10px] md:text-xs text-white hover:bg-orange-500"
                                    >
                                        VIEW MENU
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default React.memo(MessCard);