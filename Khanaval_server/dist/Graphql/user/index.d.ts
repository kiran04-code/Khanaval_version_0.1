export declare const user: {
    query: string;
    mutation: string;
    resolvers: {
        Query: {
            verifiedgoodtokenandnumberforSignup: (parent: any, { payload }: {
                payload: import("./types.js").Userdata;
            }) => Promise<{
                success: boolean;
                message: string;
                token: null;
            } | {
                success: boolean;
                message: string;
                token: string;
            }>;
            getcurrentUser: (parent: any, arg: any, ctx: import("./types.js").GraphqlContext) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/types.js").Iuser, {}, import("mongoose").DefaultSchemaOptions> & import("../../model/types.js").Iuser & {
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
                token: null;
                message: string;
            } | {
                success: boolean;
                token: string;
                message: string;
            }>;
        };
        Mutation: {
            _dummy: () => boolean;
        };
    };
    typeDefs: string;
};
//# sourceMappingURL=index.d.ts.map