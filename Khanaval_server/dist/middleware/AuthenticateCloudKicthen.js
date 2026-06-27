import {} from "express";
import { senderror, sendReponse } from "../utils/Response.js";
export const CloudKitchenAuth = async (req, res, next) => {
    try {
        if (!req.CloudeUser?.id) {
            return senderror(res, 401, "Non-Autherizsed Acesss");
        }
        if (!req.CloudeUser.ispaymentDone) {
            return senderror(res, 402, "Payment Require");
        }
        next();
    }
    catch (error) {
        next();
    }
};
//# sourceMappingURL=AuthenticateCloudKicthen.js.map