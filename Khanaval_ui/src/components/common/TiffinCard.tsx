import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

interface TiffinCardProps {
  id: string;
  name: string;
  image: string;
  distance: string;
  pricePerMeal: number;
  rating: number;
  isVeg: boolean;
  todaysMenu: string[];
}

export function TiffinCard({
  id,
  name,
  image,
  distance,
  pricePerMeal,
  rating,
  isVeg,
  todaysMenu,
}: TiffinCardProps) {
  return (
    <Card variant="interactive" className="overflow-hidden group">
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={isVeg ? "veg" : "non-veg"}>
            {isVeg ? "Pure Veg" : "Non-Veg"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1">{name}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          {distance}
        </p>
        <div className="flex items-center gap-2 mb-3 text-sm">
          <Utensils className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground line-clamp-1">
            {todaysMenu.slice(0, 2).join(", ")}...
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">₹{pricePerMeal}</span>
            <span className="text-sm text-muted-foreground">/meal</span>
          </div>
          <Link to={`/tiffin/${id}`}>
            <Button size="sm">Order Now</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
