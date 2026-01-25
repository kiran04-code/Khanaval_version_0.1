import { Link } from "react-router-dom";
import { Instagram, Mail, Linkedin, ArrowUpRight, Globe, ChevronRight, MapPin, TwitchIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white text-slate-950 pt-16 pb-8 overflow-hidden border-t border-slate-100">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand & Headline */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <img 
                src="/logo.png" 
                alt="Khanaaval Logo" 
                className="h-12 md:h-16 object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500" 
              />
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
                Elevating <br />
                <span className="text-slate-300 hover:text-primary transition-colors duration-700 cursor-default">Daily Dining.</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed">
                India’s most sophisticated mess discovery network. Redefining the student meal experience.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Inquiries</p>
                <a href="tel:8788113738" className="text-lg font-bold hover:tracking-widest transition-all duration-500 block">
                  87881 13738
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Email Us</p>
                <a href="mailto:hello@khanaval.com" className="text-[14px] md:text-lg font-bold hover:tracking-widest transition-all duration-500 block border-b-2 border-slate-900 w-fit">
                  hello@khanaaval.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterColumn title="Platform">
              <FooterLink to="/mess">Discovery</FooterLink>
              <FooterLink to="/how-it-works">Standard</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
            </FooterColumn>

            <FooterColumn title="Network">
              <FooterLink to="/auth?role=provider">Onboarding</FooterLink>
              <FooterLink to="/auth">Dashboard</FooterLink>
              <FooterLink to="/HelpSupport">Support</FooterLink>
            </FooterColumn>

            <FooterColumn title="Studio">
              <FooterLink to="#" isExternal icon={<Instagram size={14}/>}>Instagram</FooterLink>
              <FooterLink to="#" isExternal icon={<Linkedin size={14}/>}>LinkedIn</FooterLink>
              <FooterLink to="/FeedBack" isExternal icon={<TwitchIcon size={14}/>} >Feedback</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* BOTTOM UTILITY BAR */}
        <div className="pt-5 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase">
              © {currentYear} Khanaaval
            </p>
            <div className="flex items-center gap-3 px-4 py-1 rounded-full border border-slate-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[9px] font-black text-slate-600 tracking-[0.2em] uppercase">Service Live</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black tracking-[0.3em] text-slate-400">
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">PRIVACY</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">TERMS</Link>
            <div className="flex items-center gap-2 text-slate-950 bg-slate-50 px-3 py-1 rounded">
              <Globe size={12} className="text-primary" />
              <span>IND / GLOBAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children }) => (
  <div className="space-y-6">
    <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300">{title}</h4>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const FooterLink = ({ to, children, isExternal, icon }) => (
  <li>
    {isExternal ? (
      <a href={to} className="flex items-center gap-2 text-sm font-extrabold text-slate-500 hover:text-slate-900 transition-all group">
        {icon}
        {children}
        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
      </a>
    ) : (
      <Link to={to} className="flex items-center gap-2 text-sm font-extrabold text-slate-500 hover:text-slate-900 transition-all group">
        <span className="w-0 h-[2px] bg-primary group-hover:w-4 transition-all duration-500"></span>
        {children}
      </Link>
    )}
  </li>
);

export default Footer;