import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { graphqlClient } from "../../api_server/api_end_point";
import { Mail, Lock, User, Building2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { VERIFIED_USER_GOOGLE, VERIFIED_USER_GOOGLE_LOGIN } from "@/graphql/user";

export default function HybridAuthPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [userMode, setUserMode] = useState<"login" | "signup">("signup");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [googleToken, setGoogleToken] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  /* ---------------- GOOGLE SUCCESS ---------------- */

  const handleGoogleSuccess = async (credential: string) => {
    if (!credential) return;

    setGoogleToken(credential);

    // LOGIN → no phone step
    if (userMode === "login") {
      await handleUserLogin(credential);
      return;
    }

    // SIGNUP → phone number step
    setStep(2);
  };

  /* ---------------- USER LOGIN ---------------- */

  const handleUserLogin = async (token: string) => {
    setIsLoading(true);
    const { verifiedgoodtokenandnumberforSignin } =
      await graphqlClient.request(VERIFIED_USER_GOOGLE_LOGIN, {
        token: token
      });
    if (verifiedgoodtokenandnumberforSignin.success) {
      localStorage.setItem(
        "_user_Token__",
        verifiedgoodtokenandnumberforSignin.token
      );
      toast({ title: "Login successful" });
      navigate("/");
      setIsLoading(false);
    } else {
      toast({ title: verifiedgoodtokenandnumberforSignin.message });
      setUserMode("signup")
      setIsLoading(false);
    }

  };

  /* ---------------- USER SIGNUP ---------------- */

  const handleFinalUserSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("userdata", googleToken)
    if (phoneNumber.length < 10) {
      toast({ title: "Please enter a valid phone number" });
      return;
    }
    setIsLoading(true);
    const { verifiedgoodtokenandnumberforSignup } =
      await graphqlClient.request(VERIFIED_USER_GOOGLE, {
        payload: {
          number: phoneNumber,
          token: googleToken
        }
      });

    if (verifiedgoodtokenandnumberforSignup.success) {
      localStorage.setItem(
        "_user_Token__",
        verifiedgoodtokenandnumberforSignup.token
      );
      toast({ title: "Signup successful" });
      navigate("/");
      setIsLoading(false);

    } else {
      toast({ title: verifiedgoodtokenandnumberforSignup.message });
      setUserMode("login")
      setStep(1);
      setIsLoading(false);
    }

  };

  /* ---------------- PROVIDER (UNCHANGED) ---------------- */

  const handleProviderLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    navigate("/provider/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">

        {/* TOGGLE HEADER */}
        <div className="flex p-1.5 bg-slate-200/50 backdrop-blur-md rounded-[24px] mb-8 border border-white">
          <button
            onClick={() => {
              setRole("user");
              setUserMode("signup");
              setStep(1);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[20px] text-sm font-black transition-all ${role === "user"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-slate-500"
              }`}
          >
            <User className="w-4 h-4" /> Customer
          </button>

          <button
            onClick={() => setRole("provider")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[20px] text-sm font-black transition-all ${role === "provider"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500"
              }`}
          >
            <Building2 className="w-4 h-4" /> Provider
          </button>
        </div>

        <Card className="border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[40px] bg-white overflow-hidden">
          <CardContent className="pt-12 pb-10 px-8">

            {/* USER SYSTEM */}
            {role === "user" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col justify-center items-center">

                {/* LOGIN / SIGNUP SWITCH */}
                <div className="flex gap-4 mb-6">
                  <Button
                    variant={userMode === "signup" ? "default" : "outline"}
                    onClick={() => {
                      setUserMode("signup");
                      setStep(1);
                    }}
                  >
                    Signup
                  </Button>
                  <Button
                    variant={userMode === "login" ? "default" : "outline"}
                    onClick={() => {
                      setUserMode("login");
                      setStep(1);
                    }}
                  >
                    Login
                  </Button>
                </div>

                <div className="text-center mb-10">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    {userMode === "signup" ? "Create Account" : "Welcome Back"}
                  </h1>
                  <p className="text-slate-400 font-medium mt-2">
                    {step === 1
                      ? "Continue with Google"
                      : "One last step!"}
                  </p>
                </div>

                {step === 1 && (
                  <GoogleLogin
                    width="250"
                    shape="pill"
                    theme="outline"
                    onSuccess={(res) =>
                      handleGoogleSuccess(res.credential || "")
                    }
                  />
                )}

                {step === 2 && userMode === "signup" && (
                  <form
                    onSubmit={handleFinalUserSignup}
                    className="space-y-4 w-full"
                  >
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r pr-3">
                        +91
                      </div>
                      <Input
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="h-16 pl-20 rounded-3xl bg-slate-50 border-none font-bold text-lg w-full"
                        autoFocus
                        type="tel"
                      />
                    </div>

                    <Button

                      className="w-full h-16 bg-orange-600 hover:bg-orange-500 text-white rounded-3xl font-black text-lg shadow-lg shadow-orange-100"
                    >
                      {isLoading ? "Finalizing..." : "Finish Setup"}
                    </Button>
                  </form>
                )}
              </div>
            )}

            {/* PROVIDER SYSTEM (UNCHANGED) */}
            {role === "provider" && (
              <form
                onSubmit={handleProviderLogin}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5"
              >
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Provider Portal
                  </h1>
                  <p className="text-slate-400 font-medium mt-2">
                    Manage your kitchen & menu
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Business Email
                  </Label>
                  <div className="relative">
                    <Input className="h-14 pl-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-900 font-bold" />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      className="h-14 pl-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-900 font-bold"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  </div>
                </div>

                <Button className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-lg transition-all">
                  {isLoading ? "Verifying..." : "Provider Login"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs text-slate-400 font-medium italic">
          Secure encrypted login for{" "}
          <span className="text-orange-500 text-xl font-bold">
            Khanaval.com
          </span>{" "}
          {role === "provider" ? "Partners" : "Customers"}
        </p>
      </div>
    </div>
  );
}
