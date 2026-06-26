import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    Bell,
    Camera,
    CheckCircle2,
    ChefHat,
    ChevronRight,
    Clock3,
    Flame,
    IndianRupee,
    LayoutDashboard,
    LogOut,
    MapPin,
    Menu,
    MessageSquare,
    Pencil,
    Phone,
    Plus,
    Receipt,
    Settings,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Star,
    Store,
    Trash2,
    TrendingUp,
    Truck,
    UserCircle2,
    Users,
    UtensilsCrossed,
    Wallet,
    XCircle,
} from "lucide-react";

import { KitchenProviderdata } from "@/hooks/Provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { KitchenRegistrationScreen } from "@/components/cloud-kitchen/KitchenRegistrationScreen";
import { PaymentScreen } from "@/components/cloud-kitchen/PaymentScreen";
import { RenewSubscriptionScreen } from "@/components/cloud-kitchen/RenewSubscriptionScreen";
import { useStateContex } from "@/context/State";

type DashboardSection =
    | "dashboard"
    | "orders"
    | "menu"
    | "add-item"
    | "customers"
    | "reviews"
    | "earnings"
    | "analytics"
    | "status"
    | "notifications"
    | "profile"
    | "settings";

type OrderStatus = "new" | "preparing" | "ready" | "delivered" | "rejected";

type KitchenOrder = {
    id: string;
    customer: string;
    phone: string;
    items: string[];
    amount: number;
    status: OrderStatus;
    placedAt: string;
    eta: string;
};

type KitchenMenuItem = {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
};

type CustomerSummary = {
    id: string;
    name: string;
    phone: string;
    orders: number;
    favourite: string;
};

type ReviewItem = {
    id: string;
    customer: string;
    rating: number;
    comment: string;
    dish: string;
};

type NotificationItem = {
    id: string;
    title: string;
    detail: string;
    tone: "action" | "info";
};

type QuickAction = {
    id: string;
    label: string;
    helper: string;
    icon: LucideIcon;
    target: DashboardSection;
};

type NavItem = {
    id: DashboardSection;
    label: string;
    icon: LucideIcon;
    badge?: string;
    pill?: string;
};

const initialOrders: KitchenOrder[] = [
    {
        id: "CK-2314",
        customer: "Rahul Sharma",
        phone: "9011522490",
        items: ["Chicken Biryani x2", "Extra Raita"],
        amount: 360,
        status: "new",
        placedAt: "2 min ago",
        eta: "Accept in 4 min",
    },
    {
        id: "CK-2315",
        customer: "Priya Patil",
        phone: "9822041188",
        items: ["Veg Thali x1", "Less spice note"],
        amount: 140,
        status: "preparing",
        placedAt: "8 min ago",
        eta: "Ready in 10 min",
    },
    {
        id: "CK-2316",
        customer: "Amit Kale",
        phone: "9988776655",
        items: ["Paneer Rice Bowl x3"],
        amount: 420,
        status: "ready",
        placedAt: "16 min ago",
        eta: "Pickup waiting",
    },
    {
        id: "CK-2317",
        customer: "Neha More",
        phone: "9876501234",
        items: ["Special Thali x2"],
        amount: 300,
        status: "delivered",
        placedAt: "35 min ago",
        eta: "Delivered",
    },
];

const initialMenuItems: KitchenMenuItem[] = [
    {
        id: "menu-1",
        name: "Chicken Biryani",
        price: 180,
        category: "Lunch",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d29d?auto=format&fit=crop&w=900&q=80",
        available: true,
    },
    {
        id: "menu-2",
        name: "Veg Thali",
        price: 140,
        category: "Daily Meal",
        image: "https://images.unsplash.com/photo-1626132647523-66f6bf380027?auto=format&fit=crop&w=900&q=80",
        available: true,
    },
    {
        id: "menu-3",
        name: "Paneer Rice Bowl",
        price: 160,
        category: "Dinner",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
        available: false,
    },
];

const initialCustomers: CustomerSummary[] = [
    {
        id: "customer-1",
        name: "Rahul Sharma",
        phone: "9011522490",
        orders: 18,
        favourite: "Chicken Biryani",
    },
    {
        id: "customer-2",
        name: "Priya Patil",
        phone: "9822041188",
        orders: 11,
        favourite: "Veg Thali",
    },
    {
        id: "customer-3",
        name: "Amit Kale",
        phone: "9988776655",
        orders: 7,
        favourite: "Paneer Rice Bowl",
    },
];

const reviewItems: ReviewItem[] = [
    {
        id: "review-1",
        customer: "Sneha Jadhav",
        rating: 5,
        comment: "Food reached hot and tasted homemade. Loved the packing too.",
        dish: "Special Thali",
    },
    {
        id: "review-2",
        customer: "Ritesh Pawar",
        rating: 4,
        comment: "Great taste. Delivery was a little late but food quality was excellent.",
        dish: "Chicken Biryani",
    },
];

