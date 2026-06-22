import type { LucideIcon } from "lucide-react";

export type DashboardSection =
    | "dashboard"
    | "orders"
    | "menu"
    | "customers"
    | "analytics"
    | "earnings"
    | "reviews"
    | "notifications"
    | "profile"
    | "settings";

export type OrderStatus = "pending" | "preparing" | "delivered" | "cancelled";

export type KitchenOrder = {
    amount: string;
    customer: string;
    id: string;
    status: OrderStatus;
    time: string;
};

export type PopularMenuItem = {
    accentClassName: string;
    id: string;
    itemName: string;
    ordersCount: string;
    revenue: string;
};

export type ReviewItem = {
    comment: string;
    customer: string;
    id: string;
    rating: number;
};

export type DashboardStat = {
    accentClassName: string;
    icon: LucideIcon;
    id: string;
    label: string;
    value: string;
};

export type QuickActionItem = {
    helper: string;
    icon: LucideIcon;
    id: string;
    label: string;
    target: DashboardSection;
};

export type SidebarNavItem = {
    icon: LucideIcon;
    id: DashboardSection;
    label: string;
};

export type BenefitItem = {
    description: string;
    icon: LucideIcon;
    id: string;
    title: string;
};
