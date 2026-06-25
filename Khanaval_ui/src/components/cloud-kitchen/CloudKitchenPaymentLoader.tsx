import { BadgeCheck, CheckCircle2, LoaderCircle } from "lucide-react";

import type { LoadingStage } from "@/components/cloud-kitchen/useCloudKitchenPayment";

type LoaderCopy = {
    badge: string;
    title: string;
    description: string;
    note: string;
    index: number;
};

type CloudKitchenPaymentLoaderProps = {
    activeLoadingContent: LoaderCopy | null;
    loadingStage: LoadingStage;
    loadingSteps: string[];
    show: boolean;
};

export function CloudKitchenPaymentLoader({
    activeLoadingContent,
    loadingStage,
    loadingSteps,
    show,
}: CloudKitchenPaymentLoaderProps) {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[90] bg-white">
            <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4 py-8 sm:px-6">
                <div className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                    <div className="h-1.5 w-full rounded-t-[28px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Khanaaval"
                                className="h-11 w-11 rounded-2xl border border-orange-100 bg-orange-50 p-2"
                            />
                            <div>
                                <p className="text-sm font-bold text-slate-900">Khanaaval</p>
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-orange-500">
                                    Cloud Kitchen Payment
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col items-center text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-orange-200 bg-orange-50">
                                {loadingStage === "success" ? (
                                    <BadgeCheck className="h-10 w-10 text-green-600" />
                                ) : (
                                    <LoaderCircle className="h-10 w-10 animate-spin text-orange-500" />
                                )}
                            </div>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
                                {activeLoadingContent?.badge}
                            </p>
                            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                {activeLoadingContent?.title}
                            </h2>
                            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                                {activeLoadingContent?.description}
                            </p>
                        </div>

                        <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-slate-900">Current status</p>
                                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                    {activeLoadingContent?.note}
                                </span>
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
                                        className={`flex items-center gap-4 rounded-[22px] border px-4 py-4 transition ${
                                            isActive
                                                ? "border-orange-200 bg-orange-50"
                                                : isCompleted
                                                  ? "border-green-200 bg-green-50"
                                                  : "border-slate-200 bg-white"
                                        }`}
                                    >
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                                isCompleted
                                                    ? "bg-green-100 text-green-600"
                                                    : isActive
                                                      ? "bg-orange-100 text-orange-600"
                                                      : "bg-slate-100 text-slate-500"
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
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-slate-900">{step}</p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {isCompleted
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

                        <p className="mt-6 text-center text-xs font-medium text-slate-500">
                            Please do not close this screen while we finish your payment setup.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
