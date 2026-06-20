import { redisclient } from "../../config/redis.js";
import { CloudKitchenOwner } from "../../model/Cloude_Kitchen_Provider.js";
import { ApiError } from "../../utils/Apierror.js";
import jwtService from "../JwtToken.js";
import SENTOTPROVIDERS from "../NotificationChannel/FastOTP.js";
import { generateOtp } from "../utiles/GenratedOTP.js";
function OPTKEY(phoneNumber: string) {
    return `otp:${phoneNumber}`
}
export class Provider {
    static async SendOtp(phoneNumber: string) {
        if (!phoneNumber) {
            throw new ApiError(400, "Bad Request Number Required")
        }
        const existUser = await CloudKitchenOwner.findOne({ phoneNumber })
        if (existUser) {
            throw new ApiError(400, "User is Already Register With Number")
        }
        const GenratedOtp = generateOtp()
        // const sendotpMessage = await SENTOTPROVIDERS({ number: phoneNumber, otp: GenratedOtp })
        await redisclient.set(OPTKEY(phoneNumber), GenratedOtp)
        // return sendotpMessage
        return
    }
    static async VerifiedOtp(phoneNumber: string, otp: string, providerName: string) {
        if (!otp) {
            throw new ApiError(400, "OTP is required")
        }
        const redisOtp = await redisclient.get(OPTKEY(phoneNumber))
        if (redisOtp !== otp) {
            throw new ApiError(400, "OTP is Invalid")
        }
        const provider_id = await CloudKitchenOwner.create({
            providerName,
            phoneNumber
        })
        const token = await jwtService.createToken(provider_id);
        await redisclient.del(OPTKEY(phoneNumber))
        return token
    }
}