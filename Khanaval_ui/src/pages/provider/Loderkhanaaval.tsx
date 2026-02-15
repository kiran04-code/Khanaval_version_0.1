import { ShieldCheck, UtensilsCrossed } from "lucide-react";

export const KhanaavalLoader = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl">
    <div className="relative flex items-center justify-center">
      
      {/* Dynamic Ripple Waves - Symbolizes "Finding Messes" */}
      <div className="absolute w-32 h-32 bg-orange-100 rounded-full animate-[ping_2s_linear_infinite] opacity-20"></div>
      <div className="absolute w-24 h-24 bg-orange-200 rounded-full animate-[ping_2s_linear_infinite_0.5s] opacity-30"></div>
      
      {/* Glassmorphism Outer Plate */}
      <div className="relative w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center justify-center overflow-hidden">
        
        {/* Animated Gradient Background Sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent animate-pulse" />

        {/* Brand Icon with Floating Animation */}
        <div className="relative animate-[bounce_2s_ease-in-out_infinite]">
            <div className="bg-orange-500 p-4 rounded-2xl shadow-xl shadow-orange-200">
                <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            
            {/* Miniature Verification Badge attached to icon */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                <ShieldCheck className="w-4 h-4 text-green-500" />
            </div>
        </div>
      </div>

      {/* Modern Circular Progress Track */}
      <svg className="absolute w-32 h-32 -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="60"
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx="64"
          cy="64"
          r="60"
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray="377"
          strokeDashoffset="280"
          className="text-orange-500 animate-[dash_1.5s_ease-in-out_infinite]"
          strokeLinecap="round"
        />
      </svg>
    </div>

    {/* Text Content */}
    <div className="mt-12 text-center">
      <h3 className="text-2xl font-black text-slate-900 tracking-tighter animate-pulse">
        KHANAAVAL
      </h3>
      <div className="mt-2 flex items-center justify-center gap-2">
         <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-1/2 animate-[loading-bar_1s_ease-in-out_infinite]" />
         </div>
      </div>
      <p className="mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">
        Simplifying Your Daily Food
      </p>
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes dash {
        0% { stroke-dashoffset: 377; transform: rotate(0deg); }
        50% { stroke-dashoffset: 100; transform: rotate(180deg); }
        100% { stroke-dashoffset: 377; transform: rotate(360deg); }
      }
      @keyframes loading-bar {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
    `}} />
  </div>
);