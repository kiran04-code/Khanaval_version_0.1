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
            const data = Jwt.verify(token, jwtSecret);
            return data;
        }
    }
}
export default jwtService;
//# sourceMappingURL=JwtToken.js.map