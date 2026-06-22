import {
    BarChart3,
    Bell,
    ChartColumnBig,
    CircleDollarSign,
    FileBarChart2,
    HandCoins,
    IndianRupee,
    LayoutDashboard,
    MessageSquareText,
    PackageCheck,
    Salad,
    Settings,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Star,
    TrendingUp,
    UserRoundCog,
    Users,
    WalletCards,
} from "lucide-react";

import type {
    BenefitItem,
    DashboardStat,
    KitchenOrder,
    PopularMenuItem,
    QuickActionItem,
    ReviewItem,
    SidebarNavItem,
} from "@/components/cloud-kitchen/types";

export const subscriptionBenefits: BenefitItem[] = [
    {
        id: "benefit-1",
        title: "Unlimited customer orders",
        description: "Grow without worrying about per-order limits or caps.",
        icon: ShoppingBag,
    },
    {
        id: "benefit-2",
        title: "No commission on every order",
        description: "Keep more of your revenue and predict your monthly cost easily.",
        icon: HandCoins,
    },
    {
        id: "benefit-3",
        title: "Direct earnings to your business",
        description: "Payments belong to your kitchen, not the platform.",
        icon: CircleDollarSign,
    },
    {
        id: "benefit-4",
        title: "Customer management dashboard",
        description: "Track repeat customers and keep service quality high.",
        icon: Users,
    },
    {
        id: "benefit-5",
        title: "Order management system",
        description: "Handle new, preparing, delivered, and cancelled orders quickly.",
        icon: PackageCheck,
    },
    {
        id: "benefit-6",
        title: "Analytics and reports",
        description: "Understand sales patterns and menu performance at a glance.",
        icon: FileBarChart2,
    },
    {
        id: "benefit-7",
        title: "Priority support",
        description: "Get help faster whenever your kitchen team needs assistance.",
        icon: ShieldCheck,
    },
    {
        id: "benefit-8",
        title: "Business growth tools",
        description: "Use modern partner tools inspired by leading food platforms.",
        icon: TrendingUp,
    },
];

export const platformGuidelines = [
    "We charge only a monthly subscription fee of Rs. 299.",
    "We do not take commission on your orders.",
    "All earnings belong completely to the kitchen owner.",
    "You can receive unlimited orders during your active subscription.",
    "Customer payments are transferred directly to you.",
    "Maintain food quality and hygiene standards.",
    "Keep menu information updated.",
    "Accept and process orders on time.",
    "Follow local food safety regulations.",
    "Subscription can be renewed monthly.",
];

export const kitchenRegistrationChecklist = [
    "Kitchen Name",
    "Kitchen Address",
    "Contact Information",
    "Food Categories",
    "Operating Hours",
    "Menu Setup",
    "Kitchen Images",
];

export const dashboardNavItems: SidebarNavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "menu", label: "Menu Management", icon: Salad },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "earnings", label: "Earnings", icon: IndianRupee },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "profile", label: "Profile", icon: UserRoundCog },
    { id: "settings", label: "Settings", icon: Settings },
];

export const dashboardStats: DashboardStat[] = [
    {
        id: "stat-1",
        label: "Total Orders",
        value: "1,248",
        icon: ShoppingBag,
        accentClassName: "from-orange-500/15 to-orange-100 text-orange-600",
    },
    {
        id: "stat-2",
        label: "Revenue",
        value: "Rs. 86,540",
        icon: WalletCards,
        accentClassName: "from-emerald-500/15 to-emerald-100 text-emerald-600",
    },
    {
        id: "stat-3",
        label: "Active Customers",
        value: "392",
        icon: Users,
        accentClassName: "from-sky-500/15 to-sky-100 text-sky-600",
    },
    {
        id: "stat-4",
        label: "Menu Items",
        value: "48",
        icon: ChartColumnBig,
        accentClassName: "from-violet-500/15 to-violet-100 text-violet-600",
    },
];

