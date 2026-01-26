import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Users, IndianRupee, UserPlus, Search,
    ArrowRight, Phone, Clock, Filter, Loader2, CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Getmymess } from "@/hooks/PorviderMess";

export default function SubscriptionRequestList() {
    const { toast } = useToast();
    const { messdata } = Getmymess();
    
    // Accessing your specific data structure
    const requests = messdata?.myAllSubscribersRequest || [];
    console.log(requests)
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pb-10">
            {/* Header Section */}
            <div className="bg-slate-900 p-8 rounded-b-[3rem] shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-orange-500 font-black text-[10px] uppercase tracking-widest mb-1">Admin Panel</p>
                        <h1 className="text-white text-3xl font-black italic tracking-tighter uppercase">Subscriber Requests</h1>
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md relative">
                        <Users className="text-white w-6 h-6" />
                        {requests.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {requests.length}
                            </span>
                        )}
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search by name or phone..."
                            className="bg-white/10 border-none text-white placeholder:text-slate-500 pl-11 rounded-xl h-12 focus-visible:ring-orange-600"
                        />
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-500 rounded-xl w-12 h-12 p-0 shrink-0">
                        <Filter className="w-5 h-5 text-white" />
                    </Button>
                </div>
            </div>

            {/* List Section */}
            <div className="container mx-auto px-4 -mt-6">
                <div className="grid gap-4">
                    {requests.length > 0 ? (
                        requests.map((request, index) => (
                            <Card key={index} className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        {/* User Info */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 font-black text-xl shadow-inner">
                                                {request.userName?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-slate-900 leading-tight">
                                                    {request.userName}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="flex items-center gap-1 text-slate-500 text-xs font-bold">
                                                        <Phone className="w-3 h-3 text-orange-500" /> {request.phoneNumber}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase">
                                                        <Clock className="w-3 h-3" /> New Request
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <UserPlus className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-slate-900 font-black text-xl italic uppercase">No Requests Yet</h3>
                            <p className="text-slate-500 font-medium max-w-[250px] mt-2">
                                When customers request a pass, they will appear here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}