import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QRDisplay } from "@/components/common/QRDisplay";
import { ArrowLeft, Calendar, Utensils, Info } from "lucide-react";

export default function EPassPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground py-8 pb-20">
        <div className="container mx-auto px-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold">Your E-Pass</h1>
          <p className="text-primary-foreground/80">Show this at the mess counter</p>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-12">
        <QRDisplay
          value="MEALPASS-USER-2026-ABCD1234"
          userName="Rahul Sharma"
          validUntil="Jan 31, 2026"
          mealsRemaining={24}
          className="max-w-sm mx-auto"
        />

        <div className="max-w-sm mx-auto mt-6 space-y-4">
          <Card variant="default">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Subscription Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    Mess
                  </span>
                  <span className="font-medium text-foreground">Sharma's Kitchen</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Plan
                  </span>
                  <span className="font-medium text-foreground">Monthly (30 meals)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined" className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">How to use</h4>
                  <p className="text-sm text-muted-foreground">
                    Show this QR code to the mess staff at the counter. They will scan it to
                    mark your meal and deduct one credit from your balance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full">
            Report an Issue
          </Button>
        </div>
      </div>
    </div>
  );
}
