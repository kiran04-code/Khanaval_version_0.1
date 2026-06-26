import jwtService from "../services/JwtToken.js";
export const AuthMiddleware = async (req, res, next) => {
    try {
        const headeToken = await req.headers?.authorization;
        const token = headeToken?.split(" ")[1];
        if (!token) {
            return next();
        }
        const data = jwtService.Jwtdecoder(token);
        req.CloudeUser = {
            id: data?._id,
            providerName: data?.providerName,
            phoneNumber: data?.phoneNumber,
            role: data?.role,
            ispaymentDone: data?.ispaymentDone
        };
        return next();
    }
    catch (error) {
        return next();
    }
};
//# sourceMappingURL=Auth.js.map