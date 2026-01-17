import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, CheckCircle, Zap, ShieldCheck } from "lucide-react";

export default function QRScanPage() {
  const navigate = useNavigate();
  const qrRef = useRef<Html5Qrcode | null>(null);
  const scanned = useRef(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const qr = new Html5Qrcode("qr-reader");
    qrRef.current = qr;

    qr.start(
      { facingMode: "environment" },
      {
        fps: 20, // Increased for smoother detection
        qrbox: { width: 260, height: 260 },
      },
      async (text) => {
        if (scanned.current) return;
        scanned.current = true;

        playBeep();
        vibrate();
        setSuccess(true);

        await qr.stop();
        handleQr(text);
      },
      () => {}
    ).catch(console.error);

    return () => {
      qrRef.current?.stop().catch(() => {});
    };
  }, []);

  const handleQr = (text: string) => {
    setTimeout(() => {
      if (text.startsWith("MESS_QR:")) {
        const messId = text.replace("MESS_QR:", "");
        navigate(`/messsDetails/${messId}`);
      } else {
        // Fallback for direct IDs or URLs
        navigate(`/messsDetails/${text}`);
      }
    }, 800);
  };

  /* 🔊 Professional Audio Feedback */
  function playBeep() {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880; 
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => { osc.stop(); ctx.close(); }, 200);
  }

  function vibrate() {
    navigator.vibrate?.(100);
  }

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden font-sans">
      
      {/* Top Branding Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-orange-500 font-black text-lg tracking-tighter">
            KHANAVAL<span className="text-white">.COM</span>
          </h2>
          <p className="text-[10px] text-white/60 font-bold uppercase tracking-[0.2em]">Smart Scanner</p>
        </div>

        <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-50">
          <Zap className="w-5 h-5" />
        </button>
      </div>

      {/* QR Reader Camera Background */}
      <div
        id="qr-reader"
        className="w-full h-screen [&_video]:w-full [&_video]:h-full [&_video]:object-cover"
      />

      {/* Modern UI Mask Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Semi-transparent Backdrop with "Hole" for scanner */}
        <div className="absolute inset-0 bg-black/40" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)' }} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Scanning Box */}
          <div className="relative w-64 h-64 md:w-72 md:h-72">
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-orange-500 rounded-tl-2xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-orange-500 rounded-tr-2xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-orange-500 rounded-bl-2xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-orange-500 rounded-br-2xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            
            {/* Animated Laser Line */}
            <div className="absolute left-2 right-2 h-[3px] bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-scan shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/20 shadow-xl">
             <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-orange-400" />
               Align Mess QR Code
             </p>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {success && (
        <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center z-[60] animate-fade-in">
          <div className="bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center scale-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-slate-900 font-black text-xl tracking-tight">Verified!</h3>
            <p className="text-slate-500 text-sm font-medium">Opening mess details...</p>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-10 left-0 right-0 text-center z-50">
         <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Powered by Khanaval.com</p>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 5%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .scale-up {
          animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
}