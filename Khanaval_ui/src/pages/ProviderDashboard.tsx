import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/common/StatsCard";
import MenuManagement from "./provider/MenuManagement";
import QRScanner from "./provider/QRScanner";
import EarningsDashboard from "./provider/EarningsDashboard";
import SubscriberManagement from "./provider/SubscriberManagement";
import {
  LayoutDashboard, Utensils, Users, QrCode, Wallet, 
  X, TrendingUp, CheckCircle, Users2, CalendarCheck, 
  PlusCircle, Menu, RefreshCw, Clock, Phone, Activity
} from "lucide-react";
import { UserProviderdata } from "@/hooks/Provider";
import { ProviderProfile } from "./ProviderProfile";
import { Getmymess } from "@/hooks/PorviderMess";
import { useQueryClient } from "@tanstack/react-query";
import Unverfied from "./components/Unverfied";

type TabType = "dashboard" | "menu" | "subscribers" | "scanner" | "earnings" | "Profile";

export default function ProviderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { Providerdata } = UserProviderdata();
  const { messdata } = Getmymess();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    if (diffInSec < 60) return "Just now";
    if (diffInSec < 3600) return `${Math.floor(diffInSec / 60)}m ago`;
    if (diffInSec < 86400) return `${Math.floor(diffInSec / 3600)}h ago`;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
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
    const item = navItems.find((i) => i.id === activeTab);
    return item?.label || "Dashboard";
  };

  if (messdata && messdata?.messVerified === false) return <Unverfied />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      {/* SIDEBAR */}
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
              onClick={() => handleNavClick(item.id)}
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
        {/* HEADER */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-base lg:text-lg font-black text-slate-900">{getPageTitle()}</h1>
          </div>
        </header>

        <div className="p-4 md:p-8 overflow-y-auto">
          {activeTab === "dashboard" && isRegistered && (
            <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
              
              {/* STATS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {dynamicStats.map((stat, i) => (
                  <StatsCard key={i} {...stat} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2 space-y-4">
                  
                  {/* NEW SYNC SECTION ABOVE CARD */}
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100">
                        <Activity className="w-4 h-4 text-orange-600" />
                      </div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Recent Scans</h2>
                    </div>
                    
                    <Button 
                      onClick={handleManualRefresh}
                      disabled={isRefreshing}
                      className="bg-white border border-slate-200 text-slate-700 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 rounded-xl px-4 h-9 shadow-sm transition-all font-bold text-xs"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                      {isRefreshing ? "Updating..." : "Sync Scans"}
                    </Button>
                  </div>

                  {/* RECENT SCAN LIST CARD */}
                  <Card className="border-none shadow-sm rounded-[24px] lg:rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-0">
                      <div className="divide-y divide-slate-50 max-h-[450px] lg:max-h-[500px] overflow-y-auto">
                        {recentScansData.length > 0 ? (
                          recentScansData.map((scan: any) => (
                            <div key={scan.id} className="flex items-center justify-between p-4 lg:p-5 hover:bg-slate-50/50 transition-colors">
                              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-base lg:text-lg border border-slate-200 shrink-0">
                                  {scan.userId?.first_name?.[0] || "U"}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-black text-slate-900 text-xs lg:text-sm capitalize truncate">
                                    {scan.userId?.first_name} {scan.userId?.last_name}
                                  </p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <Phone className="w-2.5 h-2.5 text-slate-400" />
                                    <p className="text-[10px] lg:text-[11px] font-bold text-slate-500 tracking-wider">
                                      {scan.userId?.number || "No Number"}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <Clock className="w-2.5 h-2.5 text-orange-500" />
                                    <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                      Scanned {formatRecentTime(scan.lastScannedAt)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                                <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] lg:text-[9px] font-black px-2 py-0.5 lg:px-3 lg:py-1">
                                  VERIFIED
                                </Badge>
                                <p className="text-[8px] lg:text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                                  Left: {scan.RemainingDay}d
                                </p>
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

                {/* TODAY'S MENU CARD */}
                <div className="space-y-4">
                  <Card className="p-6 lg:p-8 rounded-[24px] lg:rounded-[2.5rem] border-none shadow-xl bg-orange-600 text-white group overflow-hidden relative">
                    <div className="relative z-10">
                      <h3 className="font-black text-xl lg:text-2xl mb-1">Today's Menu</h3>
                      <p className="text-[10px] lg:text-xs text-orange-100 mb-6 font-bold uppercase tracking-widest">Update your students</p>
                      <Button 
                        onClick={() => setActiveTab("menu")} 
                        variant="secondary" 
                        className="w-full h-12 lg:h-14 rounded-xl lg:rounded-2xl font-black bg-white text-orange-600 hover:bg-orange-50 shadow-lg text-xs lg:text-sm"
                      >
                        MANAGE LIVE MENU
                      </Button>
                    </div>
                    <Utensils className="absolute -bottom-6 -right-6 w-24 h-24 lg:w-32 lg:h-32 text-white/10 group-hover:scale-110 transition-transform" />
                  </Card>
                </div>

              </div>
            </div>
          )}

          {/* TAB RENDERING */}
          <div className="mt-4">
            {isRegistered && (
              <>
                {activeTab === "menu" && <MenuManagement />}
                {activeTab === "scanner" && <QRScanner />}
                {activeTab === "subscribers" && <SubscriberManagement />}
                {activeTab === "earnings" && <EarningsDashboard />}
                {activeTab === "Profile" && <ProviderProfile />}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const navItems = [
  { id: "dashboard" as TabType, icon: LayoutDashboard, label: "Live Dashboard" },
  { id: "menu" as TabType, icon: Utensils, label: "Daily Menu" },
  { id: "subscribers" as TabType, icon: Users, label: "Student Register" },
  { id: "scanner" as TabType, icon: QrCode, label: "QR Scanner" },
  { id: "earnings" as TabType, icon: Wallet, label: "Revenue" },
  { id: "Profile" as TabType, icon: Users2, label: "Settings" },
];