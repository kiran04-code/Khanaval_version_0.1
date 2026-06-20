import { type Request, type Response } from "express"
import { senderror, sendReponse } from "../../utils/Response.js";
import { Provider } from "../../services/Cloudekitchen/Provider.js";
import { ApiError } from "../../utils/Apierror.js";

export const SendOtp = async (req: Request, res: Response) => {
    try {
        const { phoneNumber } = req.body;
        const provider = await Provider.SendOtp(phoneNumber)
        return sendReponse(res, 200, "otp send successfully", provider)
    } catch (error) {
        if (error instanceof ApiError) {
            return senderror(
                res,
                error.statusCode,
                error.message
            );
        }
        return senderror(res, 500, "Internal Server Error in SignUp route", error)
    }
}
export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { phoneNumber, otp, providerName } = req.body;
        const providerToken = await Provider.VerifiedOtp(phoneNumber, otp, providerName)
        return sendReponse(res, 201, "User Signin Sucessfully ", { token: providerToken })
    } catch (error) {
        if (error instanceof ApiError) {
            return senderror(
                res,
                error.statusCode,
                error.message
            );
        }
        return senderror(res, 500, "Internal Server Error in SignUp route", error)
    }
}