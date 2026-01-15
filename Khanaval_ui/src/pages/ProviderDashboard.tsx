import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/common/StatsCard";
import MenuManagement from "./provider/MenuManagement";
import QRScanner from "./provider/QRScanner";
import EarningsDashboard from "./provider/EarningsDashboard";
import SubscriberManagement from "./provider/SubscriberManagement";

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
  AlertCircle
} from "lucide-react";
import { UserProviderdata } from "@/hooks/Provider";
import { ProviderProfile } from "./ProviderProfile";
import UpdishOnboarding from "./MessResgisation";

type TabType = "dashboard" | "menu" | "subscribers" | "scanner" | "earnings" | "Profile";

export default function ProviderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  
  // Fetching your provider data
  const { Providerdata } = UserProviderdata();
  
  /**
   * 1. REGISTRATION GUARD
   * If MessRegistered is false, we return the Onboarding flow immediately.
   * This prevents the sidebar and dashboard from even rendering.
   */
  if (Providerdata?.MessRegistered === false) {
    return <UpdishOnboarding />;
  }

  const handleNavClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const getPageTitle = () => {
    const item = navItems.find((i) => i.id === activeTab);
    return item?.label || "Dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Only visible if MessRegistered is true */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="font-bold text-foreground">MealPass</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-0">
        <header className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border p-4 flex items-center gap-4 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{getPageTitle()}</h1>
            {/* Dynamic Welcome Message */}
            <p className="text-sm text-muted-foreground">Welcome back, {"Provider"}</p>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <StatsCard key={i} {...stat} />
                ))}
              </div>

              {/* Activity Section */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Recent Scans
                    </h2>
                    <div className="space-y-3">
                      {recentScans.map((scan, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                              {scan.name[0]}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{scan.name}</p>
                              <p className="text-xs text-muted-foreground">{scan.time}</p>
                            </div>
                          </div>
                          <Badge variant="success">Valid</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions Grid */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-bold text-foreground mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="soft" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("scanner")}>
                        <QrCode className="w-6 h-6" />
                        <span>Scan QR</span>
                      </Button>
                      <Button variant="soft" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("menu")}>
                        <Utensils className="w-6 h-6" />
                        <span>Update Menu</span>
                      </Button>
                      <Button variant="soft" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("subscribers")}>
                        <Users className="w-6 h-6" />
                        <span>Subscribers</span>
                      </Button>
                      <Button variant="soft" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("earnings")}>
                        <Wallet className="w-6 h-6" />
                        <span>Earnings</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Conditional Component Rendering based on Tab */}
          {activeTab === "menu" && <MenuManagement />}
          {activeTab === "scanner" && <QRScanner />}
          {activeTab === "subscribers" && <SubscriberManagement />}
          {activeTab === "earnings" && <EarningsDashboard />}
          {activeTab === "Profile" && <ProviderProfile />}
        </div>
      </main>
    </div>
  );
}

// --- Data Constants ---
const navItems = [
  { id: "dashboard" as TabType, icon: LayoutDashboard, label: "Dashboard" },
  { id: "menu" as TabType, icon: Utensils, label: "Menu Management" },
  { id: "subscribers" as TabType, icon: Users, label: "Subscribers" },
  { id: "scanner" as TabType, icon: QrCode, label: "Scan QR" },
  { id: "earnings" as TabType, icon: Wallet, label: "Earnings" },
  { id: "Profile" as TabType, icon: Users2, label: "Profile" },
];

const stats = [
  { icon: <Users className="w-5 h-5" />, value: 156, label: "Active Subscribers", trend: { value: 12, isPositive: true } },
  { icon: <QrCode className="w-5 h-5" />, value: 89, label: "Today's Scans", trend: { value: 5, isPositive: true } },
  { icon: <Wallet className="w-5 h-5" />, value: "₹45,000", label: "This Month", trend: { value: 8, isPositive: true } },
  { icon: <TrendingUp className="w-5 h-5" />, value: "4.5", label: "Avg Rating" },
];

const recentScans = [
  { name: "Rahul Sharma", time: "2 mins ago", status: "valid" },
  { name: "Priya Patel", time: "15 mins ago", status: "valid" },
  { name: "Amit Kumar", time: "1 hour ago", status: "valid" },
];