export interface Iprovider {
    Ownername: string;
    number: string;
    otp: number;
    FCMtoken: string;
}
export interface IproviderlOGIN {
    number: string;
    otp: number;
}
export interface CreateMessPayload {
    providerId: string;
    identity: Identity;
    legal: Legal;
    media: Media;
    location: Location;
}
export interface Identity {
    name: string;
    startTime: string;
    endTime: string;
    dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
    operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
}
export interface Legal {
    fssaiNumber: string;
}
export interface Media {
    cover: string;
    kitchen: string;
    dining: string;
}
export interface Location {
    address: string;
    city: string;
    houseNo: string;
    landmark: string;
    lat: number;
    lng: number;
    postcode: string;
    society: string;
    state: string;
    suburb?: string;
}
//# sourceMappingURL=types.d.ts.map