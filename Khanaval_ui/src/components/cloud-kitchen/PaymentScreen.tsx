declare global {
    interface Window {
        Razorpay: any;
    }
}

import { useState } from "react";

import {
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    CircleDollarSign,
    LoaderCircle,
    Infinity,
    Sparkles,
    Store,
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

type PaymentFlowState =
    | "idle"
    | "creating_order"
    | "verifying_payment"
    | "activating_subscription"
    | "success";

export function PaymentScreen({ ownerName }: PaymentScreenProps) {
    const { kitchenprovider } = KitchenProviderdata();
    const { axioseInstace } = useStateContex();
    const queryclinet = useQueryClient();
    const navigate = useNavigate();
    const [paymentFlowState, setPaymentFlowState] = useState<PaymentFlowState>("idle");

    const isCheckoutPreparing = paymentFlowState === "creating_order";
    const showProcessingOverlay =
        paymentFlowState === "verifying_payment" ||
        paymentFlowState === "activating_subscription" ||
        paymentFlowState === "success";

    const overlayCopy: Record<
        Exclude<PaymentFlowState, "idle">,
        { badge: string; title: string; description: string }
    > = {
        creating_order: {
            badge: "Preparing Checkout",
            title: "Setting up your Khanaaval subscription",
            description:
                "We are creating your secure checkout session so activation can start smoothly.",
        },
        verifying_payment: {
            badge: "Payment Verification",
            title: "Checking your payment details",
            description:
                "Please stay on this screen while we verify your payment with the gateway.",
        },
        activating_subscription: {
            badge: "Activating Access",
            title: "Unlocking your partner dashboard",
            description:
                "Your subscription is being activated and your kitchen workspace is loading now.",
        },
        success: {
            badge: "Subscription Active",
            title: "Your kitchen is ready",
            description:
                "Payment confirmed successfully. Taking you to the next Khanaaval setup step.",
        },
    };

    const activeOverlayCopy = overlayCopy[paymentFlowState === "idle" ? "creating_order" : paymentFlowState];

    const stepItems = [
        { id: 0, label: "Checkout created" },
        { id: 1, label: "Payment verified" },
        { id: 2, label: "Subscription activated" },
    ];

    const getCompletedSteps = () => {
        if (paymentFlowState === "success") {
            return 3;
        }

        if (paymentFlowState === "activating_subscription") {
            return 2;
        }

        if (paymentFlowState === "verifying_payment") {
            return 1;
        }

        if (paymentFlowState === "creating_order") {
            return 0;
        }

        return -1;
    };

    const waitForPaymentActivation = async () => {
        for (let attempt = 0; attempt < 12; attempt += 1) {
            setPaymentFlowState("activating_subscription");
            const { data } = await axioseInstace.get("/api/cloudkitchens/getcurrenr-onwer-cloude");
            const latestProvider = data?.responseData;

            if (latestProvider?.isPaymentDone) {
                setPaymentFlowState("success");
                await new Promise((resolve) => window.setTimeout(resolve, 1200));
                await queryclinet.invalidateQueries({
                    queryKey: ["KitchenProvider-data"],
                });
                await queryclinet.refetchQueries({
                    queryKey: ["KitchenProvider-data"],
                });
                navigate("/CloudeKitchen");
                return true;
            }

            await new Promise((resolve) => window.setTimeout(resolve, 1200));
        }

        setPaymentFlowState("idle");
        toast({
            title: "Activation is taking a little longer",
            description: "Your payment may be processing. Please wait a moment and try again.",
        });
        return false;
    };

    const PaymentLogic = async (amount: number) => {
        try {
            setPaymentFlowState("creating_order");
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
                        setPaymentFlowState("verifying_payment");
                        await axioseInstace.post(
                            `/api/cloudkitchens/UpdatePaymentStatus/${kitchenprovider._id}`,
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                paymentAmmount: amount,
                            },
                        );
                        await waitForPaymentActivation();
                    } catch (error) {
                        setPaymentFlowState("idle");
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
                        setPaymentFlowState("idle");
                    },
                },
            };
            const razorpay = new window.Razorpay(options);
            setPaymentFlowState("idle");
            razorpay.open();

        } catch (error) {
            setPaymentFlowState("idle");
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
                    <div className="absolute inset-0 bg-slate-950/78 backdrop-blur-xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)]" />
                    <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-8">
                        <div className="grid w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.4)] lg:grid-cols-[1.08fr,0.92fr]">
                            <div className="border-b border-white/10 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-orange-50">
                                    <Sparkles className="h-4 w-4" />
                                    Khanaaval Subscription
                                </div>
                                <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                                    {activeOverlayCopy.title}
                                </h2>
                                <p className="mt-4 max-w-xl text-sm leading-7 text-orange-50/90 sm:text-base">
                                    {activeOverlayCopy.description}
                                </p>

                                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                    {[
                                        "Secured payment flow",
                                        "Instant subscription sync",
                                        "Premium kitchen onboarding",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-[22px] border border-white/15 bg-white/10 px-4 py-4 text-sm font-semibold text-orange-50 backdrop-blur"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 sm:p-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-300">
                                            {activeOverlayCopy.badge}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-200">
                                            Please keep this screen open while we finish your access.
                                        </p>
                                    </div>
                                    {paymentFlowState === "success" ? (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                                            <BadgeCheck className="h-7 w-7" />
                                        </div>
                                    ) : (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-orange-300">
                                            <LoaderCircle className="h-7 w-7 animate-spin" />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 flex items-end gap-2">
                                    {[40, 58, 74, 52].map((height, index) => (
                                        <span
                                            key={height}
                                            className="w-3 rounded-full bg-gradient-to-t from-orange-500 via-orange-400 to-orange-200 animate-pulse"
                                            style={{
                                                height,
                                                animationDelay: `${index * 160}ms`,
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="mt-8 space-y-3">
                                    {stepItems.map((step, index) => {
                                        const completedSteps = getCompletedSteps();
                                        const isComplete = completedSteps > index;
                                        const isActive =
                                            paymentFlowState !== "success" &&
                                            completedSteps === index;

                                        return (
                                            <div
                                                key={step.label}
                                                className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                                            >
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                                        isComplete
                                                            ? "bg-emerald-500/20 text-emerald-300"
                                                            : isActive
                                                              ? "bg-orange-500/20 text-orange-300"
                                                              : "bg-white/10 text-slate-400"
                                                    }`}
                                                >
                                                    {isComplete ? (
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    ) : isActive ? (
                                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        <span className="text-sm font-bold">{index + 1}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">
                                                        {step.label}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-300">
                                                        {isComplete
                                                            ? "Completed"
                                                            : isActive
                                                              ? "In progress"
                                                              : "Waiting"}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 rounded-[24px] border border-white/10 bg-white/6 px-4 py-4">
                                    <p className="text-sm font-semibold text-white">
                                        Premium onboarding in progress
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">
                                        We are securing your subscription and loading the next step
                                        for your kitchen account.
                                    </p>
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
