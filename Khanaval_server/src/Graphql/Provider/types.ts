export interface Iprovider {
    Ownername:string,
     number:string
     otp:number
     FCMtoken:string
}
export interface IproviderlOGIN {
     number:string
     otp:number
}

// Types for the CreateMess payload

export   interface CreateMessPayload {
  providerId: string;
  identity: Identity;
  legal: Legal;
  media: Media;
  location: Location;
}

export interface Identity {
  name: string;
  startTime: string; // e.g., "08:00"
  endTime: string;   // e.g., "22:00"
  dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
  operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
}

export interface Legal {
  fssaiNumber: string;
}

export interface Media {
  cover: string;   // URL
  kitchen: string; // URL
  dining: string;  // URL
}

export interface Location {
  address: string;
  city: string;
  houseNo: string;
  landmark: string;
  lat: number;   // Float in GraphQL
  lng: number;   // Float in GraphQL
  postcode: string;
  society: string;
  state: string;
  suburb?: string; // optional
}
