import type { JwtToken } from "../../model/types.js";

export interface Userdata {
  token: string
  number: string
  FCMtoken:string
}
export interface GoogleAuthPayload {
  iss?: string;               // issuer URL
  azp?: string;               // Authorized party
  aud?: string;               // audience (client id)
  sub?: string;               // user unique id
  hd?: string;               // hosted domain (optional)
  email?:string;             // user email
  email_verified?: string;    // "true" or "false" comes as string
  nbf?: string;               // not before (timestamp)
  name?: string;              // full name
  picture?: string;           // profile image URL
  given_name?: string | undefined;        // first name
  family_name?: string;       // last name
  iat?: string;               // issued at (timestamp)
  exp?: string;               // expiry (timestamp)
  jti?: string;               // JWT ID
  alg?: string;               // algorithm
  kid?: string;               // key id
  typ?: string;               // token type
}

export interface GraphqlContext {
    user?:JwtToken
}