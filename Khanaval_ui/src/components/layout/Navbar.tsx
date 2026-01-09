import { Link } from "react-router-dom";
import { Menu, X, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto ">
       <div className="flex items-center justify-between h-[80px]">
          <Link to="/" className="md:w-[230px] w-[200px] md:h-fit ">
                  <img src="/logo.png" alt="logo of khanaval.com" className="" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link to="/mess" className="text-muted-foreground hover:text-foreground transition-colors">
              Find Mess
            </Link>
            <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
              profile
            </Link>
            <Link to="/tiffin" className="text-muted-foreground hover:text-foreground transition-colors">
              Order Tiffin
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
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
          </div>

          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div> 
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-3">
              <Link
                to="/how-it-works"
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/mess"
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Mess
              </Link>
              <Link
                to="/tiffin"
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Order Tiffin
              </Link>
              <div className="border-t border-border pt-3 mt-1 flex flex-col gap-2">
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
