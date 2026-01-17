import React from 'react';
import { 
  MapPin, Phone, Clock, ShieldCheck, Utensils, 
  Edit3, Share2, LogOut, PlusCircle, LayoutDashboard,
  QrCode, Download, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProviderdata } from '@/hooks/Provider';
import { Link } from 'react-router-dom';
import { Getmymess } from '@/hooks/PorviderMess';

export function ProviderProfile() {
  const { Providerdata } = UserProviderdata();
  const { id, OwnerName, number } = Providerdata || {};
  const { messdata, isLoading } = Getmymess();
  const hasMess = messdata && messdata.identity?.name;
  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      <div className="h-32 md:h-40 bg-orange-500 w-full rounded-t-[15px]" />
      <div className="container mx-auto px-4">
        <div className="relative -mt-12 mb-8 flex flex-col md:flex-row items-center md:items-end gap-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32  border-2 border-black">
            <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-2xl">
              {OwnerName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left pb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{OwnerName}</h1>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-1 text-slate-500">
              <span className="flex items-center gap-1 text-sm"><Phone className="w-3.5 h-3.5" /> {number}</span>
              <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-700">ID: {id?.toString().slice(-5)}</span>
            </div>
          </div>

          <div className="flex gap-2 pb-2">
            <Button variant="outline" className="rounded-lg border-slate-300">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-sm rounded-xl">
              <CardContent className="p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Account Details</h3>
                <div className="space-y-3">
                  <DetailRow label="Member Since" value="Jan 2024" isVerified={undefined} />
                  <DetailRow label="Type" value="Mess Provider" isVerified={undefined} />
                  <DetailRow label="Status" value="Verified" isVerified />
                </div>
                <hr className="my-4 border-slate-100" />
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 p-0">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </CardContent>
            </Card>

            <Button className="w-full justify-between h-12 bg-slate-800 rounded-xl">
              <span className="flex items-center"><LayoutDashboard className="w-4 h-4 mr-2 text-orange-400" /> Merchant Dashboard</span>
              <Info className="w-4 h-4 opacity-50" />
            </Button>
          </div>

          <div className="lg:col-span-8">
            {!hasMess && !isLoading ? (
              <EmptyState />
            ) : (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-transparent border-b border-slate-200 w-full justify-start rounded-none h-auto p-0 mb-6 gap-8">
                  <TabsTrigger value="overview" className="data-[state=active]:border-orange-600 data-[state=active]:text-orange-600 border-b-2 border-transparent rounded-none bg-transparent px-0 py-2 font-bold shadow-none">Overview</TabsTrigger>
                  <TabsTrigger value="qr" className="data-[state=active]:border-orange-600 data-[state=active]:text-orange-600 border-b-2 border-transparent rounded-none bg-transparent px-0 py-2 font-bold shadow-none">Mess QR</TabsTrigger>
                  <TabsTrigger value="photos" className="data-[state=active]:border-orange-600 data-[state=active]:text-orange-600 border-b-2 border-transparent rounded-none bg-transparent px-0 py-2 font-bold shadow-none">Photos</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 outline-none">
                  <Card className="border-none shadow-sm rounded-xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900">{messdata?.identity?.name}</h2>
                          <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5" /> {messdata?.location?.address}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-none px-3">{messdata?.identity?.operatingMode}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Cuisine Type</p>
                          <p className="font-semibold text-slate-800">{messdata?.identity?.dietaryType}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Service Hours</p>
                          <p className="font-semibold text-slate-800">{messdata?.identity?.startTime} - {messdata?.identity?.endTime}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 p-2 rounded-lg">
                        <QrCode className="w-8 h-8 text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Mess Menu QR</h4>
                        <p className="text-xs text-slate-500">Show this to students for the digital menu.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="font-bold">View QR</Button>
                  </div>
                </TabsContent>

                <TabsContent value="qr" className="outline-none">
                  <Card className="border-none shadow-sm rounded-xl">
                    <CardContent className="p-10 flex flex-col items-center text-center">
                       <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 mb-6">
                          <QrCode size={160} strokeWidth={1.5} className="text-slate-900" />
                       </div>
                       <h3 className="text-lg font-bold text-slate-900">Your Menu Access QR</h3>
                       <p className="text-slate-500 text-sm max-w-xs mt-2">Print this QR and place it on your mess tables for students to scan.</p>
                       <div className="flex gap-3 mt-8 w-full max-w-xs">
                          <Button variant="outline" className="flex-1 rounded-lg"><Download className="w-4 h-4 mr-2" /> Download</Button>
                          <Button className="flex-1 rounded-lg bg-slate-900 text-white"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
                       </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="photos">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.values(messdata?.media || {}).filter(url => typeof url === 'string').map((url, i) => (
                      <div key={i} className="aspect-square bg-slate-200 rounded-xl overflow-hidden border border-slate-100">
                        <img src={url} className="w-full h-full object-cover" alt="Mess Interior" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, isVerified }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-500">{label}</span>
      {isVerified ? (
        <span className="text-[10px] font-bold uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded">Verified</span>
      ) : (
        <span className="text-sm font-semibold text-slate-800">{value}</span>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
        <PlusCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No Mess Found</h3>
      <p className="text-slate-500 text-sm mb-6">Register your mess to get your QR code and dashboard.</p>
      <Link to="/provider/messsResgiter">
        <Button className="bg-orange-600 hover:bg-orange-700 font-bold px-8">Register Now</Button>
      </Link>
    </div>
  );
}