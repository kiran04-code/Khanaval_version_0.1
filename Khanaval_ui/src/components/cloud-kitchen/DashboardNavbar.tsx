import { Bell, Menu } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type DashboardNavbarProps = {
    isKitchenOpen: boolean;
    ownerName: string;
    ownerImageUrl?: string;
    ownerRole?: string;
    onOpenMenu: () => void;
};

export function DashboardNavbar({
    isKitchenOpen,
    ownerImageUrl,
    ownerName,
    ownerRole,
    onOpenMenu,
}: DashboardNavbarProps) {
    const ownerInitial = ownerName.charAt(0).toUpperCase();

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 rounded-2xl lg:hidden"
                        onClick={onOpenMenu}
                        aria-label="Open navigation"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
                            Cloud Kitchen
                        </p>
                        <h1 className="text-base font-bold text-slate-950 sm:text-lg">
                            Dashboard
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 sm:flex">
                        <span className={`h-2.5 w-2.5 rounded-full ${isKitchenOpen ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {isKitchenOpen ? "Open Now" : "Closed"}
                    </div>
                    <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-orange-200 hover:text-orange-600">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-orange-500" />
                    </button>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
                        <Avatar className="h-9 w-9 border border-orange-100">
                            <AvatarImage src={ownerImageUrl} />
                            <AvatarFallback className="bg-orange-100 font-semibold text-orange-700">
                                {ownerInitial}
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-slate-900">{ownerName}</p>
                            <p className="text-xs text-slate-500">{ownerRole || "cloud_admin"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
