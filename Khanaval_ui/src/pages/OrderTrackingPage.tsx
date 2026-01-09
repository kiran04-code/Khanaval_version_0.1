import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderTimeline } from "@/components/common/OrderTimeline";
import { ArrowLeft, MapPin, Phone, MessageCircle } from "lucide-react";

const orderData = {
  id: "ORD-2026-001",
  status: "out-for-delivery" as const,
  provider: {
    name: "Mom's Tiffin",
    phone: "+91 98765 12345",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=100",
  },
  items: [
    { name: "Dal Fry", qty: 1 },
    { name: "Roti", qty: 4 },
    { name: "Rice", qty: 1 },
    { name: "Mix Sabzi", qty: 1 },
    { name: "Salad", qty: 1 },
  ],
  total: 80,
  deliveryAddress: "B-204, Sunrise Apartments, Koramangala, Bangalore",
  estimatedTime: "12:45 PM",
  orderedAt: "12:15 PM",
};

export default function OrderTrackingPage() {
  const { id } = useParams();
  const order = orderData;

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Order #{order.id}</h1>
              <p className="text-primary-foreground/80">
                Estimated arrival: {order.estimatedTime}
              </p>
            </div>
            <Badge className="bg-primary-foreground/20 text-primary-foreground">
              On the way
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Timeline */}
        <Card variant="elevated">
          <CardContent className="p-6">
            <h2 className="font-semibold text-foreground mb-6">Order Status</h2>
            <OrderTimeline currentStatus={order.status} />
          </CardContent>
        </Card>

        {/* Provider Info */}
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={order.provider.image}
                  alt={order.provider.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{order.provider.name}</h3>
                  <p className="text-sm text-muted-foreground">Your tiffin provider</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card variant="default">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Delivery Address
            </h3>
            <p className="text-muted-foreground text-sm">{order.deliveryAddress}</p>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card variant="default">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {item.name} x{item.qty}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">₹{order.total}</span>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full">
          Need Help?
        </Button>
      </div>
    </div>
  );
}