const notificationItems: NotificationItem[] = [
    {
        id: "notification-1",
        title: "1 order needs attention",
        detail: "Rahul Sharma's order is still waiting for acceptance.",
        tone: "action",
    },
    {
        id: "notification-2",
        title: "Peak lunch window starts soon",
        detail: "Prepare your top dishes now to keep delivery times low.",
        tone: "info",
    },
];

const quickActions: QuickAction[] = [
    {
        id: "qa-1",
        label: "Add Food Item",
        helper: "Create a new menu item",
        icon: Plus,
        target: "add-item",
    },
    {
        id: "qa-2",
        label: "View Orders",
        helper: "Check incoming orders",
        icon: ShoppingBag,
        target: "orders",
    },
    {
        id: "qa-3",
        label: "Kitchen Status",
        helper: "Open or close orders",
        icon: Store,
        target: "status",
    },
    {
        id: "qa-4",
        label: "View Earnings",
        helper: "See today's revenue",
        icon: Wallet,
        target: "earnings",
    },
];

const orderStatusMeta: Record<OrderStatus, { label: string; className: string }> = {
    new: {
        label: "New Order",
        className: "bg-orange-100 text-orange-700",
    },
    preparing: {
        label: "Preparing",
        className: "bg-sky-100 text-sky-700",
    },
    ready: {
        label: "Ready for Pickup",
        className: "bg-violet-100 text-violet-700",
    },
    delivered: {
        label: "Delivered",
        className: "bg-emerald-100 text-emerald-700",
    },
    rejected: {
        label: "Rejected",
        className: "bg-rose-100 text-rose-700",
    },
};

const defaultKitchenImage =
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80";

const detailCardClass =
    "rounded-[28px] border border-slate-200/70 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]";

