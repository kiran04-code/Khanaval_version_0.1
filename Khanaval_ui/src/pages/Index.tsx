import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";

import {
  Search,
  Calendar,
  QrCode,
  Shield,
  Wallet,
  Clock,
  Star,
  MapPin,
  ArrowRight,
  CheckCircle,
  ArrowDown,
  Loader2,
  Timer,
  User,
  Utensils,
  ShieldAlert
} from "lucide-react";


import { useEffect, useState } from "react";
import { UserProviderdata } from "@/hooks/Provider";
import { GetALLmess } from "@/hooks/MessData";
import { calculateDistance } from "./components/Distance";
import { useStateContex } from "@/context/State";
import Footer from "@/components/layout/footer";
import { useCurrentUser } from "@/hooks/user-hook";
import { Skeleton } from "@/components/common/Skeleton";
import { cn } from "@/lib/utils";
const features = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Discover",
    path: "mess",
    description: "Find nearby messes and tiffin services instantly",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Subscribe",
    path: '/',
    description: "Choose monthly mess plans or order daily tiffins",
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    title: "Scan & Dine",
    path: "scan-qr",
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
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    distance: "0.5 km",
    price: 3000,
    rating: 4.5,
    isVeg: true,
  },
  {
    id: "2",
    name: "Gupta Bhojanalaya",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=800&auto=format&fit=crop",
    distance: "0.8 km",
    price: 2800,
    rating: 4.3,
    isVeg: true,
  },
  {
    id: "3",
    name: "The South Spice",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
    distance: "1.2 km",
    price: 3200,
    rating: 4.7,
    isVeg: false,
  },
  {
    id: "4",
    name: "Punjab Junction",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
    distance: "1.5 km",
    price: 3500,
    rating: 4.8,
    isVeg: false,
  },
  {
    id: "5",
    name: "Royal Thali",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    distance: "0.3 km",
    price: 2500,
    rating: 4.6,
    isVeg: true,
  },
];


