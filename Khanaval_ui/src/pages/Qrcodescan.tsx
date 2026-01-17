import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function QRScanPages() {
  const navigate = useNavigate();
  const qrRef = useRef<Html5Qrcode | null>(null);
  const scanned = useRef(false);

  useEffect(() => {
    const qr = new Html5Qrcode("qr-reader");
    qrRef.current = qr;

    qr.start(
      { facingMode: "environment" },
      { fps: 12, qrbox: 250 },
      (text) => {
        if (scanned.current) return;
        scanned.current = true;

        handleQr(text, qr);
      },
      () => {}
    ).catch(console.error);

    return () => {
      qrRef.current?.stop().catch(() => {});
    };
  }, []);

  const handleQr = async (text: string, qr: Html5Qrcode) => {
    await qr.stop();

    // 🔹 MESS QR
    if (text.startsWith("MESS_QR:")) {
      const token = text.replace("MESS_QR:", "");
      return navigate(`/attendance/verify?token=${token}`);
    }

    // 🔹 ATTENDANCE QR
    if (text.startsWith("ATTEND:")) {
      return navigate(`/attendance/student?code=${text}`);
    }

    // 🔹 URL QR
    if (text.startsWith("http")) {
      return navigate(`/external?url=${encodeURIComponent(text)}`);
    }

    // 🔹 UNKNOWN QR
    navigate(`/qr/error?data=${encodeURIComponent(text)}`);
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 p-2 bg-black/50 rounded-full text-white"
      >
        <X />
      </button>

      <div
        id="qr-reader"
        className="w-full h-screen [&_video]:w-full [&_video]:h-full [&_video]:object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 border-4 border-orange-500 rounded-xl" />
      </div>
    </div>
  );
}
