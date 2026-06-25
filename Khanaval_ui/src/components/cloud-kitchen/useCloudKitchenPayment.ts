import { useState } from "react";
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: any;
    }
}

import { useStateContex } from "@/context/State";
import { KitchenProviderdata } from "@/hooks/Provider";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


export type LoadingStage = "idle" | "checkout" | "verifying" | "activating" | "success";

export const loadingContent = {
    checkout: {
        index: 0,
        badge: "Preparing Checkout",
        title: "Preparing payment",
        description: "Opening your secure payment window.",
        note: "Please wait",
    },
    verifying: {
        index: 1,
        badge: "Payment Received",
        title: "Verifying payment",
        description: "Please keep this screen open while Khanaaval confirms your payment details.",
        note: "Checking payment status",
    },
    activating: {
        index: 2,
        badge: "Activating Access",
        title: "Activating your kitchen account",
        description: "We are enabling your subscription and loading your next screen.",
        note: "Updating your partner access",
    },
    success: {
        index: 3,
        badge: "Success",
        title: "Payment successful",
        description: "Your Khanaaval subscription is active. Redirecting you now.",
        note: "Taking you forward",
    },
} satisfies Record<
    Exclude<LoadingStage, "idle">,
    {
        index: number;
        badge: string;
        title: string;
        description: string;
        note: string;
    }
>;

export const loadingSteps = [
    "Checkout prepared",
    "Payment verified",
    "Kitchen access activated",
];

export function useCloudKitchenPayment() {
    const { kitchenprovider } = KitchenProviderdata();
    const { axioseInstace } = useStateContex();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [loadingStage, setLoadingStage] = useState<LoadingStage>("idle");

    const isCheckoutPreparing = loadingStage === "checkout";
    const showProcessingOverlay =
        loadingStage === "verifying" ||
        loadingStage === "activating" ||
        loadingStage === "success";
    const activeLoadingContent =
        loadingStage === "idle" ? null : loadingContent[loadingStage];

    const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
    const stageTestDelayMs = import.meta.env.DEV ? 900 : 0;

    const addTestingDelay = async () => {
        if (stageTestDelayMs > 0) {
            await delay(stageTestDelayMs);
        }
    };

    const syncPaymentStatus = async () => {
        setLoadingStage("activating");
        await addTestingDelay();

        for (let attempt = 0; attempt < 12; attempt += 1) {
            const { data } = await axioseInstace.get("/api/cloudkitchens/getcurrenr-onwer-cloude");
            const latestProvider = data?.responseData;

            if (latestProvider?.isPaymentDone) {
                setLoadingStage("success");
                await addTestingDelay();
                await delay(1200);
                await queryClient.invalidateQueries({
                    queryKey: ["KitchenProvider-data"],
                });
                await queryClient.refetchQueries({
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

    const payNow = async (amount: number) => {
        if (!kitchenprovider?._id) {
            toast({
                title: "Profile not ready",
                description: "Please wait a moment and try payment again.",
            });
            return;
        }

        try {
            setLoadingStage("checkout");
            await addTestingDelay();
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handler: async function (response: any) {
                    try {
                        setLoadingStage("verifying");
                        await addTestingDelay();
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

    return {
        activeLoadingContent,
        isCheckoutPreparing,
        loadingStage,
        loadingSteps,
        payNow,
        showProcessingOverlay,
    };
}
