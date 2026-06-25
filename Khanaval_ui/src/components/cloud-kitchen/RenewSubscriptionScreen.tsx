import { AlertTriangle, CalendarDays, Clock3, RefreshCcw, Wallet } from "lucide-react";

import { CloudKitchenPaymentLoader } from "@/components/cloud-kitchen/CloudKitchenPaymentLoader";
import { useCloudKitchenPayment } from "@/components/cloud-kitchen/useCloudKitchenPayment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RenewSubscriptionScreenProps = {
    ownerName: string;
    subscriptionEndDate?: string | null;
    lastPaymentDate?: string | null;
};

const formatDate = (value?: string | null) => {
    if (!value) {
        return "Not available";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Not available";
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(parsedDate);
};

export function RenewSubscriptionScreen({
    ownerName,
    subscriptionEndDate,
    lastPaymentDate,
}: RenewSubscriptionScreenProps) {
    const {
        activeLoadingContent,
        isCheckoutPreparing,
        loadingStage,
        loadingSteps,
        payNow,
        showProcessingOverlay,
    } = useCloudKitchenPayment();
    const expiredOn = formatDate(subscriptionEndDate);
    const lastPaidOn = formatDate(lastPaymentDate);

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_38%,#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
            <CloudKitchenPaymentLoader
                activeLoadingContent={activeLoadingContent}
                loadingStage={loadingStage}
                loadingSteps={loadingSteps}
                show={showProcessingOverlay}
            />
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                <Card className="overflow-hidden rounded-[32px] border-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_28px_60px_rgba(15,23,42,0.2)]">
                    <CardContent className="flex flex-col gap-5 px-6 py-8 sm:px-8 sm:py-10">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-200 backdrop-blur">
                            <AlertTriangle className="h-4 w-4" />
                            Subscription Expired
                        </div>
                        <div className="space-y-3">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">
                                Hello, {ownerName}
                            </p>
                            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                                Renew your monthly kitchen subscription
                            </h1>
                            <p className="max-w-2xl text-base leading-7 text-slate-200">
                                Your Khanaaval kitchen plan has expired. Renew this month for
                                `Rs. 299` to continue using the partner dashboard.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-[1fr,0.92fr]">
                    <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                        <CardHeader className="space-y-3">
                            <div className="inline-flex w-fit rounded-2xl bg-orange-50 p-3 text-orange-600">
                                <RefreshCcw className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-3xl font-black text-slate-950">
                                Renew for Rs. 299
                            </CardTitle>
                            <p className="text-base leading-7 text-slate-600">
                                Renew your expired plan and continue using the kitchen dashboard.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-[24px] border border-orange-100 bg-orange-50/80 p-4">
                                <div className="flex items-center gap-3">
                                    <Wallet className="h-5 w-5 text-orange-600" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            Monthly Renewal Plan
                                        </p>
                                        <p className="mt-1 text-sm text-slate-600">
                                            Standard partner renewal with dashboard access.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="button"
                                onClick={() => payNow(1)}
                                disabled={isCheckoutPreparing}
                                className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-base font-bold shadow-lg shadow-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isCheckoutPreparing
                                    ? "Preparing secure checkout..."
                                    : "Renew Subscription for Rs. 299"}
                            </Button>
                            <p className="text-center text-xs font-medium text-slate-500">
                                Continue with the same Khanaaval payment flow for renewal.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                        <CardHeader className="space-y-3">
                            <div className="inline-flex w-fit rounded-2xl bg-slate-100 p-3 text-slate-700">
                                <CalendarDays className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-2xl font-black text-slate-950">
                                Subscription Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3 rounded-[22px] bg-slate-50 px-4 py-4">
                                <Clock3 className="mt-0.5 h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Expired On</p>
                                    <p className="mt-1 text-sm text-slate-600">{expiredOn}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-[22px] bg-slate-50 px-4 py-4">
                                <Wallet className="mt-0.5 h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Last Payment Date
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600">{lastPaidOn}</p>
                                </div>
                            </div>

                            <div className="rounded-[22px] bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                                Renew your subscription to continue kitchen setup, order handling,
                                customer management, and partner dashboard access.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
