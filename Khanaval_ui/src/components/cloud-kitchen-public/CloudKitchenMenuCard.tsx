import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
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

    return (
        <article className="group overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_24px_50px_rgba(249,115,22,0.1)]">
            <div className="relative aspect-[16/12] overflow-hidden">
                <img
                    src={item.productimage || cloudKitchenPlaceholderImage}
                    alt={item.productName || "Menu item"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm">
                        {item.productCategory || "Main Course"}
                    </span>
                    <button
                        type="button"
                        onClick={onToggleFavourite}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-full border bg-white/95 shadow-sm transition",
                            isFavourite
                                ? "border-rose-200 text-rose-500"
                                : "border-slate-200 text-slate-500 hover:border-orange-200 hover:text-orange-500",
                        )}
                    >
                        <Heart className={cn("h-4 w-4", isFavourite ? "fill-current" : "")} />
                    </button>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-4">
                    <span
                        className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold",
                            isAvailable
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-700",
                        )}
                    >
                        {isAvailable ? "Available" : "Unavailable"}
                    </span>
                </div>
            </div>

            <div className="space-y-4 p-4">
                <div className="space-y-1.5">
                    <h3 className="line-clamp-1 text-lg font-black tracking-tight text-slate-950">
                        {item.productName || "Unnamed item"}
                    </h3>
                    <p className="text-sm text-slate-500">
                        Freshly prepared and listed by the kitchen partner.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Price
                        </p>
                        <p className="mt-1 text-xl font-black text-slate-950">
                            {formatPrice(Number(item.productprice || 0))}
                        </p>
                    </div>

                    {quantity > 0 ? (
                        <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 p-1">
                            <button
                                type="button"
                                onClick={onDecrease}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-orange-600 shadow-sm"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[20px] text-center text-sm font-bold text-orange-700">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={onIncrease}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <Button
                            type="button"
                            onClick={onIncrease}
                            disabled={!isAvailable}
                            className="h-10 rounded-full bg-slate-950 px-4 text-sm font-bold text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                        >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>
                    )}
                </div>
            </div>
        </article>
    );
}
