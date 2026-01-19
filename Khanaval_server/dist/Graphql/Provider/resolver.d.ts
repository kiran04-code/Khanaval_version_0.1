import mongoose from "mongoose";
import type { GraphqlContext } from "../user/types.js";
import type { CreateMessPayload, Iprovider, IproviderlOGIN } from "./types.js";
export declare const resolvers: {
    Query: {
        ProviderverficationOTP: (parnet: any, { number }: {
            number: string;
        }) => Promise<{
            success: boolean;
            message: string;
        }>;
        Providerverfication: (parnet: any, { payload }: {
            payload: Iprovider;
        }) => Promise<{
            success: boolean;
            message: string;
            token: null;
        } | {
            success: boolean;
            message: string;
            token: string;
        }>;
        ProviderverficationOTPLogin: (parnet: any, { number }: {
            number: string;
        }) => Promise<{
            success: boolean;
            message: string;
        }>;
        ProviderverficationLogin: (parnet: any, { payload }: {
            payload: IproviderlOGIN;
        }) => Promise<{
            success: boolean;
            message: string;
            token: null;
        } | {
            success: boolean;
            message: string;
            token: string;
        }>;
        getProviderdata: (parent: any, {}: {}, ctx: GraphqlContext) => Promise<(mongoose.Document<unknown, {}, import("../../model/types.js").IProvider, {}, mongoose.DefaultSchemaOptions> & import("../../model/types.js").IProvider & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null>;
        getproviderMessData: (parent: any, {}: {}, ctx: GraphqlContext) => Promise<{
            id: string;
            identity: {
                name: string;
                startTime?: string | null;
                endTime?: string | null;
                dietaryType?: "Pure Veg" | "Pure Non-Veg" | "Hybrid" | null;
                operatingMode?: "Home-made" | "Commercial" | "tifin-only" | null;
            };
            legal: {
                fssaiNumber: string;
            };
            media: {
                cover: string;
                kitchen: string;
                dining: string;
            };
            location: {
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
            };
            messVerified: boolean;
            createdAt: NativeDate;
            MessQrcode: string | null | undefined;
            Menu: {
                createdAt: NativeDate;
                types?: "breakfast" | "dinner" | null;
                imageUrl?: string | null;
                menuDate?: NativeDate | null;
            };
        } | null>;
    };
    Mutation: {
        CreateMessProvider: (parent: any, { payload }: {
            payload: CreateMessPayload;
        }, idx: GraphqlContext) => Promise<{
            success: boolean;
            message: string;
        } | undefined>;
    };
};
//# sourceMappingURL=resolver.d.ts.map