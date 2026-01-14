import React from 'react';
import { 
  Building2, MapPin, Phone, Clock, Star, 
  ShieldCheck, Utensils, Calendar, Camera, 
  Edit3, Share2, ExternalLink, LogOut, User, PlusCircle, LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProviderdata } from '@/hooks/Provider';

export function ProviderProfile() {
const {Providerdata} = UserProviderdata()
  const { 
    id ,
    OwnerName ,
    number ,
    MessRegistered
  } = Providerdata || {};

  return (
    <div className="min-h-screen bg-slate-50/50  pb-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* HEADER SECTION */}
        <div className="relative mb-8">
          <div className="h-48 md:h-60 w-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-[32px] shadow-lg overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
          </div>

          {/* Profile Stats Card */}
          <div className="absolute -bottom-16 left-4 right-4 md:left-8 md:right-8 bg-white rounded-3xl shadow-xl border border-slate-100 p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg -mt-12 md:-mt-20">
            
                <AvatarFallback className="bg-orange-100 text-orange-600 font-black text-2xl">
                  {OwnerName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-1 right-1 bg-green-500 p-1.5 rounded-full border-4 border-white">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">{OwnerName}</h1>
                <Badge className="bg-slate-100 text-slate-600 border-none px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                  ID: {id}
                </Badge>
              </div>
              <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-1">
                <Phone className="w-4 h-4 text-orange-500" /> {number}
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                className="rounded-xl font-bold text-red-500 hover:bg-red-50 hover:text-red-600 group"
              >
                <LogOut className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                Logout
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black px-6 shadow-lg">
                <Edit3 className="w-4 h-4 mr-2" /> Edit Info
              </Button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">
          
          {/* LEFT SIDEBAR: OWNER / ACCOUNT INFO */}
          <div className="space-y-6">
            <Card className="rounded-[24px] border-none shadow-sm bg-white">
              <CardHeader className="border-b border-slate-50 pb-4">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium italic">Provider Name</span>
                  <span className="font-black text-slate-900">{OwnerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium italic">Contact</span>
                  <span className="font-black text-slate-900">{number}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium italic">Member Since</span>
                  <span className="font-black text-slate-900">Jan 2024</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-none shadow-sm bg-slate-900 text-white overflow-hidden">
               <div className="p-6">
                <h3 className="font-black text-orange-500 uppercase text-[10px] tracking-[0.2em] mb-4">Quick Shortcuts</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-between hover:bg-white/10 text-white font-bold h-12 rounded-xl">
                    <span className="flex items-center gap-3"><LayoutDashboard className="w-4 h-4 text-orange-500" /> Dashboard</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </Button>
                  <Button variant="ghost" className="w-full justify-between hover:bg-white/10 text-white font-bold h-12 rounded-xl">
                    <span className="flex items-center gap-3"><Share2 className="w-4 h-4 text-orange-500" /> Share Mess</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </Button>
                </div>
               </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: MESS CONTENT (DYNAMIC) */}
          <div className="lg:col-span-2">
            {MessRegistered ? (
              /* IF MESS IS REGISTERED: SHOW ALL MESS DETAILS */
              <Tabs defaultValue="menu" className="w-full">
                <TabsList className="bg-white p-1 rounded-2xl border border-slate-200 h-14 w-full justify-start gap-2 mb-6">
                  <TabsTrigger value="menu" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-orange-600 data-[state=active]:text-white">Live Menu</TabsTrigger>
                  <TabsTrigger value="gallery" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-orange-600 data-[state=active]:text-white">Gallery</TabsTrigger>
                  <TabsTrigger value="settings" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-orange-600 data-[state=active]:text-white">Mess Info</TabsTrigger>
                </TabsList>

                <TabsContent value="menu" className="animate-in fade-in slide-in-from-bottom-2">
                  <Card className="rounded-[32px] border-none shadow-sm p-8 bg-white">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 italic">Annapurna Home Mess</h2>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter mt-1 flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> Kothrud, Pune
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-none font-black px-4 py-2 rounded-xl">OPEN</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-orange-50/50 rounded-[24px] border border-orange-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Utensils className="w-12 h-12" /></div>
                        <p className="text-[10px] font-black text-orange-600 uppercase mb-2">Afternoon Lunch</p>
                        <p className="font-black text-slate-800 text-lg">Panner Masala + 3 Chapati + Rice</p>
                        <p className="mt-4 font-black text-orange-700 text-xl">₹80</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Clock className="w-12 h-12" /></div>
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Dinner Service</p>
                        <p className="font-black text-slate-800 text-lg">Veg Kolhapuri + Dal Tadka + Rice</p>
                        <p className="mt-4 font-black text-slate-900 text-xl">₹75</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="gallery">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {[1,2,3].map(i => (
                       <div key={i} className="aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-sm hover:ring-4 ring-orange-500/20 transition-all">
                          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400" className="w-full h-full object-cover" />
                       </div>
                     ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              /* IF MESS IS NOT REGISTERED: SHOW EMPTY STATE / REGISTER CALL */
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[40px] p-12 text-center flex flex-col items-center justify-center space-y-6 min-h-[400px]">
                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 shadow-inner">
                  <PlusCircle className="w-12 h-12" />
                </div>
                <div className="max-w-xs">
                  <h3 className="text-2xl font-black text-slate-900">Setup Your Mess</h3>
                  <p className="text-slate-500 font-medium mt-2">You haven't added your mess details yet. Join 100+ providers today.</p>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white h-14 px-10 rounded-2xl font-black shadow-xl shadow-orange-100 uppercase tracking-widest text-xs active:scale-95 transition-all">
                  Register My Mess Now
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}