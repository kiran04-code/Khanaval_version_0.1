import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"; // Optional: lucide-react icons

const Footer = () => {
  return (
    <footer className="bg-slate-50/50 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="Khanaval Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Connecting you with authentic local mess services and home-cooked tiffins. 
              Taste the tradition, delivered to your doorstep.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Mail size={18} />} href="#" />
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterColumn title="Quick Links">
              <FooterLink to="/mess">Find Mess</FooterLink>
              <FooterLink to="/tiffin">Order Tiffin</FooterLink>
              <FooterLink to="/how-it-works">How It Works</FooterLink>
            </FooterColumn>

            <FooterColumn title="For Providers">
              <FooterLink to="/auth?role=provider">List Your Mess</FooterLink>
              <FooterLink to="/auth?role=provider">Start Tiffin Service</FooterLink>
              <FooterLink to="/provider">Provider Dashboard</FooterLink>
            </FooterColumn>

            <FooterColumn title="Support">
              <FooterLink to="/help">Help Center</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Khanaval. Made with ❤️ in India.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children }) => (
  <div className="space-y-4">
    <h4 className="font-bold text-foreground tracking-tight">{title}</h4>
    <ul className="space-y-2 text-sm">{children}</ul>
  </div>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
  >
    {icon}
  </a>
);

export default Footer;