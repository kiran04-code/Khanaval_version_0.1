import type { GraphqlContext, Userdata } from "./types.js";
export declare const resolvers: {
    Query: {
        verifiedgoodtokenandnumberforSignup: (parent: any, { payload }: {
            payload: Userdata;
        }) => Promise<{
            success: boolean;
            message: string;
            token: null;
        } | {
            success: boolean;
            message: string;
            token: string;
        }>;
        getcurrentUser: (parent: any, arg: any, ctx: GraphqlContext) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/types.js").Iuser, {}, import("mongoose").DefaultSchemaOptions> & import("../../model/types.js").Iuser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null>;
        verifiedgoodtokenandnumberforSignin: (parent: any, { token }: {
            token: string;
        }) => Promise<{
            success: boolean;
            token: Promise<string | null>;
            message: string;
        }>;
    };
    Mutation: {
        _dummy: () => boolean;
    };
};
//# sourceMappingURL=resolver.d.ts.map