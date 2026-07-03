import {} from "express";
import { senderror, sendReponse } from "../../utils/Response.js";
export const PlaceOrder = async (req, res) => {
    try {
        sendReponse(res, 200, "OrderPlace Successfull");
    }
    catch (error) {
        senderror(res, 500, "internal Server Error");
    }
};
//# sourceMappingURL=order.controller.js.map