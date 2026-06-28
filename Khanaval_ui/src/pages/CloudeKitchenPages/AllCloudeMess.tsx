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

const discoverySections = [
    {
        title: "North Indian",
        subtitle: "Comfort thalis and rich curries",
        filter: "North Indian",
        accent: "from-orange-500 to-amber-400",
    },
    {
        title: "Biryani",
        subtitle: "Spiced rice bowls and festive meals",
        filter: "Biryani",
        accent: "from-rose-500 to-orange-400",
    },
    {
        title: "Thali",
        subtitle: "Balanced full-plate daily food",
        filter: "Thali",
        accent: "from-emerald-500 to-lime-400",
    },
    {
        title: "Chinese",
        subtitle: "Street-style noodles and combos",
        filter: "Chinese",
        accent: "from-slate-900 to-slate-700",
    },
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

           
            <section className="container mt-20 mx-auto px-4 py-8 sm:py-10">
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
            </section>

            <Footer />
        </div>
    );
}
