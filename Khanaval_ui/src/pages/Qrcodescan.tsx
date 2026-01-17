import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function QRScanPages() {
  const navigate = useNavigate();
  const qrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    qrCodeRef.current = html5QrCode;

    html5QrCode
      .start(
        { facingMode: "environment" }, // ✅ Back camera
        {
          fps: 15,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          if (decodedText.startsWith("MESS_QR:")) {
            const token = decodedText.replace("MESS_QR:", "");

            html5QrCode.stop().then(() => {
              navigate(`/attendance/verify?token=${token}`);
            });
          }
        },
        () => {}
      )
      .catch((err) => {
        console.error("Camera start error", err);
      });

    return () => {
      if (qrCodeRef.current?.isScanning) {
        qrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white/20 rounded-full text-white"
        >
          <X />
        </button>
      </div>

      {/* CAMERA */}
      <div
        id="qr-reader"
        className="w-full h-full object-cover [&_video]:object-cover"
      />

      {/* Overlay Frame */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-72 h-72 border-4 border-orange-500 rounded-2xl">
          <div className="absolute inset-x-4 h-[2px] bg-orange-400 animate-scan" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        .animate-scan {
          position: absolute;
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
