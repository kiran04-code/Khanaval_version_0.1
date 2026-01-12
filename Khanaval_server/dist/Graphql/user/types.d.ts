import type { JwtToken } from "../../model/types.js";
export interface Userdata {
    token: string;
    number: string;
}
export interface GoogleAuthPayload {
    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    hd?: string;
    email?: string;
    email_verified?: string;
    nbf?: string;
    name?: string;
    picture?: string;
    given_name?: string | undefined;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}
export interface GraphqlContext {
    user?: JwtToken;
}
//# sourceMappingURL=types.d.ts.map