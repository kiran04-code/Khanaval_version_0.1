import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Zap, Image as ImageIcon, Info } from "lucide-react";

export default function QRScanPages() {
  const navigate = useNavigate();

  useEffect(() => {
    // Customizing the scanner configuration
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 20, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0 
      },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        if (decodedText.startsWith("MESS_QR:")) {
          const token = decodedText.replace("MESS_QR:", "");
          scanner.clear();
          navigate(`/attendance/verify?token=${token}`);
        }
      },
      (error) => {
        // Handle scanning errors silently
      }
    );

    return () => {
      scanner.clear().catch((error) => console.error("Failed to clear scanner", error));
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-[#0F172A] z-50 flex flex-col font-sans">
      
      {/* --- Top Navigation --- */}
      <div className="relative z-20 flex items-center justify-between p-5">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">MessApp</span>
          <h1 className="text-sm font-bold text-white tracking-tight">Attendance Scanner</h1>
        </div>

        <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
          <Zap className="w-5 h-5" />
        </button>
      </div>

      {/* --- Scanner Container --- */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        
        {/* The Actual Scanner (Hidden UI via CSS) */}
        <div 
          id="qr-reader" 
          className="absolute inset-0 w-full h-full object-cover [&_video]:object-cover"
        />

        {/* --- CUSTOM OVERLAY UI --- */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Scanner Frame Corners */}
          <div className="relative w-72 h-72">
            {/* Corner TL */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500 rounded-tl-2xl"></div>
            {/* Corner TR */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500 rounded-tr-2xl"></div>
            {/* Corner BL */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500 rounded-bl-2xl"></div>
            {/* Corner BR */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500 rounded-br-2xl"></div>
            
            {/* Scanning Animation Line */}
            <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-scan-move opacity-80"></div>
          </div>

          <p className="mt-8 text-white/90 text-sm font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
            Scanning for Mess QR...
          </p>
        </div>

        {/* Dimming effect outside the frame */}
        <div className="absolute inset-0 pointer-events-none border-[60px] border-black/40"></div>
      </div>

      {/* --- Bottom Controls --- */}
      <div className="relative z-20 p-8 bg-gradient-to-t from-black to-transparent text-center">
        <div className="flex justify-center gap-10 mb-8">
           <div className="flex flex-col items-center gap-2">
              <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                <ImageIcon className="w-5 h-5" />
              </button>
              <span className="text-[10px] text-white/60 font-bold uppercase">Gallery</span>
           </div>
           <div className="flex flex-col items-center gap-2 text-orange-500">
              <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <QrCode className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-bold uppercase">Scan</span>
           </div>
           <div className="flex flex-col items-center gap-2 text-white">
              <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                <Info className="w-5 h-5" />
              </button>
              <span className="text-[10px] text-white/60 font-bold uppercase">Help</span>
           </div>
        </div>
      </div>

      <style jsx global>{`
        /* Hide html5-qrcode's default ugly UI */
        #qr-reader { border: none !important; }
        #qr-reader__dashboard { display: none !important; }
        #qr-reader__status_span { display: none !important; }
        #qr-reader video { width: 100% !important; height: 100% !important; border-radius: 0px !important; }
        
        @keyframes scan-move {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-move {
          position: absolute;
          animation: scan-move 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Simple Helper Icon if QrCode isn't imported from Lucide
function QrCode({className}) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v.01"/></svg>
}