import Jwt from "jsonwebtoken";
import type { Iuser } from "../model/types.js";
declare class jwtService {
    static createToken: (user: Iuser) => Promise<string>;
    static Jwtdecoder(token: string | undefined): string | Jwt.JwtPayload | undefined;
}
export default jwtService;
//# sourceMappingURL=JwtToken.d.ts.map