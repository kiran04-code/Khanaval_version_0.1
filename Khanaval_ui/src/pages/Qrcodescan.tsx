import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, CheckCircle } from "lucide-react";

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
        fps: 12,
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
      }
    }, 700);
  };

  /* 🔊 Beep */
  function playBeep() {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 1000;
    gain.gain.value = 0.1;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 150);
  }

  /* 📳 Vibration */
  function vibrate() {
    navigator.vibrate?.(120);
  }

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
      >
        <X />
      </button>

      {/* QR Reader */}
      <div
        id="qr-reader"
        className="w-full h-screen [&_video]:w-full [&_video]:h-full [&_video]:object-cover"
      />

      {/* Scanning Box */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-72 h-72 border-4 border-orange-500 rounded-2xl overflow-hidden">
          <div className="absolute left-4 right-4 h-[2px] bg-orange-400 animate-scan" />
        </div>
      </div>

      {/* Success Overlay */}
      {success && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50 animate-fade-in">
          <CheckCircle className="w-20 h-20 text-green-400 mb-4 animate-scale-in" />
          <p className="text-white font-semibold text-lg">QR Scanned Successfully</p>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-in;
        }
      `}</style>
    </div>
  );
}
