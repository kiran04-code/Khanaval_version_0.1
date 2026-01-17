export declare const Provider: {
    query: string;
    mutation: string;
    resolvers: {
        Query: {
            ProviderverficationOTP: (parnet: any, { number }: {
                number: string;
            }) => Promise<{
                success: boolean;
                message: string;
            }>;
            Providerverfication: (parnet: any, { payload }: {
                payload: import("./types.js").Iprovider;
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
                payload: import("./types.js").IproviderlOGIN;
            }) => Promise<{
                success: boolean;
                message: string;
                token: null;
            } | {
                success: boolean;
                message: string;
                token: string;
            }>;
            getProviderdata: (parent: any, {}: {}, ctx: import("../user/types.js").GraphqlContext) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/types.js").IProvider, {}, import("mongoose").DefaultSchemaOptions> & import("../../model/types.js").IProvider & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            } & {
                id: string;
            }) | null>;
            getproviderMessData: (parent: any, {}: {}, ctx: import("../user/types.js").GraphqlContext) => Promise<{
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
            } | null>;
        };
        Mutation: {
            CreateMessProvider: (parent: any, { payload }: {
                payload: import("./types.js").CreateMessPayload;
            }, idx: import("../user/types.js").GraphqlContext) => Promise<{
                success: boolean;
                message: string;
            } | undefined>;
        };
    };
    typeDefs: string;
};
//# sourceMappingURL=index.d.ts.map