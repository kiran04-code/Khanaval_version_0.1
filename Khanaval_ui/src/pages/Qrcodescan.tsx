import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, CheckCircle, ShieldCheck } from "lucide-react";

export default function NormalQRScanner() {
  const navigate = useNavigate();
  const qrRef = useRef<Html5Qrcode | null>(null);
  const [success, setSuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const qr = new Html5Qrcode("qr-reader");
    qrRef.current = qr;

    const config = {
      fps: 20,
      qrbox: (viewPortWidth: number, viewPortHeight: number) => {
        const minEdge = Math.min(viewPortWidth, viewPortHeight);
        return { width: Math.floor(minEdge * 0.7), height: Math.floor(minEdge * 0.7) };
      },
      aspectRatio: 1.0,
    };

    qr.start(
      { facingMode: "environment" },
      config,
      async (text) => {
        navigator.vibrate?.(50); 
        setSuccess(true);
        audioRef.current?.play().catch(() => {});

        await qr.stop();

        setTimeout(() => {
          const cleanId = text.replace("MESS_QR:", "");
          navigate(`/messsDetails/${cleanId}`);
        }, 500);
      },
      () => {}
    ).catch(console.error);

    return () => {
      if (qrRef.current?.isScanning) qrRef.current.stop().catch(() => {});
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 h-screen w-screen bg-black flex flex-col overflow-hidden font-sans">
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={() => navigate(-1)} className="p-2 text-white">
          <X className="w-7 h-7" />
        </button>
        <h1 className="text-orange-500 font-bold text-lg tracking-wider">KHANAVAL.COM</h1>
        <div className="w-10" /> 
      </div>
      <div className="relative flex-1 w-full bg-black flex items-center justify-center">
        <div id="qr-reader" className="absolute inset-0 w-full h-full" />
        <div className="absolute flex items-center justify-center z-10 pointer-events-none">
          <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 relative">
            <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-orange-500 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-orange-500 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-orange-500 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-orange-500 rounded-br-2xl" />
            <div className="absolute left-4 right-4 h-0.5 bg-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.8)] animate-scan-line" />
          </div>
        </div>

        <div className="absolute bottom-20 left-0 right-0 z-10 flex justify-center">
          <span className="bg-black/50 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20 text-sm font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            Align QR code inside the box
          </span>
        </div>
      </div>

      {success && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center animate-fade-in">
          <div className="bg-orange-50 p-6 rounded-full mb-4">
             <CheckCircle className="w-16 h-16 text-orange-600 animate-scale-in" />
          </div>
          <p className="text-gray-900 font-bold text-xl">Scanned Successfully</p>
        </div>
      )}

      <audio ref={audioRef} src="/sounds/scan-success.mp3" preload="auto" />

      <style jsx global>{`
        #qr-reader video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        #qr-reader__dashboard, #qr-reader__status_span {
          display: none !important;
        }
        #qr-reader { border: none !important; }

        @keyframes scan {
          0% { top: 5%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
        .animate-scan-line { animation: scan 2.5s linear infinite; }

        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
