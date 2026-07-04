import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  LogOut, ChevronRight, MapPin, History, ShieldCheck, 
  UtensilsCrossed, Clock, Mail, QrCode, Calendar, ChevronDown, ChevronUp,
  Search, Loader2, Navigation, Home, Building2, Landmark, Receipt
} from "lucide-react";
import { useCurrentUser } from "@/hooks/user-hook";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useStateContex } from "@/context/State";

export default function KhanavalProfile() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const stateContext = useStateContex();
  
  const [showHistory, setShowHistory] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address: "",
    houseNo: "",
    society: "",
    landmark: "",
    suburb: "",
    city: "",
    state: "",
    postcode: "",
    lat: "",
    lng: "",
  });

  const axioseInstace = stateContext?.axioseInstace;

  const myMess = user?.myMess;
  const savedAddresses = Array.isArray(user?.Address) ? user.Address : [];
  const total = myMess?.totalDays || 1; 
  const remaining = myMess?.RemainingDay || 0;
  const totalScansCount = myMess?.allScans?.length || 0;

  // Formatter for: "Monday, 26 Jan • 01:07 PM"
  const formatScanTime = (val) => {
    if (!val) return { relative: "No scans", fullInfo: "N/A" };
    const date = new Date(Number(val));
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' }); 
    const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const fullInfo = `${dayName}, ${dateStr} • ${timeStr}`;

    let relative = "";
    if (diffInMinutes < 1) relative = "Just now";
    else if (diffInMinutes < 60) relative = `${diffInMinutes}m ago`;
    else if (diffInMinutes < 1440) relative = `${Math.floor(diffInMinutes / 60)}h ago`;
    else relative = `${Math.floor(diffInMinutes / 1440)}d ago`;

    return { relative, fullInfo };
  };

  const formatDateOnly = (val) => {
    if (!val) return "N/A";
    const date = new Date(Number(val));
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const latestScan = formatScanTime(myMess?.lastScannedAt);
  const percentage = Math.min(100, Math.max(0, (remaining / total) * 100));

  const handlelogout = () => {
    window.localStorage.removeItem("_user_Token__");
    queryClient.invalidateQueries({ queryKey: ["current_user"] });
    queryClient.clear();
    navigate("/auth");
  };

  useEffect(() => {
    if (!savedAddresses.length) {
      return;
    }

    const latestAddress = savedAddresses[savedAddresses.length - 1];

    setAddressForm({
      address: latestAddress?.address || "",
      houseNo: latestAddress?.houseNo || "",
      society: latestAddress?.society || "",
      landmark: latestAddress?.landmark || "",
      suburb: latestAddress?.suburb || "",
      city: latestAddress?.city || "",
      state: latestAddress?.state || "",
      postcode: latestAddress?.postcode || "",
      lat:
        typeof latestAddress?.lat === "number"
          ? String(latestAddress.lat)
          : "",
      lng:
        typeof latestAddress?.lng === "number"
          ? String(latestAddress.lng)
          : "",
    });
  }, [savedAddresses]);

  const updateAddressField = (field: keyof typeof addressForm, value: string) => {
    setAddressForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your device does not support geolocation.",
        variant: "destructive",
      });
      return;
    }

    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setAddressForm((current) => ({
          ...current,
          lat: latitude.toFixed(6),
          lng: longitude.toFixed(6),
          address: current.address || "Current location selected",
        }));
        toast({
          title: "Current location added",
          description: "Latitude and longitude were filled for this address.",
        });
        setIsFetchingLocation(false);
      },
      () => {
        toast({
          title: "Could not fetch location",
          description: "Allow location permission and try again.",
          variant: "destructive",
        });
        setIsFetchingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
      },
    );
  };

  const saveUserAddress = async () => {
    if (!axioseInstace) {
      return;
    }

    if (
      !addressForm.address ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.postcode
    ) {
      toast({
        title: "Fill required address fields",
        description: "Address, city, state, and postcode are required.",
        variant: "destructive",
      });
      return;
    }

    const lat = Number(addressForm.lat);
    const lng = Number(addressForm.lng);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      toast({
        title: "Location required",
        description: "Use current location or enter valid latitude and longitude.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSavingAddress(true);
      const { data } = await axioseInstace.post("/api/user/Update-user-address", {
        address: addressForm.address,
        houseNo: addressForm.houseNo,
        society: addressForm.society,
        landmark: addressForm.landmark,
        suburb: addressForm.suburb,
        city: addressForm.city,
        state: addressForm.state,
        postcode: addressForm.postcode,
        lat,
        lng,
      });

      if (data.success) {
        await queryClient.invalidateQueries({ queryKey: ["current_user"] });
        await queryClient.refetchQueries({ queryKey: ["current_user"] });
        setIsAddressDialogOpen(false);
        toast({
          title: "Address saved",
          description: "Your delivery address is now available on profile.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Address save failed",
        description:
          error?.response?.data?.message || "Please try again once.",
        variant: "destructive",
      });
    } finally {
      setIsSavingAddress(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF9] pb-24 selection:bg-orange-100">
      <div className="relative h-40 lg:h-56 bg-gradient-to-r from-orange-600 to-orange-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]" />
        <div className="absolute -bottom-16 left-0 right-0 h-32 bg-[#FFFBF9] rounded-[100%] scale-x-125" />
      </div>
      <div className="container mx-auto max-w-3xl px-4 lg:px-8 -mt-20 lg:-mt-28 relative z-10">
        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <img
              src={user?.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.first_name}`}
              className="w-28 h-28 lg:w-40 lg:h-40 rounded-[40px] lg:rounded-[50px] bg-white border-4 lg:border-8 border-white shadow-2xl relative object-cover"
              alt="Profile"
            />
            <div className="absolute bottom-1 right-1 lg:bottom-3 lg:right-3 bg-green-500 rounded-xl p-1.5 lg:p-2.5 border-2 lg:border-4 border-white shadow-lg">
              <ShieldCheck className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>
          </div>
          <div className="text-center mt-4 lg:mt-6 space-y-1">
            <h1 className="text-xl lg:text-3xl font-black text-slate-900 leading-tight">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-slate-500 font-medium text-xs lg:text-base flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> {user?.emailId}
            </p>
          </div>
        </div>

        {myMess && remaining > 0 && (
          <button 
            onClick={() => navigate("/scan-qr")}
            className="w-full mb-8 bg-slate-900 text-white rounded-[28px] lg:rounded-[35px] p-5 lg:p-8 shadow-xl flex items-center justify-between active:scale-[0.98] transition-all border-b-4 border-slate-950"
          >
            <div className="flex items-center gap-4 lg:gap-6 text-left">
              <div className="bg-orange-500 p-3 lg:p-5 rounded-2xl lg:rounded-3xl shrink-0">
                <QrCode className="w-6 h-6 lg:w-10 lg:h-10" />
              </div>
              <div>
                <p className="text-base lg:text-2xl font-black leading-tight">Check-in for Meal</p>
                <p className="text-slate-400 text-[10px] lg:text-sm font-bold uppercase mt-1">
                   Scan at {myMess.messId?.identity?.name || "Mess"}
                </p>
              </div>
            </div>
            <div className="h-10 w-10 lg:h-14 lg:w-14 rounded-full bg-white/10 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 lg:w-8 lg:h-8 text-white" />
            </div>
          </button>
        )}

        {/* Subscription Section */}
        {myMess ? (
          <Card className="border-none shadow-lg rounded-[32px] lg:rounded-[45px] overflow-hidden bg-white mb-8">
            <CardContent className="p-6 lg:p-10">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4 lg:gap-6 min-w-0">
                  <div className="w-12 h-12 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl flex items-center justify-center shrink-0 bg-orange-50">
                    <UtensilsCrossed className="w-6 h-6 lg:w-10 lg:h-10 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg lg:text-2xl font-black text-slate-900 truncate">{myMess.messId?.identity?.name || "Mess"}</h3>
                    <div className="flex flex-col gap-1 mt-1 lg:mt-2">
                        <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg w-fit border border-orange-100">
                            <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span className="text-[9px] lg:text-xs font-black uppercase tracking-tight">
                                Latest: {latestScan.fullInfo}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 ml-1">
                          <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span className="text-[9px] lg:text-xs font-black uppercase">Start: {formatDateOnly(myMess.startAt)}</span>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] lg:text-xs font-black text-slate-300 uppercase">Price</p>
                  <p className="text-slate-900 font-black text-lg lg:text-2xl">₹{myMess.price}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[28px] lg:rounded-[35px] p-6 lg:p-10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1 lg:gap-2">
                    <span className="text-4xl lg:text-7xl font-black tracking-tighter text-slate-900">
                      {remaining}
                    </span>
                    <span className="text-xs lg:text-xl text-slate-400 font-bold uppercase">Meals Left</span>
                  </div>
                  <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Plan: {total} Days</p>
                </div>

                <div className="relative w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90 absolute">
                    <circle cx="50%" cy="50%" r="35%" stroke="currentColor" strokeWidth="10%" fill="transparent" className="text-slate-200" />
                    <circle
                      cx="50%" cy="50%" r="35%"
                      stroke="currentColor" strokeWidth="10%" fill="transparent" strokeLinecap="round"
                      style={{ 
                        strokeDasharray: "220%", 
                        strokeDashoffset: `${220 - (percentage * 2.2)}%` 
                      }}
                      className="text-orange-500 transition-all duration-1000"
                    />
                  </svg>
                  <History className="w-5 h-5 lg:w-8 lg:h-8 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Empty State: No Mess Registered */
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] lg:rounded-[45px] p-8 lg:p-12 mb-8 text-center shadow-sm">
            <div className="w-16 h-16 lg:w-24 lg:h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="w-8 h-8 lg:w-12 lg:h-12 text-orange-200" />
            </div>
            <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-2">No Active Subscription</h3>
            <p className="text-slate-500 text-sm lg:text-base font-medium max-w-xs mx-auto mb-8">
              You aren't registered with any mess yet. Join a mess to track your meals here.
            </p>
            <button 
              onClick={() => navigate("/mess")}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-lg shadow-orange-100 active:scale-95"
            >
              <Search className="w-5 h-5" /> Find a Mess
            </button>
          </div>
        )}

        {/* Scan History Toggle */}
        {myMess?.allScans && myMess.allScans.length > 0 && (
          <div className="mb-8">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between p-5 lg:p-7 bg-white border border-slate-100 rounded-3xl lg:rounded-[35px] shadow-sm hover:border-orange-200 transition-all"
            >
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="bg-orange-100 p-2.5 lg:p-3.5 rounded-xl lg:rounded-2xl">
                   <History className="w-4 h-4 lg:w-6 lg:h-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <span className="block text-xs lg:text-lg font-black text-slate-700 uppercase tracking-wider">
                    Full Scan History ({totalScansCount})
                  </span>
                  <span className="text-[10px] lg:text-xs text-slate-400 font-bold uppercase">Total Meals Tracked</span>
                </div>
              </div>
              {showHistory ? <ChevronUp className="w-5 h-5 lg:w-7 lg:h-7 text-slate-400" /> : <ChevronDown className="w-5 h-5 lg:w-7 lg:h-7 text-slate-400" />}
            </button>
            
            {showHistory && (
              <div className="mt-4 space-y-3 lg:space-y-4 px-2">
                {[...myMess.allScans].reverse().map((scan, index) => {
                  const timeData = formatScanTime(scan.scannedAt);
                  return (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 lg:p-6 bg-white/60 border border-slate-100 rounded-2xl lg:rounded-3xl hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-3 lg:gap-5">
                        <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5 lg:w-7 lg:h-7" />
                        </div>
                        <div>
                          <p className="font-bold lg:font-black text-slate-800 text-sm lg:text-lg tracking-tight">Meal Verified</p>
                          <p className="text-[10px] lg:text-sm font-bold text-slate-400 uppercase mt-0.5">
                            {timeData.fullInfo}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[9px] lg:text-xs px-2 lg:px-4 py-1">
                        {timeData.relative}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <Card className="mb-8 overflow-hidden rounded-[34px] border border-orange-100/70 bg-[linear-gradient(180deg,#ffffff_0%,#fff9f4_100%)] shadow-[0_18px_45px_rgba(249,115,22,0.10)] lg:rounded-[45px]">
          <CardContent className="p-3">
            <div className="rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-orange-600">
                    <MapPin className="h-3 w-3" />
                    Delivery Address
                  </div>
                  <h2 className="mt-2 text-lg font-black text-slate-900">
                    Saved address
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Add or update your delivery location in one popup.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => setIsAddressDialogOpen(true)}
                  className="h-10 shrink-0 rounded-2xl bg-orange-500 px-4 text-xs font-black text-white hover:bg-orange-600"
                >
                  {savedAddresses.length > 0 ? "Edit" : "Add"}
                </Button>
              </div>

              <div className="mt-3 rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                      Current address
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-black text-slate-900">
                      {savedAddresses[savedAddresses.length - 1]?.address || "No address saved yet"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {savedAddresses.length > 0
                        ? [savedAddresses[savedAddresses.length - 1]?.city, savedAddresses[savedAddresses.length - 1]?.state, savedAddresses[savedAddresses.length - 1]?.postcode]
                            .filter(Boolean)
                            .join(", ")
                        : "Tap add to save your location"}
                    </p>
                  </div>
                  {savedAddresses.length > 0 && (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      Saved
                    </Badge>
                  )}
                </div>
              </div>

              {savedAddresses.length > 0 && (
                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                      Already created addresses
                    </p>
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                      {savedAddresses.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {savedAddresses.slice().reverse().map((savedAddress, index) => (
                      <div
                        key={`${savedAddress.address}-${savedAddress.postcode}-${index}`}
                        className="rounded-[18px] border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="line-clamp-1 text-xs font-black text-slate-900">
                              {savedAddress.address}
                            </p>
                            <p className="mt-1 line-clamp-1 text-[11px] text-slate-500">
                              {[savedAddress.city, savedAddress.state, savedAddress.postcode]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          </div>
                          <div className="rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
                            {index === 0 ? "Latest" : `#${savedAddresses.length - index}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Dialog
          open={isAddressDialogOpen}
          onOpenChange={(open) => {
            setIsAddressDialogOpen(open);
            if (!open) {
              setShowAddressDetails(false);
            }
          }}
        >
          <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[28px] border-0 bg-[#fffaf6] p-0 sm:max-w-[560px]">
            <div className="p-4 sm:p-5">
              <DialogHeader className="space-y-2 text-left">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-orange-600">
                  <MapPin className="h-3 w-3" />
                  Delivery Address
                </div>
                <DialogTitle className="text-xl font-black text-slate-950">
                  Add your saved location
                </DialogTitle>
                <DialogDescription className="text-sm leading-6 text-slate-500">
                  Fill the address in this popup and save it to your profile.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-3">
                <div className="rounded-[20px] border border-white/70 bg-white p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid flex-1 grid-cols-3 gap-2">
                      <div className="rounded-[16px] border border-orange-100 bg-orange-50/80 p-2.5">
                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-orange-500">
                          Saved
                        </p>
                        <p className="mt-1 text-base font-black text-slate-950">{savedAddresses.length}</p>
                      </div>
                      <div className="rounded-[16px] border border-slate-200 bg-slate-50/80 p-2.5">
                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                          City
                        </p>
                        <p className="mt-1 truncate text-xs font-black text-slate-950">
                          {addressForm.city || "Add city"}
                        </p>
                      </div>
                      <div className="rounded-[16px] border border-emerald-100 bg-emerald-50/80 p-2.5">
                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-emerald-600">
                          Map
                        </p>
                        <p className="mt-1 text-xs font-black text-slate-950">
                          {addressForm.lat && addressForm.lng ? "Ready" : "Pending"}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      disabled={isFetchingLocation}
                      className="h-10 shrink-0 rounded-2xl bg-slate-900 px-3 text-[11px] font-black text-white hover:bg-slate-800"
                    >
                      {isFetchingLocation ? (
                        <>
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                          Getting
                        </>
                      ) : (
                        <>
                          <Navigation className="mr-1.5 h-3.5 w-3.5" />
                          Use
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="rounded-[20px] border border-white/70 bg-white p-3 shadow-sm">
                  <label className="block space-y-2">
                    <span className="text-sm font-black text-slate-800">Full Address</span>
                    <textarea
                      value={addressForm.address}
                      onChange={(event) => updateAddressField("address", event.target.value)}
                      placeholder="House, street, area"
                      className="min-h-[84px] w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                    />
                  </label>
                </div>

                <div className="rounded-[20px] border border-white/70 bg-white p-3 shadow-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">City</span>
                      <input
                        value={addressForm.city}
                        onChange={(event) => updateAddressField("city", event.target.value)}
                        placeholder="City"
                        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">State</span>
                      <input
                        value={addressForm.state}
                        onChange={(event) => updateAddressField("state", event.target.value)}
                        placeholder="State"
                        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                      />
                    </label>

                    <label className="space-y-2 col-span-2">
                      <span className="text-sm font-bold text-slate-700">Pincode</span>
                      <input
                        value={addressForm.postcode}
                        onChange={(event) => updateAddressField("postcode", event.target.value)}
                        placeholder="Pincode"
                        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddressDetails((current) => !current)}
                  className="flex w-full items-center justify-between rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
                >
                  <div>
                    <p className="text-sm font-black text-slate-900">More details</p>
                    <p className="text-xs text-slate-500">House no, area and coordinates</p>
                  </div>
                  {showAddressDetails ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </button>

                {showAddressDetails && (
                  <div className="rounded-[20px] border border-white/70 bg-white p-3 shadow-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <label className="space-y-2">
                        <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <Home className="h-4 w-4 text-orange-500" />
                          House No
                        </span>
                        <input
                          value={addressForm.houseNo}
                          onChange={(event) => updateAddressField("houseNo", event.target.value)}
                          placeholder="Flat / room no"
                          className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <Building2 className="h-4 w-4 text-orange-500" />
                          Society
                        </span>
                        <input
                          value={addressForm.society}
                          onChange={(event) => updateAddressField("society", event.target.value)}
                          placeholder="Apartment / society"
                          className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <Landmark className="h-4 w-4 text-orange-500" />
                          Landmark
                        </span>
                        <input
                          value={addressForm.landmark}
                          onChange={(event) => updateAddressField("landmark", event.target.value)}
                          placeholder="Nearby landmark"
                          className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Suburb / Area</span>
                        <input
                          value={addressForm.suburb}
                          onChange={(event) => updateAddressField("suburb", event.target.value)}
                          placeholder="Area / suburb"
                          className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Latitude</span>
                        <input
                          value={addressForm.lat}
                          onChange={(event) => updateAddressField("lat", event.target.value)}
                          placeholder="Latitude"
                          className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">Longitude</span>
                        <input
                          value={addressForm.lng}
                          onChange={(event) => updateAddressField("lng", event.target.value)}
                          placeholder="Longitude"
                          className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                        />
                      </label>
                    </div>
                  </div>
                )}

                <div className="rounded-[20px] border border-orange-100 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_100%)] p-3 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
                        Ready
                      </p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-800">
                        Save this address.
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={saveUserAddress}
                      disabled={isSavingAddress}
                      className="h-11 rounded-2xl bg-orange-500 px-5 text-xs font-black text-white hover:bg-orange-600"
                    >
                      {isSavingAddress ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving
                        </>
                      ) : (
                        "Save Address"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Footer Actions */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/MyOrder")}
            className="w-full flex items-center justify-between p-5 lg:p-7 bg-white border border-slate-50 rounded-3xl lg:rounded-[35px] hover:border-orange-100 shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3 lg:gap-5">
              <div className="p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Receipt className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="text-left">
                <p className="font-black text-slate-800 text-xs lg:text-lg">See My Orders</p>
                <p className="text-[10px] lg:text-sm font-bold text-slate-400 uppercase truncate">
                  Track your cloud kitchen orders and item details
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 lg:w-7 lg:h-7 text-slate-200 group-hover:text-orange-500" />
          </button>

          {myMess && (
            <button className="w-full flex items-center justify-between p-5 lg:p-7 bg-white border border-slate-50 rounded-3xl lg:rounded-[35px] hover:border-orange-100 shadow-sm transition-all group">
              <div className="flex items-center gap-3 lg:gap-5">
                <div className="p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-800 text-xs lg:text-lg">Mess Location</p>
                  <p className="text-[10px] lg:text-sm font-bold text-slate-400 uppercase truncate">
                    {myMess?.messId?.location?.landmark || "Location details not available"}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 lg:w-7 lg:h-7 text-slate-200 group-hover:text-orange-500" />
            </button>
          )}

          <button onClick={handlelogout} className="w-full flex items-center justify-center gap-2 p-5 text-red-500 font-black uppercase text-[10px] lg:text-sm tracking-widest mt-4 hover:bg-red-50 rounded-2xl lg:rounded-3xl transition-colors">
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
