import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  CameraOff,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
  User,
  Calendar,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ScanResult {
  userId: string;
  userName: string;
  plan: string;
  validUntil: string;
  mealsRemaining: number;
  isValid: boolean;
}

// Mock validation function
const validateQRCode = (data: string): ScanResult | null => {
  try {
    const parsed = JSON.parse(data);
    // Simulate validation
    const mockResults: Record<string, ScanResult> = {
      "user-001": {
        userId: "user-001",
        userName: "Rahul Sharma",
        plan: "Monthly Unlimited",
        validUntil: "2026-01-31",
        mealsRemaining: 24,
        isValid: true,
      },
      "user-002": {
        userId: "user-002",
        userName: "Priya Patel",
        plan: "Weekly Plan",
        validUntil: "2025-12-28",
        mealsRemaining: 0,
        isValid: false,
      },
    };
    return mockResults[parsed.userId] || null;
  } catch {
    return null;
  }
};

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [recentScans, setRecentScans] = useState<(ScanResult & { scannedAt: Date })[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        () => {
          // Ignore scan errors
        }
      );
      setIsScanning(true);
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setIsScanning(false);
  };

  const handleScanSuccess = (decodedText: string) => {
    stopScanner();

    // For demo purposes, create mock data
    const mockData = JSON.stringify({ userId: "user-001" });
    const result = validateQRCode(mockData);

    if (result) {
      setScanResult(result);
      setRecentScans((prev) => [{ ...result, scannedAt: new Date() }, ...prev.slice(0, 9)]);

      toast({
        title: result.isValid ? "Valid Pass" : "Invalid Pass",
        description: result.isValid
          ? `${result.userName} - Meal credit deducted`
          : `${result.userName} - Pass expired or no credits`,
        variant: result.isValid ? "default" : "destructive",
      });
    } else {
      toast({
        title: "Invalid QR Code",
        description: "This QR code is not recognized",
        variant: "destructive",
      });
    }
  };

  const handleScanAnother = () => {
    setScanResult(null);
    startScanner();
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Scanner Section */}
      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Scan Customer Pass</h2>
            <p className="text-muted-foreground">Point the camera at customer's QR code</p>
          </div>

          {!isScanning && !scanResult && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-64 h-64 bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed border-border">
                <Camera className="w-16 h-16 text-muted-foreground" />
              </div>
              <Button onClick={startScanner} size="lg" className="gap-2">
                <Camera className="w-5 h-5" />
                Start Scanner
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-2xl">
                <div id="qr-reader" className="w-full h-full" />
                <div className="absolute inset-0 pointer-events-none border-4 border-primary rounded-2xl">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
                </div>
              </div>
              <Button variant="outline" onClick={stopScanner} className="gap-2">
                <CameraOff className="w-4 h-4" />
                Stop Scanner
              </Button>
            </div>
          )}

          {scanResult && (
            <div className="max-w-md mx-auto">
              <div
                className={`p-6 rounded-2xl border-2 ${
                  scanResult.isValid
                    ? "bg-accent/10 border-accent"
                    : "bg-destructive/10 border-destructive"
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  {scanResult.isValid ? (
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-accent" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                      <XCircle className="w-10 h-10 text-destructive" />
                    </div>
                  )}
                </div>

                <h3
                  className={`text-xl font-bold text-center mb-4 ${
                    scanResult.isValid ? "text-accent" : "text-destructive"
                  }`}
                >
                  {scanResult.isValid ? "Pass Valid" : "Pass Invalid"}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Customer</p>
                      <p className="font-medium text-foreground">{scanResult.userName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Plan</p>
                      <p className="font-medium text-foreground">{scanResult.plan}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Valid Until</p>
                      <p className="font-medium text-foreground">{scanResult.validUntil}</p>
                    </div>
                  </div>

                  {scanResult.isValid && (
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <p className="text-sm text-accent font-medium">
                        ✓ 1 Meal Credit Deducted
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {scanResult.mealsRemaining - 1} credits remaining
                      </p>
                    </div>
                  )}

                  {!scanResult.isValid && (
                    <div className="text-center p-3 bg-destructive/10 rounded-lg">
                      <p className="text-sm text-destructive font-medium">
                        No credits remaining or pass expired
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Button onClick={handleScanAnother} className="w-full mt-4 gap-2">
                <RefreshCw className="w-4 h-4" />
                Scan Another
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Scans */}
      {recentScans.length > 0 && (
        <Card variant="elevated">
          <CardContent className="p-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Scans
            </h3>
            <div className="space-y-2">
              {recentScans.map((scan, i) => (
                <div
                  key={`${scan.userId}-${i}`}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {scan.userName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{scan.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {scan.scannedAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={scan.isValid ? "success" : "destructive"}>
                    {scan.isValid ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Valid
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Invalid
                      </>
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
