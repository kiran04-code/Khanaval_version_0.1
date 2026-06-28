import { motion } from "framer-motion";
import { Clock3, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

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
            className="h-full"
        >
            <Link to={`/getCloudeMess/${kitchen._id}`} className="block h-full">
                <article
                    className={cn(
                        "group h-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl",
                        compact ? "min-w-[280px] max-w-[320px]" : "",
                    )}
                >
                    <div className={cn("relative overflow-hidden rounded-t-xl", compact ? "aspect-[16/12]" : "aspect-[16/11]")}>
                        <img
                            src={kitchen.CloudKitchenimage || cloudKitchenPlaceholderImage}
                            alt={kitchen.CloudKitchenName || "Cloud kitchen"}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2">
                            <p className="text-lg font-black uppercase tracking-tight text-white drop-shadow-sm">
                                Items at {formatPrice(startingPrice).replace("Rs. ", "₹")}
                            </p>
                        </div>
                    </div>

                    <div className={cn(compact ? "p-4" : "p-5")}>
                        <h3 className="line-clamp-1 text-xl font-extrabold tracking-tight text-slate-950">
                            {kitchen.CloudKitchenName || "Cloud Kitchen"}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                            <div className="flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-white">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                <span>{rating.toFixed(1)}</span>
                            </div>

                            <span className="text-slate-300">•</span>

                            <span className="font-bold text-slate-800">
                                {deliveryWindow}
                            </span>
                        </div>

                        <p className="mt-2 line-clamp-1 text-[15px] font-medium text-slate-500">
                            {displayCuisines.join(", ") || "Fresh meals"}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                            <MapPin className="h-4 w-4 shrink-0 text-orange-500" />
                            <span className="line-clamp-1">
                                {getDisplayCity(kitchen)}
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                            <span className="text-sm font-medium text-slate-500">
                                {menuCount} menu items
                            </span>

                            <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                                <Clock3 className="h-4 w-4 text-orange-500" />
                                <span>{deliveryWindow}</span>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}