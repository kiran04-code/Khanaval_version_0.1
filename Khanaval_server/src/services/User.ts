import type { Userdata } from "../Graphql/user/types.js";
import { user } from "../model/mongo.js";
import type { Iuser } from "../model/types.js";
import jwtService from "./JwtToken.js";

class UserService {
    public static async userSignup(userdata: Iuser) {
        const existingUser = await user.findOne({
            $or: [
                { emailId: userdata.emailId },
                { number: userdata.number }
            ]
        });

        if (existingUser) {
            return null; // user already exists
        }
        const result = await user.create({
            first_name: userdata.first_name ||  userdata.emailId.split("@")[1]!,
            last_name: userdata.last_name || " ",
            emailId: userdata.emailId,
            number: userdata.number,
            imageUrl: userdata.imageUrl,
            user_type: "customer"
        });

        const token = await jwtService.createToken(result);
        return token;


    }
    public static async userLogin(emailId: string) {
        try {
            const existingUser = await  user.findOne({emailId})
            if(!existingUser){
                return null
            }
            const token = await jwtService.createToken(existingUser)
            return token
        } catch (error) {
            throw Error("Backend userLoginError")
        }
    }
    public static async findcurrentUser(id: string) {
        try {
            const userdata = await user.findById(id)
            return userdata
        } catch (error) {
            throw Error("Backend findcurentUserError")
        }
    }
}

export default UserService