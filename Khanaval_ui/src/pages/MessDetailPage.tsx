import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Users,
  CheckCircle,
} from "lucide-react";

const messData = {
  id: "1",
  name: "Sharma's Kitchen",
  tagline: "Authentic North Indian Home Food",
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
  images: [
    "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
  ],
  distance: "0.5 km",
  rating: 4.5,
  totalRatings: 234,
  isVeg: true,
  timing: "7:00 AM - 10:00 PM",
  phone: "+91 98765 43210",
  address: "123, MG Road, Koramangala, Bangalore - 560034",
  subscribers: 156,
  monthlyPrice: 3000,
  weeklyPrice: 900,
  dailyPrice: 150,
  amenities: ["AC Dining", "Pure Veg", "Hygienic", "Home Style"],
  menu: {
    monday: {
      breakfast: ["Poha", "Tea/Coffee"],
      lunch: ["Dal Fry", "Roti (4)", "Rice", "Aloo Gobi", "Salad"],
      dinner: ["Paneer Butter Masala", "Roti (4)", "Jeera Rice", "Dal Tadka"],
    },
    tuesday: {
      breakfast: ["Upma", "Tea/Coffee"],
      lunch: ["Rajma", "Roti (4)", "Rice", "Bhindi Fry", "Salad"],
      dinner: ["Mix Veg", "Roti (4)", "Pulao", "Dal Makhani"],
    },
    wednesday: {
      breakfast: ["Aloo Paratha", "Curd", "Tea/Coffee"],
      lunch: ["Chole", "Roti (4)", "Rice", "Baingan Bharta", "Salad"],
      dinner: ["Shahi Paneer", "Roti (4)", "Rice", "Yellow Dal"],
    },
    thursday: {
      breakfast: ["Idli", "Sambhar", "Tea/Coffee"],
      lunch: ["Kadhi Pakora", "Roti (4)", "Rice", "Aloo Matar", "Salad"],
      dinner: ["Dal Makhani", "Roti (4)", "Veg Biryani"],
    },
    friday: {
      breakfast: ["Poori Bhaji", "Tea/Coffee"],
      lunch: ["Chana Masala", "Roti (4)", "Rice", "Lauki Sabzi", "Salad"],
      dinner: ["Palak Paneer", "Roti (4)", "Jeera Rice", "Dal Fry"],
    },
    saturday: {
      breakfast: ["Dosa", "Sambhar", "Chutney", "Tea/Coffee"],
      lunch: ["Mixed Dal", "Roti (4)", "Rice", "Cabbage Sabzi", "Salad"],
      dinner: ["Veg Kofta", "Roti (4)", "Pulao", "Dal Tadka"],
    },
    sunday: {
      breakfast: ["Chole Bhature", "Tea/Coffee"],
      lunch: ["Special Thali - Paneer, Dal, 6 Roti, Rice, Dessert"],
      dinner: ["Sunday Special - Chef's Choice"],
    },
  },
};

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MessDetailPage() {
  const { id } = useParams();
  const mess = messData;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        <img
          src={mess.image}
          alt={mess.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <Link
          to="/dashboard"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <Card variant="elevated" className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={mess.isVeg ? "veg" : "non-veg"}>
                    {mess.isVeg ? "Pure Veg" : "Non-Veg"}
                  </Badge>
                  <div className="flex items-center gap-1 bg-gold/10 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                    <span className="text-sm font-semibold text-gold">{mess.rating}</span>
                    <span className="text-xs text-muted-foreground">({mess.totalRatings})</span>
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{mess.name}</h1>
                <p className="text-muted-foreground">{mess.tagline}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">₹{mess.monthlyPrice}</p>
                <p className="text-sm text-muted-foreground">/month</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                {mess.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-primary" />
                {mess.timing}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-primary" />
                {mess.subscribers} subscribers
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-primary" />
                {mess.phone}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {mess.amenities.map((amenity) => (
                <Badge key={amenity} variant="soft" className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {amenity}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Weekly Menu</h2>
          <Tabs defaultValue="monday">
            <TabsList className="w-full overflow-x-auto flex-nowrap justify-start bg-muted/50 p-1 mb-4">
              {days.map((day, index) => (
                <TabsTrigger key={day} value={day} className="flex-shrink-0">
                  {dayLabels[index]}
                </TabsTrigger>
              ))}
            </TabsList>

            {days.map((day) => (
              <TabsContent key={day} value={day} className="animate-fade-in">
                <div className="grid md:grid-cols-3 gap-4">
                  {["breakfast", "lunch", "dinner"].map((meal) => (
                    <Card key={meal} variant="default">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground capitalize mb-3 flex items-center gap-2">
                          {meal === "breakfast" && "🌅"}
                          {meal === "lunch" && "☀️"}
                          {meal === "dinner" && "🌙"}
                          {meal}
                        </h4>
                        <ul className="space-y-2">
                          {(mess.menu as unknown)[day][meal].map((item: string, i: number) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Pricing Plans */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Choose Your Plan</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card variant="outlined" className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Daily</p>
              <p className="text-2xl font-bold text-foreground">₹{mess.dailyPrice}</p>
              <p className="text-xs text-muted-foreground">per day</p>
            </Card>
            <Card variant="outlined" className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Weekly</p>
              <p className="text-2xl font-bold text-foreground">₹{mess.weeklyPrice}</p>
              <p className="text-xs text-muted-foreground">per week</p>
            </Card>
            <Card variant="elevated" className="p-4 text-center border-primary relative overflow-hidden">
              <Badge className="absolute top-2 right-2" variant="default">Popular</Badge>
              <p className="text-sm text-muted-foreground mb-1">Monthly</p>
              <p className="text-2xl font-bold text-primary">₹{mess.monthlyPrice}</p>
              <p className="text-xs text-muted-foreground">per month</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border p-4">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-xl font-bold text-primary">₹{mess.monthlyPrice}/month</p>
          </div>
          <Link to="/epass">
            <Button variant="hero" size="lg">
              Subscribe & Get Pass
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
