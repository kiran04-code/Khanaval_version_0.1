import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import {
  Search,
  Calendar,
  QrCode,
  Truck,
  Shield,
  Wallet,
  Clock,
  Star,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";
import Footer from "@/components/layout/footer";

const features = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Discover",
    description: "Find nearby messes and tiffin services instantly",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Subscribe",
    description: "Choose monthly mess plans or order daily tiffins",
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    title: "Scan & Dine",
    description: "Use your digital pass for hassle-free meals",
  },
];

const benefits = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Transparent Pricing",
    description: "No hidden charges. See all costs upfront before subscribing.",
  },
  {
    icon: <Wallet className="w-5 h-5" />,
    title: "Budget Friendly",
    description: "Plans starting from ₹2,500/month. Perfect for students.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Flexible Options",
    description: "Switch messes, pause subscriptions, or cancel anytime.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Quality Assured",
    description: "All providers are verified with hygiene ratings.",
  },
];

const popularMesses = [
  {
    id: "1",
    name: "Sharma's Kitchen",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    distance: "0.5 km",
    price: 3000,
    rating: 4.5,
    isVeg: true,
  },
  {
    id: "2",
    name: "Gupta Bhojanalaya",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400",
    distance: "0.8 km",
    price: 2800,
    rating: 4.3,
    isVeg: true,
  },
  {
    id: "3",
    name: "South Spice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
    distance: "1.2 km",
    price: 3200,
    rating: 4.7,
    isVeg: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <Badge variant="soft" className="mb-4">
                🍛 #1 Food Platform for Students
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Your Daily Food,{" "}
                <span className="text-gradient">Simplified.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Find nearby messes, subscribe monthly, or order home-style tiffins.
                Affordable, hygienic, and hassle-free meals every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/mess">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    <MapPin className="w-5 h-5 mr-2" />
                    Find Mess
                  </Button>
                </Link>
                <Link to="/tiffin">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    <Truck className="w-5 h-5 mr-2" />
                    Order Tiffin
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-hero border-2 border-background flex items-center justify-center text-primary-foreground text-sm font-bold"
                    >
                      {i}K
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground">10,000+ Users</p>
                  <p className="text-sm text-muted-foreground">Trust MealPass daily</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative z-10">
                <img
                  src={heroFood}
                  alt="Delicious Indian Thali"
                  className="rounded-3xl shadow-prominent w-full max-w-lg mx-auto"
                />
                <div className="absolute -left-4 md:-left-8 top-1/4 bg-card rounded-2xl p-3 shadow-elevated animate-float hidden sm:block">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Hygienic</p>
                      <p className="text-xs text-muted-foreground">100% Verified</p>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute -right-4 md:-right-8 bottom-1/4 bg-card rounded-2xl p-3 shadow-elevated animate-float hidden sm:block"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">₹99/day</p>
                      <p className="text-xs text-muted-foreground">Starting from</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-hero opacity-10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="soft" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Started in 3 Easy Steps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Finding your perfect meal plan has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="elevated"
                className="relative text-center p-8 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="soft" className="mb-4">Why MealPass?</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Smartest Way to Eat Daily
              </h2>
              <p className="text-muted-foreground mb-8">
                We understand the struggle of finding good, affordable food. That's why
                we've built a platform that makes daily meals simple, transparent, and
                budget-friendly.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {popularMesses.slice(0, 2).map((mess, index) => (
                <Card
                  key={mess.id}
                  variant="interactive"
                  className={`overflow-hidden ${index === 0 ? "col-span-2" : ""}`}
                >
                  <div className={`relative ${index === 0 ? "h-48" : "h-32"}`}>
                    <img
                      src={mess.image}
                      alt={mess.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge variant={mess.isVeg ? "veg" : "non-veg"} className="mb-1">
                        {mess.isVeg ? "Veg" : "Non-Veg"}
                      </Badge>
                      <h4 className="font-bold text-primary-foreground">{mess.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        <span>{mess.rating}</span>
                        <span>•</span>
                        <span>{mess.distance}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <Link to="/mess" className="col-span-2">
                <Button variant="soft" className="w-full">
                  View All Messes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card variant="flat" className="bg-gradient-hero p-8 md:p-12 text-center rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Simplify Your Meals?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join thousands of students and professionals who save time and money
              with MealPass every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?role=user">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto bg-card text-foreground hover:bg-card/90"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/auth?role=provider">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  List Your Mess
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Index;
