import Jwt from "jsonwebtoken"
import type { Iuser, JwtToken, JwtTokeninput } from "../model/types.js";
import type { Userdata } from "../Graphql/user/types.js";

const jwtSecret = "kiran@9090";

class jwtService {
    public static createToken = async (user: JwtTokeninput ) => {
        const payload: JwtToken = {
            _id: user.id!,
            providerName:user.providerName!,
            phoneNumber:user.phoneNumber!,
            role:user.role!
        }
        const token = Jwt.sign(payload, jwtSecret)
        return token
    }
    public static Jwtdecoder(token:string | undefined){

     if(token){
        const data = Jwt.verify(token,jwtSecret) as JwtToken
        return data;
     }
    }
}

export default jwtService