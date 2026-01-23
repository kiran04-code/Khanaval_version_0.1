  import { Link } from "react-router-dom";
  import { Instagram, Mail, MessageSquare, Phone, Linkedin, Heart } from "lucide-react";

  const Footer = () => {
    return (
      <footer className="bg-white text-slate-900 pt-20 pb-6 border-t border-slate-100">
        <div className="container mx-auto px-6">
          
          {/* Top Section: Links & Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Contact info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Direct Support</p>
                <a href="tel:8788113738" className="flex items-center gap-3 text-2xl font-black text-slate-900 hover:text-primary transition-colors">
                  878 811 3738
                </a>
              </div>
              <p className="text-sm leading-relaxed max-w-xs text-slate-500 font-medium">
                Connecting you with authentic local mess services and home-cooked tiffins.
              </p>
              <div className="flex gap-3">
                <SocialIcon icon={<Instagram size={18} />} href="#" />
                <SocialIcon icon={<Linkedin size={18} />} href="#" />
                <SocialIcon icon={<Mail size={18} />} href="#" />
              </div>
            </div>

            {/* Links grid */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
              <FooterColumn title="Navigation">
                <FooterLink to="/mess">Find Mess</FooterLink>
                <FooterLink to="/how-it-works">How It Works</FooterLink>
              </FooterColumn>

              <FooterColumn title="Providers">
                <FooterLink to="/auth?role=provider">List Your Mess</FooterLink>
                <FooterLink to="/auth">Dashboard</FooterLink>
                <FooterLink to="/HelpSupport">Support Center</FooterLink>
              </FooterColumn>

              <div className="space-y-6">
                <h4 className="font-bold uppercase tracking-widest text-[11px] text-slate-400">Feedback</h4>
               
                 <FooterLink to="/FeedBack">Support Center</FooterLink>
              </div>
            </div>
          </div>

          {/* Massive Image Logo Section */}
          <div className="border-t border-slate-100 flex flex-col ">
              <div className="w-full max-w-[800px] flex justify-center ">
                  <img 
                      src="/logo.png" 
                      alt="Khanaval Large Logo" 
                      className="w-full h-auto  object-contain select-none opacity-90 hover:opacity-100 transition-opacity duration-500"
                  />
              </div>
          </div>

          {/* Bottom Bar: Clean & Minimal */}
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <p>© 2026 KHANAVAL</p>
              <div className="hidden md:flex items-center gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span>Available for Hire</span>
              </div>
            </div>
            
            <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <span className="text-slate-200">|</span>
              <span className="flex items-center gap-1.5">
                  India <span className="text-slate-300">—</span> Global
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  const FooterColumn = ({ title, children }) => (
    <div className="space-y-6">
      <h4 className="font-bold uppercase tracking-widest text-[11px] text-slate-400">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );

  const FooterLink = ({ to, children }) => (
    <li>
      <Link to={to} className="text-slate-600 hover:text-slate-900 font-bold transition-all duration-200 text-sm">
        {children}
      </Link>
    </li>
  );

  const SocialIcon = ({ icon, href }) => (
    <a 
      href={href} 
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
    >
      {icon}
    </a>
  );

  export default Footer;