export default function CloudeKitchen() {
    const { kitchenprovider, isLoading } = KitchenProviderdata();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { axioseInstace } = useStateContex()
    const [activeSection, setActiveSection] = useState<DashboardSection>("dashboard");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [kitchenOpen, setKitchenOpen] = useState(true);
    const [orders, setOrders] = useState(initialOrders);
    const [menuItems, setMenuItems] = useState(initialMenuItems);
    const [settingsState, setSettingsState] = useState({
        instantAlerts: true,
        autoAcceptVIP: false,
        showPrepTimers: true,
        darkAtNight: false,
    });
    const [newItemForm, setNewItemForm] = useState({
        name: "",
        price: "",
        category: "Main Course",
    });

    const ownerName = kitchenprovider?.providerName || "Santosh Rathod";
    const ownerPhone = kitchenprovider?.phoneNumber || "9011522490";
    const ownerRole = kitchenprovider?.role || "Cloud Kitchen Owner";
    const kitchenName = kitchenprovider?.providerName || "Saffron Cloud Kitchen";
    const ownerInitial = ownerName.charAt(0).toUpperCase();
    const ownerImageUrl =
        (kitchenprovider as { imageUrl?: string | null } | undefined)?.imageUrl ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(ownerName)}`;
    const isPaymentDone = Boolean(kitchenprovider?.isPaymentDone);
    const isMessRegistered = Boolean(kitchenprovider?.isMessRegister);
    const subscriptionStatus = kitchenprovider?.subscriptionStatus;
    const subscriptionEndDate =
        typeof kitchenprovider?.subscriptionEndDate === "string"
            ? new Date(kitchenprovider.subscriptionEndDate)
            : null;
    const hasValidSubscriptionEndDate = Boolean(
        subscriptionEndDate && !Number.isNaN(subscriptionEndDate.getTime()),
    );
    const isSubscriptionExpired = Boolean(
        isPaymentDone &&
        hasValidSubscriptionEndDate &&
        subscriptionEndDate &&
        subscriptionEndDate.getTime() <= Date.now(),
    );
    const isSubscriptionInactive = Boolean(
        isPaymentDone && subscriptionStatus && subscriptionStatus !== "active",
    );
    const shouldShowRenewScreen = isSubscriptionExpired || isSubscriptionInactive;

    const newOrders = orders.filter((order) => order.status === "new");
    const acceptedOrders = orders.filter((order) => order.status === "preparing");
    const readyOrders = orders.filter((order) => order.status === "ready");
    const completedOrders = orders.filter((order) => order.status === "delivered");
    const activeOrders = orders.filter((order) => order.status !== "rejected");
    const todaysRevenue = completedOrders.reduce((sum, order) => sum + order.amount, 0);
    const availableMenuCount = menuItems.filter((item) => item.available).length;

    const sidebarItems = [
        {
            id: "dashboard" as const,
            label: "Dashboard",
            icon: LayoutDashboard,
        },
        {
            id: "orders" as const,
            label: "Orders",
            icon: ShoppingBag,
            badge: String(newOrders.length),
        },
        {
            id: "menu" as const,
            label: "Menu Management",
            icon: UtensilsCrossed,
        },
        {
            id: "add-item" as const,
            label: "Add New Item",
            icon: Plus,
        },
        {
            id: "customers" as const,
            label: "Customers",
            icon: Users,
        },
        {
            id: "reviews" as const,
            label: "Reviews",
            icon: Star,
            badge: String(reviewItems.length),
        },
        {
            id: "earnings" as const,
            label: "Earnings",
            icon: Wallet,
        },
        {
            id: "analytics" as const,
            label: "Analytics",
            icon: BarChart3,
        },
        {
            id: "status" as const,
            label: "Kitchen Status",
            icon: Store,
            pill: kitchenOpen ? "Open" : "Closed",
        },
        {
            id: "notifications" as const,
            label: "Notifications",
            icon: Bell,
            badge: String(notificationItems.length),
        },
        {
            id: "profile" as const,
            label: "Profile",
            icon: UserCircle2,
        },
        {
            id: "settings" as const,
            label: "Settings",
            icon: Settings,
        },
    ];

    const sectionLabels: Record<DashboardSection, string> = {
        dashboard: "Dashboard",
        orders: "Orders",
        menu: "Menu Management",
        "add-item": "Add New Item",
        customers: "Customers",
        reviews: "Reviews",
        earnings: "Earnings",
        analytics: "Analytics",
        status: "Kitchen Status",
        notifications: "Notifications",
        profile: "Profile",
        settings: "Settings",
    };

    const sectionDescriptions: Record<DashboardSection, string> = {
        dashboard: "Your kitchen at a glance, built for quick mobile control.",
        orders: "Accept, reject, and update every live order from one simple feed.",
        menu: "Keep your menu fresh with easy availability controls.",
        "add-item": "Add a new item in seconds with a touch-friendly form.",
        customers: "See your regular customers and their favourite meals.",
        reviews: "Track satisfaction and spot what customers love most.",
        earnings: "Monitor revenue, payouts, and your busiest service window.",
        analytics: "Understand trends without digging through complicated charts.",
        status: "Control when your kitchen is open for new orders.",
        notifications: "Stay on top of alerts that need your attention.",
        profile: "Business and owner details your team can refer to anytime.",
        settings: "Simple preferences for daily kitchen operations.",
    };

    const selectSection = (section: DashboardSection) => {
        setActiveSection(section);
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("client_token");
        queryClient.invalidateQueries({ queryKey: ["KitchenProvider-data"] });
        queryClient.clear();
        navigate("/");
    };

    const acceptOrder = (orderId: string) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order.id === orderId ? { ...order, status: "preparing" } : order,
            ),
        );
    };

    const rejectOrder = (orderId: string) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order.id === orderId ? { ...order, status: "rejected" } : order,
            ),
        );
    };

    const updateOrderStatus = (orderId: string) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) => {
                if (order.id !== orderId) {
                    return order;
                }

                if (order.status === "preparing") {
                    return { ...order, status: "ready" };
                }

                if (order.status === "ready") {
                    return { ...order, status: "delivered" };
                }

                return order;
            }),
        );
    };

    const toggleMenuItemAvailability = (menuItemId: string) => {
        setMenuItems((currentMenuItems) =>
            currentMenuItems.map((menuItem) =>
                menuItem.id === menuItemId
                    ? { ...menuItem, available: !menuItem.available }
                    : menuItem,
            ),
        );
    };

    const renderOrderActions = (order: KitchenOrder) => {
        if (order.status === "new") {
            return (
                <div className="flex flex-wrap gap-2">
                    <button
                        className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
                        onClick={() => acceptOrder(order.id)}
                    >
                        Accept
                    </button>
                    <button
                        className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                        onClick={() => rejectOrder(order.id)}
                    >
                        Decline
                    </button>
                </div>
            );
        }

        if (order.status === "preparing") {
            return (
                <button
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    onClick={() => updateOrderStatus(order.id)}
                >
                    Mark Ready
                </button>
            );
        }

        if (order.status === "ready") {
            return (
                <button
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                    onClick={() => updateOrderStatus(order.id)}
                >
                    Complete Order
                </button>
            );
        }

        return (
            <span className="text-sm font-medium text-slate-500">
                {order.status === "delivered" ? "Order closed" : "No action needed"}
            </span>
        );
    };



    const renderLoadingView = () => (
        <div className="space-y-6">
            <Skeleton className="h-40 rounded-[32px]" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-32 rounded-[28px]" />
                ))}
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.4fr,1fr]">
                <Skeleton className="h-[420px] rounded-[32px]" />
                <Skeleton className="h-[420px] rounded-[32px]" />
            </div>
        </div>
    );

    const renderSidebarContent = () => (
        <div className="flex h-full flex-col bg-white">
            <div className="border-b border-slate-200 px-5 py-5">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo.png" alt="Khanaaval" className="h-10 w-auto" />
                    <div>
                        <p className="text-sm font-semibold text-slate-900">{kitchenName}</p>
                        <p className="text-xs text-slate-500">Owner Console</p>
                    </div>
                </Link>
            </div>

            <div className="px-4 py-4">
                <div className="rounded-[24px] bg-gradient-to-br from-orange-500 to-orange-400 p-4 text-white shadow-lg shadow-orange-200">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-100">
                                Kitchen Status
                            </p>
                            <p className="mt-2 text-lg font-bold">
                                {kitchenOpen ? "Kitchen is open" : "Kitchen is closed"}
                            </p>
                            <p className="mt-1 text-sm text-orange-50/90">
                                {kitchenOpen
                                    ? "You are accepting fresh orders right now."
                                    : "New orders are paused until you reopen the kitchen."}
                            </p>
                        </div>
                        <Switch checked={kitchenOpen} onCheckedChange={setKitchenOpen} />
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <button
                            key={item.id}
                            className={cn(
                                "flex min-h-[52px] w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-200",
                                isActive
                                    ? "bg-orange-50 text-orange-600 shadow-sm"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                            )}
                            onClick={() => selectSection(item.id)}
                        >
                            <span className="flex items-center gap-3">
                                <Icon size={19} />
                                <span className={cn("text-sm", isActive ? "font-semibold" : "font-medium")}>
                                    {item.label}
                                </span>
                            </span>

                            {item.badge && (
                                <span className="min-w-6 rounded-full bg-orange-100 px-2 py-0.5 text-center text-xs font-semibold text-orange-700">
                                    {item.badge}
                                </span>
                            )}

                            {item.pill && (
                                <span
                                    className={cn(
                                        "rounded-full px-3 py-1 text-xs font-semibold",
                                        kitchenOpen
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-slate-100 text-slate-600",
                                    )}
                                >
                                    {item.pill}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="border-t p-4">
                <button
                    className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 font-medium text-red-500"
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );

    const renderTopNav = () => (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 rounded-2xl lg:hidden"
                        onClick={() => setDrawerOpen(true)}
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
                        <span className={`h-2.5 w-2.5 rounded-full ${kitchenOpen ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {kitchenOpen ? "Open Now" : "Closed"}
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
                            <p className="text-xs text-slate-500">{ownerRole}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );

    const renderDashboardSection = () => (
        <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-orange-600 text-white shadow-[0_28px_65px_rgba(249,115,22,0.18)]">
                {/* Background Image */}
                <img
                    src={kitchenprovider?.CloudKitchenID?.CloudKitchenimage}
                    alt="Cloud Kitchen"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="relative z-10 grid gap-6 px-6 py-8 sm:px-8 sm:py-9 xl:grid-cols-[1.15fr,0.85fr]">
                    <div className="space-y-4">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-orange-100 backdrop-blur">
                            <Sparkles className="h-4 w-4" />
                            Today's Summary
                        </div>

                        <div className="space-y-3">
                            <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                                Welcome back, {kitchenprovider?.CloudKitchenID?.CloudKitchenName}
                            </h2>

                            <p className="max-w-2xl text-base leading-7 text-slate-200">
                                Everything you need for orders, menu, customers, and earnings is organized
                                here in a simple mobile-friendly flow.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <Button className="h-12 rounded-2xl bg-white px-5 text-slate-950 hover:bg-orange-50">
                                View Orders
                            </Button>

                            <Button
                                variant="outline"
                                className="h-12 rounded-2xl border-white/20 bg-white/10 px-5 text-white hover:bg-white/20 hover:text-white"
                            >
                                Manage Menu
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <div className="rounded-[24px] border border-white/20 bg-white/10 px-4 py-4 backdrop-blur">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
                                Kitchen Status
                            </p>

                            <div className="mt-3 flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-2xl font-black text-white">
                                        {kitchenOpen ? "Kitchen is open" : "Kitchen is closed"}
                                    </p>

                                    <p className="mt-2 text-sm text-slate-200">
                                        {kitchenOpen
                                            ? "You are accepting fresh orders right now."
                                            : "New orders are paused until you reopen the kitchen."}
                                    </p>
                                </div>

                                <Switch checked={kitchenOpen} onCheckedChange={setKitchenOpen} />
                            </div>
                        </div>

                        {[
                            { label: "Lunch Peak", value: "12:30 PM" },
                            { label: "Avg Rating", value: "4.5" },
                            { label: "Menu Live", value: "2" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-[24px] border border-white/20 bg-white/10 px-4 py-4 backdrop-blur"
                            >
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
                                    {item.label}
                                </p>

                                <p className="mt-3 text-4xl font-black text-white">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Today's Orders", value: "4", helper: "Across all delivery apps", icon: ShoppingBag, tone: "bg-orange-50 text-orange-600" },
                    { label: "Pending Orders", value: "1", helper: "Need action now", icon: Clock3, tone: "bg-amber-50 text-amber-600" },
                    { label: "Revenue Today", value: "Rs. 300", helper: "Delivered orders only", icon: Wallet, tone: "bg-emerald-50 text-emerald-600" },
                    { label: "Total Customers", value: "3", helper: "Regular active customers", icon: Users, tone: "bg-sky-50 text-sky-600" },
                ].map((item) => {
                    const Icon = item.icon;

                    return (
                        <Card key={item.label} className={detailCardClass}>
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">{item.label}</p>
                                        <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                                            {item.value}
                                        </p>
                                        <p className="mt-2 text-sm text-slate-500">{item.helper}</p>
                                    </div>
                                    <div className={`rounded-2xl p-3 ${item.tone}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
                <Card className={detailCardClass}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl">Orders Flow</CardTitle>
                        <CardDescription>Quick status view without opening complex tables.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        {[
                            { label: "New Orders", value: newOrders.length, icon: Flame, tone: "bg-orange-50 text-orange-600" },
                            { label: "Preparing", value: acceptedOrders.length, icon: ChefHat, tone: "bg-sky-50 text-sky-600" },
                            { label: "Ready for Pickup", value: readyOrders.length, icon: BadgeCheck, tone: "bg-violet-50 text-violet-600" },
                            { label: "Delivered", value: completedOrders.length, icon: Truck, tone: "bg-emerald-50 text-emerald-600" },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.label} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">{item.label}</p>
                                            <p className="mt-3 text-3xl font-black text-slate-900">{item.value}</p>
                                        </div>
                                        <div className={`rounded-2xl p-3 ${item.tone}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                <Card className={detailCardClass}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl">Quick Actions</CardTitle>
                        <CardDescription>Large actions for fast one-handed control.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                        {quickActions.map((action) => {
                            const Icon = action.icon;

                            return (
                                <button
                                    key={action.id}
                                    className="flex min-h-[92px] items-center justify-between rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                                    onClick={() => selectSection(action.target)}
                                >
                                    <div>
                                        <p className="text-base font-semibold text-slate-900">{action.label}</p>
                                        <p className="mt-1 text-sm text-slate-500">{action.helper}</p>
                                    </div>
                                    <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </button>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    const renderOrdersSection = () => (
        <div className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-2">
                {orders.map((order) => (
                    <div key={order.id} className={detailCardClass}>
                        <div className="p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-slate-900">{order.customer}</h3>
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${orderStatusMeta[order.status].className}`}>
                                            {orderStatusMeta[order.status].label}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">{order.id} • {order.phone}</p>
                                </div>
                                <p className="font-semibold text-slate-900">Rs. {order.amount}</p>
                            </div>

                            <div className="mt-4 rounded-[20px] bg-slate-50 p-4">
                                {order.items.map((item) => (
                                    <div key={item} className="flex items-center justify-between gap-3 py-1 text-sm text-slate-700">
                                        <span>{item}</span>
                                        <ChevronRight className="h-4 w-4 text-slate-300" />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                <div className="text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <Clock3 className="h-4 w-4" />
                                        {order.placedAt}
                                    </div>
                                    <p className="mt-1">{order.eta}</p>
                                </div>
                                {renderOrderActions(order)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderMenuSection = () => (
        <div className="grid gap-4 xl:grid-cols-2">
            {menuItems.map((menuItem) => (
                <Card key={menuItem.id} className={detailCardClass}>
                    <div className="aspect-[16/10] overflow-hidden rounded-t-[28px]">
                        <img
                            src={menuItem.image}
                            alt={menuItem.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-lg font-bold text-slate-900">{menuItem.name}</h3>
                                    <Badge variant="soft" className="rounded-full px-3 py-1">
                                        {menuItem.category}
                                    </Badge>
                                </div>
                                <p className="mt-2 text-xl font-black text-slate-950">Rs. {menuItem.price}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${menuItem.available ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                {menuItem.available ? "Available" : "Paused"}
                            </span>
                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <Switch
                                    checked={menuItem.available}
                                    onCheckedChange={() => toggleMenuItemAvailability(menuItem.id)}
                                />
                                <span className="text-sm font-medium text-slate-600">
                                    {menuItem.available ? "Visible to customers" : "Hidden from customers"}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="h-11 rounded-2xl px-4">
                                    <Pencil className="mr-1 h-4 w-4" />
                                    Edit
                                </Button>
                                <Button variant="outline" className="h-11 rounded-2xl border-rose-200 px-4 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                                    <Trash2 className="mr-1 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    const renderAddItemSection = () => (
        <div className="grid gap-6 xl:grid-cols-[1fr,0.8fr]">
            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>Add a New Food Item</CardTitle>
                    <CardDescription>
                        Keep it simple so you can add items quickly from your phone.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Item Name</span>
                                <input
                                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-orange-300"
                                    placeholder="Example: Paneer Roll"
                                    value={newItemForm.name}
                                    onChange={(event) =>
                                        setNewItemForm((current) => ({
                                            ...current,
                                            name: event.target.value,
                                        }))
                                    }
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Price</span>
                                <input
                                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-orange-300"
                                    placeholder="150"
                                    value={newItemForm.price}
                                    onChange={(event) =>
                                        setNewItemForm((current) => ({
                                            ...current,
                                            price: event.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>
                        <label className="space-y-2">
                            <span className="text-sm font-semibold text-slate-700">Category</span>
                            <select
                                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-orange-300"
                                value={newItemForm.category}
                                onChange={(event) =>
                                    setNewItemForm((current) => ({
                                        ...current,
                                        category: event.target.value,
                                    }))
                                }
                            >
                                <option>Main Course</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Combo</option>
                                <option>Beverage</option>
                            </select>
                        </label>

                        <div className="rounded-[28px] border border-dashed border-orange-200 bg-orange-50/70 p-5 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
                                <Camera className="h-6 w-6" />
                            </div>
                            <p className="mt-3 font-semibold text-slate-900">Upload food image later</p>
                            <p className="mt-1 text-sm text-slate-500">
                                For now, the app uses a clean placeholder image.
                            </p>
                        </div>

                        <Button className="h-12 w-full rounded-2xl bg-orange-500 text-base hover:bg-orange-600">
                            Save Item
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>Tips for Better Orders</CardTitle>
                    <CardDescription>
                        Small improvements that help customers order faster.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                    <div className="rounded-[24px] bg-slate-50 p-4">
                        Use short item names so they fit clearly on small screens.
                    </div>
                    <div className="rounded-[24px] bg-slate-50 p-4">
                        Add your fastest moving dishes first for quicker customer decisions.
                    </div>
                    <div className="rounded-[24px] bg-slate-50 p-4">
                        Keep unavailable items hidden to reduce support calls.
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderCustomersSection = () => (
        <div className="grid gap-4 xl:grid-cols-3">
            {initialCustomers.map((customer) => (
                <Card key={customer.id} className={detailCardClass}>
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{customer.name}</h3>
                                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                    <Phone className="h-4 w-4" />
                                    {customer.phone}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-600">
                                {customer.orders} orders
                            </div>
                        </div>
                        <div className="mt-4 rounded-[24px] bg-slate-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Favourite Dish
                            </p>
                            <p className="mt-2 text-base font-semibold text-slate-900">
                                {customer.favourite}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    const renderReviewsSection = () => (
        <div className="grid gap-4 xl:grid-cols-2">
            {reviewItems.map((review) => (
                <Card key={review.id} className={detailCardClass}>
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{review.customer}</h3>
                                <p className="mt-1 text-sm text-slate-500">{review.dish}</p>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-amber-600">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm font-semibold">{review.rating}.0</span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-600">{review.comment}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    const renderEarningsSection = () => (
        <div className="grid gap-6 xl:grid-cols-[1fr,0.9fr]">
            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>Earnings Snapshot</CardTitle>
                    <CardDescription>Premium overview without accounting complexity.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    {[
                        { label: "Today", value: `Rs. ${todaysRevenue}`, icon: IndianRupee },
                        { label: "This Week", value: "Rs. 18,420", icon: Wallet },
                        { label: "Avg Order Value", value: "Rs. 305", icon: Receipt },
                        { label: "Payout Due", value: "Rs. 6,250", icon: ArrowUpRight },
                    ].map((item) => {
                        const Icon = item.icon;

                        return (
                            <div key={item.label} className="rounded-[24px] bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-medium text-slate-500">{item.label}</p>
                                    <Icon className="h-4 w-4 text-orange-500" />
                                </div>
                                <p className="mt-3 text-2xl font-black text-slate-900">{item.value}</p>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>Service Insight</CardTitle>
                    <CardDescription>Your strongest window today was lunch.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-[24px] bg-orange-50 p-4">
                        <p className="text-sm font-medium text-orange-700">Best Performing Slot</p>
                        <p className="mt-2 text-xl font-black text-slate-900">12 PM to 2 PM</p>
                    </div>
                    <div className="rounded-[24px] bg-slate-50 p-4">
                        <p className="text-sm font-medium text-slate-500">Recommended Action</p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                            Keep your top combo meals available during lunch rush to increase order
                            value without adding complexity.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderAnalyticsSection = () => (
        <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>Simple Analytics</CardTitle>
                    <CardDescription>Readable at a glance even on a phone.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    {[
                        { label: "Customer retention", value: "78%", width: "w-[78%]" },
                        { label: "Menu item availability", value: "92%", width: "w-[92%]" },
                        { label: "On-time order flow", value: "86%", width: "w-[86%]" },
                    ].map((metric) => (
                        <div key={metric.label}>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                                <p className="text-sm font-semibold text-slate-900">{metric.value}</p>
                            </div>
                            <div className="h-3 rounded-full bg-slate-100">
                                <div className={`h-3 rounded-full bg-orange-500 ${metric.width}`} />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>What is improving</CardTitle>
                    <CardDescription>Three metrics owners usually care about most.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[
                        "Order volume is up 12% from yesterday.",
                        "Customer ratings are stable above 4.5 this week.",
                        "Prep delays are low during dinner service.",
                    ].map((line) => (
                        <div key={line} className="flex items-start gap-3 rounded-[22px] bg-slate-50 p-4">
                            <TrendingUp className="mt-0.5 h-4 w-4 text-emerald-600" />
                            <p className="text-sm text-slate-700">{line}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    const renderStatusSection = () => (
        <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            <Card className="overflow-hidden rounded-[32px] border-0 bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-[0_25px_50px_rgba(249,115,22,0.25)]">
                <CardContent className="p-6 sm:p-7">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-100">
                                Live Control
                            </p>
                            <h2 className="mt-3 text-3xl font-black">
                                {kitchenOpen ? "Ready to take orders" : "Paused for now"}
                            </h2>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-orange-50/90">
                                Use this main toggle whenever you need to stop new orders during prep
                                rush, stock issues, or cleaning time.
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur">
                            <p className="text-sm font-medium text-orange-50">Kitchen Mode</p>
                            <div className="mt-4 flex items-center gap-4">
                                <Switch checked={kitchenOpen} onCheckedChange={setKitchenOpen} />
                                <span className="text-lg font-bold">
                                    {kitchenOpen ? "Open" : "Closed"}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>Operator Notes</CardTitle>
                    <CardDescription>Friendly reminders for smoother daily use.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[
                        "Close the kitchen before prep backlog becomes too high.",
                        "Re-open only after your core dishes are fully ready.",
                        "Keep bestsellers live whenever possible for repeat customers.",
                    ].map((note) => (
                        <div key={note} className="flex items-start gap-3 rounded-[22px] bg-slate-50 p-4">
                            <ShieldCheck className="mt-0.5 h-4 w-4 text-orange-500" />
                            <p className="text-sm text-slate-700">{note}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    const renderNotificationsSection = () => (
        <div className="grid gap-4 xl:grid-cols-2">
            {notificationItems.map((notification) => (
                <Card key={notification.id} className={detailCardClass}>
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{notification.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{notification.detail}</p>
                            </div>
                            <Badge
                                className={cn(
                                    "rounded-full px-3 py-1",
                                    notification.tone === "action"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-sky-100 text-sky-700",
                                )}
                            >
                                {notification.tone === "action" ? "Need action" : "Info"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    const renderProfileSection = () => (
        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
            <Card className={cn(detailCardClass, "overflow-hidden")}>
                <div className="relative h-48 w-full overflow-hidden sm:h-56">
                    <img
                        src={kitchenprovider?.CloudKitchenID?.CloudKitchenimage}
                        alt="Cloud kitchen"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">
                                Business Profile
                            </p>
                            <h2 className="mt-2 text-2xl font-black text-white">{kitchenprovider?.CloudKitchenID?.CloudKitchenName}</h2>
                        </div>
                        <button className="rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                            Change Photo
                        </button>
                    </div>
                </div>

                <CardContent className="p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <Avatar className="h-20 w-20 border-4 border-orange-100">
                            <AvatarImage src={ownerImageUrl} />
                            <AvatarFallback className="bg-orange-100 text-2xl font-bold text-orange-700">
                                {ownerInitial}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">{ownerName}</h3>
                            <p className="mt-1 text-sm text-slate-500">{ownerRole}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <Badge variant="soft" className="rounded-full px-3 py-1">
                                    Verified Kitchen
                                </Badge>
                                <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                                    Accepting orders
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[24px] bg-slate-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Contact Details
                            </p>
                            <div className="mt-3 space-y-2 text-sm text-slate-700">
                                <p className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-orange-500" />
                                    {ownerPhone}
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-orange-500" />
                                    {kitchenprovider?.CloudKitchenID?.CloudKitchenAdress.address}
                                </p>
                            </div>
                        </div>
                        <div className="rounded-[24px] bg-slate-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Operating Hours
                            </p>
                            <div className="mt-3 space-y-2 text-sm text-slate-700">
                                <p>Lunch: {kitchenprovider?.CloudKitchenID?.CloudKitchenCloseTime} to {kitchenprovider?.CloudKitchenID?.CloudKitchenOpenTime}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>Business Details</CardTitle>
                    <CardDescription>Important details your team can check quickly.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-700">
                    <div className="rounded-[22px] bg-slate-50 p-4">
                        <p className="font-semibold text-slate-900">Cuisine</p>
                        <p className="mt-1">Indian meals, biryani, thali, office lunch combos</p>
                    </div>
                    <div className="rounded-[22px] bg-slate-50 p-4">
                        <p className="font-semibold text-slate-900">Delivery Radius</p>
                        <p className="mt-1">Up to 6 km around Baner and Balewadi</p>
                    </div>
                    <div className="rounded-[22px] bg-slate-50 p-4">
                        <p className="font-semibold text-slate-900">Business Promise</p>
                        <p className="mt-1">
                            Fast packaging, homestyle taste, and dependable lunch delivery.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderSettingsSection = () => (
        <div className="grid gap-6 xl:grid-cols-[1fr,0.9fr]">
            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>Operational Settings</CardTitle>
                    <CardDescription>Big toggles so nothing feels technical or hard to manage.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        {
                            key: "instantAlerts",
                            title: "Instant order alerts",
                            helper: "Play alert for every new incoming order",
                        },
                        {
                            key: "autoAcceptVIP",
                            title: "Auto-accept VIP customers",
                            helper: "Useful for your most trusted repeat buyers",
                        },
                        {
                            key: "showPrepTimers",
                            title: "Show prep timers",
                            helper: "Keep a visible timer on live order cards",
                        },
                        {
                            key: "darkAtNight",
                            title: "Night comfort mode",
                            helper: "Softer look for late-night kitchen operations",
                        },
                    ].map((setting) => (
                        <div
                            key={setting.key}
                            className="flex items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-white p-4"
                        >
                            <div>
                                <p className="font-semibold text-slate-900">{setting.title}</p>
                                <p className="mt-1 text-sm text-slate-500">{setting.helper}</p>
                            </div>
                            <Switch
                                checked={settingsState[setting.key as keyof typeof settingsState]}
                                onCheckedChange={(checked) =>
                                    setSettingsState((current) => ({
                                        ...current,
                                        [setting.key]: checked,
                                    }))
                                }
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className={detailCardClass}>
                <CardHeader>
                    <CardTitle>Support Notes</CardTitle>
                    <CardDescription>Small reminders that make the app easier to use all day.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[
                        "Keep alerts on during peak lunch hours so no new order is missed.",
                        "Use prep timers if multiple people handle the same kitchen.",
                        "Pause the kitchen before editing many menu items at once.",
                    ].map((note) => (
                        <div key={note} className="rounded-[22px] bg-slate-50 p-4 text-sm text-slate-700">
                            {note}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    const renderSectionContent = () => {
        if (activeSection === "orders") {
            return renderOrdersSection();
        }

        if (activeSection === "menu") {
            return renderMenuSection();
        }

        if (activeSection === "add-item") {
            return renderAddItemSection();
        }

        if (activeSection === "customers") {
            return renderCustomersSection();
        }

        if (activeSection === "reviews") {
            return renderReviewsSection();
        }

        if (activeSection === "earnings") {
            return renderEarningsSection();
        }

        if (activeSection === "analytics") {
            return renderAnalyticsSection();
        }

        if (activeSection === "status") {
            return renderStatusSection();
        }

        if (activeSection === "notifications") {
            return renderNotificationsSection();
        }

        if (activeSection === "profile") {
            return renderProfileSection();
        }

        if (activeSection === "settings") {
            return renderSettingsSection();
        }

        return renderDashboardSection();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-slate-900">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {renderLoadingView()}
                </div>
            </div>
        );
    }

    if (!isPaymentDone) {
        return <PaymentScreen ownerName={ownerName} />;
    }

    if (shouldShowRenewScreen) {
        return (
            <RenewSubscriptionScreen
                ownerName={ownerName}
                subscriptionEndDate={kitchenprovider?.subscriptionEndDate}
                lastPaymentDate={kitchenprovider?.lastPaymentDate}
            />
        );
    }

    if (isPaymentDone && !isMessRegistered) {
        return <KitchenRegistrationScreen ownerName={ownerName} />;
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-slate-900">
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200/80 bg-white lg:flex">
                {renderSidebarContent()}
            </aside>

            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetContent side="left" className="w-[88%] max-w-[340px] p-0">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Kitchen navigation</SheetTitle>
                    </SheetHeader>
                    {renderSidebarContent()}
                </SheetContent>
            </Sheet>

            <div className="lg:pl-72">
                {renderTopNav()}

                <main className="px-4 pb-32 pt-5 sm:px-6 lg:px-8 lg:pb-8">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
                                {sectionLabels[activeSection]}
                            </p>
                            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                {sectionLabels[activeSection]}
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                {sectionDescriptions[activeSection]}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="hidden h-12 rounded-2xl border-slate-200 px-5 sm:inline-flex"
                                onClick={() => selectSection("profile")}
                            >
                                View Profile
                            </Button>
                            <Button
                                className="h-12 rounded-2xl bg-orange-500 px-5 hover:bg-orange-600"
                                onClick={() => selectSection("add-item")}
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                Add Item
                            </Button>
                        </div>
                    </div>

                    {renderSectionContent()}
                </main>
            </div>

            <button
                className="fixed bottom-24 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_16px_35px_rgba(249,115,22,0.35)] transition hover:scale-105 hover:bg-orange-600 lg:bottom-6"
                onClick={() => selectSection("add-item")}
                aria-label="Add new item"
            >
                <Plus className="h-6 w-6" />
            </button>

            <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden">
                <div className="grid grid-cols-4 gap-2">
                    {[
                        { label: "Home", icon: LayoutDashboard, target: "dashboard" as const },
                        { label: "Orders", icon: ShoppingBag, target: "orders" as const },
                        { label: "Earnings", icon: Wallet, target: "earnings" as const },
                        { label: "Profile", icon: UserCircle2, target: "profile" as const },
                    ].map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.target;

                        return (
                            <button
                                key={item.label}
                                className={cn(
                                    "flex min-h-[56px] flex-col items-center justify-center rounded-2xl px-2 text-xs font-semibold transition",
                                    isActive
                                        ? "bg-orange-50 text-orange-600"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
                                )}
                                onClick={() => selectSection(item.target)}
                            >
                                <Icon className="mb-1 h-4 w-4" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
