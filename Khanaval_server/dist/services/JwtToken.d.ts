import type { JwtToken, JwtTokeninput } from "../model/types.js";
declare class jwtService {
    static createToken: (user: JwtTokeninput) => Promise<string>;
    static Jwtdecoder(token: string | undefined): JwtToken | undefined;
}
export default jwtService;
//# sourceMappingURL=JwtToken.d.ts.map