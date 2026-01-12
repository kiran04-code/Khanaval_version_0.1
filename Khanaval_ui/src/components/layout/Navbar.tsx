import { Link } from "react-router-dom";
import { Menu, X, User, Building2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/user-hook";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("_user_Token__");
  const {user} = useCurrentUser()
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("_user_Token__");

  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-[80px]">
          <Link to="/" className="md:w-[230px] w-[200px]">
            <img src="/logo.png" alt="logo of khanaval.com" />
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link to="/mess" className="text-muted-foreground hover:text-foreground">
              Find Mess
            </Link>
            <Link to="/tiffin" className="text-muted-foreground hover:text-foreground">
              Order Tiffin
            </Link>
          </div>

          {/* DESKTOP AUTH / PROFILE */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/profile">
                  <Avatar className="w-10 h-10 ring-2 ring-orange-500/30 cursor-pointer">
                    <AvatarImage src={user.imageUrl || ""} />
                    <AvatarFallback>
                      {user.first_name?.[0] ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth?role=user">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    User Login
                  </Button>
                </Link>
                <Link to="/auth?role=provider">
                  <Button variant="outline" size="sm">
                    <Building2 className="w-4 h-4 mr-2" />
                    Provider Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">

            {/* MOBILE PROFILE */}
            {isLoggedIn && (
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.imageUrl || ""} />
                 
                </Avatar>
                <div>
                  <p className="font-semibold">{user.first_name} {user.last_name}</p>
                  <p className="text-xs text-muted-foreground">View profile</p>
                </div>
              </Link>
            )}

            <div className="flex flex-col gap-2 px-2">
              <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-lg hover:bg-muted">
                How It Works
              </Link>
              <Link to="/mess" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-lg hover:bg-muted">
                Find Mess
              </Link>
              <Link to="/tiffin" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-lg hover:bg-muted">
                Order Tiffin
              </Link>
            </div>

            {/* MOBILE AUTH BUTTONS */}
            {!isLoggedIn && (
              <div className="border-t border-border mt-3 pt-3 px-2 space-y-2">
                <Link to="/auth?role=user" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    User Login
                  </Button>
                </Link>
                <Link to="/auth?role=provider" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <Building2 className="w-4 h-4 mr-2" />
                    Provider Login
                  </Button>
                </Link>
              </div>
            )}

            {/* MOBILE LOGOUT */}
            {isLoggedIn && (
              <div className="border-t border-border mt-3 pt-3 px-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
