import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, UserCheck, ShieldCheck, Loader2 } from "lucide-react";
import { Getmymess } from "@/hooks/PorviderMess";

export default function SubscriberCheckInQR() {
  const { messdata } = Getmymess();
  const [isGenerating, setIsGenerating] = useState(false);

  const brandColor = "#FF8C00";
  const messName = messdata?.name || "Shree Seva Mess";

  // --- Helper: Convert Image URL to Base64 to fix Download issues ---
  const getBase64ImageFromURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  };

  const downloadPoster = async () => {
    if (!messdata?.MessQrcode) {
      alert("QR Code not found!");
      return;
    }

    try {
      setIsGenerating(true);
      const doc = new jsPDF("p", "mm", "a4");
      const center = 105;

      const base64QR = await getBase64ImageFromURL(messdata?.MessQrcode);
      doc.setDrawColor(255, 140, 0);
      doc.setLineWidth(4);
      doc.rect(5, 5, 200, 287);

      // Header Branding Box
      doc.setFillColor(255, 140, 0);
      doc.rect(5, 5, 200, 50, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(40);
      doc.setFont("helvetica", "bold");
      doc.text("KHANAVAL", center, 28, { align: "center", charSpace: 2 });
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("OFFICIAL SUBSCRIBER CHECK-IN", center, 38, { align: "center" });

      // Mess Name Section
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      doc.text(messdata?.name.toUpperCase(), center, 75, { align: "center" });

      // Instruction Text
      doc.setFontSize(16);
      doc.setTextColor(120, 120, 120);
      doc.text("Scan to mark your attendance", center, 88, { align: "center" });

      // QR Code with Professional Border
      doc.setDrawColor(240, 240, 240);
      doc.setLineWidth(1);
      doc.roundedRect(48, 103, 114, 114, 5, 5, "D");
      doc.addImage(base64QR, "PNG", 50, 105, 110, 110);

      // CTA Section
      doc.setFillColor(255, 140, 0);
      doc.circle(center, 230, 2, "F");
      
      doc.setFontSize(22);
      doc.setTextColor(255, 140, 0);
      doc.text("SUBSCRIBERS ONLY", center, 245, { align: "center" });

      // Footer Instructions
      doc.setFillColor(248, 248, 248);
      doc.roundedRect(20, 255, 170, 25, 4, 4, "F");
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text("1. Open App  •  2. Scan QR  •  3. Mark Presence", center, 268, { align: "center" });
      
      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text("This QR is unique to your mess and encrypted for security.", center, 285, { align: "center" });

      doc.save(`CheckIn-${messName.replace(/\s/g, "_")}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Please check if the QR image is accessible.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
      <Card className="max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-none rounded-[3rem] overflow-hidden bg-white">
        {/* Visual Header */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-10 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-widest">KHANAVAL</h1>
          <p className="text-orange-100 text-xs font-bold uppercase mt-2 opacity-80">Subscriber Terminal</p>
        </div>

        <CardContent className="p-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{messName}</h2>
            <div className="h-1 w-12 bg-orange-500 mx-auto mt-2 rounded-full" />
          </div>

          {/* QR UI Display */}
          <div className="relative group bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Secure Point</span>
             </div>

            {messdata?.MessQrcode ? (
              <img 
                src={messdata.MessQrcode} 
                alt="Attendance QR" 
                className="w-full h-auto rounded-2xl shadow-sm bg-white p-2" 
              />
            ) : (
              <div className="aspect-square bg-slate-200 animate-pulse rounded-2xl flex items-center justify-center text-slate-400">
                Loading QR...
              </div>
            )}
          </div>

          {/* Experience Features */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-orange-50/50 rounded-2xl text-center border border-orange-100">
              <UserCheck className="w-5 h-5 text-orange-600 mb-2" />
              <p className="text-[11px] font-bold text-gray-700">Subscribers</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50/50 rounded-2xl text-center border border-green-100">
              <CheckCircle2 className="w-5 h-5 text-green-600 mb-2" />
              <p className="text-[11px] font-bold text-gray-700">Instant Log</p>
            </div>
          </div>

          {/* Enhanced Download Button */}
          <Button 
            onClick={downloadPoster}
            disabled={isGenerating || !messdata?.MessQrcode}
            className="w-full mt-8 h-16  bg-gray-900 hover:bg-black text-white rounded-[1.25rem] transition-all flex items-center justify-center text-[12px] font-bold group shadow-xl hover:shadow-orange-200"
          >
            {isGenerating ? (
              <Loader2 className="mr-2 w-6 h-6 animate-spin" />
            ) : (
              <Download className="mr-2 w-6 h-6 group-hover:translate-y-1 transition-transform" />
            )}
            {isGenerating ? "Preparing PDF..." : "Download Shop Poster"}
          </Button>

          <p className="text-center mt-6 text-[10px] text-slate-400 font-medium">
            DISPLAY THIS IN YOUR SHOP FOR EASY CHECK-IN
          </p>
        </CardContent>
      </Card>
    </div>
  );
}