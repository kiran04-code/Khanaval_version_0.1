import Jwt from "jsonwebtoken"
import type { Iuser, JwtToken } from "../model/types.js";
import type { Userdata } from "../Graphql/user/types.js";

const jwtSecret = "kiran@9090";

class jwtService {
    public static createToken = async (user: Iuser) => {
        const payload: JwtToken = {
            _id: user.id!
        }
        const token = Jwt.sign(payload, jwtSecret)
        return token
    }
    public static Jwtdecoder(token:string | undefined){
     if(token){
        return Jwt.verify(token,jwtSecret)
     }
    }
}

export default jwtService