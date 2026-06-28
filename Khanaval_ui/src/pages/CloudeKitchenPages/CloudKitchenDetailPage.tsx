import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Clock3,
    Heart,
    Languages,
    MapPin,
    Phone,
    Share2,
    Star,
    Store,
    UtensilsCrossed,
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { KitchenMessData } from "@/hooks/Provider";

export default function CloudKitchenDetailPage() {
    const navigate = useNavigate();
    const { kitchenId } = useParams();
    const { KitchenMessINFO, isLoading } = KitchenMessData();
    const [favouriteKitchen, setFavouriteKitchen] = useState(false);
    const [favouriteItems, setFavouriteItems] = useState<Record<string, boolean>>({});
    const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});

    const kitchens = Array.isArray(KitchenMessINFO)
        ? (KitchenMessINFO as CloudKitchenRecord[])
        : [];
    const kitchen = kitchens.find((item) => item._id === kitchenId);

    const visibleMenuItems = kitchen ? getVisibleMenuItems(kitchen) : [];
    const groupedMenuItems = groupMenuByCategory(visibleMenuItems);
    const cuisineTags = getCuisineTags(kitchen?.CloudKitchenFoodCategory);
    const startingPrice = kitchen ? getStartingPrice(kitchen) : 99;
    const menuCount = kitchen ? getMenuCount(kitchen) : 0;
    const deliveryWindow = kitchen ? formatDeliveryWindow(kitchen) : "25-35 min";
    const rating = kitchen ? getRatingUi(kitchen) : 4.2;

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

            <section className="container mx-auto px-4 pb-8 pt-28">
                <div className="mb-5 flex items-center gap-3 text-sm text-slate-500">
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
                    className="overflow-hidden rounded-[34px] border border-slate-200/80 bg-white shadow-[0_24px_65px_rgba(15,23,42,0.08)]"
                >
                    <div className="relative aspect-[16/8] overflow-hidden">
                        <img
                            src={kitchen.CloudKitchenimage || cloudKitchenPlaceholderImage}
                            alt={kitchen.CloudKitchenName || "Cloud kitchen"}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
                        <div className="absolute left-4 top-4 right-4 flex items-start justify-between gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/getCloudeMess")}
                                className="rounded-full border-white/30 bg-white/90 px-4 text-slate-900 shadow-sm hover:bg-white"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setFavouriteKitchen((current) => !current)}
                                    className={`flex h-11 w-11 items-center justify-center rounded-full border bg-white/90 shadow-sm transition ${
                                        favouriteKitchen
                                            ? "border-rose-200 text-rose-500"
                                            : "border-white/30 text-slate-700"
                                    }`}
                                >
                                    <Heart className={`h-4.5 w-4.5 ${favouriteKitchen ? "fill-current" : ""}`} />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleShareKitchen}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-700 shadow-sm"
                                >
                                    <Share2 className="h-4.5 w-4.5" />
                                </button>
                            </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge
                                            className={`rounded-full border-none px-3 py-1 text-[11px] font-bold ${
                                                kitchen.CloudKitchenIsOpen
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-slate-900 text-white"
                                            }`}
                                        >
                                            {kitchen.CloudKitchenIsOpen ? "Open Now" : "Closed"}
                                        </Badge>
                                        <Badge className="rounded-full border-none bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-900">
                                            {deliveryWindow}
                                        </Badge>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                                            {kitchen.CloudKitchenName}
                                        </h1>
                                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
                                            {kitchen.CloudKitchenDetails || "Fresh menu items from your nearby cloud kitchen."}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 rounded-[26px] bg-white/92 p-4 text-slate-900 shadow-xl backdrop-blur sm:grid-cols-4">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                            Rating
                                        </p>
                                        <p className="mt-1 flex items-center gap-1 text-base font-black">
                                            <Star className="h-4 w-4 fill-current text-emerald-500" />
                                            {rating.toFixed(1)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                            Starts At
                                        </p>
                                        <p className="mt-1 text-base font-black">
                                            {formatPrice(startingPrice)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                            Menu Items
                                        </p>
                                        <p className="mt-1 text-base font-black">{menuCount}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                            Delivery
                                        </p>
                                        <p className="mt-1 text-base font-black">{deliveryWindow}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            <section className="container mx-auto grid gap-8 px-4 pb-10 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-6">
                    <Card className="rounded-[30px] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                        <CardContent className="space-y-5 p-5 sm:p-6">
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

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-[24px] bg-slate-50 p-4">
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

                                <div className="rounded-[24px] bg-slate-50 p-4">
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

                                <div className="rounded-[24px] bg-slate-50 p-4">
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

                                <div className="rounded-[24px] bg-slate-50 p-4">
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

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                        </CardContent>
                    </Card>
                </div>

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
            </section>

            <section className="container mx-auto px-4 pb-16">
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
                    <div className="space-y-10">
                        {groupedMenuItems.map(([category, items]) => (
                            <div key={category} className="space-y-5">
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

                                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                    {items.map((item) => (
                                        <CloudKitchenMenuCard
                                            key={item._id}
                                            item={item}
                                            isFavourite={Boolean(favouriteItems[item._id])}
                                            quantity={cartQuantities[item._id] || 0}
                                            onDecrease={() => updateQuantity(item._id, -1)}
                                            onIncrease={() => updateQuantity(item._id, 1)}
                                            onToggleFavourite={() => toggleFavouriteItem(item._id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}
