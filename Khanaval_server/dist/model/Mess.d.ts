import mongoose from "mongoose";
declare const Mess: mongoose.Model<{
    providerId: mongoose.Types.ObjectId;
    messVerified: boolean;
    identity?: {
        name: string;
        startTime?: string | null;
        endTime?: string | null;
        dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
        operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
    } | null;
    legal?: {
        fssaiNumber: string;
    } | null;
    media?: {
        cover: string;
        kitchen: string;
        dining: string;
    } | null;
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        lat: number;
        lng: number;
        houseNo?: string | null;
        society?: string | null;
        landmark?: string | null;
        suburb?: string | null;
    } | null;
    Menu?: {
        menuIMages: string;
    } | null;
    MessQrcode?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    providerId: mongoose.Types.ObjectId;
    messVerified: boolean;
    identity?: {
        name: string;
        startTime?: string | null;
        endTime?: string | null;
        dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
        operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
    } | null;
    legal?: {
        fssaiNumber: string;
    } | null;
    media?: {
        cover: string;
        kitchen: string;
        dining: string;
    } | null;
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        lat: number;
        lng: number;
        houseNo?: string | null;
        society?: string | null;
        landmark?: string | null;
        suburb?: string | null;
    } | null;
    Menu?: {
        menuIMages: string;
    } | null;
    MessQrcode?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    providerId: mongoose.Types.ObjectId;
    messVerified: boolean;
    identity?: {
        name: string;
        startTime?: string | null;
        endTime?: string | null;
        dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
        operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
    } | null;
    legal?: {
        fssaiNumber: string;
    } | null;
    media?: {
        cover: string;
        kitchen: string;
        dining: string;
    } | null;
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        lat: number;
        lng: number;
        houseNo?: string | null;
        society?: string | null;
        landmark?: string | null;
        suburb?: string | null;
    } | null;
    Menu?: {
        menuIMages: string;
    } | null;
    MessQrcode?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    providerId: mongoose.Types.ObjectId;
    messVerified: boolean;
    identity?: {
        name: string;
        startTime?: string | null;
        endTime?: string | null;
        dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
        operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
    } | null;
    legal?: {
        fssaiNumber: string;
    } | null;
    media?: {
        cover: string;
        kitchen: string;
        dining: string;
    } | null;
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        lat: number;
        lng: number;
        houseNo?: string | null;
        society?: string | null;
        landmark?: string | null;
        suburb?: string | null;
    } | null;
    Menu?: {
        menuIMages: string;
    } | null;
    MessQrcode?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    providerId: mongoose.Types.ObjectId;
    messVerified: boolean;
    identity?: {
        name: string;
        startTime?: string | null;
        endTime?: string | null;
        dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
        operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
    } | null;
    legal?: {
        fssaiNumber: string;
    } | null;
    media?: {
        cover: string;
        kitchen: string;
        dining: string;
    } | null;
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        lat: number;
        lng: number;
        houseNo?: string | null;
        society?: string | null;
        landmark?: string | null;
        suburb?: string | null;
    } | null;
    Menu?: {
        menuIMages: string;
    } | null;
    MessQrcode?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    providerId: mongoose.Types.ObjectId;
    messVerified: boolean;
    identity?: {
        name: string;
        startTime?: string | null;
        endTime?: string | null;
        dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
        operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
    } | null;
    legal?: {
        fssaiNumber: string;
    } | null;
    media?: {
        cover: string;
        kitchen: string;
        dining: string;
    } | null;
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        lat: number;
        lng: number;
        houseNo?: string | null;
        society?: string | null;
        landmark?: string | null;
        suburb?: string | null;
    } | null;
    Menu?: {
        menuIMages: string;
    } | null;
    MessQrcode?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        providerId: mongoose.Types.ObjectId;
        messVerified: boolean;
        identity?: {
            name: string;
            startTime?: string | null;
            endTime?: string | null;
            dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
            operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
        } | null;
        legal?: {
            fssaiNumber: string;
        } | null;
        media?: {
            cover: string;
            kitchen: string;
            dining: string;
        } | null;
        location?: {
            address: string;
            city: string;
            state: string;
            postcode: string;
            lat: number;
            lng: number;
            houseNo?: string | null;
            society?: string | null;
            landmark?: string | null;
            suburb?: string | null;
        } | null;
        Menu?: {
            menuIMages: string;
        } | null;
        MessQrcode?: string | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        providerId: mongoose.Types.ObjectId;
        messVerified: boolean;
        identity?: {
            name: string;
            startTime?: string | null;
            endTime?: string | null;
            dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
            operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
        } | null;
        legal?: {
            fssaiNumber: string;
        } | null;
        media?: {
            cover: string;
            kitchen: string;
            dining: string;
        } | null;
        location?: {
            address: string;
            city: string;
            state: string;
            postcode: string;
            lat: number;
            lng: number;
            houseNo?: string | null;
            society?: string | null;
            landmark?: string | null;
            suburb?: string | null;
        } | null;
        Menu?: {
            menuIMages: string;
        } | null;
        MessQrcode?: string | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    providerId: mongoose.Types.ObjectId;
    messVerified: boolean;
    identity?: {
        name: string;
        startTime?: string | null;
        endTime?: string | null;
        dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
        operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
    } | null;
    legal?: {
        fssaiNumber: string;
    } | null;
    media?: {
        cover: string;
        kitchen: string;
        dining: string;
    } | null;
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        lat: number;
        lng: number;
        houseNo?: string | null;
        society?: string | null;
        landmark?: string | null;
        suburb?: string | null;
    } | null;
    Menu?: {
        menuIMages: string;
    } | null;
    MessQrcode?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    providerId: mongoose.Types.ObjectId;
    messVerified: boolean;
    identity?: {
        name: string;
        startTime?: string | null;
        endTime?: string | null;
        dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
        operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
    } | null;
    legal?: {
        fssaiNumber: string;
    } | null;
    media?: {
        cover: string;
        kitchen: string;
        dining: string;
    } | null;
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        lat: number;
        lng: number;
        houseNo?: string | null;
        society?: string | null;
        landmark?: string | null;
        suburb?: string | null;
    } | null;
    Menu?: {
        menuIMages: string;
    } | null;
    MessQrcode?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Mess;
//# sourceMappingURL=Mess.d.ts.map