import { motion } from "framer-motion";
import { Clock3, MapPin, Star, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CloudKitchenRecord,
    cloudKitchenPlaceholderImage,
    formatDeliveryWindow,
    formatPrice,
    getCuisineTags,
    getDisplayCity,
    getMenuCount,
    getRatingUi,
    getStartingPrice,
} from "@/components/cloud-kitchen-public/cloudKitchenUtils";
import { cn } from "@/lib/utils";

type CloudKitchenCardProps = {
    kitchen: CloudKitchenRecord;
    compact?: boolean;
};

export function CloudKitchenCard({ kitchen, compact = false }: CloudKitchenCardProps) {
    const cuisines = getCuisineTags(kitchen.CloudKitchenFoodCategory);
    const displayCuisines = cuisines.slice(0, compact ? 2 : 3);
    const menuCount = getMenuCount(kitchen);
    const rating = getRatingUi(kitchen);
    const startingPrice = getStartingPrice(kitchen);
    const deliveryWindow = formatDeliveryWindow(kitchen);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="h-full"
        >
            <Link to={`/getCloudeMess/${kitchen._id}`} className="block h-full">
                <article
                    className={cn(
                        "group h-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-orange-200 hover:shadow-[0_26px_55px_rgba(249,115,22,0.12)]",
                        compact ? "min-w-[280px] max-w-[320px]" : "",
                    )}
                >
                    <div className={cn("relative overflow-hidden", compact ? "aspect-[16/12]" : "aspect-[16/11]")}>
                        <img
                            src={kitchen.CloudKitchenimage || cloudKitchenPlaceholderImage}
                            alt={kitchen.CloudKitchenName || "Cloud kitchen"}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                            <Badge
                                className={cn(
                                    "rounded-full border-none px-3 py-1 text-[11px] font-bold shadow-sm",
                                    kitchen.CloudKitchenIsOpen
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-slate-900/90 text-white",
                                )}
                            >
                                {kitchen.CloudKitchenIsOpen ? "Open Now" : "Closed"}
                            </Badge>
                            <div className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm">
                                {deliveryWindow}
                            </div>
                        </div>
                    </div>

                    <div className={cn("space-y-4", compact ? "p-4" : "p-5")}>
                        <div className="space-y-2">
                            <div className="flex items-start justify-between gap-3">
                                <h3 className={cn("line-clamp-1 font-black tracking-tight text-slate-950", compact ? "text-lg" : "text-xl")}>
                                    {kitchen.CloudKitchenName || "Cloud Kitchen"}
                                </h3>
                                <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                                    <Star className="h-3.5 w-3.5 fill-current" />
                                    {rating.toFixed(1)}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {displayCuisines.map((cuisine) => (
                                    <span
                                        key={cuisine}
                                        className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-700"
                                    >
                                        {cuisine}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 rounded-[22px] bg-slate-50 p-3">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Starts At
                                </p>
                                <p className="mt-1 text-sm font-black text-slate-950">
                                    {formatPrice(startingPrice)}
                                </p>
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Menu Items
                                </p>
                                <p className="mt-1 text-sm font-black text-slate-950">{menuCount}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
                            <div className="flex min-w-0 items-center gap-2">
                                <MapPin className="h-4 w-4 shrink-0 text-orange-500" />
                                <span className="line-clamp-1">{getDisplayCity(kitchen)}</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                <UtensilsCrossed className="h-3.5 w-3.5" />
                                {menuCount}
                            </div>
                        </div>

                        <Button
                            className="h-11 w-full rounded-2xl bg-slate-950 text-sm font-bold text-white transition hover:bg-orange-500"
                        >
                            View Details
                            <Clock3 className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}
