import React, { useState } from 'react';
import { 
  UserPlus, 
  Smartphone, 
  MapPin, 
  Camera, 
  QrCode, 
  Search, 
  UtensilsCrossed, 
  ArrowRight,
  PhoneCall,
  LayoutGrid,
  Users
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('provider');
  const navigate= useNavigate()
  const providerSteps = [
    {
      title: "रजिस्ट्रेशन और OTP",
      desc: "अपना नंबर डालें और OTP के जरिए सुरक्षित रूप से जुड़ें।",
      icon: <Smartphone className="w-5 h-5 text-orange-500" />
    },
    {
      title: "मेस की जानकारी",
      desc: "नाम, समय, और अपनी मेस की पूरी डिटेल्स भरें।",
      icon: <LayoutGrid className="w-5 h-5 text-orange-500" />
    },
    {
      title: "फोटो और लोकेशन",
      desc: "किचन की फोटो अपलोड करें और अपनी लोकेशन मैप पर सेट करें।",
      icon: <Camera className="w-5 h-5 text-orange-500" />
    }
  ];

  const consumerSteps = [
    {
      title: "Scan QR Code",
      desc: "Scan the unique QR at the mess to to Daliy Mess Check In",
      icon: <QrCode className="w-5 h-5 text-orange-500" />
    },
    {
      title: "Daily Menu",
      desc: "Check today's special dishes and meal prices in real-time.",
      icon: <UtensilsCrossed className="w-5 h-5 text-orange-500" />
    },
    {
      title: "Near Mess Search",
      desc: "Find and filter the best mess services near your current location.",
      icon: <Search className="w-5 h-5 text-orange-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 pb-12 font-sans">
      {/* Header */}
      <div className="w-full max-w-md mx-auto mt-6 mb-8 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Plateform Flow</h1>
        <p className="text-slate-500 text-xs">Choose your role to see how it works</p>
      </div>

      {/* Tab Switcher */}
      <div className="w-full max-w-md mx-auto flex bg-slate-200/50 p-1.5 rounded-2xl mb-8">
        <button 
          onClick={() => setActiveTab('provider')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'provider' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Users className="w-4 h-4" /> PROVIDER
        </button>
        <button 
          onClick={() => setActiveTab('consumer')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'consumer' ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-500'}`}
        >
          <UserPlus className="w-4 h-4" /> CONSUMER
        </button>
      </div>

      {/* Steps List */}
      <div className="w-full max-w-md mx-auto space-y-4">
        {activeTab === 'provider' ? (
          providerSteps.map((step, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex gap-4 items-start shadow-sm">
              <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100">{step.icon}</div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm">{step.title}</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))
        ) : (
          consumerSteps.map((step, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex gap-4 items-start shadow-sm">
              <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100">{step.icon}</div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm">{step.title}</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Footer */}
      <div className="w-full max-w-md mx-auto mt-10 space-y-4">
        <div className={`rounded-3xl p-6 shadow-xl ${activeTab === 'provider' ? 'bg-slate-900' : 'bg-slate-900'}`}>
          <h2 className="text-white font-bold text-lg mb-1">
            {activeTab === 'provider' ? 'आज ही शुरुआत करें!' : 'Explore Your Mess!'}
          </h2>
          <p className="text-slate-400 text-[11px] mb-5">
            {activeTab === 'provider' ? 'अपनी मेस को डिजिटल बनाएं और ज्यादा ग्राहकों तक पहुँचें।' : 'Check daily menu, prices, and locations of nearby messes easily.'}
          </p>
          <button onClick={()=>navigate("/auth")} className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 text-white ${activeTab === 'provider' ? 'bg-orange-500' : 'text-orange-500'}`}>
            Get Started Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Support Link */}
        <div className="text-center">
            <a href="tel:8788113738" className="inline-flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-orange-500 transition-colors">
                <PhoneCall className="w-3 h-3" /> Need Support: 878 811 3738
            </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