const SkeletonBlock = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
);
const MessSkeleton = ({ isLarge }) => (
  <div className={`rounded-[2.5rem] bg-slate-50 p-6 flex flex-col justify-end gap-3 border border-slate-100 overflow-hidden relative ${isLarge ? "col-span-2 aspect-[16/9]" : "col-span-2 md:col-span-1 aspect-square"}`}>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 to-transparent animate-pulse" />
    <SkeletonBlock className="h-5 w-24 mb-2 bg-slate-300/50" />
    <SkeletonBlock className="h-8 w-3/4 bg-slate-300/50" />
    <SkeletonBlock className="h-4 w-1/2 bg-slate-300/50" />
  </div>
);
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { Providerdata } = UserProviderdata()
  const { user } = useCurrentUser()
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const { AllMESS } = GetALLmess()
  const { userlat, userlng } = useStateContex()
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-[75px] pb-16 md:pt-16 md:pb-3 overflow-hidden bg-dot-pattern">
        {/* Optional: Decorative background blur */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-orange-100/50 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="text-center py-[15px] md:py-20 lg:text-left animate-slide-up z-10">
              <Badge variant="soft" className="mb-6 px-4 py-1.5 text-sm uppercase tracking-wide border-orange-100">
                🍛 India’s Trusted Mess Discovery
              </Badge>

              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-6">
                Your Daily Food, <br />
                <span className="text-gradient">Simplified.</span>
              </h1>
              <div className="space-y-6 mb-10 max-w-xl mx-auto lg:mx-0">
                {/* The Paragraph - Refined */}
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  Discover the most <span className="text-orange-600 font-black italic">trusted</span> messes in your city.
                  Built for students and professionals who value quality.
                </p>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-orange-200 transition-colors">
                    <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Hygienic & Verified</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-orange-200 transition-colors">
                    <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                      <Timer className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Real-time Menus</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-orange-200 transition-colors">
                    <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Home-Cooked Taste</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/mess" className="w-full sm:w-auto">
                  <Button variant="hero" size="xl" className="w-full shadow-lg shadow-orange-200">
                    <MapPin className="w-5 h-5 mr-2" />
                    Find Verified Mess
                  </Button>
                </Link>
                <Button onClick={() => navigate("/how-it-works")} variant="ghost" size="xl" className="w-full sm:w-auto">
                  How it works
                </Button>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start border-t border-border pt-8">
                <div className="text-center lg:text-left">
                  <p className="text-sm text-muted-foreground mt-1">Trusting <span className="font-semibold text-orange-600 text-3xl">Khanaval.com</span> every day</p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative md:pb-12 lg:mb-20 animate-fade-in lg:block" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                {/* Decorative Element */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-transparent rounded-3xl -rotate-3 scale-105 -z-10" />

                <img
                  src="/hero-food.jpg"
                  alt="Verified Indian mess food platform"
                  className="rounded-3xl shadow-2xl shadow-orange-900/10 border-dashed border border-orange-500 transform hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Floating Card UI (Optional Highlight) */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl hidden md:flex items-center gap-4 animate-bounce-slow">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Verified Hygiene</p>
                    <p className="text-xs text-muted-foreground">FSSAI Standards</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className=" md:py-5 py-5 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <Badge variant="soft" className="px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-black bg-primary/10 text-primary border border-primary/20">
              The Process
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              Eat Better in <span className="text-primary italic">3 Simple Steps</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
              We've streamlined the journey from hunger to high-quality meals so you can focus on your day.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-12 lg:gap-20 max-w-6xl mx-auto">
            <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-[2px] -z-10">
              <div className="w-full h-full border-t-2 border-dashed border-primary/20" />
            </div>

            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(`/${feature.path}`)}
                className="group relative cursor-pointer flex flex-col items-center text-center transition-all duration-500"
              >
                <div className="relative mb-10">

                  <div className="w-28 h-28 rounded-[2.5rem] bg-card border border-border flex items-center justify-center text-primary shadow-2xl shadow-primary/5 group-hover:border-primary/50 group-hover:shadow-primary/20 group-hover:-translate-y-3 group-hover:rotate-6 transition-all duration-500 ease-out">
                    <div className="scale-[1.35]  group-hover:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-11 h-11 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-lg shadow-xl ring-8 ring-background group-hover:rotate-12 transition-transform">
                    0{index + 1}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
                {index < features.length - 1 && (
                  <div className="md:hidden mt-12 mb-4 text-primary/40 animate-bounce">
                    <ArrowDown className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-24 text-center">
            {
              user || Providerdata ? <Button onClick={() => navigate("/mess")} size="xl" className="rounded-2xl px-12 py-7 text-lg font-bold shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)]  transition-all">
                Get Started Now
              </Button> : <Button onClick={() => navigate("/auth")} size="xl" className="rounded-2xl px-12 py-7 text-lg font-bold shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)]  transition-all">
                Get Started Now
              </Button>
            }
          </div>
        </div>
      </section>

      {/* mess card */}
   <section className="py-16 md:py-32 bg-[#FAFAFA] overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      
      {/* Left Content Column */}
      <div className="space-y-10">
        <div className="space-y-6">
          <Badge 
            variant="outline" 
            className="px-4 py-1.5 text-xs uppercase tracking-widest rounded-full bg-primary/5 text-primary border-primary/20"
          >
            Why MealPass?
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            The Smartest Way to <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-primary italic">Eat Daily</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 -z-10" />
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
            We verify every mess so you don't have to. Enjoy <span className="text-slate-900 font-bold">verified hygiene</span> and real-time menus.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">{benefit.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Bento Grid Area */}
      <div className="relative">
        {/* Decorative Background Element */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {AllMESS?.slice(0, 3).map((mess, index) => (
            <Card
              key={mess._id}
              className={cn(
                "group relative overflow-hidden rounded-[2rem] border-none shadow-lg transition-all duration-500 hover:shadow-2xl",
                index === 0 ? "col-span-2 aspect-[16/9]" : "col-span-1 aspect-square"
              )}
            >
              <img
                src={mess?.media?.cover}
                alt={mess.identity?.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Refined Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <Badge className={cn(
                  "mb-3 border-none text-white backdrop-blur-md",
                  mess?.identity?.dietaryType ? "bg-emerald-500/80" : "bg-orange-500/80"
                )}>
                  {mess?.identity?.dietaryType ? "Pure Veg" : "Non-Veg Available"}
                </Badge>
                
                <h4 className={cn(
                  "font-bold text-white mb-2 line-clamp-1",
                  index === 0 ? "text-2xl md:text-3xl" : "text-lg"
                )}>
                  {mess?.identity.name}
                </h4>

                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-sm">4.2</span>
                  </div>
                  <span className="text-sm font-medium opacity-80">
                    {calculateDistance(userlat, userlng, mess.location.lat, mess.location.lng)} KM away
                  </span>
                </div>
              </div>
            </Card>
          ))}

          <Link to="/mess" className="col-span-2 group/btn">
            <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Explore All Local Messes 
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

    </div>
  </div>
</section>
      {/* bannrs */}
      <section className="py-8 md:py-5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative group p-8 md:p-20 rounded-[3rem] bg-primary overflow-hidden shadow-[0_40px_80px_-15px_rgba(var(--primary-rgb),0.3)]">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,#ffffff_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#000000_0%,transparent_50%)]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="flex flex-col items-center gap-4 mb-10 animate-fade-in">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-2xl border-4 border-primary bg-muted overflow-hidden transition-transform hover:-translate-y-2"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?u=meal${i}`}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-2xl border-4 border-primary bg-white text-primary flex items-center justify-center text-xs font-black shadow-lg">
                    +2k
                  </div>
                </div>
                <p className="text-primary-foreground/90 font-bold text-sm tracking-widest uppercase">
                  Join the MealPass Community
                </p>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1] tracking-tighter">
                Ready to <span className="text-white/70 italic">Simplify</span> <br />
                Your Daily Meals?
              </h2>

              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-12 text-lg md:text-xl font-medium leading-relaxed">
                Stop worrying about what to eat. Join thousands who save over <span className="text-white font-bold border-b-2 border-white/30 italic">₹2,000 monthly</span> on their food subscriptions.
              </p>

              {/* High-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
                <Link to="/auth?role=user" className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="w-full sm:w-auto py-2 px-12 h-18 bg-white text-primary hover:bg-white/90 hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-all text-xl font-black rounded-2xl"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Link>

                <Link to="/auth?role=provider" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto py-2 px-12 h-18 border-white/20 text-white hover:bg-white/10 text-xl font-bold rounded-2xl backdrop-blur-md"
                  >
                    List Your Mess
                  </Button>
                </Link>
              </div>

              {/* Secondary Trust Line */}
              <p className="mt-12 text-primary-foreground/60 text-sm font-medium">
                No credit card required • Cancel anytime • 24/7 Support
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
