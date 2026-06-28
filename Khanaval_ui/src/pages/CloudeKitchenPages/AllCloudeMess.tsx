import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpDown,
    ChefHat,
    Filter,
    MapPin,
    Search,
    Sparkles,
    UtensilsCrossed,
} from "lucide-react";

import { CloudKitchenCard } from "@/components/cloud-kitchen-public/CloudKitchenCard";
import {
    CloudKitchenRecord,
    matchesCloudKitchenFilter,
} from "@/components/cloud-kitchen-public/cloudKitchenUtils";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { KitchenMessData } from "@/hooks/Provider";

const filterChips = [
    "All",
    "Veg",
    "Non-Veg",
    "North Indian",
    "South Indian",
    "Biryani",
    "Chinese",
    "Thali",
] as const;

const sortOptions = [
    { id: "popular", label: "Popular" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "menu-count", label: "Most Menu Items" },
] as const;

const getStartingPrice = (kitchen: CloudKitchenRecord) => {
    const items = Array.isArray(kitchen.MenuId) ? kitchen.MenuId : [];
    const prices = items
        .filter((item) => item.Visible_to_customers !== false)
        .map((item) => Number(item.productprice || 0))
        .filter((price) => price > 0);

    return prices.length > 0 ? Math.min(...prices) : 99;
};

const getMenuCount = (kitchen: CloudKitchenRecord) =>
    Array.isArray(kitchen.MenuId)
        ? kitchen.MenuId.filter((item) => item.Visible_to_customers !== false).length
        : 0;

export default function AllCloudeMess() {
    const { KitchenMessINFO, isLoading } = KitchenMessData();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<(typeof filterChips)[number]>("All");
    const [activeSort, setActiveSort] = useState<(typeof sortOptions)[number]["id"]>("popular");

    const kitchens = Array.isArray(KitchenMessINFO)
        ? (KitchenMessINFO as CloudKitchenRecord[])
        : [];

    const filteredKitchens = kitchens.filter((kitchen) =>
        matchesCloudKitchenFilter(kitchen, searchTerm, activeFilter),
    );

    const sortedKitchens = [...filteredKitchens].sort((left, right) => {
        if (activeSort === "price-low") {
            return getStartingPrice(left) - getStartingPrice(right);
        }

        if (activeSort === "price-high") {
            return getStartingPrice(right) - getStartingPrice(left);
        }

        if (activeSort === "menu-count") {
            return getMenuCount(right) - getMenuCount(left);
        }

        return Number(Boolean(right.CloudKitchenIsOpen)) - Number(Boolean(left.CloudKitchenIsOpen));
    });

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#f8fafc_100%)]">
            <Navbar />

            <section className="relative overflow-hidden border-b border-orange-100/70 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_22%),linear-gradient(135deg,#fff7ed_0%,#ffffff_48%,#f8fafc_100%)] pt-28">
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
                <div className="container mx-auto px-4 pb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-end"
                    >
                        <div className="space-y-5">
                            <Badge className="w-fit rounded-full border-none bg-slate-950 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                                <Sparkles className="mr-2 h-3.5 w-3.5" />
                                Cloud Kitchens Near You
                            </Badge>
                            <div className="space-y-4">
                                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                    Discover premium cloud kitchens with menu-first browsing
                                </h1>
                                <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                                    Explore modern kitchens, browse live menus, compare cuisines,
                                    and open full details in one polished Khanaaval experience.
                                </p>
                            </div>
                        </div>

                        <Card className="rounded-[30px] border border-slate-200/80 bg-white/95 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
                            <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
                                <div className="rounded-[22px] bg-orange-50 p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-500">
                                        Kitchens
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-slate-950">
                                        {kitchens.length}
                                    </p>
                                </div>
                                <div className="rounded-[22px] bg-slate-50 p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                        Open Now
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-slate-950">
                                        {kitchens.filter((kitchen) => kitchen.CloudKitchenIsOpen).length}
                                    </p>
                                </div>
                                <div className="rounded-[22px] bg-emerald-50 p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
                                        Cities
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-slate-950">
                                        {new Set(kitchens.map((kitchen) => kitchen.CloudKitchenAdress?.city).filter(Boolean)).size}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-8 sm:py-10">
                <div className="rounded-[30px] border border-slate-200/80 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search by kitchen, cuisine, menu item, or city"
                                className="h-13 rounded-2xl border-slate-200 pl-11 text-sm sm:text-base"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {sortOptions.map((option) => (
                                <Button
                                    key={option.id}
                                    type="button"
                                    variant={activeSort === option.id ? "default" : "outline"}
                                    onClick={() => setActiveSort(option.id)}
                                    className="h-11 rounded-full px-4 text-xs font-bold sm:text-sm"
                                >
                                    <ArrowUpDown className="mr-2 h-4 w-4" />
                                    {option.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {filterChips.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    activeFilter === filter
                                        ? "bg-slate-950 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 pb-16">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
                            Listing
                        </p>
                        <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                            Browse all cloud kitchens
                        </h2>
                    </div>
                    <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm sm:flex">
                        <Filter className="h-4 w-4 text-orange-500" />
                        {sortedKitchens.length} kitchens found
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white"
                            >
                                <Skeleton className="aspect-[16/11] w-full" />
                                <div className="space-y-4 p-5">
                                    <Skeleton className="h-6 w-2/3" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                    </div>
                                    <Skeleton className="h-16 w-full rounded-[22px]" />
                                    <Skeleton className="h-10 w-full rounded-2xl" />
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : sortedKitchens.length === 0 ? (
                    <Card className="rounded-[32px] border border-dashed border-slate-300 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                        <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
                            <div className="rounded-full bg-orange-50 p-5 text-orange-500">
                                <ChefHat className="h-10 w-10" />
                            </div>
                            <h3 className="mt-6 text-2xl font-black text-slate-950">
                                No cloud kitchens found
                            </h3>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                                Try changing the search term or filter chips to explore more
                                kitchens and menu combinations.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <motion.div
                        layout
                        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    >
                        {sortedKitchens.map((kitchen) => (
                            <CloudKitchenCard key={kitchen._id} kitchen={kitchen} />
                        ))}
                    </motion.div>
                )}

                <div className="mt-14 rounded-[32px] border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-[0_22px_55px_rgba(15,23,42,0.18)] sm:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                                More Choices
                            </p>
                            <h3 className="text-2xl font-black sm:text-3xl">
                                Browse menus, compare kitchens, and pick what fits your day
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                                <MapPin className="h-4 w-4 text-orange-300" />
                                Multi-city browsing
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                                <UtensilsCrossed className="h-4 w-4 text-orange-300" />
                                Menu-first discovery
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
