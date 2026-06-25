declare global {
    interface Window {
        Razorpay: any;
    }
}

import { useState } from "react";

import {
    ArrowRight,
    BadgeCheck,
    ChefHat,
    CheckCircle2,
    CircleDollarSign,
    LoaderCircle,
    Infinity,
    Sparkles,
    Store,
    ShieldCheck,
    UtensilsCrossed,
    Wallet,
    Zap,
} from "lucide-react";

import { subscriptionBenefits, platformGuidelines } from "@/components/cloud-kitchen/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStateContex } from "@/context/State";
import { KitchenProviderdata } from "@/hooks/Provider";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type PaymentScreenProps = {
    ownerName: string;
};

type LoadingStage = "idle" | "checkout" | "verifying" | "activating" | "success";

export function PaymentScreen({ ownerName }: PaymentScreenProps) {
    const { kitchenprovider } = KitchenProviderdata();
    const { axioseInstace } = useStateContex();
    const queryclinet = useQueryClient();
    const navigate = useNavigate();
    const [loadingStage, setLoadingStage] = useState<LoadingStage>("idle");

    const isCheckoutPreparing = loadingStage === "checkout";
    const showProcessingOverlay =
        loadingStage === "verifying" ||
        loadingStage === "activating" ||
        loadingStage === "success";

    const loadingContent = {
        checkout: {
            index: 0,
            badge: "Preparing Checkout",
            title: "Setting the table for your Khanaaval pass",
            description: "Creating your secure payment window for a smooth partner activation.",
            note: "Secure gateway is warming up",
        },
        verifying: {
            index: 1,
            badge: "Checking Payment",
            title: "Verifying your subscription payment",
            description:
                "Please keep this screen open while Khanaaval confirms your payment details.",
            note: "Gateway response is being matched",
        },
        activating: {
            index: 2,
            badge: "Activating Access",
            title: "Loading your cloud kitchen workspace",
            description:
                "We are turning on your dashboard, subscription, and kitchen partner access now.",
            note: "Kitchen profile is syncing",
        },
        success: {
            index: 3,
            badge: "Success",
            title: "Your kitchen is ready to serve",
            description:
                "Subscription activated successfully. Moving you into the Khanaaval setup flow.",
            note: "Dashboard handoff in progress",
        },
    } satisfies Record<Exclude<LoadingStage, "idle">, {
        index: number;
        badge: string;
        title: string;
        description: string;
        note: string;
    }>;

    const activeLoadingContent =
        loadingStage === "idle" ? null : loadingContent[loadingStage];

    const loadingSteps = [
        "Checkout prepared",
        "Payment verified",
        "Kitchen access activated",
    ];

    const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

    const syncPaymentStatus = async () => {
        setLoadingStage("activating");

        for (let attempt = 0; attempt < 12; attempt += 1) {
            const { data } = await axioseInstace.get("/api/cloudkitchens/getcurrenr-onwer-cloude");
            const latestProvider = data?.responseData;

            if (latestProvider?.isPaymentDone) {
                setLoadingStage("success");
                await delay(1200);
                await queryclinet.invalidateQueries({
                    queryKey: ["KitchenProvider-data"],
                });
                await queryclinet.refetchQueries({
                    queryKey: ["KitchenProvider-data"],
                });
                navigate("/CloudeKitchen");
                return;
            }

            await delay(1200);
        }

        setLoadingStage("idle");
        toast({
            title: "Activation is taking a little longer",
            description: "Your payment may be processing. Please wait a moment and try again.",
        });
    };

    const PaymentLogic = async (amount: number) => {
        if (!kitchenprovider?._id) {
            toast({
                title: "Profile not ready",
                description: "Please wait a moment and try payment again.",
            });
            return;
        }

        try {
            setLoadingStage("checkout");
            const { data } = await axioseInstace.post("/api/cloudkitchens/makePayment", {
                amounts: amount,
            });
            const { data: keys } = await axioseInstace.get("/api/getkeys");
            const options = {
                key: keys.key,
                amount: data.responseData.amount,
                currency: data.responseData.currency,
                name: "Khanaaval",
                descdescription: "Montly MemberShip",
                order_id: data.responseData.id,
                handler: async function (response: any) {
                    try {
                        setLoadingStage("verifying");
                        await axioseInstace.post(
                            `/api/cloudkitchens/UpdatePaymentStatus/${kitchenprovider._id}`,
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                paymentAmmount: amount,
                            },
                        );
                        await syncPaymentStatus();
                    } catch (error) {
                        setLoadingStage("idle");
                        toast({
                            title: "Payment verification failed",
                            description:
                                "We could not confirm the subscription right now. Please try again.",
                        });
                        console.log(error);
                    }
                },
                prefill: {
                    name: kitchenprovider?.providerName,
                    contact: kitchenprovider?.phoneNumber,
                },
                theme: {
                    color: "#ee6516",
                },
                modal: {
                    ondismiss: () => {
                        setLoadingStage("idle");
                    },
                },
            };
            const razorpay = new window.Razorpay(options);
            setLoadingStage("idle");
            razorpay.open();

        } catch (error) {
            setLoadingStage("idle");
            toast({
                title: "Unable to start payment",
                description: "Please try again in a moment.",
            });
            console.log(error);
        }
    };
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.06),transparent_26%),linear-gradient(180deg,#fff7ed_0%,#ffffff_42%,#f8fafc_100%)] px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
            {showProcessingOverlay ? (
                <div className="fixed inset-0 z-[90] overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(10,18,29,0.96)_0%,rgba(28,31,36,0.92)_48%,rgba(83,33,9,0.94)_100%)] backdrop-blur-xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.28),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_26%)]" />
                    <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-8">
                        <div className="grid w-full max-w-5xl overflow-hidden rounded-[34px] border border-white/10 bg-white/8 text-white shadow-[0_35px_90px_rgba(15,23,42,0.45)] backdrop-blur lg:grid-cols-[1.08fr,0.92fr]">
                            <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#ff7a18] via-[#f05a28] to-[#24120b] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_28%)]" />
                                <div className="relative">
                                    <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-orange-50">
                                        <img src="/logo.png" alt="Khanaaval" className="h-7 w-7 rounded-full bg-white/90 p-1" />
                                        Khanaaval Premium
                                    </div>

                                    <div className="relative mt-8 flex min-h-[250px] items-center justify-center sm:min-h-[290px]">
                                        <div className="absolute h-52 w-52 rounded-full border border-white/15 bg-white/10 blur-3xl" />
                                        <div className="absolute h-60 w-60 rounded-full border border-white/10" />
                                        <div className="absolute h-44 w-44 rounded-full border border-dashed border-white/20 animate-spin [animation-duration:12s]" />

                                        <div className="absolute left-4 top-6 rounded-[24px] border border-white/15 bg-black/15 px-4 py-3 backdrop-blur sm:left-8">
                                            <ChefHat className="h-5 w-5 text-orange-100" />
                                            <p className="mt-2 text-sm font-semibold text-white">Kitchen ready</p>
                                            <p className="text-xs text-orange-100/85">Owner setup in progress</p>
                                        </div>

                                        <div className="absolute bottom-5 left-8 rounded-[24px] border border-white/15 bg-black/15 px-4 py-3 backdrop-blur">
                                            <UtensilsCrossed className="h-5 w-5 text-orange-100" />
                                            <p className="mt-2 text-sm font-semibold text-white">Thali service</p>
                                            <p className="text-xs text-orange-100/85">Menu tools unlocking</p>
                                        </div>

                                        <div className="absolute right-3 top-16 rounded-[24px] border border-white/15 bg-black/15 px-4 py-3 backdrop-blur sm:right-8">
                                            <ShieldCheck className="h-5 w-5 text-orange-100" />
                                            <p className="mt-2 text-sm font-semibold text-white">Safe payment</p>
                                            <p className="text-xs text-orange-100/85">Gateway protected</p>
                                        </div>

                                        <div className="relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full border border-white/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),rgba(255,255,255,0.08))] shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-orange-600 shadow-lg">
                                                {loadingStage === "success" ? (
                                                    <BadgeCheck className="h-8 w-8" />
                                                ) : (
                                                    <ChefHat className="h-8 w-8" />
                                                )}
                                            </div>
                                            <p className="mt-3 text-sm font-bold text-white">Khanaaval</p>
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-orange-100">
                                                Partner Pass
                                            </p>
                                        </div>
                                    </div>

                                    <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-4xl">
                                        {activeLoadingContent?.title}
                                    </h2>
                                    <p className="mt-4 max-w-xl text-sm leading-7 text-orange-50/90 sm:text-base">
                                        {activeLoadingContent?.description}
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {["Branded onboarding", "Cloud kitchen tools", "Premium mobile flow"].map((item) => (
                                            <div
                                                key={item}
                                                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-orange-50 sm:text-sm"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 lg:p-10">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-300">
                                            {activeLoadingContent?.badge}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-200">
                                            {activeLoadingContent?.note}
                                        </p>
                                    </div>
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/10">
                                        {loadingStage === "success" ? (
                                            <BadgeCheck className="h-7 w-7 text-emerald-300" />
                                        ) : (
                                            <LoaderCircle className="h-7 w-7 animate-spin text-orange-300" />
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 rounded-[28px] border border-white/10 bg-white/6 p-5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                Live payment status
                                            </p>
                                            <p className="mt-1 text-xs text-slate-300">
                                                Simple flow while testing and while real payments run.
                                            </p>
                                        </div>
                                        <div className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-300">
                                            Khanaaval Sync
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-end gap-2">
                                        {[34, 52, 70, 48, 62].map((height, index) => (
                                            <span
                                                key={height}
                                                className="w-3 rounded-full bg-gradient-to-t from-orange-500 via-orange-400 to-orange-200 animate-pulse"
                                                style={{
                                                    height,
                                                    animationDelay: `${index * 140}ms`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    {loadingSteps.map((step, index) => {
                                        const currentStep = activeLoadingContent?.index ?? 0;
                                        const isCompleted = currentStep > index + 1 || loadingStage === "success";
                                        const isActive =
                                            loadingStage !== "success" && currentStep === index + 1;

                                        return (
                                            <div
                                                key={step}
                                                className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                                            >
                                                <div
                                                    className={`flex h-11 w-11 items-center justify-center rounded-full ${isCompleted
                                                            ? "bg-emerald-500/20 text-emerald-300"
                                                            : isActive
                                                                ? "bg-orange-500/20 text-orange-300"
                                                                : "bg-white/10 text-slate-400"
                                                        }`}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    ) : isActive ? (
                                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        <span className="text-sm font-bold">{index + 1}</span>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-white">{step}</p>
                                                    <p className="mt-1 text-xs text-slate-300">
                                                        {isCompleted
                                                            ? "Done"
                                                            : isActive
                                                                ? "Running now"
                                                                : "Coming next"}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                    {[
                                        { icon: Sparkles, label: "Premium UI" },
                                        { icon: Store, label: "Kitchen access" },
                                        { icon: Wallet, label: "Payment sync" },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.label}
                                                className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 text-center"
                                            >
                                                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-orange-300">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                                                    {item.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-24 sm:gap-8 sm:pb-8">
                <section className="relative overflow-hidden rounded-[30px] border border-orange-100/50 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-600 text-white shadow-[0_30px_70px_rgba(249,115,22,0.22)] sm:rounded-[38px]">
                    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_58%)] lg:block" />
                    <div className="grid gap-6 px-4 py-5 sm:px-8 sm:py-10 lg:grid-cols-[1.12fr,0.88fr] lg:gap-8">
                        <div className="space-y-5 self-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-orange-100 backdrop-blur sm:px-4 sm:text-sm">
                                <Sparkles className="h-4 w-4" />
                                Cloud Kitchen Partner
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200 sm:text-sm">
                                    Welcome to Cloud Kitchen Partner
                                </p>
                                <h1 className="max-w-2xl text-3xl font-black tracking-tight leading-[1.05] sm:text-5xl">
                                    Start receiving unlimited customer orders
                                </h1>
                                <p className="max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
                                    {ownerName}, unlock the full partner dashboard with a simple
                                    monthly subscription designed for kitchens that need a clean,
                                    reliable, mobile-first business workspace.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-orange-100 sm:gap-3 sm:text-sm">
                                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur sm:px-4">
                                    Unlimited orders
                                </div>
                                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur sm:px-4">
                                    Zero commission
                                </div>
                                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur sm:px-4">
                                    Premium partner tools
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
                                {[
                                    { label: "Monthly Fee", value: "Rs. 299" },
                                    { label: "Order Commission", value: "Zero" },
                                    { label: "Activation", value: "Instant" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-[22px] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur transition duration-300 hover:border-white/20 hover:bg-white/14"
                                    >
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-200">
                                            {item.label}
                                        </p>
                                        <p className="mt-2 text-xl font-black text-white">{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid gap-3 pt-2 sm:grid-cols-3">
                                {[
                                    {
                                        icon: Wallet,
                                        title: "Direct Payouts",
                                        text: "Your order earnings belong to your kitchen.",
                                    },
                                    {
                                        icon: Zap,
                                        title: "Fast Activation",
                                        text: "Start using the dashboard as soon as payment is active.",
                                    },
                                    {
                                        icon: Store,
                                        title: "Built for Owners",
                                        text: "Simple controls for one-hand daily management.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-[22px] border border-white/10 bg-black/10 px-4 py-4 backdrop-blur"
                                        >
                                            <div className="inline-flex rounded-2xl bg-white/10 p-2.5 text-orange-100">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <p className="mt-3 text-sm font-bold text-white">{item.title}</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-200">
                                                {item.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <Card className="relative rounded-[28px] border-0 bg-white/95 text-slate-900 shadow-2xl shadow-orange-200/30 sm:rounded-[34px]">
                            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
                            <CardHeader className="space-y-3 px-5 pt-5 sm:px-6 sm:pt-6">
                                <CardTitle className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500 sm:text-sm">
                                    Monthly Subscription
                                </CardTitle>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                                        Rs. 299
                                    </span>
                                    <span className="pb-2 text-sm font-medium text-slate-500">
                                        / Month
                                    </span>
                                </div>
                                <p className="text-sm leading-6 text-slate-500">
                                    Simple subscription with no extra per-order fees.
                                </p>
                                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                                    <BadgeCheck className="h-4 w-4" />
                                    Best for single kitchen owners
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3 px-5 pb-5 sm:space-y-4 sm:px-6 sm:pb-6">
                                {[
                                    { label: "Unlimited Orders", icon: Infinity },
                                    { label: "No Commission Per Order", icon: CircleDollarSign },
                                    { label: "No Hidden Charges", icon: CheckCircle2 },
                                    { label: "Cancel Anytime", icon: ArrowRight },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.label}
                                            className="flex min-h-[56px] items-center gap-3 rounded-2xl border border-orange-100/70 bg-orange-50/80 px-4 py-3 text-sm font-semibold text-slate-800"
                                        >
                                            <div className="rounded-xl bg-white p-2 text-orange-600 shadow-sm">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            {item.label}
                                        </div>
                                    );
                                })}

                                <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">
                                                No hidden cost after activation
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                                Pay one simple monthly fee and manage orders, menu,
                                                customers, and reports from one place.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    onClick={() => PaymentLogic(1)}
                                    disabled={isCheckoutPreparing}
                                    className="mt-2 hidden h-14 w-full rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-base font-bold shadow-lg shadow-orange-300 transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-80 sm:flex"
                                >
                                    {isCheckoutPreparing ? (
                                        <>
                                            <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                            Preparing secure checkout...
                                        </>
                                    ) : (
                                        "Pay Rs. 299 & Activate Account"
                                    )}
                                </Button>
                                <p className="hidden text-center text-xs font-medium text-slate-500 sm:block">
                                    Instant activation. Cancel anytime. No per-order commission.
                                </p>
                                <p className="text-center text-xs font-medium text-slate-500 sm:hidden">
                                    Scroll for full details. Quick pay button is fixed below.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[1.08fr,0.92fr]">
                    <Card className="rounded-[28px] border border-orange-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
                        <CardHeader className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
                                Premium Benefits
                            </p>
                            <CardTitle className="text-2xl font-black text-slate-950">
                                Partner Benefits
                            </CardTitle>
                            <p className="max-w-2xl text-sm leading-6 text-slate-500">
                                Everything is designed to help a small kitchen owner run the
                                business smoothly from a phone without extra technical steps.
                            </p>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            {subscriptionBenefits.map((benefit) => {
                                const Icon = benefit.icon;

                                return (
                                    <div
                                        key={benefit.id}
                                        className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-lg sm:rounded-[28px] sm:p-5"
                                    >
                                        <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-3 text-white shadow-lg shadow-orange-200">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                                            {benefit.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {benefit.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    <Card className="rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:rounded-[32px]">
                        <CardHeader className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
                                Simple Guidelines
                            </p>
                            <CardTitle className="text-2xl font-black text-slate-950">
                                How Our Platform Works
                            </CardTitle>
                            <p className="text-sm leading-6 text-slate-500">
                                Transparent pricing, direct business earnings, and clear operating
                                expectations for every kitchen partner.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {platformGuidelines.map((guideline, index) => (
                                <div
                                    key={guideline}
                                    className="flex items-start gap-3 rounded-[22px] border border-slate-100 bg-slate-50 px-4 py-4 transition hover:border-orange-100 hover:bg-white sm:gap-4 sm:rounded-[24px]"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <p className="text-sm leading-6 text-slate-700">{guideline}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-20 border-t border-orange-100 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:hidden">
                <div className="mx-auto flex w-full max-w-7xl items-center gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-500">
                            Monthly Plan
                        </p>
                        <p className="mt-1 text-lg font-black text-slate-950">Rs. 299 / Month</p>
                        <p className="text-xs text-slate-500">Instant activation, zero commission</p>
                    </div>
                    <Button
                        onClick={() => PaymentLogic(1)}
                        disabled={isCheckoutPreparing}
                        className="h-12 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 px-5 text-sm font-bold shadow-lg shadow-orange-300 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                        {isCheckoutPreparing ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                            "Activate"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
