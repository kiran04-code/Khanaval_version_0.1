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
        /* MINIMIZED WIDTH & HEIGHT: max-w-[280px] and h-[360px] */
        <Card className="group relative overflow-hidden rounded-[1.5rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 h-[360px] w-full max-w-[280px] mx-auto">
            
            {/* IMAGE SECTION - Scaled to 45% */}
            <div className="relative h-[45%] w-full overflow-hidden">
                <img
                    src={media?.cover}
                    alt={identity.name}
                    className="h-full w-full object-cover transition-transform duration-1000 md:group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                    <div className="bg-emerald-500 text-white py-0.5 px-1.5 rounded-md font-black text-[7px] uppercase tracking-tighter flex items-center gap-1 shadow-lg">
                        <ShieldCheck className="w-2 h-2" /> Verified
                    </div>
                </div>
                
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full shadow-sm">
                    <p className="text-[8px] font-black text-slate-800 flex items-center gap-0.5">
                        <Navigation className="w-2 h-2 fill-orange-500 text-orange-500" /> {distance} km
                    </p>
                </div>
            </div>

            {/* CONTENT SECTION - Reduced padding from p-5 to p-4 */}
            <CardContent className="p-4 flex flex-col justify-between h-[55%] relative">
                {isRating ? (
                    <div className="flex flex-col h-full animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="text-[10px] font-black text-slate-800 uppercase">Rate Experience</h4>
                            <X className="w-3.5 h-3.5 cursor-pointer text-slate-400" onClick={() => !isSubmitting && setIsRating(false)} />
                        </div>

                        <div className="flex gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    onClick={() => !isSubmitting && setUserRating(star)}
                                    className={cn("w-4 h-4 transition-colors",
                                        !isSubmitting && "cursor-pointer",
                                        userRating >= star ? "fill-orange-500 text-orange-500" : "text-slate-200")}
                                />
                            ))}
                        </div>

                        <textarea
                            disabled={isSubmitting}
                            className="flex-1 w-full bg-slate-50 rounded-lg p-2 text-[10px] outline-none ring-1 ring-slate-100 focus:ring-orange-500 resize-none mb-2 disabled:opacity-50"
                            placeholder="Feedback..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <Button
                            onClick={handleSubmitFeedback}
                            disabled={userRating === 0 || isSubmitting}
                            className="w-full bg-orange-500 h-8 rounded-lg font-black text-[9px] text-white hover:bg-slate-900 transition-colors"
                        >
                            {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : "SUBMIT"}
                        </Button>
                    </div>
                ) : (
                    <>
                        <div>
                            <div className="flex justify-between items-start">
                                <div className="w-[85%]">
                                    <h3 className="text-sm font-black text-slate-800 tracking-tight leading-none truncate capitalize group-hover:text-orange-500 transition-colors">
                                        {identity.name}
                                    </h3>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">
                                        By {providerId?.OwnerName || "Partner"}
                                    </p>
                                </div>
                                <Heart className="w-4 h-4 text-slate-200 hover:text-rose-500 cursor-pointer transition-colors shrink-0" />
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1 text-slate-500 overflow-hidden">
                                    <MapPin className="w-2.5 h-2.5 text-orange-500 shrink-0" />
                                    <p className="text-[9px] font-bold truncate leading-none">
                                        {location.society}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-2 py-1.5 border-y border-slate-50">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                                    <span className="text-[9px] font-black text-slate-600">{identity.startTime}-{identity.endTime}</span>
                                </div>
                                <div className="ml-auto flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded-md">
                                    <Star className="w-2 h-2 fill-orange-500 text-orange-500" />
                                    <span className="text-[9px] font-black text-slate-700">{rating || "4.2"}</span>
                                </div>
                            </div>
                        </div>

                        {/* ACTION SECTION - Adjusted for narrow width */}
                        <div className="flex items-center justify-between gap-2 mt-auto">
                            {MontlyPrices ? (
                                <>
                                    <div className="flex flex-col min-w-[50px]">
                                        <span className="text-[7px] font-black text-slate-300 uppercase leading-none">Monthly</span>
                                        <span className="text-xs font-black text-slate-800">₹{MontlyPrices}</span>
                                        <button
                                            onClick={() => user ? setIsRating(true) : navigate(`/auth`)}
                                            className="text-[8px] font-black text-orange-500 uppercase mt-0.5 hover:underline text-left"
                                        >
                                            + Rate
                                        </button>
                                    </div>
                                    <Button
                                        onClick={() => navigate(user || Providerdata ? `/mess/${_id}` : `/auth`)}
                                        className="flex-1 rounded-lg bg-slate-900 h-8 font-black text-[9px] text-white hover:bg-orange-500 transition-all shadow-md"
                                    >
                                        VIEW MENU
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => user ? setIsRating(true) : navigate(`/auth`)}
                                        className="flex-1 rounded-lg border-slate-200 h-8 font-black text-[9px] text-slate-600 px-1"
                                    >
                                        FEEDBACK
                                    </Button>
                                    <Button
                                        onClick={() => navigate(user || Providerdata ? `/mess/${_id}` : `/auth`)}
                                        className="flex-1 rounded-lg bg-slate-900 h-8 font-black text-[9px] text-white hover:bg-orange-500"
                                    >
                                        VIEW
                                    </Button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default React.memo(MessCard);