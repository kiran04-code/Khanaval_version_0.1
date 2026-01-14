import type { GraphqlContext } from "../user/types.js";
import type { Iprovider, IproviderlOGIN } from "./types.js";
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
        getProviderdata: (parent: any, {}: {}, ctx: GraphqlContext) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/types.js").IProvider, {}, import("mongoose").DefaultSchemaOptions> & import("../../model/types.js").IProvider & {
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
//# sourceMappingURL=resolver.d.ts.map