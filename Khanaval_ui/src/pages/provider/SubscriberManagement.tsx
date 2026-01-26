import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus, Loader2, Phone, Search,
  IndianRupee, Calendar, Clock, AlertCircle, Mail, X, Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStateContex } from "@/context/State";
import { Getmymess } from "@/hooks/PorviderMess";
import { useQueryClient } from "@tanstack/react-query";

export default function SubscriberManagement() {
  const { axioseInstace } = useStateContex();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { messdata } = Getmymess();

  // State Management
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [newSubscriber, setNewSubscriber] = useState({ phone: "", plan: "30", price: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [subuserId, setSubuserId] = useState("");
  const [subId, setSubId] = useState("");

  const subscribers = messdata?.myAllSubscribers || [];

  // --- NEW: DATE FORMATTER FOR TIMESTAMP 1769382770327 ---
  const formatDate = (val) => {
    if (!val) return "N/A";
    const date = new Date(isNaN(val) ? val : Number(val));
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Search Logic
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      const user = sub.userId || {};
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const number = String(user.number || "").toLowerCase();
      const email = String(user.email || "").toLowerCase();
      return fullName.includes(searchQuery.toLowerCase()) ||
        number.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase());
    });
  }, [subscribers, searchQuery]);

  // Handlers
  const handleCheckUser = async () => {
    if (!newSubscriber.phone) return;
    setIsValidating(true);
    try {
      const { data } = await axioseInstace.post("/api/users/verify", { number: newSubscriber.phone });
      if (data.success) {
        setVerifiedUser(data.userData);
        setStep(2);
      } else {
        toast({ title: `${data.message}`, variant:"destructive" });
      }
    } catch (error) {
      toast({ title: "Verification Failed", variant: "destructive" });
    } finally { setIsValidating(false); }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        userId: verifiedUser._id,
        messId: messdata.id,
        totalDays: Number(newSubscriber.plan),
        price: Number(newSubscriber.price),
      };
      const { data } = await axioseInstace.post("/api/subscriptions/add", payload);
      if (data.success) {
        toast({ title: "Success", description: "Subscriber Added!" });
        setIsAddModalOpen(false);
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      } else {
        toast({ title: `${data.message}`, description: "Subscriber Added!" });
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  const handleDeleteSub = async () => {
    if (!selectedSub) return;
    setIsSubmitting(true);
    try {
      const { data } = await axioseInstace.post(`/api/subscriptions/remove`, {
        sub: subId,
        userId: subuserId
      });
      if (data.success) {
        toast({ title: "Removed", description: "Student removed from register." });
        setIsDeleteModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      }
    } catch (error) {
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally { setIsSubmitting(false); setSelectedSub(null); }
  };

  const resetForm = () => {
    setStep(1);
    setVerifiedUser(null);
    setNewSubscriber({ phone: "", plan: "30", price: "" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 md:space-y-6 pb-24 px-2 md:px-0">

      {/* 1. HEADER & SEARCH */}
      <div className="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Digital Register</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              {filteredSubscribers.length} Records Active
            </p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-orange-600 hover:bg-orange-700 h-14 md:h-12 rounded-2xl font-black px-8 w-full md:w-auto">
            <UserPlus className="mr-2 w-5 h-5" /> ADD STUDENT
          </Button>
        </div>

        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone or email..."
            className="h-14 md:h-16 pl-14 pr-12 rounded-[1.5rem] bg-slate-50 border-none font-bold text-slate-700 focus-visible:ring-2 focus-visible:ring-orange-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-5 top-1/2 -translate-y-1/2 p-1 bg-slate-200 rounded-full">
              <X className="w-3 h-3 text-slate-600" />
            </button>
          )}
        </div>
      </div>

      {/* 2. SUBSCRIBER LIST */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSubscribers.map((sub, i) => {
          const percentage = Math.max(0, Math.min(100, (sub.RemainingDay / sub.totalDays) * 100));
          return (
            <Card key={i} className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden group">
              <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">

                {/* Profile Section */}
                <div className="flex items-center gap-5">
                  <div className="relative flex-shrink-0">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-50" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent"
                        strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * percentage) / 100}
                        className={`${sub.RemainingDay <= 5 ? 'text-red-500' : 'text-orange-500'} transition-all duration-700`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[11px] font-black">{Math.round(percentage)}%</div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">
                      {sub.userId?.first_name} {sub.userId?.last_name}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3" />
                        <span className="text-[11px] font-bold">{sub.userId?.number}</span>
                      </div>
                      {/* --- UPDATED: Showing the Accurate Date --- */}
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[11px] font-black uppercase">{formatDate(sub.startAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3" />
                        <span className="text-[11px] font-bold truncate max-w-[100px]">{sub.userId?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-10 border-t md:border-none pt-4 md:pt-0">
                  <div className="text-right">
                    <p className={`text-3xl font-black leading-none ${sub.RemainingDay <= 5 ? 'text-red-500 animate-pulse' : 'text-slate-900'}`}>{sub.RemainingDay}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Days Left</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <Badge className={`${sub.RemainingDay > 0 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'} border-none font-black text-[10px] px-4 py-1.5 rounded-full`}>
                      {sub.RemainingDay > 0 ? 'ACTIVE' : 'EXPIRED'}
                    </Badge>
                    <p className="text-[10px] font-bold text-slate-300 mt-1">₹{sub.price}</p>
                  </div>

                  <button
                    onClick={() => { setSelectedSub(sub); setIsDeleteModalOpen(true); setSubuserId(sub?.userId?.id); setSubId(sub?.id) }}
                    className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 3. DELETE CONFIRMATION DIALOG */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="w-[90%] max-w-[400px] rounded-[2.5rem] p-8 border-none">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-center">Remove Student?</DialogTitle>
              <DialogDescription className="text-center font-bold text-slate-500">
                Are you sure you want to remove <span className="text-slate-900">{selectedSub?.userId?.first_name}</span>? This will stop their meal plan immediately.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 pt-4">
              <Button variant="ghost" className="flex-1 h-14 rounded-2xl font-black text-slate-400" onClick={() => setIsDeleteModalOpen(false)}>CANCEL</Button>
              <Button className="flex-1 h-14 bg-red-500 hover:bg-red-600 rounded-2xl font-black" onClick={handleDeleteSub} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : "YES, REMOVE"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 4. ADD MODAL */}
      <Dialog open={isAddModalOpen} onOpenChange={(val) => { setIsAddModalOpen(val); if (!val) resetForm(); }}>
        <DialogContent className="w-[95%] max-w-[420px] p-0 overflow-hidden rounded-[3rem] border-none shadow-2xl bg-white">
          <div className="bg-slate-900 p-8 text-white">
            <DialogTitle className="text-2xl font-black">Register Student</DialogTitle>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Step {step} of 2</p>
          </div>
          <div className="p-8 space-y-6">
            {step === 1 ? (
              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Student Phone</Label>
                <Input type="tel" placeholder="Enter number" className="h-16 rounded-[1.25rem] bg-slate-50 border-none font-black text-xl px-6" value={newSubscriber.phone} onChange={(e) => setNewSubscriber({ ...newSubscriber, phone: e.target.value })} />
                <Button className="w-full h-16 bg-orange-600 hover:bg-orange-700 rounded-[1.25rem] font-black text-lg" onClick={handleCheckUser} disabled={isValidating}>
                  {isValidating ? <Loader2 className="animate-spin" /> : "VERIFY USER"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-slate-900 rounded-[1.25rem] flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center font-black text-xl">{verifiedUser?.first_name?.[0]}</div>
                  <div><p className="font-black uppercase leading-tight">{verifiedUser?.first_name} {verifiedUser?.last_name}</p><p className="text-[10px] text-orange-400 font-bold">READY TO ADD</p></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400">PLAN</Label>
                    <Select onValueChange={(v) => setNewSubscriber({ ...newSubscriber, plan: v })}>
                      <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-black"><SelectValue placeholder="30 Days" /></SelectTrigger>
                      <SelectContent className="rounded-2xl"><SelectItem value="30">30 Days</SelectItem><SelectItem value="60">60 Days</SelectItem><SelectItem value="90">90 Days</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400">PRICE (₹)</Label>
                    <Input type="number" className="h-14 rounded-2xl bg-slate-50 border-none font-black" placeholder="2000" onChange={(e) => setNewSubscriber({ ...newSubscriber, price: e.target.value })} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" className="flex-1 h-14 rounded-2xl font-black text-slate-400" onClick={() => setStep(1)}>BACK</Button>
                  <Button className="flex-[2] h-14 bg-orange-600 hover:bg-orange-700 rounded-2xl font-black" onClick={handleFinalSubmit} disabled={isSubmitting}>FINISH</Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 