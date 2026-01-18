import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Building2, LogOut, LayoutDashboard, ChevronRight, Info, UtensilsCrossed, Pizza, UserCircle, ScanQrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/user-hook";
import { UserProviderdata } from "@/hooks/Provider";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const token = localStorage.getItem("_user_Token__");
  const { user } = useCurrentUser();
  const { Providerdata } = UserProviderdata();
  
  const isLoggedIn = Boolean(token);
  const isProvider = Boolean(Providerdata);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("_user_Token__");
    queryClient.invalidateQueries({ queryKey: ["provider-data"] });
    queryClient.invalidateQueries({ queryKey: ["current_user"] });
       queryClient.clear();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "How It Works", path: "/how-it-works", icon: Info },
    { name: "Find Mess", path: "/mess", icon: UtensilsCrossed },
    { name: "Scan QR", path: "/scan-qr", icon: ScanQrCode },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ",
      scrolled 
        ? "bg-white/90 backdrop-blur-md py-3 shadow-lg border-orange-600" 
        : "bg-white py-2 border-orange-500"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          <Link to="/" className="md:w-[170px] w-[200px] md:h-fit">
            <img src="/logo.png" alt="logo" className="w-full h-auto" />
          </Link>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-5">
            
            {/* PILL NAVIGATION */}
            <div className="flex items-center bg-orange-50 p-1 rounded-full border border-orange-100 shadow-inner">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={cn(
                    "px-5 py-2 rounded-full text-xs font-extrabold transition-all duration-200",
                    location.pathname === link.path 
                      ? "bg-orange-600 text-white shadow-md scale-105" 
                      : "text-slate-600 hover:text-orange-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-8 w-[2px] bg-orange-100 mx-1" />

            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-white border border-slate-200 p-1 rounded-full shadow-sm">
                
                {/* ROLE-BASED BUTTONS */}
                {isProvider ? (
                  <Link to="/provider">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 h-10 text-xs font-black gap-2 shadow-orange-200 shadow-lg">
                      <LayoutDashboard className="w-4 h-4" />
                      DASHBOARD
                    </Button>
                  </Link>
                ) : (
                  <Link to="/profile">
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-10 text-xs font-black gap-2 shadow-lg">
                      <UserCircle className="w-4 h-4 text-orange-500" />
                      MY PROFILE
                    </Button>
                  </Link>
                )}

                <Link to={isProvider ? "/provider" : "/profile"}>
                  <Avatar className="w-10 h-10 border-2 border-orange-100 shadow-sm transition-transform hover:scale-105">
                    <AvatarImage src={isProvider ? Providerdata?.imageUrl : user?.imageUrl} />
                    <AvatarFallback className="bg-orange-100 text-orange-700 font-black text-[11px]">
                      {(isProvider ? Providerdata?.OwnerName?.[0] : user?.first_name?.[0]) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth?role=user">
                  <Button variant="ghost" className="text-xs font-black text-slate-700 hover:text-orange-600 uppercase">Login</Button>
                </Link>
                <Link to="/auth?role=provider">
                  <Button className="bg-slate-900 hover:bg-orange-600 text-white rounded-full px-6 h-10 text-xs font-black uppercase tracking-widest shadow-lg">
                    Provider Portal
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden p-2 rounded-xl border-2 border-orange-100 bg-orange-50 text-orange-600 shadow-sm" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[78px] bg-white border-b-4 border-orange-600 shadow-2xl p-6 space-y-6 animate-in slide-in-from-top duration-300 z-50">
             
             {isLoggedIn && (
               <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-3xl border border-orange-100">
                 <Avatar className="w-14 h-14 border-4 border-white shadow-md">
                   <AvatarImage src={isProvider ? Providerdata?.imageUrl : user?.imageUrl} />
                   <AvatarFallback className="bg-orange-600 text-white font-bold text-xl">
                      {(isProvider ? Providerdata?.OwnerName?.[0] : user?.first_name?.[0])}
                    </AvatarFallback>
                 </Avatar>
                 <div>
                   <p className="font-black text-slate-900 text-lg uppercase leading-none mb-1">
                     {isProvider ? Providerdata?.OwnerName : user?.first_name}
                   </p>
                   <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
                     {isProvider ? "Verified Provider" : "Customer Profile"}
                   </p>
                 </div>
               </div>
             )}

            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 p-4 font-black rounded-2xl transition-all",
                    location.pathname === link.path 
                      ? "bg-orange-600 text-white shadow-lg" 
                      : "bg-slate-50 text-slate-700"
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name.toUpperCase()}
                </Link>
              ))}
              
              {/* MOBILE ACTION BUTTON */}
              {isLoggedIn && (
                <Link 
                  to={isProvider ? "/provider" : "/profile"} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-5 font-black text-white bg-slate-900 rounded-2xl mt-4 shadow-xl"
                >
                  <span className="flex items-center gap-3">
                    {isProvider ? <LayoutDashboard className="w-5 h-5 text-orange-500" /> : <UserCircle className="w-5 h-5 text-orange-500" />}
                    {isProvider ? "GO TO DASHBOARD" : "VIEW MY PROFILE"}
                  </span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </Link>
              )}
            </div>

            {!isLoggedIn && (
              <div className="grid grid-cols-1 gap-3 mt-4">
                <Link to="/auth?role=user" onClick={() => setMobileMenuOpen(false)}><Button variant="outline" className="w-full h-14 rounded-2xl font-black border-2">USER LOGIN</Button></Link>
                <Link to="/auth?role=provider" onClick={() => setMobileMenuOpen(false)}><Button className="w-full h-14 bg-orange-600 text-white rounded-2xl font-black">PROVIDER LOGIN</Button></Link>
              </div>
            )}

            {isLoggedIn && (
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2 p-4 text-red-600 font-black border-t border-slate-100 pt-6 mt-2"
              >
                <LogOut className="w-5 h-5" /> LOGOUT
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}