import React from 'react';
import { ShieldCheck } from "lucide-react";

export const KhanaavalLoader = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fafafa]">
    {/* Central Brand Stage */}
    <div className="relative flex items-center justify-center">
      
      {/* Precision Circular Track - Ultra Thin */}
      <div className="absolute w-32 h-32 rounded-full border-[1px] border-slate-200/60" />

      {/* The "Orbit" - High-speed precision line */}
      <div className="absolute w-32 h-32 rounded-full border-t-[2px] border-orange-500 animate-[spin_0.8s_cubic_bezier(0.4,0,0.2,1)_infinite]" />

      {/* Thali Image Container */}
      <div className="relative w-24 h-24 rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[4px] border-white overflow-hidden group">
        
        {/* Subtle Internal Pulse Glow */}
        <div className="absolute inset-0 bg-orange-500/5 animate-pulse z-10" />

        {/* The Thali Image - Slow, high-quality rotation */}
        <img 
          src="https://t4.ftcdn.net/jpg/09/48/90/89/240_F_948908906_ZUUMCRDsasSMWZhEOnUqcaI1Z3JSjmmr.jpg" 
          alt="Premium Thali"
          className="w-full h-full object-cover animate-[slow-spin_12s_linear_infinite] scale-110"
        />

        {/* Glass Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent z-20" />
      </div>

      {/* Verified Badge - Floating with soft shadow */}
      <div className="absolute -right-1 -bottom-1 bg-white p-1 rounded-full shadow-xl z-30 animate-[float_3s_ease-in-out_infinite]">
        <div className="bg-green-500 text-white p-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
        </div>
      </div>
    </div>

    {/* Typography Section */}
    <div className="mt-16 flex flex-col items-center">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-black text-slate-900 tracking-[-0.04em]">
            KHANAAVAL<span className="text-orange-500">.</span>
        </h1>
      </div>
      
      {/* Narrative Loading Text */}
      <div className="mt-4 overflow-hidden h-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] animate-[slide-up_6s_steps(4)_infinite]">
          Authenticating<br/>
          Verifying Safety<br/>
          Finding Messes<br/>
          Securing Session
        </p>
      </div>

      {/* Minimalist Progress Line */}
      <div className="mt-6 w-32 h-[1.5px] bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500 w-1/3 animate-[loading-bar_1.5s_infinite_ease-in-out]" />
      </div>
    </div>

    {/* Bottom Trust Mark */}
    <div className="absolute bottom-12 opacity-40 flex flex-col items-center gap-2">
      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">
        Premium Food Network
      </span>
      <div className="h-[1px] w-6 bg-orange-500" />
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      @keyframes slide-up {
        0%, 20% { transform: translateY(0); }
        25%, 45% { transform: translateY(-25%); }
        50%, 70% { transform: translateY(-50%); }
        75%, 95% { transform: translateY(-75%); }
        100% { transform: translateY(0); }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes slow-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes loading-bar {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(250%); }
      }
    `}} />
  </div>
);