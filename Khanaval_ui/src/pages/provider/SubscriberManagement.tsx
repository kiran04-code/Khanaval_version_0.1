import { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  UserPlus,
  ArrowRight,
  ArrowLeft,
  Loader2,
  User as UserIcon,
  Phone,
  Mail,
  IndianRupee,
  CalendarDays,
  ShieldCheck,
  SearchCheck,
  Sparkle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStateContex } from "@/context/State";

export interface IUser {
  emailId: string;
  first_name: string;
  last_name: string;
  number: string;
  imageUrl?: string;
}

export default function SubscriberManagement() {
  const { axioseInstace } = useStateContex();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [verifiedUser, setVerifiedUser] = useState<IUser | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "30",
    price: "",
  });

  const { toast } = useToast();

  const handleCheckUser = async () => {
    if (!newSubscriber.phone) {
      toast({ 
        title: "Phone Required", 
        description: "Please enter a number to verify the user.", 
        variant: "destructive" 
      });
      return;
    }

    setIsValidating(true);
    try {
      const { data } = await axioseInstace.post("/api/VerifiedUser", {
        number: newSubscriber.phone
      });

      if (data.success) {
        setVerifiedUser(data.userData);
        setStep(2);
        toast({ 
            title: "Verification Successful", 
            description: "Member found on platform." 
        });
      } else {
        toast({ 
            title: "User Not Found", 
            description: data.message || "User is not available on this platform.", 
            variant: "destructive" 
        });
      }
    } catch (error) {
      toast({ 
        title: "Connection Error", 
        description: "Could not reach the server.", 
        variant: "destructive" 
      });
    } finally {
      setIsValidating(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setVerifiedUser(null);
    setNewSubscriber({ name: "", email: "", phone: "", plan: "30", price: "" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* --- PAGE HEADER --- */}
 <div className="flex flex-col gap-8 p-6 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-orange-50 via-white to-orange-100/30 border border-orange-100 shadow-xl shadow-orange-500/5 transition-all">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
    
    {/* Left Side: Title & Context */}
    <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-orange-500 rounded-xl shadow-lg shadow-orange-200 animate-pulse-slow">
          <Sparkle className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <span className="text-orange-600 font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px]">
          Management Portal
        </span>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          Subscribers<span className="text-orange-500 ml-1">.</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-medium max-w-[280px] md:max-w-sm leading-relaxed">
          Monitor your membership growth and manage active plans in real-time.
        </p>
      </div>
    </div>

    {/* Right Side: Primary Action */}
    <div className="w-full md:w-auto">
      <Button 
        className="w-full md:w-auto h-14 md:h-16 px-8 md:px-10 rounded-[1.25rem] md:rounded-[1.5rem] bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-200 transition-all hover:-translate-y-1 active:scale-[0.97] gap-3 border-b-4 border-orange-700 group"
        onClick={() => setIsAddModalOpen(true)}
      >
        <div className="bg-white/20 p-2 rounded-lg group-hover:rotate-12 transition-transform">
          <UserPlus className="w-5 h-5 text-white" />
        </div>
        <span className="font-black  text-[12px] md:text-lg tracking-tight uppercase">
          Add New Subscriber
        </span>
      </Button>
    </div>
  </div>

  {/* --- RESPONSIVE STATS BAR --- */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 pt-6 border-t border-orange-200/50">
    {[
      { label: "Total Members", value: "1,284", color: "text-slate-800" },
      { label: "Active Plans", value: "856", color: "text-emerald-500" },
      { label: "Expiring Soon", value: "24", color: "text-orange-500" },
      { label: "Revenue", value: "₹42K", color: "text-slate-800" },
    ].map((stat, idx) => (
      <div 
        key={idx} 
        className={`flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start px-2 md:px-6 ${
          idx !== 0 ? "md:border-l border-orange-100" : ""
        }`}
      >
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {stat.label}
        </span>
        <span className={`text-xl md:text-2xl font-black ${stat.color}`}>
          {stat.value}
        </span>
      </div>
    ))}
  </div>
</div>

      {/* --- ADD SUBSCRIBER DIALOG --- */}
      <Dialog open={isAddModalOpen} onOpenChange={(val) => { 
          setIsAddModalOpen(val); 
          if(!val) resetForm(); 
      }}>
        <DialogContent className="max-w-[400px] md:max-w-[400px] sm:max-w-[400px] w-[300px] p-0 overflow-hidden border-none rounded-[3rem] shadow-2xl bg-white">
          
          {/* DIALOG HEADER */}
          <div className="bg-orange-500 p-8 text-white">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className="text-2xl font-black tracking-tight">
                {step === 1 ? "User Verification" : "Plan Details"}
              </DialogTitle>
              <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase">
                Step 0{step}
              </div>
            </div>
            <div className="flex gap-2">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? "bg-white" : "bg-white/20"}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? "bg-white" : "bg-white/20"}`} />
            </div>
          </div>

          <div className="p-8">
            {step === 1 ? (
              <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                {/* INFO BOX */}
                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3">
                  <SearchCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-orange-900 uppercase tracking-tighter">Eligibility Check</p>
                    <p className="text-xs text-orange-700 leading-relaxed font-medium">
                      Verify if this user is available on the platform before creating a new subscription plan.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Registered Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                      <Input
                        placeholder="+91 XXXXX XXXXX"
                        className="h-12 pl-11 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-orange-500 font-bold"
                        onChange={(e) => setNewSubscriber({...newSubscriber, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-14 rounded-2xl mt-4 bg-orange-500 hover:bg-orange-600 font-black shadow-xl shadow-orange-100 transition-all active:scale-[0.98]"
                  onClick={handleCheckUser}
                  disabled={isValidating}
                >
                  {isValidating ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Checking Platform...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Check Viability</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
                
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                  Secure Server Validation
                </p>
              </div>
            ) : (
              /* --- STEP 2: DETAILS --- */
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                {verifiedUser && (
                  <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-[2rem] text-white shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center font-black text-xl">
                      {verifiedUser.first_name.substring(0,1).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-lg truncate leading-none mb-1">
                        {verifiedUser.first_name} {verifiedUser.last_name}
                      </p>
                      <p className="text-[10px] text-orange-400 font-black tracking-widest uppercase">Verified Member</p>
                    </div>
                    <ShieldCheck className="ml-auto text-orange-500 w-6 h-6 shrink-0" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Plan Duration</Label>
                    <Select onValueChange={(v) => setNewSubscriber({...newSubscriber, plan: v})}>
                      <SelectTrigger className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold">
                        <CalendarDays className="w-4 h-4 mr-2 text-orange-500" />
                        <SelectValue placeholder="30 Days" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-none shadow-xl font-bold">
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="60">60 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Total Price</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="h-12 pl-11 rounded-2xl border-slate-100 bg-slate-50/50 font-black text-slate-800"
                        onChange={(e) => setNewSubscriber({...newSubscriber, price: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="ghost" className="flex-1 h-14 rounded-2xl font-bold text-slate-400 hover:text-slate-600" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-[2] h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black shadow-xl shadow-orange-100 transition-transform active:scale-95">
                    Activate Now
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}