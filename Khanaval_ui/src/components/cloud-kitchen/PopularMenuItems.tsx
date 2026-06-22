import { UtensilsCrossed } from "lucide-react";

import type { PopularMenuItem } from "@/components/cloud-kitchen/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PopularMenuItemsProps = {
    items: PopularMenuItem[];
};

export function PopularMenuItems({ items }: PopularMenuItemsProps) {
    return (
        <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <CardHeader>
                <CardTitle className="text-2xl font-black text-slate-950">
                    Popular Menu Items
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50/70 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                        <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${item.accentClassName}`}>
                            <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                                <UtensilsCrossed className="h-4 w-4" />
                                Food Image Placeholder
                            </div>
                        </div>
                        <div className="space-y-2 p-5">
                            <h3 className="text-lg font-bold text-slate-950">{item.itemName}</h3>
                            <p className="text-sm text-slate-500">{item.ordersCount}</p>
                            <p className="text-xl font-black text-orange-600">{item.revenue}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
