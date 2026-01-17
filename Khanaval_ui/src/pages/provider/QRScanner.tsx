import { useEffect, useState } from "react";
import QRCode from "qrcode"; // Make sure to: npm install qrcode
import jsPDF from "jspdf";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, UserCheck, ShieldCheck, Loader2, Zap } from "lucide-react";
import { Getmymess } from "@/hooks/PorviderMess";

export default function SubscriberCheckInQR() {
  const { messdata } = Getmymess();
  const [qrBase64, setQrBase64] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const messName = messdata?.identity?.name || "Premium Mess";

  // --- GENERATE QR ON THE FLY (Fixes the Download Error) ---
  useEffect(() => {
    // We generate the QR locally using the mess ID. 
    // This removes the need to fetch an external image.
    const generateLocalQR = async () => {
      try {
        const dataToEncode = JSON.stringify({
          action: "MARK_ATTENDANCE",
          messId: messdata?.id || "default",
          name: messName
        });

        const base64 = await QRCode.toDataURL(dataToEncode, {
          width: 1000,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        setQrBase64(base64);
      } catch (err) {
        console.error("QR Generation failed", err);
      }
    };

    if (messdata) generateLocalQR();
  }, [messdata, messName]);

  const downloadPoster = () => {
    if (!qrBase64) return;
    
    setIsGenerating(true);
    
    // Using a slight timeout to let the UI show the loader
    setTimeout(() => {
      const doc = new jsPDF("p", "mm", "a4");
      const center = 105;

      // 1. Premium Orange Background
      doc.setFillColor(255, 140, 0); 
      doc.rect(0, 0, 210, 297, "F");
      
      // 2. Main White Card Area
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(8, 8, 194, 281, 10, 10, "F");

      // 3. Header Branding
      doc.setTextColor(255, 140, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(38);
      doc.text("KHANAVAL", center, 32, { align: "center", charSpace: 3 });
      
      doc.setFontSize(10);
      doc.setTextColor(140, 140, 140);
      doc.setFont("helvetica", "normal");
      doc.text("SMART DIGITAL ATTENDANCE SYSTEM", center, 40, { align: "center" });

      // 4. Mess Name Display
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(30, 55, 150, 25, 5, 5, "F");
      doc.setDrawColor(255, 140, 0);
      doc.setLineWidth(0.5);
      doc.roundedRect(30, 55, 150, 25, 5, 5, "D");
      
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(22);
      doc.text(messdata?.identity?.name, center, 72, { align: "center" });

      // 5. QR Code Area
      doc.addImage(messdata?.MessQrcode, "PNG", 45, 95, 120, 120);

      // 6. Professional Call to Action
      doc.setFontSize(24);
      doc.setTextColor(255, 140, 0);
      doc.text("SCAN TO CHECK-IN", center, 235, { align: "center" });

      doc.setFontSize(14);
      doc.setTextColor(80, 80, 80);
      doc.text("Subscribers: Mark your daily meal instantly", center, 245, { align: "center" });

      // 7. Footer Instructions
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(20, 260, 170, 22, 5, 5, "F");
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Open Khanaval App • Scan Code • Attendance Marked", center, 273, { align: "center" });

      doc.save(`CheckIn-${messName}.pdf`);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-md w-full shadow-2xl border-none rounded-[3rem] overflow-hidden bg-white ring-1 ring-black/5">
        {/* Top Header Section */}
        <div className="bg-[#FF8C00] p-10 text-center text-white relative">
          <div className="absolute top-4 right-6 opacity-20"><Zap className="w-12 h-12" /></div>
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-[0.2em]">KHANAVAL</h1>
          <p className="text-orange-100 text-[10px] font-bold uppercase tracking-widest mt-2">Attendance Point</p>
        </div>

        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">{messdata?.identity?.name}</h2>
            <p className="text-slate-400 text-sm mt-1">Ready for Subscriber Scans</p>
          </div>

          {/* QR Container */}
          <div className="relative p-2 bg-gradient-to-b from-slate-100 to-white rounded-[2rem] border border-slate-200 shadow-inner">
            <div className="bg-white p-6 rounded-[1.8rem] shadow-sm">
              {messdata ? (
                <img src={messdata?.MessQrcode} alt="Check-in QR" className="w-full h-auto" />
              ) : (
                <div className="aspect-square flex items-center justify-center text-slate-300">
                  <Loader2 className="w-10 h-10 animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Information Badges */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
        
              <span className="text-[11px] font-bold text-slate-600 uppercase">Subscribers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">

              <span className="text-[10px] font-bold text-slate-600 uppercase">Secure Log</span>
            </div>
          </div>

          {/* Main Action */}
          <Button 
            onClick={downloadPoster}
            disabled={!qrBase64 || isGenerating}
            className="w-full mt-8 h-16  bg-slate-900 hover:bg-black text-white rounded-2xl text-[12px] font-bold shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Poster...
              </>
            ) : (
              <>
                <Download className="mr-2 text-[12px]  h-5 w-5" />
                Download Print Poster
              </>
            )}
          </Button>

          <p className="text-center mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Scan • Verify • Eat
          </p>
        </CardContent>
      </Card>
    </div>
  );
}