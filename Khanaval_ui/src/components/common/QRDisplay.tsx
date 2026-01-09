import { cn } from "@/lib/utils";

interface QRDisplayProps {
  value: string;
  userName: string;
  validUntil: string;
  mealsRemaining: number;
  className?: string;
}

export function QRDisplay({
  value,
  userName,
  validUntil,
  mealsRemaining,
  className,
}: QRDisplayProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-3xl p-6 shadow-elevated border border-border",
        className
      )}
    >
      <div className="text-center mb-4">
        <h3 className="font-bold text-lg text-foreground">{userName}</h3>
        <p className="text-sm text-muted-foreground">Your Meal Pass</p>
      </div>

      {/* QR Code Placeholder - In real app, use a QR code library */}
      <div className="relative mx-auto w-56 h-56 bg-foreground rounded-2xl p-4 mb-4">
        <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-8 h-8 rounded-sm",
                  Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"
                )}
              />
            ))}
          </div>
        </div>
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-primary rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-primary rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-primary rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-primary rounded-br-lg" />
      </div>

      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground font-mono">{value}</p>
        <div className="flex justify-center gap-6 pt-2">
          <div>
            <p className="text-2xl font-bold text-primary">{mealsRemaining}</p>
            <p className="text-xs text-muted-foreground">Meals Left</p>
          </div>
          <div className="w-px bg-border" />
          <div>
            <p className="text-sm font-semibold text-foreground">{validUntil}</p>
            <p className="text-xs text-muted-foreground">Valid Until</p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
        Show this QR code at the mess counter to scan your meal
      </p>
    </div>
  );
}
