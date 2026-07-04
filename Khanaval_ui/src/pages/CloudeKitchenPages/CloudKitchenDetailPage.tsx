import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Clock3,
    Heart,
    Languages,
    Loader2,
    MapPin,
    Phone,
    Receipt,
    Share2,
    ShieldCheck,
    Sparkles,
    Star,
    Store,
    UtensilsCrossed,
    Wallet,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CloudKitchenMenuCard } from "@/components/cloud-kitchen-public/CloudKitchenMenuCard";
import {
    CloudKitchenRecord,
    cloudKitchenPlaceholderImage,
    formatDeliveryWindow,
    formatPrice,
    getCuisineTags,
    getDisplayAddress,
    getMenuCount,
    getRatingUi,
    getStartingPrice,
    getVisibleMenuItems,
    groupMenuByCategory,
} from "@/components/cloud-kitchen-public/cloudKitchenUtils";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { KitchenMessData } from "@/hooks/Provider";
import { useCurrentUser } from "@/hooks/user-hook";
import { useStateContex } from "@/context/State";

export default function CloudKitchenDetailPage() {
    const navigate = useNavigate();
    const { kitchenId } = useParams();
    const { KitchenMessINFO, isLoading } = KitchenMessData();
    const { user } = useCurrentUser();
    const stateContext = useStateContex();
    const [favouriteKitchen, setFavouriteKitchen] = useState(false);
    const [favouriteItems, setFavouriteItems] = useState<Record<string, boolean>>({});
    const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const [selectedPaymentMode, setSelectedPaymentMode] = useState<"Cash" | "Online" | "UPI" | "Card">("Cash");

    const kitchens = Array.isArray(KitchenMessINFO)
        ? (KitchenMessINFO as CloudKitchenRecord[])
        : [];
    const kitchen = kitchens.find((item) => item._id === kitchenId);

    const visibleMenuItems = kitchen ? getVisibleMenuItems(kitchen) : [];
    const userAddresses = Array.isArray(user?.Address) ? user.Address : [];
    const groupedMenuItems = groupMenuByCategory(visibleMenuItems);
    const cuisineTags = getCuisineTags(kitchen?.CloudKitchenFoodCategory);
    const startingPrice = kitchen ? getStartingPrice(kitchen) : 99;
    const menuCount = kitchen ? getMenuCount(kitchen) : 0;
    const deliveryWindow = kitchen ? formatDeliveryWindow(kitchen) : "25-35 min";
    const rating = kitchen ? getRatingUi(kitchen) : 4.2;

    const quickHighlights = groupedMenuItems.slice(0, 4).map(([category, items]) => ({
        category,
        count: items.length,
        topItem: items[0]?.productName || "Fresh kitchen pick",
    }));
    const trustFeatures = [
        {
            title: "Fresh daily preparation",
            description: "Menu items are shown directly from the kitchen's visible menu list.",
            icon: Sparkles,
        },
        {
            title: "Direct kitchen contact",
            description: "Call or WhatsApp the kitchen without extra steps when you need details.",
            icon: Phone,
        },
        {
            title: "Reliable ordering flow",
            description: "Open status, delivery timing, and menu count are visible before browsing.",
            icon: ShieldCheck,
        },
    ];
    const axioseInstace = stateContext?.axioseInstace;
    console.log(visibleMenuItems.filter((item) => (cartQuantities[item._id] || 0) > 0))
    const cartItems = visibleMenuItems
        .filter((item) => (cartQuantities[item._id] || 0) > 0)
        .map((item) => ({
            ...item,
            quantity: cartQuantities[item._id] || 0,
            total: Number(item.productprice || 0) * (cartQuantities[item._id] || 0),
        }));
    const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    const platformFee = cartItems.length > 0 ? 12 : 0;
    const deliveryFee = 0;
    const grandTotal = cartSubtotal + platformFee + deliveryFee;
    const selectedAddress = userAddresses[selectedAddressIndex];

    const updateQuantity = (itemId: string, delta: number) => {
        setCartQuantities((current) => {
            const nextValue = Math.max((current[itemId] || 0) + delta, 0);

            return {
                ...current,
                [itemId]: nextValue,
            };
        });
    };

    const toggleFavouriteItem = (itemId: string) => {
        setFavouriteItems((current) => ({
            ...current,
            [itemId]: !current[itemId],
        }));
    };

    const handleShareKitchen = async () => {
        const shareUrl = window.location.href;
        const shareTitle = kitchen?.CloudKitchenName || "Cloud Kitchen";

        try {
            if (navigator.share) {
                await navigator.share({
                    title: shareTitle,
                    text: "Check out this cloud kitchen on Khanaaval",
                    url: shareUrl,
                });
                return;
            }

            await navigator.clipboard.writeText(shareUrl);
            toast({
                title: "Link copied",
                description: "Kitchen link copied to clipboard.",
            });
        } catch {
            toast({
                title: "Unable to share",
                description: "Please try again in a moment.",
            });
        }
    };

    const formatUserAddress = (address?: {
        address?: string;
        houseNo?: string;
        society?: string;
        landmark?: string;
        suburb?: string;
        city?: string;
        state?: string;
        postcode?: string;
    }) =>
        [
            address?.address,
            address?.houseNo,
            address?.society,
            address?.landmark,
            address?.suburb,
            address?.city,
            address?.state,
            address?.postcode,
        ]
            .filter(Boolean)
            .join(", ");

    const handleOpenCheckout = () => {
        if (cartItems.length === 0) {
            toast({
                title: "Add items first",
                description: "Choose at least one menu item before checkout.",
            });
            return;
        }

        if (userAddresses.length === 0) {
            toast({
                title: "Add delivery address",
                description: "Please save one address in your profile before placing an order.",
                variant: "destructive",
            });
            navigate("/profile");
            return;
        }

        setIsCheckoutOpen(true);
    };

    const handlePlaceOrder = async () => {
        if (!axioseInstace || !kitchen) {
            return;
        }

        if (cartItems.length === 0) {
            toast({
                title: "Cart is empty",
                description: "Please add items before placing an order.",
                variant: "destructive",
            });
            return;
        }

        if (!selectedAddress) {
            toast({
                title: "Address required",
                description: "Select one delivery address to continue.",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsPlacingOrder(true);
            const { data } = await axioseInstace.post("/api/user/Place-order-cloude-Kitchen", {
                KitchenId: kitchen._id,
                paymentMode: selectedPaymentMode,
                productList: cartItems.map((item) => ({
                    productId: item._id,
                    count: item.quantity,
                })),
                AddressToDelivedProduct: formatUserAddress(selectedAddress),
            });

            if (data.success) {
                setCartQuantities({});
                setIsCheckoutOpen(false);
                toast({
                    title: "Order placed",
                    description: "Your kitchen order has been placed successfully.",
                });
            }
        } catch (error: any) {
            toast({
                title: "Order failed",
                description:
                    error?.response?.data?.errorMessage ||
                    error?.response?.data?.message ||
                    "Please try again once.",
                variant: "destructive",
            });
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_30%,#f8fafc_100%)]">
                <Navbar />
                <div className="container mx-auto space-y-6 px-4 pb-16 pt-28">
                    <Skeleton className="h-[320px] w-full rounded-[34px]" />
                    <Skeleton className="h-24 w-full rounded-[28px]" />
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="h-[360px] w-full rounded-[28px]" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!kitchen) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_30%,#f8fafc_100%)]">
                <Navbar />
                <div className="container mx-auto px-4 pb-16 pt-28">
                    <Card className="rounded-[32px] border border-dashed border-slate-300 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                        <CardContent className="flex flex-col items-center px-6 py-16 text-center">
                            <Store className="h-12 w-12 text-orange-500" />
                            <h1 className="mt-5 text-3xl font-black text-slate-950">
                                Kitchen not found
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                                The kitchen you are looking for is unavailable right now or the link
                                may be incorrect.
                            </p>
                            <Button
                                className="mt-6 rounded-2xl bg-slate-950 px-6 font-bold text-white hover:bg-orange-500"
                                onClick={() => navigate("/getCloudeMess")}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to all kitchens
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_30%,#f8fafc_100%)]">
            <Navbar />

            <section className="container mx-auto px-4 pb-6 pt-24 sm:pb-8 sm:pt-28">
                <div className="mb-4 hidden items-center gap-3 text-sm text-slate-500 sm:flex">
                    <Link to="/getCloudeMess" className="font-semibold text-orange-500 hover:text-orange-600">
                        Cloud Kitchens
                    </Link>
                    <span>/</span>
                    <span className="line-clamp-1">{kitchen.CloudKitchenName}</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_65px_rgba(15,23,42,0.08)]"
                >
                    <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/getCloudeMess")}
                                    className="rounded-full border-slate-200 bg-white px-3 text-xs text-slate-900 shadow-sm hover:bg-slate-50 sm:px-4 sm:text-sm"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFavouriteKitchen((current) => !current)}
                                        className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition ${
                                            favouriteKitchen
                                                ? "border-rose-200 text-rose-500"
                                                : "border-slate-200 text-slate-700"
                                        }`}
                                    >
                                        <Heart className={`h-4.5 w-4.5 ${favouriteKitchen ? "fill-current" : ""}`} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleShareKitchen}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
                                    >
                                        <Share2 className="h-4.5 w-4.5" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                    {kitchen.CloudKitchenName}
                                </h1>
                                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-800 sm:text-base">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                                        <Star className="h-4 w-4 fill-current" />
                                        {rating.toFixed(1)}
                                    </span>
                                    <span className="text-slate-400">•</span>
                                    <span>{deliveryWindow}</span>
                                    <span className="text-slate-400">•</span>
                                    <span>{formatPrice(startingPrice)} for two</span>
                                </div>
                                <p className="mt-3 text-base font-medium text-orange-600">
                                    {cuisineTags.join(", ") || "Fresh meals"}
                                </p>
                                <div className="mt-3 space-y-2 text-sm text-slate-600 sm:text-base">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                                        <span className="line-clamp-1">{getDisplayAddress(kitchen)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock3 className="h-4 w-4 shrink-0 text-slate-400" />
                                        <span>
                                            {kitchen.CloudKitchenOpenTime || "9:00 AM"} to{" "}
                                            {kitchen.CloudKitchenCloseTime || "8:00 PM"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 rounded-[22px] border border-slate-200 bg-slate-50 p-3 sm:grid-cols-4">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        Status
                                    </p>
                                    <p className="mt-1 text-sm font-black text-slate-950">
                                        {kitchen.CloudKitchenIsOpen ? "Open Now" : "Closed"}
                                    </p>
                                </div>
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
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        Delivery
                                    </p>
                                    <p className="mt-1 text-sm font-black text-slate-950">{deliveryWindow}</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[24px]">
                            <img
                                src={kitchen.CloudKitchenimage || cloudKitchenPlaceholderImage}
                                alt={kitchen.CloudKitchenName || "Cloud kitchen"}
                                className="h-[220px] w-full rounded-[24px] object-cover sm:h-[260px] lg:h-[280px]"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            <section className="container mx-auto grid gap-5 px-4 pb-8 lg:grid-cols-[1.1fr,0.9fr] lg:gap-8 lg:pb-10">
                <div className="space-y-6">
                    <Card className="rounded-[26px] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:rounded-[30px]">
                        <CardContent className="space-y-5 p-4 sm:p-6">
                            <div className="flex flex-wrap gap-2">
                                {cuisineTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                                <div className="rounded-[20px] bg-slate-50 p-3.5 sm:rounded-[24px] sm:p-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 h-5 w-5 text-orange-500" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-950">Full Address</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {getDisplayAddress(kitchen)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[20px] bg-slate-50 p-3.5 sm:rounded-[24px] sm:p-4">
                                    <div className="flex items-start gap-3">
                                        <Languages className="mt-0.5 h-5 w-5 text-orange-500" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-950">Languages</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {kitchen.CloudKitchenLanguage || "English, Hindi"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[20px] bg-slate-50 p-3.5 sm:rounded-[24px] sm:p-4">
                                    <div className="flex items-start gap-3">
                                        <Phone className="mt-0.5 h-5 w-5 text-orange-500" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-950">Contact</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {kitchen.CloudKitchenContactNumber || "Not available"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[20px] bg-slate-50 p-3.5 sm:rounded-[24px] sm:p-4">
                                    <div className="flex items-start gap-3">
                                        <Clock3 className="mt-0.5 h-5 w-5 text-orange-500" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-950">Open / Close</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {kitchen.CloudKitchenOpenTime || "9:00 AM"} to{" "}
                                                {kitchen.CloudKitchenCloseTime || "8:00 PM"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                <a
                                    href={`tel:${kitchen.CloudKitchenContactNumber || ""}`}
                                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Kitchen
                                </a>
                                <a
                                    href={`https://wa.me/${(kitchen.CloudKitchenWhatsappNumber || kitchen.CloudKitchenContactNumber || "").replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                                >
                                    WhatsApp
                                </a>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${kitchen.CloudKitchenAdress?.lat || ""},${kitchen.CloudKitchenAdress?.lng || ""}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:border-orange-200 hover:text-orange-600"
                                >
                                    Get Directions
                                </a>
                            </div>

                            <div className="grid gap-3 lg:hidden">
                                {[
                                    { label: "Kitchen Type", value: kitchen.CloudKitchenType || "Cloud Kitchen" },
                                    { label: "City", value: kitchen.CloudKitchenAdress?.city || "Not available" },
                                    { label: "State", value: kitchen.CloudKitchenAdress?.state || "Not available" },
                                    { label: "WhatsApp", value: kitchen.CloudKitchenWhatsappNumber || "Same as contact" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-center justify-between gap-4 rounded-[18px] bg-slate-50 px-4 py-3"
                                    >
                                        <span className="text-sm font-semibold text-slate-500">{item.label}</span>
                                        <span className="text-right text-sm font-bold text-slate-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="hidden space-y-5 lg:block">
                    <Card className="rounded-[30px] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                        <CardContent className="space-y-4 p-5 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
                                    <UtensilsCrossed className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
                                        Kitchen Snapshot
                                    </p>
                                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                                        Quick details
                                    </h2>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: "Kitchen Type", value: kitchen.CloudKitchenType || "Cloud Kitchen" },
                                    { label: "City", value: kitchen.CloudKitchenAdress?.city || "Not available" },
                                    { label: "State", value: kitchen.CloudKitchenAdress?.state || "Not available" },
                                    { label: "WhatsApp", value: kitchen.CloudKitchenWhatsappNumber || "Same as contact" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-center justify-between gap-4 rounded-[22px] bg-slate-50 px-4 py-4"
                                    >
                                        <span className="text-sm font-semibold text-slate-500">{item.label}</span>
                                        <span className="text-sm font-bold text-slate-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
\
                </div>
            </section>

            <section className="container mx-auto px-4 pb-16">
                {quickHighlights.length > 0 && (
                    <div className="mb-8 lg:hidden">
                        <div className="mb-4 flex items-end justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
                                    Quick Picks
                                </p>
                                <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                                    Find your favorite food
                                </h2>
                            </div>
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {quickHighlights.map((item) => (
                                <div
                                    key={item.category}
                                    className="min-w-[220px] rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                                >
                                    <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-600">
                                        {item.category}
                                    </span>
                                    <h3 className="mt-3 text-lg font-black text-slate-950">
                                        {item.count} items available
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Popular pick: {item.topItem}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
                            Live Menu
                        </p>
                        <h2 className="mt-2 text-3xl font-black text-slate-950">
                            Menu by category
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                            Browse all visible menu items from this kitchen in a clean, app-style layout.
                        </p>
                    </div>
                </div>

                {groupedMenuItems.length === 0 ? (
                    <Card className="rounded-[32px] border border-dashed border-slate-300 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                        <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
                            <div className="rounded-full bg-orange-50 p-5 text-orange-500">
                                <UtensilsCrossed className="h-10 w-10" />
                            </div>
                            <h3 className="mt-6 text-2xl font-black text-slate-950">
                                No menu available yet
                            </h3>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                                This kitchen has not published visible menu items yet. Please check
                                back later for live dishes and fresh updates.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-8 sm:space-y-10">
                        {groupedMenuItems.map(([category, items]) => (
                            <div key={category} className="space-y-4 sm:space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
                                        <UtensilsCrossed className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-950">{category}</h3>
                                        <p className="text-sm text-slate-500">
                                            {items.length} items available
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                                    {items.map((item) => (
                                        <div key={item._id} className="w-full">
                                            <CloudKitchenMenuCard
                                                item={item}
                                                isFavourite={Boolean(favouriteItems[item._id])}
                                                quantity={cartQuantities[item._id] || 0}
                                                onDecrease={() => updateQuantity(item._id, -1)}
                                                onIncrease={() => updateQuantity(item._id, 1)}
                                                onToggleFavourite={() => toggleFavouriteItem(item._id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {cartItems.length > 0 && (
                <div className="sticky bottom-4 z-30 mx-auto w-full max-w-5xl px-4">
                    <div className="rounded-[24px] border border-orange-200 bg-slate-950 px-4 py-4 text-white shadow-[0_18px_45px_rgba(15,23,42,0.28)]">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-200">
                                    Cart Ready
                                </p>
                                <p className="mt-1 text-lg font-black sm:text-xl">
                                    {totalCartItems} items · {formatPrice(grandTotal)}
                                </p>
                                <p className="mt-1 text-sm text-slate-300">
                                    Cash on delivery available for this order.
                                </p>
                            </div>
                            <Button
                                type="button"
                                onClick={handleOpenCheckout}
                                className="h-12 rounded-2xl bg-orange-500 px-6 font-black text-white hover:bg-orange-600"
                            >
                                View Cart & Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[28px] border-0 bg-[#fffaf6] p-0 sm:max-w-[720px]">
                    <div className="p-4 sm:p-5">
                        <DialogHeader className="space-y-2 text-left">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                                <Receipt className="h-3.5 w-3.5" />
                                Checkout
                            </div>
                            <DialogTitle className="text-2xl font-black text-slate-950">
                                Place your kitchen order
                            </DialogTitle>
                            <DialogDescription className="text-sm leading-6 text-slate-500">
                                Review cart items, choose address, and place your order with a simple app-like flow.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
                            <div className="space-y-4">
                                <div className="rounded-[22px] border border-white/70 bg-white p-4 shadow-sm">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-lg font-black text-slate-950">Your cart</h3>
                                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                                            {totalCartItems} items
                                        </Badge>
                                    </div>
                                    <div className="space-y-3">
                                        {cartItems.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex items-center justify-between gap-3 rounded-[18px] border border-slate-100 bg-slate-50 px-3 py-3"
                                            >
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-black text-slate-900">
                                                        {item.productName}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Qty {item.quantity} · {formatPrice(Number(item.productprice || 0))}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-black text-slate-950">
                                                    {formatPrice(item.total)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[22px] border border-white/70 bg-white p-4 shadow-sm">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-lg font-black text-slate-950">Select address</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate("/profile")}
                                            className="rounded-full border-slate-200 text-xs font-bold"
                                        >
                                            Manage
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {userAddresses.map((address, index) => (
                                            <button
                                                key={`${address.address}-${address.postcode}-${index}`}
                                                type="button"
                                                onClick={() => setSelectedAddressIndex(index)}
                                                className={`w-full rounded-[18px] border px-4 py-3 text-left transition ${
                                                    selectedAddressIndex === index
                                                        ? "border-orange-300 bg-orange-50"
                                                        : "border-slate-200 bg-slate-50 hover:border-orange-200"
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <p className="line-clamp-2 text-sm font-black text-slate-900">
                                                            {address.address}
                                                        </p>
                                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                                            {[address.city, address.state, address.postcode]
                                                                .filter(Boolean)
                                                                .join(", ")}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={`mt-1 h-4 w-4 rounded-full border ${
                                                            selectedAddressIndex === index
                                                                ? "border-orange-500 bg-orange-500"
                                                                : "border-slate-300 bg-white"
                                                        }`}
                                                    />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="rounded-[22px] border border-white/70 bg-white p-4 shadow-sm">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Wallet className="h-5 w-5 text-orange-500" />
                                        <h3 className="text-lg font-black text-slate-950">Payment mode</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                id: "Cash" as const,
                                                title: "Cash on Delivery",
                                                description: "Pay only when the order reaches you.",
                                                enabled: true,
                                            },
                                            {
                                                id: "UPI" as const,
                                                title: "UPI",
                                                description: "Coming soon for cloud kitchen orders.",
                                                enabled: false,
                                            },
                                            {
                                                id: "Card" as const,
                                                title: "Card",
                                                description: "Coming soon for cloud kitchen orders.",
                                                enabled: false,
                                            },
                                        ].map((mode) => (
                                            <button
                                                key={mode.id}
                                                type="button"
                                                disabled={!mode.enabled}
                                                onClick={() => mode.enabled && setSelectedPaymentMode(mode.id)}
                                                className={`w-full rounded-[18px] border px-4 py-3 text-left transition ${
                                                    selectedPaymentMode === mode.id
                                                        ? "border-orange-300 bg-orange-50"
                                                        : "border-slate-200 bg-slate-50"
                                                } ${!mode.enabled ? "cursor-not-allowed opacity-60" : ""}`}
                                            >
                                                <p className="text-sm font-black text-slate-900">{mode.title}</p>
                                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                                    {mode.description}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[22px] border border-orange-100 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] p-4 shadow-sm">
                                    <h3 className="text-lg font-black text-slate-950">Bill details</h3>
                                    <div className="mt-4 space-y-3 text-sm">
                                        <div className="flex items-center justify-between text-slate-600">
                                            <span>Item total</span>
                                            <span className="font-bold text-slate-900">{formatPrice(cartSubtotal)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-slate-600">
                                            <span>Platform fee</span>
                                            <span className="font-bold text-slate-900">{formatPrice(platformFee)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-slate-600">
                                            <span>Delivery fee</span>
                                            <span className="font-bold text-emerald-600">
                                                {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                                            </span>
                                        </div>
                                        <div className="border-t border-orange-100 pt-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-base font-black text-slate-950">To pay</span>
                                                <span className="text-lg font-black text-slate-950">
                                                    {formatPrice(grandTotal)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={handlePlaceOrder}
                                        disabled={isPlacingOrder}
                                        className="mt-4 h-12 w-full rounded-2xl bg-slate-950 font-black text-white hover:bg-orange-500"
                                    >
                                        {isPlacingOrder ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Placing Order
                                            </>
                                        ) : (
                                            "Place Order"
                                        )}
                                    </Button>
                                    <p className="mt-3 text-center text-xs text-slate-500">
                                        No online payment needed. Cash on delivery is active.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
}
