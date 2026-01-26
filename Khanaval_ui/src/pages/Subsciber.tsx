import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Users, IndianRupee, UserPlus, Search, 
    ArrowRight, Mail, Phone, Clock, Filter 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SubscriptionRequestList() {
    const { toast } = useToast();
    const [prices, setPrices] = useState({}); // Stores price for each specific user ID
    const [loadingStates, setLoadingStates] = useState({});
    const dummyRequests = [
        { id: "1", first_name: "Kiran", last_name: "Rathod", phone: "7057659576", email: "kiran.r@gmail.com", time: "2 mins ago" },
        { id: "2", first_name: "Rahul", last_name: "Sharma", phone: "9823456710", email: "rahul.s@gmail.com", time: "15 mins ago" },
        { id: "3", first_name: "Amit", last_name: "Patil", phone: "8800123456", email: "amit.p@gmail.com", time: "1 hour ago" },
        { id: "4", first_name: "Sanya", last_name: "Malhotra", phone: "7766554433", email: "sanya.m@gmail.com", time: "3 hours ago" },
        { id: "5", first_name: "Vijay", last_name: "Kumar", phone: "9001122334", email: "vijay.k@gmail.com", time: "5 hours ago" },
        { id: "6", first_name: "Priya", last_name: "Singh", phone: "8123456789", email: "priya.s@gmail.com", time: "Yesterday" },
        { id: "7", first_name: "Deepak", last_name: "Verma", phone: "9988776655", email: "deepak.v@gmail.com", time: "Yesterday" },
        { id: "8", first_name: "Sneha", last_name: "Deshmukh", phone: "7218349506", email: "sneha.d@gmail.com", time: "2 days ago" },
        { id: "9", first_name: "Arjun", last_name: "Reddy", phone: "9102938475", email: "arjun.r@gmail.com", time: "2 days ago" },
        { id: "10", first_name: "Anjali", last_name: "Joshi", phone: "8475639201", email: "anjali.j@gmail.com", time: "3 days ago" },
    ];

    const handlePriceChange = (id, value) => {
        setPrices(prev => ({ ...prev, [id]: value }));
    };

    const handleApprove = (id, name) => {
        const price = prices[id];
        if (!price) {
            toast({ title: "Error", description: "Set price first", variant: "destructive" });
            return;
        }

        setLoadingStates(prev => ({ ...prev, [id]: true }));
        
        // Simulating API call
        setTimeout(() => {
            setLoadingStates(prev => ({ ...prev, [id]: false }));
            toast({
                title: "Approved!",
                description: `${name}'s plan set to ₹${price}`,
            });
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header Section */}
            <div className="bg-slate-900 p-8  rounded-b-[3rem] shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-orange-500 font-black text-[10px] uppercase tracking-widest mb-1">Admin Panel</p>
                        <h1 className="text-white text-3xl font-black italic tracking-tighter uppercase">Subscriber Requests</h1>
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                        <Users className="text-white w-6 h-6" />
                    </div>
                </div>
                
                {/* Stats & Search */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                            placeholder="Search name or phone..." 
                            className="bg-white/10 border-none text-white placeholder:text-slate-500 pl-11 rounded-xl h-12"
                        />
                    </div>
                    <Button className="bg-orange-600 rounded-xl w-12 h-12 p-0">
                        <Filter className="w-5 h-5 text-white" />
                    </Button>
                </div>
            </div>

    
        </div>
    );
}