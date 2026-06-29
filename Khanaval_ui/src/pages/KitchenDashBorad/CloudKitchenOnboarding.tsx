import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import {
    ArrowLeft,
    CheckCircle2,
    ChevronRight,
    ImagePlus,
    LoaderCircle,
    MapPin,
    Navigation,
    Phone,
    Store,
    Upload,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { KitchenProviderdata } from "@/hooks/Provider";
import { useStateContex } from "@/context/State";

const stepItems = [
    { id: 1, label: "Step 1", title: "Kitchen basics" },
    { id: 2, label: "Step 2", title: "Photo and contact" },
    { id: 3, label: "Step 3", title: "Location and submit" },
] as const;

const submitStages = [
    "Checking your kitchen details",
    "Uploading kitchen image",
    "Saving cloud kitchen profile",
    "Refreshing dashboard access",
];

type FormState = {
    kitchenName: string;
    kitchenType: string;
    foodCategory: string;
    serviceLanguage: string;
    operatingHours: string;
    phoneNumber: string;
    whatsappNumber: string;
    aboutKitchen: string;
    addressLine: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    latitude: string;
    longitude: string;
};

const delay = (ms: number) =>
    new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });

export default function CloudKitchenOnboarding() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { kitchenprovider } = KitchenProviderdata();
    const stateContext = useStateContex();
    const axioseInstace = stateContext?.axioseInstace;
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const ownerName = kitchenprovider?.providerName || "Kitchen Owner";
    const ownerPhone = kitchenprovider?.phoneNumber || "";

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedImageName, setSelectedImageName] = useState("");
    const [stepLoading, setStepLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeSubmitStage, setActiveSubmitStage] = useState(-1);
    const [locationState, setLocationState] = useState<"idle" | "fetching" | "ready" | "error">("idle");
    const [locationMessage, setLocationMessage] = useState(
        "Use current location to fill latitude, longitude, and address quickly.",
    );
    const [formState, setFormState] = useState<FormState>({
        kitchenName: `${ownerName}'s Cloud Kitchen`,
        kitchenType: "Cloud Kitchen",
        foodCategory: "North Indian, Biryani, Thali",
        serviceLanguage: "English, Hindi, Marathi",
        operatingHours: "9:00 AM - 8:00 PM",
        phoneNumber: ownerPhone,
        whatsappNumber: "",
        aboutKitchen:
            "Homestyle meals, fresh daily menu, and fast delivery for lunch and dinner customers.",
        addressLine: "",
        landmark: "",
        city: "Pune",
        state: "Maharashtra",
        pincode: "",
        latitude: "",
        longitude: "",
    });

    const updateField = (field: keyof FormState, value: string) => {
        setFormState((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const validateStep = (step: number) => {
        if (step === 1) {
            if (!formState.kitchenName.trim()) {
                toast({
                    title: "Kitchen name is required",
                    description: "Add your kitchen name before continuing.",
                });
                return false;
            }

            if (!formState.foodCategory.trim()) {
                toast({
                    title: "Food category is required",
                    description: "Tell us what kind of food your kitchen serves.",
                });
                return false;
            }
        }

        if (step === 2) {
            if (!selectedImage) {
                toast({
                    title: "Kitchen image is required",
                    description: "Upload one kitchen image before moving ahead.",
                });
                return false;
            }

            if (!formState.phoneNumber.trim()) {
                toast({
                    title: "Contact number is required",
                    description: "Add a valid contact number for your kitchen.",
                });
                return false;
            }
        }

        if (step === 3) {
            if (!formState.addressLine.trim()) {
                toast({
                    title: "Address is required",
                    description: "Add your kitchen address before submitting.",
                });
                return false;
            }

            if (!formState.city.trim() || !formState.state.trim() || !formState.pincode.trim()) {
                toast({
                    title: "Complete the location details",
                    description: "City, state, and pincode are required.",
                });
                return false;
            }

            if (!formState.latitude.trim() || !formState.longitude.trim()) {
                toast({
                    title: "Coordinates are required",
                    description: "Fetch or enter latitude and longitude before submitting.",
                });
                return false;
            }
        }

        return true;
    };

    const changeStep = async (direction: "next" | "prev") => {
        if (direction === "next" && !validateStep(currentStep)) {
            return;
        }

        setStepLoading(true);
        await delay(320);
        setCurrentStep((current) => (direction === "next" ? current + 1 : current - 1));
        setStepLoading(false);
    };

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setSelectedImage(file);
        setSelectedImageName(file.name);
    };

    const fetchLocationDetails = async () => {
        if (!navigator.geolocation) {
            setLocationState("error");
            setLocationMessage("Location is not supported in this browser.");
            return;
        }

        setLocationState("fetching");
        setLocationMessage("Fetching your current location...");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude.toFixed(6);
                const longitude = position.coords.longitude.toFixed(6);

                updateField("latitude", latitude);
                updateField("longitude", longitude);

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                    );
                    const data = await response.json();
                    const address = data?.address ?? {};

                    setFormState((current) => ({
                        ...current,
                        latitude,
                        longitude,
                        addressLine: data?.display_name || current.addressLine,
                        landmark:
                            address.neighbourhood ||
                            address.suburb ||
                            address.road ||
                            current.landmark,
                        city: address.city || address.town || address.village || current.city,
                        state: address.state || current.state,
                        pincode: address.postcode || current.pincode,
                    }));

                    setLocationState("ready");
                    setLocationMessage("Location fetched successfully. You can still edit any field.");
                } catch {
                    setLocationState("ready");
                    setLocationMessage(
                        "Coordinates were fetched. Fill the remaining address fields manually if needed.",
                    );
                }
            },
            () => {
                setLocationState("error");
                setLocationMessage("Unable to fetch location. Please allow GPS permission and try again.");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            },
        );
    };

    const handleSubmit = async () => {
        if (!validateStep(3)) {
            return;
        }

        if (!selectedImage) {
            toast({
                title: "Kitchen image is required",
                description: "Please upload an image before submitting.",
            });
            return;
        }

        if (!axioseInstace) {
            toast({
                title: "Something went wrong",
                description: "App state is not ready yet. Please try again.",
            });
            return;
        }

        try {
            setIsSubmitting(true);

            setActiveSubmitStage(0);
            await delay(500);

            setActiveSubmitStage(1);
            const formData = new FormData();
            formData.append("cover", selectedImage);
            formData.append("kitchen", selectedImage);
            const uploadResponse = await axioseInstace.post("/api/provider/ImageUrl", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const imageUrl =
                uploadResponse.data?.urls?.kitchen || uploadResponse.data?.urls?.cover;
                if (!imageUrl) {
                    throw new Error("Image upload failed");
                }
                setActiveSubmitStage(2);
                const {data} = await axioseInstace.post("/api/cloudkitchens/register-kitchen", {
                    kitchenName: formState.kitchenName,
                    kitchenType: formState.kitchenType,
                    foodCategory: formState.foodCategory,
                    serviceLanguage: formState.serviceLanguage,
                    phoneNumber: formState.phoneNumber,
                    whatsappNumber: formState.whatsappNumber,
                    operatingHours: formState.operatingHours,
                    aboutKitchen: formState.aboutKitchen,
                    imageUrl,
                    addressLine: formState.addressLine,
                    landmark: formState.landmark,
                    city: formState.city,
                    state: formState.state,
                    pincode: formState.pincode,
                    latitude: formState.latitude,
                    longitude: formState.longitude,
                });
                console.log(data)

            setActiveSubmitStage(3);
            await queryClient.invalidateQueries({
                queryKey: ["KitchenProvider-data"],
            });
            await queryClient.refetchQueries({
                queryKey: ["KitchenProvider-data"],
            });
             await queryClient.invalidateQueries({
                queryKey: ["Kithen-data"],
            });
            await queryClient.refetchQueries({
                queryKey: ["Kithen-data"],
            });

            toast({
                title: "Kitchen registered successfully",
                description: "Your cloud kitchen setup is complete.",
            });

            await delay(700);
            navigate("/CloudeKitchen");
        } catch (error) {
            toast({
                title: "Unable to complete onboarding",
                description: "Please try again in a moment.",
            });
        } finally {
            setIsSubmitting(false);
            setActiveSubmitStage(-1);
        }
    };

    const renderStepContent = () => {
        if (currentStep === 1) {
            return (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="kitchenName">Kitchen Name</Label>
                        <Input
                            id="kitchenName"
                            className="h-12 rounded-2xl"
                            value={formState.kitchenName}
                            onChange={(event) => updateField("kitchenName", event.target.value)}
                            placeholder="Enter kitchen name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="kitchenType">Kitchen Type</Label>
                        <Input
                            id="kitchenType"
                            className="h-12 rounded-2xl"
                            value={formState.kitchenType}
                            onChange={(event) => updateField("kitchenType", event.target.value)}
                            placeholder="Cloud Kitchen"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="foodCategory">Food Category</Label>
                        <Input
                            id="foodCategory"
                            className="h-12 rounded-2xl"
                            value={formState.foodCategory}
                            onChange={(event) => updateField("foodCategory", event.target.value)}
                            placeholder="North Indian, Biryani, Thali"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="serviceLanguage">Language</Label>
                        <Input
                            id="serviceLanguage"
                            className="h-12 rounded-2xl"
                            value={formState.serviceLanguage}
                            onChange={(event) => updateField("serviceLanguage", event.target.value)}
                            placeholder="English, Hindi, Marathi"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="operatingHours">Operating Hours</Label>
                        <Input
                            id="operatingHours"
                            className="h-12 rounded-2xl"
                            value={formState.operatingHours}
                            onChange={(event) => updateField("operatingHours", event.target.value)}
                            placeholder="9:00 AM - 8:00 PM"
                        />
                    </div>
                </div>
            );
        }

        if (currentStep === 2) {
            return (
                <div className="space-y-4">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        onClick={openFilePicker}
                        className="w-full rounded-[28px] border border-dashed border-orange-200 bg-orange-50/70 p-5 text-left transition hover:border-orange-300 hover:bg-orange-50"
                    >
                        <div className="flex flex-col items-center gap-4 rounded-[24px] bg-white px-5 py-8 text-center">
                            <div className="rounded-3xl bg-orange-100 p-4 text-orange-600">
                                <ImagePlus className="h-7 w-7" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-slate-950">Upload Kitchen Photo</p>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Choose one clear kitchen image from your phone.
                                </p>
                            </div>
                            <div className="inline-flex items-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                                <Upload className="mr-2 h-4 w-4" />
                                Choose Image
                            </div>
                            <p className="text-sm font-medium text-slate-600">
                                {selectedImageName || "No file selected yet"}
                            </p>
                        </div>
                    </button>

                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Contact Number</Label>
                        <Input
                            id="phoneNumber"
                            className="h-12 rounded-2xl"
                            value={formState.phoneNumber}
                            onChange={(event) => updateField("phoneNumber", event.target.value)}
                            placeholder="Enter mobile number"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                        <Input
                            id="whatsappNumber"
                            className="h-12 rounded-2xl"
                            value={formState.whatsappNumber}
                            onChange={(event) => updateField("whatsappNumber", event.target.value)}
                            placeholder="Enter WhatsApp number"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aboutKitchen">Kitchen Details</Label>
                        <Textarea
                            id="aboutKitchen"
                            className="min-h-[120px] rounded-[24px] px-4 py-3"
                            value={formState.aboutKitchen}
                            onChange={(event) => updateField("aboutKitchen", event.target.value)}
                            placeholder="Write a short kitchen description"
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <div className="rounded-2xl bg-orange-100 p-2.5 text-orange-600">
                                <Navigation className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-slate-950">Fetch Current Location</p>
                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                    {locationMessage}
                                </p>
                            </div>
                        </div>
                        <Button
                            type="button"
                            className="h-12 rounded-2xl bg-slate-950 font-semibold hover:bg-slate-800"
                            onClick={fetchLocationDetails}
                            disabled={locationState === "fetching"}
                        >
                            {locationState === "fetching" ? (
                                <>
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    Fetching Location
                                </>
                            ) : (
                                <>
                                    <MapPin className="mr-2 h-4 w-4" />
                                    Use Current Location
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="addressLine">Address</Label>
                    <Input
                        id="addressLine"
                        className="h-12 rounded-2xl"
                        value={formState.addressLine}
                        onChange={(event) => updateField("addressLine", event.target.value)}
                        placeholder="Flat, building, street, area"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="landmark">Landmark</Label>
                    <Input
                        id="landmark"
                        className="h-12 rounded-2xl"
                        value={formState.landmark}
                        onChange={(event) => updateField("landmark", event.target.value)}
                        placeholder="Near school, metro, market"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            className="h-12 rounded-2xl"
                            value={formState.city}
                            onChange={(event) => updateField("city", event.target.value)}
                            placeholder="City"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                            id="state"
                            className="h-12 rounded-2xl"
                            value={formState.state}
                            onChange={(event) => updateField("state", event.target.value)}
                            placeholder="State"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                            id="pincode"
                            className="h-12 rounded-2xl"
                            value={formState.pincode}
                            onChange={(event) => updateField("pincode", event.target.value)}
                            placeholder="Pincode"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="latitude">Lat</Label>
                        <Input
                            id="latitude"
                            className="h-12 rounded-2xl"
                            value={formState.latitude}
                            onChange={(event) => updateField("latitude", event.target.value)}
                            placeholder="Lat"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="longitude">Lng</Label>
                        <Input
                            id="longitude"
                            className="h-12 rounded-2xl"
                            value={formState.longitude}
                            onChange={(event) => updateField("longitude", event.target.value)}
                            placeholder="Lng"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_24%),linear-gradient(180deg,#fff7ed_0%,#ffffff_42%,#f8fafc_100%)] px-4 py-5">
            {(stepLoading || isSubmitting) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm">
                    <Card className="w-full max-w-sm rounded-[28px] border-0 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.18)]">
                        <CardContent className="p-6 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                <LoaderCircle className="h-6 w-6 animate-spin" />
                            </div>
                            <h2 className="text-xl font-black text-slate-950">
                                {isSubmitting ? "Setting up kitchen" : "Loading next step"}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {isSubmitting
                                    ? activeSubmitStage >= 0
                                        ? submitStages[activeSubmitStage]
                                        : "Preparing your request"
                                    : "Please wait a moment"}
                            </p>

                            {isSubmitting && (
                                <div className="mt-5 space-y-2 text-left">
                                    {submitStages.map((stage, index) => {
                                        const isDone = index < activeSubmitStage;
                                        const isActive = index === activeSubmitStage;

                                        return (
                                            <div
                                                key={stage}
                                                className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${
                                                    isDone
                                                        ? "bg-emerald-50"
                                                        : isActive
                                                          ? "bg-orange-50"
                                                          : "bg-slate-50"
                                                }`}
                                            >
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                        isDone
                                                            ? "bg-emerald-500 text-white"
                                                            : isActive
                                                              ? "bg-orange-500 text-white"
                                                              : "bg-white text-slate-400"
                                                    }`}
                                                >
                                                    {isDone ? (
                                                        <CheckCircle2 className="h-4 w-4" />
                                                    ) : isActive ? (
                                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">{stage}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="mx-auto w-full max-w-md">
                <div className="mb-4 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        className="h-11 rounded-2xl px-3 text-slate-600"
                        onClick={() => navigate("/CloudeKitchen")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <div className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-sm">
                        {stepItems[currentStep - 1].label}
                    </div>
                </div>

                <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                    <CardHeader className="space-y-4 pb-4">
                        <div className="flex items-start gap-3">
                            <div className="rounded-3xl bg-orange-100 p-3 text-orange-600">
                                {currentStep === 1 ? (
                                    <Store className="h-5 w-5" />
                                ) : currentStep === 2 ? (
                                    <ImagePlus className="h-5 w-5" />
                                ) : (
                                    <Phone className="h-5 w-5" />
                                )}
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight text-slate-950">
                                    {stepItems[currentStep - 1].title}
                                </CardTitle>
                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                    Complete one simple step at a time.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {stepItems.map((step) => {
                                const isActive = step.id === currentStep;
                                const isDone = step.id < currentStep;

                                return (
                                    <div
                                        key={step.id}
                                        className={`rounded-2xl px-3 py-3 text-center transition ${
                                            isActive
                                                ? "bg-orange-50 text-orange-600"
                                                : isDone
                                                  ? "bg-emerald-50 text-emerald-600"
                                                  : "bg-slate-50 text-slate-400"
                                        }`}
                                    >
                                        <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold shadow-sm">
                                            {isDone ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                                        </div>
                                        <p className="mt-2 text-[11px] font-semibold">{step.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="animate-in fade-in-0 slide-in-from-right-1 duration-300">
                            {renderStepContent()}
                        </div>

                        <div className="rounded-[24px] bg-slate-50 px-4 py-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                                Quick Note
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                This onboarding is designed for mobile use, so each screen only asks
                                for the details needed right now.
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-12 rounded-2xl border-slate-200 px-5"
                                onClick={
                                    currentStep === 1
                                        ? () => navigate("/CloudeKitchen")
                                        : () => changeStep("prev")
                                }
                                disabled={stepLoading || isSubmitting}
                            >
                                {currentStep === 1 ? "Cancel" : "Previous"}
                            </Button>

                            {currentStep < 3 ? (
                                <Button
                                    type="button"
                                    className="h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 font-bold hover:opacity-95"
                                    onClick={() => changeStep("next")}
                                    disabled={stepLoading || isSubmitting}
                                >
                                    Continue
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    className="h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 font-bold hover:opacity-95"
                                    onClick={handleSubmit}
                                    disabled={stepLoading || isSubmitting}
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
