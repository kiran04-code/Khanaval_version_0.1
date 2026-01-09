import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessCard } from "@/components/common/MessCard";
import { TiffinCard } from "@/components/common/TiffinCard";
import {
  Search,
  Bell,
  User,
  Wallet,
  MapPin,
  Filter,
  ChevronDown,
  Clock,
  QrCode,
  Package,
} from "lucide-react";

// Mock data
const nearbyMesses = [
  {
    id: "1",
    name: "Sharma's Kitchen",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    distance: "0.5 km",
    monthlyPrice: 3000,
    rating: 4.5,
    isVeg: true,
    timing: "7AM - 10PM",
  },
  {
    id: "2",
    name: "Gupta Bhojanalaya",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400",
    distance: "0.8 km",
    monthlyPrice: 2800,
    rating: 4.3,
    isVeg: true,
    timing: "8AM - 9PM",
  },
  {
    id: "3",
    name: "South Spice Kitchen",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
    distance: "1.2 km",
    monthlyPrice: 3200,
    rating: 4.7,
    isVeg: false,
    timing: "7AM - 11PM",
  },
  {
    id: "4",
    name: "Punjab Da Dhaba",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    distance: "1.5 km",
    monthlyPrice: 3500,
    rating: 4.6,
    isVeg: false,
    timing: "6AM - 10PM",
  },
];

const tiffinServices = [
  {
    id: "1",
    name: "Mom's Tiffin",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400",
    distance: "0.3 km",
    pricePerMeal: 80,
    rating: 4.8,
    isVeg: true,
    todaysMenu: ["Dal Fry", "Roti", "Rice", "Sabzi", "Salad"],
  },
  {
    id: "2",
    name: "Ghar Ka Khana",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400",
    distance: "0.6 km",
    pricePerMeal: 90,
    rating: 4.5,
    isVeg: true,
    todaysMenu: ["Chole", "Puri", "Jeera Rice", "Raita"],
  },
  {
    id: "3",
    name: "Aunty's Kitchen",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400",
    distance: "0.9 km",
    pricePerMeal: 100,
    rating: 4.6,
    isVeg: false,
    todaysMenu: ["Chicken Curry", "Rice", "Roti", "Dal"],
  },
];

const mySubscriptions = [
  {
    id: "1",
    messName: "Sharma's Kitchen",
    plan: "Monthly",
    mealsLeft: 24,
    validUntil: "Jan 31, 2026",
    status: "active",
  },
];

const recentOrders = [
  {
    id: "1",
    providerName: "Mom's Tiffin",
    date: "Today, 12:30 PM",
    items: ["Dal, Roti, Rice"],
    total: 80,
    status: "delivered",
  },
  {
    id: "2",
    providerName: "Ghar Ka Khana",
    date: "Yesterday, 1:00 PM",
    items: ["Chole, Puri"],
    total: 90,
    status: "delivered",
  },
];

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-17 gap-4">
            <Link to="/" className="md:w-[230px] w-[200px] md:h-fit ">
              <img src="/logo.png" alt="logo of khanaval.com" className="" />
            </Link>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search messes, tiffins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
              </Button>
              <Button variant="soft" size="sm" className="hidden sm:flex">
                <Wallet className="w-4 h-4 mr-2" />
                ₹500
              </Button>
              <Link to="/auth">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Location Bar */}
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-medium">Koramangala, Bangalore</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="nearby-mess" className="w-full">
          <TabsList className="w-full max-w-lg mb-6 bg-muted/50 p-1 h-auto">
            <TabsTrigger value="nearby-mess" className="flex-1 py-2.5">
              <MapPin className="w-4 h-4 mr-2" />
              Nearby Mess
            </TabsTrigger>
            <TabsTrigger value="tiffin" className="flex-1 py-2.5">
              <Package className="w-4 h-4 mr-2" />
              Tiffin
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex-1 py-2.5">
              <QrCode className="w-4 h-4 mr-2" />
              My Pass
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex-1 py-2.5">
              <Clock className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Nearby Mess Tab */}
          <TabsContent value="nearby-mess" className="animate-fade-in">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {nearbyMesses.map((mess) => (
                <MessCard key={mess.id} {...mess} />
              ))}
            </div>
          </TabsContent>

          {/* Tiffin Tab */}
          <TabsContent value="tiffin" className="animate-fade-in">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <Badge variant="default" className="cursor-pointer">All</Badge>
              <Badge variant="veg" className="cursor-pointer">Veg Only</Badge>
              <Badge variant="non-veg" className="cursor-pointer">Non-Veg</Badge>
              <Badge variant="soft" className="cursor-pointer">Under ₹100</Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tiffinServices.map((tiffin) => (
                <TiffinCard key={tiffin.id} {...tiffin} />
              ))}
            </div>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="animate-fade-in">
            {mySubscriptions.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {mySubscriptions.map((sub) => (
                  <Card key={sub.id} variant="elevated" className="overflow-hidden">
                    <div className="bg-gradient-hero p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary-foreground/80 text-sm">Active Subscription</p>
                          <h3 className="text-xl font-bold text-primary-foreground">{sub.messName}</h3>
                        </div>
                        <Badge className="bg-primary-foreground/20 text-primary-foreground">
                          {sub.plan}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-primary">{sub.mealsLeft}</p>
                          <p className="text-sm text-muted-foreground">Meals Left</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{sub.validUntil}</p>
                          <p className="text-sm text-muted-foreground">Valid Until</p>
                        </div>
                      </div>
                      <Link to="/epass">
                        <Button variant="hero" className="w-full">
                          <QrCode className="w-4 h-4 mr-2" />
                          Show E-Pass
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card variant="outlined" className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Active Subscriptions</h3>
                <p className="text-muted-foreground mb-4">Subscribe to a mess to get your digital meal pass</p>
                <Link to="/mess">
                  <Button>Find a Mess</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="animate-fade-in">
            {recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Card key={order.id} variant="interactive" className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{order.providerName}</h4>
                          <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">₹{order.total}</p>
                        <Badge variant="success" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card variant="outlined" className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground mb-4">Your order history will appear here</p>
                <Link to="/tiffin">
                  <Button>Order Tiffin</Button>
                </Link>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
