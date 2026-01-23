import React from 'react';
import { Phone, Mail, MessageSquare, Clock, ShieldCheck, Zap } from "lucide-react";

const ProviderSupport = () => {
  return (
    <div className="bg-white min-h-screen text-slate-900 pb-20">
      {/* Header Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4">Partner Support</p>
          <h1 className="text-[10vw] md:text-[7vw] font-black leading-none tracking-tighter mb-12">
            PROVIDER<br />DETAILS<span className="text-primary">.</span>
          </h1>
        </div>
      </section>

      {/* Provider Contact Cards */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          
          {/* Urgent Support */}
          <div className="bg-slate-950 text-white p-10 rounded-[40px] flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-8">
                <Phone size={24} className="text-white" />
              </div>
              <h3 className="text-3xl font-black mb-4">Urgent Help</h3>
              <p className="text-slate-400 font-medium mb-10 max-w-xs">
                Active order issues or delivery disputes? Call our dedicated partner line.
              </p>
            </div>
            <a href="tel:8788113738" className="text-4xl md:text-5xl font-black hover:text-primary transition-colors">
              878 811 3738
            </a>
          </div>

          {/* Business Inquiry */}
          <div className="bg-slate-50 p-10 rounded-[40px] flex flex-col justify-between border border-slate-100">
            <div>
              <div className="w-12 h-12 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-8">
                <Mail size={24} className="text-slate-900" />
              </div>
              <h3 className="text-3xl font-black mb-4">Onboarding</h3>
              <p className="text-slate-500 font-medium mb-10 max-w-xs">
                Need help listing your mess or updating your menu? Send us your documents.
              </p>
            </div>
            <a href="mailto:partners@khanaval.com" className="text-2xl md:text-3xl font-black hover:text-primary transition-colors break-words">
              khanaaval.com@gmail.com
            </a>
          </div>

        </div>

        {/* Support Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-16">
          <DetailBlock 
            icon={<Clock size={20} />} 
            title="Operational Hours" 
            desc="Our partner team is available Mon-Sat, 9:00 AM to 9:00 PM." 
          />
          <DetailBlock 
            icon={<ShieldCheck size={20} />} 
            title="Account Safety" 
            desc="Report suspicious activity or login issues immediately." 
          />
          <DetailBlock 
            icon={<Zap size={20} />} 
            title="Fast Payouts" 
            desc="Queries regarding weekly settlements are processed within 24h." 
          />
        </div>

        {/* Feedback Quick Action */}
        <div className="mt-20 p-8 md:p-12 bg-primary text-white rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black mb-2">Have a suggestion?</h2>
            <p className="font-bold opacity-80 uppercase tracking-widest text-xs">Help us improve the provider dashboard</p>
          </div>
          <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black hover:scale-105 transition-transform flex items-center gap-3">
            <MessageSquare size={20} /> SHARE FEEDBACK
          </button>
        </div>
      </section>
    </div>
  );
};

const DetailBlock = ({ icon, title, desc }) => (
  <div className="space-y-4">
    <div className="text-primary">{icon}</div>
    <h4 className="text-lg font-black uppercase tracking-tight">{title}</h4>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default ProviderSupport;