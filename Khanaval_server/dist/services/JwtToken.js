import Jwt from "jsonwebtoken";
const jwtSecret = "kiran@9090";
class jwtService {
    static createToken = async (user) => {
        const payload = {
            _id: user.id
        };
        const token = Jwt.sign(payload, jwtSecret);
        return token;
    };
    static Jwtdecoder(token) {
        if (token) {
            return Jwt.verify(token, jwtSecret);
        }
    }
}
export default jwtService;
//# sourceMappingURL=JwtToken.js.map