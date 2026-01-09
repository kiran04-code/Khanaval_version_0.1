import { cn } from "@/lib/utils";
import { Check, Package, ChefHat, Truck, Home } from "lucide-react";

type OrderStatus = "ordered" | "preparing" | "out-for-delivery" | "delivered";

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

const steps = [
  { key: "ordered", label: "Ordered", icon: Package },
  { key: "preparing", label: "Preparing", icon: ChefHat },
  { key: "out-for-delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

export function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentStatus);

  return (
    <div className="w-full">
      <div className="relative flex justify-between">
        {/* Progress line background */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full" />
        
        {/* Progress line filled */}
        <div
          className="absolute top-5 left-0 h-1 bg-primary rounded-full transition-all duration-500"
          style={{
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.key} className="flex flex-col items-center z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                  isCurrent && "ring-4 ring-primary/30 animate-pulse-soft"
                )}
              >
                {isCompleted && index < currentIndex ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center",
                  isCompleted ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
