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
  PlusCircle, Menu, RefreshCw, Clock
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

  // --- LOGIC: DATA EXTRACTION ---
  const isRegistered = Providerdata?.MessRegister !== "false";
  const subscribers = messdata?.myAllSubscribers || [];
  
  // Filter and sort subscribers who have scanned recently
  const recentScansData = subscribers
    .filter((sub: any) => sub.lastScannedAt !== null)
    .sort((a: any, b: any) => {
        const timeA = new Date(isNaN(a.lastScannedAt) ? a.lastScannedAt : Number(a.lastScannedAt)).getTime();
        const timeB = new Date(isNaN(b.lastScannedAt) ? b.lastScannedAt : Number(b.lastScannedAt)).getTime();
        return timeB - timeA;
    });

  const totalEarnings = subscribers.reduce((acc: number, sub: any) => acc + (sub.price || 0), 0);

  // --- REFRESH HANDLER ---
  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    // This triggers a new network request for mess data
    await queryClient.invalidateQueries({ queryKey: ["get-mess"] }); 
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // --- RELATIVE TIME FORMATTER ---
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
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="w-[150px]">
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

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
            <div>
              <h1 className="text-lg font-black text-slate-900">{getPageTitle()}</h1>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isRegistered ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {isRegistered ? "Digital Register Active" : "Registration Pending"}
                </p>
              </div>
            </div>
          </div>
          
          {/* SYNC/RELOAD BUTTON */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleManualRefresh}
            className="rounded-xl border-slate-200 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-all"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-[10px] font-black uppercase">Sync Data</span>
          </Button>
        </header>

        <div className="p-4 md:p-8 overflow-y-auto">
          {activeTab === "dashboard" && isRegistered && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {dynamicStats.map((stat, i) => (
                  <StatsCard key={i} {...stat} />
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* RECENT SCAN LIST */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                      <h2 className="font-black text-slate-900 flex items-center gap-2">
                        <CalendarCheck className="w-5 h-5 text-orange-600" />
                        Live Scan Activity 
                        <Badge className="ml-2 bg-orange-100 text-orange-600 border-none font-black">
                          {recentScansData.length} Total
                        </Badge>
                      </h2>
                    </div>
                    
                    <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
                      {recentScansData.length > 0 ? (
                        recentScansData.map((scan: any) => (
                          <div key={scan.id} className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-lg border border-slate-200">
                                {scan.userId?.first_name?.[0] || "U"}
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-sm capitalize">
                                  {scan.userId?.first_name} {scan.userId?.last_name}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <Clock className="w-3 h-3 text-orange-500" />
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    Scanned {formatRecentTime(scan.lastScannedAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <Badge className="bg-emerald-50 text-emerald-600 border-none text-[9px] font-black px-3 py-1">
                                VERIFIED
                              </Badge>
                              <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                                Remaining: {scan.RemainingDay} Days
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-24 text-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                             <QrCode className="w-8 h-8 text-slate-200" />
                          </div>
                          <p className="text-slate-400 font-bold italic">No students have scanned today.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-orange-600 text-white group overflow-hidden relative">
                    <div className="relative z-10">
                      <h3 className="font-black text-2xl mb-1">Today's Menu</h3>
                      <p className="text-xs text-orange-100 mb-6 font-bold uppercase tracking-widest">Update for your students</p>
                      <Button 
                        onClick={() => setActiveTab("menu")} 
                        variant="secondary" 
                        className="w-full h-14 rounded-2xl font-black bg-white text-orange-600 hover:bg-orange-50 shadow-lg"
                      >
                        MANAGE LIVE MENU
                      </Button>
                    </div>
                    <Utensils className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform" />
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT */}
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