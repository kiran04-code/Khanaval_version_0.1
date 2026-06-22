import { LogOut, Store } from "lucide-react";

import { dashboardNavItems } from "@/components/cloud-kitchen/mock-data";
import type { DashboardSection } from "@/components/cloud-kitchen/types";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type DashboardSidebarProps = {
    activeSection: DashboardSection;
    isKitchenOpen: boolean;
    isMobileOpen: boolean;
    onLogout: () => void;
    onSectionChange: (section: DashboardSection) => void;
    onKitchenOpenChange: (value: boolean) => void;
    onMobileOpenChange: (value: boolean) => void;
};

function SidebarBody({
    activeSection,
    isKitchenOpen,
    onLogout,
    onSectionChange,
    onKitchenOpenChange,
}: Omit<DashboardSidebarProps, "isMobileOpen" | "onMobileOpenChange">) {
    const navBadges: Partial<Record<DashboardSection, string>> = {
        orders: "1",
        reviews: "2",
    };

    return (
        <div className="flex h-full flex-col bg-white text-slate-900">
            <div className="border-b border-slate-200 px-5 py-6">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Khanaaval" className="h-11 w-auto" />
                    <div>
                        <p className="text-base font-bold text-slate-950">kiran Rathod</p>
                        <p className="text-xs text-slate-500">Owner Console</p>
                    </div>
                </div>
            </div>

            <div className="px-4 py-5">
                <div className="rounded-[28px] bg-gradient-to-br from-orange-500 to-orange-400 p-4 text-white shadow-lg shadow-orange-200">
                    <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-100">
                                Kitchen Status
                            </p>
                            <p className="mt-2 text-lg font-bold text-white">
                                {isKitchenOpen ? "Kitchen is open" : "Kitchen is closed"}
                            </p>
                            <p className="mt-2 text-sm text-orange-50/90">
                                {isKitchenOpen
                                    ? "You are accepting fresh orders right now."
                                    : "New orders are paused until you reopen the kitchen."}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-black/10 p-3 text-orange-50">
                            <Store className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-black/12 px-4 py-3">
                        <span className="text-sm font-medium text-white">
                            {isKitchenOpen ? "Customers can order now" : "Pause incoming orders"}
                        </span>
                        <Switch checked={isKitchenOpen} onCheckedChange={onKitchenOpenChange} />
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto px-3 pb-6">
                {dashboardNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    const badge = navBadges[item.id];

                    return (
                        <button
                            key={item.id}
                            className={cn(
                                "flex min-h-[50px] w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                            )}
                            onClick={() => onSectionChange(item.id)}
                        >
                            <span className="flex items-center gap-3">
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </span>
                            {badge && (
                                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
                                    {badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="border-t border-slate-200 p-4">
                <Button
                    variant="outline"
                    className="h-12 w-full justify-start rounded-2xl border-slate-200 bg-transparent text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={onLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}

export function DashboardSidebar(props: DashboardSidebarProps) {
    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
                <SidebarBody
                    activeSection={props.activeSection}
                    isKitchenOpen={props.isKitchenOpen}
                    onLogout={props.onLogout}
                    onSectionChange={props.onSectionChange}
                    onKitchenOpenChange={props.onKitchenOpenChange}
                />
            </aside>

            <Sheet open={props.isMobileOpen} onOpenChange={props.onMobileOpenChange}>
                <SheetContent
                    side="left"
                    className="w-[86%] max-w-[340px] border-0 bg-transparent p-0 shadow-none"
                >
                    <SheetHeader className="sr-only">
                        <SheetTitle>Dashboard Navigation</SheetTitle>
                    </SheetHeader>
                    <SidebarBody
                        activeSection={props.activeSection}
                        isKitchenOpen={props.isKitchenOpen}
                        onLogout={props.onLogout}
                        onSectionChange={props.onSectionChange}
                        onKitchenOpenChange={props.onKitchenOpenChange}
                    />
                </SheetContent>
            </Sheet>
        </>
    );
}
