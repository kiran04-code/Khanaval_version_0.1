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
        };
        Mutation: {
            _dummy: () => boolean;
        };
    };
    typeDefs: string;
};
//# sourceMappingURL=index.d.ts.map