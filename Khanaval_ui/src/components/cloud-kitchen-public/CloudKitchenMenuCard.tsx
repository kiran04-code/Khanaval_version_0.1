import { Heart, Minus, Plus } from "lucide-react";

import {
    CloudKitchenMenuItem,
    cloudKitchenPlaceholderImage,
    formatPrice,
} from "@/components/cloud-kitchen-public/cloudKitchenUtils";
import { cn } from "@/lib/utils";

type CloudKitchenMenuCardProps = {
    item: CloudKitchenMenuItem;
    isFavourite: boolean;
    quantity: number;
    onDecrease: () => void;
    onIncrease: () => void;
    onToggleFavourite: () => void;
};

export function CloudKitchenMenuCard({
    item,
    isFavourite,
    quantity,
    onDecrease,
    onIncrease,
    onToggleFavourite,
}: CloudKitchenMenuCardProps) {
    const isAvailable = item.Visible_to_customers !== false;
    const itemName = item.productName || "Unnamed item";
    const isVegItem = /paneer|veg|dal|thali|roti|chapati|rice|sabji|masala|jeera|dosa|idli|poha|upma/i.test(
        itemName,
    );
    const description = isVegItem
        ? `Freshly prepared ${itemName.toLowerCase()} with home-style flavor and balanced taste.`
        : `Freshly prepared ${itemName.toLowerCase()} served hot from the kitchen menu.`;

    return (
        <article className="group h-full rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)] transition duration-300 hover:border-orange-200 hover:shadow-[0_18px_35px_rgba(15,23,42,0.09)] sm:p-5">
            <div className="flex items-start gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-2">
                            <div
                                className={cn(
                                    "flex h-5 w-5 items-center justify-center rounded-[6px] border",
                                    isVegItem
                                        ? "border-emerald-500 text-emerald-500"
                                        : "border-rose-500 text-rose-500",
                                )}
                            >
                                <div
                                    className={cn(
                                        "h-2.5 w-2.5 rounded-full",
                                        isVegItem ? "bg-emerald-500" : "bg-rose-500",
                                    )}
                                />
                            </div>
                            <div>
                                <h3 className="line-clamp-2 text-base font-black tracking-tight text-slate-950 sm:text-[22px]">
                                    {itemName}
                                </h3>
                                <p className="mt-1 text-lg font-black text-slate-950 sm:text-xl">
                                    {formatPrice(Number(item.productprice || 0))}
                                </p>
                            </div>
                            <p className="line-clamp-3 pr-1 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                                {description}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onToggleFavourite}
                            className={cn(
                                "hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white shadow-sm transition sm:flex",
                                isFavourite
                                    ? "border-rose-200 text-rose-500"
                                    : "border-slate-200 text-slate-500 hover:border-orange-200 hover:text-orange-500",
                            )}
                        >
                            <Heart className={cn("h-4 w-4", isFavourite ? "fill-current" : "")} />
                        </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {item.productCategory || "Main Course"}
                        </span>
                        <span
                            className={cn(
                                "rounded-full px-3 py-1 text-xs font-semibold",
                                isAvailable
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-slate-100 text-slate-600",
                            )}
                        >
                            {isAvailable ? "Available" : "Unavailable"}
                        </span>
                    </div>
                </div>

                <div className="w-[104px] shrink-0 sm:w-[132px] lg:w-[148px]">
                    <div className="relative">
                        <img
                            src={item.productimage || cloudKitchenPlaceholderImage}
                            alt={itemName}
                            className="h-[96px] w-full rounded-[16px] object-cover shadow-[0_12px_28px_rgba(15,23,42,0.12)] sm:h-[120px] lg:h-[132px]"
                        />
                        <button
                            type="button"
                            onClick={onToggleFavourite}
                            className={cn(
                                "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow-sm transition sm:hidden",
                                isFavourite
                                    ? "border-rose-200 text-rose-500"
                                    : "border-slate-200 text-slate-500",
                            )}
                        >
                            <Heart className={cn("h-4 w-4", isFavourite ? "fill-current" : "")} />
                        </button>

                        <div className="absolute inset-x-0 -bottom-4 flex justify-center">
                            {quantity > 0 ? (
                                <div className="flex items-center gap-1.5 rounded-xl border border-orange-200 bg-white px-2 py-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.12)] sm:gap-2 sm:px-3 sm:py-2">
                                    <button
                                        type="button"
                                        onClick={onDecrease}
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-50 text-orange-600 sm:h-7 sm:w-7"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="min-w-[18px] text-center text-xs font-black text-orange-700 sm:min-w-[20px] sm:text-sm">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={onIncrease}
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white sm:h-7 sm:w-7"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={onIncrease}
                                    disabled={!isAvailable}
                                    className="min-w-[86px] rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-emerald-600 shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:border-emerald-200 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:text-slate-400 sm:min-w-[110px] sm:px-6 sm:py-2.5 sm:text-lg"
                                >
                                    ADD
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-7 text-center text-[10px] font-medium text-slate-400 sm:text-[11px]">
                        Customisable
                    </div>
                </div>
            </div>
        </article>
    );
}
