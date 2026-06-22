import { type Request, type Response } from "express"
import { senderror, sendReponse } from "../../utils/Response.js";
import { Provider } from "../../services/Cloudekitchen/Provider.js";
import { ApiError } from "../../utils/Apierror.js";
import { CloudKitchenOwner } from "../../model/Cloude_Kitchen_Provider.js";

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
        return sendReponse(res, 201, "User SignUp Sucessfully ", { token: providerToken })
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
export const loginSendOtp = async (req: Request, res: Response) => {
    try {
        const { phoneNumber } = req.body;
        const provider = await Provider.LoginSendOtp(phoneNumber)
        return sendReponse(res, 200, "otp send successfully", provider)
    } catch (error) {

        if (error instanceof ApiError) {
            return senderror(
                res,
                error.statusCode,
                error.message
            );
        }
        return senderror(res, 500, "Internal Server Error in Login route", error)
    }
}
export const loginverifyOtp = async (req: Request, res: Response) => {
    try {
        const { phoneNumber, otp } = req.body;
        const providerToken = await Provider.LoginVerifiedOtp(phoneNumber, otp)
        return sendReponse(res, 201, "User Login Sucessfully ", { token: providerToken })
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

export const getCloudeCurrentUser = async (req: Request, res: Response) => {
    if (req.CloudeUser?.id) {
        const getCurrentdata = await CloudKitchenOwner.findById(req.CloudeUser.id)
        return sendReponse(res, 200, "sucessfully fetchUser Data", getCurrentdata)
    } else {
        return senderror(res, 404, "User UnAuthorised")
    }
}
