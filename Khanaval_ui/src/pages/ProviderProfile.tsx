import React from 'react';
import { 
  MapPin, Phone, Clock, ShieldCheck, Utensils, 
  Edit3, Share2, ExternalLink, LogOut, PlusCircle, LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProviderdata } from '@/hooks/Provider';
import { Link } from 'react-router-dom';

export function ProviderProfile() {
  const { Providerdata } = UserProviderdata();
  const { 
    id, 
    OwnerName, 
    number, 
    MessRegistered 
  } = Providerdata || {};

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <div className="container mx-auto px-3 md:px-6">
        
        {/* HEADER SECTION */}
        <div className="relative mb-20 md:mb-12">
          {/* Banner */}
          <div className="h-40 md:h-60 w-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-[24px] md:rounded-[32px] shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
          </div>

          {/* Profile Stats Card - Responsive adjustments for stacking on mobile */}
          <div className="absolute -bottom-16 md:-bottom-16 left-2 right-2 md:left-8 md:right-8 bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            
            <div className="relative shrink-0">
              <Avatar className="w-20 h-20 md:w-32 md:h-32 border-4 border-white shadow-lg -mt-10 md:-mt-20">
                <AvatarFallback className="bg-orange-100 text-orange-600 font-black text-xl md:text-2xl">
                  {OwnerName?.[0] || "P"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-green-500 p-1 md:p-1.5 rounded-full border-2 md:border-4 border-white">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-1">
              <div className="flex flex-col md:flex-row items-center gap-2 mb-1">
                <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">{OwnerName}</h1>
                <Badge className="bg-slate-100 text-slate-500 border-none px-2 py-0.5 font-bold text-[9px] uppercase tracking-widest hidden md:inline-flex">
                  ID: {id}
                </Badge>
              </div>
              <p className="text-slate-500 text-sm font-medium flex items-center justify-center md:justify-start gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-500" /> {number}
              </p>
            </div>

            {/* Actions: Stacks on mobile, inline on desktop */}
            <div className="flex w-full md:w-auto gap-2 md:gap-3">
              <Button 
                variant="outline" 
                className="flex-1 md:flex-none rounded-xl font-bold text-red-500 border-red-50 hover:bg-red-50 h-10 md:h-11 px-3"
              >
                <LogOut className="w-4 h-4 md:mr-2" /> 
                <span className="hidden md:inline">Logout</span>
              </Button>
              <Button className="flex-[2] md:flex-none bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black h-10 md:h-11 px-6 shadow-lg text-xs md:text-sm">
                <Edit3 className="w-4 h-4 mr-2" /> Edit Info
              </Button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-20 md:mt-24">
          
          {/* SIDEBAR */}
          <div className="space-y-6 order-2 lg:order-1">
            <Card className="rounded-[24px] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50 pb-4 py-4">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 text-sm px-5">
                {[
                  { label: "Provider", value: OwnerName },
                  { label: "Contact", value: number },
                  { label: "Member Since", value: "Jan 2024" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                    <span className="text-slate-400 font-medium italic">{item.label}</span>
                    <span className="font-black text-slate-800">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-none shadow-sm bg-slate-900 text-white overflow-hidden">
               <div className="p-5">
                <h3 className="font-black text-orange-500 uppercase text-[9px] tracking-[0.2em] mb-4">Quick Shortcuts</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  <Button variant="ghost" className="justify-start hover:bg-white/10 text-white font-bold h-11 rounded-xl text-xs px-3">
                    <LayoutDashboard className="w-4 h-4 mr-2 text-orange-500" /> Dashboard
                  </Button>
                  <Button variant="ghost" className="justify-start hover:bg-white/10 text-white font-bold h-11 rounded-xl text-xs px-3">
                    <Share2 className="w-4 h-4 mr-2 text-orange-500" /> Share
                  </Button>
                </div>
               </div>
            </Card>
          </div>

          {/* DYNAMIC CONTENT */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {MessRegistered ? (
              <Tabs defaultValue="menu" className="w-full">
                <TabsList className="bg-white p-1 rounded-xl md:rounded-2xl border border-slate-200 h-12 md:h-14 w-full justify-start overflow-x-auto no-scrollbar gap-1 mb-4">
                  {['menu', 'gallery', 'settings'].map((tab) => (
                    <TabsTrigger 
                      key={tab}
                      value={tab} 
                      className="flex-1 md:flex-none rounded-lg md:rounded-xl px-4 md:px-8 font-black text-[10px] md:text-xs uppercase data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all"
                    >
                      {tab === 'settings' ? 'Info' : tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="menu" className="animate-in fade-in slide-in-from-bottom-2">
                  <Card className="rounded-[24px] md:rounded-[32px] border-none shadow-sm p-5 md:p-8 bg-white">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
                      <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-900 italic">Annapurna Home Mess</h2>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-tighter mt-1 flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-orange-500" /> Kothrud, Pune
                        </p>
                      </div>
                      <Badge className="w-fit bg-green-100 text-green-700 border-none font-black px-4 py-1.5 rounded-lg text-xs">OPEN</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <MenuCard title="Afternoon Lunch" dish="Panner Masala + 3 Chapati + Rice" price="80" icon={<Utensils />} active />
                      <MenuCard title="Dinner Service" dish="Veg Kolhapuri + Dal Tadka + Rice" price="75" icon={<Clock />} />
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="gallery">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="aspect-square md:aspect-video bg-slate-200 rounded-2xl overflow-hidden shadow-sm hover:ring-4 ring-orange-500/20 transition-all">
                        <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <EmptyState />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner responsive management
function MenuCard({ title, dish, price, icon, active = false }) {
  return (
    <div className={`p-5 rounded-[20px] md:rounded-[24px] border relative group overflow-hidden ${active ? 'bg-orange-50/50 border-orange-100' : 'bg-slate-50 border-slate-100'}`}>
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {React.cloneElement(icon, { className: "w-10 h-10 md:w-12 md:h-12" })}
      </div>
      <p className={`text-[9px] font-black uppercase mb-1.5 ${active ? 'text-orange-600' : 'text-slate-500'}`}>{title}</p>
      <p className="font-black text-slate-800 text-sm md:text-base leading-snug">{dish}</p>
      <p className={`mt-4 font-black text-lg md:text-xl ${active ? 'text-orange-700' : 'text-slate-900'}`}>₹{price}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-[30px] md:rounded-[40px] p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6 min-h-[350px]">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 shadow-inner">
        <PlusCircle className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      <div className="max-w-xs">
        <h3 className="text-xl md:text-2xl font-black text-slate-900">Setup Your Mess</h3>
        <p className="text-slate-500 text-xs md:text-sm font-medium mt-2">Create your digital menu and start receiving student orders today.</p>
      </div>
      <Link to="/provider/messsResgiter" className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white h-12 md:h-14 px-8 rounded-xl md:rounded-2xl font-black shadow-xl shadow-orange-100 uppercase tracking-widest text-[10px] transition-all flex items-center justify-center">
        Register My Mess Now
      </Link>
    </div>
  );
}