export const recentOrders: KitchenOrder[] = [
    {
        id: "#CK1021",
        customer: "Rahul Patil",
        amount: "Rs. 420",
        status: "pending",
        time: "12:05 PM",
    },
    {
        id: "#CK1020",
        customer: "Sneha More",
        amount: "Rs. 260",
        status: "preparing",
        time: "11:52 AM",
    },
    {
        id: "#CK1019",
        customer: "Amit Jadhav",
        amount: "Rs. 310",
        status: "delivered",
        time: "11:30 AM",
    },
    {
        id: "#CK1018",
        customer: "Neha Joshi",
        amount: "Rs. 190",
        status: "cancelled",
        time: "11:10 AM",
    },
];

export const popularMenuItems: PopularMenuItem[] = [
    {
        id: "menu-1",
        itemName: "Smoky Paneer Wrap",
        ordersCount: "214 Orders",
        revenue: "Rs. 28,900",
        accentClassName: "from-orange-500 to-red-500",
    },
    {
        id: "menu-2",
        itemName: "Butter Rice Bowl",
        ordersCount: "168 Orders",
        revenue: "Rs. 19,640",
        accentClassName: "from-amber-500 to-orange-500",
    },
    {
        id: "menu-3",
        itemName: "Tandoori Fusion Combo",
        ordersCount: "126 Orders",
        revenue: "Rs. 16,240",
        accentClassName: "from-slate-700 to-slate-900",
    },
];

export const reviewItems: ReviewItem[] = [
    {
        id: "review-1",
        customer: "Priya S",
        rating: 5,
        comment: "Packaging was great and food reached hot. The paneer bowl was excellent.",
    },
    {
        id: "review-2",
        customer: "Kunal R",
        rating: 4,
        comment: "Fast delivery and tasty food. Would love a few more combo options.",
    },
    {
        id: "review-3",
        customer: "Asmita P",
        rating: 5,
        comment: "Very reliable kitchen. My lunch order is always on time.",
    },
];

export const quickActions: QuickActionItem[] = [
    {
        id: "action-1",
        label: "Add Menu Item",
        helper: "Create a new dish quickly",
        icon: Salad,
        target: "menu",
    },
    {
        id: "action-2",
        label: "View Orders",
        helper: "Check recent order activity",
        icon: ShoppingBag,
        target: "orders",
    },
    {
        id: "action-3",
        label: "Update Profile",
        helper: "Refresh kitchen information",
        icon: UserRoundCog,
        target: "profile",
    },
    {
        id: "action-4",
        label: "Send Notification",
        helper: "Reach your active customers",
        icon: MessageSquareText,
        target: "notifications",
    },
];

export const dashboardWelcomeNotes = [
    "Lunch peak starts in 35 minutes.",
    "Top-rated item today: Smoky Paneer Wrap.",
    "Average prep time is down by 12%.",
];

export const notificationPreview = [
    "3 new order alerts are waiting.",
    "2 reviews were added this morning.",
    "Menu item stock reminder for Butter Rice Bowl.",
];

export const profileHighlights = [
    "Business operating hours are visible to customers.",
    "Payment status is active and subscription is valid.",
    "Kitchen profile is optimized for partner listing quality.",
];

export const settingsHighlights = [
    "Order notifications are enabled.",
    "Auto-accept is currently disabled.",
    "Weekly analytics summary email is active.",
];

export const analyticsHighlights = [
    "Order growth is up 18% compared to last week.",
    "Peak traffic comes between 12 PM and 2 PM.",
    "Wraps and rice bowls are driving the most repeat orders.",
];

export const earningsHighlights = [
    "Today payout estimate: Rs. 8,420",
    "This week revenue: Rs. 46,380",
    "Average order value: Rs. 286",
];

export const customerHighlights = [
    "64 repeat customers ordered this week.",
    "Top customer segment: office lunch subscribers.",
    "Customer response rate improved after faster prep timing.",
];

export const reviewHighlights = [
    "Average rating is holding steady at 4.8",
    "Packaging and hygiene are your strongest compliments.",
    "Customers want more combo meal options.",
];

export const placeholderSectionIcons = {
    analytics: Sparkles,
    customers: Users,
    earnings: IndianRupee,
    notifications: Bell,
    profile: UserRoundCog,
    reviews: Star,
    settings: Settings,
};
