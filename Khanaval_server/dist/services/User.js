import { user } from "../model/mongo.js";
import jwtService from "./JwtToken.js";
class UserService {
    static async userSignup(userdata) {
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
            first_name: userdata.first_name,
            last_name: userdata.last_name,
            emailId: userdata.emailId,
            number: userdata.number,
            imageUrl: userdata.imageUrl,
            user_type: "customer"
        });
        const token = await jwtService.createToken(result);
        return token;
    }
    static async userLogin(emailId) {
        try {
            const existingUser = await user.findOne({ emailId });
            if (!existingUser) {
                return null;
            }
            const token = await jwtService.createToken(existingUser);
            return token;
        }
        catch (error) {
            throw Error("Backend userLoginError");
        }
    }
    static async findcurrentUser(id) {
        try {
            const userdata = await user.findById(id);
            return userdata;
        }
        catch (error) {
            throw Error("Backend findcurentUserError");
        }
    }
}
export default UserService;
//# sourceMappingURL=User.js.map