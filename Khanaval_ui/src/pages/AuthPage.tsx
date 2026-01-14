import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { graphqlClient } from "../../api_server/api_end_point";
import { User, Building2, Phone, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import {
  VERIFIED_USER_GOOGLE,
  VERIFIED_USER_GOOGLE_LOGIN,
} from "@/graphql/user";

export default function HybridAuthPage() {
  const navigate = useNavigate();

  /* ---------------- COMMON ---------------- */
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- USER ---------------- */
  const [userMode, setUserMode] = useState<"login" | "signup">("signup");
  const [step, setStep] = useState(1);
  const [googleToken, setGoogleToken] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  /* ---------------- PROVIDER ---------------- */
  const [providerMode, setProviderMode] = useState<"login" | "signup">("login");
  const [providerStep, setProviderStep] = useState(1);
  const [providerName, setProviderName] = useState("");
  const [providerNumber, setProviderNumber] = useState("");
  const [providerOtp, setProviderOtp] = useState("");

  /* ---------------- USER GOOGLE SUCCESS ---------------- */
  const handleGoogleSuccess = async (credential: string) => {
    if (!credential) return;
    setGoogleToken(credential);

    if (userMode === "login") {
      await handleUserLogin(credential);
      return;
    }
    setStep(2);
  };

  /* ---------------- USER LOGIN ---------------- */
  const handleUserLogin = async (token: string) => {
    setIsLoading(true);
    try {
      const { verifiedgoodtokenandnumberforSignin } =
        await graphqlClient.request(VERIFIED_USER_GOOGLE_LOGIN, {
          token,
        });

      if (verifiedgoodtokenandnumberforSignin.success) {
        localStorage.setItem("_user_Token__", verifiedgoodtokenandnumberforSignin.token);
        toast({ title: "Login successful" });
        navigate("/");
      } else {
        toast({ title: verifiedgoodtokenandnumberforSignin.message });
        setUserMode("signup");
      }
    } catch (err) {
      toast({ title: "Login failed", variant: "destructive" });
    }
    setIsLoading(false);
  };

  /* ---------------- USER SIGNUP ---------------- */
  const handleFinalUserSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      toast({ title: "Invalid phone number" });
      return;
    }

    setIsLoading(true);
    try {
      const { verifiedgoodtokenandnumberforSignup } =
        await graphqlClient.request(VERIFIED_USER_GOOGLE, {
          payload: { number: phoneNumber, token: googleToken },
        });

      if (verifiedgoodtokenandnumberforSignup.success) {
        localStorage.setItem("_user_Token__", verifiedgoodtokenandnumberforSignup.token);
        toast({ title: "Signup successful" });
        navigate("/");
      } else {
        toast({ title: verifiedgoodtokenandnumberforSignup.message });
        setUserMode("login");
        setStep(1);
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Business emails are not allowed",
      });
    }
    setIsLoading(false);
  };

  /* ---------------- PROVIDER HANDLERS ---------------- */
  const handleProviderDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (providerNumber.length < 10) {
      toast({ title: "Enter valid phone number" });
      return;
    }
    setProviderStep(2);
  };

  const handleProviderOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (providerOtp.length !== 4) {
      toast({ title: "Enter 4 digit OTP" });
      return;
    }
    toast({ title: providerMode === "signup" ? "Signup Successful" : "Login Successful" });
    navigate("/provider/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-[460px] space-y-6">
        
        {/* HEADER SECTION */}
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="text-slate-500 font-medium">Please select your account type</p>
        </div>

        {/* ROLE TOGGLE */}
        <div className="flex p-1.5 bg-slate-200/60 backdrop-blur-md rounded-2xl mb-8 border border-white/50 shadow-inner">
          <button
            onClick={() => { setRole("user"); setUserMode("signup"); setStep(1); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              role === "user" ? "bg-white text-orange-600 shadow-md scale-[1.02]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <User className="w-4 h-4" /> Customer
          </button>
          <button
            onClick={() => { setRole("provider"); setProviderStep(1); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              role === "provider" ? "bg-white text-slate-900 shadow-md scale-[1.02]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Building2 className="w-4 h-4" /> Provider
          </button>
        </div>

        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[32px] bg-white overflow-hidden">
          <CardContent className="pt-10 pb-10 px-10">
            
            {/* SUB-MODE TOGGLE (LOGIN/SIGNUP) */}
            <div className="flex justify-center mb-8">
               <div className="inline-flex bg-slate-100 p-1 rounded-full">
                  <button 
                    onClick={() => role === "user" ? (setUserMode("signup"), setStep(1)) : (setProviderMode("signup"), setProviderStep(1))}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                      (role === "user" ? userMode === "signup" : providerMode === "signup") 
                      ? "bg-white shadow-sm text-slate-900" : "text-slate-400"
                    }`}
                  >SIGNUP</button>
                  <button 
                    onClick={() => role === "user" ? (setUserMode("login"), setStep(1)) : (setProviderMode("login"), setProviderStep(1))}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                      (role === "user" ? userMode === "login" : providerMode === "login") 
                      ? "bg-white shadow-sm text-slate-900" : "text-slate-400"
                    }`}
                  >LOGIN</button>
               </div>
            </div>

            {/* ---------------- USER FLOW ---------------- */}
            {role === "user" && (
              <div className="flex flex-col items-center">
                {step === 1 && (
                  <div className="w-full space-y-6 text-center animate-in fade-in zoom-in duration-300">
                    <div className="p-4 bg-orange-50 rounded-2xl inline-block mb-2">
                      <Mail className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Sign in with Google</h2>
                      <p className="text-sm text-slate-500 mt-1">Faster and more secure access</p>
                    </div>
                    <div className="flex justify-center py-4">
                      <GoogleLogin
                        width="220"
                        shape="pill"
                        onSuccess={(res) => handleGoogleSuccess(res.credential || "")}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && userMode === "signup" && (
                  <form onSubmit={handleFinalUserSignup} className="w-full space-y-5 animate-in slide-in-from-right duration-300">
                    <div className="space-y-2 text-center mb-4">
                      <h2 className="text-xl font-bold text-slate-900">One last thing</h2>
                      <p className="text-sm text-slate-500">We need your number to keep you updated</p>
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                      <Input
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="h-14 pl-12 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-orange-500/20 font-semibold"
                      />
                    </div>
                    <Button disabled={isLoading} className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 transition-all flex gap-2">
                      {isLoading ? "Processing..." : "Finish Setup"} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                )}
              </div>
            )}

            {/* ---------------- PROVIDER FLOW ---------------- */}
            {role === "provider" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {providerStep === 1 && (
                  <form onSubmit={handleProviderDetailsSubmit} className="space-y-5">
                    {providerMode === "signup" && (
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                        <Input
                          placeholder="Provider Name"
                          value={providerName}
                          onChange={(e) => setProviderName(e.target.value)}
                          className="h-14 pl-12 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white font-semibold"
                        />
                      </div>
                    )}
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                      <Input
                        placeholder="Phone Number"
                        value={providerNumber}
                        onChange={(e) => setProviderNumber(e.target.value)}
                        className="h-14 pl-12 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white font-semibold"
                      />
                    </div>
                    <Button className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-xl transition-all">
                      Send OTP
                    </Button>
                  </form>
                )}

                {providerStep === 2 && (
                  <form onSubmit={handleProviderOtpVerify} className="space-y-6 text-center animate-in zoom-in duration-300">
                    <div className="p-4 bg-slate-100 rounded-2xl inline-block mb-2">
                      <ShieldCheck className="w-8 h-8 text-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold">Verify Identity</h2>
                      <p className="text-sm text-slate-500">Enter the 4-digit code sent to your phone</p>
                    </div>
                    <Input
                      placeholder="0 0 0 0"
                      value={providerOtp}
                      maxLength={4}
                      onChange={(e) => setProviderOtp(e.target.value)}
                      className="h-16 rounded-2xl bg-slate-50 border-slate-200 font-black text-center text-2xl tracking-[1em] focus:bg-white"
                    />
                    <Button className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-xl">
                      Verify & Continue
                    </Button>
                  </form>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-slate-400 font-medium px-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}