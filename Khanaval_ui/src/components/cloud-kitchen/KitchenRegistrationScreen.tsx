import {
    CheckCircle2,
    ChefHat,
    Globe2,
    ImagePlus,
    LocateFixed,
    MapPin,
    PartyPopper,
    Phone,
    Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { kitchenRegistrationChecklist } from "@/components/cloud-kitchen/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type KitchenRegistrationScreenProps = {
    ownerName: string;
};

export function KitchenRegistrationScreen({
    ownerName,
}: KitchenRegistrationScreenProps) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_22%),linear-gradient(180deg,#fff7ed_0%,#ffffff_34%,#f8fafc_100%)] px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-12 sm:gap-8">
                <Card className="overflow-hidden rounded-[32px] border-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-[0_28px_60px_rgba(16,185,129,0.22)]">
                    <CardContent className="flex flex-col gap-5 px-6 py-8 sm:px-8 sm:py-10">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold backdrop-blur">
                            <PartyPopper className="h-4 w-4" />
                            Subscription Activated Successfully
                        </div>
                        <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">
                                    Welcome, {ownerName}
                                </p>
                                <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                                    Your kitchen partner account is ready
                                </h1>
                                <p className="max-w-2xl text-base leading-7 text-emerald-50/90">
                                    One final step is left. Create your cloud kitchen listing and
                                    make the business profile ready before customers start seeing it.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                                {[
                                    { label: "Plan Status", value: "Active" },
                                    { label: "Monthly Fee", value: "Rs. 299" },
                                    { label: "Next Step", value: "Kitchen Onboarding" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-[22px] border border-white/15 bg-white/10 px-4 py-4 backdrop-blur"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                                            {item.label}
                                        </p>
                                        <p className="mt-2 text-xl font-black text-white">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-[1fr,0.92fr]">
                    <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                        <CardHeader className="space-y-3">
                            <div className="inline-flex w-fit rounded-2xl bg-orange-50 p-3 text-orange-600">
                                <Store className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-3xl font-black text-slate-950">
                                Register Your Kitchen
                            </CardTitle>
                            <p className="text-base leading-7 text-slate-600">
                                Open the full onboarding page to add kitchen name, image, location,
                                contact details, latitude, longitude, and listing information.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-base font-bold shadow-lg shadow-orange-200 hover:opacity-95"
                                onClick={() => navigate("/CloudeKitchen/register-kitchen")}
                            >
                                Register Cloud Kitchen
                            </Button>

                            <div className="rounded-[24px] border border-orange-100 bg-orange-50/70 p-4">
                                <p className="text-sm font-bold text-slate-900">
                                    What you can add in this step
                                </p>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    {[
                                        { icon: Store, label: "Kitchen name and category" },
                                        { icon: ImagePlus, label: "Kitchen image or cover photo" },
                                        { icon: MapPin, label: "Full address with landmark" },
                                        { icon: LocateFixed, label: "Latitude and longitude" },
                                        { icon: Phone, label: "Contact and WhatsApp number" },
                                        { icon: Globe2, label: "Languages and service details" },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.label}
                                                className="flex min-h-[58px] items-center gap-3 rounded-2xl bg-white px-4 py-3"
                                            >
                                                <div className="rounded-2xl bg-orange-100 p-2.5 text-orange-600">
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <p className="text-sm font-semibold text-slate-700">
                                                    {item.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                        <CardHeader className="space-y-3">
                            <div className="inline-flex w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                                <ChefHat className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-2xl font-black text-slate-950">
                                Kitchen Setup Checklist
                            </CardTitle>
                            <p className="text-sm leading-6 text-slate-500">
                                Keep these details ready before you submit the listing.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {kitchenRegistrationChecklist.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 rounded-[22px] bg-slate-50 px-4 py-3"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                    <span className="text-sm font-semibold text-slate-800">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
