import { CheckCircle2, ChefHat, PartyPopper, Store } from "lucide-react";

import { kitchenRegistrationChecklist } from "@/components/cloud-kitchen/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type KitchenRegistrationScreenProps = {
    ownerName: string;
};

export function KitchenRegistrationScreen({
    ownerName,
}: KitchenRegistrationScreenProps) {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#f0fdf4_0%,#ffffff_36%,#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                <Card className="overflow-hidden rounded-[32px] border-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-[0_28px_60px_rgba(16,185,129,0.22)]">
                    <CardContent className="flex flex-col gap-5 px-6 py-8 sm:px-8 sm:py-10">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold backdrop-blur">
                            <PartyPopper className="h-4 w-4" />
                            Subscription Activated Successfully
                        </div>
                        <div className="space-y-3">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">
                                Welcome, {ownerName}
                            </p>
                            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                                Subscription Activated Successfully 🎉
                            </h1>
                            <p className="max-w-2xl text-base leading-7 text-emerald-50/90">
                                Your partner account is active. Complete your kitchen profile to
                                start receiving customer orders.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
                    <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                        <CardHeader className="space-y-3">
                            <div className="inline-flex w-fit rounded-2xl bg-orange-50 p-3 text-orange-600">
                                <Store className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-3xl font-black text-slate-950">
                                Register Your Kitchen
                            </CardTitle>
                            <p className="text-base leading-7 text-slate-600">
                                Complete your kitchen profile to start receiving orders.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-base font-bold shadow-lg shadow-orange-200 hover:opacity-95">
                                Register Kitchen Now
                            </Button>
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
