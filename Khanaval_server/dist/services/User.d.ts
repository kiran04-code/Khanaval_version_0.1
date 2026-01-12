import type { Iuser } from "../model/types.js";
declare class UserService {
    static userSignup(userdata: Iuser): Promise<string | null>;
    static userLogin(emailId: string): Promise<string | null>;
    static findcurrentUser(id: string): Promise<(import("mongoose").Document<unknown, {}, Iuser, {}, import("mongoose").DefaultSchemaOptions> & Iuser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
export default UserService;
//# sourceMappingURL=User.d.ts.map