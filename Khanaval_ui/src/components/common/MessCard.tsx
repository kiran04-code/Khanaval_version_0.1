import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface MessCardProps {
  id: string;
  name: string;
  image: string;
  distance: string;
  monthlyPrice: number;
  rating: number;
  isVeg: boolean;
  timing: string;
}

export function MessCard({
  id,
  name,
  image,
  distance,
  monthlyPrice,
  rating,
  isVeg,
  timing,
}: MessCardProps) {
  return (
    <Card variant="interactive" className="overflow-hidden group">
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-lg text-foreground">{name}</h3>
          <Badge variant={isVeg ? "veg" : "non-veg"}>
            {isVeg ? "Pure Veg" : "Non-Veg"}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {timing}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">₹{monthlyPrice}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <Link to={`/mess/${id}`}>
            <Button size="sm">View Menu</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
