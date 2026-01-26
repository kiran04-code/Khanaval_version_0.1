import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatsCard } from "@/components/common/StatsCard";
import MenuManagement from "./provider/MenuManagement";
import QRScanner from "./provider/QRScanner";
import EarningsDashboard from "./provider/EarningsDashboard";
import SubscriberManagement from "./provider/SubscriberManagement";
import {
  LayoutDashboard, Utensils, Users, QrCode, Wallet,
  X, TrendingUp, CheckCircle, Users2, CalendarCheck,
  Menu, RefreshCw, Clock, Phone, Activity,
  Calendar, IndianRupee, Save, Sparkles, Loader2,
  PlusCircle, ArrowRight, Store, CheckCircle2
} from "lucide-react";
import { UserProviderdata } from "@/hooks/Provider";
import { ProviderProfile } from "./ProviderProfile";
import { Getmymess } from "@/hooks/PorviderMess";
import { useQueryClient } from "@tanstack/react-query";
import Unverfied from "./components/Unverfied";
import SubscriberRequest from "./Subsciber";

import { useStateContex } from "@/context/State";
import { toast } from "@/hooks/use-toast";
import Unverified from "./components/Unverfied";
import Unverifieds from "./components/Unverfied";
import UnregisteredState from "./components/UnrigisterMess";

type TabType = "dashboard" | "menu" | "subscribers" | "scanner" | "earnings" | "Profile" | "MonthlySubscriptionRequest";

