import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";
import {
  ArrowLeft, Mail, Lock, Smartphone,
  ChevronRight, User, Building2
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

export default function HybridAuthPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserGoogle = async (data: string) => {
    const decoded = jwtDecode(data)
    console.log("userdata", decoded)
    setStep(2);
  };

  const handleProviderLogin = async (data) => {
    console.log(data)
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    navigate("/provider/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="flex p-1.5 bg-slate-200/50 backdrop-blur-md rounded-[24px] mb-8 border border-white">
          <button
            onClick={() => { setRole("user"); setStep(1); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[20px] text-sm font-black transition-all ${role === "user" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"
              }`}
          >
            <User className="w-4 h-4" /> Customer
          </button>
          <button
            onClick={() => setRole("provider")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[20px] text-sm font-black transition-all ${role === "provider" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
          >
            <Building2 className="w-4 h-4" /> Provider
          </button>
        </div>

        <Card className="border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[40px] bg-white overflow-hidden">
          <CardContent className="pt-12 pb-10 px-8">
            {role === "user" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col justify-center items-center">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Login</h1>
                  <p className="text-slate-400 font-medium mt-2">
                    {step === 1 ? "Quick access with Google" : "Complete your profile"}
                  </p>
                </div>

                {step === 1 ? (
                  <GoogleLogin width={250} shape="pill" theme="outline" onSuccess={(data) => handleUserGoogle(data.credential)} />
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); }} className="space-y-4">
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r pr-3">+91</div>
                      <Input
                        placeholder="Phone Number"
                        className="h-16 pl-20 rounded-3xl bg-slate-50 border-none font-bold text-lg"
                        autoFocus
                      />
                    </div>
                    <Button className="w-full h-16 bg-orange-600 hover:bg-orange-500 text-white rounded-3xl font-black text-lg shadow-lg shadow-orange-100">
                      Finish Setup
                    </Button>
                  </form>
                )}
              </div>
            )}
            {role === "provider" && (
              <form onSubmit={handleProviderLogin} className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Provider Portal</h1>
                  <p className="text-slate-400 font-medium mt-2">Manage your kitchen & menu</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Business Email</Label>
                  <div className="relative">
                    <Input className="h-14 pl-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-900 font-bold" placeholder="kitchen@example.com" />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</Label>
                  <div className="relative">
                    <Input type="password" className="h-14 pl-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-900 font-bold" placeholder="••••••••" />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  </div>
                </div>

                <Button className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-lg transition-all">
                  {isLoading ? "Verifying..." : "Provider Login"}
                </Button>

                <div className="text-center">
                  <button type="button" className="text-sm font-bold text-orange-600">Forgot Kitchen Password?</button>
                </div>
              </form>
            )}

          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs text-slate-400 font-medium italic">
          Secure encrypted login for <span className="text-orange-500 text-xl font-bold">Khanaval.com</span> {role === "provider" ? "Partners" : "Customers"}
        </p>
      </div>
    </div>
  );
}