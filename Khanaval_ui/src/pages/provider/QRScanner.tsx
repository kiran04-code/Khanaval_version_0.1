import { useEffect, useState } from "react";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { Getmymess } from "@/hooks/PorviderMess";

export default function SubscriberCheckInQR() {
  const { messdata } = Getmymess();
  const [qrBase64, setQrBase64] = useState<string>("");
  const messName = messdata?.identity?.name || "RADHE MESS";

  useEffect(() => {
    const generateQR = async () => {
      try {
        const base64 = await QRCode.toDataURL(messdata?.MessQrcode || "default", {
          width: 1000,
          margin: 1,
          color: { dark: "#000000", light: "#FFFFFF" },
        });
        setQrBase64(base64);
      } catch (err) {
        console.error(err);
      }
    };
    if (messdata) generateQR();
  }, [messdata]);

  const downloadPdf = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // 1. Top Orange Border
    doc.setFillColor(255, 140, 0);
    doc.rect(0, 0, pageWidth, 15, "F");

    // 2. KHANAAVAL - FIXED CENTERING
    const title = "KHANAAVAL";
    const fontSize = 42;
    const charSpacing = 4;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);

    // Manual Calculation for true center with character spacing
    // jsPDF's getTextWidth doesn't account for charSpace properly in alignment
    const textWidth = doc.getTextWidth(title);
    const totalExtraSpace = (title.length - 1) * charSpacing;
    const actualTotalWidth = textWidth + totalExtraSpace;
    const startX = (pageWidth - actualTotalWidth) / 2;

    doc.text(title, startX, 45, { charSpace: charSpacing });

    // 3. MESS NAME BOX (Centered below heading)
    const btnWidth = 110;
    const btnHeight = 16;
    const btnY = 58;
    
    doc.setFillColor(31, 41, 55); // Match image dark blue/gray
    doc.roundedRect(centerX - (btnWidth / 2), btnY, btnWidth, btnHeight, 4, 4, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    // Center the mess name inside the dark box
    doc.text(messName.toUpperCase(), centerX, btnY + 10.5, { 
      align: "center",
      charSpace: 1 
    });

    // 4. QR CODE (Centered)
    if (qrBase64) {
      const qrSize = 110;
      const qrY = 85;
      // Border around QR
      doc.setDrawColor(230, 230, 230);
      doc.rect(centerX - (qrSize / 2) - 2, qrY - 2, qrSize + 4, qrSize + 4, "S");
      doc.addImage(messdata?.MessQrcode, "PNG", centerX - (qrSize / 2), qrY, qrSize, qrSize);
    }

    // 5. SCAN TO CHECK-IN
    doc.setTextColor(255, 140, 0);
    doc.setFontSize(32);
    doc.text("SCAN TO CHECK-IN", centerX, 220, { align: "center" });

    // 6. Subtext
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Mark your attendance instantly for today's meal.", centerX, 230, { align: "center" });

    // 7. Footer Instructions
    const footerWidth = 170;
    const footerY = 250;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(centerX - (footerWidth / 2), footerY, footerWidth, 20, 4, 4, "FD");
    
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("1. OPEN APP", centerX - 55, footerY + 12, { align: "center" });
    doc.text("2. SCAN QR", centerX, footerY + 12, { align: "center" });
    doc.text("3. EAT WELL", centerX + 55, footerY + 12, { align: "center" });

    doc.save(`${messName}-Poster.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* UI Preview Card */}
      <div className="w-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden relative border-t-[20px] border-[#FF8C00]">
        <Card className="border-none shadow-none">
          <CardContent className="pt-12 pb-16 flex flex-col items-center">
            <h1 className="text-4xl font-black tracking-[0.4em] text-black mb-8 text-center ml-[0.4em]">
              KHANAAVAL
            </h1>
            
            <div className="bg-[#1F2937] px-10 py-3 rounded-xl mb-12 min-w-[220px] text-center">
              <span className="text-white text-lg font-bold tracking-widest block uppercase">
                {messName}
              </span>
            </div>

            <div className="w-72 h-72 mb-12 bg-white p-2 border shadow-sm flex items-center justify-center">
              {messdata?.MessQrcode && <img src={messdata?.MessQrcode} alt="QR" className="w-full h-full" />}
            </div>

            <h2 className="text-[#FF8C00] text-3xl font-black mb-3 uppercase tracking-tight">
              Scan to Check-In
            </h2>
            <p className="text-slate-500 text-base mb-12">
              Mark your attendance instantly for today's meal.
            </p>

            <div className="w-full bg-slate-50 py-5 px-8 rounded-2xl flex justify-between text-[11px] font-black text-slate-800 border">
              <span>1. OPEN APP</span>
              <span className="border-x border-slate-200 px-4">2. SCAN QR</span>
              <span>3. EAT WELL</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={downloadPdf} 
        className="mt-8 bg-[#FF8C00] hover:bg-orange-600 h-14 px-10 rounded-2xl text-lg font-bold shadow-lg"
      >
        <Printer className="mr-2 w-6 h-6" /> Download Print PDF
      </Button>
    </div>
  );
}