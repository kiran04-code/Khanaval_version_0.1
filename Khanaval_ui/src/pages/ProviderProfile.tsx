    import React from 'react';
    import { 
    Building2, MapPin, Phone, Clock, Star, 
    ShieldCheck, Utensils, Calendar, Camera, 
    Edit3, Share2, ExternalLink 
    } from "lucide-react";
    import { Button } from "@/components/ui/button";
    import { Badge } from "@/components/ui/badge";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

    export function ProviderProfile() {
    // Mock data - Replace with your Providerdata from hook
    const provider = {
        businessName: "Annapurna Home Mess",
        ownerName: "Rajesh Kumar",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=200",
        rating: 4.8,
        reviews: 124,
        status: "Verified",
        address: "Lane 4, Near MIT College, Kothrud, Pune",
        phone: "+91 98765 43210",
        timing: "12:00 PM - 10:00 PM",
        speciality: ["Maharashtrian", "North Indian"],
        joined: "Jan 2024"
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12">
        <div className="container mx-auto px-4 md:px-6">
            
            {/* HEADER SECTION */}
            <div className="relative mb-8">
            {/* Cover Photo Backdrop */}
            <div className="h-48 md:h-64 w-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-[32px] shadow-lg overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
            </div>

            {/* Profile Stats Card */}
            <div className="absolute -bottom-16 left-8 right-8 bg-white rounded-3xl shadow-xl border border-slate-100 p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg -mt-12 md:-mt-20">
                    <AvatarImage src={provider.imageUrl} />
                    <AvatarFallback className="bg-orange-100 text-orange-600 font-black text-2xl">
                    {provider.ownerName[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 bg-green-500 p-1.5 rounded-full border-4 border-white">
                    <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900">{provider.businessName}</h1>
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none px-3 py-1 font-bold">
                    {provider.status}
                    </Badge>
                </div>
                <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-1">
                    <MapPin className="w-4 h-4" /> {provider.address}
                </p>
                </div>

                <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl font-bold border-2">
                    <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-black px-6 shadow-lg shadow-orange-100">
                    <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
                </div>
            </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">
            
            {/* SIDEBAR: BUSINESS DETAILS */}
            <div className="space-y-6">
                <Card className="rounded-[24px] border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-black uppercase tracking-tight text-slate-800">Business Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 text-sm">
                    <div className="flex items-center gap-4 text-slate-600">
                    <div className="bg-slate-100 p-2 rounded-lg"><Phone className="w-4 h-4" /></div>
                    <span className="font-bold">{provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                    <div className="bg-slate-100 p-2 rounded-lg"><Clock className="w-4 h-4" /></div>
                    <span className="font-bold">{provider.timing}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                    <div className="bg-slate-100 p-2 rounded-lg"><Star className="w-4 h-4 text-orange-500" /></div>
                    <span className="font-bold">{provider.rating} ({provider.reviews} Reviews)</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                    <div className="bg-slate-100 p-2 rounded-lg"><Calendar className="w-4 h-4" /></div>
                    <span className="font-bold">Member since {provider.joined}</span>
                    </div>
                </CardContent>
                </Card>

                <Card className="rounded-[24px] border-none shadow-sm bg-slate-900 text-white">
                <CardContent className="p-6">
                    <h3 className="font-black text-orange-500 uppercase text-xs tracking-widest mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-3">
                    <Button variant="ghost" className="justify-start hover:bg-white/10 text-white font-bold w-full">
                        <Utensils className="w-4 h-4 mr-3" /> Update Today's Menu
                    </Button>
                    <Button variant="ghost" className="justify-start hover:bg-white/10 text-white font-bold w-full">
                        <Camera className="w-4 h-4 mr-3" /> Manage Gallery
                    </Button>
                    <Button variant="ghost" className="justify-start hover:bg-white/10 text-white font-bold w-full">
                        <ExternalLink className="w-4 h-4 mr-3" /> View Public Page
                    </Button>
                    </div>
                </CardContent>
                </Card>
            </div>

            {/* MAIN TABS AREA */}
            <div className="lg:col-span-2">
                <Tabs defaultValue="menu" className="w-full">
                <TabsList className="bg-white p-1 rounded-2xl border border-slate-200 h-14 w-full justify-start gap-2 mb-6">
                    <TabsTrigger value="menu" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-orange-600 data-[state=active]:text-white">Live Menu</TabsTrigger>
                    <TabsTrigger value="gallery" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-orange-600 data-[state=active]:text-white">Photos</TabsTrigger>
                    <TabsTrigger value="reviews" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-orange-600 data-[state=active]:text-white">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="menu" className="space-y-4">
                    <Card className="rounded-[32px] border-none shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-slate-900">Today's Special</h2>
                        <Badge variant="outline" className="border-green-500 text-green-600 font-bold uppercase text-[10px]">Available Now</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <p className="text-xs font-bold text-orange-600 uppercase mb-1">Lunch Thali</p>
                        <p className="font-black text-slate-800">Panner Masala, Dal Tadka, 3 Roti, Rice & Sweet</p>
                        <p className="mt-3 font-black text-orange-700">₹80.00</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Dinner Thali</p>
                        <p className="font-black text-slate-800">Veg Kolhapuri, 3 Chapati, Rice, Salad</p>
                        <p className="mt-3 font-black text-slate-700">₹70.00</p>
                        </div>
                    </div>
                    </Card>
                </TabsContent>

                <TabsContent value="gallery">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="aspect-square bg-slate-200 rounded-2xl overflow-hidden hover:opacity-90 transition-all cursor-pointer border-2 border-white shadow-sm">
                            <img src={`https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop`} alt="Food" className="w-full h-full object-cover" />
                        </div>
                    ))}
                    </div>
                </TabsContent>
                </Tabs>
            </div>

            </div>
        </div>
        </div>
    );
    }