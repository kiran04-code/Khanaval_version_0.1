import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus, Loader2, Phone, Search,
  Calendar, Clock, AlertCircle, Trash2, History, ShieldCheck, Utensils
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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
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

  const formatDate = (val) => {
    if (!val) return "N/A";
    const date = new Date(Number(val));
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatScanTime = (val) => {
    if (!val) return "N/A";
    const date = new Date(Number(val));
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, day: '2-digit', month: 'short' });
  };

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      const user = sub.userId || {};
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const number = String(user.number || "").toLowerCase();
      return fullName.includes(searchQuery.toLowerCase()) || number.includes(searchQuery.toLowerCase());
    });
  }, [subscribers, searchQuery]);

  const handleDeleteSub = async () => {
    if (!subId) return;
    setIsSubmitting(true);
    try {
      const { data } = await axioseInstace.post(`/api/subscriptions/remove`, { 
        sub: subId, 
        userId: subuserId 
      });
      if (data.success) {
        toast({ title: "Removed", description: "Subscriber removed." });
        setIsDeleteModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

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
        setStep(1);
        setVerifiedUser(null);
        setNewSubscriber({ phone: "", plan: "30", price: "" });
        queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 px-4 md:px-0 mt-6">
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-900 uppercase">Students List</h2>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-orange-600 rounded-xl font-bold h-10 px-4">
                <UserPlus className="w-4 h-4 mr-2" /> ADD
            </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student..."
            className="h-12 pl-10 rounded-xl bg-slate-50 border-none font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSubscribers.map((sub, i) => {
          // Calculation based on image data
          const totalScans = sub?.allScans?.length || 0; 
          const rawPercentage = (sub.RemainingDay / sub.totalDays) * 100;
          const percentage = Math.round(Math.max(0, Math.min(100, rawPercentage)));

          return (
            <Card key={i} className="border-none shadow-md rounded-[1.5rem] bg-white overflow-hidden p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-6">
                
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <svg className="w-14 h-14 transform -rotate-90">
                      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                      <circle 
                        cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" 
                        strokeDasharray={150.8} strokeDashoffset={150.8 - (150.8 * percentage) / 100}
                        className={`${sub.RemainingDay <= 5 ? 'text-red-500' : 'text-orange-500'} transition-all duration-700`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black">{percentage}%</div>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-black text-slate-900 uppercase truncate">{sub.userId?.first_name} {sub.userId?.last_name}</h3>
                    <div className="flex flex-col text-[11px] font-bold text-slate-400">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {sub.userId?.number}</span>
                      <span className="flex items-center gap-1 text-emerald-600"><Calendar className="w-3 h-3"/> {formatDate(sub.startAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 md:flex items-center gap-2 md:gap-8 bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-2xl">
                  <div className="text-center">
                    <p className="text-lg font-black text-orange-600 leading-none">{totalScans}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Scans</p>
                  </div>
                  <div className="text-center border-x md:border-none border-slate-200">
                    <p className={`text-lg font-black leading-none ${sub.RemainingDay < 5 ? 'text-red-500' : 'text-slate-900'}`}>{sub.RemainingDay}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Days Left</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-slate-900 leading-none">₹{sub.price}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Paid</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-none pt-4 md:pt-0">
                    <Badge className={`${sub.RemainingDay > 0 ? 'bg-emerald-500' : 'bg-red-500'} text-white font-black text-[10px] px-3 border-none`}>
                        {sub.RemainingDay > 0 ? 'ACTIVE' : 'EXPIRED'}
                    </Badge>
                    
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => { setSelectedSub(sub); setIsHistoryModalOpen(true); }}
                            className="rounded-xl border-slate-200 text-slate-600 hover:bg-orange-50"
                        >
                            <History className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                            size="icon" 
                            onClick={() => { 
                                setSelectedSub(sub); 
                                setIsDeleteModalOpen(true); 
                                setSubuserId(sub?.userId?._id || sub?.userId?.id); 
                                setSubId(sub?._id || sub?.id); 
                            }}
                            className="rounded-xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition-all shadow-none border-none"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
        <DialogContent className="w-[95%] max-w-[420px] p-0 overflow-hidden rounded-[2rem] border-none bg-white">
          <div className="bg-orange-600 p-6 text-white">
            <DialogTitle className="text-xl font-black uppercase">Scan Logs</DialogTitle>
            <p className="text-orange-100 text-[10px] font-bold uppercase mt-1">Total Verified Meals: {selectedSub?.allScans?.length || 0}</p>
          </div>
          <div className="p-4 max-h-[350px] overflow-y-auto space-y-2">
            {selectedSub?.allScans?.length > 0 ? (
                [...selectedSub.allScans].reverse().map((scan, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <div>
                                <p className="text-[11px] font-black text-slate-900">Verified Meal</p>
                                <p className="text-[10px] font-bold text-slate-400">{formatScanTime(scan.scannedAt)}</p>
                            </div>
                        </div>
                        <Badge variant="outline" className="text-[8px] border-emerald-200 text-emerald-600 font-bold">SUCCESS</Badge>
                    </div>
                ))
            ) : (
                <p className="text-center py-10 text-slate-400 font-bold text-sm">No activity recorded.</p>
            )}
          </div>
          <div className="p-4 border-t">
            <Button onClick={() => setIsHistoryModalOpen(false)} className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold">CLOSE</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="w-[90%] max-w-[400px] rounded-[2rem] p-6 border-none">
          <div className="text-center space-y-4 pt-4">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-black text-center">Delete Subscription?</DialogTitle>
              <DialogDescription className="text-center font-bold">
                This will permanently remove the record for {selectedSub?.userId?.first_name}.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-4">
              <Button variant="ghost" className="flex-1 rounded-xl font-bold h-12" onClick={() => setIsDeleteModalOpen(false)}>CANCEL</Button>
              <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold h-12" onClick={handleDeleteSub} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : "DELETE"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddModalOpen} onOpenChange={(val) => { setIsAddModalOpen(val); if (!val) setStep(1); }}>
        <DialogContent className="w-[95%] max-w-[420px] p-0 overflow-hidden rounded-[2.5rem] border-none bg-white">
          <div className="bg-slate-900 p-6 text-white">
            <DialogTitle className="text-xl font-black">Register Student</DialogTitle>
          </div>
          <div className="p-6 space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Phone Number</Label>
                  <Input type="tel" placeholder="Mobile Number" className="h-14 rounded-xl bg-slate-50 border-none font-black text-lg px-4" value={newSubscriber.phone} onChange={(e) => setNewSubscriber({ ...newSubscriber, phone: e.target.value })} />
                </div>
                <Button className="w-full h-14 bg-orange-600 rounded-xl font-black text-white" onClick={handleCheckUser} disabled={isValidating}>
                  {isValidating ? <Loader2 className="animate-spin" /> : "CONTINUE"}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-xl text-white font-black text-sm uppercase flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-lg">{verifiedUser?.first_name?.[0]}</div>
                    {verifiedUser?.first_name} {verifiedUser?.last_name}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black text-slate-400 uppercase">Plan</Label>
                    <Select onValueChange={(v) => setNewSubscriber({ ...newSubscriber, plan: v })}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-black"><SelectValue placeholder="30 Days" /></SelectTrigger>
                        <SelectContent><SelectItem value="30">30 Days</SelectItem><SelectItem value="60">60 Days</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black text-slate-400 uppercase">Price</Label>
                    <Input type="number" className="h-12 rounded-xl bg-slate-50 border-none font-black" placeholder="Amount" onChange={(e) => setNewSubscriber({ ...newSubscriber, price: e.target.value })} />
                  </div>
                </div>
                <Button className="w-full h-14 bg-orange-600 rounded-xl font-black text-white" onClick={handleFinalSubmit} disabled={isSubmitting}>COMPLETE REGISTRATION</Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}