import type { Iprovider, IproviderlOGIN } from "../Graphql/Provider/types.js";
declare class ProviderService {
    static PROVIDEROTPSEND(number: string): Promise<{
        success: boolean;
        message: string;
    }>;
    static PROVIDERVERIFED(data: Iprovider): Promise<{
        success: boolean;
        message: string;
        token: null;
    } | {
        success: boolean;
        message: string;
        token: string;
    }>;
    static PROVIDEROTPSENDLOGIN(number: string): Promise<{
        success: boolean;
        message: string;
    }>;
    static PROVIDERVERIFEDLOGIN(data: IproviderlOGIN): Promise<{
        success: boolean;
        message: string;
        token: null;
    } | {
        success: boolean;
        message: string;
        token: string;
    }>;
    static findcurrentUser(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../model/types.js").IProvider, {}, import("mongoose").DefaultSchemaOptions> & import("../model/types.js").IProvider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
export default ProviderService;
//# sourceMappingURL=Provider.d.ts.map