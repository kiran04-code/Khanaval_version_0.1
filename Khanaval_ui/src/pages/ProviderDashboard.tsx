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
  ShieldCheck,
  Building2, Home, Hash, Timer,
  CheckCircle2, Info, Eye
} from "lucide-react";
import {
  LayoutDashboard,
  Utensils,
  Users,
  QrCode,
  Wallet,
  Menu,
  X,
  TrendingUp,
  Clock,
  CheckCircle,
  Users2,
  CalendarCheck,
  ShieldAlert,
  PlusCircle,
  BookOpen,
  AlertCircle,
  MapPin
} from "lucide-react";
import { UserProviderdata } from "@/hooks/Provider";
import { ProviderProfile } from "./ProviderProfile";
import UpdishOnboarding from "./MessResgisation";
import { Getmymess } from "@/hooks/PorviderMess";
import { useQueryClient } from "@tanstack/react-query";
import Unverfied from "./components/Unverfied";

type TabType = "dashboard" | "menu" | "subscribers" | "scanner" | "earnings" | "Profile";

export default function ProviderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const { Providerdata } = UserProviderdata();

  const isRegistered = Providerdata?.MessRegister !== "false";
  const handleNavClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };
  const { messdata } = Getmymess()
  const queryclinet = useQueryClient()
  const getPageTitle = () => {
    const item = navItems.find((i) => i.id === activeTab);
    return item?.label || "Dashboard";
  };
  const navigate = useNavigate()
  if (messdata && messdata?.messVerified === false) {
    return <Unverfied />
  }
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="md:w-[170px] w-[200px] md:h-fit">
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
        </header>

        <div className="p-4 md:p-8 overflow-y-auto">

          {!isRegistered && (
            <div className="mb-8 animate-in slide-in-from-top-4 duration-700">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10 lg:flex items-center justify-between gap-8">
                  <div className="space-y-4 max-w-xl">
                    <Badge className="bg-orange-600 text-white border-none text-[10px] font-black uppercase px-3 py-1">
                      New Feature
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-black leading-tight">
                      Manage Monthly Students <br />
                      <span className="text-orange-500">Without Pen & Book</span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base font-medium">
                      Join Kahanval.com to add monthly subscribers, track daily attendance via QR, and manage payments in one digital register.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button
                        onClick={() => navigate("/provider/messsResgiter")}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-black px-8 py-6 rounded-2xl shadow-lg shadow-orange-900/20"
                      >
                        <PlusCircle className="w-5 h-5 mr-2" /> REGISTER YOUR MESS
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: BookOpen, t: "Paperless Register", d: "No more diary entries" },
                      { icon: Users, t: "Student Tracking", d: "Manage monthly plans" },
                      { icon: Wallet, t: "Easy Payments", d: "Track dues & income" },
                      { icon: QrCode, t: "Quick Attendance", d: "One-scan check-in" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        <item.icon className="w-5 h-5 text-orange-500 mb-2" />
                        <p className="text-xs font-black uppercase text-white tracking-tight">{item.t}</p>
                        <p className="text-[10px] text-slate-400">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Utensils className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 -rotate-12" />
              </div>
            </div>
          )}

          {activeTab === "dashboard" && isRegistered && (
            <div className={`space-y-8 transition-all duration-700 ${!isRegistered ? "opacity-30 blur-[2px] pointer-events-none select-none" : ""}`}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <StatsCard key={i} {...stat} />
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl">
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                      <h2 className="font-black text-slate-900 flex items-center gap-2">
                        <CalendarCheck className="w-5 h-5 text-orange-600" />
                        Live Digital Register
                      </h2>
                    </div>
                    <div className="p-2">
                      {recentScans.map((scan, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold">{scan.name[0]}</div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{scan.name}</p>
                              <p className="text-[10px] text-slate-400">{scan.time}</p>
                            </div>
                          </div>
                          <Badge className="bg-emerald-50 text-emerald-600 border-none text-[9px]">Verified</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card className="p-6 rounded-3xl border-none shadow-sm bg-orange-600 text-white">
                    <h3 className="font-bold mb-1">Today's Menu</h3>
                    <p className="text-xs text-orange-100 mb-4">Visible to all your students</p>
                    <Button  onClick={() => {handleNavClick("menu"),scrollX(0,0)}} variant="secondary" className="w-full rounded-xl font-bold bg-white text-orange-600">Edit Menu</Button>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* --- TAB CONTENT LOGIC --- */}
          <div className="mt-4">
            {!isRegistered && activeTab !== "dashboard" ? (
              <div className="max-w-2xl mx-auto">

              </div>
            ) : (
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
  { id: "menu" as TabType, icon: Utensils, label: "Menu Planner" },
  { id: "subscribers" as TabType, icon: Users, label: "Student Register" },
  { id: "scanner" as TabType, icon: QrCode, label: "QR Code" },
  { id: "earnings" as TabType, icon: Wallet, label: "Earnings" },
  { id: "Profile" as TabType, icon: Users2, label: "Settings" },
];

const stats = [
  { icon: <Users className="w-5 h-5 text-blue-600" />, value: 156, label: "Monthly Students" },
  { icon: <CheckCircle className="w-5 h-5 text-emerald-600" />, value: 89, label: "Today's Attendance" },
  { icon: <Wallet className="w-5 h-5 text-orange-600" />, value: "₹4.5k", label: "Monthly Income" },
  { icon: <TrendingUp className="w-5 h-5 text-purple-600" />, value: "4.8", label: "User Rating" },
];

const recentScans = [
  { name: "Rahul Sharma", time: "2 mins ago" },
  { name: "Aniket V.", time: "15 mins ago" },
  { name: "Suresh P.", time: "1 hour ago" },
];