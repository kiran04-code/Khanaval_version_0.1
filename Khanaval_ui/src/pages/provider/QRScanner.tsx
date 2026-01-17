import { useEffect, useState } from "react";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";
import { Getmymess } from "@/hooks/PorviderMess";

export default function SubscriberCheckInQR() {
  const [qrImage, setQrImage] = useState<string>("");

  const brandColor = "#FF8C00"; 
  const messName = "Shree Seva Mess";

  // Data optimized for subscriber validation
  const qrPayload = {
    action: "MARK_ATTENDANCE",
    messId: "MS-001",
    location: "Main Branch",
    timestamp: new Date().toISOString(),
  };
 const {messdata} = Getmymess()
  useEffect(() => {
    QRCode.toDataURL(JSON.stringify(qrPayload), {
      width: 800,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    }).then(setQrImage);
  }, []);

  const downloadPoster = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const center = 105;

    // Premium Border/Frame
    doc.setDrawColor(255, 140, 0);
    doc.setLineWidth(5);
    doc.rect(5, 5, 200, 287); // Outer frame

    // Branding Header
    doc.setFillColor(255, 140, 0);
    doc.rect(5, 5, 200, 45, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    doc.text("K H A N A V A L", center, 25, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("SUBSCRIBER CHECK-IN STATION", center, 35, { align: "center" });

    // Mess Name Section
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(messdata?.name, center, 70, { align: "center" });

    // Instructions
    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text("Scan to mark your meal today", center, 85, { align: "center" });

    // QR Code with "Scan Area" visual
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(1);
    doc.roundedRect(45, 100, 120, 120, 5, 5, "D");
    doc.addImage(messdata?.MessQrcode, "PNG", 50, 105, 110, 110);

    // Footer - Steps for UX
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 235, 170, 35, 5, 5, "F");
    
    doc.setFontSize(12);
    doc.setTextColor(255, 140, 0);
    doc.setFont("helvetica", "bold");
    doc.text("HOW TO CHECK-IN:", 30, 245);
    
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("1. Open Khanaval App or Camera", 30, 252);
    doc.text("2. Scan this QR Code", 30, 258);
    doc.text("3. Show the 'Success' screen to the manager", 30, 264);

    doc.save(`CheckIn-${messName}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-md w-full shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-white">
        {/* Header Section */}
        <div className="bg-orange-500 p-8 text-center text-white">
          <div className="flex justify-center mb-3">
            <ShieldCheck className="w-10 h-10 opacity-90" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter">KHANAVAL</h1>
          <p className="text-orange-100 text-sm font-medium">ATTENDANCE SYSTEM</p>
        </div>

        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">{messdata?.name}</h2>
            <p className="text-gray-500 text-sm italic">Subscriber Daily Meal Entry</p>
          </div>

          {/* QR Scan Area UI */}
          <div className="relative p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 border border-slate-200 rounded-full flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Scanner</span>
            </div>

            {qrImage ? (
              <img src={messdata?.MessQrcode} alt="Attendance QR" className="w-full h-auto rounded-lg shadow-sm" />
            ) : (
              <div className="aspect-square bg-slate-100 animate-pulse rounded-lg" />
            )}
          </div>

          {/* Feature List for User Experience */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-left">
              <div className="bg-orange-100 p-2 rounded-lg">
                <UserCheck className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700">Quick Check-in</p>
                <p className="text-xs text-gray-500">Scan to mark today's attendance instantly.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-left">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700">Anti-Fraud</p>
                <p className="text-xs text-gray-500">Secure encrypted entry for subscribers only.</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={downloadPoster}
            className="w-full mt-8 h-14 bg-gray-900 hover:bg-black text-white rounded-2xl transition-all hover:shadow-xl"
          >
            <Download className="mr-2 w-5 h-5" />
            Download Entry Poster
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}