export default function ProviderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [globalPrice, setGlobalPrice] = useState("");

  const { Providerdata } = UserProviderdata();
  const { messdata } = Getmymess();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { axioseInstace } = useStateContex();

  useEffect(() => {
    if (messdata?.monthlyPrice) {
      setGlobalPrice(messdata.monthlyPrice.toString());
    }
  }, [messdata]);

  const isRegistered = Providerdata?.MessRegister !== "false";
  const subscribers = messdata?.myAllSubscribers || [];

  const recentScansData = subscribers
    .filter((sub: any) => sub.lastScannedAt !== null)
    .sort((a: any, b: any) => {
      const timeA = new Date(isNaN(a.lastScannedAt) ? a.lastScannedAt : Number(a.lastScannedAt)).getTime();
      const timeB = new Date(isNaN(b.lastScannedAt) ? b.lastScannedAt : Number(b.lastScannedAt)).getTime();
      return timeB - timeA;
    });

  const totalEarnings = subscribers.reduce((acc: number, sub: any) => acc + (sub.price || 0), 0);

  const handleUpdatePrice = async () => {
    if (!globalPrice || Number(globalPrice) <= 0) {
      toast({ title: "Please enter a valid amount", variant: "destructive" });
      return;
    }
    setIsUpdating(true);
    try {
      const { data } = await axioseInstace.post("/api/mess/update-mess-price", {
        price: Number(globalPrice),
        messId: messdata?.id
      });
      if (data.success) {
        toast({ title: `${data.message}` });
        await queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      } else {
        toast({ title: `${data.message}`, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Update failed", variant: "destructive" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["get-mess"] });
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const formatRecentTime = (val: any) => {
    if (!val) return "N/A";
    const date = new Date(isNaN(val) ? val : Number(val));
    const now = new Date();
    const diffInSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

    if (diffInSec < 60) return `Just now (${timeStr})`;
    if (diffInSec < 3600) return `${Math.floor(diffInSec / 60)}m ago (${timeStr})`;
    if (diffInSec < 86400) return `${Math.floor(diffInSec / 3600)}h ago (${timeStr})`;
    return `${dateStr}, ${timeStr}`;
  };

  const dynamicStats = [
    { icon: <Users className="w-5 h-5 text-blue-600" />, value: subscribers.length, label: "Total Students" },
    { icon: <CheckCircle className="w-5 h-5 text-emerald-600" />, value: recentScansData.length, label: "Total Scans" },
    { icon: <Wallet className="w-5 h-5 text-orange-600" />, value: `₹${(totalEarnings / 1000).toFixed(1)}k`, label: "Revenue" },
    { icon: <TrendingUp className="w-5 h-5 text-purple-600" />, value: "Active", label: "Status" },
  ];

  const handleNavClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const getPageTitle = () => {
    return navItems.find((i) => i.id === activeTab)?.label || "Dashboard";
  };

  // 1. UNREGISTERED STATE (IMPROVED UI)
  if (!isRegistered) {
    return <UnregisteredState />
  }

  // 2. VERIFICATION PENDING
  if (messdata && messdata?.messVerified === false) return <Unverfied />;

  // 3. MAIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="w-[120px] lg:w-[150px]">
            <img src="/logo.png" alt="logo" className="w-full h-auto" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id
                ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-100"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-orange-600" : "text-slate-400"}`} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-base lg:text-lg font-black text-slate-900">{getPageTitle()}</h1>
          </div>
        </header>

        <div className="p-4 md:p-8 overflow-y-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
              {/* PRICING CARD */}
              <Card className="border-none shadow-xl rounded-[1.5rem] md:rounded-[2rem] bg-slate-900 text-white overflow-hidden relative">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">

                    {/* LEFT SECTION: Title and Live Rate */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-orange-500/20 rounded-lg shrink-0">
                          <Sparkles className="w-4 h-4 text-orange-500" />
                        </div>
                        <h2 className="text-base sm:text-lg font-black italic uppercase tracking-tighter">
                          Mess Subscription
                        </h2>
                      </div>

                      <div className="flex items-center gap-2">
                        <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                          Live Rate:
                        </p>
                        <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/10 font-black py-0.5">
                          ₹{messdata?.MontlyPrices || "0"}/mo
                        </Badge>
                      </div>
                    </div>

                    {/* RIGHT SECTION: Price Input and Update Button */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/5 p-2 sm:p-2.5 rounded-2xl sm:rounded-[1.5rem] backdrop-blur-md border border-white/10">
                      <div className="relative flex-1 sm:flex-none">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 z-20" />
                        <Input
                          type="number"
                          placeholder="Set Price"
                          value={globalPrice}
                          onChange={(e) => setGlobalPrice(e.target.value)}
                          className="w-full sm:w-32 lg:w-40 h-11 sm:h-12 bg-slate-800/50 border-slate-700 text-white pl-9 font-black text-lg rounded-xl focus-visible:ring-orange-500"
                        />
                      </div>

                      <Button
                        onClick={handleUpdatePrice}
                        disabled={isUpdating}
                        className="h-11 sm:h-12 bg-orange-600 hover:bg-orange-500 text-white font-black px-6 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 min-w-full sm:min-w-[140px]"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        <span className="text-xs sm:text-sm">
                          {isUpdating ? "SAVING..." : "UPDATE"}
                        </span>
                      </Button>
                    </div>

                  </div>

                  {/* BACKGROUND ICON */}
                  <Calendar className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 text-white/[0.03] -rotate-12 pointer-events-none" />
                </CardContent>
              </Card>

              {/* STATS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {dynamicStats.map((stat, i) => (
                  <StatsCard key={i} {...stat} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100">
                        <Activity className="w-4 h-4 text-orange-600" />
                      </div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Recent Scans</h2>
                    </div>
                    <Button onClick={handleManualRefresh} disabled={isRefreshing} className="bg-white border border-slate-200 text-slate-700 hover:bg-orange-50 rounded-xl px-4 h-9 font-bold text-xs">
                      <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                      {isRefreshing ? "Updating..." : "Sync Scans"}
                    </Button>
                  </div>

                  <Card className="border-none shadow-sm rounded-[24px] overflow-hidden bg-white">
                    <CardContent className="p-0">
                      <div className="divide-y divide-slate-50 max-h-[450px] overflow-y-auto">
                        {recentScansData.length > 0 ? (
                          recentScansData.map((scan: any) => (
                            <div key={scan.id} className="flex items-center justify-between p-4 lg:p-5 hover:bg-slate-50/50 transition-colors">
                              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black border border-slate-200 shrink-0">
                                  {scan.userId?.first_name?.[0] || "U"}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-black text-slate-900 text-xs lg:text-sm capitalize truncate">{scan.userId?.first_name} {scan.userId?.last_name}</p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <Phone className="w-2.5 h-2.5 text-slate-400" />
                                    <p className="text-[10px] font-bold text-slate-500">{scan.userId?.number || "No Number"}</p>
                                  </div>
                                  <div className="flex items-start gap-1 mt-0.5">
                                    <Clock className="w-2.5 h-2.5 text-orange-500 mt-0.5" />
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{formatRecentTime(scan.lastScannedAt)}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                                <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black px-2 py-0.5">VERIFIED</Badge>
                                <p className="text-[8px] font-bold text-slate-300 uppercase">Left: {scan.RemainingDay}d</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-16 text-center bg-slate-50/30">
                            <QrCode className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-400 font-bold italic text-sm">No scans today.</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card className="p-6 rounded-[2.5rem] border-none shadow-xl bg-orange-600 text-white group overflow-hidden relative">
                    <div className="relative z-10">
                      <h3 className="font-black text-xl mb-1">Today's Menu</h3>
                      <p className="text-[10px] text-orange-100 mb-6 font-bold uppercase tracking-widest">Update your students</p>
                      <Button onClick={() => setActiveTab("menu")} variant="secondary" className="w-full h-12 rounded-xl font-black bg-white text-orange-600 hover:bg-orange-50 shadow-lg text-xs">
                        MANAGE LIVE MENU
                      </Button>
                    </div>
                    <Utensils className="absolute -bottom-6 -right-6 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform" />
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT RENDERING */}
          <div className="mt-4">
            {activeTab === "menu" && <MenuManagement />}
            {activeTab === "scanner" && <QRScanner />}
            {activeTab === "subscribers" && <SubscriberManagement />}
            {activeTab === "Profile" && <ProviderProfile />}
            {activeTab === "MonthlySubscriptionRequest" && <SubscriberRequest />}
          </div>
        </div>
      </main>
    </div>
  );
}

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Live Dashboard" },
  { id: "MonthlySubscriptionRequest", icon: CalendarCheck, label: "Price Requests" },
  { id: "menu", icon: Utensils, label: "Daily Menu" },
  { id: "subscribers", icon: Users, label: "Custumer Register" },
  { id: "scanner", icon: QrCode, label: "QR Scanner" },
  { id: "Profile", icon: Users2, label: "Profile" },
];